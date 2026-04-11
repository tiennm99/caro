---
title: "WebSocket typed-protobuf migration + TCP removal"
description: "Drop TCP. Rewrite wire protocol as typed protobuf (request.proto / response.proto) on single port 1999. Dispatch via Java sealed records."
status: implementation-complete
priority: P2
effort: 12h
branch: master
tags: [refactor, netty, websocket, protobuf, client, breaking-change]
created: 2026-04-10
shipped-commits: [945a249, b75733f, 3ad9a7b, ecc6177, cbad690]
---

## Goal
1. WebSocket frames become typed protobuf binary — one `Request` oneof client→server, one `Response` oneof server→client.
2. Delete TCP transport entirely. Server listens on ONE port only (default `1999`).
3. Server dispatches requests internally via a **sealed `ClientRequest` interface + Java records**, replacing today's string-keyed `ServerEventListener.get(code)` reflection lookup.
4. Inner JSON `data` strings are GONE — every event code has a concrete proto message.

## Key Decisions (locked)
- **Proto file rename:** `request.proto` (client→server, wraps `oneof`), `response.proto` (server→client, wraps `oneof`). `common.proto` is NOT created — no fields are genuinely shared across both directions after audit (see Audit Notes). YAGNI.
- **Wire format:** wrapper `Request { oneof payload { HeartbeatRequest heartbeat = 1; GameMoveRequest game_move = 2; ... } }`. No more string `code` field on the wire — the `oneof` case IS the code. Symmetric `Response` wrapper.
- **Internal dispatch (server):** `Request.parseFrom(bytes)` → switch on `payloadCase` → convert to a `ClientRequest` record (sealed interface hierarchy in `com.miti99.caro.server.event.request.*`) → `RequestDispatcher.dispatch(client, req)` → pattern-matching switch invokes the existing business-logic handler. No reflection, no string lookup.
- **Responses:** server constructs `Response` proto directly in handlers (no response-side record layer — one-way traffic, no dispatch, adding records is ceremony for zero benefit). `ChannelUtils.push(Channel, Response)` serializes and writes a `BinaryWebSocketFrame`.
- **Event listeners keep their business logic.** Only the signature/shape changes: instead of `void call(ClientSide, String data)` they become handler methods taking a concrete record (e.g. `GameMoveHandler.handle(ClientSide, GameMoveRequest)`). The classes are renamed from `ServerEventListener_CODE_*` to `<Event>Handler` to drop the reflection-registry prefix.
- **Gradle `com.google.protobuf` plugin v0.9.6** generates Java from `server/src/main/proto/*.proto`. Committed generated Java files are deleted. `.proto` files live at `server/src/main/proto/` (plugin convention).
- **Client:** `protobufjs-cli` static codegen committed under `client/src/generated/protocol.js` + `.d.ts`. Client event bus keys on a string event name derived from `Response.payloadCase` (mapping table).
- **Port:** single port `1999` default (`-p 1999` arg honored). TCP port 1024 silently dropped — no external consumers, no migration notice.
- **Gson dep dies.** With no inner JSON strings left, `JsonUtils` and `MapHelper` become dead code and are deleted. `implementation("com.google.code.gson:gson")` removed from `build.gradle.kts`.

## Dependency Graph
```
01 (proto schemas + plugin) -> 02a (dispatcher scaffolding) -> 02b (migrate handlers) -> 03 (cleanup) -> 04 (client) -> 05 (infra+docs) -> 06 (E2E)
```
Strict serial. Each phase must leave server compiling (`./gradlew -p server compileJava`) and tests green. Phase 02 is split 02a/02b — see below.

