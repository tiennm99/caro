package org.nico.ratel.landlords.entity;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.locks.ReentrantLock;

import org.nico.noson.annotations.JsonIgnore;
import org.nico.ratel.landlords.enums.RoomStatus;
import org.nico.ratel.landlords.enums.RoomType;
import org.nico.ratel.landlords.enums.PieceType;

public class Room {

	private int id;

	private String roomOwner;

	private RoomStatus status;

	private RoomType type;

	private Map<Integer, ClientSide> clientSideMap;

	private LinkedList<ClientSide> clientSideList;

	private Board gameBoard;

	private int currentPlayer = -1;

	private int blackPlayerId = -1;

	private int whitePlayerId = -1;

	private PieceType currentTurn = PieceType.BLACK;

	private int difficultyCoefficient;

	private long lastFlushTime;

	private long createTime;

	private List<GameMove> moveHistory;

	/** List of spectators */
	private List<ClientSide> watcherList = new ArrayList<>(5);

	private int scoreRate = 1;

	private int baseScore = 3;

	public Room() {
	}

	public Room(int id) {
		this.id = id;
		this.clientSideMap = new ConcurrentSkipListMap<>();
		this.clientSideList = new LinkedList<>();
		this.status = RoomStatus.WAIT;
		this.createTime = System.currentTimeMillis();
		this.gameBoard = new Board();
		this.moveHistory = new ArrayList<>();
		this.currentTurn = PieceType.BLACK;
	}

	public int getScore() {
		return this.baseScore * this.scoreRate;
	}

	public int getBaseScore() {
		return this.baseScore;
	}

	public void setBaseScore(int baseScore) {
		this.baseScore = baseScore;
	}

	public int getScoreRate() {
		return this.scoreRate;
	}

	public void setScoreRate(int scoreRate) {
		this.scoreRate = scoreRate;
	}

	public void initScoreRate() {
		this.scoreRate = 1;
	}

	public void increaseRate() {
		this.scoreRate *= 2;
	}

	public final long getCreateTime() {
		return createTime;
	}

	public final void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public final int getDifficultyCoefficient() {
		return difficultyCoefficient;
	}

	public final void setDifficultyCoefficient(int difficultyCoefficient) {
		this.difficultyCoefficient = difficultyCoefficient;
	}

	public final RoomType getType() {
		return type;
	}

	public final void setType(RoomType type) {
		this.type = type;
	}

	public final Board getGameBoard() {
		return gameBoard;
	}

	public final void setGameBoard(Board gameBoard) {
		this.gameBoard = gameBoard;
	}

	public final int getCurrentPlayer() {
		return currentPlayer;
	}

	public final void setCurrentPlayer(int currentPlayer) {
		this.currentPlayer = currentPlayer;
	}

	public long getLastFlushTime() {
		return lastFlushTime;
	}

	public void setLastFlushTime(long lastFlushTime) {
		this.lastFlushTime = lastFlushTime;
	}

	public int getBlackPlayerId() {
		return blackPlayerId;
	}

	public void setBlackPlayerId(int blackPlayerId) {
		this.blackPlayerId = blackPlayerId;
	}

	public int getWhitePlayerId() {
		return whitePlayerId;
	}

	public void setWhitePlayerId(int whitePlayerId) {
		this.whitePlayerId = whitePlayerId;
	}

	public PieceType getCurrentTurn() {
		return currentTurn;
	}

	public void setCurrentTurn(PieceType currentTurn) {
		this.currentTurn = currentTurn;
	}

	public void switchTurn() {
		this.currentTurn = (this.currentTurn == PieceType.BLACK) ? PieceType.WHITE : PieceType.BLACK;
	}

	public LinkedList<ClientSide> getClientSideList() {
		return clientSideList;
	}

	public void setClientSideList(LinkedList<ClientSide> clientSideList) {
		this.clientSideList = clientSideList;
	}

	public List<GameMove> getMoveHistory() {
		return moveHistory;
	}

	public void setMoveHistory(List<GameMove> moveHistory) {
		this.moveHistory = moveHistory;
	}

	public void addMove(GameMove move) {
		this.moveHistory.add(move);
	}

	public void resetGame() {
		this.gameBoard.reset();
		this.moveHistory.clear();
		this.currentTurn = PieceType.BLACK;
	}

	public final String getRoomOwner() {
		return roomOwner;
	}

	public final void setRoomOwner(String roomOwner) {
		this.roomOwner = roomOwner;
	}

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final RoomStatus getStatus() {
		return status;
	}

	public final void setStatus(RoomStatus status) {
		this.status = status;
	}

	public final Map<Integer, ClientSide> getClientSideMap() {
		return clientSideMap;
	}

	public final void setClientSideMap(Map<Integer, ClientSide> clientSideMap) {
		this.clientSideMap = clientSideMap;
	}

	public boolean isPlayerTurn(int playerId) {
		return (currentTurn == PieceType.BLACK && playerId == blackPlayerId) ||
			   (currentTurn == PieceType.WHITE && playerId == whitePlayerId);
	}

	public PieceType getPlayerPiece(int playerId) {
		if (playerId == blackPlayerId) {
			return PieceType.BLACK;
		} else if (playerId == whitePlayerId) {
			return PieceType.WHITE;
		}
		return PieceType.EMPTY;
	}

	public List<ClientSide> getWatcherList() {
		return watcherList;
	}
}
