package com.miti99.caro.server.event;

import java.util.LinkedList;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.ServerEventCode;
import com.miti99.caro.common.helper.MapHelper;
import com.miti99.caro.server.ServerContains;

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
