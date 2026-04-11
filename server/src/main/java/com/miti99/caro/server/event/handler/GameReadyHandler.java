package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.protocol.GameReadyResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.GameReadyRequestRecord;
import com.miti99.caro.server.event.request.GameStartingRequestRecord;

public final class GameReadyHandler {

    private GameReadyHandler() {
    }

    public static void handle(ClientSide clientSide, GameReadyRequestRecord req) {
        Room room = ServerContains.getRoom(clientSide.getRoomId());
        if (room == null || room.getStatus() == RoomStatus.STARTING) {
            return;
        }
        if (clientSide.getStatus() == ClientStatus.PLAYING) {
            return;
        }

        // Toggle ready state
        clientSide.setStatus(clientSide.getStatus() == ClientStatus.READY ? ClientStatus.NO_READY : ClientStatus.READY);

        Response response = Response.newBuilder()
                .setGameReady(GameReadyResponse.newBuilder()
                        .setClientNickname(clientSide.getNickname() == null ? "" : clientSide.getNickname())
                        .setStatus(clientSide.getStatus().name())
                        .setClientId(clientSide.getId()))
                .build();

        // Check if all human players are ready (need 2 players)
        boolean allReady = room.getClientSideMap().size() >= 2;
        for (ClientSide client : room.getClientSideList()) {
            if (client.getChannel() != null && client.getStatus() != ClientStatus.READY) {
                allReady = false;
            }
        }

        // Notify all human players
        for (ClientSide client : room.getClientSideList()) {
            if (client.getChannel() != null) {
                ChannelUtils.push(client.getChannel(), response);
            }
        }

        if (allReady) {
            GameStartingHandler.handle(clientSide, new GameStartingRequestRecord());
        }
    }
}
