package org.nico.ratel.landlords.server.event;

import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.print.SimplePrinter;
import org.nico.ratel.landlords.server.ServerContains;

public class ServerEventListener_CODE_GAME_WATCH_EXIT implements ServerEventListener {

    @Override
    public void call(ClientSide clientSide, String data) {
        Room room = ServerContains.getRoom(clientSide.getRoomId());

        if (room != null) {
            // Remove spectator from room's watcher list if room exists
            clientSide.setRoomId(room.getId());
            boolean successful = room.getWatcherList().remove(clientSide);
            if (successful) {
                SimplePrinter.serverLog(clientSide.getNickname() + " exit room " + room.getId());
            }
        }
    }
}
