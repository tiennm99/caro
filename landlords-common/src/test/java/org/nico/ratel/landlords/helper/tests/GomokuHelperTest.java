package org.nico.ratel.landlords.helper.tests;

import org.junit.Test;
import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.Room;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.enums.GameResult;
import org.nico.ratel.landlords.helper.GomokuHelper;

import static org.junit.Assert.*;

public class GomokuHelperTest {

	@Test
	public void testHorizontalWin() {
		Board board = new Board();
		
		// Place 5 black pieces horizontally
		for (int col = 0; col < 5; col++) {
			assertTrue(board.makeMove(7, col, PieceType.BLACK));
		}
		
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testVerticalWin() {
		Board board = new Board();
		
		// Place 5 black pieces vertically
		for (int row = 0; row < 5; row++) {
			assertTrue(board.makeMove(row, 7, PieceType.BLACK));
		}
		
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testDiagonalWin() {
		Board board = new Board();
		
		// Place 5 black pieces diagonally
		for (int i = 0; i < 5; i++) {
			assertTrue(board.makeMove(i, i, PieceType.BLACK));
		}
		
		assertEquals(GameResult.BLACK_WIN, board.getResult());
	}

	@Test
	public void testInvalidMove() {
		Board board = new Board();
		
		// Place a piece
		assertTrue(board.makeMove(7, 7, PieceType.BLACK));
		
		// Try to place another piece in the same position
		assertFalse(board.makeMove(7, 7, PieceType.WHITE));
	}

	@Test
	public void testOutOfBounds() {
		Board board = new Board();
		
		// Try to place piece outside board
		assertFalse(board.makeMove(-1, 7, PieceType.BLACK));
		assertFalse(board.makeMove(7, -1, PieceType.BLACK));
		assertFalse(board.makeMove(15, 7, PieceType.BLACK));
		assertFalse(board.makeMove(7, 15, PieceType.BLACK));
	}

	@Test
	public void testRoomPlayerTurn() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);
		
		// Initially black player's turn
		assertTrue(room.isPlayerTurn(100));
		assertFalse(room.isPlayerTurn(200));
		
		// Switch turn
		room.switchTurn();
		assertFalse(room.isPlayerTurn(100));
		assertTrue(room.isPlayerTurn(200));
	}

	@Test
	public void testGameMoveValidation() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);
		
		// Valid move for black player
		assertTrue(GomokuHelper.isValidMove(room, 7, 7, 100));
		
		// Invalid move for white player (not their turn)
		assertFalse(GomokuHelper.isValidMove(room, 7, 8, 200));
		
		// Make move and switch turn
		GomokuHelper.makeMove(room, 7, 7, 100);
		
		// Now valid move for white player
		assertTrue(GomokuHelper.isValidMove(room, 7, 8, 200));
		
		// Invalid move for black player (not their turn)
		assertFalse(GomokuHelper.isValidMove(room, 8, 7, 100));
	}

	@Test
	public void testBoardFormatting() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);
		board.makeMove(7, 8, PieceType.WHITE);
		
		String display = GomokuHelper.formatBoardForDisplay(board);
		
		// Check that display contains the board
		assertNotNull(display);
		assertTrue(display.contains("B"));
		assertTrue(display.contains("W"));
	}

	@Test
	public void testGameReset() {
		Room room = new Room(1);
		room.setBlackPlayerId(100);
		room.setWhitePlayerId(200);
		
		// Make some moves
		GomokuHelper.makeMove(room, 7, 7, 100);
		GomokuHelper.makeMove(room, 7, 8, 200);
		
		assertEquals(2, room.getMoveHistory().size());
		
		// Reset game
		room.resetGame();
		
		assertEquals(0, room.getMoveHistory().size());
		assertEquals(GameResult.IN_PROGRESS, room.getGameBoard().getResult());
		assertEquals(PieceType.BLACK, room.getCurrentTurn());
	}
}