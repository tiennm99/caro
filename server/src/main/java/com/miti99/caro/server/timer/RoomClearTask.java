package com.miti99.caro.server.timer;

import java.util.Map;
import java.util.TimerTask;

import com.miti99.caro.common.entity.ClientSide;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.RoomStatus;
import com.miti99.caro.common.enums.ServerEventCode;
import com.miti99.caro.common.print.SimplePrinter;
import com.miti99.caro.server.ServerContains;
import com.miti99.caro.server.event.ServerEventListener;

/**
 * Periodically cleans up idle or expired rooms.
 */
public class RoomClearTask extends TimerTask {

	// Room wait time after creation: 100s
	private static final long waitingStatusInterval = 1000 * 100;

	// Room live time: 20 minutes
	private static final long liveTime = 1000 * 60 * 20;

	@Override
	public void run() {
		try {
			doing();
		} catch (Exception e) {
			SimplePrinter.serverLog(e.getMessage());
		}
	}

	public void doing() {
		Map<Integer, Room> rooms = ServerContains.getRoomMap();
		if (rooms == null || rooms.isEmpty()) {
			return;
		}

		long now = System.currentTimeMillis();
		for (Room room : rooms.values()) {
			long alreadyLiveTime = now - room.getCreateTime();
			if (alreadyLiveTime > liveTime) {
				SimplePrinter.serverLog("room " + room.getId() + " live time overflow, closed!");
				closeRoom(room);
				continue;
			}

			long diff = now - room.getLastFlushTime();
			if (room.getStatus() != RoomStatus.STARTING && diff > waitingStatusInterval) {
				SimplePrinter.serverLog("room " + room.getId() + " waiting time overflow, closed!");
				closeRoom(room);
			}
		}
	}

	private void closeRoom(Room room) {
		if (!room.getClientSideList().isEmpty()) {
			ClientSide first = room.getClientSideList().get(0);
			ServerEventListener.get(ServerEventCode.CODE_CLIENT_EXIT).call(first, null);
		} else {
			ServerContains.removeRoom(room.getId());
		}
	}
}
