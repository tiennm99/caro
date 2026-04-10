package org.nico.ratel.landlords.server.event;

import org.nico.ratel.landlords.channel.ChannelUtils;
import org.nico.ratel.landlords.entity.ClientSide;
import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.GameMove;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.ClientEventCode;
import org.nico.ratel.landlords.enums.GameResult;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.RoomType;
import org.nico.ratel.landlords.helper.GomokuHelper;
import org.nico.ratel.landlords.helper.MapHelper;
import org.nico.ratel.landlords.robot.GomokuAI;
import org.nico.ratel.landlords.server.ServerContains;

import java.util.Map;

public class ServerEventListener_CODE_GAME_MOVE implements ServerEventListener {

	@Override
	public void call(ClientSide clientSide, String data) {
		Room room = ServerContains.getRoom(clientSide.getRoomId());
		if (room == null) {
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_ROOM_PLAY_FAIL_BY_INEXIST, null);
			return;
		}

		Map<String, Object> map = MapHelper.parser(data);
		int row = (int) map.get("row");
		int col = (int) map.get("col");

		// Check turn
		if (!room.isPlayerTurn(clientSide.getId())) {
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_GAME_MOVE_NOT_YOUR_TURN, null);
			return;
		}

		Board board = room.getGameBoard();

		// Check bounds
		if (row < 0 || row >= Board.BOARD_SIZE || col < 0 || col >= Board.BOARD_SIZE) {
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_GAME_MOVE_OUT_OF_BOUNDS, null);
			return;
		}

		// Check occupied
		if (board.getPiece(row, col) != PieceType.EMPTY) {
			ChannelUtils.pushToClient(clientSide.getChannel(), ClientEventCode.CODE_GAME_MOVE_OCCUPIED, null);
			return;
		}

		// Make the move
		GameResult result = GomokuHelper.makeMove(room, row, col, clientSide.getId());

		// Broadcast move to all players and spectators
		String moveResult = MapHelper.newInstance()
				.put("row", row)
				.put("col", col)
				.put("piece", room.getPlayerPiece(clientSide.getId()).name())
				.put("playerNickname", clientSide.getNickname())
				.put("playerId", clientSide.getId())
				.json();
		broadcastToRoom(room, ClientEventCode.CODE_GAME_MOVE_SUCCESS, moveResult);

		// Check game over
		if (result != GameResult.IN_PROGRESS) {
			handleGameOver(room, result);
			return;
		}

		// PVE: trigger AI move if next turn is AI
		if (room.getType() == RoomType.PVE) {
			handleAIMove(room);
		}
	}

	private void handleAIMove(Room room) {
		// Find AI player (the one with null channel)
		ClientSide aiPlayer = null;
		for (ClientSide client : room.getClientSideList()) {
			if (client.getChannel() == null) {
				aiPlayer = client;
				break;
			}
		}

		if (aiPlayer == null || !room.isPlayerTurn(aiPlayer.getId())) {
			return;
		}

		PieceType aiPiece = room.getPlayerPiece(aiPlayer.getId());
		GomokuAI ai = new GomokuAI(aiPiece);
		GameMove aiMove = ai.getNextMove(room.getGameBoard(), room.getDifficultyCoefficient());
		if (aiMove == null) {
			return;
		}

		GameResult result = GomokuHelper.makeMove(room, aiMove.getRow(), aiMove.getCol(), aiPlayer.getId());

		String moveResult = MapHelper.newInstance()
				.put("row", aiMove.getRow())
				.put("col", aiMove.getCol())
				.put("piece", aiPiece.name())
				.put("playerNickname", aiPlayer.getNickname())
				.put("playerId", aiPlayer.getId())
				.json();
		broadcastToRoom(room, ClientEventCode.CODE_GAME_MOVE_SUCCESS, moveResult);

		if (result != GameResult.IN_PROGRESS) {
			handleGameOver(room, result);
		}
	}

	private void handleGameOver(Room room, GameResult result) {
		String winnerNickname = "";
		if (result == GameResult.BLACK_WIN) {
			ClientSide winner = room.getClientSideMap().get(room.getBlackPlayerId());
			winnerNickname = winner != null ? winner.getNickname() : "Black";
		} else if (result == GameResult.WHITE_WIN) {
			ClientSide winner = room.getClientSideMap().get(room.getWhitePlayerId());
			winnerNickname = winner != null ? winner.getNickname() : "White";
		}

		// NOTE: do not include the formatted board here — it contains literal
		// newlines which break the client's nested JSON.parse, leaving `data`
		// as a raw string so data.result becomes undefined and the client
		// always shows "You Lose!". The web client re-renders from its own
		// move history and doesn't need a serialized board.
		String gameOverData = MapHelper.newInstance()
				.put("result", result.name())
				.put("winnerNickname", winnerNickname)
				.json();
		broadcastToRoom(room, ClientEventCode.CODE_GAME_OVER, gameOverData);
	}

	private void broadcastToRoom(Room room, ClientEventCode code, String data) {
		for (ClientSide client : room.getClientSideList()) {
			if (client.getChannel() != null) {
				ChannelUtils.pushToClient(client.getChannel(), code, data);
			}
		}
		for (ClientSide watcher : room.getWatcherList()) {
			ChannelUtils.pushToClient(watcher.getChannel(), code, data);
		}
	}
}
