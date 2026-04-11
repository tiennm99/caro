package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.protocol.ClientExitResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.ClientExitRequestRecord;

public final class ClientExitHandler {

    private static final Object LOCK = new Object();

    private ClientExitHandler() {
    }

    public static void handle(ClientSide clientSide, ClientExitRequestRecord req) {
        synchronized (LOCK) {
            Room room = ServerContains.getRoom(clientSide.getRoomId());
            if (room == null) {
                return;
            }

            Response notice = Response.newBuilder()
                    .setClientExit(ClientExitResponse.newBuilder()
                            .setRoomId(room.getId())
                            .setExitClientId(clientSide.getId())
                            .setExitClientNickname(clientSide.getNickname() == null ? "" : clientSide.getNickname()))
                    .build();

            for (ClientSide client : room.getClientSideList()) {
                if (client.getChannel() != null) {
                    ChannelUtils.push(client.getChannel(), notice);
                    client.init();
                }
            }

            for (ClientSide watcher : room.getWatcherList()) {
                ChannelUtils.push(watcher.getChannel(), notice);
            }

            ServerContains.removeRoom(room.getId());
        }
    }
}
