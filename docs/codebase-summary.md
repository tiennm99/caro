# Codebase Summary

## Directory Structure

```
caro/
├── .github/
│   └── workflows/
│       ├── build.yml                    CI: build + test
│       └── deploy-pages.yml             CD: deploy web client to GitHub Pages
├── landlords-common/                    Shared Java library (game logic, entities, protocol)
│   ├── src/main/java/org/nico/ratel/landlords/
│   │   ├── channel/                     Netty utilities
│   │   ├── entity/                      Data models (Board, Room, GameMove, etc.)
│   │   ├── enums/                       Type definitions (ServerEventCode, ClientEventCode, etc.)
│   │   ├── exception/                   Custom exceptions
│   │   ├── features/                    Feature flags
│   │   ├── handler/                     Protocol codec (Protobuf decoder)
│   │   ├── helper/                      Game logic & utilities
│   │   ├── print/                       Terminal formatting
│   │   ├── robot/                       AI engine (GomokuAI)
│   │   ├── transfer/                    Binary serialization (ByteKit, ByteLink)
│   │   └── utils/                       General utilities (JSON, List, Options, Time)
│   ├── src/test/java/
│   │   ├── helper/tests/GomokuHelperTest.java
│   │   └── robot/tests/GomokuAITest.java
│   └── pom.xml
├── landlords-server/                    Java Netty server (TCP + WebSocket)
│   ├── src/main/java/org/nico/ratel/landlords/server/
│   │   ├── event/                       ServerEventListener_* handlers
│   │   ├── handler/                     Netty pipeline handlers
│   │   ├── proxy/                       Message sending (ProtobufProxy, WebsocketProxy)
│   │   ├── timer/                       Background tasks (cleanup, heartbeat)
│   │   ├── SimpleServer.java            Server entry point
│   │   ├── ServerContains.java          Global state container
│   │   └── ... (event listeners)
│   ├── src/main/resources/
│   │   └── static/                      Built-in web UI (index.html, CSS, JS, images)
│   ├── src/test/java/                   (if any)
│   └── pom.xml
├── landlords-client/                    Java CLI client
│   ├── src/main/java/org/nico/ratel/landlords/client/
│   │   ├── entity/                      Client-specific entities
│   │   ├── event/                       ClientEventListener_* handlers
│   │   ├── handler/                     Protocol handlers
│   │   ├── proxy/                       Message sending
│   │   └── SimpleClient.java            CLI entry point
│   └── pom.xml
├── web-client/                          Phaser 3 + Vite web client
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
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── dist/                            (build output)
├── docs/                                (this directory)
│   ├── project-overview-pdr.md
│   ├── system-architecture.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   ├── deployment-guide.md
│   └── project-roadmap.md
├── plans/                               (implementation plans)
├── pom.xml                              Maven parent POM
├── README.md
├── LICENSE
└── .gitignore
```

---

## Key Java Modules

### landlords-common (Shared Library)

**Entities:**
- `Board.java` — 15x15 game board, move validation, win/draw detection
  - `BOARD_SIZE = 15`
  - `WIN_CONDITION = 5`
  - Methods: `isValidMove()`, `makeMove()`, `checkWin()`, `reset()`

- `Room.java` — Game session state
  - `id` (UUID), `type` (PVP/PVE), `status` (WAITING/PLAYING/FINISHED)
  - `players` (2), `spectators`, `board`, `moveHistory`

- `GameMove.java` — Single move record
  - `row`, `col`, `piece` (BLACK/WHITE), `timestamp`

- `ServerTransferData.java` — Network message from client
  - `code` (ServerEventCode), `data` (payload), `info` (metadata)

- `ClientTransferData.java` — Network message from server
  - `code` (ClientEventCode), `data`, `info`

- `ClientSide.java` — Player connection state
  - `nickname`, `status` (ONLINE/OFFLINE/PLAYING), `role` (PLAYER/SPECTATOR)

**Enums:**
- `ServerEventCode` (14 codes) — client→server actions
- `ClientEventCode` (24 codes) — server→client responses
- `PieceType` — EMPTY, BLACK, WHITE
- `GameResult` — IN_PROGRESS, BLACK_WIN, WHITE_WIN, DRAW
- `RoomType` — PVP, PVE
- `RoomStatus` — WAITING, PLAYING, FINISHED
- `ClientRole` — PLAYER, SPECTATOR
- `ClientStatus` — ONLINE, OFFLINE, PLAYING

