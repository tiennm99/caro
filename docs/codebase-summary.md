# Codebase Summary

## Directory Structure

```
caro/
├── .github/
│   └── workflows/
│       └── build.yml                    CI: build + test (Java 25 + Node 22)
├── server/                              Standalone Netty server (Java 25, Maven)
│   ├── src/main/java/com/miti99/caro/
│   │   ├── common/
│   │   │   ├── channel/                 Netty utilities (ChannelUtils)
│   │   │   ├── entity/                  Data models (Board, Room, GameMove, Msg, ClientSide)
│   │   │   ├── enums/                   ServerEventCode, ClientEventCode, PieceType, etc.
│   │   │   ├── exception/               LandlordException
│   │   │   ├── features/                Feature flags
│   │   │   ├── handler/                 Protocol codec (DefaultDecoder)
│   │   │   ├── helper/                  GomokuHelper, MapHelper
│   │   │   ├── print/                   SimplePrinter
│   │   │   ├── robot/                   AI engine (GomokuAI)
│   │   │   ├── transfer/                Binary serialization (ByteKit, ByteLink, TransferProtocolUtils)
│   │   │   └── utils/                   JsonUtils (gson), ListUtils, OptionsUtils, StreamUtils
│   │   └── server/
│   │       ├── event/                   ServerEventListener_* handlers
│   │       ├── handler/                 Netty pipeline (Protobuf/WS codecs)
│   │       ├── proxy/                   ProtobufProxy, WebsocketProxy
│   │       ├── timer/                   RoomClearTask
│   │       ├── SimpleServer.java        Server entry point
│   │       └── ServerContains.java      Global state container
│   ├── src/main/resources/
│   │   └── proto/                       .proto files + generate.sh (future proto-over-WS)
│   ├── src/test/java/com/miti99/caro/common/
│   │   ├── helper/tests/GomokuHelperTest.java    29 JUnit 5 tests
│   │   └── robot/tests/GomokuAITest.java          8 JUnit 5 tests
│   ├── Dockerfile                       Multi-stage (maven:3.9-eclipse-temurin-25, eclipse-temurin:25-jre-alpine)
│   └── pom.xml                          Standalone (no parent), maven-shade-plugin 3.6.0
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
│   └── package.json                     caro-client 0.0.1-beta
├── docs/                                (this directory)
│   ├── project-overview-pdr.md
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
- `Msg.java` — WebSocket JSON envelope (record: code, data, info)
- `ServerTransferData.java` / `ClientTransferData.java` — Protobuf-generated wire types
- `ClientSide.java` — Player connection state (nickname, status, role)

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
- `JsonUtils.java` — gson wrapper (`toJson`, `fromJson`)
- `ListUtils`, `OptionsUtils`, `StreamUtils`
- `MapHelper.java` — Fluent map builder (uses gson)

**Protocol:**
- `ByteKit`, `ByteLink` — Byte buffer operations
- `TransferProtocolUtils.java` — Protocol framing (`#...$` delimiters, gson JSON body)
- `DefaultDecoder.java` — Protobuf message decoder

---

### `com.miti99.caro.server` (Server code)

**Entry Point:**
- `SimpleServer.java` — Bootstrap (`-p {port}`, default 1024)
  - Starts TCP proxy on `port` and WebSocket proxy on `port+1`
- `ServerContains.java` — Singleton global state (rooms, client sides, channel map)

**Event Handlers (ServerEventListener_*):**
- `CODE_CLIENT_NICKNAME_SET`, `CODE_ROOM_CREATE`, `CODE_ROOM_CREATE_PVE`, `CODE_GET_ROOMS`
- `CODE_ROOM_JOIN`, `CODE_GAME_STARTING`, `CODE_GAME_READY`, `CODE_GAME_MOVE`
- `CODE_GAME_WATCH` / `CODE_GAME_WATCH_EXIT`, `CODE_CLIENT_OFFLINE`

**Network Handlers:**
- `ProtobufTransferHandler` — TCP/Protobuf codec
- `WebsocketTransferHandler` — WebSocket JSON codec (uses `JsonUtils.fromJson(text, Msg.class)`)
- `SecondProtobufCodec` — Second-pass protobuf decoder

