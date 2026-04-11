package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.Board;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.GameMove;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.GameResult;
import com.miti99.caro.common.enums.PieceType;
import com.miti99.caro.common.enums.RoomType;
import com.miti99.caro.common.helper.GomokuHelper;
import com.miti99.caro.common.robot.GomokuAI;
import com.miti99.caro.protocol.GameMoveNotYourTurnResponse;
import com.miti99.caro.protocol.GameMoveOccupiedResponse;
import com.miti99.caro.protocol.GameMoveOutOfBoundsResponse;
import com.miti99.caro.protocol.GameMoveSuccessResponse;
import com.miti99.caro.protocol.GameOverResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomPlayFailNotFoundResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.GameMoveRequestRecord;

public final class GameMoveHandler {

    private GameMoveHandler() {
    }

    public static void handle(ClientSide clientSide, GameMoveRequestRecord req) {
        Room room = ServerContains.getRoom(clientSide.getRoomId());
        if (room == null) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setRoomPlayFailNotFound(RoomPlayFailNotFoundResponse.getDefaultInstance())
                    .build());
            return;
        }

        int row = req.row();
        int col = req.col();

        if (!room.isPlayerTurn(clientSide.getId())) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setGameMoveNotYourTurn(GameMoveNotYourTurnResponse.getDefaultInstance())
                    .build());
            return;
        }

        Board board = room.getGameBoard();

        if (row < 0 || row >= Board.BOARD_SIZE || col < 0 || col >= Board.BOARD_SIZE) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setGameMoveOutOfBounds(GameMoveOutOfBoundsResponse.getDefaultInstance())
                    .build());
            return;
        }

        if (board.getPiece(row, col) != PieceType.EMPTY) {
            ChannelUtils.push(clientSide.getChannel(), Response.newBuilder()
                    .setGameMoveOccupied(GameMoveOccupiedResponse.getDefaultInstance())
                    .build());
            return;
        }

        GameResult result = GomokuHelper.makeMove(room, row, col, clientSide.getId());

        broadcastToRoom(room, Response.newBuilder()
                .setGameMoveSuccess(GameMoveSuccessResponse.newBuilder()
                        .setRow(row)
                        .setCol(col)
                        .setPiece(room.getPlayerPiece(clientSide.getId()).name())
                        .setPlayerNickname(clientSide.getNickname() == null ? "" : clientSide.getNickname())
                        .setPlayerId(clientSide.getId()))
                .build());

        if (result != GameResult.IN_PROGRESS) {
            handleGameOver(room, result);
            return;
        }

        if (room.getType() == RoomType.PVE) {
            handleAIMove(room);
        }
    }

    private static void handleAIMove(Room room) {
        ClientSide aiPlayer = null;
        for (ClientSide client : room.getClientSideList()) {
            if (client.getChannel() == null) {
                aiPlayer = client;
                break;
            }
        }
        if (aiPlayer == null || !room.isPlayerTurn(aiPlayer.getId())) {
            return;
        }

        PieceType aiPiece = room.getPlayerPiece(aiPlayer.getId());
        GomokuAI ai = new GomokuAI(aiPiece);
        GameMove aiMove = ai.getNextMove(room.getGameBoard(), room.getDifficultyCoefficient());
        if (aiMove == null) {
            return;
        }

        GameResult result = GomokuHelper.makeMove(room, aiMove.getRow(), aiMove.getCol(), aiPlayer.getId());

        broadcastToRoom(room, Response.newBuilder()
                .setGameMoveSuccess(GameMoveSuccessResponse.newBuilder()
                        .setRow(aiMove.getRow())
                        .setCol(aiMove.getCol())
                        .setPiece(aiPiece.name())
                        .setPlayerNickname(aiPlayer.getNickname() == null ? "" : aiPlayer.getNickname())
                        .setPlayerId(aiPlayer.getId()))
                .build());

        if (result != GameResult.IN_PROGRESS) {
            handleGameOver(room, result);
        }
    }

    private static void handleGameOver(Room room, GameResult result) {
        String winnerNickname = "";
        if (result == GameResult.BLACK_WIN) {
            ClientSide winner = room.getClientSideMap().get(room.getBlackPlayerId());
            winnerNickname = winner != null ? winner.getNickname() : "Black";
        } else if (result == GameResult.WHITE_WIN) {
            ClientSide winner = room.getClientSideMap().get(room.getWhitePlayerId());
            winnerNickname = winner != null ? winner.getNickname() : "White";
        }

        broadcastToRoom(room, Response.newBuilder()
                .setGameOver(GameOverResponse.newBuilder()
                        .setResult(result.name())
                        .setWinnerNickname(winnerNickname == null ? "" : winnerNickname))
                .build());
    }

    private static void broadcastToRoom(Room room, Response response) {
        for (ClientSide client : room.getClientSideList()) {
            if (client.getChannel() != null) {
                ChannelUtils.push(client.getChannel(), response);
            }
        }
        for (ClientSide watcher : room.getWatcherList()) {
            ChannelUtils.push(watcher.getChannel(), response);
        }
    }
}
