package org.nico.ratel.landlords.server.event;

import java.util.LinkedList;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.enums.ClientRole;
import org.nico.ratel.landlords.enums.ClientStatus;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.RoomStatus;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.server.ServerContains;

public class ServerEventListener_CODE_GAME_STARTING implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		Room room = ServerContains.getRoom(clientSide.getRoomId());
		if (room == null) {
			return;
		}

		LinkedList<ClientSide> roomClientList = room.getClientSideList();
		if (roomClientList.size() < 2) {
			return;
		}

		// Assign players: first = BLACK, second = WHITE
		ClientSide blackPlayer = roomClientList.get(0);
		ClientSide whitePlayer = roomClientList.get(1);

		blackPlayer.setRole(ClientRole.BLACK_PLAYER);
		whitePlayer.setRole(ClientRole.WHITE_PLAYER);
		blackPlayer.setStatus(ClientStatus.PLAYING);
		whitePlayer.setStatus(ClientStatus.PLAYING);

		room.setBlackPlayerId(blackPlayer.getId());
		room.setWhitePlayerId(whitePlayer.getId());
		room.setCurrentTurn(PieceType.BLACK);
		room.setStatus(RoomStatus.STARTING);
		room.setCreateTime(System.currentTimeMillis());
		room.setLastFlushTime(System.currentTimeMillis());
		room.resetGame();

		String result = MapHelper.newInstance()
				.put("roomId", room.getId())
				.put("blackPlayerId", blackPlayer.getId())
				.put("blackPlayerNickname", blackPlayer.getNickname())
				.put("whitePlayerId", whitePlayer.getId())
				.put("whitePlayerNickname", whitePlayer.getNickname())
				.put("boardSize", 15)
				.json();

		// Notify human players
		for (ClientSide client : roomClientList) {
			if (client.getChannel() != null) {
				ChannelUtils.pushToClient(client.getChannel(), ClientEventCode.CODE_GAME_STARTING, result);
			}
		}

		// Notify spectators
		for (ClientSide watcher : room.getWatcherList()) {
			ChannelUtils.pushToClient(watcher.getChannel(), ClientEventCode.CODE_GAME_STARTING, result);
		}
	}
}
