/**
 * Menu UI — DOM overlay for nickname, lobby, PVP/PVE menus, room list, waiting room.
 * @module menu-ui
 */

import { connectionService } from '../services/connection-service.js';
import { eventBus } from '../services/event-bus.js';
import { gameState } from '../services/game-state-service.js';
import { ClientEventCode } from '../config/protocol-constants.js';
import { showToast } from './game-ui.js';

const overlay = () => document.getElementById('ui-overlay');

/**
 * Show a screen in the overlay.
 * @param {string} html
 */
function showOverlay(html) {
  const el = overlay();
  el.innerHTML = html;
  el.style.display = 'flex';
}

/** Hide the overlay. */
export function hideOverlay() {
  const el = overlay();
  el.innerHTML = '';
  el.style.display = 'none';
}

/** Show nickname entry screen. */
export function showNicknameScreen() {
  // Server enforces 1..10 chars (see ServerEventListener_CODE_CLIENT_NICKNAME_SET).
  // Keep client limit in lockstep to avoid silent rejection + nickname desync.
  showOverlay(`
    <div class="menu-panel">
      <h1 class="menu-title">Gomoku</h1>
      <p class="menu-subtitle">Five in a row wins</p>
      <input type="text" id="input-nickname" class="menu-input" placeholder="Enter nickname (max 10)…" maxlength="10" />
      <button id="btn-play" class="menu-btn primary">Play</button>
    </div>
  `);
  const input = document.getElementById('input-nickname');
  const btn = document.getElementById('btn-play');
  const submit = () => {
    const name = input.value.trim();
    if (!name || name.length > 10) return;
    gameState.nickname = name;
    connectionService.sendNickname(name);
  };
  btn.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  input.focus();
}

/** Show lobby (main menu). */
export function showLobby() {
  showOverlay(`
    <div class="menu-panel">
      <h2 class="menu-title">Lobby</h2>
      <p class="menu-subtitle">Welcome, <span class="accent">${gameState.nickname}</span></p>
      <button id="btn-pvp" class="menu-btn primary">Player vs Player</button>
      <button id="btn-pve" class="menu-btn primary">Player vs AI</button>
    </div>
  `);
  document.getElementById('btn-pvp').addEventListener('click', showPvpMenu);
  document.getElementById('btn-pve').addEventListener('click', showPveMenu);
}

/** Show PVP submenu. */
function showPvpMenu() {
  showOverlay(`
    <div class="menu-panel">
      <h2 class="menu-title">Player vs Player</h2>
      <button id="btn-create" class="menu-btn primary">Create Room</button>
      <button id="btn-rooms" class="menu-btn secondary">Join Room</button>
      <button id="btn-back" class="menu-btn ghost">← Back</button>
    </div>
  `);
  document.getElementById('btn-create').addEventListener('click', () => {
    connectionService.sendCreateRoom();
  });
  document.getElementById('btn-rooms').addEventListener('click', () => {
    connectionService.sendGetRooms();
  });
  document.getElementById('btn-back').addEventListener('click', showLobby);
}

/** Show PVE difficulty selection. */
function showPveMenu() {
  showOverlay(`
    <div class="menu-panel">
      <h2 class="menu-title">Player vs AI</h2>
      <p class="menu-subtitle">Select difficulty</p>
      <button id="btn-easy" class="menu-btn primary">Easy</button>
      <button id="btn-medium" class="menu-btn primary">Medium</button>
      <button id="btn-hard" class="menu-btn primary">Hard</button>
      <button id="btn-back" class="menu-btn ghost">← Back</button>
    </div>
  `);
  document.getElementById('btn-easy').addEventListener('click', () => {
    connectionService.sendCreatePveRoom(1);
  });
  document.getElementById('btn-medium').addEventListener('click', () => {
    connectionService.sendCreatePveRoom(2);
  });
  document.getElementById('btn-hard').addEventListener('click', () => {
    connectionService.sendCreatePveRoom(3);
  });
  document.getElementById('btn-back').addEventListener('click', showLobby);
}

/**
 * Show room list.
 * @param {Array} rooms
 */
export function showRoomList(rooms) {
  const rows = Array.isArray(rooms) ? rooms : [];
  const tableRows = rows.length === 0
    ? '<tr><td colspan="4" class="empty-state">No rooms available</td></tr>'
    : rows.map(r => `
        <tr>
          <td>${r.roomId || r.id}</td>
          <td>${r.roomOwner || ''}</td>
          <td>${r.roomClientCount || 0}/2</td>
          <td>
            <button class="menu-btn small primary" data-join="${r.roomId || r.id}">Join</button>
            <button class="menu-btn small secondary" data-watch="${r.roomId || r.id}">Watch</button>
          </td>
        </tr>`).join('');

  showOverlay(`
    <div class="menu-panel wide">
      <h2 class="menu-title">Available Rooms</h2>
      <table class="room-table">
        <thead><tr><th>ID</th><th>Owner</th><th>Players</th><th>Actions</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="menu-row">
        <button id="btn-refresh" class="menu-btn secondary">↻ Refresh</button>
        <button id="btn-back" class="menu-btn ghost">← Back</button>
      </div>
    </div>
  `);
  overlay().querySelectorAll('[data-join]').forEach(btn => {
    btn.addEventListener('click', () => connectionService.sendJoinRoom(parseInt(btn.dataset.join, 10)));
  });
  overlay().querySelectorAll('[data-watch]').forEach(btn => {
    btn.addEventListener('click', () => connectionService.sendWatchGame(parseInt(btn.dataset.watch, 10)));
  });
  document.getElementById('btn-refresh').addEventListener('click', () => {
    connectionService.sendGetRooms();
  });
  document.getElementById('btn-back').addEventListener('click', showPvpMenu);
}

/** Show waiting room. */
export function showWaitingRoom() {
  showOverlay(`
    <div class="menu-panel">
      <h2 class="menu-title">Waiting Room</h2>
      <p>Room ID: <span class="accent">${gameState.roomId}</span></p>
      <div class="spinner"></div>
      <p class="menu-subtitle">Waiting for opponent…</p>
      <button id="btn-leave" class="menu-btn danger">Leave</button>
    </div>
  `);
  document.getElementById('btn-leave').addEventListener('click', () => {
    connectionService.sendClientExit();
  });
}

// Register server event handlers for menu navigation
eventBus.on(ClientEventCode.SHOW_OPTIONS, showLobby);
eventBus.on(ClientEventCode.SHOW_ROOMS, showRoomList);
eventBus.on(ClientEventCode.ROOM_CREATE_SUCCESS, (data) => {
  gameState.roomId = data.id;
  showWaitingRoom();
});
eventBus.on(ClientEventCode.CLIENT_EXIT, showLobby);
eventBus.on(ClientEventCode.CLIENT_KICK, showLobby);

// Server emits NICKNAME_SET with invalidLength=0 on first connect to prompt
// the user, and with invalidLength>0 as a rejection when a nickname submission
// fails length validation. Only treat nonzero invalidLength as an error.
eventBus.on(ClientEventCode.NICKNAME_SET, (data) => {
  const invalidLength = data && typeof data === 'object' ? (data.invalidLength || 0) : 0;
  if (invalidLength > 0) {
    showToast(`Nickname must be 1–10 characters (got ${invalidLength})`, 'error');
    gameState.nickname = '';
    showNicknameScreen();
  }
});
