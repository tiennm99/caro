# Phase 5: Client — UI Panels + Lobby

## Context Links
- [Phase 2](phase-02-client-html-css.md) — HTML elements this JS manipulates
- [Phase 3](phase-03-client-connection-state.md) — state machine and event bus
- [ServerEventListener_CODE_GET_ROOMS.java](../../landlords-server/src/main/java/org/nico/ratel/landlords/server/event/ServerEventListener_CODE_GET_ROOMS.java) — room list format

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 1.5h
- **Depends on:** Phase 3

Handles all DOM manipulation: button clicks, form submissions, room list rendering, player info panels, move history, toast notifications, game-over screen. Bridges user actions to `GameConnection.send()`.

## Key Insights

- Room list data: `[{roomId, roomOwner, roomClientCount, roomType}]`
- Join auto-starts game when 2 players present (server sends `CODE_GAME_STARTING`)
- Spectator join sends `CODE_GAME_WATCH` with room ID
- Move history: append each `CODE_GAME_MOVE_SUCCESS` as a row (e.g., "#1 Black D7")
- Toast notifications for errors: room full, room not found, not your turn, etc.
- Game-over screen shows result relative to player: "You Win!" / "You Lose!" / "Draw!"

## Architecture

### User Action -> Server Message Mapping

| User Action | Send Code | Data |
|------------|-----------|------|
| Submit nickname | `CODE_CLIENT_NICKNAME_SET` | nickname string |
| Click "PVP" | `CODE_CLIENT_INFO_SET` | `{"version":"web"}` then server shows PVP menu |
| Click "Create Room" | `CODE_ROOM_CREATE` | (none) |
| Click "Create PVE Easy" | `CODE_ROOM_CREATE_PVE` | `"1"` |
| Click "Create PVE Medium" | `CODE_ROOM_CREATE_PVE` | `"2"` |
| Click "Create PVE Hard" | `CODE_ROOM_CREATE_PVE` | `"3"` |
| Click "Room List" | `CODE_GET_ROOMS` | (none) |
| Click "Join" on room row | `CODE_ROOM_JOIN` | room ID string |
| Click "Watch" on room row | `CODE_GAME_WATCH` | room ID string |
| Click "Rematch" | `CODE_GAME_READY` | (none) |
| Click "Exit" (in game/room) | `CODE_CLIENT_EXIT` | (none) |
| Click "Exit Watch" | `CODE_GAME_WATCH_EXIT` | (none) |

**Important discovery from server code:** After nickname set, server sends `CODE_SHOW_OPTIONS`. Client doesn't need to request it. The lobby menu buttons trigger client-side screen switches that correspond to what server would send. Actually, looking at the client event flow:

1. Client sends `CODE_CLIENT_NICKNAME_SET` with nickname
2. Server stores nickname, sends back `CODE_SHOW_OPTIONS`
3. From lobby, user picks PVP or PVE — these are client-side navigation decisions
4. For PVP: client shows pvp-menu locally, then sends server codes when creating/joining rooms
5. For PVE: client shows pve-menu locally, sends `CODE_ROOM_CREATE_PVE` with difficulty

So lobby/menu navigation is **client-driven**, not server-driven. The `CODE_SHOW_OPTIONS_PVP` / `CODE_SHOW_OPTIONS_PVE` events from server are for the CLI client's menu system. The web client can handle menu navigation purely in DOM.

### Toast System

```js
GameUI.showToast(message, type)  // type: 'error', 'info', 'success'
// Creates div in #toast-container, auto-removes after 3s
```

## Related Code Files

### Files to Create
- `landlords-server/src/main/resources/static/js/game-ui.js` (~190 lines)

### Files Referenced
- `game-state.js` — event registration, state reads
- `game-connection.js` — `send()` calls

## Implementation Steps

### Step 1: Button event listeners (DOMContentLoaded)

Wire all buttons in `GameUI.init()`:

```js
// Nickname
document.getElementById('nickname-submit').addEventListener('click', () => {
  const name = document.getElementById('nickname-input').value.trim();
  if (!name) return;
  GameState.nickname = name;
  GameConnection.send('CODE_CLIENT_NICKNAME_SET', name);
});

// Lobby
document.getElementById('btn-pvp').addEventListener('click', () => {
  GameState.switchScreen('screen-pvp-menu');
});
document.getElementById('btn-pve').addEventListener('click', () => {
  GameState.switchScreen('screen-pve-menu');
});

// PVP menu
document.getElementById('btn-create-room').addEventListener('click', () => {
  GameConnection.send('CODE_ROOM_CREATE', '');
});
document.getElementById('btn-room-list').addEventListener('click', () => {
  GameConnection.send('CODE_GET_ROOMS', '');
});

// PVE difficulty buttons
document.getElementById('btn-pve-easy').addEventListener('click', () => {
  GameConnection.send('CODE_ROOM_CREATE_PVE', '1');
});
// ... medium (2), hard (3)

// Back buttons -> switchScreen('screen-lobby')
// Exit button -> GameConnection.send('CODE_CLIENT_EXIT', '')
// Rematch -> GameConnection.send('CODE_GAME_READY', '')
```