**Game Logic:**
- `GomokuHelper.java` — Win detection (checks 4 directions)
  - `canWin(Board, row, col, piece)` → boolean
  - `getWinCount(Board, row, col, piece, direction)` → int
  - 37 unit tests in `GomokuHelperTest.java`

- `GomokuAI.java` — AI move selection (3 difficulties)
  - `getNextMove(Board, difficulty)` → GameMove
  - `getEasyMove()` — random valid move
  - `getMediumMove()` — find win or block opponent
  - `getHardMove()` — minimax scoring at depth 3
  - 37 unit tests in `GomokuAITest.java`

**Utilities:**
- `JsonUtils.java` — Serialize/deserialize POJO ↔ JSON
- `ListUtils.java` — List filtering, mapping
- `OptionsUtils.java` — Command-line argument parsing
- `StreamUtils.java` — I/O helpers
- `TimeHelper.java` — Timestamp formatting
- `I18nHelper.java` — Internationalization (English)
- `MapHelper.java` — Map utilities

**Protocol:**
- `ByteKit.java` — Byte buffer operations
- `ByteLink.java` — Byte stream builder
- `TransferProtocolUtils.java` — Serialize/deserialize messages
- `DefaultDecoder.java` — Protobuf message decoder

---

### landlords-server (Netty Server)

**Entry Point:**
- `SimpleServer.java` — Bootstrap
  - Parses args: `-p {port}` (default: 1024)
  - Creates two Netty ServerBootstrap instances (TCP + WebSocket)
  - Registers handlers in pipeline

**Event Handlers (ServerEventListener_*):**
- `CODE_CLIENT_NICKNAME_SET` — Store player nickname
- `CODE_ROOM_CREATE` / `CODE_ROOM_CREATE_PVE` — Create room, assign players
- `CODE_GET_ROOMS` — Send room list to client
- `CODE_ROOM_JOIN` — Add player to existing room
- `CODE_GAME_STARTING` — Check both players ready, begin game
- `CODE_GAME_READY` — Mark player ready
- `CODE_GAME_MOVE` — Validate move, apply to board, broadcast, check win, run AI
- `CODE_GAME_RESET` — Reset board for rematch
- `CODE_GAME_WATCH` / `CODE_GAME_WATCH_EXIT` — Spectator join/exit
- `CODE_CLIENT_EXIT` / `CODE_CLIENT_OFFLINE` — Cleanup disconnection

**Network Handlers:**
- `ProtobufTransferHandler` — TCP/Protobuf codec, encodes/decodes binary messages
- `WebsocketTransferHandler` — WebSocket JSON codec
- `StaticFileHandler` — HTTP file serving (index.html, CSS, JS, etc.)
  - Maps `GET /` → `static/index.html`
  - Rejects path traversal (`..`)
  - Supports MIME types: html, css, js, json, mp3, png, jpg, svg, ico
  - Passes `/ratel` requests to WebSocket handler

**Message Proxies:**
- `ProtobufProxy` — Send binary message to TCP client
- `WebsocketProxy` — Send JSON message to WebSocket client
- `Proxy` (abstract) — Base interface

**Global State:**
- `ServerContains.java` — Singleton holding all rooms, active connections
  - Methods: `addRoom()`, `removeRoom()`, `getRoomList()`, `findRoom(id)`

**Background Tasks:**
- `RoomClearTask` — Periodic cleanup (remove finished rooms after timeout)

---

### landlords-client (Java CLI Client)

**Entry Point:**
- `SimpleClient.java` — Bootstrap
  - Parses args: `-h {host} -p {port} -ptl {protocol} -lang {language}`
  - Connects via TCP/Protobuf or WebSocket
  - Reads moves from stdin (`row,col` or `exit`)

**Event Handlers (ClientEventListener_*):**
- `CODE_CLIENT_CONNECT` — Connection successful, display lobby menu
- `CODE_SHOW_ROOMS` — Display room list
- `CODE_ROOM_CREATE_SUCCESS` / `CODE_ROOM_JOIN_SUCCESS` — Enter waiting room
- `CODE_GAME_STARTING` — Display board, wait for moves
- `CODE_GAME_MOVE_SUCCESS` — Update local board display
- `CODE_GAME_MOVE_INVALID` / `CODE_GAME_MOVE_OCCUPIED` / etc. — Show error
- `CODE_GAME_WIN` / `CODE_GAME_LOSE` / `CODE_GAME_DRAW` — Game over
- `CODE_CLIENT_KICK` — Disconnected by server