## Phases
| # | File | Focus | Status |
|---|------|-------|--------|
| 01 | [phase-01-proto-schemas-and-build.md](phase-01-proto-schemas-and-build.md) | Author `request.proto` / `response.proto`, Gradle protobuf plugin, delete hand-committed generated Java | done (945a249) |
| 02a | [phase-02a-dispatcher-scaffolding.md](phase-02a-dispatcher-scaffolding.md) | Sealed `ClientRequest` interface + records, `RequestDispatcher`, binary WS pipeline, stub handlers | done (945a249) |
| 02b | [phase-02b-migrate-handlers.md](phase-02b-migrate-handlers.md) | Port every `ServerEventListener_CODE_*` to typed handler; rewrite `ChannelUtils` for `Response` | done (b75733f) |
| 03 | [phase-03-server-cleanup.md](phase-03-server-cleanup.md) | Delete `Msg`, `JsonUtils`, `MapHelper`, TCP framing, gson dep; verify 37 tests pass | done (3ad9a7b) |
| 04 | [phase-04-client-protobuf.md](phase-04-client-protobuf.md) | `protobufjs-cli` codegen, rewrite `connection-service.js` for typed Request/Response oneof, port 1999 | done (ecc6177) |
| 05 | [phase-05-infra-and-docs.md](phase-05-infra-and-docs.md) | docker-compose, Dockerfile, README, docs/* | done (cbad690) |
| 06 | [phase-06-e2e-smoke-test.md](phase-06-e2e-smoke-test.md) | Manual E2E checklist via docker compose | deferred (user-run) |

## Audit Notes (inbound/outbound schemas, from codebase read)
Condensed from `server/src/main/java/com/miti99/caro/server/event/*` and `client/src/**/*.js`:

**Inbound (ServerEventCode → Request oneof field):**
| Code | Inner data shape | Request message |
|---|---|---|
| CLIENT_HEAD_BEAT | (none) | `HeartbeatRequest {}` |
| CLIENT_NICKNAME_SET | raw string (nickname) | `SetNicknameRequest { string nickname = 1; }` |
| CLIENT_INFO_SET | `{version}` | `SetClientInfoRequest { string version = 1; }` |
| ROOM_CREATE | (none) | `CreateRoomRequest {}` |
| ROOM_CREATE_PVE | raw string "1"/"2"/"3" | `CreatePveRoomRequest { int32 difficulty = 1; }` |
| GET_ROOMS | (none) | `GetRoomsRequest {}` |
| ROOM_JOIN | raw string (room id) | `JoinRoomRequest { int32 room_id = 1; }` |
| GAME_STARTING | (none, reused internally) | `GameStartingRequest {}` (keep for sealed-hierarchy completeness; never directly sent by client today) |
| GAME_READY | (none) | `GameReadyRequest {}` |
| GAME_MOVE | `{row, col}` | `GameMoveRequest { int32 row = 1; int32 col = 2; }` |
| GAME_RESET | (none, unused) | `GameResetRequest {}` |
| GAME_WATCH | raw string (room id) | `WatchGameRequest { int32 room_id = 1; }` |
| GAME_WATCH_EXIT | (none) | `WatchGameExitRequest {}` |
| CLIENT_EXIT | (none) | `ClientExitRequest {}` |

**Outbound (ClientEventCode → Response oneof field):**
| Code | Inner data shape | Response message |
|---|---|---|
| CLIENT_CONNECT | string clientId | `ClientConnectResponse { int32 client_id = 1; }` |
| CLIENT_NICKNAME_SET | `{invalidLength}` OR null (prompt) | `NicknameSetResponse { int32 invalid_length = 1; }` (0 = prompt-only) |
| SHOW_OPTIONS | null | `ShowOptionsResponse {}` |
| SHOW_OPTIONS_PVE/PVP/SETTING | null (not emitted today) | skipped — enum values are present but the server never sends them. Keep `ClientEventCode` enum JS-side for compatibility but no proto fields needed. |
| SHOW_ROOMS | `List<{roomId, roomOwner, roomClientCount, roomType}>` | `ShowRoomsResponse { repeated RoomSummary rooms = 1; } RoomSummary { int32 room_id; string room_owner; int32 room_client_count; string room_type; }` |
| SHOW_BOARD | (never sent) | skipped |
| ROOM_CREATE_SUCCESS | full `Room` JSON, client reads `data.id` | `RoomCreateSuccessResponse { int32 id = 1; string room_owner = 2; string room_type = 3; }` (lean — only the three fields the client reads) |
| ROOM_JOIN_SUCCESS | `{clientId, clientNickname, roomId, roomOwner, roomClientCount}` OR raw nickname for watchers | Split into `RoomJoinSuccessResponse { ... }` + `WatcherJoinNoticeResponse { string nickname = 1; }`. **Different oneof fields.** Alternative (simpler): one `RoomJoinSuccessResponse` with all fields; watcher path sets only `nickname`. Go with simpler single-message approach. |
| ROOM_JOIN_FAIL_BY_FULL | `{roomId, roomOwner}` | `RoomJoinFailFullResponse { int32 room_id = 1; string room_owner = 2; }` |
| ROOM_JOIN_FAIL_BY_INEXIST | `{roomId}` | `RoomJoinFailNotFoundResponse { int32 room_id = 1; }` |
| ROOM_PLAY_FAIL_BY_INEXIST | null | `RoomPlayFailNotFoundResponse {}` |
| GAME_STARTING | `{roomId, blackPlayerId, blackPlayerNickname, whitePlayerId, whitePlayerNickname, boardSize}` | `GameStartingResponse { int32 room_id = 1; int32 black_player_id = 2; string black_player_nickname = 3; int32 white_player_id = 4; string white_player_nickname = 5; int32 board_size = 6; }` |
| GAME_READY | `{clientNickName, status, clientId}` | `GameReadyResponse { string client_nickname = 1; string status = 2; int32 client_id = 3; }` |
| GAME_MOVE_SUCCESS | `{row, col, piece, playerNickname, playerId}` | `GameMoveSuccessResponse { int32 row = 1; int32 col = 2; string piece = 3; string player_nickname = 4; int32 player_id = 5; }` |
| GAME_MOVE_INVALID/OCCUPIED/OUT_OF_BOUNDS/NOT_YOUR_TURN | null | `GameMoveInvalidResponse {}` `GameMoveOccupiedResponse {}` `GameMoveOutOfBoundsResponse {}` `GameMoveNotYourTurnResponse {}` |
| GAME_OVER | `{result, winnerNickname}` | `GameOverResponse { string result = 1; string winner_nickname = 2; }` |
| GAME_WIN / LOSE / DRAW | (never sent directly — GAME_OVER carries result) | skipped |
| PVE_DIFFICULTY_NOT_SUPPORT | null | `PveDifficultyNotSupportResponse {}` |
| GAME_WATCH | (never sent directly) | skipped |
| GAME_WATCH_SUCCESSFUL | `{owner, status}` | `WatchGameSuccessResponse { string owner = 1; string status = 2; }` |
| CLIENT_EXIT | `{roomId, exitClientId, exitClientNickname}` OR raw nickname (watchers) | `ClientExitResponse { int32 room_id = 1; int32 exit_client_id = 2; string exit_client_nickname = 3; }` (watcher path populates only nickname; roomId=0 means "watcher-style notice") |
| CLIENT_KICK | (never sent) | skipped |

Obsolete `ClientEventCode` enum values that the server NEVER sends are excluded from `response.proto`. They remain in the Java enum only as long as needed; ideally deleted in Phase 03. Client JS keeps them until UI code stops referencing (none does — only `CLIENT_KICK` has a listener in game-scene but it's never fired).

## Global Success Criteria
- Server exposes only TCP port 1999 (WebSocket handshake at `/ratel`).
- Wireshark/devtools show binary WS frames on the wire — no JSON strings anywhere.
- `./gradlew -p server clean build` green (all existing unit tests pass — 37).
- `npm --prefix client run build` green.
- End-to-end: nickname → lobby → PVE move → win works.
- Zero references to `TextWebSocketFrame`, `Msg`, `JsonUtils`, `MapHelper`, `ProtobufProxy`, `SecondProtobufCodec`, `ByteKit/ByteLink/TransferProtocolUtils/DefaultDecoder`, `implements Proxy`, gson, ports 1024/1025.
- Zero reflection-based listener lookup (`ServerEventListener.get(code)` gone).

## Rollback
Each phase is one commit (02 is two: 02a + 02b). `git revert <sha>` restores prior state. Phase 02b is the riskiest (touches 14 handlers) — keep 02a isolated so a bad handler port can be reverted without losing the dispatcher scaffolding.

## Resolved Questions
1. **Generated JS location:** commit under `client/src/generated/` (no gitignore, no prebuild step). — User confirmed.
2. **TCP 1024 external consumers:** none. Drop silently, no migration notice. — User confirmed.
3. **Inner payload migration:** full typed-proto migration NOW. Inner JSON strings gone. Java sealed interface + record dispatch. — User confirmed.

## Target Dependency Versions (latest stable pre-2026)
Pin these exact versions across phases 01 and 04. Source: `plans/reports/researcher-260410-2132-pre-2026-versions.md`.

**Server (`server/build.gradle.kts`) — Phase 01 updates these alongside the protobuf plugin:**
| Dep | Current | Target | Action |
|---|---|---|---|
| `com.google.protobuf` Gradle plugin | (new) | **0.9.6** | ADD |
| `com.google.protobuf:protoc` artifact | (new) | **3.25.5** | ADD |
| `com.google.protobuf:protobuf-java` | 3.25.5 | 3.25.5 | keep |
| `io.netty:netty-all` | 4.1.115.Final | **4.1.128.Final** | BUMP (+13 releases, security patches) |
| `org.junit:junit-bom` | 5.11.3 | **5.11.4** | BUMP (patch) |
| `com.gradleup.shadow` plugin | 8.3.5 | **8.3.8** | BUMP (maintenance) |
| Gradle wrapper | 9.2.1 | 9.2.1 | keep (repo already ≥ pre-2026 latest) |

**Client (`client/package.json`) — Phase 04 updates these:**
| Dep | Current | Target | Action |
|---|---|---|---|
| `protobufjs` | (new) | **7.5.4** | ADD (runtime dep, uses `protobufjs/minimal`) |
| `protobufjs-cli` | (new) | **1.1.3** | ADD (devDep, for `pbjs`/`pbts` codegen) |
| `phaser` | 3.87.0 | 3.87.0 | keep |
| `vite` | 6.3.1 | 6.3.1 | keep (repo already ≥ pre-2026 latest) |

All version bumps are low-risk patch/maintenance releases — no breaking changes expected. Verified in researcher report.

## New Unresolved Questions
- **`WinDetectResult` / `PieceType` enum:** `PieceType` lives in `common.enums` today and is used only in server-internal board logic + as a stringified field on `GameMoveSuccessResponse.piece`. Proto `piece` field is kept as `string` ("BLACK"/"WHITE") so no proto enum needed. Confirm OK (alternative: proto enum).
- **`RoomStatus` / `RoomType` strings on the wire:** `GAME_WATCH_SUCCESSFUL.status` and `SHOW_ROOMS.roomType` are stringified enum names today. Kept as proto `string` for the same reason. Confirm OK.
- **Removing dead `ClientEventCode` entries** (`CLIENT_KICK`, `SHOW_BOARD`, `SHOW_OPTIONS_PVP/PVE/SETTING`, `GAME_WIN/LOSE/DRAW`, `GAME_WATCH` outbound): keep enum in Java for now (orthogonal cleanup) or delete in Phase 03? Plan assumes **keep enum, do not add to `response.proto`** — YAGNI on cleanup scope.
- **Heartbeat frame shape:** `HeartbeatRequest {}` (empty message). Alternative: drop heartbeat from the oneof entirely and use a sentinel frame. Empty message is simpler and keeps the oneof exhaustive for pattern matching. Confirm.
