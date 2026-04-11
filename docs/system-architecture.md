# System Architecture

## High-Level Overview

Caro is a **client-server multiplayer game** with typed-protobuf WebSocket:

```
┌──────────────┐  WebSocket   ┌──────────────────────────────┐
│ Client       │◄──BINARY────►│                              │
│ (Phaser 3)   │  Typed Proto │  Java 25 Netty Server        │
└──────────────┘              │  Port 1999: WebSocket only   │
                              │  Path: /ratel                │
                              │                              │
                              │  Game Logic:                 │
                              │  - Room Management           │
                              │  - Move Validation           │
                              │  - AI (3 difficulties)       │
                              │  - Win Detection             │
                              └──────────────────────────────┘
```

---

## Component Architecture

### 1. Server (Java 25 + Netty)

**File:** `server/src/main/java/com/miti99/caro/server/`

**Responsibilities:**
- Listen on WebSocket port 1999 at path `/ratel`
- Parse incoming binary TYPED PROTOBUF messages (`ClientRequest` oneof wrapper)
- Execute game logic (move validation, win checks)
- Broadcast state updates via typed `Response` messages (binary frames)
- Run AI for PVE games
- Manage room lifecycle (create, join, spectate, cleanup)

**Key Classes:**
- `SimpleServer` — Entry point; starts Netty bootstrap for WebSocket only
- `WebsocketTransferHandler` — Netty pipeline handler (decodes binary frame to `Request` protobuf)
- `RequestConverter` — Converts protobuf `Request` oneof to `ClientRequest` sealed records
- `RequestDispatcher` — Pattern-matching switch dispatching `ClientRequest` to typed handlers
- `*Handler` — 14 individual request handlers (SetNicknameHandler, CreateRoomHandler, GameMoveHandler, etc.)

**Event Codes (ServerEventCode)** — sent by clients:
```
CODE_CLIENT_EXIT              Player disconnected or left
CODE_CLIENT_OFFLINE           Network timeout
CODE_CLIENT_INFO_SET          Set client metadata
CODE_CLIENT_NICKNAME_SET      Set player display name
CODE_CLIENT_HEAD_BEAT         Keep-alive heartbeat
CODE_ROOM_CREATE              Create PVP room
CODE_ROOM_CREATE_PVE          Create PVE room (with AI)
CODE_GET_ROOMS                Request room list
CODE_ROOM_JOIN                Join existing room
CODE_GAME_STARTING            Request game start (ready)
CODE_GAME_READY               Player ready signal
CODE_GAME_MOVE                Make a move (row, col)
CODE_GAME_RESET               Reset game state
CODE_GAME_WATCH               Spectate a game
CODE_GAME_WATCH_EXIT          Stop spectating
```

---

### 2. Client (Phaser 3 + Vite)

**File:** `client/src/`

**Responsibilities:**
- Render 15x15 game board with wood texture
- Display pieces as gradient-colored stones
- Handle user input (mouse clicks, keyboard)
- Animate stone placement and drop effects
- Display game menus, lobbies, room lists
- Show move history and turn indicator
- Play sound effects (Web Audio API)
- Manage WebSocket connection with heartbeat/reconnect

**Architecture:**

```
client/src/
├── main.js                     # Phaser boot, create game instance
├── config/
│   ├── game-config.js          # Phaser config (resolution, scale, physics)
│   └── protocol-constants.js   # ServerEventCode & ClientEventCode enums
├── scenes/
│   ├── boot-scene.js           # Initialize, connect to server
│   ├── menu-scene.js           # DOM overlay menus (nickname, lobby, rooms)
│   └── game-scene.js           # Main gameplay (board, pieces, input, HUD)
├── services/
│   ├── event-bus.js            # Pub/sub dispatcher for loose coupling
│   ├── connection-service.js   # WebSocket connection & heartbeat logic
│   └── game-state-service.js   # Client-side state container (board, room, players)
├── objects/
│   ├── board.js                # 15x15 grid rendering, wood texture
│   └── stone.js                # Individual stone sprite with animations
└── ui/
    ├── menu-ui.js              # Nickname input, room creation, settings
    └── game-ui.js              # HUD (move history, turn indicator, game over)
```

