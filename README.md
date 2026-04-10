# Caro (Gomoku)

A multiplayer Gomoku (Five-in-a-Row) game with client-server architecture. Play in the browser or from the command line.

Built on [Netty](https://netty.io/) (server) and [Phaser 3](https://phaser.io/) (web client).

## Features

- **15x15 board** with standard Gomoku rules
- **Player vs Player (PVP)** — create or join rooms, play against others online
- **Player vs AI (PVE)** — three difficulty levels (Easy, Medium, Hard)
- **Spectator mode** — watch ongoing games in real-time
- **Web client** — professional 2D game UI with canvas board, stone animations, sound effects
- **CLI client** — terminal-based client for lightweight play
- **WebSocket + TCP** — dual protocol support

## Prerequisites

- **Java 8+** and **Maven** — for the server and CLI client
- **Node.js 18+** — for the web client (development only)

## Quick Start

### 1. Build the server

```bash
git clone https://github.com/tiennm99/caro.git
cd caro
mvn clean package -DskipTests
```

### 2. Start the server

```bash
java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
```

The server starts two listeners:
- **TCP** on port `1024` (for CLI clients)
- **WebSocket** on port `1025` (for web clients and the built-in web UI)

### 3. Play in the browser (Web Client)

#### Option A: Built-in web UI

Open `http://localhost:1025/` in your browser. The server serves a basic web UI directly.

#### Option B: Phaser web client (recommended)

```bash
cd web-client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. This is the full-featured Phaser 3 game client with:
- Wood-textured board with gradient stones
- Stone placement animations and hover preview
- Move history panel and turn indicator
- Sound effects (Web Audio API)
- Lobby with room management

To play multiplayer, open two browser tabs.

### 4. Play from the terminal (CLI Client)

```bash
java -jar landlords-client/target/landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024
```

Enter moves as `row,col` (e.g. `7,7` for the center of the board). Type `exit` or `e` to leave.

## Game Rules

- Two players take turns placing **black** and **white** pieces on a 15x15 board
- **Black moves first**
- The first player to form an unbroken line of **5 pieces** (horizontally, vertically, or diagonally) wins
- The game ends in a **draw** if all 225 positions are filled

## Project Structure

```
caro/
  landlords-common/    Java shared library (game logic, entities, protocol)
  landlords-server/    Java Netty server (TCP + WebSocket)
  landlords-client/    Java CLI client
  web-client/          Phaser 3 web client (Vite + vanilla JS)
```

### Server Architecture

```
Client (browser/CLI)
  |
  +-- TCP  :1024  -->  ProtobufTransferHandler  -->  ServerEventListener_*
  +-- WS   :1025  -->  WebsocketTransferHandler -->  ServerEventListener_*
  +-- HTTP :1025  -->  StaticFileHandler         -->  static files
```

### Web Client Architecture

```
web-client/src/
  main.js                    Phaser game boot
  config/
    game-config.js           Phaser config (800x800, Scale.FIT)
    protocol-constants.js    Server/client event code enums
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
-p, -port    TCP port (default: 1024, WebSocket = TCP + 1)
```

## CLI Client Options

```
-h, -host       Server address (required)
-p, -port       Server TCP port (default: 1024)
-ptl, -protocol Protocol: "pb" (TCP/Protobuf) or "ws" (WebSocket)
-lang           Language: "en" / "en_US"
```

## Web Client Scripts

```bash
cd web-client
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Production build to web-client/dist/
npm run preview  # Preview production build
```

## Protocol

Communication uses JSON messages over WebSocket or Protobuf over TCP.

WebSocket message format:
```json
{"code": "CODE_GAME_MOVE", "data": "{\"row\":7,\"col\":7}", "info": ""}
```

WebSocket endpoint: `ws://host:{tcp_port + 1}/ratel`

## Credits

This project is based on [Ratel](https://github.com/ainilili/ratel) by [ainilili](https://github.com/ainilili), originally a Chinese Landlords (Dou Di Zhu) card game. It has been converted to Gomoku (Five-in-a-Row) with a new web client.

- **Original project**: [ainilili/ratel](https://github.com/ainilili/ratel) — Netty-based multiplayer game framework
- **Networking**: [Netty](https://netty.io/) — asynchronous event-driven network framework
- **Web game engine**: [Phaser 3](https://phaser.io/) — HTML5 game framework
- **Build tool**: [Vite](https://vite.dev/) — next-generation frontend tooling

## License

Licensed under the [Apache License 2.0](LICENSE).
