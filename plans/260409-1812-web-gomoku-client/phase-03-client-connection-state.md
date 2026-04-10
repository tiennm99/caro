# Phase 3: Client — WebSocket Connection + State Machine

## Context Links
- [Phase 2](phase-02-client-html-css.md) — HTML shell this JS attaches to
- [ChannelUtils.java](../../landlords-common/src/main/java/org/nico/ratel/landlords/channel/ChannelUtils.java) — server message format
- [ServerEventCode.java](../../landlords-common/src/main/java/org/nico/ratel/landlords/enums/ServerEventCode.java) — codes client sends
- [ClientEventCode.java](../../landlords-common/src/main/java/org/nico/ratel/landlords/enums/ClientEventCode.java) — codes server sends

## Overview
- **Priority:** P1 (all UI/board logic depends on this)
- **Status:** Pending
- **Effort:** 2h
- **Depends on:** Phase 2

Two JS files: `game-connection.js` (WebSocket transport) and `game-state.js` (state machine + event dispatch). These form the core communication and state layer.

## Key Insights

- Server message format: `{"code": "CODE_...", "data": "json_string_or_plain", "info": ""}`
- Client sends same format via `ServerEventCode` enum names
- Server sends `ClientEventCode` enum names as `code` field
- On WS connect, server waits 2s then sends `CODE_CLIENT_CONNECT` + `CODE_CLIENT_NICKNAME_SET`
- Heartbeat: client should send `CODE_CLIENT_HEAD_BEAT` every ~60s (server idle timeout is 30min, but heartbeat keeps connection alive)
- PVE auto-starts game immediately after room creation (no waiting room)
- PVP with 2 players auto-starts game on join (no ready step needed for initial game)
- Ready/rematch uses `CODE_GAME_READY` — toggles ready state, game starts when both ready

## Architecture

### `game-state.js` — State Machine

```
States:
  CONNECTING    -> NICKNAME      (on CODE_CLIENT_NICKNAME_SET)
  NICKNAME      -> LOBBY         (on CODE_SHOW_OPTIONS)
  LOBBY         -> PVP_MENU      (on CODE_SHOW_OPTIONS_PVP)
  LOBBY         -> PVE_MENU      (on CODE_SHOW_OPTIONS_PVE)
  PVP_MENU      -> ROOM_LIST     (on CODE_SHOW_ROOMS)
  PVP_MENU      -> WAITING_ROOM  (on CODE_ROOM_CREATE_SUCCESS)
  ROOM_LIST     -> GAME          (on CODE_GAME_STARTING via join)
  ROOM_LIST     -> SPECTATING    (on CODE_GAME_WATCH_SUCCESSFUL)
  WAITING_ROOM  -> GAME          (on CODE_GAME_STARTING)
  PVE_MENU      -> GAME          (on CODE_GAME_STARTING)
  GAME          -> GAME_OVER     (on CODE_GAME_OVER)
  GAME_OVER     -> GAME          (on CODE_GAME_STARTING via rematch)
  GAME_OVER     -> LOBBY         (on exit)
  SPECTATING    -> LOBBY         (on exit watch)
  *             -> LOBBY         (on CODE_CLIENT_EXIT from server)
  *             -> LOBBY         (on CODE_CLIENT_KICK)
```

### `game-connection.js` — Transport

```
GameConnection {
  ws: WebSocket
  clientId: number
  heartbeatInterval: timer

  connect(url)
  send(code, data)
  onMessage(handler)  // parses JSON, calls handler(code, data)
  disconnect()
}
```

### Event Dispatch Pattern

`game-state.js` exposes a global `GameState` object with:
- `state` — current screen/state enum
- `clientId`, `nickname`, `roomId`, `isBlack`, `isSpectator`
- `gameData` — current game info (players, board size, move history)
- `on(eventCode, callback)` — register handler
- `emit(eventCode, data)` — internal dispatch
- `switchScreen(screenId)` — hides all `.screen`, shows target

All other modules register handlers: `GameState.on('CODE_GAME_MOVE_SUCCESS', data => { ... })`.

### Data stored in GameState

```js
{
  state: 'LOBBY',
  clientId: null,
  nickname: '',
  roomId: null,
  isBlack: false,
  isSpectator: false,
  gameData: {
    blackPlayerId: null,
    blackPlayerNickname: '',
    whitePlayerId: null,
    whitePlayerNickname: '',
    boardSize: 15,
    moves: [],          // [{row, col, piece, playerNickname}]
    currentTurn: 'BLACK'
  }
}
```

## Related Code Files

### Files to Create
- `landlords-server/src/main/resources/static/js/game-state.js` (~150 lines)
- `landlords-server/src/main/resources/static/js/game-connection.js` (~100 lines)

### Files Referenced (read-only)
- `landlords-common/.../enums/ServerEventCode.java` — code strings client sends
- `landlords-common/.../enums/ClientEventCode.java` — code strings client receives

## Implementation Steps

### Step 1: Create `game-state.js`

Global object `GameState`:

1. Define state enum constants (strings matching screen IDs)
2. Event bus: `_handlers` map of `code -> [callbacks]`
3. `on(code, fn)` — push to handlers
4. `emit(code, data)` — call all registered handlers
5. `switchScreen(id)` — `document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))`, then add `.active` to target
6. `init()` — set initial state, called on DOMContentLoaded
7. State properties: `clientId`, `nickname`, `roomId`, `isBlack`, `isSpectator`, `gameData`
8. `resetGameData()` — clear moves, players, turn

