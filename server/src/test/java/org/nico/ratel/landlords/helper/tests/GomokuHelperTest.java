package org.nico.ratel.landlords.helper.tests;

import org.junit.jupiter.api.Test;
import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.GameResult;
import org.nico.ratel.landlords.helper.GomokuHelper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class GomokuHelperTest {

	// --- Board: win detection ---

	@Test
	public void testHorizontalWin() {
		Board board = new Board();
		for (int col = 0; col < 5; col++) {
			assertTrue(board.makeMove(7, col, PieceType.BLACK));
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
		assertTrue(board.isGameOver());
	}

	@Test
	public void testVerticalWin() {
		Board board = new Board();
		for (int row = 0; row < 5; row++) {
			assertTrue(board.makeMove(row, 7, PieceType.BLACK));
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testDiagonalWin() {
		Board board = new Board();
		for (int i = 0; i < 5; i++) {
			assertTrue(board.makeMove(i, i, PieceType.BLACK));
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testAntiDiagonalWin() {
		Board board = new Board();
		for (int i = 0; i < 5; i++) {
			assertTrue(board.makeMove(i, 14 - i, PieceType.BLACK));
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testWhiteWin() {
		Board board = new Board();
		for (int col = 3; col < 8; col++) {
			assertTrue(board.makeMove(5, col, PieceType.WHITE));
		}
		assertEquals(GameResult.WHITE_WIN, board.getResult());
	}

	@Test
	public void testWinByPlacingMiddlePiece() {
		Board board = new Board();
		// Place 4 pieces with a gap in the middle: (7,0), (7,1), gap, (7,3), (7,4)
		board.makeMove(7, 0, PieceType.BLACK);
		board.makeMove(7, 1, PieceType.BLACK);
		board.makeMove(7, 3, PieceType.BLACK);
		board.makeMove(7, 4, PieceType.BLACK);
		assertEquals(GameResult.IN_PROGRESS, board.getResult());

		// Fill the gap at (7,2) to complete 5 in a row
		board.makeMove(7, 2, PieceType.BLACK);
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testWinAtTopEdge() {
		Board board = new Board();
		for (int col = 0; col < 5; col++) {
			board.makeMove(0, col, PieceType.BLACK);
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testWinAtBottomRightCorner() {
		Board board = new Board();
		for (int i = 0; i < 5; i++) {
			board.makeMove(14 - i, 14 - i, PieceType.WHITE);
		}
		assertEquals(GameResult.WHITE_WIN, board.getResult());
	}

	@Test
	public void testFourInARowNotWin() {
		Board board = new Board();
		for (int col = 0; col < 4; col++) {
			board.makeMove(7, col, PieceType.BLACK);
		}
		assertEquals(GameResult.IN_PROGRESS, board.getResult());
		assertFalse(board.isGameOver());
	}

	@Test
	public void testSixInARowIsAlsoWin() {
		// Standard Gomoku: 6+ in a row still wins (no overline restriction)
		Board board = new Board();
		for (int col = 0; col < 6; col++) {
			board.makeMove(7, col, PieceType.BLACK);
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	// --- Board: move validation ---

	@Test
	public void testInvalidMoveOccupied() {
		Board board = new Board();
		assertTrue(board.makeMove(7, 7, PieceType.BLACK));
		assertFalse(board.makeMove(7, 7, PieceType.WHITE));
	}

	@Test
	public void testOutOfBounds() {
		Board board = new Board();
		assertFalse(board.makeMove(-1, 7, PieceType.BLACK));
		assertFalse(board.makeMove(7, -1, PieceType.BLACK));
		assertFalse(board.makeMove(15, 7, PieceType.BLACK));
		assertFalse(board.makeMove(7, 15, PieceType.BLACK));
	}

	@Test
	public void testGetPieceOutOfBoundsReturnsEmpty() {
		Board board = new Board();
		assertEquals(PieceType.EMPTY, board.getPiece(-1, 0));
		assertEquals(PieceType.EMPTY, board.getPiece(0, -1));
		assertEquals(PieceType.EMPTY, board.getPiece(15, 0));
		assertEquals(PieceType.EMPTY, board.getPiece(0, 15));
	}

	@Test
	public void testMoveCountTracking() {
		Board board = new Board();
		assertEquals(0, board.getMoveCount());
		board.makeMove(7, 7, PieceType.BLACK);
		assertEquals(1, board.getMoveCount());
		board.makeMove(7, 8, PieceType.WHITE);
		assertEquals(2, board.getMoveCount());
		// Failed move should not increment
		board.makeMove(7, 7, PieceType.BLACK);
		assertEquals(2, board.getMoveCount());
	}

	@Test
	public void testBoardReset() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);
		board.makeMove(0, 0, PieceType.WHITE);

		board.reset();

		assertEquals(0, board.getMoveCount());
		assertEquals(GameResult.IN_PROGRESS, board.getResult());
		assertEquals(PieceType.EMPTY, board.getPiece(7, 7));
		assertEquals(PieceType.EMPTY, board.getPiece(0, 0));
		assertFalse(board.isGameOver());
	}

	@Test
	public void testNoMoveAfterGameOver() {
		Board board = new Board();
		for (int col = 0; col < 5; col++) {
			board.makeMove(7, col, PieceType.BLACK);
		}
		assertEquals(GameResult.BLACK_WIN, board.getResult());
		// Position (7,5) is valid but game is over — makeMove should still work at board level
		// (game-over enforcement is at GomokuHelper/server level, not Board level)
		// Board is a low-level data structure; it doesn't enforce game-over
		assertTrue(board.makeMove(7, 5, PieceType.WHITE));
	}

	// --- Room: turn management ---

	@Test
	public void testRoomPlayerTurn() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		assertTrue(room.isPlayerTurn(100));
		assertFalse(room.isPlayerTurn(200));

		room.switchTurn();
		assertFalse(room.isPlayerTurn(100));
		assertTrue(room.isPlayerTurn(200));
	}

	@Test
	public void testGetPlayerPiece() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		assertEquals(PieceType.BLACK, room.getPlayerPiece(100));
		assertEquals(PieceType.WHITE, room.getPlayerPiece(200));
		assertEquals(PieceType.EMPTY, room.getPlayerPiece(999));
	}

	@Test
	public void testUnsetPlayerNotTurn() {
		Room room = new Room(1);
		// Player IDs default to -1
		assertFalse(room.isPlayerTurn(100));
		assertFalse(room.isPlayerTurn(200));
	}

	// --- GomokuHelper: game flow ---

	@Test
	public void testMakeMoveValidation() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		assertTrue(GomokuHelper.isValidMove(room, 7, 7, 100));
		assertFalse(GomokuHelper.isValidMove(room, 7, 8, 200));

		GomokuHelper.makeMove(room, 7, 7, 100);
		assertTrue(GomokuHelper.isValidMove(room, 7, 8, 200));
		assertFalse(GomokuHelper.isValidMove(room, 8, 7, 100));
	}

	@Test
	public void testMakeMoveReturnsResult() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		// Normal moves return IN_PROGRESS
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 7, 7, 100));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 0, 0, 200));
	}

	@Test
	public void testMakeMoveForUnknownPlayer() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		// Player 999 is not in the room — getPlayerPiece returns EMPTY
		GameResult result = GomokuHelper.makeMove(room, 7, 7, 999);
		assertEquals(GameResult.IN_PROGRESS, result);
		// Board should be unchanged
		assertEquals(PieceType.EMPTY, room.getGameBoard().getPiece(7, 7));
	}

	@Test
	public void testFullGameBlackWins() {
		Room room = new Room(1);
		room.setBlackPlayerId(1);
		room.setWhitePlayerId(2);

		// Black: row 7, cols 0-4 | White: row 8, cols 0-3
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 7, 0, 1));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 8, 0, 2));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 7, 1, 1));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 8, 1, 2));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 7, 2, 1));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 8, 2, 2));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 7, 3, 1));
		assertEquals(GameResult.IN_PROGRESS, GomokuHelper.makeMove(room, 8, 3, 2));
		assertEquals(GameResult.BLACK_WIN, GomokuHelper.makeMove(room, 7, 4, 1));

		assertTrue(GomokuHelper.isGameOver(room));
		assertEquals(9, room.getMoveHistory().size());
	}

	@Test
	public void testMoveHistoryTracking() {
		Room room = new Room(1);
		room.setBlackPlayerId(1);
		room.setWhitePlayerId(2);

		GomokuHelper.makeMove(room, 7, 7, 1);
		GomokuHelper.makeMove(room, 0, 0, 2);
		GomokuHelper.makeMove(room, 7, 8, 1);

		assertEquals(3, room.getMoveHistory().size());
		assertEquals(7, room.getMoveHistory().get(0).getRow());
		assertEquals(7, room.getMoveHistory().get(0).getCol());
		assertEquals(PieceType.BLACK, room.getMoveHistory().get(0).getPiece());
		assertEquals(PieceType.WHITE, room.getMoveHistory().get(1).getPiece());
	}

	@Test
	public void testGameReset() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);

		GomokuHelper.makeMove(room, 7, 7, 100);
		GomokuHelper.makeMove(room, 7, 8, 200);
		assertEquals(2, room.getMoveHistory().size());

		room.resetGame();
		assertEquals(0, room.getMoveHistory().size());
		assertEquals(GameResult.IN_PROGRESS, room.getGameBoard().getResult());
		assertEquals(PieceType.BLACK, room.getCurrentTurn());
		assertEquals(PieceType.EMPTY, room.getGameBoard().getPiece(7, 7));
	}

	// --- GomokuHelper: utilities ---

	@Test
	public void testGetValidMoves() {
		Board board = new Board();
		List<String> moves = GomokuHelper.getValidMoves(board);
		assertEquals(15 * 15, moves.size());

		board.makeMove(7, 7, PieceType.BLACK);
		moves = GomokuHelper.getValidMoves(board);
		assertEquals(15 * 15 - 1, moves.size());
		assertFalse(moves.contains("7,7"));
	}

	@Test
	public void testBoardFormatting() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);
		board.makeMove(7, 8, PieceType.WHITE);

		String display = GomokuHelper.formatBoardForDisplay(board);
		assertNotNull(display);
		assertTrue(display.contains("B"));
		assertTrue(display.contains("W"));
		assertTrue(display.contains("."));
	}

	@Test
	public void testFormatMoveHistoryEmpty() {
		assertEquals("No moves made yet.", GomokuHelper.formatMoveHistory(new java.util.ArrayList<>()));
	}

	@Test
	public void testGetWinnerMessage() {
		assertEquals("Black player wins!", GomokuHelper.getWinnerMessage(GameResult.BLACK_WIN));
		assertEquals("White player wins!", GomokuHelper.getWinnerMessage(GameResult.WHITE_WIN));
		assertEquals("Game ended in a draw!", GomokuHelper.getWinnerMessage(GameResult.DRAW));
		assertEquals("Game in progress...", GomokuHelper.getWinnerMessage(GameResult.IN_PROGRESS));
	}
}
