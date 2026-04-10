# Gomoku Web Client

Phaser 3 web client for the Gomoku game server.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Requirements

- Node.js 22+
- Game server running on `localhost:1024` (WebSocket on port `1025`)

## Server Connection

The client connects via WebSocket to `ws://localhost:1025/ratel` by default.
To connect to a remote server, update the URL in `src/services/connection-service.js`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview production build locally |

## Tech Stack

- [Phaser 3](https://phaser.io/) — HTML5 game engine
- [Vite](https://vite.dev/) — build tool
- Vanilla JavaScript with JSDoc annotations
