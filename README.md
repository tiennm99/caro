# Caro (Gomoku)

A multiplayer Gomoku (Five-in-a-Row) game with client-server architecture. Play in the browser against other players or an AI.

Built on [Netty](https://netty.io/) (server) and [Phaser 3](https://phaser.io/) (client).

## Features

- **15x15 board** with standard Gomoku rules
- **Player vs Player (PVP)** — create or join rooms, play against others online
- **Player vs AI (PVE)** — three difficulty levels (Easy, Medium, Hard)
- **Spectator mode** — watch ongoing games in real-time
- **Phaser web client** — professional 2D game UI with canvas board, stone animations, sound effects
- **WebSocket + TCP** — dual protocol support

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

Then open `http://localhost:8080/` in your browser. The server listens on ports `1024` (TCP) and `1025` (WebSocket); the client is served at `8080`.

## Quick Start (Local)

### 1. Build and run the server

```bash
./server/gradlew -p server clean build
java -jar server/build/libs/caro-server-0.0.1.jar -p 1024
```

On Windows use `server\gradlew.bat` instead of `./server/gradlew`.

The server starts two listeners:
- **TCP** on port `1024` (Protobuf)
- **WebSocket** on port `1025` (JSON)

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
  +-- TCP  :1024  -->  ProtobufTransferHandler   -->  ServerEventListener_*
  +-- WS   :1025  -->  WebsocketTransferHandler  -->  ServerEventListener_*
```

### Client Architecture

```
client/src/
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

## Client Scripts

```bash
npm --prefix client run dev      # Start Vite dev server (port 5173)
npm --prefix client run build    # Production build to client/dist/
npm --prefix client run preview  # Preview production build
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
- **Client build tool**: [Vite](https://vite.dev/) — next-generation client tooling
- **Server build tool**: [Gradle](https://gradle.org/) with [Shadow plugin](https://gradleup.com/shadow/) for fat jars

## License

Licensed under the [Apache License 2.0](LICENSE).
