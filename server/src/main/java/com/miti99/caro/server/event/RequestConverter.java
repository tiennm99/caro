package com.miti99.caro.server.event;

import com.miti99.caro.protocol.Request;
import com.miti99.caro.server.event.request.ClientExitRequestRecord;
import com.miti99.caro.server.event.request.ClientRequest;
import com.miti99.caro.server.event.request.CreatePveRoomRequestRecord;
import com.miti99.caro.server.event.request.CreateRoomRequestRecord;
import com.miti99.caro.server.event.request.GameMoveRequestRecord;
import com.miti99.caro.server.event.request.GameReadyRequestRecord;
import com.miti99.caro.server.event.request.GameResetRequestRecord;
import com.miti99.caro.server.event.request.GameStartingRequestRecord;
import com.miti99.caro.server.event.request.GetRoomsRequestRecord;
import com.miti99.caro.server.event.request.HeartbeatRequestRecord;
import com.miti99.caro.server.event.request.JoinRoomRequestRecord;
import com.miti99.caro.server.event.request.SetClientInfoRequestRecord;
import com.miti99.caro.server.event.request.SetNicknameRequestRecord;
import com.miti99.caro.server.event.request.WatchGameExitRequestRecord;
import com.miti99.caro.server.event.request.WatchGameRequestRecord;

/**
 * Converts the wire-level protobuf {@link Request} into one of the sealed
 * {@link ClientRequest} records. Exhaustive switch — the compiler enforces that
 * every oneof variant is covered.
 */
public final class RequestConverter {

    private RequestConverter() {
    }

    public static ClientRequest convert(Request req) {
        return switch (req.getPayloadCase()) {
            case HEARTBEAT -> new HeartbeatRequestRecord();
            case SET_NICKNAME -> new SetNicknameRequestRecord(req.getSetNickname().getNickname());
            case SET_CLIENT_INFO -> new SetClientInfoRequestRecord(req.getSetClientInfo().getVersion());
            case CREATE_ROOM -> new CreateRoomRequestRecord();
            case CREATE_PVE_ROOM -> new CreatePveRoomRequestRecord(req.getCreatePveRoom().getDifficulty());
            case GET_ROOMS -> new GetRoomsRequestRecord();
            case JOIN_ROOM -> new JoinRoomRequestRecord(req.getJoinRoom().getRoomId());
            case GAME_STARTING -> new GameStartingRequestRecord();
            case GAME_READY -> new GameReadyRequestRecord();
            case GAME_MOVE -> new GameMoveRequestRecord(req.getGameMove().getRow(), req.getGameMove().getCol());
            case GAME_RESET -> new GameResetRequestRecord();
            case WATCH_GAME -> new WatchGameRequestRecord(req.getWatchGame().getRoomId());
            case WATCH_GAME_EXIT -> new WatchGameExitRequestRecord();
            case CLIENT_EXIT -> new ClientExitRequestRecord();
            case PAYLOAD_NOT_SET -> throw new IllegalArgumentException("Request payload not set");
        };
    }
}
