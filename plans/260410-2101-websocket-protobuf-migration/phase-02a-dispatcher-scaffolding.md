# Phase 02a — Dispatcher Scaffolding + Binary WS Pipeline

## Context Links
- [plan.md](plan.md)
- [phase-01-proto-schemas-and-build.md](phase-01-proto-schemas-and-build.md)
- `server/src/main/java/com/miti99/caro/server/SimpleServer.java`
- `server/src/main/java/com/miti99/caro/server/ServerContains.java`
- `server/src/main/java/com/miti99/caro/server/proxy/WebsocketProxy.java`
- `server/src/main/java/com/miti99/caro/server/proxy/ProtobufProxy.java` (to delete)
- `server/src/main/java/com/miti99/caro/server/proxy/Proxy.java` (to delete)
- `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java`
- `server/src/main/java/com/miti99/caro/server/handler/ProtobufTransferHandler.java` (to delete)
- `server/src/main/java/com/miti99/caro/server/handler/SecondProtobufCodec.java` (to delete)
- `server/src/main/java/com/miti99/caro/common/channel/ChannelUtils.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener.java`

## Overview
- **Priority:** P2 (core of the refactor)
- **Status:** pending (blocked by Phase 01)
- Build the sealed `ClientRequest` interface + record hierarchy + `RequestDispatcher`. Rewrite the Netty pipeline for `BinaryWebSocketFrame`. Delete TCP classes. Flip port to 1999. Port ONE handler (heartbeat) as a smoke-test through the new pipeline; leave the other 13 handlers as `// TODO phase 02b` stubs that throw `UnsupportedOperationException`.
- **This phase is committed together with Phase 01** as one atomic commit because Phase 01 alone leaves the build broken (deleted envelope types). The commit message is `refactor(server): typed protobuf wire + sealed record dispatcher scaffolding`.
- Phase 02b then migrates the 13 stubbed handlers.

## Key Insights
- Sealed interface + records give exhaustive pattern matching in `RequestDispatcher`. The compiler enforces that every oneof case has a record, which eliminates the class of bugs where a new event code is added and some dispatch site forgets to update.
- Old `ServerEventListener` reflection lookup (`Class.forName(LISTENER_PREFIX + code.name())`) is replaced by a plain `switch` on the sealed hierarchy. No reflection, no map cache.
- Keeping handler business logic: each old `ServerEventListener_CODE_*` is renamed to `<Verb>Handler` (e.g. `GameMoveHandler`, `CreatePveRoomHandler`). The body stays the same — only the signature changes from `(ClientSide, String)` to `(ClientSide, XxxRequest)`. In 02a we create the dispatcher + the `HeartbeatHandler` (no-op today) and stub-dispatch the rest with `// TODO 02b`.
- `RoomClearTask` scheduling currently lives in `ProtobufProxy.start()`. Must move to `WebsocketProxy.start()` — explicit todo.
- `ChannelUtils` in 02a gets a `push(Channel, Response)` method that takes a fully-built `Response` proto. Existing callers (which pass `ClientEventCode, String`) are NOT migrated yet — instead, `ChannelUtils.pushToClient(Channel, ClientEventCode, String)` is temporarily kept as a throwing stub (`throw new UnsupportedOperationException("phase 02b")`) so callers still compile. Phase 02b deletes the stub as each handler migrates to the typed `push(Channel, Response)`.
- Wait — if old call sites throw at runtime on every outbound message, the server crashes immediately. Alternative: keep `pushToClient` logging at WARN + no-op return. Accept: the build compiles and boots, but NO outbound traffic works between 02a and 02b commit. Since 02a and 02b are both code changes and we do not deploy 02a alone to prod (personal project), this is acceptable. **Rule: 02a + 02b MUST NOT be split across a deployment boundary.** Documented in Risk Assessment.
- Alternatively: DO NOT stub — migrate ALL handlers in one big commit. Rejected: ~14 handlers + full pipeline rewrite in one commit is the "too big to review" anti-pattern and breaks the phase-at-a-time rollback.
- Final decision: **02a temporarily leaves old `pushToClient(ch, code, data)` stub as `throw UnsupportedOperationException`** — but NONE of the 13 stubbed handlers actually reach it because the dispatcher throws BEFORE calling them. So 02a compiles, boots, accepts a connection, and responds to heartbeat. Any other inbound request throws in the dispatcher. This is the 02a acceptance shape.