### Step 2: Create `game-connection.js`

Global object `GameConnection`:

1. `connect()` — construct WS URL from `window.location` (`ws://${location.host}/ratel`), create `WebSocket`
2. `ws.onopen` — log connected, start heartbeat interval (50s)
3. `ws.onmessage` — parse JSON, extract `code` and `data` (parse `data` as JSON if possible, fall back to string), call `GameState.emit(code, parsedData)`
4. `ws.onclose` — log, clear heartbeat, show reconnect toast
5. `ws.onerror` — log error
6. `send(code, data)` — `ws.send(JSON.stringify({code, data: typeof data === 'string' ? data : JSON.stringify(data), info: ''}))`
7. `startHeartbeat()` — `setInterval(() => send('CODE_CLIENT_HEAD_BEAT', ''), 50000)`
8. `disconnect()` — close WS, clear interval

### Step 3: Wire initial server events in `game-state.js`

Register core handlers:

```js
GameState.on('CODE_CLIENT_CONNECT', (data) => {
  GameState.clientId = parseInt(data);
});

GameState.on('CODE_CLIENT_NICKNAME_SET', () => {
  GameState.switchScreen('screen-nickname');
});

GameState.on('CODE_SHOW_OPTIONS', () => {
  GameState.switchScreen('screen-lobby');
});

GameState.on('CODE_SHOW_OPTIONS_PVP', () => {
  GameState.switchScreen('screen-pvp-menu');
});

GameState.on('CODE_SHOW_OPTIONS_PVE', () => {
  GameState.switchScreen('screen-pve-menu');
});

GameState.on('CODE_GAME_STARTING', (data) => {
  GameState.roomId = data.roomId;
  GameState.gameData.blackPlayerId = data.blackPlayerId;
  GameState.gameData.whitePlayerId = data.whitePlayerId;
  // ... store all fields
  GameState.isBlack = (GameState.clientId === data.blackPlayerId);
  GameState.gameData.currentTurn = 'BLACK';
  GameState.gameData.moves = [];
  GameState.switchScreen('screen-game');
});

GameState.on('CODE_GAME_MOVE_SUCCESS', (data) => {
  GameState.gameData.moves.push(data);
  GameState.gameData.currentTurn =
    data.piece === 'BLACK' ? 'WHITE' : 'BLACK';
});

GameState.on('CODE_GAME_OVER', (data) => {
  GameState.gameData.result = data.result;
  GameState.gameData.winnerNickname = data.winnerNickname;
  GameState.switchScreen('screen-game-over');
});

GameState.on('CODE_CLIENT_EXIT', () => {
  GameState.switchScreen('screen-lobby');
});

GameState.on('CODE_CLIENT_KICK', () => {
  GameState.switchScreen('screen-lobby');
});
```

### Step 4: DOMContentLoaded initialization

```js
document.addEventListener('DOMContentLoaded', () => {
  GameState.init();
  GameConnection.connect();
});
```

## Todo List

- [ ] Create `game-state.js` with event bus and screen switching
- [ ] Create `game-connection.js` with WS connect/send/heartbeat
- [ ] Register all server event handlers in game-state
- [ ] Handle `CODE_CLIENT_CONNECT` — store client ID
- [ ] Handle `CODE_CLIENT_NICKNAME_SET` — show nickname screen
- [ ] Handle `CODE_SHOW_OPTIONS` / `_PVP` / `_PVE` — screen transitions
- [ ] Handle `CODE_GAME_STARTING` — populate game data, switch to game
- [ ] Handle `CODE_GAME_MOVE_SUCCESS` — update moves + turn
- [ ] Handle `CODE_GAME_OVER` — store result, switch to game-over
- [ ] Handle `CODE_CLIENT_EXIT` / `CODE_CLIENT_KICK` — return to lobby
- [ ] Handle `CODE_ROOM_CREATE_SUCCESS` — switch to waiting room
- [ ] Handle `CODE_ROOM_JOIN_SUCCESS` — update waiting room info
- [ ] Handle `CODE_SHOW_ROOMS` — store room list
- [ ] Handle `CODE_GAME_WATCH_SUCCESSFUL` — set spectator flag, switch to game
- [ ] Handle error codes (room full, not found, not your turn, etc.) — show toast
- [ ] Test: open in browser, verify WS connects and nickname screen appears

## Success Criteria

- WS connects to server automatically on page load
- Client ID stored from `CODE_CLIENT_CONNECT`
- Nickname screen shown after `CODE_CLIENT_NICKNAME_SET`
- All screen transitions work based on server events
- Game data populated correctly from `CODE_GAME_STARTING`
- Moves tracked in order from `CODE_GAME_MOVE_SUCCESS`
- Heartbeat sent every 50s (visible in WS devtools)
- Error events show toast notifications
- Each JS file under 200 lines

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| WS URL wrong (different host/port) | Derive from `window.location` — same host:port |
| Data field is string vs object inconsistency | Try `JSON.parse(data)`, catch and use raw string |
| Race condition: events before handlers registered | Load `game-state.js` first; server has 2s delay before first message |
| Reconnection after disconnect | Show toast with "Reconnect" button; user clicks to reload page (KISS) |