**Protocol Handlers:**
- `ProtobufTransferHandler` — TCP codec
- `WebsocketTransferHandler` — WebSocket codec
- Same proxy pattern as server

---

## Web Client (JavaScript/Phaser 3)

**Boot:**
- `main.js` — Create Phaser game instance, start boot scene

**Config:**
- `game-config.js` — Phaser config object
  - Resolution: 800x800
  - Scale mode: Scale.FIT (responsive)
  - Physics: Enabled (for animations)
  - Scene list: [BootScene, MenuScene, GameScene]

- `protocol-constants.js` — Export event code enums
  - Maps ServerEventCode and ClientEventCode names to numbers

**Scenes (Phaser.Scene subclasses):**

- `BootScene` — Initialization
  - Create event bus and services
  - Connect to server (WebSocket)
  - Load assets (images, audio)
  - Transition to menu on connect

- `MenuScene` — DOM overlay menus
  - Nickname input form
  - Lobby with room list and create room button
  - Difficulty selector (for PVE)
  - Settings menu

- `GameScene` — Main gameplay
  - Render board and stones
  - Handle mouse clicks (place stones)
  - Display move history panel
  - Show turn indicator (whose turn?)
  - Display game over message
  - Handle rematch/exit options
  - Listen to WebSocket events (opponent moves, AI moves)

**Services (Singleton-like, event-driven):**

- `EventBus.js` — Simple pub/sub
  - `emit(event, data)`
  - `on(event, callback)`
  - Decouples scenes and services

- `ConnectionService.js` — WebSocket client
  - `connect(url)` → returns Promise
  - Maintains `ws` connection
  - Heartbeat every 30 seconds (send `CODE_CLIENT_HEAD_BEAT`)
  - Auto-reconnect on close (exponential backoff)
  - `send(code, data)` — send message to server

- `GameStateService.js` — Client-side state container
  - `room` object (id, players, board, status)
  - `nickname` string
  - `board` (15x15 array, mirrored from server)
  - Methods: `update()`, `reset()`, `addMove()`
  - Notify listeners on state change

**Game Objects (Phaser.GameObjects.*):**

- `Board.js` — Game board renderer
  - Create 15x15 grid of cells
  - Wood texture background
  - Cell dimensions: ~50x50 pixels
  - `placeStone(row, col, color)` method
  - Hover effect (highlight hovered cell)

- `Stone.js` — Individual stone sprite
  - Phaser.GameObjects.Sprite subclass
  - Gradient fill (black or white)
  - Drop animation (tweens)
  - Glow effect on hover

**UI Components (DOM + Phaser):**

- `MenuUI.js` — Menu rendering
  - Nickname input, validation
  - Room creation form (PVP/PVE selector, AI difficulty)
  - Room list (with join buttons)
  - Settings panel

- `GameUI.js` — Game HUD
  - Move history panel (list of moves: 7,7 Black, 8,8 White, etc.)
  - Turn indicator (waiting for opponent / your turn)
  - Game over modal (winner announcement, rematch button)
  - Toast notifications (connection lost, reconnected, etc.)

---

## Build Configuration

### Maven (Java)

**File:** `pom.xml`

**Parent:** Spring Boot 2.0.5.RELEASE

**Key Plugins:**
- `maven-compiler-plugin` — Java 8 source/target
- `maven-surefire-plugin` — Run unit tests
- `maven-source-plugin` — Generate source JAR
- `maven-javadoc-plugin` — Generate docs

**Dependencies:**
- Netty (async networking)
- Protobuf 3.25.5 (binary serialization)
- Gson (JSON parsing)
- JUnit (testing)

**Modules:**
- `landlords-common` (library)
- `landlords-server` (executable JAR)
- `landlords-client` (executable JAR)

**Build Command:**
```bash
mvn clean package -DskipTests
# Produces:
#   landlords-server/target/landlords-server-1.4.0.jar
#   landlords-client/target/landlords-client-1.4.0.jar
```

