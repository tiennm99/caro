package org.nico.ratel.landlords.server.event;

import java.util.LinkedList;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.enums.ClientStatus;
import org.nico.ratel.landlords.enums.RoomStatus;
import org.nico.ratel.landlords.enums.ServerEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.server.ServerContains;

public class ServerEventListener_CODE_ROOM_JOIN implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		Room room = ServerContains.getRoom(Integer.parseInt(data));

		if (room == null) {
			String result = MapHelper.newInstance()
					.put("roomId", data)
					.json();
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_ROOM_JOIN_FAIL_BY_INEXIST, result);
			return;
		}

		// Gomoku is 2-player
		if (room.getClientSideList().size() >= 2) {
			String result = MapHelper.newInstance()
					.put("roomId", room.getId())
					.put("roomOwner", room.getRoomOwner())
					.json();
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_ROOM_JOIN_FAIL_BY_FULL, result);
			return;
		}

		clientSide.setStatus(ClientStatus.READY);
		clientSide.setRoomId(room.getId());

		LinkedList<ClientSide> roomClientList = room.getClientSideList();
		roomClientList.add(clientSide);
		room.getClientSideMap().put(clientSide.getId(), clientSide);
		room.setStatus(RoomStatus.WAIT);

		String result = MapHelper.newInstance()
				.put("clientId", clientSide.getId())
				.put("clientNickname", clientSide.getNickname())
				.put("roomId", room.getId())
				.put("roomOwner", room.getRoomOwner())
				.put("roomClientCount", roomClientList.size())
				.json();

		for (ClientSide client : room.getClientSideMap().values()) {
			if (client.getChannel() != null) {
				ChannelUtils.pushToClient(client.getChannel(), ClientEventCode.CODE_ROOM_JOIN_SUCCESS, result);
			}
		}

		// Auto-start when 2 players joined
		if (roomClientList.size() == 2) {
			ServerEventListener.get(ServerEventCode.CODE_GAME_STARTING).call(clientSide, String.valueOf(room.getId()));
			return;
		}

		// Notify spectators
		for (ClientSide watcher : room.getWatcherList()) {
			ChannelUtils.pushToClient(watcher.getChannel(), ClientEventCode.CODE_ROOM_JOIN_SUCCESS, clientSide.getNickname());
		}
	}
}
