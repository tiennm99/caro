# Caro (Gomoku) — Project Overview & Requirements

## What Is Caro?

Caro (also known as Gomoku or Five-in-a-Row) is a classic strategy board game. This project implements a **multiplayer online version** with:
- Professional 2D game UI (browser-based)
- Terminal client for lightweight play
- Real-time server synchronization
- AI opponents at multiple difficulty levels
- Spectator mode to watch ongoing games

**Version:** 1.4.0  
**License:** Apache 2.0  
**Base:** Converted from [ainilili/ratel](https://github.com/ainilili/ratel) (Landlords card game framework)

---

## Core Features

### Player vs Player (PVP)
- Create rooms with custom settings
- Join existing rooms to play against other players
- Real-time board synchronization
- Chat notifications and turn indicators

### Player vs AI (PVE)
- Three difficulty levels:
  - **Easy:** Random valid moves
  - **Medium:** Simple heuristic (find winning move, block opponent)
  - **Hard:** Minimax scoring with depth 3+

### Spectator Mode
- Watch ongoing games in real-time
- No ability to interact with board
- Useful for learning strategies

### Game UI
- **Web Client (Phaser 3):** 800x800 board with wood texture, stone animations, sound effects, move history panel
- **CLI Client:** Terminal-based player, keyboard input for moves
- **Built-in Web UI:** Static HTML served from server for quick play

### Cross-Protocol Support
- **TCP/Protobuf:** For CLI clients, lower latency
- **WebSocket/JSON:** For web clients, easier browser integration
- Both run simultaneously on different ports

---

## Game Rules

- **15x15 board** with standard Gomoku rules
- **Black plays first**
- Players alternate placing stones (black/white)
- **Win condition:** First to form an unbroken line of **5 pieces** in any direction (horizontal, vertical, diagonal)
- **Draw:** All 225 board positions filled with no winner
- **Game duration:** Typically 5-30 minutes (depends on player skill)

---

## Target Users

### Primary
- **Casual gamers** — play in browser without installation
- **Competitive players** — real-time multiplayer with friends
- **Learning players** — practice against AI or spectate matches

### Secondary
- **Developers** — fork and extend the codebase (well-structured, documented)
- **Game developers** — use as reference implementation for multiplayer game servers

---

## Technical Stack Summary

| Component | Technology | Details |
|-----------|-----------|---------|
| **Server** | Java 8 + Netty | Asynchronous, event-driven, low-latency |
| **Network Protocol** | Protobuf (TCP) + JSON (WebSocket) | Dual protocol, language-agnostic |
| **Game Logic** | Pure Java | Board state, move validation, win detection, AI |
| **Web Client** | Phaser 3 + Vite + Vanilla JS | No framework dependencies (besides Phaser) |
| **CLI Client** | Java + Scanner | Lightweight, no external libs |
| **Build** | Maven (Java) + npm/Vite (JS) | Standard tooling, easy CI/CD integration |
| **Deployment** | Docker-friendly | Single JAR server, static web client |

---

## Feature Completeness Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| PVP Multiplayer | DONE | Full room/lobby management |
| PVE AI (3 difficulties) | DONE | Random, heuristic, minimax |
| Spectator Mode | DONE | Real-time game observation |
| Web Client (Phaser 3) | DONE | Full-featured, polished UI |
| CLI Client | DONE | Terminal-based gameplay |
| Built-in Web UI | DONE | Static HTML served by server |
| Sound Effects | DONE | Web Audio API (web client) |
| Move Animations | DONE | Phaser physics + tweens |
| Game Replay | NOT IMPLEMENTED | Could store move history |
| Chat During Games | NOT IMPLEMENTED | Messaging layer separate from game |
| Persistent Accounts | NOT IMPLEMENTED | All players anonymous (no login) |
| Leaderboards | NOT IMPLEMENTED | No score tracking across sessions |
| Mobile Responsive | PARTIAL | Desktop-first design, touch not optimized |
| Alternative Board Sizes | NOT IMPLEMENTED | Hardcoded to 15x15 |
| Tournament Mode | NOT IMPLEMENTED | Single games only |

---

## Non-Goals (Out of Scope)

- **Single-player offline mode** — AI is PVE only, requires server
- **Persistent user accounts** — design is stateless, no database
- **Monetization features** — fully open-source, no premium content
- **Complex AI** — current minimax is lightweight; alpha-beta pruning not implemented
- **Cross-platform mobile app** — web-based only
- **Real-time chat** — message system separate from game events
- **Game analytics** — no telemetry or tracking

---

## Success Criteria

### Technical
- All 37 unit tests passing (GomokuHelper + GomokuAI)
- Server handles 100+ concurrent players without latency spike
- Web client loads under 2 seconds on 4G
- Zero data loss during network reconnection

### User Experience
- New player can join game in under 1 minute
- Game moves appear on opponent screen within 500ms
- AI makes moves within 1 second (all difficulties)
- No crashes on invalid input

### Code Quality
- No dead code (lint passes)
- All public methods documented with JSDoc/Javadoc
- File size under 200 lines for maintainability
- CI/CD pipeline green (build + test + deploy)

---

## Architecture Overview (High-Level)

```
┌─────────────────┐         ┌─────────────────────┐
│  Web Browser    │◄───────►│  Phaser 3 Client    │
│  (http://...)   │ WS/JSON │  (Vite + JS)        │
└─────────────────┘         └─────────────────────┘
        ▲
        │ HTTP (static files)
        │
┌───────┴─────────────────────────────────────────────┐
│  Java Netty Server (TCP + WebSocket)                │
│  ├─ StaticFileHandler  (serve index.html, CSS, JS)  │
│  ├─ WebsocketTransferHandler (WS → game events)     │
│  ├─ ProtobufTransferHandler  (TCP → game events)    │
│  └─ ServerEventListener_* (process moves, AI)       │
└───────┬─────────────────────────────────────────────┘
        │
    TCP │ Protobuf
        │
┌─────────────────┐
│  CLI Client     │
│  (Java console) │
└─────────────────┘
```

---

## Roadmap & Status

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | DONE | Convert ratel (Landlords) → Gomoku game logic |
| **Phase 2** | DONE | Clean server/client code, modernize Java |
| **Phase 3** | DONE | Write comprehensive tests (37 tests) |
| **Phase 4** | DONE | Add built-in web UI (StaticFileHandler) |
| **Phase 5** | DONE | Create Phaser 3 web client with Vite |
| **Phase 6** | DONE | Modernize CI/CD, auto-deploy to GitHub Pages |
| **Future** | IDEAS | Chat, accounts, leaderboards, better AI, mobile |

---

## Getting Started

### Quick Start (Browser)
```bash
git clone https://github.com/tiennm99/caro.git
cd caro
mvn clean package -DskipTests
java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
# Open http://localhost:1025 or http://localhost:5173 (after npm run dev in web-client/)
```

### Quick Start (CLI)
```bash
java -jar landlords-client/target/landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024
```

See `deployment-guide.md` for detailed setup instructions.

---

## Key Stakeholders & Maintainers

- **Maintainer:** @tiennm99
- **Original Framework:** @ainilili ([ratel](https://github.com/ainilili/ratel))
- **Contributors:** Community forks welcome

---

## Dependencies & Versions

| Dependency | Version | Purpose |
|-----------|---------|---------|
| Java | 8+ | Language runtime |
| Netty | Latest (pom.xml) | Async networking |
| Protobuf | 3.25.5 | Binary serialization |
| Phaser | 3.87.0 | Web game engine |
| Vite | 6.3.1 | Web bundler |
| Maven | 3.6+ | Java build tool |
| Node.js | 18+ | Web dev tooling |

---

## Known Limitations

1. **No persistence** — all games lose history after server restart
2. **Single board size** — only 15x15, no custom dimensions
3. **No accounts** — players are anonymous by nickname
4. **AI depth limited** — minimax scores at depth 3 only
5. **No chat** — games-only communication
6. **Desktop-first** — web client not mobile optimized
7. **No replay** — games not recorded or reviewable

---

## Contributing & License

- License: **Apache 2.0** (see LICENSE file)
- Public source: https://github.com/tiennm99/caro
- Contributions: Fork, branch, PR welcome
- Code style: See `code-standards.md`

All contributions must:
- Pass all unit tests
- Follow code standards
- Include Javadoc/JSDoc for public methods
- Not introduce dead code (linting clean)
