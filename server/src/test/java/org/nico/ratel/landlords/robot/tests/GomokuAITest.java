package org.nico.ratel.landlords.robot.tests;

import org.junit.jupiter.api.Test;
import org.nico.ratel.landlords.entity.Board;
import org.nico.ratel.landlords.entity.GameMove;
import org.nico.ratel.landlords.enums.PieceType;
import org.nico.ratel.landlords.robot.GomokuAI;

import static org.junit.jupiter.api.Assertions.*;

public class GomokuAITest {

	@Test
	public void testEasyAIReturnsValidMove() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		GameMove move = ai.getNextMove(board, 1);

		assertNotNull(move);
		assertTrue(board.isValidMove(move.getRow(), move.getCol()));
		assertEquals(PieceType.WHITE, move.getPiece());
	}

	@Test
	public void testMediumAIReturnsValidMove() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		GameMove move = ai.getNextMove(board, 2);

		assertNotNull(move);
		assertTrue(board.isValidMove(move.getRow(), move.getCol()));
	}

	@Test
	public void testHardAIReturnsValidMove() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		GameMove move = ai.getNextMove(board, 3);

		assertNotNull(move);
		assertTrue(board.isValidMove(move.getRow(), move.getCol()));
	}

	@Test
	public void testMediumAITakesWinningMove() {
		Board board = new Board();
		// AI (WHITE) has 4 in a row at row 5, cols 0-3
		board.makeMove(5, 0, PieceType.WHITE);
		board.makeMove(5, 1, PieceType.WHITE);
		board.makeMove(5, 2, PieceType.WHITE);
		board.makeMove(5, 3, PieceType.WHITE);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		GameMove move = ai.getNextMove(board, 2);

		assertNotNull(move);
		// AI should place at (5,4) to win
		assertEquals(5, move.getRow());
		assertEquals(4, move.getCol());
	}

	@Test
	public void testMediumAIBlocksOpponentWin() {
		Board board = new Board();
		// Opponent (BLACK) has 4 in a row at row 3, cols 2-5
		board.makeMove(3, 2, PieceType.BLACK);
		board.makeMove(3, 3, PieceType.BLACK);
		board.makeMove(3, 4, PieceType.BLACK);
		board.makeMove(3, 5, PieceType.BLACK);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		GameMove move = ai.getNextMove(board, 2);

		assertNotNull(move);
		// AI should block at (3,1) or (3,6)
		assertEquals(3, move.getRow());
		assertTrue(move.getCol() == 1 || move.getCol() == 6);
	}

	@Test
	public void testAIOnEmptyBoard() {
		Board board = new Board();
		GomokuAI ai = new GomokuAI(PieceType.BLACK);
		GameMove move = ai.getNextMove(board, 2);

		assertNotNull(move);
		assertTrue(board.isValidMove(move.getRow(), move.getCol()));
	}

	@Test
	public void testAIAsBlackPiece() {
		Board board = new Board();
		GomokuAI ai = new GomokuAI(PieceType.BLACK);
		GameMove move = ai.getNextMove(board, 1);

		assertNotNull(move);
		assertEquals(PieceType.BLACK, move.getPiece());
	}

	@Test
	public void testDefaultDifficultyFallsBackToEasy() {
		Board board = new Board();
		board.makeMove(7, 7, PieceType.BLACK);

		GomokuAI ai = new GomokuAI(PieceType.WHITE);
		// Invalid difficulty should fall back to easy
		GameMove move = ai.getNextMove(board, 99);

		assertNotNull(move);
		assertTrue(board.isValidMove(move.getRow(), move.getCol()));
	}
}