### Step 2: Room list rendering

```js
GameState.on('CODE_SHOW_ROOMS', (data) => {
  const rooms = typeof data === 'string' ? JSON.parse(data) : data;
  const tbody = document.getElementById('room-list-body');
  tbody.innerHTML = '';
  if (rooms.length === 0) {
    // Show empty state
  }
  rooms.forEach(room => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${room.roomId}</td>
      <td>${room.roomOwner}</td>
      <td>${room.roomClientCount}/2</td>
      <td>${room.roomType}</td>
      <td>
        <button onclick="GameUI.joinRoom(${room.roomId})">Join</button>
        <button onclick="GameUI.watchRoom(${room.roomId})">Watch</button>
      </td>`;
    tbody.appendChild(tr);
  });
  GameState.switchScreen('screen-room-list');
});
```

### Step 3: Game screen updates

- **Player info panels:** On `CODE_GAME_STARTING`, populate black/white player names, highlight current player's panel
- **Turn indicator:** On `CODE_GAME_MOVE_SUCCESS`, update which player card is "active" (CSS class)
- **Move history:** Append row to move list: `"#N piece col-row"` (e.g., "#1 BLACK H8")
- **Spectator badge:** If `GameState.isSpectator`, show "Spectating" label, hide move controls

### Step 4: Game-over screen

```js
GameState.on('CODE_GAME_OVER', (data) => {
  const resultEl = document.getElementById('game-result');
  const winnerEl = document.getElementById('game-winner');

  if (data.result === 'DRAW') {
    resultEl.textContent = 'Draw!';
  } else if (data.winnerNickname === GameState.nickname) {
    resultEl.textContent = 'You Win!';
    resultEl.className = 'result-win';
  } else {
    resultEl.textContent = 'You Lose!';
    resultEl.className = 'result-lose';
  }
  winnerEl.textContent = data.winnerNickname ? `Winner: ${data.winnerNickname}` : '';
});
```

### Step 5: Toast notifications

```js
GameUI.showToast = function(message, type) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// Register error handlers
GameState.on('CODE_ROOM_JOIN_FAIL_BY_FULL', () => GameUI.showToast('Room is full', 'error'));
GameState.on('CODE_ROOM_JOIN_FAIL_BY_INEXIST', () => GameUI.showToast('Room not found', 'error'));
GameState.on('CODE_GAME_MOVE_NOT_YOUR_TURN', () => GameUI.showToast('Not your turn', 'error'));
GameState.on('CODE_GAME_MOVE_OCCUPIED', () => GameUI.showToast('Position occupied', 'error'));
GameState.on('CODE_GAME_MOVE_OUT_OF_BOUNDS', () => GameUI.showToast('Out of bounds', 'error'));
GameState.on('CODE_CLIENT_KICK', () => GameUI.showToast('Kicked for inactivity', 'error'));
```

### Step 6: Waiting room

```js
GameState.on('CODE_ROOM_CREATE_SUCCESS', (data) => {
  GameState.roomId = data.id || data.roomId;
  document.getElementById('waiting-room-id').textContent = GameState.roomId;
  GameState.switchScreen('screen-waiting-room');
});

GameState.on('CODE_ROOM_JOIN_SUCCESS', (data) => {
  // If we're in waiting room, update player count
  // Game auto-starts when 2 players join (server sends CODE_GAME_STARTING)
});
```

## Todo List

- [ ] Create `game-ui.js` with `GameUI` global object
- [ ] Wire nickname form submission
- [ ] Wire lobby navigation buttons (PVP, PVE, back)
- [ ] Wire PVP menu (create room, room list, back)
- [ ] Wire PVE difficulty buttons (easy/medium/hard, back)
- [ ] Render room list table from `CODE_SHOW_ROOMS`
- [ ] Implement join/watch room actions
- [ ] Update player info panels on `CODE_GAME_STARTING`
- [ ] Update turn indicator on `CODE_GAME_MOVE_SUCCESS`
- [ ] Append move history entries
- [ ] Render game-over screen with personalized result
- [ ] Wire rematch and exit buttons
- [ ] Implement toast notification system
- [ ] Register all error event toasts
- [ ] Waiting room display with room ID
- [ ] Spectator mode UI adjustments (hide controls, show badge)
- [ ] Enter key submits nickname form

## Success Criteria

- Nickname submission works, transitions to lobby
- PVP flow: create room -> waiting -> game starts when opponent joins
- PVE flow: select difficulty -> game starts immediately
- Room list shows active rooms with join/watch buttons
- Move history updates per move
- Turn indicator switches correctly
- Game-over shows win/lose/draw relative to player
- Rematch works (both players click ready)
- Exit returns to lobby
- Error toasts appear and auto-dismiss
- File under 200 lines

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Room data format mismatch | Verified from `ServerEventListener_CODE_GET_ROOMS` source |
| Nickname with special chars | Server handles storage; client just sends string |
| Rapid button clicks send duplicate | Disable button after click, re-enable on response |
