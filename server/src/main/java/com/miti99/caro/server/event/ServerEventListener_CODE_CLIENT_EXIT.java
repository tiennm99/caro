package com.miti99.caro.server.event;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.helper.MapHelper;
import com.miti99.caro.server.ServerContains;

public class ServerEventListener_CODE_CLIENT_EXIT implements ServerEventListener {

	private static final Object locked = new Object();

	@Override
	public void call(ClientSide clientSide, String data) {
		synchronized (locked) {
			Room room = ServerContains.getRoom(clientSide.getRoomId());
			if (room == null) {
				return;
			}

			String result = MapHelper.newInstance()
					.put("roomId", room.getId())
					.put("exitClientId", clientSide.getId())
					.put("exitClientNickname", clientSide.getNickname())
					.json();

			for (ClientSide client : room.getClientSideList()) {
				if (client.getChannel() != null) {
					ChannelUtils.pushToClient(client.getChannel(), ClientEventCode.CODE_CLIENT_EXIT, result);
					client.init();
				}
			}

			// Notify spectators
			for (ClientSide watcher : room.getWatcherList()) {
				ChannelUtils.pushToClient(watcher.getChannel(), ClientEventCode.CODE_CLIENT_EXIT, clientSide.getNickname());
			}

			ServerContains.removeRoom(room.getId());
		}
	}
}
