# Phase 01 — Proto Schemas & Gradle Build Plumbing

## Context Links
- [plan.md](plan.md)
- `server/build.gradle.kts`
- `server/src/main/resources/proto/ClientTransferDataProtoc.proto` (to delete)
- `server/src/main/resources/proto/ServerTransferDataProtoc.proto` (to delete)
- `server/src/main/resources/proto/generate.sh` (to delete)
- `server/src/main/java/com/miti99/caro/common/entity/ClientTransferData.java` (to delete)
- `server/src/main/java/com/miti99/caro/common/entity/ServerTransferData.java` (to delete)
- `server/src/main/java/com/miti99/caro/common/enums/ServerEventCode.java` (reference for request schema audit)
- `server/src/main/java/com/miti99/caro/common/enums/ClientEventCode.java` (reference for response schema audit)

## Overview
- **Priority:** P2 (blocker for all later phases)
- **Status:** pending
- Author the typed `request.proto` and `response.proto` schemas based on the audit in `plan.md`. Stand up the Gradle `com.google.protobuf` plugin so Java classes are generated at build time. Delete the hand-committed generated files, the old envelope-only `.proto` files, and the manual `generate.sh`.

## Key Insights
- `common.proto` is NOT created. Audit found no field genuinely shared across both request and response directions (only `GameMove` row/col, which is 2 `int32` fields — cheaper inline than a shared type + import). YAGNI.
- Plugin v0.9.6 default source path: `src/main/proto/`. No sourceSet override needed.
- Generated package lives in `com.miti99.caro.protocol` (new fresh package — do NOT reuse `common.entity` which was the old envelope home). Call sites that used `ClientTransferData.ClientTransferDataProtoc` disappear entirely in phase 02a/02b — those classes are deleted in this phase.
- `protoc` artifact `com.google.protobuf:protoc:3.25.5` is CI-safe (no host protoc).
- `java_package` in each `.proto` anchors the FQCN; `java_multiple_files = true` means each top-level message becomes its own `.java` file, nicer imports.

## Requirements
**Functional**
- `./gradlew -p server compileJava` generates typed classes under `build/generated/sources/proto/main/java/com/miti99/caro/protocol/`.
- Stubbed `WebsocketTransferHandler` (unchanged from today) still compiles — we keep the old handler + old `ChannelUtils` + old listeners compiling via the DELETED envelope types replaced by a temporary no-op? NO — instead, this phase does ONLY proto authoring + plugin wiring. The old generated envelope Java files stay deleted at the end of phase, but the old string-based handler code is still present and must compile. To bridge: **keep this phase isolated to proto+plugin+deletion of the two old generated Java files, but also replace those two imports in the minimum call sites with a 2-line throwaway stub type** — rejected: too hacky. Instead: **this phase DOES NOT compile on its own** — compile verification happens at phase 02a. Phase 01 is a commit that intentionally leaves the build broken and is followed immediately by 02a. That violates "each phase leaves build green". Resolved: **merge phase 01 + 02a into one commit**. See Phase 02a for the unified commit; phase 01 is the planning sub-stage (proto authoring + plugin wiring), phase 02a is the compiling sub-stage (dispatcher scaffolding).

  → **Action:** keep phase 01 and 02a as separate plan files for clarity, but both are committed together as a single commit at end of 02a. The commit message covers both. Phase 01's success criteria drops "build green" and adds "proto files generate when build attempted at end of 02a".

**Non-functional**
- No new committed generated Java.
- Proto files authored in a style consistent with google's style guide (snake_case fields, `CamelCase` messages).
- Each message has an obvious 1:1 mapping to an audit row in `plan.md`.

## Architecture
```
server/src/main/proto/
  request.proto     // oneof payload: HeartbeatRequest | SetNicknameRequest | ... | ClientExitRequest
  response.proto    // oneof payload: ClientConnectResponse | NicknameSetResponse | ... | ClientExitResponse
build.gradle.kts
  plugins { id("com.google.protobuf") version "0.9.6" }
  protobuf { protoc { artifact = "com.google.protobuf:protoc:3.25.5" } }
  -> generates build/generated/sources/proto/main/java/com/miti99/caro/protocol/{Request,Response,HeartbeatRequest,...}.java
```

