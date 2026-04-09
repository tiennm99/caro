package org.nico.ratel.landlords.server.event;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.server.ServerContains;

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
