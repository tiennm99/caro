package com.miti99.caro.server.event.handler;

import java.util.LinkedList;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomJoinFailFullResponse;
import com.miti99.caro.protocol.RoomJoinFailNotFoundResponse;
import com.miti99.caro.protocol.RoomJoinSuccessResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.GameStartingRequestRecord;
import com.miti99.caro.server.event.request.JoinRoomRequestRecord;

public final class JoinRoomHandler {

    private JoinRoomHandler() {
    }

    public static void handle(ClientSide clientSide, JoinRoomRequestRecord req) {
        int roomId = req.roomId();
        Room room = ServerContains.getRoom(roomId);

        if (room == null) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setRoomJoinFailNotFound(RoomJoinFailNotFoundResponse.newBuilder().setRoomId(roomId))
                    .build());
            return;
        }

        // Gomoku is 2-player
        if (room.getClientSideList().size() >= 2) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setRoomJoinFailFull(RoomJoinFailFullResponse.newBuilder()
                            .setRoomId(room.getId())
                            .setRoomOwner(room.getRoomOwner() == null ? "" : room.getRoomOwner()))
                    .build());
            return;
        }

        clientSide.setStatus(ClientStatus.READY);
        clientSide.setRoomId(room.getId());

        LinkedList<ClientSide> roomClientList = room.getClientSideList();
        roomClientList.add(clientSide);
        room.getClientSideMap().put(clientSide.getId(), clientSide);
        room.setStatus(RoomStatus.WAIT);

        Response joinSuccess = Response.newBuilder()
                .setRoomJoinSuccess(RoomJoinSuccessResponse.newBuilder()
                        .setClientId(clientSide.getId())
                        .setClientNickname(clientSide.getNickname() == null ? "" : clientSide.getNickname())
                        .setRoomId(room.getId())
                        .setRoomOwner(room.getRoomOwner() == null ? "" : room.getRoomOwner())
                        .setRoomClientCount(roomClientList.size()))
                .build();

        for (ClientSide client : room.getClientSideMap().values()) {
            if (client.getChannel() != null) {
                ChannelUtils.push(client.getChannel(), joinSuccess);
            }
        }

        // Auto-start when 2 players joined
        if (roomClientList.size() == 2) {
            GameStartingHandler.handle(clientSide, new GameStartingRequestRecord());
            return;
        }

        // Notify spectators (legacy behaviour: same typed message, watcher receives join notice)
        for (ClientSide watcher : room.getWatcherList()) {
            ChannelUtils.push(watcher.getChannel(), joinSuccess);
        }
    }
}
