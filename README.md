# Caro (Gomoku)

A multiplayer Gomoku (Five-in-a-Row) game with client-server architecture. Play in the browser against other players or an AI.

Built on [Netty](https://netty.io/) (server) and [Phaser 3](https://phaser.io/) (client).

## Features

- **15x15 board** with standard Gomoku rules
- **Player vs Player (PVP)** — create or join rooms, play against others online
- **Player vs AI (PVE)** — three difficulty levels (Easy, Medium, Hard)
- **Spectator mode** — watch ongoing games in real-time
- **Phaser web client** — professional 2D game UI with canvas board, stone animations, sound effects
- **Typed protobuf over WebSocket** — single binary wire protocol on port 1999

## Prerequisites

- **Java 25** — for building the server (Gradle wrapper is included; no separate Gradle install needed)
- **Node.js 22+** — for the client (development only)
- **Docker + Docker Compose** — optional, for containerized deployment

## Quick Start (Docker Compose)

```bash
git clone https://github.com/tiennm99/caro.git
cd caro
docker compose up -d
```

Then open `http://localhost:8080/` in your browser. The server listens on port `1999` (WebSocket); the client is served at `8080`.

## Quick Start (Local)

### 1. Build and run the server

```bash
./server/gradlew -p server clean build
java -jar server/build/libs/caro-server-0.0.1.jar -p 1999
```

On Windows use `server\gradlew.bat` instead of `./server/gradlew`.

The server starts one listener:
- **WebSocket** on port `1999` (typed protobuf binary frames at `/ratel`)

### 2. Run the client (Vite dev server)

```bash
npm --prefix client install
npm --prefix client run dev
```

Open `http://localhost:5173` in your browser. Features:
- Wood-textured board with gradient stones
- Stone placement animations and hover preview
- Move history panel and turn indicator
- Sound effects (Web Audio API)
- Lobby with room management

To play multiplayer, open two browser tabs.

## Game Rules

- Two players take turns placing **black** and **white** pieces on a 15x15 board
- **Black moves first**
- The first player to form an unbroken line of **5 pieces** (horizontally, vertically, or diagonally) wins
- The game ends in a **draw** if all 225 positions are filled

## Project Structure

```
caro/
  server/     Standalone Netty server (Java 25, Gradle, com.miti99.caro.{common,server})
  client/     Phaser 3 web client (Vite + vanilla JS)
  docs/       Project documentation
```

### Server Architecture

```
Client (browser)
  |
  +-- WS :1999 /ratel  -->  WebsocketTransferHandler
                              |
                              v
                            RequestConverter  (wire Request -> sealed ClientRequest record)
                              |
                              v
                            RequestDispatcher (pattern-match switch on record)
                              |
                              v
                            <Verb>Handler     (typed business logic, emits typed Response)
```

Protobuf schemas live at `server/src/main/proto/{request,response}.proto`.
The `com.google.protobuf` Gradle plugin generates Java classes into
`server/build/generated/sources/proto/main/java/com/miti99/caro/protocol/`.
No reflection, no string-keyed lookups.

### Client Architecture

```
client/src/
  main.js                    Phaser game boot
  config/
    game-config.js           Phaser config (800x800, Scale.FIT)
    protocol-constants.js    ClientEventCode (event bus keys) only
  generated/
    protocol.js              pbjs static-module output (Request/Response)
    protocol.d.ts            pbts TypeScript typings for protocol.js
  scenes/
    boot-scene.js            Connect to server
    menu-scene.js            DOM overlay menus
    game-scene.js            Board rendering + game interaction
  services/
    event-bus.js             Pub/sub event decoupling
    connection-service.js    WebSocket with heartbeat + reconnect
    game-state-service.js    Client-side state container
  objects/
    board.js                 15x15 grid with wood texture
    stone.js                 Gradient stones with drop animation
  ui/
    menu-ui.js               Nickname, lobby, room list, waiting room
    game-ui.js               HUD, move history, game over, toasts
```

## Server Options

```
-p, -port    WebSocket port (default: 1999)
```

## Client Scripts

```bash
npm --prefix client run dev      # Start Vite dev server (port 5173)
npm --prefix client run build    # Production build to client/dist/
npm --prefix client run preview  # Preview production build
npm --prefix client run proto:gen # Regenerate client/src/generated/protocol.{js,d.ts}
```

## Protocol

Communication uses **typed protobuf binary frames** over WebSocket.

Every client-to-server message is an instance of the `Request` oneof wrapper
(`server/src/main/proto/request.proto`); every server-to-client message is an
instance of the `Response` oneof wrapper (`server/src/main/proto/response.proto`).
The oneof case IS the event type — there are no string codes on the wire.

WebSocket endpoint: `ws://host:1999/ratel`

Example (send a move at row 7, col 7):
```js
connectionService.sendGameMove(7, 7); // builds Request { game_move: { row: 7, col: 7 } }
```

## Credits

This project is based on [Ratel](https://github.com/ainilili/ratel) by [ainilili](https://github.com/ainilili), originally a Chinese Landlords (Dou Di Zhu) card game. It has been converted to Gomoku (Five-in-a-Row) with a new web client.

- **Original project**: [ainilili/ratel](https://github.com/ainilili/ratel) — Netty-based multiplayer game framework
- **Networking**: [Netty](https://netty.io/) — asynchronous event-driven network framework
- **Web game engine**: [Phaser 3](https://phaser.io/) — HTML5 game framework
- **Client build tool**: [Vite](https://vite.dev/) — next-generation client tooling
- **Server build tool**: [Gradle](https://gradle.org/) with [Shadow plugin](https://gradleup.com/shadow/) for fat jars

## License

Licensed under the [Apache License 2.0](LICENSE).
