package org.nico.ratel.landlords.helper;

import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.GameMove;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.GameResult;

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
				PieceType piece = board.getPiece(row, col);
				char symbol = '.';
				
				switch (piece) {
					case BLACK:
						symbol = 'B';
						break;
					case WHITE:
						symbol = 'W';
						break;
					case EMPTY:
						symbol = '.';
						break;
				}
				
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
		switch (result) {
			case BLACK_WIN:
				return "Black player wins!";
			case WHITE_WIN:
				return "White player wins!";
			case DRAW:
				return "Game ended in a draw!";
			default:
				return "Game in progress...";
		}
	}
}