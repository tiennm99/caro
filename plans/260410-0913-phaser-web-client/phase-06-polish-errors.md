# Phase 6: Polish + Error Handling

## Context Links
- [Plan overview](plan.md)
- [Phase 2: Services](phase-02-services-layer.md) -- reconnect logic lives here
- [Phase 3: Menu](phase-03-boot-menu-scenes.md) -- toast system
- [Phase 4: Game](phase-04-game-scene-board.md) -- game-ui.js toast

## Overview
- **Priority:** P2
- **Status:** Pending
- **Blocked by:** Phase 5
- **Description:** Cross-cutting improvements: connection lost overlay, reconnect UX, hover effects, sound placeholders, input validation hardening, manual integration test checklist.

## Implementation Steps

### 1. Connection Lost Overlay (~20 lines in `game-ui.js`)

Add to `index.html`:
```html
<div id="connection-lost" class="hidden">
  <div class="connection-card">
    <h2>Connection Lost</h2>
    <p>Reconnecting<span id="reconnect-dots">...</span></p>
  </div>
</div>
```

- `eventBus.on('ws:disconnected')` -> show overlay (full-screen semi-transparent)
- `eventBus.on('ws:connected')` -> hide overlay
- If reconnect succeeds, server treats it as a new client (old room is gone). Redirect to BootScene.

### 2. Board Hover Effect (~15 lines in `game-scene.js`)

- On `pointermove`: calculate nearest intersection
- If valid + empty + my turn: draw a semi-transparent stone preview at that position
- On `pointerout` or click: clear preview
- Use a single reusable Graphics object for the preview (no object churn)

### 3. Input Validation Hardening

**Nickname input (`menu-ui.js`):**
- Trim whitespace
- Reject empty or >10 chars client-side before sending (avoid server round-trip)
- Disable submit button while waiting for server response

**Click debounce (`game-scene.js`):**
- After sending a move, set `awaitingResponse = true`
- On `CODE_GAME_MOVE_SUCCESS` or any move error: set `awaitingResponse = false`
- Reject clicks while `awaitingResponse` is true
- Prevents double-click sending duplicate moves

### 4. Toast System Consolidation

Both `menu-ui.js` and `game-ui.js` need toast capability. Extract shared toast logic:
- Add `#toast-container` to `index.html` at top level (outside scene-specific containers)
- Create `showToast(msg, type='error', duration=2500)` function in `game-ui.js` (reuse from menu too)
- Types: `error` (red), `info` (blue), `success` (green)
- Auto-dismiss with CSS fade-out animation

### 5. Keyboard Shortcuts

- `Escape` during game: show confirmation "Exit game?" dialog
- `Enter` on nickname input: submit (already handled if form has submit event)

### 6. WS URL Configuration

- Check `?ws=` URL parameter for custom server address
- Fallback: `ws://localhost:1025/ratel`
- Display connected server address in BootScene
- Example: `http://localhost:5173/?ws=ws://192.168.1.5:1025/ratel`

### 7. Responsive Layout

- Phaser `Scale.FIT` handles canvas scaling
- DOM overlays: use viewport-relative units (vh/vw) and max-width for panels
- Test at 800x800, 1920x1080, 1366x768 browser sizes
- Mobile: not a priority but should not break entirely

## Integration Test Checklist (Manual)

Run server: `java -jar landlords-server/target/landlords-server-*.jar -p 1024`
(WebSocket will be on port 1025)

Open client: `http://localhost:5173/?ws=ws://localhost:1025/ratel`

### Connection Flow
- [ ] Client connects, shows "Connecting..."
- [ ] After ~2s, nickname prompt appears
- [ ] Enter valid nickname (1-10 chars), lobby appears
- [ ] Enter invalid nickname (empty / >10), error shown, re-prompted

### PVP Flow
- [ ] Create room, waiting screen shows room ID
- [ ] Open second browser tab, join room by ID
- [ ] Game starts, board renders with player info
- [ ] Black player moves first, click places stone
- [ ] White player's turn, black player click rejected locally
- [ ] Play until 5-in-a-row, game over screen shows winner
- [ ] Both click Rematch, new game starts with cleared board
- [ ] One player exits, other returns to lobby
- [ ] Test room list refresh shows available rooms

### PVE Flow
- [ ] Select PVE, choose difficulty
- [ ] Game starts immediately (player is black)
- [ ] Place stone, AI responds automatically
- [ ] Play until game over
- [ ] Exit returns to lobby

### Spectator Flow
- [ ] Start a PVP game in two tabs
- [ ] Third tab: spectate the room
- [ ] Spectator sees moves in real-time
- [ ] Spectator cannot click to place stones
- [ ] Game over shown to spectator
- [ ] Spectator exits, returns to lobby

### Error Handling
- [ ] Close server: "Connection Lost" overlay appears
- [ ] Restart server: client reconnects, returns to nickname prompt
- [ ] Join non-existent room: error toast
- [ ] Join full room: error toast
- [ ] Rapid-click same position: no duplicate requests

## Todo List
- [ ] Add connection-lost overlay to `index.html` and wire in `game-ui.js`
- [ ] Add board hover preview in `game-scene.js`
- [ ] Add click debounce in `game-scene.js`
- [ ] Add client-side nickname validation in `menu-ui.js`
- [ ] Consolidate toast system in `game-ui.js`
- [ ] Add WS URL parameter support in `boot-scene.js`
- [ ] Add Escape key handler in `game-scene.js`
- [ ] Test responsive layout at multiple sizes
- [ ] Run full integration test checklist

## Success Criteria
- [ ] Connection lost overlay appears/disappears correctly
- [ ] Hover preview shows semi-transparent stone at valid positions
- [ ] No duplicate move requests on rapid clicks
- [ ] All integration test checklist items pass
- [ ] No console errors during normal gameplay
- [ ] All JS files remain under 200 lines

## Risk Assessment
- **Reconnect creates new identity:** Server has no session resumption. This is a known limitation. After reconnect, user must re-enter nickname and rejoin. Document this, don't over-engineer.
- **Hover performance:** Redrawing preview on every pointermove could lag. Mitigation: use a single Graphics object, clear+redraw only when intersection changes (cache last hover position).

## File Ownership Summary (All Phases)

| File | Owner Phase | Touched By |
|------|------------|------------|
| `package.json` | 1 | 1 only |
| `vite.config.js` | 1 | 1 only |
| `index.html` | 1 | 3, 4, 5, 6 (DOM additions) |
| `main.js` | 1 | 1 only |
| `game-config.js` | 1 | 3, 4 (scene list) |
| `protocol-constants.js` | 2 | 2 only |
| `event-bus.js` | 2 | 2 only |
| `connection-service.js` | 2 | 2, 6 (reconnect polish) |
| `game-state-service.js` | 2 | 2, 4, 5 (game methods) |
| `boot-scene.js` | 3 | 3, 6 (WS URL param) |
| `menu-scene.js` | 3 | 3 only |
| `menu-ui.js` | 3 | 3, 6 (validation) |
| `board.js` | 4 | 4 only |
| `stone.js` | 4 | 4 only |
| `game-scene.js` | 4 | 4, 5, 6 (game over, spectator, hover) |
| `game-ui.js` | 4 | 4, 5, 6 (game over overlay, toast, connection) |

Note: Phases are sequential so file ownership conflicts are not possible.