## Requirements
**Functional**
- Server binds single port (default 1999), serves WebSocket on `/ratel`.
- Incoming `BinaryWebSocketFrame` → `Request.parseFrom(bytes)` → `switch` on payloadCase → record conversion → `RequestDispatcher.dispatch(client, request)`.
- `HeartbeatRequest` flows end-to-end (no-op).
- Every other request throws `UnsupportedOperationException("TODO phase 02b: <case>")` from the dispatcher — loud, unmissable.
- Pipeline retains: `HttpServerCodec` → `HttpObjectAggregator(8192)` → `ChunkedWriteHandler` → `IdleStateHandler(30min)` → `WebSocketServerProtocolHandler("/ratel")` → `WebsocketTransferHandler`.
- `HandshakeComplete` init logic preserved.
- `RoomClearTask` scheduled from `WebsocketProxy.start()`.
- `-p 1999` arg still honored, default `1999`.

**Non-functional**
- Build green: `./gradlew -p server clean build` passes (all 37 unit tests still pass; they test pure game logic, unaffected).
- Zero references to `TextWebSocketFrame`, `ProtobufProxy`, `SecondProtobufCodec`, `implements Proxy`.

## Architecture
```
client ---ws://host:1999/ratel---> Netty
  HttpServerCodec
  -> HttpObjectAggregator(8192)
  -> ChunkedWriteHandler
  -> IdleStateHandler(30min read)
  -> WebSocketServerProtocolHandler("/ratel")
  -> WebsocketTransferHandler : SimpleChannelInboundHandler<BinaryWebSocketFrame>
      channelRead0(ctx, frame):
        byte[] bytes = ByteBufUtil.getBytes(frame.content());
        Request req = Request.parseFrom(bytes);
        ClientRequest converted = RequestConverter.convert(req); // sealed record
        if (!(converted instanceof HeartbeatRequestRecord)) log dispatch;
        RequestDispatcher.dispatch(client, converted);
```

Sealed hierarchy (package `com.miti99.caro.server.event.request`):
```java
public sealed interface ClientRequest permits
    HeartbeatRequestRecord,
    SetNicknameRequestRecord,
    SetClientInfoRequestRecord,
    CreateRoomRequestRecord,
    CreatePveRoomRequestRecord,
    GetRoomsRequestRecord,
    JoinRoomRequestRecord,
    GameStartingRequestRecord,
    GameReadyRequestRecord,
    GameMoveRequestRecord,
    GameResetRequestRecord,
    WatchGameRequestRecord,
    WatchGameExitRequestRecord,
    ClientExitRequestRecord { }

public record HeartbeatRequestRecord() implements ClientRequest { }
public record SetNicknameRequestRecord(String nickname) implements ClientRequest { }
public record SetClientInfoRequestRecord(String version) implements ClientRequest { }
public record CreateRoomRequestRecord() implements ClientRequest { }
public record CreatePveRoomRequestRecord(int difficulty) implements ClientRequest { }
public record GetRoomsRequestRecord() implements ClientRequest { }
public record JoinRoomRequestRecord(int roomId) implements ClientRequest { }
public record GameStartingRequestRecord() implements ClientRequest { }
public record GameReadyRequestRecord() implements ClientRequest { }
public record GameMoveRequestRecord(int row, int col) implements ClientRequest { }
public record GameResetRequestRecord() implements ClientRequest { }
public record WatchGameRequestRecord(int roomId) implements ClientRequest { }
public record WatchGameExitRequestRecord() implements ClientRequest { }
public record ClientExitRequestRecord() implements ClientRequest { }
```

Converter (single place, keeps dispatcher clean):
```java
public final class RequestConverter {
  public static ClientRequest convert(Request req) {
    return switch (req.getPayloadCase()) {
      case HEARTBEAT -> new HeartbeatRequestRecord();
      case SET_NICKNAME -> new SetNicknameRequestRecord(req.getSetNickname().getNickname());
      case SET_CLIENT_INFO -> new SetClientInfoRequestRecord(req.getSetClientInfo().getVersion());
      case CREATE_ROOM -> new CreateRoomRequestRecord();
      case CREATE_PVE_ROOM -> new CreatePveRoomRequestRecord(req.getCreatePveRoom().getDifficulty());
      case GET_ROOMS -> new GetRoomsRequestRecord();
      case JOIN_ROOM -> new JoinRoomRequestRecord(req.getJoinRoom().getRoomId());
      case GAME_STARTING -> new GameStartingRequestRecord();
      case GAME_READY -> new GameReadyRequestRecord();
      case GAME_MOVE -> new GameMoveRequestRecord(req.getGameMove().getRow(), req.getGameMove().getCol());
      case GAME_RESET -> new GameResetRequestRecord();
      case WATCH_GAME -> new WatchGameRequestRecord(req.getWatchGame().getRoomId());
      case WATCH_GAME_EXIT -> new WatchGameExitRequestRecord();
      case CLIENT_EXIT -> new ClientExitRequestRecord();
      case PAYLOAD_NOT_SET -> throw new IllegalArgumentException("Request payload not set");
    };
  }
}
```

