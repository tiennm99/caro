package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientRole;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.RoomType;
import com.miti99.caro.protocol.PveDifficultyNotSupportResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.CreatePveRoomRequestRecord;
import com.miti99.caro.server.event.request.GameStartingRequestRecord;

public final class CreatePveRoomHandler {

    private CreatePveRoomHandler() {
    }

    public static void handle(ClientSide clientSide, CreatePveRoomRequestRecord req) {
        int difficulty = req.difficulty();
        if (difficulty < 1 || difficulty > 3) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setPveDifficultyNotSupport(PveDifficultyNotSupportResponse.getDefaultInstance())
                    .build());
            return;
        }

        Room room = new Room(ServerContains.getServerId());
        room.setType(RoomType.PVE);
        room.setStatus(RoomStatus.WAIT);
        room.setRoomOwner(clientSide.getNickname());
        room.setDifficultyCoefficient(difficulty);
        room.setCreateTime(System.currentTimeMillis());
        room.setLastFlushTime(System.currentTimeMillis());

        // Add human player
        room.getClientSideMap().put(clientSide.getId(), clientSide);
        room.getClientSideList().add(clientSide);
        clientSide.setRoomId(room.getId());
        clientSide.setRole(ClientRole.BLACK_PLAYER);

        // Add AI robot (1 robot for 2-player Gomoku)
        ClientSide robot = new ClientSide(-ServerContains.getClientId(), ClientStatus.PLAYING, null);
        robot.setNickname("AI_" + getDifficultyName(difficulty));
        robot.setRole(ClientRole.WHITE_PLAYER);
        robot.setRoomId(room.getId());
        room.getClientSideMap().put(robot.getId(), robot);
        room.getClientSideList().add(robot);
        ServerContains.CLIENT_SIDE_MAP.put(robot.getId(), robot);

        ServerContains.addRoom(room);

        // Auto-start game
        GameStartingHandler.handle(clientSide, new GameStartingRequestRecord());
    }

    private static String getDifficultyName(int difficulty) {
        return switch (difficulty) {
            case 2 -> "Medium";
            case 3 -> "Hard";
            default -> "Easy";
        };
    }
}
