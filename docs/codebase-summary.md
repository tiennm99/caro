# Codebase Summary

## Directory Structure

```
caro/
├── .github/
│   └── workflows/
│       └── build.yml                    CI: build + test (Java 25 + Node 22)
├── server/                              Standalone Netty server (Java 25, Gradle)
│   ├── src/main/java/com/miti99/caro/
│   │   ├── common/
│   │   │   ├── channel/                 Netty utilities (ChannelUtils)
│   │   │   ├── entity/                  Data models (Board, Room, GameMove, ClientSide)
│   │   │   ├── enums/                   ClientEventCode, PieceType, GameResult, RoomType, etc.
│   │   │   ├── exception/               LandlordException
│   │   │   ├── features/                Feature flags
│   │   │   ├── helper/                  GomokuHelper (win detection)
│   │   │   ├── print/                   SimplePrinter
│   │   │   ├── robot/                   AI engine (GomokuAI)
│   │   │   └── utils/                   ListUtils, OptionsUtils, StreamUtils
│   │   └── server/
│   │       ├── event/
│   │       │   ├── request/             ClientRequest sealed interface + record variants (14 types)
│   │       │   ├── handler/             14 typed request handlers (*Handler.java)
│   │       │   ├── RequestConverter.java Protobuf→ClientRequest conversion
│   │       │   └── RequestDispatcher.java Pattern-match dispatch logic
│   │       ├── handler/                 Netty pipeline (WebsocketTransferHandler)
│   │       ├── timer/                   RoomClearTask
│   │       ├── SimpleServer.java        Server entry point
│   │       └── ServerContains.java      Global state container
│   ├── src/main/proto/
│   │   ├── request.proto                Client→server typed message definitions
│   │   └── response.proto               Server→client typed message definitions
│   ├── src/test/java/com/miti99/caro/common/
│   │   ├── helper/tests/GomokuHelperTest.java    29 JUnit 5 tests
│   │   └── robot/tests/GomokuAITest.java          8 JUnit 5 tests
│   ├── gradle/wrapper/                  Gradle wrapper (9.2.1)
│   ├── gradlew, gradlew.bat             Wrapper launchers
│   ├── settings.gradle.kts              Root project name
│   ├── build.gradle.kts                 Standalone build (Kotlin DSL) with Shadow plugin
│   └── Dockerfile                       Multi-stage (eclipse-temurin:25-jdk, eclipse-temurin:25-jre-alpine)
├── client/                              Phaser 3 + Vite client
│   ├── src/
│   │   ├── main.js                      Phaser boot
│   │   ├── config/
│   │   │   ├── game-config.js           Phaser configuration
│   │   │   └── protocol-constants.js    Event code enums
│   │   ├── scenes/
│   │   │   ├── boot-scene.js            Initialize, connect to server
│   │   │   ├── menu-scene.js            Menus (overlay DOM)
│   │   │   └── game-scene.js            Main gameplay scene
│   │   ├── services/
│   │   │   ├── event-bus.js             Pub/sub event dispatcher
│   │   │   ├── connection-service.js    WebSocket client
│   │   │   └── game-state-service.js    Client-side state
│   │   ├── objects/
│   │   │   ├── board.js                 Game board renderer
│   │   │   └── stone.js                 Individual stone sprite
│   │   └── ui/
│   │       ├── menu-ui.js               Menu components
│   │       └── game-ui.js               Game HUD & notifications
│   ├── Dockerfile                       Nginx-based static server
│   ├── index.html
│   ├── vite.config.js
│   └── package.json                     caro-client 0.0.1
├── docs/                                (this directory)
│   ├── project-overview.md
│   ├── system-architecture.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   └── deployment-guide.md
├── plans/                               Implementation plans
├── docker-compose.yml                   services: server, client
├── README.md
├── LICENSE
└── .gitignore
```

---

## Key Java Packages

### `com.miti99.caro.common` (Shared code)

**Entities:**
- `Board.java` — 15x15 game board, move validation, win/draw detection (`BOARD_SIZE=15`, `WIN_CONDITION=5`)
- `Room.java` — Game session state (id, type, status, players, board, moveHistory)
- `GameMove.java` — Single move (row, col, piece, playerId, timestamp)
- `ClientSide.java` — Player connection state (nickname, status, role)
- Generated proto messages — `Request`, `Response` oneof wrappers (in `server/build/generated/sources/proto/main/java/`)

