package org.nico.ratel.landlords.robot;

import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.GameMove;
import org.nico.ratel.landlords.enums.PieceType;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class GomokuAI {

	private final Random random = new Random();
	private final PieceType aiPiece;
	private final PieceType opponentPiece;

	public GomokuAI(PieceType aiPiece) {
		this.aiPiece = aiPiece;
		this.opponentPiece = (aiPiece == PieceType.BLACK) ? PieceType.WHITE : PieceType.BLACK;
	}

	public GameMove getNextMove(Board board, int difficulty) {
		switch (difficulty) {
			case 1:
				return getEasyMove(board);
			case 2:
				return getMediumMove(board);
			case 3:
				return getHardMove(board);
			default:
				return getEasyMove(board);
		}
	}

	private GameMove getEasyMove(Board board) {
		// Simple random move
		List<int[]> validMoves = getValidMoves(board);
		if (validMoves.isEmpty()) {
			return null;
		}
		
		int[] move = validMoves.get(random.nextInt(validMoves.size()));
		return new GameMove(move[0], move[1], aiPiece, -1);
	}

	private GameMove getMediumMove(Board board) {
		// Try to win first, then block opponent
		GameMove winMove = findWinningMove(board, aiPiece);
		if (winMove != null) {
			return winMove;
		}
		
		GameMove blockMove = findWinningMove(board, opponentPiece);
		if (blockMove != null) {
			blockMove.setPiece(aiPiece);
			return blockMove;
		}
		
		// Otherwise, make a strategic move
		return getStrategicMove(board);
	}

	private GameMove getHardMove(Board board) {
		// Advanced AI with threat detection and strategic positioning
		GameMove winMove = findWinningMove(board, aiPiece);
		if (winMove != null) {
			return winMove;
		}
		
		GameMove blockMove = findWinningMove(board, opponentPiece);
		if (blockMove != null) {
			blockMove.setPiece(aiPiece);
			return blockMove;
		}
		
		// Look for threat patterns
		GameMove threatMove = findThreatMove(board);
		if (threatMove != null) {
			return threatMove;
		}
		
		return getStrategicMove(board);
	}

	private GameMove findWinningMove(Board board, PieceType piece) {
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				if (board.isValidMove(row, col)) {
					// Temporarily place piece
					Board tempBoard = copyBoard(board);
					tempBoard.makeMove(row, col, piece);
					
					if (tempBoard.getResult().toString().contains("WIN")) {
						return new GameMove(row, col, aiPiece, -1);
					}
				}
			}
		}
		return null;
	}

	private GameMove findThreatMove(Board board) {
		// Look for positions that create multiple threats
		GameMove bestMove = null;
		int maxThreats = 0;
		
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				if (board.isValidMove(row, col)) {
					int threats = countThreats(board, row, col, aiPiece);
					if (threats > maxThreats) {
						maxThreats = threats;
						bestMove = new GameMove(row, col, aiPiece, -1);
					}
				}
			}
		}
		
		return bestMove;
	}

	private int countThreats(Board board, int row, int col, PieceType piece) {
		int threats = 0;
		
		// Check all 4 directions
		int[][] directions = {{0, 1}, {1, 0}, {1, 1}, {1, -1}};
		
		for (int[] dir : directions) {
			int count = 1; // Count the piece we're about to place
			
			// Count in positive direction
			int r = row + dir[0];
			int c = col + dir[1];
			while (r >= 0 && r < Board.BOARD_SIZE && c >= 0 && c < Board.BOARD_SIZE && 
				   board.getPiece(r, c) == piece) {
				count++;
				r += dir[0];
				c += dir[1];
			}
			
			// Count in negative direction
			r = row - dir[0];
			c = col - dir[1];
			while (r >= 0 && r < Board.BOARD_SIZE && c >= 0 && c < Board.BOARD_SIZE && 
				   board.getPiece(r, c) == piece) {
				count++;
				r -= dir[0];
				c -= dir[1];
			}
			
			if (count >= 3) {
				threats++;
			}
		}
		
		return threats;
	}

	private GameMove getStrategicMove(Board board) {
		// Prefer center positions and positions near existing pieces
		GameMove bestMove = null;
		int bestScore = -1;
		
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				if (board.isValidMove(row, col)) {
					int score = evaluatePosition(board, row, col);
					if (score > bestScore) {
						bestScore = score;
						bestMove = new GameMove(row, col, aiPiece, -1);
					}
				}
			}
		}
		
		return bestMove != null ? bestMove : getEasyMove(board);
	}

	private int evaluatePosition(Board board, int row, int col) {
		int score = 0;
		
		// Prefer center positions
		int centerDistance = Math.abs(row - Board.BOARD_SIZE / 2) + Math.abs(col - Board.BOARD_SIZE / 2);
		score += (Board.BOARD_SIZE - centerDistance) * 2;
		
		// Prefer positions near existing pieces
		for (int r = Math.max(0, row - 2); r <= Math.min(Board.BOARD_SIZE - 1, row + 2); r++) {
			for (int c = Math.max(0, col - 2); c <= Math.min(Board.BOARD_SIZE - 1, col + 2); c++) {
				if (board.getPiece(r, c) != PieceType.EMPTY) {
					score += 10;
				}
			}
		}
		
		return score;
	}

	private List<int[]> getValidMoves(Board board) {
		List<int[]> moves = new ArrayList<>();
		
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				if (board.isValidMove(row, col)) {
					moves.add(new int[]{row, col});
				}
			}
		}
		
		return moves;
	}

	private Board copyBoard(Board original) {
		Board copy = new Board();
		for (int row = 0; row < Board.BOARD_SIZE; row++) {
			for (int col = 0; col < Board.BOARD_SIZE; col++) {
				PieceType piece = original.getPiece(row, col);
				if (piece != PieceType.EMPTY) {
					copy.makeMove(row, col, piece);
				}
			}
		}
		return copy;
	}
}