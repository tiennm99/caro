# System Architecture

## High-Level Overview

Caro is a **client-server multiplayer game** with dual-protocol networking:

```
┌──────────────┐  WebSocket   ┌──────────────────────────────┐
│ Web Client   │◄────/JSON───►│                              │
│ (Phaser 3)   │              │     Java Netty Server        │
└──────────────┘              │  Port 1024: TCP/Protobuf     │
                              │  Port 1025: WebSocket/JSON   │
┌──────────────┐  TCP         │  Port 1025: HTTP (static)    │
│ CLI Client   │◄────PB──────►│                              │
│ (Java)       │              │  Game Logic:                 │
└──────────────┘              │  - Room Management           │
                              │  - Move Validation           │
                              │  - AI (3 difficulties)       │
                              │  - Win Detection             │
                              └──────────────────────────────┘
```

---

## Component Architecture

### 1. Server (Java Netty)

**File:** `landlords-server/src/main/java/org/nico/ratel/landlords/server/`

**Responsibilities:**
- Listen on TCP (1024) and WebSocket (1025) simultaneously
- Parse incoming messages (Protobuf or JSON)
- Execute game logic (move validation, win checks)
- Broadcast state updates to all connected clients
- Run AI for PVE games
- Manage room lifecycle (create, join, spectate, cleanup)

**Key Classes:**
- `SimpleServer` — Entry point, starts Netty bootstrap for both ports
- `ServerEventListener` — Base class for event handlers
- `ServerEventListener_CODE_*` — Individual handlers for each ServerEventCode
- `ProtobufTransferHandler` — Netty pipeline handler for TCP
- `WebsocketTransferHandler` — Netty pipeline handler for WebSocket
- `StaticFileHandler` — HTTP file serving (index.html, CSS, JS, etc.)
- `ProtobufProxy` / `WebsocketProxy` — Send messages back to clients

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

### 2. Web Client (Phaser 3 + Vite)

**File:** `web-client/src/`

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
web-client/src/
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
- **Event Bus:** Decouples scenes, services, UI components. Emit `event` → listeners respond
- **Game State Service:** Single source of truth for board, room, players
- **Connection Service:** Handles reconnect logic and heartbeat (30-second interval)
- **WebSocket Message Format:** `{ code: "CODE_GAME_MOVE", data: "{...}", info: "" }`

---

### 3. CLI Client (Java)

**File:** `landlords-client/src/main/java/org/nico/ratel/landlords/client/`

**Responsibilities:**
- Connect to server via TCP (Protobuf) or WebSocket
- Parse command-line arguments (-h host, -p port, -ptl protocol)
- Read moves from stdin (format: `row,col` or `exit`)
- Display board state in terminal
- Handle disconnection gracefully

**Key Classes:**
- `SimpleClient` — Entry point, arg parsing, connection setup
- `ClientEventListener` — Base for event handlers
- `ClientEventListener_CODE_*` — Individual handlers
- `ProtobufTransferHandler` / `WebsocketTransferHandler` — Protocol handlers
- `ProtobufProxy` / `WebsocketProxy` — Send moves to server

---

### 4. Common Library (Shared Code)

**File:** `landlords-common/src/main/java/org/nico/ratel/landlords/`

**Responsibilities:**
- Define shared entities (Board, Room, GameMove)
- Define shared enums (ServerEventCode, ClientEventCode, PieceType, GameResult)
- Implement game logic (move validation, win detection, AI)
- Utilities (JSON, List, Options, Time helpers)

**Key Classes:**
- `Board` — 15x15 grid, move validation, win/draw detection
- `Room` — Encapsulates game state, players, spectators
- `GameMove` — Represents single move (row, col, piece type)
- `ServerTransferData` / `ClientTransferData` — Network message wrappers
- `GomokuHelper` — Win detection (4 directions: horizontal, vertical, 2 diagonals)
- `GomokuAI` — AI move selection (Easy, Medium, Hard difficulties)
- Enums: `ServerEventCode`, `ClientEventCode`, `PieceType`, `GameResult`, `RoomType`, `RoomStatus`

---

## Network Protocol

### Message Format

**WebSocket (JSON):**
```json
{
  "code": "CODE_GAME_MOVE",
  "data": "{\"row\": 7, \"col\": 7}",
  "info": ""
}
```

**TCP (Protobuf):**
Binary format (serialized via Protobuf 3).

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
  ├─ (3) CODE_ROOM_CREATE_PVP ─────────────────────►│
  │                                   │ Create room, assign player
  │◄─────────── CODE_ROOM_CREATE_SUCCESS ──────────│
  │
  ├─ (4) [Other client joins room]
  │                                   │ Both ready
  │◄─────────── CODE_GAME_STARTING ──│ (send board, initial state)
  │
  ├─ (5) CODE_GAME_MOVE ────────────────────────────►│
  │                                   │ Validate, apply, check win
  │◄─────────── CODE_GAME_MOVE_SUCCESS ───────────│
  │                                   │ Broadcast to both clients
  │◄─────────── (move update) ────────│
  │
  ├─ ... [repeating moves] ...
  │
  ├─ (N) [Winning move] ────────────────────────────►│
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

