/**
 * GameScene — renders the Gomoku board, handles clicks and move events.
 * Uses Board for grid rendering, Stone for pieces, DOM overlay for HUD.
 * @module game-scene
 */

import Phaser from 'phaser';
import { Board } from '../objects/board.js';
import { Stone, createLastMoveMarker } from '../objects/stone.js';
import { eventBus } from '../services/event-bus.js';
import { gameState } from '../services/game-state-service.js';
import { connectionService } from '../services/connection-service.js';
import { ServerEventCode, ClientEventCode } from '../config/protocol-constants.js';
import { showGameHud, updateTurnIndicator, addMoveToHistory, showGameOver } from '../ui/game-ui.js';
import { showLobby } from '../ui/menu-ui.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    /** @type {Board|null} */
    this.board = null;
    /** @type {Stone[]} */
    this.stones = [];
    /** @type {Phaser.GameObjects.Graphics|null} */
    this.lastMarker = null;
    /** @type {Phaser.GameObjects.Graphics|null} */
    this.hoverGraphic = null;
    /** @type {{ row: number, col: number }|null} */
    this.hoverPos = null;

    // Bind handlers for cleanup
    this._onMoveSuccess = this._onMoveSuccess.bind(this);
    this._onGameOver = this._onGameOver.bind(this);
    this._onClientExit = this._onClientExit.bind(this);
    this._onGameStarting = this._onGameStarting.bind(this);
  }

  create() {
    this.board = new Board(this, 800);
    this.stones = [];
    this.lastMarker = null;

    // Hover preview graphic
    this.hoverGraphic = this.add.graphics();
    this.hoverGraphic.setDepth(5);

    // Click handler
    this.input.on('pointerdown', this._handleClick, this);
    this.input.on('pointermove', this._handleHover, this);

    // Show game HUD overlay
    showGameHud();

    // Draw any existing moves (rejoin/spectate scenario)
    for (const move of gameState.moves) {
      this._placeStone(move.row, move.col, move.piece, false);
    }

    // Register event handlers
    eventBus.on(ClientEventCode.GAME_MOVE_SUCCESS, this._onMoveSuccess);
    eventBus.on(ClientEventCode.GAME_OVER, this._onGameOver);
    eventBus.on(ClientEventCode.CLIENT_EXIT, this._onClientExit);
    eventBus.on(ClientEventCode.CLIENT_KICK, this._onClientExit);
    eventBus.on(ClientEventCode.GAME_STARTING, this._onGameStarting);

    // Play stone sound setup
    this._audioCtx = null;
    this.input.once('pointerdown', () => {
      this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    });
  }

  /**
   * Place a stone on the board.
   * @param {number} row
   * @param {number} col
   * @param {string} piece - 'BLACK' or 'WHITE'
   * @param {boolean} [animate=true]
   * @private
   */
  _placeStone(row, col, piece, animate = true) {
    const x = this.board.gridX(col);
    const y = this.board.gridY(row);
    const stone = new Stone(this, x, y, piece, this.board.getCellSize(), animate);
    stone.setDepth(10);
    this.stones.push(stone);

    // Update last move marker
    if (this.lastMarker) this.lastMarker.destroy();
    this.lastMarker = createLastMoveMarker(this, x, y);
    this.lastMarker.setDepth(15);
  }

  /** @private */
  _playStoneSound() {
    if (!this._audioCtx) return;
    try {
      const osc = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this._audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.12, this._audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this._audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(this._audioCtx.currentTime + 0.08);
    } catch (_) { /* ignore */ }
  }

  /**
   * Handle board click — send move to server.
   * @param {Phaser.Input.Pointer} pointer
   * @private
   */
  _handleClick(pointer) {
    if (gameState.isSpectating || !gameState.isMyTurn()) return;
    const pos = this.board.pixelToGrid(pointer.x, pointer.y);
    if (!pos) return;
    if (gameState.isOccupied(pos.row, pos.col)) return;
    connectionService.send(ServerEventCode.GAME_MOVE, { row: pos.row, col: pos.col });
  }

  /**
   * Handle hover — show preview stone.
   * Only clears/redraws when the target cell actually changes, otherwise the
   * preview flickers on every micro-movement (clear + early-return without redraw).
   * @param {Phaser.Input.Pointer} pointer
   * @private
   */
  _handleHover(pointer) {
    if (gameState.isSpectating || !gameState.isMyTurn()) {
      if (this.hoverPos) {
        this.hoverGraphic.clear();
        this.hoverPos = null;
      }
      return;
    }
    const pos = this.board.pixelToGrid(pointer.x, pointer.y);
    if (!pos || gameState.isOccupied(pos.row, pos.col)) {
      if (this.hoverPos) {
        this.hoverGraphic.clear();
        this.hoverPos = null;
      }
      return;
    }
    // Still on the same cell — keep existing preview drawn, nothing to do.
    if (this.hoverPos && this.hoverPos.row === pos.row && this.hoverPos.col === pos.col) return;
    // Moved to a new cell — clear old preview and draw at new location.
    this.hoverGraphic.clear();
    this.hoverPos = pos;
    const x = this.board.gridX(pos.col);
    const y = this.board.gridY(pos.row);
    const color = gameState.isBlack ? 0x222222 : 0xf5f5f5;
    this.hoverGraphic.fillStyle(color, 0.35);
    this.hoverGraphic.fillCircle(x, y, this.board.getCellSize() * 0.43);
  }

  /**
   * Handle successful move from server.
   * @param {{ row: number, col: number, piece: string, playerNickname: string }} data
   * @private
   */
  _onMoveSuccess(data) {
    this._placeStone(data.row, data.col, data.piece, true);
    this._playStoneSound();
    addMoveToHistory(data);
    updateTurnIndicator();
    this.hoverGraphic.clear();
  }

  /**
   * Handle game over.
   * @param {{ result: string, winnerNickname: string }} data
   * @private
   */
  _onGameOver(data) {
    showGameOver(data);
    // Play win/lose sound. Determine outcome from result + piece, not nickname
    // (see showGameOver comment — nickname comparison is unreliable).
    if (!this._audioCtx) return;
    const isWin = !gameState.isSpectating && (
      (data.result === 'BLACK_WIN' && gameState.isBlack)
      || (data.result === 'WHITE_WIN' && !gameState.isBlack)
    );
    const freq = isWin ? [523, 659, 784] : [400, 300];
    freq.forEach((f, i) => {
      setTimeout(() => {
        try {
          const osc = this._audioCtx.createOscillator();
          const gain = this._audioCtx.createGain();
          osc.connect(gain);
          gain.connect(this._audioCtx.destination);
          osc.type = isWin ? 'sine' : 'triangle';
          osc.frequency.value = f;
          gain.gain.setValueAtTime(0.12, this._audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this._audioCtx.currentTime + 0.2);
          osc.start();
          osc.stop(this._audioCtx.currentTime + 0.2);
        } catch (_) { /* ignore */ }
      }, i * 150);
    });
  }

  /**
   * Handle client exit — return to menu.
   * @private
   */
  _onClientExit() {
    this._cleanup();
    this.scene.start('MenuScene');
    showLobby();
  }

  /**
   * Handle rematch — new game starting while already in GameScene.
   * @private
   */
  _onGameStarting() {
    // Clear existing stones and redraw board
    this.stones.forEach(s => s.destroy());
    this.stones = [];
    if (this.lastMarker) { this.lastMarker.destroy(); this.lastMarker = null; }
    this.hoverGraphic.clear();
    showGameHud();
  }

  /** @private */
  _cleanup() {
    eventBus.off(ClientEventCode.GAME_MOVE_SUCCESS, this._onMoveSuccess);
    eventBus.off(ClientEventCode.GAME_OVER, this._onGameOver);
    eventBus.off(ClientEventCode.CLIENT_EXIT, this._onClientExit);
    eventBus.off(ClientEventCode.CLIENT_KICK, this._onClientExit);
    eventBus.off(ClientEventCode.GAME_STARTING, this._onGameStarting);
  }

  shutdown() {
    this._cleanup();
  }
}
