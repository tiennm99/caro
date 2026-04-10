# Phase 04 — Client Typed Protobuf Integration

## Context Links
- [plan.md](plan.md)
- [phase-01-proto-schemas-and-build.md](phase-01-proto-schemas-and-build.md)
- [phase-02b-migrate-handlers.md](phase-02b-migrate-handlers.md)
- `client/package.json`
- `client/src/services/connection-service.js`
- `client/src/config/protocol-constants.js`
- `client/src/services/game-state-service.js`
- `client/src/ui/menu-ui.js`
- `client/src/ui/game-ui.js`
- `client/src/scenes/game-scene.js`
- `client/src/scenes/menu-scene.js`
- `client/src/scenes/boot-scene.js`
- `server/src/main/proto/request.proto`
- `server/src/main/proto/response.proto`

## Overview
- **Priority:** P2 (client can't talk to new server until this lands)
- **Status:** pending (blocked by Phase 02b)
- Add `protobufjs-cli` dev dependency, generate static ESM JS + `.d.ts` from the typed `request.proto` + `response.proto`, commit under `client/src/generated/`, rewrite `connection-service.js` to build typed `Request` oneof frames and parse typed `Response` oneof frames. Map each `Response.payloadCase` to the existing `ClientEventCode.*` constant so all UI listeners keep working.

## Key Insights
- Browser `WebSocket` supports binary: `ws.binaryType = 'arraybuffer'` + `ws.send(Uint8Array)`.
- `pbjs -t static-module -w es6` produces a tree-shakeable ESM module covering both `.proto` files in a single output.
- `protobufjs/minimal` is the only runtime dep (~10KB). `protobufjs-cli` is dev-only.
- The client's `ClientEventCode` constants in `protocol-constants.js` stay — they're the event-bus keys. A new mapping table translates `Response.payload` field name (e.g. `gameMoveSuccess`) → `ClientEventCode.GAME_MOVE_SUCCESS`. Protobufjs JS naming converts snake_case fields to camelCase automatically.
- The client's `ServerEventCode` constants become dead — they were the string codes sent on the wire. Replaced by builder methods that set a oneof field. **Delete them from `protocol-constants.js`.**
- `connection-service.js` `send` signature changes. Old: `send(code, data)`. New: one builder method per request type, e.g. `sendNickname(nickname)`, `sendGameMove(row, col)`, `sendHeartbeat()`. This is clearer but requires editing every `connectionService.send(...)` call site in menu-ui.js, game-ui.js, game-scene.js.
- Call site count from audit: 14 `connectionService.send(...)` calls across 3 files — small enough to migrate individually.
- Inner `data.xxx` access on received events: audit showed client reads `data.row`, `data.col`, `data.piece`, `data.result`, `data.winnerNickname`, `data.roomId`, `data.blackPlayerId`, `data.blackPlayerNickname`, `data.whitePlayerId`, `data.whitePlayerNickname`, `data.boardSize`, `data.id` (room create), `data.invalidLength`. All field names match the proto camelCase derivation — protobufjs `.toObject()` + camelCase default, no extra transform needed.

## Requirements
**Functional**
- Client opens binary WebSocket to `ws://host:1999/ratel`.
- Each outbound action calls a typed helper on `connectionService` that constructs a `Request.create({<oneof>: {...}})` and sends `Uint8Array`.
- `onmessage` decodes `ArrayBuffer` → `Response.decode(u8)` → `response.payload` (oneof accessor) → switch on `payloadCase` → emit `eventBus.emit(ClientEventCode.XXX, payloadObject)`.
- Heartbeat loop (50s) sends `sendHeartbeat()`.
- Reconnect/backoff unchanged.
- Event bus consumers (menu-ui, game-ui, game-scene, game-state-service) keep working with NO changes because the payload field names match.

**Non-functional**
- Bundle size increase <100 KB minified.
- No runtime `.proto` parsing — static codegen only.
- Generated files committed (`client/src/generated/` NOT gitignored).
- `npm --prefix client run build` green.

## Architecture
```
client/
  package.json
    deps: + protobufjs
    devDeps: + protobufjs-cli
    scripts:
      "proto:gen": "pbjs -t static-module -w es6 -o src/generated/protocol.js ../server/src/main/proto/request.proto ../server/src/main/proto/response.proto && pbts -o src/generated/protocol.d.ts src/generated/protocol.js"
  src/
    generated/
      protocol.js           (committed)
      protocol.d.ts         (committed)
    services/
      connection-service.js (rewritten: typed send methods + typed onmessage)
    config/
      protocol-constants.js (ClientEventCode kept; ServerEventCode removed)
```

Encode path example:
```js
import protoRoot from '../generated/protocol.js';
const { Request } = protoRoot.miti99.caro.protocol;

sendGameMove(row, col) {
  const req = Request.create({ gameMove: { row, col } });
  const bytes = Request.encode(req).finish();
  this._ws.send(bytes);
}
```

Decode path:
```js
const { Response } = protoRoot.miti99.caro.protocol;

_onMessage(event) {
  const u8 = new Uint8Array(event.data);
  const res = Response.decode(u8);
  const caseName = res.payload; // protobufjs exposes oneof via `payload` property
  // caseName is the field name of the set oneof (e.g. 'gameMoveSuccess')
  const payloadObj = res[caseName];
  const eventCode = RESPONSE_CASE_TO_CLIENT_CODE[caseName];
  if (eventCode) {
    eventBus.emit(eventCode, payloadObj);
  }
}

const RESPONSE_CASE_TO_CLIENT_CODE = {
  clientConnect: ClientEventCode.CLIENT_CONNECT,
  nicknameSet: ClientEventCode.NICKNAME_SET,
  showOptions: ClientEventCode.SHOW_OPTIONS,
  showRooms: ClientEventCode.SHOW_ROOMS,
  roomCreateSuccess: ClientEventCode.ROOM_CREATE_SUCCESS,
  roomJoinSuccess: ClientEventCode.ROOM_JOIN_SUCCESS,
  roomJoinFailFull: ClientEventCode.ROOM_JOIN_FAIL_FULL,
  roomJoinFailNotFound: ClientEventCode.ROOM_JOIN_FAIL_INEXIST,
  roomPlayFailNotFound: ClientEventCode.ROOM_PLAY_FAIL_INEXIST,
  gameStarting: ClientEventCode.GAME_STARTING,
  gameReady: ClientEventCode.GAME_READY,
  gameMoveSuccess: ClientEventCode.GAME_MOVE_SUCCESS,
  gameMoveInvalid: ClientEventCode.GAME_MOVE_INVALID,
  gameMoveOccupied: ClientEventCode.GAME_MOVE_OCCUPIED,
  gameMoveOutOfBounds: ClientEventCode.GAME_MOVE_OUT_OF_BOUNDS,
  gameMoveNotYourTurn: ClientEventCode.GAME_MOVE_NOT_YOUR_TURN,
  gameOver: ClientEventCode.GAME_OVER,
  pveDifficultyNotSupport: ClientEventCode.PVE_DIFFICULTY_NOT_SUPPORT,
  watchGameSuccess: ClientEventCode.GAME_WATCH_SUCCESSFUL,
  clientExit: ClientEventCode.CLIENT_EXIT,
};
```

Special cases:
- `clientConnect`: old code read a raw string `clientId`, new path gets `{clientId: number}`. `game-state-service.js` line 86 (`CLIENT_CONNECT` handler) reads `data` directly → update to `data.clientId`. **This is a call-site change** — note it.
- `nicknameSet`: old payload was `{invalidLength: n}` OR `null` (prompt case). New proto: always an object with `invalidLength` field (defaults to 0). `boot-scene.js` handler just fires once on prompt regardless of field — unchanged. `menu-ui.js` line 186 reads `data.invalidLength` — still works; defaulting to 0 means "no error" but the handler only runs when length was invalid. Check: if `invalidLength === 0` the UI shouldn't show the error toast. Fix: client UI guards `if (data.invalidLength > 0) showToast(...)`.
- `roomCreateSuccess`: old read `data.id`, new proto uses `id` field → unchanged.

## Related Code Files
**Modify**
- `client/package.json` — add deps + `proto:gen` script.
- `client/src/services/connection-service.js` — binary WS, typed send helpers, typed decode+dispatch.
- `client/src/config/protocol-constants.js` — delete `ServerEventCode`; keep `ClientEventCode`.
- `client/src/ui/menu-ui.js` — replace `connectionService.send(ServerEventCode.XYZ, payload)` with new typed methods.
- `client/src/ui/game-ui.js` — same (`sendGameReady()`, `sendClientExit()`).
- `client/src/scenes/game-scene.js` — `connectionService.sendGameMove(row, col)`.
- `client/src/services/game-state-service.js` — `data.clientId` instead of raw `data` for CLIENT_CONNECT handler.
- `client/src/ui/menu-ui.js` — guard `NICKNAME_SET` error toast on `invalidLength > 0`.
- Root `.gitignore` — ensure `client/src/generated/` NOT ignored.

**Create**
- `client/src/generated/protocol.js` (pbjs output, committed)
- `client/src/generated/protocol.d.ts` (pbts output, committed)

**Delete**
- None.

## Implementation Steps
1. **Install deps (pin to latest stable pre-2026):**
   ```
   npm --prefix client install protobufjs@7.5.4
   npm --prefix client install -D protobufjs-cli@1.1.3
   ```
   Keep `phaser` at `3.87.0` and `vite` at `6.3.1` — both already ≥ pre-2026 latest.
2. **Add npm script** in `client/package.json`:
   ```json
   "proto:gen": "pbjs -t static-module -w es6 -o src/generated/protocol.js ../server/src/main/proto/request.proto ../server/src/main/proto/response.proto && pbts -o src/generated/protocol.d.ts src/generated/protocol.js"
   ```
3. **Run codegen:** `npm --prefix client run proto:gen`. Verify `client/src/generated/protocol.js` and `.d.ts` exist. Open `protocol.js` and confirm namespace path (likely `miti99.caro.protocol` matching `java_package` + proto `package`).
4. **Rewrite `connection-service.js`:**
   - Import: `import protoRoot from '../generated/protocol.js';` then `const { Request, Response } = protoRoot.miti99.caro.protocol;`.
   - `connect(url)`: set `this._ws.binaryType = 'arraybuffer';`
   - `_resolveUrl()`: port `1025` → `1999`. `DEFAULT_WS_URL` → `ws://localhost:1999/ratel`.
   - Replace `send(code, data)` with typed methods:
     ```js
     sendHeartbeat() { this._sendReq({ heartbeat: {} }); }
     sendNickname(nickname) { this._sendReq({ setNickname: { nickname } }); }
     sendClientInfo(version) { this._sendReq({ setClientInfo: { version } }); }
     sendCreateRoom() { this._sendReq({ createRoom: {} }); }
     sendCreatePveRoom(difficulty) { this._sendReq({ createPveRoom: { difficulty } }); }
     sendGetRooms() { this._sendReq({ getRooms: {} }); }
     sendJoinRoom(roomId) { this._sendReq({ joinRoom: { roomId } }); }
     sendGameReady() { this._sendReq({ gameReady: {} }); }
     sendGameMove(row, col) { this._sendReq({ gameMove: { row, col } }); }
     sendGameReset() { this._sendReq({ gameReset: {} }); }
     sendWatchGame(roomId) { this._sendReq({ watchGame: { roomId } }); }
     sendWatchGameExit() { this._sendReq({ watchGameExit: {} }); }
     sendClientExit() { this._sendReq({ clientExit: {} }); }

     _sendReq(oneof) {
       if (!this._ws || this._ws.readyState !== WebSocket.OPEN) return;
       const req = Request.create(oneof);
       const bytes = Request.encode(req).finish();
       this._ws.send(bytes);
     }
     ```
   - Rewrite `_onMessage(event)` per the decode path above, using the `RESPONSE_CASE_TO_CLIENT_CODE` map (kept as a module-level `const`).
   - Heartbeat interval calls `sendHeartbeat()`.
5. **Edit call sites:**
   - `menu-ui.js`: `sendNickname(name)`, `sendCreateRoom()`, `sendGetRooms()`, `sendCreatePveRoom(1|2|3)`, `sendJoinRoom(id)`, `sendWatchGame(id)`, `sendClientExit()`.
   - `game-ui.js`: `sendGameReady()`, `sendClientExit()`.
   - `game-scene.js`: `sendGameMove(row, col)`.
   - `game-state-service.js` `CLIENT_CONNECT` handler: `this.clientId = data.clientId` (was `this.clientId = Number(data)`).
   - `menu-ui.js` `NICKNAME_SET` handler: `if (data.invalidLength > 0) showToast(...)`.
6. **Delete `ServerEventCode` export** from `protocol-constants.js`. Delete any lingering imports in the three UI files.
7. **Build check:** `npm --prefix client run build` — green.
8. **Manual (optional):** `npm --prefix client run dev`, open devtools → Network → WS → confirm frames are binary.

## Todo List
- [ ] `npm install protobufjs@7.5.4 protobufjs-cli@1.1.3` (pinned versions)
- [ ] Add `proto:gen` script
- [ ] Run `proto:gen`, commit `src/generated/protocol.js` + `.d.ts`
- [ ] `binaryType = 'arraybuffer'` in connect
- [ ] Typed send helpers on `connectionService`
- [ ] Typed decode + response-case mapping in `_onMessage`
- [ ] Update 14 call sites across menu-ui / game-ui / game-scene
- [ ] `game-state-service` `data.clientId` fix
- [ ] `menu-ui` `invalidLength > 0` guard
- [ ] Delete `ServerEventCode` from `protocol-constants.js`
- [ ] Default URL port 1999
- [ ] `npm --prefix client run build` green
- [ ] Commit: `refactor(client): typed protobuf binary websocket on port 1999`

## Success Criteria
- `client/src/generated/protocol.js` exports `Request` and `Response` via the `miti99.caro.protocol` namespace.
- `grep -n "JSON.stringify({" client/src/services/connection-service.js` returns nothing (envelope path).
- `grep -rn "ServerEventCode" client/src` returns nothing.
- `grep -rn "connectionService.send(" client/src` returns nothing (only the typed helpers).
- `npm --prefix client run build` green.
- Devtools: WS frames binary (hex view).
- Full end-to-end flow: nickname → lobby → PVE → move → win.

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Generated namespace path differs from expectation | Medium | Low | Inspect `protocol.js` after first codegen; adjust import alias |
| Protobufjs field name camelCase mismatch with existing UI consumers | Low | Medium | Audit confirms consumer field names already match; spot-check during build |
| `Response.payload` oneof access returns undefined for PAYLOAD_NOT_SET | Low | Low | Guard `if (!caseName) return;` in `_onMessage` |
| Heartbeat frame rejected by server parser | Low | High | `HeartbeatRequest {}` is a valid wrapper variant — tested in phase 02a smoke |
| Vite dev HMR chokes on protobufjs CJS | Low | Medium | Static module is ESM; if issue arises add to `optimizeDeps.include` |
| Missed call site still calls `send(code, data)` | Medium | High (runtime error) | Delete `ServerEventCode` export so missed call sites fail at build time |
| Pbjs output non-deterministic across machines | Low | Low | Pin `protobufjs-cli` version in devDeps |
| Client's `CLIENT_CONNECT` previously read raw string; new object shape breaks anything else I missed | Medium | Low | Grep all `CLIENT_CONNECT` listeners; only `game-state-service.js` registers one |

## Security Considerations
- `Response.decode` on untrusted server data can throw; wrap `_onMessage` in try/catch (existing code already has this).
- No CSP change. Same-origin WS.
- Oversized frames still capped by server `HttpObjectAggregator`.

## Next Steps
- Phase 05: docker + docs sweep. No more client code changes.
