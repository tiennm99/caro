package com.miti99.caro.server.event;

import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.server.event.handler.ClientExitHandler;
import com.miti99.caro.server.event.handler.CreatePveRoomHandler;
import com.miti99.caro.server.event.handler.CreateRoomHandler;
import com.miti99.caro.server.event.handler.GameMoveHandler;
import com.miti99.caro.server.event.handler.GameReadyHandler;
import com.miti99.caro.server.event.handler.GameResetHandler;
import com.miti99.caro.server.event.handler.GameStartingHandler;
import com.miti99.caro.server.event.handler.GetRoomsHandler;
import com.miti99.caro.server.event.handler.JoinRoomHandler;
import com.miti99.caro.server.event.handler.SetClientInfoHandler;
import com.miti99.caro.server.event.handler.SetNicknameHandler;
import com.miti99.caro.server.event.handler.WatchGameExitHandler;
import com.miti99.caro.server.event.handler.WatchGameHandler;
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
 */
public final class RequestDispatcher {

    private RequestDispatcher() {
    }

    public static void dispatch(ClientSide client, ClientRequest req) {
        switch (req) {
            case HeartbeatRequestRecord r -> {
                /* no-op: heartbeat just refreshes IdleStateHandler */
            }
            case SetNicknameRequestRecord r -> SetNicknameHandler.handle(client, r);
            case SetClientInfoRequestRecord r -> SetClientInfoHandler.handle(client, r);
            case CreateRoomRequestRecord r -> CreateRoomHandler.handle(client, r);
            case CreatePveRoomRequestRecord r -> CreatePveRoomHandler.handle(client, r);
            case GetRoomsRequestRecord r -> GetRoomsHandler.handle(client, r);
            case JoinRoomRequestRecord r -> JoinRoomHandler.handle(client, r);
            case GameStartingRequestRecord r -> GameStartingHandler.handle(client, r);
            case GameReadyRequestRecord r -> GameReadyHandler.handle(client, r);
            case GameMoveRequestRecord r -> GameMoveHandler.handle(client, r);
            case GameResetRequestRecord r -> GameResetHandler.handle(client, r);
            case WatchGameRequestRecord r -> WatchGameHandler.handle(client, r);
            case WatchGameExitRequestRecord r -> WatchGameExitHandler.handle(client, r);
            case ClientExitRequestRecord r -> ClientExitHandler.handle(client, r);
        }
    }
}
