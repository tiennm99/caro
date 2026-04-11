package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientRole;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.RoomType;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomCreateSuccessResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.CreateRoomRequestRecord;

public final class CreateRoomHandler {

    private CreateRoomHandler() {
    }

    public static void handle(ClientSide clientSide, CreateRoomRequestRecord req) {
        Room room = new Room(ServerContains.getServerId());
        room.setStatus(RoomStatus.WAIT);
        room.setType(RoomType.PVP);
        room.setRoomOwner(clientSide.getNickname());
        room.getClientSideMap().put(clientSide.getId(), clientSide);
        room.getClientSideList().add(clientSide);
        room.setCreateTime(System.currentTimeMillis());
        room.setLastFlushTime(System.currentTimeMillis());

        clientSide.setRoomId(room.getId());
        clientSide.setRole(ClientRole.BLACK_PLAYER);
        clientSide.setStatus(ClientStatus.NO_READY);

        ServerContains.addRoom(room);

        ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                .setRoomCreateSuccess(RoomCreateSuccessResponse.newBuilder()
                        .setId(room.getId())
                        .setRoomOwner(room.getRoomOwner())
                        .setRoomType(room.getType().name()))
                .build());
    }
}