Dispatcher (02a: heartbeat only; 02b fills in):
```java
public final class RequestDispatcher {
  public static void dispatch(ClientSide client, ClientRequest req) {
    switch (req) {
      case HeartbeatRequestRecord r -> { /* no-op */ }
      case SetNicknameRequestRecord r -> throw todo("set_nickname");
      case SetClientInfoRequestRecord r -> throw todo("set_client_info");
      case CreateRoomRequestRecord r -> throw todo("create_room");
      case CreatePveRoomRequestRecord r -> throw todo("create_pve_room");
      case GetRoomsRequestRecord r -> throw todo("get_rooms");
      case JoinRoomRequestRecord r -> throw todo("join_room");
      case GameStartingRequestRecord r -> throw todo("game_starting");
      case GameReadyRequestRecord r -> throw todo("game_ready");
      case GameMoveRequestRecord r -> throw todo("game_move");
      case GameResetRequestRecord r -> throw todo("game_reset");
      case WatchGameRequestRecord r -> throw todo("watch_game");
      case WatchGameExitRequestRecord r -> throw todo("watch_game_exit");
      case ClientExitRequestRecord r -> throw todo("client_exit");
    }
  }
  private static UnsupportedOperationException todo(String name) {
    return new UnsupportedOperationException("TODO phase 02b: " + name);
  }
}
```

`ChannelUtils` in 02a:
```java
public final class ChannelUtils {
  public static ChannelFuture push(Channel channel, Response response) {
    byte[] bytes = response.toByteArray();
    return channel.writeAndFlush(new BinaryWebSocketFrame(Unpooled.wrappedBuffer(bytes)));
  }
}
```
Old `pushToClient` / `pushToServer` methods are DELETED in 02a — but the old `ServerEventListener_CODE_*` classes call them. Instead, in 02a, **delete all old `ServerEventListener_CODE_*.java` files** and the `ServerEventListener` interface entirely. The dispatcher throws for all non-heartbeat cases, so no handler needs to exist yet. Phase 02b creates new `<Verb>Handler` classes from scratch, using the old files as reference (git history).

Wait — if old handlers are deleted in 02a, where does the business logic come from in 02b? Answer: **re-implemented in 02b by copying from git history of each file**, adapted to take a record and call `ChannelUtils.push(ch, Response)`. This is cleaner than a halfway state.

Revised 02a deletion scope:
- Delete `server/src/main/java/com/miti99/caro/server/event/ServerEventListener.java`
- Delete ALL `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_*.java` (14 files)
- The business logic lives in git history; phase 02b re-creates it file-by-file as `<Verb>Handler` classes.

## Related Code Files
**Modify**
- `server/src/main/java/com/miti99/caro/server/ServerContains.java` — `public static int port = 1999;`
- `server/src/main/java/com/miti99/caro/server/SimpleServer.java` — remove `ProtobufProxy` thread, keep only `WebsocketProxy`.
- `server/src/main/java/com/miti99/caro/server/proxy/WebsocketProxy.java` — schedule `RoomClearTask` here; remove `implements Proxy`.
- `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java` — extends `SimpleChannelInboundHandler<BinaryWebSocketFrame>`; parse `Request`; dispatch.
- `server/src/main/java/com/miti99/caro/common/channel/ChannelUtils.java` — replaced with single `push(Channel, Response)` method.
- `server/build.gradle.kts` — (already modified in phase 01) confirm protobuf plugin wires `compileJava`.

**Create**
- `server/src/main/java/com/miti99/caro/server/event/request/ClientRequest.java` (sealed interface)
- `server/src/main/java/com/miti99/caro/server/event/request/HeartbeatRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/SetNicknameRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/SetClientInfoRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/CreateRoomRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/CreatePveRoomRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/GetRoomsRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/JoinRoomRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/GameStartingRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/GameReadyRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/GameMoveRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/GameResetRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/WatchGameRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/WatchGameExitRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/request/ClientExitRequestRecord.java`
- `server/src/main/java/com/miti99/caro/server/event/RequestConverter.java`
- `server/src/main/java/com/miti99/caro/server/event/RequestDispatcher.java`