**Key Patterns:**
- **Event Bus:** Decouples scenes, services, UI components. `emit(event, data)` → listeners respond.
- **Game State Service:** Single source of truth for board, room, players.
- **Connection Service:** Reconnect logic and heartbeat (30-second interval).
- **Client Connection:** Initiates WebSocket handshake to `ws://localhost:1999/ratel`, then sends typed `Request` messages in binary

---

### 3. Shared code (common sub-package)

**File:** `server/src/main/java/com/miti99/caro/common/`

**Responsibilities:**
- Shared entities (Board, Room, GameMove, ClientSide)
- Shared enums (ClientEventCode, PieceType, GameResult, RoomType, RoomStatus)
- Game logic (move validation, win detection, AI)
- Utilities (list, options, stream helpers)

**Key Classes:**
- `Board` — 15x15 grid, move validation, win/draw detection
- `Room` — Encapsulates game state, players, spectators
- `GameMove` — Represents a single move (row, col, piece type, playerId, timestamp)
- `ClientSide` — Player connection metadata
- `GomokuHelper` — Win detection (4 directions)
- `GomokuAI` — AI move selection (Easy, Medium, Hard)
- Enums under `common/enums/`

Note: `common` is a sub-package within the single `server/` Gradle project. It is not a separate artifact.

---

## Network Protocol

### Message Format

**WebSocket (Binary Protobuf):**

Client sends `Request` oneof message (defined in `server/src/main/proto/request.proto`):
```
message Request {
  oneof payload {
    SetNicknameRequest set_nickname = 1;
    CreateRoomRequest create_room = 2;
    CreatePveRoomRequest create_pve_room = 3;
    ... 11 more typed requests ...
  }
}
```

Server replies with `Response` oneof message (defined in `server/src/main/proto/response.proto`):
```
message Response {
  oneof payload {
    ClientConnectResponse client_connect = 1;
    RoomCreateResponse room_create = 2;
    GameMoveResponse game_move = 3;
    ... additional typed responses ...
  }
}
```

Each message is **binary-encoded** in a WebSocket frame (`binaryType='arraybuffer'`).

### Connection Flow

```
Client                          Server
  │
  ├─ (1) Connect ──────────────►│
  │
  ├─ (2) CODE_CLIENT_NICKNAME_SET ──────────────►│
  │                                   │ Validate, store
  │◄─────────── CODE_CLIENT_CONNECT ──│ (send list of existing rooms)
  │
  ├─ (3) CODE_ROOM_CREATE ─────────────────────►│
  │                                   │ Create room, assign player
  │◄─────────── CODE_ROOM_CREATE_SUCCESS ──────│
  │
  ├─ (4) [Other client joins room]
  │                                   │ Both ready
  │◄─────────── CODE_GAME_STARTING ──│ (send board, initial state)
  │
  ├─ (5) CODE_GAME_MOVE ────────────────────────►│
  │                                   │ Validate, apply, check win
  │◄─────────── CODE_GAME_MOVE_SUCCESS ────────│
  │                                   │ Broadcast to both clients
  │◄─────────── (move update) ────────│
  │
  ├─ ... [repeating moves] ...
  │
  ├─ (N) [Winning move] ────────────────────────►│
  │                                   │ Check win condition
  │◄─────────── CODE_GAME_WIN ────────│ (or CODE_GAME_LOSE for opponent)
  │◄─────────── CODE_GAME_OVER ───────│ (final state)
  │
  └─ Disconnect
```

### Key Event Codes (Server → Client)

```
CODE_CLIENT_CONNECT              Login successful, rooms list
CODE_SHOW_ROOMS                  Room list updated
CODE_ROOM_CREATE_SUCCESS         Room created
CODE_ROOM_JOIN_SUCCESS           Joined room, waiting for players
CODE_GAME_STARTING               All players ready, game begins
CODE_GAME_MOVE_SUCCESS           Move valid, board updated
CODE_GAME_MOVE_INVALID           Move failed (validation error)
CODE_GAME_WIN                    You won
CODE_GAME_LOSE                   You lost
CODE_GAME_DRAW                   Draw (board full)
CODE_GAME_OVER                   Game ended; payload: { result, winnerNickname }
CODE_CLIENT_KICK                 Disconnected by server
```

---

## Game Logic Flow

### Move Validation & Execution

