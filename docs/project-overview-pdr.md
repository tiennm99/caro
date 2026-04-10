# Caro (Gomoku) — Project Overview & Requirements

## What Is Caro?

Caro (also known as Gomoku or Five-in-a-Row) is a classic strategy board game. This project implements a **multiplayer online version** with:
- Professional 2D game UI (browser-based)
- Real-time server synchronization
- AI opponents at multiple difficulty levels
- Spectator mode to watch ongoing games

**Version:** 0.0.1-beta
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
- **Client (Phaser 3):** 800x800 board with wood texture, stone animations, sound effects, move history panel

### Cross-Protocol Support
- **TCP/Protobuf:** lower latency, binary protocol
- **WebSocket/JSON:** easier browser integration
- Both run simultaneously on different ports (`1024` TCP, `1025` WebSocket by default)

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
| **Server** | Java 25 + Netty 4.1 | Asynchronous, event-driven, low-latency |
| **Network Protocol** | Protobuf (TCP) + JSON/gson (WebSocket) | Dual protocol, language-agnostic |
| **Game Logic** | Pure Java 25 (records, switch expressions) | Board state, move validation, win detection, AI |
| **Client** | Phaser 3 + Vite + Vanilla JS | No framework dependencies (besides Phaser) |
| **Build** | Maven 3.9 + maven-shade-plugin / Vite | Standalone server jar + static client bundle |
| **Deployment** | Docker Compose | Two services: `server` + `client` |

---

## Feature Completeness Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| PVP Multiplayer | DONE | Full room/lobby management |
| PVE AI (3 difficulties) | DONE | Random, heuristic, minimax |
| Spectator Mode | DONE | Real-time game observation |
| Client (Phaser 3) | DONE | Full-featured, polished UI |
| Sound Effects | DONE | Web Audio API (client) |
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
│  (http://...)   │ WS/JSON │  (Vite + JS, :8080) │
└─────────────────┘         └─────────────────────┘
                                      │
                                      │ WebSocket :1025/ratel
                                      ▼
┌─────────────────────────────────────────────────────┐
│  Java 25 Netty Server (com.miti99.caro.server)      │
│  ├─ WebsocketTransferHandler (WS → game events)     │
│  ├─ ProtobufTransferHandler  (TCP → game events)    │
│  └─ ServerEventListener_*    (process moves, AI)    │
└─────────────────────────────────────────────────────┘
```

---

## Roadmap & Status

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | DONE | Convert ratel (Landlords) → Gomoku game logic |
| **Phase 2** | DONE | Clean server/client code, write comprehensive tests (37 tests) |
| **Phase 3** | DONE | Create Phaser 3 client with Vite |
| **Phase 4** | DONE | Modernize CI (GitHub Actions build + test) |
| **Phase 5** | DONE | Refactor to standalone server/client monorepo, Java 25, gson, JUnit 5, package rename com.miti99.caro, Docker Compose canonical deployment (2026-04-10) |
| **Future** | IDEAS | Chat, accounts, leaderboards, better AI, proto-over-WS, mobile |

---

## Getting Started

### Quick Start (Docker Compose)
```bash
git clone https://github.com/tiennm99/caro.git
cd caro
docker compose up --build -d
# Open http://localhost:8080
```

### Quick Start (Local)
```bash
mvn -f server/pom.xml clean package -DskipTests
java -jar server/target/caro-server-0.0.1-beta.jar -p 1024
# In another terminal:
cd client && npm install && npm run dev
# Open http://localhost:5173
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
| Java | 25 (LTS) | Language runtime |
| Netty | 4.1.115.Final | Async networking |
| Protobuf | 3.25.5 | Binary serialization (TCP wire) |
| gson | 2.11.0 | JSON serialization (WS wire) |
| JUnit Jupiter | 5.11.3 | Test framework |
| maven-shade-plugin | 3.6.0 | Fat jar packaging |
| Phaser | 3.87.0 | Web game engine |
| Vite | 6.3.1 | Web bundler |
| Maven | 3.9+ | Java build tool |
| Node.js | 22+ | Client dev tooling |

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