**Delete**
- `server/src/main/java/com/miti99/caro/server/proxy/ProtobufProxy.java`
- `server/src/main/java/com/miti99/caro/server/proxy/Proxy.java`
- `server/src/main/java/com/miti99/caro/server/handler/ProtobufTransferHandler.java`
- `server/src/main/java/com/miti99/caro/server/handler/SecondProtobufCodec.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_CLIENT_EXIT.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_CLIENT_INFO_SET.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_CLIENT_NICKNAME_SET.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_CLIENT_OFFLINE.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_MOVE.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_READY.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_STARTING.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_WATCH.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_WATCH_EXIT.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GET_ROOMS.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_ROOM_CREATE.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_ROOM_CREATE_PVE.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_ROOM_JOIN.java`

**Keep for now** (used by HandshakeComplete / ClientSide offline path which phase 02a DOES need to emit):
- `server/src/main/java/com/miti99/caro/common/enums/ClientEventCode.java` — kept. Used only in JS event bus mapping; Java side may drop references but enum stays.

`WebsocketTransferHandler` in 02a still needs to send `CLIENT_CONNECT` + `NICKNAME_SET` prompt on handshake. Those are 2 outbound messages — `ChannelUtils.push(ch, Response.newBuilder().setClientConnect(ClientConnectResponse.newBuilder().setClientId(id)).build())` and the analogous `setNicknameSet(...)`. So `ChannelUtils.push` is exercised in 02a. Good.

`CLIENT_OFFLINE` is a server-internal event triggered on channel close — NOT a client request. In the old design it was piggy-backed on `ServerEventCode` + `ServerEventListener.get(CLIENT_OFFLINE)`. In the new design, `WebsocketTransferHandler.clientOfflineEvent()` calls a dedicated `ClientOfflineHandler.handle(client)` method directly — NOT routed through the request dispatcher. Phase 02b creates `ClientOfflineHandler`. For 02a, the offline path is a TODO-noop (log only) — no business impact during 02a smoke test.

## Implementation Steps
1. **Port flip.** `ServerContains.port = 1999;`
2. **Move `RoomClearTask`** from `ProtobufProxy.start()` into `WebsocketProxy.start()`, inside the `bootstrap.bind().sync()` block before `closeFuture().sync()`.
3. **Delete TCP stack:** `ProtobufProxy.java`, `Proxy.java`, `ProtobufTransferHandler.java`, `SecondProtobufCodec.java`. Remove `implements Proxy` from `WebsocketProxy`. `SimpleServer.main` drops the TCP proxy thread and starts only `new WebsocketProxy().start(ServerContains.port)` (no `+1`).
4. **Delete old listener package contents:** `ServerEventListener.java` + all 14 `ServerEventListener_CODE_*.java` files. Phase 02b will re-create handlers in the new style.
5. **Create records package.** Under `com.miti99.caro.server.event.request`, create the sealed interface `ClientRequest` and all 14 record classes per design above.
6. **Create `RequestConverter.java`** in `com.miti99.caro.server.event` with the exhaustive switch.
7. **Create `RequestDispatcher.java`** in `com.miti99.caro.server.event` with heartbeat no-op + `UnsupportedOperationException` stubs for all other cases.
8. **Rewrite `ChannelUtils.java`:** single static method `push(Channel channel, Response response)` that writes `new BinaryWebSocketFrame(Unpooled.wrappedBuffer(response.toByteArray()))`.
9. **Rewrite `WebsocketTransferHandler.java`:**
   - Extend `SimpleChannelInboundHandler<BinaryWebSocketFrame>`.
   - `channelRead0`:
     ```java
     byte[] bytes = ByteBufUtil.getBytes(frame.content());
     Request raw;
     try { raw = Request.parseFrom(bytes); }
     catch (InvalidProtocolBufferException e) {
       SimplePrinter.serverLog("WARN malformed request: " + e.getMessage());
       return;
     }
     ClientRequest req = RequestConverter.convert(raw);
     ClientSide client = ServerContains.CLIENT_SIDE_MAP.get(getId(ctx.channel()));
     if (!(req instanceof HeartbeatRequestRecord)) {
       SimplePrinter.serverLog(client.getId() + " | " + client.getNickname() + " do: " + req.getClass().getSimpleName());
     }
     RequestDispatcher.dispatch(client, req);
     ```
   - `userEventTriggered` `HandshakeComplete` block: unchanged state setup; the 2s-delayed thread now emits two typed `Response` messages:
     ```java
     ChannelUtils.push(ch, Response.newBuilder()
         .setClientConnect(ClientConnectResponse.newBuilder().setClientId(clientSide.getId()))
         .build());
     ChannelUtils.push(ch, Response.newBuilder()
         .setNicknameSet(NicknameSetResponse.newBuilder().setInvalidLength(0))
         .build());
     ```
     (`invalid_length=0` is the "prompt" sentinel — documented in Phase 04 client decode.)
   - `clientOfflineEvent` becomes a log-only TODO for 02a; wired up to `ClientOfflineHandler` in 02b.