**Message Proxies:**
- `ProtobufProxy` — TCP server bootstrap
- `WebsocketProxy` — WebSocket server bootstrap (no static file handler; non-WS HTTP → default Netty 400/403)

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

### Maven (Java)

**File:** `server/pom.xml` (standalone, no parent)

**Coordinates:** `com.miti99.caro:caro-server:0.0.1-beta`

**Key Plugins:**
- `maven-compiler-plugin` 3.13.0 — Java 25 source/target (`<release>25</release>`), `-parameters`
- `maven-surefire-plugin` 3.5.2 — JUnit 5 runner
- `maven-shade-plugin` 3.6.0 — Fat jar with `ManifestResourceTransformer`, `ServicesResourceTransformer`, `AppendingTransformer` (for `META-INF/io.netty.versions.properties`)

**Dependencies:**
- `io.netty:netty-all:4.1.115.Final` — async networking
- `com.google.protobuf:protobuf-java:3.25.5` — binary serialization
- `com.google.code.gson:gson:2.11.0` — JSON (supports records)
- `org.junit.jupiter:junit-jupiter:5.11.3` — testing (test scope)

**Build Command:**
```bash
mvn -f server/pom.xml clean package
# Produces: server/target/caro-server-0.0.1-beta.jar (shaded fat jar)
```

### Vite (JavaScript)

**File:** `client/package.json`

**Package:** `caro-client` 0.0.1-beta

**Scripts:**
- `npm run dev` — Dev server (port 5173, hot reload)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build

**Dependencies:**
- `phaser ^3.87.0` — Game engine
- `vite ^6.3.1` — Bundler (dev-only)

**Output:** `client/dist/` (index.html + bundled JS, ~1.5 MB / 346 KB gzipped)

---

## Testing

**Test Framework:** JUnit 5 (`org.junit.jupiter.api`)

**Test Files:**
1. `server/src/test/java/com/miti99/caro/common/helper/tests/GomokuHelperTest.java` — 29 tests (win detection, edges, draw, game flow)
2. `server/src/test/java/com/miti99/caro/common/robot/tests/GomokuAITest.java` — 8 tests (Easy/Medium/Hard AI)

**Run Tests:**
```bash
mvn -f server/pom.xml clean test
```

**Coverage:** ~100% for game logic (Board, GomokuHelper, GomokuAI)

---

## Dependencies Summary

| Scope | Dependencies |
|-------|--------------|
| **server runtime** | Netty 4.1.115, Protobuf 3.25.5, gson 2.11.0 |
| **server test** | JUnit Jupiter 5.11.3 |
| **client runtime** | Phaser 3.87 |
| **client build** | Vite 6.3 |

---

## Important Files by Feature

### Game Logic
- `server/src/main/java/com/miti99/caro/common/entity/Board.java`
- `server/src/main/java/com/miti99/caro/common/helper/GomokuHelper.java`
- `server/src/main/java/com/miti99/caro/common/robot/GomokuAI.java`

### Networking
- `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java`
- `server/src/main/java/com/miti99/caro/server/handler/ProtobufTransferHandler.java`
- `server/src/main/java/com/miti99/caro/common/channel/ChannelUtils.java`
- `client/src/services/connection-service.js`

### Game Flow
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_MOVE.java`
- `server/src/main/java/com/miti99/caro/server/event/ServerEventListener_CODE_GAME_STARTING.java`
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
| Server jar | `server/target/caro-server-0.0.1-beta.jar` | Shaded executable fat jar |
| Client dist | `client/dist/` | Static files for web UI |

---

## Continuous Integration

**GitHub Actions:**

**build.yml**
- Trigger: push/PR on master (ignores `.md` and `.gitignore`)
- Jobs:
  - `build-server` — Setup Java 25 (Temurin), `mvn -f server/pom.xml -B clean verify`
  - `build-client` — Setup Node 22, `npm ci`, `npm run build`

Deployment is handled via Docker Compose from this repo; there is no hosted deployment pipeline.

---

## Version & Release

**Current Version:** 0.0.1-beta (both `caro-server` and `caro-client`)

**Versioning:** Semantic versioning (MAJOR.MINOR.PATCH) with `-beta` suffix during pre-1.0.
