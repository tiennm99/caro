# Phase 2: Services Layer

## Context Links
- [Plan overview](plan.md)
- [Phase 1: Scaffold](phase-01-project-scaffold.md)
- Server `Msg` entity: `landlords-common/.../entity/Msg.java` -- `{code, data, info}`
- Server event codes: `landlords-common/.../enums/ServerEventCode.java`, `ClientEventCode.java`
- Server WS handler: `landlords-server/.../handler/WebsocketTransferHandler.java`

## Overview
- **Priority:** P1 (all scenes depend on these services)
- **Status:** Pending
- **Blocked by:** Phase 1
- **Description:** Build three decoupled service modules: WebSocket connection, event bus, game state. Plus protocol constants extracted from server source.

## Key Insights
- Server WS message format: `{"code": "CODE_...", "data": "json_string_or_plain_string", "info": ""}`
- `data` field is a JSON **string** (not nested object) -- must `JSON.parse(data)` when data is structured
- Server sends `CODE_CLIENT_CONNECT` + `CODE_CLIENT_NICKNAME_SET` ~2s after WS handshake (server has `Thread.sleep(2000L)`)
- Heartbeat: server reads idle timeout; client must send `CODE_CLIENT_HEAD_BEAT` every ~50s
- Server ignores heartbeat messages (no handler called, just keeps connection alive)

## Architecture

```
connection-service.js
  |-- wraps browser WebSocket
  |-- auto-reconnect with backoff
  |-- heartbeat timer (50s interval)
  |-- on message: parse JSON -> event-bus.emit(code, parsedData)
  |-- send(code, data): serialize to Msg format -> ws.send()

event-bus.js
  |-- on(event, callback): subscribe
  |-- off(event, callback): unsubscribe
  |-- emit(event, data): notify all subscribers

game-state-service.js
  |-- stores: clientId, nickname, roomId, isBlack, isMyTurn, boardState[][], moves[]
  |-- reset methods for new game / exit room
  |-- no logic, pure state container

protocol-constants.js
  |-- SERVER_EVENTS: all CODE_CLIENT_* codes (server -> client)
  |-- CLIENT_EVENTS: all CODE_*  codes (client -> server)
  |-- string constants, no enums needed
```

### Data Flow: Sending a Move
```
GameScene.onBoardClick(row, col)
  -> connectionService.send('CODE_GAME_MOVE', JSON.stringify({row, col}))
  -> ws.send('{"code":"CODE_GAME_MOVE","data":"{\"row\":7,\"col\":7}","info":""}')
```

### Data Flow: Receiving a Move
```
ws.onmessage(frame)
  -> JSON.parse(frame.data) => {code: "CODE_GAME_MOVE_SUCCESS", data: "{\"row\":7,...}", info: ""}
  -> eventBus.emit('CODE_GAME_MOVE_SUCCESS', {row:7, col:7, piece:"BLACK", playerNickname:"p1", playerId:1})
     (data string auto-parsed to object by connection-service)
```

## Related Code Files

### Files to Create
- `web-client/src/services/connection-service.js`
- `web-client/src/services/event-bus.js`
- `web-client/src/services/game-state-service.js`
- `web-client/src/config/protocol-constants.js`

### Files to Modify
- None

## Implementation Steps

### 1. `protocol-constants.js`

Export two frozen objects with all event code strings:

```js
/** @enum {string} Codes the client sends TO the server */
export const ServerEventCode = Object.freeze({
  NICKNAME_SET: 'CODE_CLIENT_NICKNAME_SET',
  INFO_SET: 'CODE_CLIENT_INFO_SET',
  ROOM_CREATE: 'CODE_ROOM_CREATE',
  ROOM_CREATE_PVE: 'CODE_ROOM_CREATE_PVE',
  ROOM_JOIN: 'CODE_ROOM_JOIN',
  GET_ROOMS: 'CODE_GET_ROOMS',
  GAME_MOVE: 'CODE_GAME_MOVE',
  GAME_READY: 'CODE_GAME_READY',
  CLIENT_EXIT: 'CODE_CLIENT_EXIT',
  GAME_WATCH: 'CODE_GAME_WATCH',
  GAME_WATCH_EXIT: 'CODE_GAME_WATCH_EXIT',
  HEARTBEAT: 'CODE_CLIENT_HEAD_BEAT',
});

/** @enum {string} Codes the server sends TO the client */
export const ClientEventCode = Object.freeze({
  CLIENT_CONNECT: 'CODE_CLIENT_CONNECT',
  NICKNAME_SET: 'CODE_CLIENT_NICKNAME_SET',
  SHOW_OPTIONS: 'CODE_SHOW_OPTIONS',
  SHOW_ROOMS: 'CODE_SHOW_ROOMS',
  ROOM_CREATE_SUCCESS: 'CODE_ROOM_CREATE_SUCCESS',
  ROOM_JOIN_SUCCESS: 'CODE_ROOM_JOIN_SUCCESS',
  ROOM_JOIN_FAIL_FULL: 'CODE_ROOM_JOIN_FAIL_BY_FULL',
  ROOM_JOIN_FAIL_INEXIST: 'CODE_ROOM_JOIN_FAIL_BY_INEXIST',
  GAME_STARTING: 'CODE_GAME_STARTING',
  GAME_MOVE_SUCCESS: 'CODE_GAME_MOVE_SUCCESS',
  GAME_MOVE_INVALID: 'CODE_GAME_MOVE_INVALID',
  GAME_MOVE_OCCUPIED: 'CODE_GAME_MOVE_OCCUPIED',
  GAME_MOVE_OUT_OF_BOUNDS: 'CODE_GAME_MOVE_OUT_OF_BOUNDS',
  GAME_MOVE_NOT_YOUR_TURN: 'CODE_GAME_MOVE_NOT_YOUR_TURN',
  GAME_OVER: 'CODE_GAME_OVER',
  GAME_READY: 'CODE_GAME_READY',
  CLIENT_EXIT: 'CODE_CLIENT_EXIT',
  CLIENT_KICK: 'CODE_CLIENT_KICK',
  GAME_WATCH: 'CODE_GAME_WATCH',
  GAME_WATCH_SUCCESSFUL: 'CODE_GAME_WATCH_SUCCESSFUL',
  PVE_DIFFICULTY_NOT_SUPPORT: 'CODE_PVE_DIFFICULTY_NOT_SUPPORT',
});
```

