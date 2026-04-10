package com.miti99.caro.server.event;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.ServerEventCode;
import com.miti99.caro.common.helper.MapHelper;
import com.miti99.caro.server.ServerContains;

public class ServerEventListener_CODE_GAME_READY implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		Room room = ServerContains.getRoom(clientSide.getRoomId());
		if (room == null || room.getStatus() == RoomStatus.STARTING) {
			return;
		}
		if (clientSide.getStatus() == ClientStatus.PLAYING) {
			return;
		}

		// Toggle ready state
		clientSide.setStatus(clientSide.getStatus() == ClientStatus.READY ? ClientStatus.NO_READY : ClientStatus.READY);

		String result = MapHelper.newInstance()
				.put("clientNickName", clientSide.getNickname())
				.put("status", clientSide.getStatus())
				.put("clientId", clientSide.getId())
				.json();

		// Check if all human players are ready (need 2 players)
		boolean allReady = room.getClientSideMap().size() >= 2;
		for (ClientSide client : room.getClientSideList()) {
			if (client.getChannel() != null && client.getStatus() != ClientStatus.READY) {
				allReady = false;
			}
		}

		// Notify all human players
		for (ClientSide client : room.getClientSideList()) {
			if (client.getChannel() != null) {
				ChannelUtils.pushToClient(client.getChannel(), ClientEventCode.CODE_GAME_READY, result);
			}
		}

		if (allReady) {
			ServerEventListener.get(ServerEventCode.CODE_GAME_STARTING).call(clientSide, data);
		}
	}
}
