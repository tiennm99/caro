package com.miti99.caro.server.event;

import com.miti99.caro.common.entity.ClientSide;
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
 * Routes a {@link ClientRequest} record to its handler via exhaustive pattern
 * matching. Replaces the old reflection-based {@code ServerEventListener} lookup.
 *
 * <p>Phase 02a: only {@code HeartbeatRequestRecord} has a real no-op implementation;
 * every other case throws {@link UnsupportedOperationException} pending Phase 02b.
 */
public final class RequestDispatcher {

    private RequestDispatcher() {
    }

    public static void dispatch(ClientSide client, ClientRequest req) {
        switch (req) {
            case HeartbeatRequestRecord r -> {
                /* no-op: heartbeat just refreshes IdleStateHandler */
            }
            case SetNicknameRequestRecord r -> throw todo("set_nickname");
            case SetClientInfoRequestRecord r -> throw todo("set_client_info");
            case CreateRoomRequestRecord r -> throw todo("create_room");
            case CreatePveRoomRequestRecord r -> throw todo("create_pve_room");
            case GetRoomsRequestRecord r -> throw todo("get_rooms");
            case JoinRoomRequestRecord r -> throw todo("join_room");
            case GameStartingRequestRecord r -> throw todo("game_starting");
            case GameReadyRequestRecord r -> throw todo("game_ready");
            case GameMoveRequestRecord r -> throw todo("game_move");
            case GameResetRequestRecord r -> throw todo("game_reset");
            case WatchGameRequestRecord r -> throw todo("watch_game");
            case WatchGameExitRequestRecord r -> throw todo("watch_game_exit");
            case ClientExitRequestRecord r -> throw todo("client_exit");
        }
    }

    private static UnsupportedOperationException todo(String name) {
        return new UnsupportedOperationException("TODO phase 02b: " + name);
    }
}