**Enums:**
- `ServerEventCode` — client→server action codes
- `ClientEventCode` — server→client response codes
- `PieceType` — EMPTY, BLACK, WHITE
- `GameResult` — IN_PROGRESS, BLACK_WIN, WHITE_WIN, DRAW
- `RoomType`, `RoomStatus`, `ClientRole`, `ClientStatus`

**Game Logic:**
- `GomokuHelper.java` — Win detection (4 directions), board rendering
- `GomokuAI.java` — AI move selection (Easy/Medium/Hard)

**Utilities:**
- `ListUtils`, `OptionsUtils`, `StreamUtils`

**Dispatch (typed records):**
- `ClientRequest` — Sealed interface representing all possible client requests (14 variants)
- Record types: `SetNicknameRequest`, `CreateRoomRequest`, `CreatePveRoomRequest`, `GetRoomsRequest`, `JoinRoomRequest`, `GameStartingRequest`, `GameReadyRequest`, `GameMoveRequest`, `GameResetRequest`, `WatchGameRequest`, `WatchGameExitRequest`, `ClientExitRequest`, `ClientOfflineRequest`, `SetClientInfoRequest`

---

### `com.miti99.caro.server` (Server code)

**Entry Point:**
- `SimpleServer.java` — Bootstrap (WebSocket server defaults to port 1999 at `/ratel`)
- `ServerContains.java` — Singleton global state (rooms, client sides, channel map)

**Event Handlers (14 *Handler classes):**
- `SetNicknameHandler`, `CreateRoomHandler`, `CreatePveRoomHandler`, `GetRoomsHandler`, `JoinRoomHandler`
- `GameStartingHandler`, `GameReadyHandler`, `GameMoveHandler`, `GameResetHandler`
- `WatchGameHandler`, `WatchGameExitHandler`, `ClientExitHandler`, `ClientOfflineHandler`, `SetClientInfoHandler`

**Request Processing:**
- `RequestConverter` — Decodes `Request` oneof from binary wire format → typed `ClientRequest` variant
- `RequestDispatcher` — Pattern-matches `ClientRequest` variant → dispatches to corresponding handler

**Network Handler:**
- `WebsocketTransferHandler` — Netty pipeline handler: decodes binary frame to `Request` protobuf message

**Background Tasks:**
- `RoomClearTask` — Periodic cleanup

---

## Client (JavaScript/Phaser 3)

**Boot:**
- `main.js` — Create Phaser game instance, start boot scene

**Config:**
- `game-config.js` — Phaser config (800x800, Scale.FIT, scenes: [BootScene, MenuScene, GameScene])
- `protocol-constants.js` — Export event code enums matching server

**Scenes:**
- `BootScene` — Create services, connect WebSocket, load assets, transition to menu
- `MenuScene` — Nickname input, lobby, room list, difficulty selector
- `GameScene` — Board + stones, click handling, move history, turn indicator, game over

**Services:**
- `EventBus` — Pub/sub decoupling scenes and services
- `ConnectionService` — WebSocket client with heartbeat + auto-reconnect
- `GameStateService` — Client-side state container

**Game Objects:**
- `Board` — 15x15 wood-textured grid
- `Stone` — Gradient stone sprite with drop animation

**UI:**
- `MenuUI` — Nickname form, room list, settings
- `GameUI` — HUD, move history, game over modal, toasts

---

## Build Configuration

### Gradle (Java)

**Files:**
- `server/build.gradle.kts` — standalone Gradle build script (Kotlin DSL)
- `server/settings.gradle.kts` — root project name (`caro-server`)
- `server/gradle/wrapper/` — committed wrapper (Gradle 9.2.1)
- `server/gradlew` / `server/gradlew.bat` — wrapper launchers

**Coordinates:** `com.miti99.caro:caro-server:0.0.1`

**Plugins:**
- `java` — standard Java plugin
- `com.google.protobuf:0.9.6` — protobuf code generation
- `com.gradleup.shadow:8.3.8` — fat jar packaging

**Toolchain:** `JavaLanguageVersion.of(25)` — Gradle auto-provisions Java 25 if missing.

**Dependencies:**
- `io.netty:netty-all:4.1.128.Final` — async networking
- `com.google.protobuf:protobuf-java:3.25.5` — binary serialization, generated code
- `com.google.protobuf:protoc:3.25.5` — protobuf compiler (build time)
- `org.junit:junit-bom:5.11.4` (platform) + `org.junit.jupiter:junit-jupiter` — testing

**Shadow jar config:**
- Main class: `com.miti99.caro.server.SimpleServer`
- No special command-line args (server defaults to port 1999)
- `mergeServiceFiles()` — preserve Netty SPIs
- Excludes signing metadata (`*.SF`, `*.DSA`, `*.RSA`)

