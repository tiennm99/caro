package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.server.event.request.GameResetRequestRecord;

/**
 * Placeholder for the {@code game_reset} request. The original server never
 * implemented this listener — see the audit in the migration plan. Left as a
 * no-op so the sealed dispatch remains exhaustive.
 */
public final class GameResetHandler {

    private GameResetHandler() {
    }

    public static void handle(ClientSide client, GameResetRequestRecord req) {
        // Not implemented — intentional no-op.
    }
}
