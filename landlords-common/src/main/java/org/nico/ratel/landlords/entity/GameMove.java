package org.nico.ratel.landlords.entity;

import org.nico.ratel.landlords.enums.PieceType;

public class GameMove {

	private int row;
	private int col;
	private PieceType piece;
	private int playerId;
	private long timestamp;

	public GameMove() {
		this.timestamp = System.currentTimeMillis();
	}

	public GameMove(int row, int col, PieceType piece, int playerId) {
		this.row = row;
		this.col = col;
		this.piece = piece;
		this.playerId = playerId;
		this.timestamp = System.currentTimeMillis();
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
	}

	public PieceType getPiece() {
		return piece;
	}

	public void setPiece(PieceType piece) {
		this.piece = piece;
	}

	public int getPlayerId() {
		return playerId;
	}

	public void setPlayerId(int playerId) {
		this.playerId = playerId;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return String.format("GameMove{row=%d, col=%d, piece=%s, playerId=%d}", 
							row, col, piece, playerId);
	}
}