**Build Command:**
```bash
./server/gradlew -p server clean build
# Produces: server/build/libs/caro-server-0.0.1.jar (shaded fat jar)
```

### Vite (JavaScript)

**File:** `client/package.json`

**Package:** `caro-client` 0.0.1

**Scripts:**
- `npm run dev` — Dev server (port 5173, hot reload)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
- `npm run proto:gen` — Regenerate protobuf code from server `.proto` files (uses `pbjs` + `pbts`)

**Dependencies:**
- `phaser ^3.87.0` — Game engine
- `protobufjs ^7.5.4` — JavaScript protobuf codec
- `vite ^6.3.1` — Bundler (dev-only)
- `@protobufjs/cli ^1.1.3` — Protobuf code generator (dev-only)

**Output:** `client/dist/` (index.html + bundled JS, ~1.5 MB / 346 KB gzipped)

---

## Testing

**Test Framework:** JUnit 5 (`org.junit.jupiter.api`)

**Test Files:**
1. `server/src/test/java/com/miti99/caro/common/helper/tests/GomokuHelperTest.java` — 29 tests (win detection, edges, draw, game flow)
2. `server/src/test/java/com/miti99/caro/common/robot/tests/GomokuAITest.java` — 8 tests (Easy/Medium/Hard AI)

**Run Tests:**
```bash
./server/gradlew -p server clean test
```

**Coverage:** ~100% for game logic (Board, GomokuHelper, GomokuAI)

---

## Dependencies Summary

| Scope | Dependencies |
|-------|--------------|
| **server runtime** | Netty 4.1.128, Protobuf 3.25.5 (generated code) |
| **server test** | JUnit Jupiter 5.11.4 |
| **server build** | Gradle 9.2.1, Protobuf Gradle plugin 0.9.6, Shadow 8.3.8 |
| **client runtime** | Phaser 3.87, protobufjs 7.5.4 |
| **client build** | Vite 6.3, protobufjs-cli 1.1.3 |

---

## Important Files by Feature

### Game Logic
- `server/src/main/java/com/miti99/caro/common/entity/Board.java`
- `server/src/main/java/com/miti99/caro/common/helper/GomokuHelper.java`
- `server/src/main/java/com/miti99/caro/common/robot/GomokuAI.java`

### Networking
- `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java` — Binary decoder
- `server/src/main/java/com/miti99/caro/server/event/RequestConverter.java` — Protobuf→record conversion
- `server/src/main/java/com/miti99/caro/server/event/RequestDispatcher.java` — Dispatch logic
- `server/src/main/java/com/miti99/caro/common/channel/ChannelUtils.java` — Response encoder/sender
- `client/src/services/connection-service.js` — WebSocket client (binary mode)
- `server/src/main/proto/*.proto` — Message definitions

### Game Flow
- `server/src/main/java/com/miti99/caro/server/event/handler/GameMoveHandler.java`
- `server/src/main/java/com/miti99/caro/server/event/handler/GameStartingHandler.java`
- `client/src/scenes/game-scene.js`

### UI
- `client/src/objects/board.js`
- `client/src/ui/game-ui.js`
- `client/src/ui/menu-ui.js`

---

## Code Quality

**Metrics:**
- **Lines of Code:** ~5,000 Java, ~1,500 JavaScript
- **Test Coverage:** Game logic ~100%, server flow ~80%, client varies
- **File Size:** Most Java files < 200 lines, JavaScript < 300 lines

**Java 25 features in use:**
- `record` for immutable DTOs (`Msg`)
- Switch expressions (`GomokuHelper.getWinnerMessage`, `GomokuAI.getNextMove`)
- `var` for obvious local types

---

## Build Artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| Server jar | `server/build/libs/caro-server-0.0.1.jar` | Shaded executable fat jar |
| Client dist | `client/dist/` | Static files for web UI |

---

## Continuous Integration

**GitHub Actions:**

**build.yml**
- Trigger: push/PR on master (ignores `.md` and `.gitignore`)
- Jobs:
  - `build-server` — Setup Java 25 (Temurin) + `gradle/actions/setup-gradle`, run `./gradlew -p server --no-daemon clean build`
  - `build-client` — Setup Node 22, `npm ci`, `npm run build`

Deployment is handled via Docker Compose from this repo; there is no hosted deployment pipeline.

---

## Version & Release

**Current Version:** 0.0.1 (both `caro-server` and `caro-client`)

**Versioning:** Semantic versioning (MAJOR.MINOR.PATCH).
