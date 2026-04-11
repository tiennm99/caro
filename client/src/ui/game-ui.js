/**
 * Game UI — DOM overlay for player info, move history, game over, and toasts.
 * Rendered on top of the Phaser canvas during gameplay.
 * @module game-ui
 */

import { connectionService } from '../services/connection-service.js';
import { eventBus } from '../services/event-bus.js';
import { gameState } from '../services/game-state-service.js';
import { ClientEventCode } from '../config/protocol-constants.js';

const overlay = () => document.getElementById('ui-overlay');

/**
 * Show the game HUD (player panels + move history + controls).
 */
export function showGameHud() {
  const el = overlay();
  el.innerHTML = `
    <div class="game-hud">
      <div class="hud-top">
        <div class="player-panel" id="panel-black">
          <span class="stone-dot black"></span>
          <span class="player-name" id="hud-black-name">${gameState.blackPlayerNickname}</span>
          <span class="turn-dot" id="turn-black"></span>
        </div>
        <div class="hud-vs">VS</div>
        <div class="player-panel" id="panel-white">
          <span class="stone-dot white"></span>
          <span class="player-name" id="hud-white-name">${gameState.whitePlayerNickname}</span>
          <span class="turn-dot" id="turn-white"></span>
        </div>
      </div>
      <div class="hud-side" id="move-history">
        <div class="hud-side-title">Moves</div>
        <div class="move-list" id="move-list"></div>
      </div>
      <div class="hud-bottom">
        <button id="btn-exit-game" class="menu-btn danger small">Exit</button>
        <button id="btn-toggle-sound" class="menu-btn ghost small">🔊</button>
      </div>
    </div>
  `;
  el.style.display = 'flex';
  document.getElementById('btn-exit-game').addEventListener('click', () => {
    connectionService.sendClientExit();
  });
  updateTurnIndicator();
}

/** Update the turn indicator dots. */
export function updateTurnIndicator() {
  const blackDot = document.getElementById('turn-black');
  const whiteDot = document.getElementById('turn-white');
  if (!blackDot || !whiteDot) return;
  blackDot.classList.toggle('active', gameState.currentTurn === 'BLACK');
  whiteDot.classList.toggle('active', gameState.currentTurn === 'WHITE');
}

/**
 * Add a move entry to the history panel.
 * @param {{ row: number, col: number, piece: string, playerNickname: string }} data
 */
export function addMoveToHistory(data) {
  const list = document.getElementById('move-list');
  if (!list) return;
  const n = gameState.moves.length;
  const col = String.fromCharCode(65 + data.col);
  const row = data.row + 1;
  const div = document.createElement('div');
  div.className = `move-entry ${data.piece.toLowerCase()}`;
  div.textContent = `#${n} ${data.piece === 'BLACK' ? '●' : '○'} ${col}${row}`;
  list.appendChild(div);
  list.scrollTop = list.scrollHeight;
}

/**
 * Show the game over overlay.
 * Determines win/lose from the game result + the player's piece, not by
 * comparing nicknames — nickname comparison breaks if the server's stored
 * nickname drifts from the client's local copy (e.g. rejected-length cases).
 * @param {{ result: string, winnerNickname: string }} data
 */
export function showGameOver(data) {
  let resultText, resultClass;
  if (data.result === 'DRAW') {
    resultText = 'Draw!';
    resultClass = 'draw';
  } else if (gameState.isSpectating) {
    resultText = 'Game Over';
    resultClass = 'draw';
  } else {
    const iWon = (data.result === 'BLACK_WIN' && gameState.isBlack)
      || (data.result === 'WHITE_WIN' && !gameState.isBlack);
    resultText = iWon ? 'You Win!' : 'You Lose!';
    resultClass = iWon ? 'win' : 'lose';
  }

  const el = overlay();
  el.innerHTML += `
    <div class="game-over-overlay">
      <div class="game-over-card">
        <div class="result-text ${resultClass}">${resultText}</div>
        ${data.winnerNickname ? `<div class="winner-name">Winner: ${data.winnerNickname}</div>` : ''}
        <div class="game-over-buttons">
          <button id="btn-rematch" class="menu-btn primary">Rematch</button>
          <button id="btn-exit-lobby" class="menu-btn secondary">Exit to Lobby</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('btn-rematch').addEventListener('click', () => {
    connectionService.sendGameReady();
  });
  document.getElementById('btn-exit-lobby').addEventListener('click', () => {
    connectionService.sendClientExit();
  });
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'info'|'error'|'success'} [type='info']
 */
export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Register error toasts
eventBus.on(ClientEventCode.ROOM_JOIN_FAIL_FULL, () => showToast('Room is full', 'error'));
eventBus.on(ClientEventCode.ROOM_JOIN_FAIL_INEXIST, () => showToast('Room not found', 'error'));
eventBus.on(ClientEventCode.GAME_MOVE_NOT_YOUR_TURN, () => showToast('Not your turn', 'error'));
eventBus.on(ClientEventCode.GAME_MOVE_OCCUPIED, () => showToast('Position occupied', 'error'));
eventBus.on(ClientEventCode.GAME_MOVE_OUT_OF_BOUNDS, () => showToast('Out of bounds', 'error'));
eventBus.on(ClientEventCode.GAME_MOVE_INVALID, () => showToast('Invalid move', 'error'));
eventBus.on(ClientEventCode.PVE_DIFFICULTY_NOT_SUPPORT, () => showToast('Difficulty not supported', 'error'));
eventBus.on('ws:disconnected', () => showToast('Connection lost. Reconnecting...', 'error'));
