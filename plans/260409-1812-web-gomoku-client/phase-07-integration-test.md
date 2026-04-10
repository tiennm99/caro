# Phase 7: Integration Test + Polish

## Context Links
- All prior phases

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 0.5h
- **Depends on:** Phases 1-6

End-to-end validation of the full game flow. Compile check, server startup, browser testing across all game modes.

## Test Matrix

### Build Verification
- [ ] `mvn clean compile` passes
- [ ] `mvn test` passes
- [ ] `mvn package` produces runnable JAR

### Server Startup
- [ ] Start server: `java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024`
- [ ] WebSocket port 1025 open
- [ ] `curl http://localhost:1025/` returns HTML
- [ ] `curl http://localhost:1025/css/style.css` returns CSS with correct Content-Type
- [ ] `curl http://localhost:1025/js/game-state.js` returns JS with correct Content-Type
- [ ] `curl http://localhost:1025/nonexistent` returns 404

### Security
- [ ] `curl http://localhost:1025/../../../etc/passwd` returns 403 or 404 (no traversal)
- [ ] `curl http://localhost:1025/js/../../../pom.xml` returns 403 or 404

### WebSocket Compatibility
- [ ] Existing Java CLI client still connects via TCP port 1024
- [ ] Existing Java CLI client still connects via WS port 1025 `/ratel`

### PVP Flow (2 browser tabs)
- [ ] Tab 1: open `http://localhost:1025/`, enter nickname, reach lobby
- [ ] Tab 1: PVP -> Create Room -> see waiting room with room ID
- [ ] Tab 2: open `http://localhost:1025/`, enter nickname, reach lobby
- [ ] Tab 2: PVP -> Room List -> see room from Tab 1 -> Join
- [ ] Both tabs: game starts, board renders with player names
- [ ] Tab 1 (black): click intersection -> stone appears on both tabs
- [ ] Tab 2 (white): click intersection -> stone appears on both tabs
- [ ] Alternating turns work correctly
- [ ] Move history updates on both tabs
- [ ] Turn indicator switches on both tabs
- [ ] Sound plays on stone placement
- [ ] Play to completion -> game over screen shows on both
- [ ] Winner sees "You Win!", loser sees "You Lose!"
- [ ] Both click "Rematch" -> new game starts
- [ ] One clicks "Exit" -> both return to lobby

### PVE Flow
- [ ] Enter nickname, lobby, PVE -> Easy
- [ ] Game starts immediately (no waiting)
- [ ] Player places stone, AI responds
- [ ] AI moves render with animation
- [ ] Game reaches conclusion (play or resign)

### Spectator Flow
- [ ] Tab 1+2: start PVP game
- [ ] Tab 3: open game, enter nickname, PVP -> Room List -> Watch
- [ ] Tab 3: sees board with existing moves
- [ ] Tab 3: new moves appear in real-time
- [ ] Tab 3: clicking board does nothing (spectator)
- [ ] Tab 3: "Spectating" label visible
- [ ] Tab 3: "Exit Watch" returns to lobby

### Error Handling
- [ ] Join nonexistent room -> toast "Room not found"
- [ ] Join full room -> toast "Room is full"
- [ ] Click out of turn -> no action (client-side block)
- [ ] Server stops -> reconnect message shown
- [ ] Refresh page -> reconnects, shows nickname screen

### Responsive
- [ ] Desktop (1920x1080): full layout with sidebars
- [ ] Tablet (768px): sidebars collapse or stack
- [ ] Board remains square and usable at all sizes

### Performance
- [ ] Page load < 1s (all assets local)
- [ ] No console errors during full game flow
- [ ] No memory leaks (monitor heap during 50-move game)

## Polish Items (if time permits)
- Smooth screen transitions (CSS opacity/transform)
- Hover effects on all interactive elements
- Keyboard shortcut: Enter submits nickname
- Room list auto-refresh every 5s while on that screen
- Connection status indicator in header

## Success Criteria

All items in the test matrix checked. Build compiles, tests pass, all three game modes (PVP, PVE, Spectator) functional end-to-end.

## Rollback

If integration fails:
1. Server issue: revert `WebsocketProxy.java` change (remove `StaticFileHandler` from pipeline). One-line revert.
2. Client issue: delete `static/` directory. No server code references it.
3. Both changes are additive — no existing functionality modified.