### Vite (JavaScript)

**File:** `web-client/package.json`

**Scripts:**
- `npm run dev` — Start dev server (port 5173, hot reload)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build

**Dependencies:**
- `phaser ^3.87.0` — Game engine
- `vite ^6.3.1` — Bundler

**Output:** `web-client/dist/` (index.html + bundled JS)

---

## Testing

**Test Framework:** JUnit 4

**Test Files:**
1. `GomokuHelperTest.java` (landlords-common)
   - 37+ test cases for win detection
   - Tests all 4 directions (horizontal, vertical, 2 diagonals)
   - Tests edge cases (board edges, corners)
   - Tests draw condition (full board)

2. `GomokuAITest.java` (landlords-common)
   - Tests Easy AI (random valid moves)
   - Tests Medium AI (finds winning move, blocks opponent)
   - Tests Hard AI (minimax scoring)
   - Tests move validity after AI selection

**Run Tests:**
```bash
mvn clean test
# or
mvn test -DskipTests=false
```

**Coverage:** ~100% for game logic (Board, GomokuHelper, GomokuAI)

---

## Dependencies Summary

| Module | Dependencies |
|--------|--------------|
| **landlords-common** | Netty, Protobuf, Gson, JUnit |
| **landlords-server** | landlords-common, Netty, Protobuf |
| **landlords-client** | landlords-common, Netty, Protobuf |
| **web-client** | Phaser 3, Vite (dev-only) |

---

## Important Files by Feature

### Game Logic
- `landlords-common/src/main/java/.../entity/Board.java` — Board state
- `landlords-common/src/main/java/.../helper/GomokuHelper.java` — Win detection
- `landlords-common/src/main/java/.../robot/GomokuAI.java` — AI engine

### Networking
- `landlords-server/src/main/.../handler/StaticFileHandler.java` — HTTP file serving
- `landlords-server/src/main/.../handler/WebsocketTransferHandler.java` — WS codec
- `landlords-server/src/main/.../handler/ProtobufTransferHandler.java` — TCP codec
- `web-client/src/services/connection-service.js` — WebSocket client

### Game Flow
- `landlords-server/src/main/.../event/ServerEventListener_CODE_GAME_MOVE.java` — Move processing
- `landlords-server/src/main/.../event/ServerEventListener_CODE_GAME_STARTING.java` — Game start
- `web-client/src/scenes/game-scene.js` — Game rendering & input

### UI
- `web-client/src/objects/board.js` — Board renderer
- `web-client/src/ui/game-ui.js` — HUD & notifications
- `web-client/src/ui/menu-ui.js` — Menus & forms

---

## Code Quality

**Metrics:**
- **Lines of Code:** ~5,000 Java, ~1,500 JavaScript
- **Test Coverage:** Game logic 100%, server 80%+, client varies
- **File Size:** Most Java files < 200 lines, JavaScript < 300 lines
- **Linting:** No major violations (follow code-standards.md)

**Documentation:**
- Javadoc on public methods (Java)
- JSDoc on exported functions (JavaScript)
- Inline comments for complex logic

---

## Build Artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| Server JAR | `landlords-server/target/landlords-server-1.4.0.jar` | Executable server |
| Client JAR | `landlords-client/target/landlords-client-1.4.0.jar` | Executable CLI client |
| Web dist | `web-client/dist/` | Static files for web UI |
| Source JAR | `landlords-*/target/*-sources.jar` | Source code archive |

---

## Continuous Integration

**GitHub Actions:**

1. **build.yml**
   - Trigger: Push to any branch
   - Steps:
     - Checkout code
     - Setup Java 8
     - Run `mvn clean test`
     - Run `npm install && npm run build` (web-client)

2. **deploy-pages.yml**
   - Trigger: Push to `master`
   - Steps:
     - Build web-client
     - Deploy to GitHub Pages (`https://tiennm99.github.io/caro/`)

---

## Version & Release

**Current Version:** 1.4.0

**Release Process:**
1. Tag commit: `git tag v1.4.0`
2. Push tag: `git push origin v1.4.0`
3. Create GitHub Release with JAR artifacts
4. Auto-deploy web-client to Pages

**Versioning:** Semantic versioning (MAJOR.MINOR.PATCH)
