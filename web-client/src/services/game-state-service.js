/**
 * Game state service — stores all client-side game state.
 * Pure data container with reset methods, no game logic.
 * @module game-state-service
 */

import { eventBus } from './event-bus.js';
import { ClientEventCode } from '../config/protocol-constants.js';

/**
 * @typedef {Object} MoveEntry
 * @property {number} row
 * @property {number} col
 * @property {string} piece - 'BLACK' or 'WHITE'
 * @property {string} playerNickname
 * @property {number} playerId
 */

class GameStateService {
  constructor() {
    /** @type {number|null} */
    this.clientId = null;
    /** @type {string} */
    this.nickname = '';
    /** @type {number|null} */
    this.roomId = null;
    /** @type {boolean} */
    this.isBlack = false;
    /** @type {boolean} */
    this.isSpectating = false;
    /** @type {string} - 'BLACK' or 'WHITE' */
    this.currentTurn = 'BLACK';
    /** @type {MoveEntry[]} */
    this.moves = [];
    /** @type {number} */
    this.boardSize = 15;
    /** @type {string} */
    this.blackPlayerNickname = '';
    /** @type {string} */
    this.whitePlayerNickname = '';
    /** @type {number} */
    this.blackPlayerId = -1;
    /** @type {number} */
    this.whitePlayerId = -1;

    this._registerHandlers();
  }

  /** @returns {boolean} */
  isMyTurn() {
    if (this.isSpectating) return false;
    const myPiece = this.isBlack ? 'BLACK' : 'WHITE';
    return this.currentTurn === myPiece;
  }

  /** Reset room and game state (on exit/kick). */
  reset() {
    this.roomId = null;
    this.isSpectating = false;
    this.resetBoard();
  }

  /** Reset board state (on new game / rematch). */
  resetBoard() {
    this.moves = [];
    this.currentTurn = 'BLACK';
    this.isBlack = false;
    this.blackPlayerNickname = '';
    this.whitePlayerNickname = '';
    this.blackPlayerId = -1;
    this.whitePlayerId = -1;
  }

  /**
   * Check if a board position is occupied.
   * @param {number} row
   * @param {number} col
   * @returns {boolean}
   */
  isOccupied(row, col) {
    return this.moves.some(m => m.row === row && m.col === col);
  }

  /** @private */
  _registerHandlers() {
    eventBus.on(ClientEventCode.CLIENT_CONNECT, (data) => {
      this.clientId = parseInt(data);
    });

    eventBus.on(ClientEventCode.GAME_STARTING, (data) => {
      this.resetBoard();
      this.roomId = data.roomId;
      this.blackPlayerId = data.blackPlayerId;
      this.blackPlayerNickname = data.blackPlayerNickname;
      this.whitePlayerId = data.whitePlayerId;
      this.whitePlayerNickname = data.whitePlayerNickname;
      this.boardSize = data.boardSize || 15;
      this.isBlack = (this.clientId === data.blackPlayerId);
      this.currentTurn = 'BLACK';
    });

    eventBus.on(ClientEventCode.GAME_MOVE_SUCCESS, (data) => {
      this.moves.push(data);
      this.currentTurn = (data.piece === 'BLACK') ? 'WHITE' : 'BLACK';
    });

    eventBus.on(ClientEventCode.CLIENT_EXIT, () => this.reset());
    eventBus.on(ClientEventCode.CLIENT_KICK, () => this.reset());
  }
}

export const gameState = new GameStateService();
