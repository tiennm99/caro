package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.server.event.request.SetClientInfoRequestRecord;

public final class SetClientInfoHandler {

    private static final String DEFAULT_VERSION = "v1.2.8";

    private SetClientInfoHandler() {
    }

    public static void handle(ClientSide client, SetClientInfoRequestRecord req) {
        String version = req.version();
        if (version == null || version.isEmpty()) {
            client.setVersion(DEFAULT_VERSION);
        } else {
            client.setVersion(version);
        }
    }
}
