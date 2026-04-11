package com.miti99.caro.server.event.request;

/**
 * Sealed taxonomy of every client-to-server request. One record per oneof variant
 * of {@code miti99.caro.protocol.Request}. Exhaustive pattern matching in
 * {@code com.miti99.caro.server.event.RequestDispatcher}.
 */
public sealed interface ClientRequest
        permits HeartbeatRequestRecord,
                SetNicknameRequestRecord,
                SetClientInfoRequestRecord,
                CreateRoomRequestRecord,
                CreatePveRoomRequestRecord,
                GetRoomsRequestRecord,
                JoinRoomRequestRecord,
                GameStartingRequestRecord,
                GameReadyRequestRecord,
                GameMoveRequestRecord,
                GameResetRequestRecord,
                WatchGameRequestRecord,
                WatchGameExitRequestRecord,
                ClientExitRequestRecord {
}
