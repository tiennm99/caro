package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.protocol.ClientExitResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;

/**
 * Triggered directly by the Netty pipeline on channel close or idle timeout —
 * NOT routed through the {@code RequestDispatcher}. There is no wire-level
 * request for this event; it is observed server-side only.
 */
public final class ClientOfflineHandler {

    private ClientOfflineHandler() {
    }

    public static void handle(ClientSide clientSide) {
        if (clientSide == null) {
            return;
        }
        Room room = ServerContains.getRoom(clientSide.getRoomId());

        if (room == null) {
            ServerContains.CLIENT_SIDE_MAP.remove(clientSide.getId());
            return;
        }

        if (room.getWatcherList().contains(clientSide)) {
            room.getWatcherList().remove(clientSide);
            return;
        }

        Response notice = Response.newBuilder()
                .setClientExit(ClientExitResponse.newBuilder()
                        .setRoomId(room.getId())
                        .setExitClientId(clientSide.getId())
                        .setExitClientNickname(clientSide.getNickname() == null ? "" : clientSide.getNickname()))
                .build();

        for (ClientSide client : room.getClientSideList()) {
            if (client.getChannel() != null && client.getId() != clientSide.getId()) {
                ChannelUtils.push(client.getChannel(), notice);
                client.init();
            }
        }

        ServerContains.removeRoom(room.getId());
    }
}
