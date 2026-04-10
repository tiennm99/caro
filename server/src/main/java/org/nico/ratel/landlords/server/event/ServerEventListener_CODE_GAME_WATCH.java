package org.nico.ratel.landlords.server.event;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.server.ServerContains;
import org.nico.ratel.landlords.utils.JsonUtils;

import java.util.HashMap;
import java.util.Map;

public class ServerEventListener_CODE_GAME_WATCH implements ServerEventListener {

    @Override
    public void call(ClientSide clientSide, String data) {
        Room room = ServerContains.getRoom(Integer.parseInt(data));

        if (room == null) {
            String result = MapHelper.newInstance()
                    .put("roomId", data)
                    .json();

            ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_ROOM_JOIN_FAIL_BY_INEXIST, result);
        } else {
            // Add user to the room's spectator list
            clientSide.setRoomId(room.getId());
            room.getWatcherList().add(clientSide);

            Map<String, String> map = new HashMap<>(16);
            map.put("owner", room.getRoomOwner());
            map.put("status", room.getStatus().toString());
            ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_GAME_WATCH_SUCCESSFUL, JsonUtils.toJson(map));
        }
    }
}
