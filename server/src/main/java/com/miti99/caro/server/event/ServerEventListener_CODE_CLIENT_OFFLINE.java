package com.miti99.caro.server.event;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.helper.MapHelper;
import com.miti99.caro.server.ServerContains;

public class ServerEventListener_CODE_CLIENT_OFFLINE implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		Room room = ServerContains.getRoom(clientSide.getRoomId());

		if (room == null) {
			ServerContains.CLIENT_SIDE_MAP.remove(clientSide.getId());
			return;
		}

		if (room.getWatcherList().contains(clientSide)) {
			room.getWatcherList().remove(clientSide);
			return;
		}

		String result = MapHelper.newInstance()
				.put("roomId", room.getId())
				.put("exitClientId", clientSide.getId())
				.put("exitClientNickname", clientSide.getNickname())
				.json();

		for (ClientSide client : room.getClientSideList()) {
			if (client.getChannel() != null && client.getId() != clientSide.getId()) {
				ChannelUtils.pushToClient(client.getChannel(), ClientEventCode.CODE_CLIENT_EXIT, result);
				client.init();
			}
		}

		ServerContains.removeRoom(room.getId());
	}
}
