package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomJoinFailNotFoundResponse;
import com.miti99.caro.protocol.WatchGameSuccessResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.WatchGameRequestRecord;

public final class WatchGameHandler {

    private WatchGameHandler() {
    }

    public static void handle(ClientSide clientSide, WatchGameRequestRecord req) {
        int roomId = req.roomId();
        Room room = ServerContains.getRoom(roomId);

        if (room == null) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setRoomJoinFailNotFound(RoomJoinFailNotFoundResponse.newBuilder().setRoomId(roomId))
                    .build());
            return;
        }

        clientSide.setRoomId(room.getId());
        room.getWatcherList().add(clientSide);

        ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                .setWatchGameSuccess(WatchGameSuccessResponse.newBuilder()
                        .setOwner(room.getRoomOwner() == null ? "" : room.getRoomOwner())
                        .setStatus(room.getStatus() == null ? "" : room.getStatus().toString()))
                .build());
    }
}