```
Player submits move (row, col)
        │
        ▼
[Validate]
  - Row/Col in [0, 14]?
  - Position empty?
  - Game still in progress?
        │ YES ▼
[Execute]
  - Place piece on board
  - Increment moveCount
  - Check win (4 directions from position)
        │ ▼
[Determine Outcome]
  - Win? → Send CODE_GAME_WIN / CODE_GAME_LOSE
  - Draw? (moveCount == 225) → Send CODE_GAME_DRAW
  - Continue? → Wait for opponent move
```

### Win Detection (GomokuHelper)

Checks 4 directions from last placed stone:
1. **Horizontal** — count left/right until edge or different piece
2. **Vertical** — count up/down
3. **Diagonal ↘** — count up-left/down-right
4. **Diagonal ↙** — count up-right/down-left

Win if count ≥ 5.

### AI Move Selection (GomokuAI)

Three difficulties (dispatched via a Java 25 switch expression):

| Difficulty | Logic | Speed |
|-----------|-------|-------|
| **Easy** | Random valid move | Instant |
| **Medium** | Try to win, then block opponent, else random | < 100ms |
| **Hard** | Minimax scoring at depth 3 | < 1 sec |

---

## Netty Pipeline (WebSocket)

```
IdleStateHandler              (30-min read-idle detection)
  ↓
HttpServerCodec
  ↓
ChunkedWriteHandler
  ↓
HttpObjectAggregator (8 KB)
  ↓
WebSocketServerProtocolHandler ("/ratel")
  ↓
WebsocketTransferHandler       (decode binary Request frame, dispatch to RequestDispatcher)
  ↓
RequestConverter               (Request oneof → ClientRequest sealed variant)
  ↓
RequestDispatcher              (pattern-match dispatch to typed *Handler)
```

Outgoing: Handler classes call `ChannelUtils.push(Response)` which encodes to binary and sends `BinaryWebSocketFrame`.

---

## Module Dependencies

The project is a **single standalone Gradle project** (`server/`) plus a **Node project** (`client/`):

```
server/ (standalone: com.miti99.caro:caro-server:0.0.1)
├── common/  (shared entities, enums, game logic, utils)
│   ├── Netty (runtime transitive)
│   ├── Protobuf 3.25.5
│   └── gson 2.11.0
└── server/  (entry point, event listeners, handlers, proxies, timers)

client/  (no dependencies except Phaser 3, Vite dev-only)
├── Phaser game instance
├── WebSocket connection
├── Event-driven scenes/services
└── Canvas rendering (board, stones, UI)
```

---

## Data Structures

### Board
- **Type:** `PieceType[][]` (15 x 15)
- **Values:** `EMPTY`, `BLACK`, `WHITE`
- **Accessed:** `board[row][col]`

### Room
- **ID:** Unique identifier
- **Type:** `RoomType.PVP` or `RoomType.PVE`
- **Status:** `RoomStatus.WAITING`, `PLAYING`, `FINISHED`
- **Players:** List of 2 ClientSide objects (player 1 & 2)
- **Spectators:** List of additional ClientSide objects
- **Board:** Current game board
- **MoveHistory:** List of GameMove objects

### GameMove
- **row, col:** Position (0-14)
- **piece:** `PieceType.BLACK` or `WHITE`
- **playerId:** player that made the move
- **timestamp:** when the move was made

### Msg (record)
- **code:** event code (`String`)
- **data:** payload (JSON-encoded `String`)
- **info:** optional metadata (`String`)

---

## Concurrency & Synchronization

### Server
- **Netty Threading:** Each connection has a dedicated event loop thread
- **Room State:** Synchronized via `ServerContains` singleton (all rooms in memory)
- **Thread Safety:** No explicit locks; Netty guarantees sequential processing per connection
- **AI Moves:** Executed in the event loop thread (blocking for < 1 sec; acceptable for current scale)

### Client
- **Client:** Async via promises (WebSocket events trigger state updates)

---

## Error Handling

### Server-Side
- Invalid moves → `CODE_GAME_MOVE_INVALID` with reason
- Room not found → `CODE_ROOM_PLAY_FAIL_BY_INEXIST`
- Room full → `CODE_ROOM_JOIN_FAIL_BY_FULL`
- Disconnection → `CODE_CLIENT_OFFLINE` event, auto-cleanup after timeout

