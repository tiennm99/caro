package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.GameMove;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.protocol.GameMoveSuccessResponse;
import com.miti99.caro.protocol.GameStartingResponse;
import com.miti99.caro.protocol.Response;
import com.miti99.caro.protocol.RoomJoinFailNotFoundResponse;
import com.miti99.caro.protocol.WatchGameSuccessResponse;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.WatchGameRequestRecord;

import io.netty.channel.Channel;

public final class WatchGameHandler {

    private static final int BOARD_SIZE = 15;

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

        Channel watcherChannel = clientSide.getChannel();
        ChannelUtils.push(watcherChannel, Response.newBuilder()
                .setWatchGameSuccess(WatchGameSuccessResponse.newBuilder()
                        .setOwner(room.getRoomOwner() == null ? "" : room.getRoomOwner())
                        .setStatus(room.getStatus() == null ? "" : room.getStatus().toString()))
                .build());

        // If the game is already running, bootstrap the watcher with the current
        // player pairing and replay every move so their board renders correctly.
        // Without this a mid-game watcher joins a blank scene.
        if (room.getStatus() == RoomStatus.STARTING) {
            bootstrapWatcher(watcherChannel, room);
        }
    }

    private static void bootstrapWatcher(Channel watcherChannel, Room room) {
        ClientSide blackPlayer = room.getClientSideMap().get(room.getBlackPlayerId());
        ClientSide whitePlayer = room.getClientSideMap().get(room.getWhitePlayerId());
        if (blackPlayer == null || whitePlayer == null) {
            return;
        }

        ChannelUtils.push(watcherChannel, Response.newBuilder()
                .setGameStarting(GameStartingResponse.newBuilder()
                        .setRoomId(room.getId())
                        .setBlackPlayerId(blackPlayer.getId())
                        .setBlackPlayerNickname(blackPlayer.getNickname() == null ? "" : blackPlayer.getNickname())
                        .setWhitePlayerId(whitePlayer.getId())
                        .setWhitePlayerNickname(whitePlayer.getNickname() == null ? "" : whitePlayer.getNickname())
                        .setBoardSize(BOARD_SIZE))
                .build());

        for (GameMove move : room.getMoveHistory()) {
            ClientSide mover = room.getClientSideMap().get(move.getPlayerId());
            String moverNickname = mover != null && mover.getNickname() != null ? mover.getNickname() : "";
            ChannelUtils.push(watcherChannel, Response.newBuilder()
                    .setGameMoveSuccess(GameMoveSuccessResponse.newBuilder()
                            .setRow(move.getRow())
                            .setCol(move.getCol())
                            .setPiece(move.getPiece() == null ? "" : move.getPiece().name())
                            .setPlayerNickname(moverNickname)
                            .setPlayerId(move.getPlayerId()))
                    .build());
        }
    }
}
