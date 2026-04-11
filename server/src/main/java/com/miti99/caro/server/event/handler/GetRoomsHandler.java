package com.miti99.caro.server.event.handler;

import java.util.Map;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomSummary;
import com.miti99.caro.protocol.ShowRoomsResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.GetRoomsRequestRecord;

public final class GetRoomsHandler {

    private GetRoomsHandler() {
    }

    public static void handle(ClientSide client, GetRoomsRequestRecord req) {
        ShowRoomsResponse.Builder response = ShowRoomsResponse.newBuilder();
        for (Map.Entry<Integer, Room> entry : ServerContains.getRoomMap().entrySet()) {
            Room room = entry.getValue();
            response.addRooms(RoomSummary.newBuilder()
                    .setRoomId(room.getId())
                    .setRoomOwner(room.getRoomOwner() == null ? "" : room.getRoomOwner())
                    .setRoomClientCount(room.getClientSideList().size())
                    .setRoomType(room.getType() == null ? "" : room.getType().name()));
        }
        ChannelUtils.push(client.getChannel(), Response.newBuilder().setShowRooms(response).build());
    }
}