### Client-Side
- WebSocket close → Reconnect with exponential backoff
- Protocol error → Log, show user "Connection error" toast
- Invalid state (e.g., can't move during opponent's turn) → Reject locally

---

## Performance Considerations

| Component | Target | Actual |
|-----------|--------|--------|
| **Server latency** | < 50ms per move | ~10-20ms (Netty, in-memory) |
| **Network latency** | < 500ms round-trip | Depends on client location |
| **AI response (Hard)** | < 1 second | ~800ms (depth 3 minimax) |
| **Client load** | < 2 seconds | ~500ms (Vite optimized, ~1.5 MB bundle / 346 KB gzipped) |
| **Concurrent players** | 100+ | Tested to 50+, no issues |

---

## Security Considerations

### Current Status
- **No authentication** — all players anonymous (nickname only)
- **No encryption** — TCP and WebSocket unencrypted
- **Input validation** — Move coordinates validated, nicknames sanitized
- **Reduced attack surface** — built-in static file serving removed (no path traversal risk, no stale HTML/JS)

### Recommendations (Not Implemented)
- Use TLS/WSS for encrypted connections
- Add user account + token-based auth
- Rate-limit API endpoints
- Implement server-side state validation (no client-side cheating)
- Sanitize HTML from nicknames before broadcast

---

## Deployment Architecture

```
┌────────────────────────────────────┐
│  GitHub Actions (CI)               │
│  └─ build.yml:                     │
│       - setup Java 25 + gradlew build│
│       - setup Node 22 + npm build  │
│       - 37 JUnit 5 tests           │
└────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────┐
│ Docker Compose                     │
│ ├─ caro-server (Java 25 fat jar)   │
│ └─ caro-client (Nginx + dist/)     │
└────────────────────────────────────┘

Server listens on `:1999` (WebSocket only, at `/ratel`).
```

Docker Compose runs both services (`caro-server` + `caro-client`) from the single repo context.

---

## Key Files Summary

| File | Purpose |
|------|---------|
| `server/src/main/java/com/miti99/caro/server/SimpleServer.java` | Server entry point |
| `server/src/main/proto/request.proto` | Client→server typed message definitions |
| `server/src/main/proto/response.proto` | Server→client typed message definitions |
| `client/src/main.js` | Client entry point (Phaser) |
| `server/src/main/java/com/miti99/caro/common/entity/Board.java` | Game board state + validation |
| `server/src/main/java/com/miti99/caro/common/helper/GomokuHelper.java` | Win detection algorithm |
| `server/src/main/java/com/miti99/caro/common/robot/GomokuAI.java` | AI move selection (3 difficulties) |
| `server/src/main/java/com/miti99/caro/common/entity/Room.java` | Game room state container |
| `server/src/main/java/com/miti99/caro/server/event/RequestConverter.java` | Protobuf→ClientRequest record |
| `server/src/main/java/com/miti99/caro/server/event/RequestDispatcher.java` | Dispatch ClientRequest→Handler |
| `server/src/main/java/com/miti99/caro/server/event/handler/*.java` | 14 typed request handlers |
| `server/src/main/java/com/miti99/caro/server/handler/WebsocketTransferHandler.java` | WS binary codec |
| `client/src/scenes/game-scene.js` | Client main gameplay scene |
| `client/src/services/connection-service.js` | WebSocket client (binary mode) |
| `client/src/config/protocol-constants.js` | ClientEventCode enum (event-bus keys) |
| `client/src/generated/protocol.{js,d.ts}` | Protobuf codegen (protobufjs) |

---

## Future Architectural Improvements

1. **Enhanced request validation** — add server-side schema validation for stricter type safety.
2. **Database integration** — Persist games, leaderboards, accounts.
3. **Virtual threads** — Java 25 has mature virtual-thread support; some blocking code paths (e.g. AI hard-depth search) could be offloaded.
4. **Message broker (Kafka/RabbitMQ)** — Decouple game logic from network I/O.
5. **Microservices** — Separate room manager, AI service, auth service.
6. **Load balancing** — Multiple server instances with session affinity.
7. **Replay system** — Record move history, allow playback.
8. **Mobile app** — Native iOS/Android clients alongside web.
