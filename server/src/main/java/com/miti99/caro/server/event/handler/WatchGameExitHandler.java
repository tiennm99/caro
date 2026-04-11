package com.miti99.caro.server.event.handler;

import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.print.SimplePrinter;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.request.WatchGameExitRequestRecord;

public final class WatchGameExitHandler {

    private WatchGameExitHandler() {
    }

    public static void handle(ClientSide clientSide, WatchGameExitRequestRecord req) {
        Room room = ServerContains.getRoom(clientSide.getRoomId());
        if (room != null) {
            clientSide.setRoomId(room.getId());
            boolean removed = room.getWatcherList().remove(clientSide);
            if (removed) {
                SimplePrinter.serverLog(clientSide.getNickname() + " exit room " + room.getId());
            }
        }
    }
}
