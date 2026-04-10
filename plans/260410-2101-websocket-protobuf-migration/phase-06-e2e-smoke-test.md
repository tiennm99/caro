# Phase 06 — End-to-End Smoke Test

## Context Links
- [plan.md](plan.md)
- [phase-02a-dispatcher-scaffolding.md](phase-02a-dispatcher-scaffolding.md)
- [phase-02b-migrate-handlers.md](phase-02b-migrate-handlers.md)
- [phase-04-client-protobuf.md](phase-04-client-protobuf.md)
- [phase-05-infra-and-docs.md](phase-05-infra-and-docs.md)

## Overview
- **Priority:** P1 (gate on merge)
- **Status:** pending (blocked by Phase 05)
- Live manual validation that the full stack — server + client — works over the new binary protobuf WebSocket on port 1999. Catches integration bugs that unit tests don't cover (wire format, pipeline ordering, heartbeat across real network).

## Key Insights
- Unit tests are pure logic (GomokuHelperTest, GomokuAITest) — they cannot catch wire-format regressions.
- The server+client integration has no automated test harness today. Manual smoke is the realistic gate.
- Must exercise every oneof variant that carries non-trivial fields: `setNickname`, `createPveRoom`, `joinRoom`, `gameMove`, and the outbound `gameMoveSuccess`, `gameStarting`, `gameOver`, `showRooms`, `roomCreateSuccess`. Empty-oneof variants (heartbeat, getRooms, createRoom, gameReady, clientExit) are exercised as side effects.
- Wire-format assertions now check that decoded `Response.payloadCase` matches expectations — not JSON text.

## Requirements
**Functional**
- All below test cases pass on a freshly built stack.

**Non-functional**
- All WS frames in devtools are binary (not text).
- Server logs show event dispatch without errors.

## Test Matrix
| # | Scenario | Expected |
|---|---|---|
| 1 | `docker compose up --build`, open `http://localhost:8080` | Client loads, Phaser boots |
| 2 | Enter nickname, click confirm | Server log: `client do: CODE_CLIENT_NICKNAME_SET`; client advances to lobby |
| 3 | Click "Create PVE room" | Room created, game board renders |
| 4 | Place a move on board | Server log: `GAME_MOVE`; move appears, AI responds |
| 5 | Continue playing until win/loss | `GAME_OVER` event received; UI shows result |
| 6 | Leave tab open 1 min | Heartbeat frames visible in devtools every 50s; no disconnect |
| 7 | Kill server container (`docker compose stop server`) | Client detects disconnect, shows reconnect state |
| 8 | Restart server (`docker compose start server`) | Client reconnects with backoff |
| 9 | DevTools -> Network -> WS tab | All frames show as binary (hex), no text; inspector shows typed proto fields (row/col/piece) not JSON strings |
| 10 | Open second browser tab, create PVP room + join from first | Both clients see room list, join works, GAME_STARTING fires |

## Architecture
N/A — test phase. Uses docker compose stack from Phase 05.

## Related Code Files
None modified in this phase.

## Implementation Steps
1. `docker compose down -v` (clean slate).
2. `docker compose up --build -d`.
3. `docker compose logs -f caro-server` in a second shell.
4. Open `http://localhost:8080` in Chrome. DevTools -> Network -> WS.
5. Walk through test matrix 1-10.
6. Record pass/fail per row. On fail: capture server log + devtools frame + reproduce steps.
7. `docker compose down`.

## Todo List
- [ ] Test 1: stack boots
- [ ] Test 2: nickname set
- [ ] Test 3: PVE room create
- [ ] Test 4: game move dispatched
- [ ] Test 5: game over delivered
- [ ] Test 6: heartbeat keeps channel alive
- [ ] Test 7: disconnect detected
- [ ] Test 8: reconnect succeeds
- [ ] Test 9: WS frames verified binary
- [ ] Test 10: PVP two-tab flow
- [ ] Tear down, commit nothing (or ship any last-minute fix commit)

## Success Criteria
- All 10 test rows pass.
- No uncaught exceptions in server logs during the walkthrough.
- No JS console errors client-side.
- DevTools confirms binary WS framing.

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Integration bug only visible with two clients (race in room join) | Medium | Medium | Test 10 explicitly covers two-tab PVP |
| Pbjs field name vs server expected JSON inner string mismatch | Low | Medium | Inner data round-trips as opaque string; low risk |
| Heartbeat timing drift causes idle disconnect | Low | Medium | Test 6 waits long enough to prove 50s beat keeps 30min idle handler happy (well within margin) |
| Chrome caches old JS bundle | Low | Low | Hard-refresh; Vite build produces hashed filenames in docker image |

## Security Considerations
- Only localhost testing. Production hardening (TLS/wss) is out of scope for this refactor.

## Next Steps
- On all-green: merge branch, tag release, announce single-port 1999 to any API consumers.
- On failure: fix in appropriate phase, rerun Phase 06 from step 1.
