package com.miti99.caro.common.helper;

import com.miti99.caro.common.entity.Board;
import com.miti99.caro.common.entity.GameMove;
import com.miti99.caro.common.entity.Room;
import com.miti99.caro.common.enums.PieceType;
import com.miti99.caro.common.enums.GameResult;

import java.util.List;
import java.util.ArrayList;

public class GomokuHelper {

	public static boolean isValidMove(Room room, int row, int col, int playerId) {
		// Check if it's the player's turn
		if (!room.isPlayerTurn(playerId)) {
			return false;
		}
		
		// Check if the position is valid and empty
		return room.getGameBoard().isValidMove(row, col);
	}

	public static GameResult makeMove(Room room, int row, int col, int playerId) {
		PieceType piece = room.getPlayerPiece(playerId);
		
		if (piece == PieceType.EMPTY) {
			return GameResult.IN_PROGRESS;
		}
		
		// Make the move on the board
		boolean success = room.getGameBoard().makeMove(row, col, piece);
		
		if (success) {
			// Add to move history
			GameMove move = new GameMove(row, col, piece, playerId);
			room.addMove(move);
			
			// Switch turns
			room.switchTurn();
			
			return room.getGameBoard().getResult();
		}
		
		return GameResult.IN_PROGRESS;
	}

	public static String formatBoardForDisplay(Board board) {
		StringBuilder sb = new StringBuilder();
		sb.append("  ");
		
		// Add column headers
		for (int i = 0; i < Board.BOARD_SIZE; i++) {
			sb.append(String.format("%2d", i));
		}
		sb.append("\n");
		
		// Add rows
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			sb.append(String.format("%2d", row));
			
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				var piece = board.getPiece(row, col);
				char symbol = switch (piece) {
					case BLACK -> 'B';
					case WHITE -> 'W';
					case EMPTY -> '.';
				};
				sb.append(" ").append(symbol);
			}
			sb.append("\n");
		}
		
		return sb.toString();
	}

	public static String formatMoveHistory(List<GameMove> moves) {
		if (moves.isEmpty()) {
			return "No moves made yet.";
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append("Move History:\n");
		
		for (int i = 0; i < moves.size(); i++) {
			GameMove move = moves.get(i);
			sb.append(String.format("%d. %s at (%d,%d)\n", 
						i + 1, 
						move.getPiece().getMsg(), 
						move.getRow(), 
						move.getCol()));
		}
		
		return sb.toString();
	}

	public static List<String> getValidMoves(Board board) {
		List<String> validMoves = new ArrayList<>();
		
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				if (board.isValidMove(row, col)) {
					validMoves.add(row + "," + col);
				}
			}
		}
		
		return validMoves;
	}

	public static boolean isGameOver(Room room) {
		return room.getGameBoard().isGameOver();
	}

	public static GameResult getGameResult(Room room) {
		return room.getGameBoard().getResult();
	}

	public static String getWinnerMessage(GameResult result) {
		return switch (result) {
			case BLACK_WIN -> "Black player wins!";
			case WHITE_WIN -> "White player wins!";
			case DRAW -> "Game ended in a draw!";
			case IN_PROGRESS -> "Game in progress...";
		};
	}
}