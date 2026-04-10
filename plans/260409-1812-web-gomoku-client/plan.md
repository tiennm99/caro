---
title: "Web 2D Gomoku Client"
description: "Professional vanilla JS Gomoku web client served from existing Netty server"
status: pending
priority: P1
effort: 10h
branch: master
tags: [web-client, gomoku, netty, websocket, canvas]
created: 2026-04-09
---

# Web 2D Gomoku Client

## Overview

Add a professional 2D web-based Gomoku client served as static files from the existing Netty WebSocket server. The server already handles all game logic; the client is display-only. No build tools (vanilla HTML/CSS/JS).

## Architecture

```
Browser (port 1025)
  |
  |-- GET / (HTTP)  -->  StaticFileHandler  -->  static/index.html
  |-- GET /css/*    -->  StaticFileHandler  -->  static/css/*
  |-- GET /js/*     -->  StaticFileHandler  -->  static/js/*
  |
  |-- WS /ratel     -->  WebSocketServerProtocolHandler (existing)
                         WebsocketTransferHandler (existing)
```

**Data flow:** Browser opens WS to `/ratel`. Server sends `CODE_CLIENT_CONNECT` + `CODE_CLIENT_NICKNAME_SET`. Client walks through nickname -> lobby -> room -> game screens, sending JSON `{code, data, info}` messages. All state transitions driven by server events.

## Phases

| # | Phase | Status | Effort | Files Modified/Created |
|---|-------|--------|--------|----------------------|
| 1 | [Server: Static file handler](phase-01-server-static-file-handler.md) | Pending | 1.5h | 2 Java files |
| 2 | [Client: HTML shell + CSS](phase-02-client-html-css.md) | Pending | 2h | 2 files |
| 3 | [Client: WebSocket + state machine](phase-03-client-connection-state.md) | Pending | 2h | 2 JS files |
| 4 | [Client: Canvas board rendering](phase-04-client-board-rendering.md) | Pending | 2h | 1 JS file |
| 5 | [Client: UI panels + lobby](phase-05-client-ui-panels.md) | Pending | 1.5h | 1 JS file |
| 6 | [Client: Audio](phase-06-client-audio.md) | Pending | 0.5h | 1 JS file + audio assets |
| 7 | [Integration test + polish](phase-07-integration-test.md) | Pending | 0.5h | - |

## Dependency Graph

```
Phase 1 (server) --+
                    +--> Phase 7 (integration)
Phase 2 (HTML)   --+
  |                 |
  v                 |
Phase 3 (WS+state) --> Phase 5 (UI)
  |                        |
  v                        v
Phase 4 (board)  --------> Phase 7
  |
  v
Phase 6 (audio) ---------> Phase 7
```

Phases 1 and 2 are independent (can run in parallel). Phase 3 depends on 2. Phase 4 depends on 3. Phase 5 depends on 3. Phase 6 depends on 4. Phase 7 depends on all.

## Key Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Netty pipeline ordering breaks WS upgrade | Medium | High | Insert static handler BEFORE `WebSocketServerProtocolHandler`; handler checks URI and passes through `/ratel` |
| Canvas rendering performance on large boards | Low | Medium | 15x15 is small; only redraw dirty cells |
| MIME type issues for static files | Low | Medium | Explicit MIME map in handler |
| Audio autoplay blocked by browser | Medium | Low | Play on first user interaction; graceful fallback |

## Rollback

- Server change: Remove `StaticFileHandler` from pipeline. Single file revert.
- Client files: Delete `landlords-server/src/main/resources/static/` directory. No server code depends on it.

## Success Criteria

- [ ] `http://localhost:1025/` loads the game UI
- [ ] Full game flow: nickname -> lobby -> create room -> play -> game over -> rematch
- [ ] PVP mode works (2 browser tabs)
- [ ] PVE mode works (all 3 difficulties)
- [ ] Spectator mode works
- [ ] `mvn clean compile` passes
- [ ] `mvn test` passes
- [ ] Canvas board renders with wood texture, grid, coordinates
- [ ] Stone placement animates
- [ ] Sound plays on stone click
