package com.miti99.caro.server.event;

import com.miti99.caro.common.channel.ChannelUtils;
import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.ClientEventCode;
import com.miti99.caro.common.enums.ClientRole;
import com.miti99.caro.common.enums.ClientStatus;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.RoomType;
import com.miti99.caro.common.enums.ServerEventCode;
import com.miti99.caro.server.ServerContains;

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
		return switch (difficulty) {
			case 2 -> "Medium";
			case 3 -> "Hard";
			default -> "Easy";
		};
	}
}
