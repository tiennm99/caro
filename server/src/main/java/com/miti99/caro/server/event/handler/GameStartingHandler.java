package com.miti99.caro.server.event.handler;

import java.util.LinkedList;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientRole;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.PieceType;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.protocol.GameStartingResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.GameStartingRequestRecord;

public final class GameStartingHandler {

    private static final int BOARD_SIZE = 15;

    private GameStartingHandler() {
    }

    public static void handle(ClientSide clientSide, GameStartingRequestRecord req) {
        Room room = ServerContains.getRoom(clientSide.getRoomId());
        if (room == null) {
            return;
        }

        LinkedList<ClientSide> roomClientList = room.getClientSideList();
        if (roomClientList.size() < 2) {
            return;
        }

        ClientSide blackPlayer = roomClientList.get(0);
        ClientSide whitePlayer = roomClientList.get(1);

        blackPlayer.setRole(ClientRole.BLACK_PLAYER);
        whitePlayer.setRole(ClientRole.WHITE_PLAYER);
        blackPlayer.setStatus(ClientStatus.PLAYING);
        whitePlayer.setStatus(ClientStatus.PLAYING);

        room.setBlackPlayerId(blackPlayer.getId());
        room.setWhitePlayerId(whitePlayer.getId());
        room.setCurrentTurn(PieceType.BLACK);
        room.setStatus(RoomStatus.STARTING);
        room.setCreateTime(System.currentTimeMillis());
        room.setLastFlushTime(System.currentTimeMillis());
        room.resetGame();

        Response response = Response.newBuilder()
                .setGameStarting(GameStartingResponse.newBuilder()
                        .setRoomId(room.getId())
                        .setBlackPlayerId(blackPlayer.getId())
                        .setBlackPlayerNickname(blackPlayer.getNickname() == null ? "" : blackPlayer.getNickname())
                        .setWhitePlayerId(whitePlayer.getId())
                        .setWhitePlayerNickname(whitePlayer.getNickname() == null ? "" : whitePlayer.getNickname())
                        .setBoardSize(BOARD_SIZE))
                .build();

        for (ClientSide client : roomClientList) {
            if (client.getChannel() != null) {
                ChannelUtils.push(client.getChannel(), response);
            }
        }
        for (ClientSide watcher : room.getWatcherList()) {
            ChannelUtils.push(watcher.getChannel(), response);
        }
    }
}