Three difficulties:

| Difficulty | Logic | Speed |
|-----------|-------|-------|
| **Easy** | Random valid move | Instant |
| **Medium** | Try to win, then block opponent, else random | < 100ms |
| **Hard** | Minimax scoring at depth 3 | < 1 sec |

---

## Module Dependencies

```
landlords-common (shared lib)
    ├── entities (Board, Room, GameMove, etc.)
    ├── enums (ServerEventCode, ClientEventCode, GameResult, etc.)
    ├── game logic (GomokuHelper, GomokuAI)
    └── utilities (JSON, ListUtils, TimeHelper, etc.)

landlords-server (depends on landlords-common)
    ├── Netty server bootstrap
    ├── TCP handler (Protobuf codec)
    ├── WebSocket handler
    ├── Static file handler (HTTP)
    ├── Event listeners (game logic)
    └── Room/player managers

landlords-client (depends on landlords-common)
    ├── Netty client bootstrap
    ├── TCP or WebSocket handler
    ├── Event listeners (local display)
    └── Terminal UI

web-client (no dependencies except Phaser 3, Vite)
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
- **timestamp:** When move was made

---

## File Serving (Static Web UI)

**Flow:**
1. Client makes HTTP request (e.g., `GET /index.html`)
2. `StaticFileHandler` intercepts in Netty pipeline
3. If path is `/ratel`, pass to WebSocket handler
4. Otherwise, map to classpath resource: `static/{path}`
5. Look up MIME type (html, css, js, png, svg, etc.)
6. Return 200 OK with file content

**Supported Extensions:**
- `.html`, `.css`, `.js`, `.json` — text with charset UTF-8
- `.mp3` — audio/mpeg
- `.png`, `.jpg`, `.svg`, `.ico` — images

**Security:** Path traversal (`..`) rejected, returns 403 Forbidden.

---

## Concurrency & Synchronization

### Server
- **Netty Threading:** Each connection has dedicated event loop thread
- **Room State:** Synchronized via `ServerContains` singleton (all rooms in memory)
- **Thread Safety:** No explicit locks; Netty guarantees sequential processing per connection
- **AI Moves:** Executed in event loop thread (blocking for < 1 sec)

### Client
- **Web Client:** Async via promises (WebSocket events trigger state updates)
- **CLI Client:** Blocking on stdin, concurrent with network reads

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
| **Web client load** | < 2 seconds | ~500ms (Vite optimized) |
| **Concurrent players** | 100+ | Tested to 50+, no issues |

---

## Security Considerations

### Current Status
- **No authentication** — all players anonymous (nickname only)
- **No encryption** — TCP and WebSocket unencrypted
- **Input validation** — Move coordinates validated, nicknames sanitized

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
│  GitHub Actions (CI/CD)            │
│  ├─ Build.yml: mvn + npm build     │
│  ├─ Test: Run 37 unit tests        │
│  └─ Deploy: Push web-client/ to    │
│     GitHub Pages                   │
└────────────────────────────────────┘
                │
    ┌───────────┴──────────────┐
    │                          │
    ▼                          ▼
┌──────────────────┐    ┌─────────────────┐
│ JAR (Release)    │    │ GitHub Pages    │
│ landlords-server │    │ Web UI          │
│ (Java 8+)        │    │ Static files    │
└──────────────────┘    └─────────────────┘
    │
    ├─ java -jar ... -p 1024
    │     ↓
    └─ Listens on :1024 (TCP), :1025 (WS + HTTP)
```

---

## Key Files Summary

| File | Purpose |
|------|---------|
| `SimpleServer.java` | Server entry point |
| `SimpleClient.java` | CLI client entry point |
| `main.js` | Web client entry point (Phaser) |
| `Board.java` | Game board state + validation |
| `GomokuHelper.java` | Win detection algorithm |
| `GomokuAI.java` | AI move selection (3 difficulties) |
| `Room.java` | Game room state container |
| `ServerEventListener_*.java` | Event handlers (game logic) |
| `game-scene.js` | Web client main gameplay scene |
| `connection-service.js` | WebSocket client |
| `protocol-constants.js` | Event code enums |

---

## Future Architectural Improvements

1. **Database integration** — Persist games, leaderboards, accounts
2. **Message broker (Kafka/RabbitMQ)** — Decouple game logic from network I/O
3. **Microservices** — Separate room manager, AI service, auth service
4. **Load balancing** — Multiple server instances with session affinity
5. **Spectator streaming** — Publish game state to viewers without load
6. **Replay system** — Record move history, allow playback
7. **Mobile app** — Native iOS/Android clients instead of web-only
