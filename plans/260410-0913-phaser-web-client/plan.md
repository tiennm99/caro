---
title: "Phaser 3 Web Client for Gomoku"
description: "Standalone Phaser 3 + Vite web client connecting to existing Netty server via WebSocket"
status: pending
priority: P1
effort: 12h
branch: master
tags: [web-client, phaser3, vite, gomoku, websocket]
created: 2026-04-10
---

# Phaser 3 Web Client for Gomoku

## Overview

Build a standalone web client using Phaser 3 (game engine) + Vite (build tool) + vanilla JavaScript (with JSDoc). Connects to existing Netty server at `ws://host:port/ratel`. Server owns all game logic; client is display + input only.

## Architecture

```
Browser
  +-- Phaser 3 Game (canvas: board rendering, stones, animations)
  +-- DOM Overlays (HTML/CSS: menus, forms, lobby, toasts)
  +-- Services (JS modules, not Phaser-coupled)
       +-- connection-service.js  (WebSocket I/O + heartbeat)
       +-- event-bus.js           (pub/sub decoupling)
       +-- game-state-service.js  (clientId, roomId, turn, board state)
```

## Data Flow

```
User click -> GameScene -> connection-service.send(CODE_GAME_MOVE, {row, col})
                              |
                              v
                         WebSocket -> Server
                              |
                              v
Server -> WebSocket -> connection-service.onMessage -> event-bus.emit(code, data)
                              |
                              v
                         GameScene listener -> update board, play animation
```

## Phases

| # | Phase | Status | Effort | Files |
|---|-------|--------|--------|-------|
| 1 | [Project scaffold](phase-01-project-scaffold.md) | Pending | 1h | package.json, vite.config.js, index.html, main.js, game-config.js |
| 2 | [Services layer](phase-02-services-layer.md) | Pending | 2h | connection-service.js, event-bus.js, game-state-service.js, protocol-constants.js |
| 3 | [Boot + Menu scenes](phase-03-boot-menu-scenes.md) | Pending | 2.5h | boot-scene.js, menu-scene.js, menu-ui.js, styles in index.html |
| 4 | [Game scene + board](phase-04-game-scene-board.md) | Pending | 3h | game-scene.js, board.js, stone.js, game-ui.js |
| 5 | [Game over + spectator](phase-05-gameover-spectator.md) | Pending | 2h | DOM overlay in game-ui.js, updates to game-scene.js |
| 6 | [Polish + error handling](phase-06-polish-errors.md) | Pending | 1.5h | cross-cutting updates, reconnect logic, toast system |

## Dependency Graph

```
Phase 1 (scaffold)
  +-> Phase 2 (services) -- no Phaser dependency, can start after scaffold
  +-> Phase 3 (boot+menu) -- needs scaffold + services
        +-> Phase 4 (game scene) -- needs menu to navigate + services for WS
              +-> Phase 5 (game over + spectator) -- needs game scene
                    +-> Phase 6 (polish) -- cross-cutting, touches all
```

## Key Decisions

1. **DOM overlays for menus** -- Phaser text/buttons too limited for forms and tables. Standard Phaser practice.
2. **Plain WebSocket API** -- No socket.io. Server uses raw WS frames. `connection-service.js` wraps reconnect + heartbeat.
3. **Event bus decoupling** -- Scenes subscribe to game events via event-bus, not direct WS references. Testable, replaceable.
4. **No TypeScript** -- User preference. JSDoc `@typedef` for type documentation.
5. **15x15 board** -- Hardcoded from server `Board.BOARD_SIZE = 15`. Client reads `boardSize` from `CODE_GAME_STARTING` anyway.
6. **3 Phaser scenes only** -- BootScene, MenuScene, GameScene. Game over is a DOM overlay on GameScene (keeps board visible behind result card). No GameOverScene needed.

## Backwards Compatibility

- **Server: zero changes.** Client connects via existing WS endpoint `/ratel`.
- **Existing Java client: unaffected.** Web client is additive.
- **Protocol verified** from server source: `Msg{code, data, info}` JSON format.

## Rollback Plan

- `web-client/` is a standalone directory. `rm -rf web-client/` to revert.
- No server code modified. No migration needed.

## Test Strategy

- **Manual integration test** with running server (Phase 6)
- **Browser dev tools** for WS frame inspection
- No unit test framework initially (YAGNI -- thin UI client with server-owned logic)
- If needed later: Vitest for service modules

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| WS message format mismatch | Low | High | Protocol constants extracted from server source; verify with live server in Phase 2 |
| Phaser canvas sizing on different screens | Medium | Medium | Use Phaser `Scale.FIT` + responsive CSS container |
| Server heartbeat timeout (<60s idle) | Low | High | Client sends `CODE_CLIENT_HEAD_BEAT` every 50s via setInterval |
| DOM overlay z-index conflicts with Phaser | Medium | Low | Explicit z-index layering; hide overlays during game scene |
