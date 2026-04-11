package com.miti99.caro.server.handler;

import com.google.protobuf.InvalidProtocolBufferException;
import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.enums.ClientRole;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.print.SimplePrinter;
import com.miti99.caro.protocol.ClientConnectResponse;
import com.miti99.caro.protocol.NicknameSetResponse;
import com.miti99.caro.protocol.Request;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.RequestConverter;
import com.miti99.caro.server.event.RequestDispatcher;
import com.miti99.caro.server.event.request.ClientRequest;
import com.miti99.caro.server.event.request.HeartbeatRequestRecord;

import io.netty.buffer.ByteBufUtil;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

public class WebsocketTransferHandler extends SimpleChannelInboundHandler<BinaryWebSocketFrame> {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, BinaryWebSocketFrame frame) {
        byte[] bytes = ByteBufUtil.getBytes(frame.content());
        Request raw;
        try {
            raw = Request.parseFrom(bytes);
        } catch (InvalidProtocolBufferException e) {
            SimplePrinter.serverLog("WARN malformed request: " + e.getMessage());
            return;
        }
        ClientRequest req = RequestConverter.convert(raw);
        ClientSide client = ServerContains.CLIENT_SIDE_MAP.get(getId(ctx.channel()));
        if (!(req instanceof HeartbeatRequestRecord)) {
            SimplePrinter.serverLog(
                    client.getId() + " | " + client.getNickname() + " do: " + req.getClass().getSimpleName());
        }
        RequestDispatcher.dispatch(client, req);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        if (cause instanceof java.io.IOException) {
            clientOfflineEvent(ctx.channel());
        } else {
            SimplePrinter.serverLog("ERROR: " + cause.getMessage());
            cause.printStackTrace();
        }
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent event) {
            if (event.state() == IdleState.READER_IDLE) {
                try {
                    clientOfflineEvent(ctx.channel());
                    ctx.channel().close();
                } catch (Exception ignored) {
                }
            }
        } else if (evt instanceof WebSocketServerProtocolHandler.HandshakeComplete) {
            Channel ch = ctx.channel();
            // init client info
            ClientSide clientSide = new ClientSide(getId(ctx.channel()), ClientStatus.TO_CHOOSE, ch);
            clientSide.setNickname(String.valueOf(clientSide.getId()));
            clientSide.setRole(ClientRole.BLACK_PLAYER);

            ServerContains.CLIENT_SIDE_MAP.put(clientSide.getId(), clientSide);
            SimplePrinter.serverLog("Has client connect to the server: " + clientSide.getId());
            new Thread(() -> {
                try {
                    Thread.sleep(2000L);
                    ChannelUtils.push(ch, Response.newBuilder()
                            .setClientConnect(ClientConnectResponse.newBuilder().setClientId(clientSide.getId()))
                            .build());
                    ChannelUtils.push(ch, Response.newBuilder()
                            .setNicknameSet(NicknameSetResponse.newBuilder().setInvalidLength(0))
                            .build());
                } catch (InterruptedException ignored) {
                }
            }).start();
        } else {
            super.userEventTriggered(ctx, evt);
        }
    }

    private int getId(Channel channel) {
        String longId = channel.id().asLongText();
        Integer clientId = ServerContains.CHANNEL_ID_MAP.get(longId);
        if (null == clientId) {
            clientId = ServerContains.getClientId();
            ServerContains.CHANNEL_ID_MAP.put(longId, clientId);
        }
        return clientId;
    }

    private void clientOfflineEvent(Channel channel) {
        int clientId = getId(channel);
        ClientSide client = ServerContains.CLIENT_SIDE_MAP.get(clientId);
        if (client != null) {
            SimplePrinter.serverLog("Has client exit to the server: " + clientId + " | " + client.getNickname());
            // TODO phase 02b: wire to ClientOfflineHandler.handle(client)
        }
    }
}