`request.proto` skeleton:
```proto
syntax = "proto3";
package miti99.caro.protocol;
option java_package = "com.miti99.caro.protocol";
option java_multiple_files = true;

message Request {
  oneof payload {
    HeartbeatRequest heartbeat = 1;
    SetNicknameRequest set_nickname = 2;
    SetClientInfoRequest set_client_info = 3;
    CreateRoomRequest create_room = 4;
    CreatePveRoomRequest create_pve_room = 5;
    GetRoomsRequest get_rooms = 6;
    JoinRoomRequest join_room = 7;
    GameStartingRequest game_starting = 8;
    GameReadyRequest game_ready = 9;
    GameMoveRequest game_move = 10;
    GameResetRequest game_reset = 11;
    WatchGameRequest watch_game = 12;
    WatchGameExitRequest watch_game_exit = 13;
    ClientExitRequest client_exit = 14;
  }
}

message HeartbeatRequest {}
message SetNicknameRequest { string nickname = 1; }
message SetClientInfoRequest { string version = 1; }
message CreateRoomRequest {}
message CreatePveRoomRequest { int32 difficulty = 1; }
message GetRoomsRequest {}
message JoinRoomRequest { int32 room_id = 1; }
message GameStartingRequest {}
message GameReadyRequest {}
message GameMoveRequest { int32 row = 1; int32 col = 2; }
message GameResetRequest {}
message WatchGameRequest { int32 room_id = 1; }
message WatchGameExitRequest {}
message ClientExitRequest {}
```

`response.proto` skeleton:
```proto
syntax = "proto3";
package miti99.caro.protocol;
option java_package = "com.miti99.caro.protocol";
option java_multiple_files = true;

message Response {
  oneof payload {
    ClientConnectResponse client_connect = 1;
    NicknameSetResponse nickname_set = 2;
    ShowOptionsResponse show_options = 3;
    ShowRoomsResponse show_rooms = 4;
    RoomCreateSuccessResponse room_create_success = 5;
    RoomJoinSuccessResponse room_join_success = 6;
    RoomJoinFailFullResponse room_join_fail_full = 7;
    RoomJoinFailNotFoundResponse room_join_fail_not_found = 8;
    RoomPlayFailNotFoundResponse room_play_fail_not_found = 9;
    GameStartingResponse game_starting = 10;
    GameReadyResponse game_ready = 11;
    GameMoveSuccessResponse game_move_success = 12;
    GameMoveInvalidResponse game_move_invalid = 13;
    GameMoveOccupiedResponse game_move_occupied = 14;
    GameMoveOutOfBoundsResponse game_move_out_of_bounds = 15;
    GameMoveNotYourTurnResponse game_move_not_your_turn = 16;
    GameOverResponse game_over = 17;
    PveDifficultyNotSupportResponse pve_difficulty_not_support = 18;
    WatchGameSuccessResponse watch_game_success = 19;
    ClientExitResponse client_exit = 20;
  }
}

message ClientConnectResponse { int32 client_id = 1; }
message NicknameSetResponse { int32 invalid_length = 1; }  // 0 = prompt-only
message ShowOptionsResponse {}
message RoomSummary {
  int32 room_id = 1;
  string room_owner = 2;
  int32 room_client_count = 3;
  string room_type = 4;
}
message ShowRoomsResponse { repeated RoomSummary rooms = 1; }
message RoomCreateSuccessResponse { int32 id = 1; string room_owner = 2; string room_type = 3; }
message RoomJoinSuccessResponse {
  int32 client_id = 1;
  string client_nickname = 2;
  int32 room_id = 3;
  string room_owner = 4;
  int32 room_client_count = 5;
}
message RoomJoinFailFullResponse { int32 room_id = 1; string room_owner = 2; }
message RoomJoinFailNotFoundResponse { int32 room_id = 1; }
message RoomPlayFailNotFoundResponse {}
message GameStartingResponse {
  int32 room_id = 1;
  int32 black_player_id = 2;
  string black_player_nickname = 3;
  int32 white_player_id = 4;
  string white_player_nickname = 5;
  int32 board_size = 6;
}
message GameReadyResponse {
  string client_nickname = 1;
  string status = 2;
  int32 client_id = 3;
}
message GameMoveSuccessResponse {
  int32 row = 1;
  int32 col = 2;
  string piece = 3;
  string player_nickname = 4;
  int32 player_id = 5;
}
message GameMoveInvalidResponse {}
message GameMoveOccupiedResponse {}
message GameMoveOutOfBoundsResponse {}
message GameMoveNotYourTurnResponse {}
message GameOverResponse { string result = 1; string winner_nickname = 2; }
message PveDifficultyNotSupportResponse {}
message WatchGameSuccessResponse { string owner = 1; string status = 2; }
message ClientExitResponse {
  int32 room_id = 1;
  int32 exit_client_id = 2;
  string exit_client_nickname = 3;
}
```

