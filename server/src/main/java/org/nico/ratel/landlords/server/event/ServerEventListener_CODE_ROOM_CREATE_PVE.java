package org.nico.ratel.landlords.server.event;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.enums.ClientRole;
import org.nico.ratel.landlords.enums.ClientStatus;
import org.nico.ratel.landlords.enums.RoomStatus;
import org.nico.ratel.landlords.enums.RoomType;
import org.nico.ratel.landlords.enums.ServerEventCode;
import org.nico.ratel.landlords.server.ServerContains;

public class ServerEventListener_CODE_ROOM_CREATE_PVE implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		int difficulty = Integer.parseInt(data);
		if (difficulty < 1 || difficulty > 3) {
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_PVE_DIFFICULTY_NOT_SUPPORT, null);
			return;
		}

		Room room = new Room(ServerContains.getServerId());
		room.setType(RoomType.PVE);
		room.setStatus(RoomStatus.WAIT);
		room.setRoomOwner(clientSide.getNickname());
		room.setDifficultyCoefficient(difficulty);
		room.setCreateTime(System.currentTimeMillis());
		room.setLastFlushTime(System.currentTimeMillis());

		// Add human player
		room.getClientSideMap().put(clientSide.getId(), clientSide);
		room.getClientSideList().add(clientSide);
		clientSide.setRoomId(room.getId());
		clientSide.setRole(ClientRole.BLACK_PLAYER);

		// Add AI robot (1 robot for 2-player Gomoku)
		ClientSide robot = new ClientSide(-ServerContains.getClientId(), ClientStatus.PLAYING, null);
		robot.setNickname("AI_" + getDifficultyName(difficulty));
		robot.setRole(ClientRole.WHITE_PLAYER);
		robot.setRoomId(room.getId());
		room.getClientSideMap().put(robot.getId(), robot);
		room.getClientSideList().add(robot);
		ServerContains.CLIENT_SIDE_MAP.put(robot.getId(), robot);

		ServerContains.addRoom(room);

		// Auto-start game
		ServerEventListener.get(ServerEventCode.CODE_GAME_STARTING).call(clientSide, String.valueOf(room.getId()));
	}

	private String getDifficultyName(int difficulty) {
		switch (difficulty) {
			case 1: return "Easy";
			case 2: return "Medium";
			case 3: return "Hard";
			default: return "Easy";
		}
	}
}