### 2. `event-bus.js`

Simple pub/sub:
- `_listeners` Map of `event -> Set<callback>`
- `on(event, cb)` -- add listener
- `off(event, cb)` -- remove listener
- `emit(event, data)` -- call all listeners for event
- Export singleton instance
- ~40 lines

### 3. `connection-service.js`

WebSocket wrapper:
- `connect(url)` -- create WebSocket, attach handlers
- `send(code, data)` -- build `{code, data, info:""}`, `ws.send(JSON.stringify(msg))`
- `disconnect()` -- close WS, clear heartbeat
- Internal: `_onMessage(event)`:
  1. `JSON.parse(event.data)` to get `{code, data, info}`
  2. Try `JSON.parse(msg.data)` for structured data; fall back to raw string
  3. `eventBus.emit(msg.code, parsedData)`
- Internal: `_startHeartbeat()` -- `setInterval` every 50000ms, send `CODE_CLIENT_HEAD_BEAT`
- Internal: `_stopHeartbeat()` -- `clearInterval`
- `onopen`: emit internal `'ws:connected'` event
- `onclose`: emit `'ws:disconnected'`, attempt reconnect with exponential backoff (1s, 2s, 4s, max 30s)
- `onerror`: log, let `onclose` handle reconnect
- Export singleton
- ~80 lines

**Critical detail:** The `data` field in outgoing messages must be a **string**. For structured data like `{row, col}`, use `JSON.stringify({row, col})` as the data value. For simple strings like nickname, pass the string directly.

### 4. `game-state-service.js`

Plain state object:
- `clientId` -- set on `CODE_CLIENT_CONNECT`
- `nickname` -- set after nickname submission
- `roomId` -- set on room create/join
- `isBlack` -- derived from `CODE_GAME_STARTING` comparing clientId to blackPlayerId
- `isMyTurn` -- toggled on each `CODE_GAME_MOVE_SUCCESS`
- `board` -- 15x15 2D array, initialized to `null`, set cells on move success
- `moves` -- array of `{row, col, piece, playerNickname}` for move history
- `isSpectating` -- boolean
- `reset()` -- clear room/game state
- `resetBoard()` -- clear board/moves for rematch
- Export singleton
- ~60 lines

## Todo List
- [ ] Create `protocol-constants.js` with all event codes
- [ ] Create `event-bus.js` with on/off/emit
- [ ] Create `connection-service.js` with connect/send/heartbeat/reconnect
- [ ] Create `game-state-service.js` with state fields and reset methods
- [ ] Verify WS connection to running server in browser console

## Success Criteria
- [ ] `eventBus.on('CODE_CLIENT_CONNECT', cb)` fires when server sends connect event
- [ ] `connectionService.send('CODE_CLIENT_NICKNAME_SET', 'TestUser')` accepted by server
- [ ] Heartbeat keeps connection alive beyond 60s
- [ ] `game-state-service` stores and resets state correctly
- [ ] All files under 100 lines each
- [ ] JSDoc on all exported functions

## Risk Assessment
- **`data` field double-encoding:** Server expects `data` as a string. If we pass an object, server's `MapHelper.parser()` will fail. Mitigation: `connection-service.send()` must `JSON.stringify` objects before placing in `data` field.
- **Reconnect during active game:** If WS drops mid-game, server has no rejoin mechanism. Mitigation: show "Connection lost" overlay; on reconnect, user starts fresh (server already cleaned up the room via `CODE_CLIENT_OFFLINE`).

## Next Steps
- Phase 3 (Boot + Menu scenes) depends on these services being complete
