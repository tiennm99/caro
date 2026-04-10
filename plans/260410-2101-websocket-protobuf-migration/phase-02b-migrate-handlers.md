# Phase 02b — Migrate Event Handlers to Typed Records

## Context Links
- [plan.md](plan.md)
- [phase-02a-dispatcher-scaffolding.md](phase-02a-dispatcher-scaffolding.md)
- `server/src/main/java/com/miti99/caro/server/event/RequestDispatcher.java`
- Git history of deleted `ServerEventListener_CODE_*.java` files (source of business logic)
- Audit tables in `plan.md` (inbound/outbound schemas)

## Overview
- **Priority:** P2 (game logic is unusable until this phase ships)
- **Status:** pending (blocked by Phase 02a)
- Replace every `UnsupportedOperationException` in `RequestDispatcher` with a real handler call. Re-implement each of the 14 old `ServerEventListener_CODE_*` business-logic classes as `<Verb>Handler` classes that take a typed record and emit a typed `Response` proto via `ChannelUtils.push(Channel, Response)`.
- Single commit: `refactor(server): migrate event handlers to typed records`.

## Key Insights
- Business logic is unchanged. Only the signatures and the outbound serialization shape change.
- Handler naming convention: one class per record, placed in `com.miti99.caro.server.event.handler`. Class name = record prefix (e.g. `GameMoveRequestRecord` → `GameMoveHandler`).
- Each handler has a `static void handle(ClientSide client, XxxRequestRecord req)` entry point. Stateless utility classes — no need for DI or instances (old code used reflection-instantiated singletons; records + static methods are simpler and thread-safe by default).
- `ClientOfflineHandler` is the ONE handler that is NOT routed via the dispatcher. It's called directly from `WebsocketTransferHandler.clientOfflineEvent()` on channel close. Not a `ClientRequest` — no record, no dispatcher entry.
- `GameStartingHandler` is called from two places: internally from `GameReadyHandler` when both players are ready, and from `CreatePveRoomHandler` for auto-start. NOT reachable via the dispatcher in normal flow (client doesn't send `game_starting` directly) — but kept in the oneof for symmetry. The dispatcher's `GameStartingRequestRecord` case can simply call `GameStartingHandler.handle(client, req)` — safe if client ever sends it.
- Outbound messages are built inline: `Response.newBuilder().setGameMoveSuccess(GameMoveSuccessResponse.newBuilder().setRow(r).setCol(c)...).build()`. Slightly verbose vs helper methods; keep inline for transparency + YAGNI.
- **Extract** a single private static helper per handler if the same `Response` is broadcast to multiple channels (e.g. `GameMoveHandler.broadcastMoveSuccess(room, ...)`). Don't over-extract.

## Requirements
**Functional**
- Every `ServerEventCode` path that existed before has equivalent typed-record handler logic.
- Every `ClientEventCode` that was ever emitted (per audit) is emitted with the matching typed `Response`.
- End-to-end game flow works: nickname → lobby → PVE room → move → win.
- `ClientOfflineHandler` runs on channel close (room cleanup, notify peers via `ClientExitResponse`).
- `GameReadyHandler` auto-triggers `GameStartingHandler` when both players are ready (replicating old `ServerEventListener.get(GAME_STARTING).call(...)` call).
- `CreatePveRoomHandler` auto-starts the game via `GameStartingHandler.handle(client, new GameStartingRequestRecord())`.

**Non-functional**
- `./gradlew -p server clean build` green (all 37 unit tests pass).
- No reflection, no `Class.forName`, no `HashMap<EventCode, Listener>`.
- All 14 handler classes ≤ 200 LOC (most will be ≤ 80).

## Architecture
```
com.miti99.caro.server.event
  RequestConverter                        (phase 02a)
  RequestDispatcher                       (phase 02a; fills in real calls this phase)
  request/
    ClientRequest.java (sealed)           (phase 02a)
    *RequestRecord.java (14 records)      (phase 02a)
  handler/
    HeartbeatHandler.java                 (noop — or inline in dispatcher)
    SetNicknameHandler.java
    SetClientInfoHandler.java
    CreateRoomHandler.java
    CreatePveRoomHandler.java
    GetRoomsHandler.java
    JoinRoomHandler.java
    GameStartingHandler.java
    GameReadyHandler.java
    GameMoveHandler.java
    GameResetHandler.java
    WatchGameHandler.java
    WatchGameExitHandler.java
    ClientExitHandler.java
    ClientOfflineHandler.java             (not dispatcher-routed)
```

`RequestDispatcher` after this phase:
```java
public static void dispatch(ClientSide client, ClientRequest req) {
  switch (req) {
    case HeartbeatRequestRecord r -> { /* noop */ }
    case SetNicknameRequestRecord r -> SetNicknameHandler.handle(client, r);
    case SetClientInfoRequestRecord r -> SetClientInfoHandler.handle(client, r);
    case CreateRoomRequestRecord r -> CreateRoomHandler.handle(client, r);
    case CreatePveRoomRequestRecord r -> CreatePveRoomHandler.handle(client, r);
    case GetRoomsRequestRecord r -> GetRoomsHandler.handle(client, r);
    case JoinRoomRequestRecord r -> JoinRoomHandler.handle(client, r);
    case GameStartingRequestRecord r -> GameStartingHandler.handle(client, r);
    case GameReadyRequestRecord r -> GameReadyHandler.handle(client, r);
    case GameMoveRequestRecord r -> GameMoveHandler.handle(client, r);
    case GameResetRequestRecord r -> GameResetHandler.handle(client, r);
    case WatchGameRequestRecord r -> WatchGameHandler.handle(client, r);
    case WatchGameExitRequestRecord r -> WatchGameExitHandler.handle(client, r);
    case ClientExitRequestRecord r -> ClientExitHandler.handle(client, r);
  }
}
```

## Related Code Files
**Modify**
- `server/src/main/java/com/miti99/caro/server/event/RequestDispatcher.java` — replace stubs with handler calls.
- `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java` — `clientOfflineEvent()` calls `ClientOfflineHandler.handle(client)`.

**Create** (handler classes; each is a port of the old `ServerEventListener_CODE_*` business logic with typed signatures)
- `server/src/main/java/com/miti99/caro/server/event/handler/SetNicknameHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/SetClientInfoHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/CreateRoomHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/CreatePveRoomHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GetRoomsHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/JoinRoomHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GameStartingHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GameReadyHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GameMoveHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GameResetHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/WatchGameHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/WatchGameExitHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/ClientExitHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/ClientOfflineHandler.java`

**Delete**
- None (already done in 02a).

## Implementation Steps
Migrate handlers in dependency order — `GameStartingHandler` before `GameReadyHandler` and `CreatePveRoomHandler` because they both call it internally.

For EACH handler, the recipe is:
1. `git show <old-file-path>` to read the deleted logic.
2. Create a new file with `public final class <Verb>Handler` + `public static void handle(ClientSide client, <Record> req)`.
3. Port the logic verbatim; replace:
   - `String data` → typed fields from `req`.
   - `MapHelper.newInstance().put(k,v)...json()` → `Response.newBuilder().setXxx(XxxResponse.newBuilder().setField(v))...build()`.
   - `ChannelUtils.pushToClient(ch, ClientEventCode.CODE_XYZ, result)` → `ChannelUtils.push(ch, Response.newBuilder().setXyz(XyzResponse.newBuilder()...).build())`.
   - `JsonUtils.fromJson(data, Map.class)` → direct field access on the record.
   - `JsonUtils.toJson(room)` → build `RoomCreateSuccessResponse` with only `id / room_owner / room_type` (the three fields the client reads; see audit).
4. Update `RequestDispatcher` to call the new handler instead of `throw todo(...)`.
5. Compile check after each 2-3 handlers: `./gradlew -p server compileJava` — catch mistakes early.

### Migration Order (14 handlers + 1 offline)
1. **HeartbeatHandler** — noop; inline in dispatcher, no separate class needed. (Already done in 02a.)
2. **SetClientInfoHandler** — trivial: `client.setVersion(req.version())`. No outbound message.
3. **SetNicknameHandler** — validate length, set nickname, emit `SHOW_OPTIONS` OR `NICKNAME_SET{invalid_length}`.
4. **CreateRoomHandler** — build PVP room, emit `ROOM_CREATE_SUCCESS{id, room_owner, room_type}`.
5. **GetRoomsHandler** — enumerate rooms, emit `SHOW_ROOMS{rooms: [RoomSummary]}`.
6. **GameStartingHandler** — (called internally) assign roles, emit `GAME_STARTING{...}` to players + watchers.
7. **CreatePveRoomHandler** — validate difficulty, build PVE room, add AI robot, call `GameStartingHandler.handle(client, new GameStartingRequestRecord())`.
8. **GameReadyHandler** — toggle ready, emit `GAME_READY{...}`, auto-trigger `GameStartingHandler.handle(client, new GameStartingRequestRecord())` when both ready.
9. **JoinRoomHandler** — find room, append client, emit `ROOM_JOIN_SUCCESS` to all members, trigger `GameStartingHandler` when full. On fail emit `ROOM_JOIN_FAIL_FULL` or `ROOM_JOIN_FAIL_NOT_FOUND`.
10. **GameMoveHandler** — bounds + turn check, make move, emit `GAME_MOVE_SUCCESS` broadcast, check game over → `GAME_OVER`, trigger AI move if PVE. Error cases: `ROOM_PLAY_FAIL_NOT_FOUND`, `GAME_MOVE_NOT_YOUR_TURN`, `GAME_MOVE_OUT_OF_BOUNDS`, `GAME_MOVE_OCCUPIED`.
11. **GameResetHandler** — no logic in old code (listener file did not exist → `GAME_RESET` was never implemented). Confirmed by `ls` in audit. Handler body is `// TODO: not implemented — noop for now`.
12. **WatchGameHandler** — add client to `watcherList`, emit `WATCH_GAME_SUCCESS` or `ROOM_JOIN_FAIL_NOT_FOUND`.
13. **WatchGameExitHandler** — remove client from `watcherList`. No outbound.
14. **ClientExitHandler** — leave room, notify peers via `CLIENT_EXIT{room_id, exit_client_id, exit_client_nickname}` + notify watchers. Clean up room.
15. **ClientOfflineHandler** (NOT dispatcher-routed) — called from `WebsocketTransferHandler.clientOfflineEvent()`. Same cleanup as ClientExit but triggered by socket close.
16. Update `RequestDispatcher.dispatch` to route every record to its handler. Remove all `todo(...)` calls.
17. Wire `clientOfflineEvent()` in `WebsocketTransferHandler` to call `ClientOfflineHandler.handle(client)`.
18. `./gradlew -p server clean build` — all 37 unit tests pass.
19. Commit: `refactor(server): migrate event handlers to typed records`.

## Todo List
- [ ] Confirm 02a commit ships before starting
- [ ] `SetClientInfoHandler`
- [ ] `SetNicknameHandler`
- [ ] `CreateRoomHandler`
- [ ] `GetRoomsHandler`
- [ ] `GameStartingHandler`
- [ ] `CreatePveRoomHandler`
- [ ] `GameReadyHandler`
- [ ] `JoinRoomHandler`
- [ ] `GameMoveHandler`
- [ ] `GameResetHandler` (noop)
- [ ] `WatchGameHandler`
- [ ] `WatchGameExitHandler`
- [ ] `ClientExitHandler`
- [ ] `ClientOfflineHandler` (not dispatcher-routed)
- [ ] `RequestDispatcher` every case wired
- [ ] `WebsocketTransferHandler.clientOfflineEvent` wires `ClientOfflineHandler`
- [ ] `./gradlew -p server clean build` green (37/37 tests)
- [ ] Commit: `refactor(server): migrate event handlers to typed records`

## Success Criteria
- `grep -r "UnsupportedOperationException" server/src/main/java/com/miti99/caro/server/event` returns nothing.
- `grep -r "JsonUtils\|MapHelper" server/src/main/java/com/miti99/caro/server/event` returns nothing.
- `RequestDispatcher` has 14 cases, all calling real handlers.
- 37 unit tests pass.
- Server + a hand-crafted protobuf client script can complete a PVE move round-trip (manual smoke, optional).

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Handler ports mis-copy fields (e.g. swap row/col) | Medium | Medium | Unit tests for game logic catch board-level bugs; E2E Phase 06 catches wire-level bugs |
| Broadcasting to peers misses watchers | Medium | Low | Mirror old broadcast helper verbatim; each handler has a private `broadcastToRoom` like the old `GAME_MOVE` |
| `GameReadyHandler` triggering `GameStartingHandler` mid-dispatch causes re-entrant lock issues | Low | Medium | Old code also did this (synchronously) — no new risk; no locks involved |
| `ClientOfflineHandler` wired twice (idle + channel close) | Medium | Medium | Old code had same risk; guard with `client.getChannel() != null` check or idempotent cleanup |
| `RoomCreateSuccessResponse` strips fields the client silently reads | Medium | Medium | Audit confirms ONLY `data.id` is read client-side; remaining proto fields `room_owner`/`room_type` are defensive additions |
| Gson-stringified enums become `""` when proto expects a string (`RoomType.PVE.toString()` vs hypothetical `null`) | Low | Low | Explicit `.name()` or `.toString()` on enum references, matching old code |
| Compile runs out of memory during massive rewrite | Very Low | Low | Incremental compile per 2-3 handlers |

## Security Considerations
- Same surface as old code. Each handler still validates the request (bounds check, difficulty range, room existence).
- `SetNicknameHandler` still enforces `<= 10` chars limit.
- No new reflection paths introduced.

## Next Steps
- Phase 03: delete `Msg.java`, `JsonUtils.java`, `MapHelper.java`, the transfer package, gson dep, and the now-unused `ServerEventCode` enum (the enum is dead because dispatch no longer looks it up). `ClientEventCode` enum can also shrink — but is orthogonal, defer.