10. **Compile + test:** `./gradlew -p server clean build`. Must be green.
11. **Boot smoke:** `./gradlew -p server run` (or execute jar). Server logs "websocket server was successfully started on port 1999".
12. **Single commit** with Phase 01 + Phase 02a changes: `refactor(server): typed protobuf wire + sealed record dispatcher scaffolding`.

## Todo List
- [ ] `ServerContains.port = 1999`
- [ ] `SimpleServer` starts only `WebsocketProxy`
- [ ] `RoomClearTask` migrated into `WebsocketProxy.start()`
- [ ] Delete `ProtobufProxy`, `Proxy`, `ProtobufTransferHandler`, `SecondProtobufCodec`
- [ ] Delete `ServerEventListener` + all 14 `ServerEventListener_CODE_*.java`
- [ ] Create sealed `ClientRequest` + 14 record classes
- [ ] Create `RequestConverter`
- [ ] Create `RequestDispatcher` (heartbeat no-op + others throw)
- [ ] Rewrite `ChannelUtils.push(Channel, Response)`
- [ ] Rewrite `WebsocketTransferHandler` for BinaryWebSocketFrame
- [ ] HandshakeComplete emits typed `CLIENT_CONNECT` + `NICKNAME_SET` prompt
- [ ] `./gradlew -p server clean build` green (37/37 unit tests)
- [ ] Commit (jointly with Phase 01): `refactor(server): typed protobuf wire + sealed record dispatcher scaffolding`

## Success Criteria
- Zero references in `server/src` to `TextWebSocketFrame`, `ProtobufProxy`, `ProtobufTransferHandler`, `SecondProtobufCodec`, `implements Proxy`, `ServerEventListener`.
- `grep -r "com.miti99.caro.common.entity.Client\|ServerTransferData" server/src` returns nothing.
- `grep -r "Class.forName" server/src` returns nothing (reflection lookup dead).
- `./gradlew -p server clean build` green.
- Server boots on port 1999 and logs startup message.
- Any non-heartbeat inbound message is logged and causes `UnsupportedOperationException` (intentional — sanity check).

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `RoomClearTask` scheduling lost during move | Medium | High (stale rooms pile up) | Explicit todo + verify log on boot |
| 02a + 02b split across a deployment | Low (personal project) | High (outbound traffic broken between commits) | Documented: DO NOT deploy 02a without 02b |
| `ByteBufUtil.getBytes` vs manual copy: leaks ref count | Low | Medium | Use `ByteBufUtil.getBytes(buf)` which copies without retain |
| Sealed switch missing `PAYLOAD_NOT_SET` makes compile fail | Low | Low | Explicitly handle it in `RequestConverter` |
| Protobuf plugin caches stale output after package rename | Low | Low | `clean` before `build` |
| IntelliJ red highlights despite gradle build green | Medium | Low (DX) | Gradle reimport |
| Heartbeat record is `HeartbeatRequestRecord()` (empty) — Java record with zero components is legal from JDK 14+, confirm target | Low | Low | Project already uses records (`GameMove` might not — check build.gradle `sourceCompatibility`). Caro server uses Java 17+ based on sealed interface support. |
| Missing `exceptionCaught` handling for non-IO errors now that dispatcher throws | High | Medium | Keep existing try/catch in `channelRead0` logging exceptions; do NOT close channel on dispatcher throw (the server operator wants loud errors but channel stays open for heartbeat) |

## Security Considerations
- Binary frame parse: `Request.parseFrom(bytes)` on untrusted input can throw `InvalidProtocolBufferException` — caught, logged, discarded. Cannot execute code.
- `HttpObjectAggregator(8192)` limit unchanged; typed proto is smaller than JSON so no bump needed.
- Dispatcher throw on unhandled cases is fine (caught by `channelRead0` try/catch).

## Next Steps
- **Phase 02b:** replace each `UnsupportedOperationException` in the dispatcher with a real handler call. Re-implement the 14 business-logic classes as `<Verb>Handler` using git history of the deleted files as reference.
