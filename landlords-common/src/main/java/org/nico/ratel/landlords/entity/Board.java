package org.nico.ratel.landlords.entity;

import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.GameResult;

public class Board {

	public static final int BOARD_SIZE = 15;
	public static final int WIN_CONDITION = 5;

	private PieceType[][] board;
	private int moveCount;
	private GameResult result;

	public Board() {
		this.board = new PieceType[BOARD_SIZE][BOARD_SIZE];
		this.moveCount = 0;
		this.result = GameResult.IN_PROGRESS;
		initializeBoard();
	}

	private void initializeBoard() {
		for (int i = 0; i < BOARD_SIZE; i++) {
			for (int j = 0; j < BOARD_SIZE; j++) {
				board[i][j] = PieceType.EMPTY;
			}
		}
	}

	public boolean isValidMove(int row, int col) {
		return row >= 0 && row < BOARD_SIZE && 
			   col >= 0 && col < BOARD_SIZE && 
			   board[row][col] == PieceType.EMPTY;
	}

	public boolean makeMove(int row, int col, PieceType piece) {
		if (!isValidMove(row, col)) {
			return false;
		}
		
		board[row][col] = piece;
		moveCount++;
		
		// Check for win condition
		if (checkWin(row, col, piece)) {
			result = (piece == PieceType.BLACK) ? GameResult.BLACK_WIN : GameResult.WHITE_WIN;
		} else if (moveCount >= BOARD_SIZE * BOARD_SIZE) {
			result = GameResult.DRAW;
		}
		
		return true;
	}

	private boolean checkWin(int row, int col, PieceType piece) {
		// Check horizontal
		if (checkDirection(row, col, 0, 1, piece) || 
			checkDirection(row, col, 0, -1, piece)) {
			return true;
		}
		
		// Check vertical
		if (checkDirection(row, col, 1, 0, piece) || 
			checkDirection(row, col, -1, 0, piece)) {
			return true;
		}
		
		// Check diagonal (top-left to bottom-right)
		if (checkDirection(row, col, 1, 1, piece) || 
			checkDirection(row, col, -1, -1, piece)) {
			return true;
		}
		
		// Check diagonal (top-right to bottom-left)
		if (checkDirection(row, col, 1, -1, piece) || 
			checkDirection(row, col, -1, 1, piece)) {
			return true;
		}
		
		return false;
	}

	private boolean checkDirection(int row, int col, int deltaRow, int deltaCol, PieceType piece) {
		int count = 1; // Count the current piece
		
		// Check in positive direction
		int r = row + deltaRow;
		int c = col + deltaCol;
		while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] == piece) {
			count++;
			r += deltaRow;
			c += deltaCol;
		}
		
		// Check in negative direction
		r = row - deltaRow;
		c = col - deltaCol;
		while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] == piece) {
			count++;
			r -= deltaRow;
			c -= deltaCol;
		}
		
		return count >= WIN_CONDITION;
	}

	public void reset() {
		this.moveCount = 0;
		this.result = GameResult.IN_PROGRESS;
		initializeBoard();
	}

	public PieceType getPiece(int row, int col) {
		if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
			return board[row][col];
		}
		return PieceType.EMPTY;
	}

	public PieceType[][] getBoard() {
		return board;
	}

	public int getMoveCount() {
		return moveCount;
	}

	public GameResult getResult() {
		return result;
	}

	public boolean isGameOver() {
		return result != GameResult.IN_PROGRESS;
	}
}