## Related Code Files
**Modify**
- `server/build.gradle.kts` — add protobuf plugin + `protobuf{}` block.

**Create**
- `server/src/main/proto/request.proto`
- `server/src/main/proto/response.proto`

**Delete**
- `server/src/main/resources/proto/ClientTransferDataProtoc.proto`
- `server/src/main/resources/proto/ServerTransferDataProtoc.proto`
- `server/src/main/resources/proto/generate.sh`
- `server/src/main/java/com/miti99/caro/common/entity/ClientTransferData.java`
- `server/src/main/java/com/miti99/caro/common/entity/ServerTransferData.java`

## Implementation Steps
1. Create `server/src/main/proto/request.proto` per skeleton above.
2. Create `server/src/main/proto/response.proto` per skeleton above.
3. Edit `server/build.gradle.kts`:
   - Add `id("com.google.protobuf") version "0.9.6"` to `plugins {}`.
   - Bump `com.gradleup.shadow` plugin **8.3.5 → 8.3.8** (maintenance release).
   - Add top-level block:
     ```kotlin
     protobuf {
       protoc { artifact = "com.google.protobuf:protoc:3.25.5" }
     }
     ```
   - Keep `implementation("com.google.protobuf:protobuf-java:3.25.5")`.
   - Bump `io.netty:netty-all` **4.1.115.Final → 4.1.128.Final** (+13 releases, security patches; low risk).
   - Bump `org.junit:junit-bom` platform **5.11.3 → 5.11.4** (patch release).
   - Keep gradle wrapper at 9.2.1 (already ≥ pre-2026 latest).
4. `git rm` the five to-delete files listed above.
5. Do NOT attempt `./gradlew -p server compileJava` yet — Phase 02a provides the call-site migration that makes the build green again. This phase's work is continued into 02a as one unified commit.

## Todo List
- [ ] Author `request.proto` with full oneof + typed messages
- [ ] Author `response.proto` with full oneof + typed messages
- [ ] Add protobuf plugin + `protobuf {}` block to `build.gradle.kts`
- [ ] Bump `shadow` plugin 8.3.5 → 8.3.8
- [ ] Bump `netty-all` 4.1.115.Final → 4.1.128.Final
- [ ] Bump `junit-bom` 5.11.3 → 5.11.4
- [ ] `git rm` old `.proto` files + `generate.sh`
- [ ] `git rm` hand-committed `ClientTransferData.java` + `ServerTransferData.java`
- [ ] (Build verification happens at end of Phase 02a — shared commit)

## Success Criteria
- `ls server/src/main/proto/` → `request.proto`, `response.proto` only.
- `ls server/src/main/resources/proto/` → directory empty or gone.
- `find server/src/main/java/com/miti99/caro/common/entity -name "ClientTransferData.java" -o -name "ServerTransferData.java"` returns nothing.
- `build.gradle.kts` contains `com.google.protobuf` plugin id.

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Proto field name collision with generated Java accessor (e.g. `class`) | Low | Medium | Audit names: nothing reserved used |
| `java_multiple_files = true` output path differs from expectation | Low | Low | Verified at end of 02a when build runs |
| IntelliJ doesn't pick up generated sources until reimport | Medium | Low (DX) | `./gradlew idea` or gradle reimport |
| Package rename `common.entity` → `protocol` leaves dangling imports | High | High in isolation; mitigated by unified commit with 02a | ALL migrations handled in 02a |

## Security Considerations
- None. Pure schema authoring.

## Next Steps
- Phase 02a uses the generated classes immediately: creates the sealed `ClientRequest` hierarchy + `RequestDispatcher` + rewrites the WS pipeline. **Phases 01 + 02a ship as ONE git commit** because Phase 01 alone leaves the build broken.
