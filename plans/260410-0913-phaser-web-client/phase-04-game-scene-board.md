# Phase 4: Game Scene + Board Rendering

## Context Links
- [Plan overview](plan.md)
- [Phase 3: Boot + Menu](phase-03-boot-menu-scenes.md)
- Server move handler: `landlords-server/.../event/ServerEventListener_CODE_GAME_MOVE.java`
- Server game starting: `landlords-server/.../event/ServerEventListener_CODE_GAME_STARTING.java`
- Move success data: `{row, col, piece("BLACK"/"WHITE"), playerNickname, playerId}`
- Board size: 15x15 (from `Board.BOARD_SIZE`)

## Overview
- **Priority:** P1
- **Status:** Pending
- **Blocked by:** Phase 3
- **Description:** Render the Gomoku board using Phaser Graphics, handle click-to-place, display player info and turn indicator via DOM panel.

## Key Insights
- `CODE_GAME_STARTING` data: `{roomId, blackPlayerId, blackPlayerNickname, whitePlayerId, whitePlayerNickname, boardSize: 15}`
- Player determines their color by comparing `gameState.clientId` to `blackPlayerId`
- Turn alternates: black always first. Client tracks turn locally via move count (odd=black, even=white) or by checking `playerId` in move success
- `CODE_GAME_MOVE_SUCCESS` is broadcast to BOTH players (and spectators). Client must render the move regardless of who made it.
- Move errors (`OCCUPIED`, `OUT_OF_BOUNDS`, `NOT_YOUR_TURN`, `INVALID`) only sent to the player who attempted the invalid move

## Architecture

### Board Rendering (Phaser Graphics)
```
800x800 canvas
  Margin: 40px each side -> play area: 720x720
  Grid: 15x15 intersections (14 gaps)
  Cell size: 720 / 14 = ~51.4px
  Grid lines: Phaser.Graphics lines, color #8B7355 (wood brown)
  Star points: 5 dots at standard Gomoku positions (3,3), (3,11), (7,7), (11,3), (11,11)
  
  Stone: Phaser.Graphics circle, radius ~22px
    BLACK: radial gradient fill #111 -> #333
    WHITE: radial gradient fill #fff -> #ddd
    Placement animation: scale tween 0 -> 1 over 150ms, ease 'Back.easeOut'
  
  Last move indicator: small colored dot or ring on the most recent stone
  
  Click detection: pointer event on canvas, snap to nearest intersection
    - Calculate (row, col) from pointer position
    - Reject if not player's turn (local check before sending)
    - Send CODE_GAME_MOVE with {row, col}
```

### Coordinate Mapping
```
boardX(col) = MARGIN + col * CELL_SIZE
boardY(row) = MARGIN + row * CELL_SIZE

colFromX(x) = Math.round((x - MARGIN) / CELL_SIZE)
rowFromY(y) = Math.round((y - MARGIN) / CELL_SIZE)

Clamp to [0, 14] range
```

### DOM Game Panel (game-ui.js)
- Player info bar (top or side): black player name, white player name, highlight active turn
- Move history panel (optional, scrollable): list of moves with row,col
- Toast area for errors ("Not your turn!", "Position occupied")

## Related Code Files

### Files to Create
- `web-client/src/scenes/game-scene.js`
- `web-client/src/objects/board.js`
- `web-client/src/objects/stone.js`
- `web-client/src/ui/game-ui.js`

### Files to Modify
- `web-client/src/config/game-config.js` -- add GameScene to scene list
- `web-client/src/services/game-state-service.js` -- add board update methods

## Implementation Steps

### 1. `board.js` (~120 lines) -- Phaser GameObject

Board rendering class:
- `constructor(scene, config)` -- config has margin, cellSize, boardSize
- `drawGrid()` -- draw 15 horizontal + 15 vertical lines using `scene.add.graphics()`
- `drawStarPoints()` -- 5 filled circles at standard positions
- `drawLabels()` -- optional: row numbers (0-14) and column letters along edges
- `getIntersection(pointerX, pointerY)` -- returns `{row, col}` snapped to nearest intersection, or null if too far from any intersection (tolerance: cellSize * 0.4)
- `getCenterPosition(row, col)` -- returns `{x, y}` canvas coordinates
- Constants: `MARGIN = 40`, `CELL_SIZE`, `BOARD_SIZE = 15`
- Export class

### 2. `stone.js` (~60 lines) -- Phaser GameObject

Stone rendering:
- `constructor(scene, x, y, piece)` -- piece is "BLACK" or "WHITE"
- Draw filled circle with gradient-like effect:
  - Main circle with fill color
  - Smaller inner circle offset for 3D highlight effect
- `playPlaceAnimation()` -- scale tween from 0 to 1, 150ms, Back.easeOut
- `setLastMoveIndicator(show)` -- add/remove small red dot at center
- Export class

### 3. `game-scene.js` (~150 lines)

```
constructor: super({ key: 'GameScene' })

create():
  - Read game info from gameState (set by MenuScene before transition)
  - Create Board object
  - Create stones container (empty initially)
  - Setup game-ui.js DOM panel (player names, turn indicator)
  - Register eventBus listeners:
    - CODE_GAME_MOVE_SUCCESS: placeStone(data)
    - CODE_GAME_MOVE_OCCUPIED: gameUi.showToast('Position occupied')
    - CODE_GAME_MOVE_OUT_OF_BOUNDS: gameUi.showToast('Out of bounds')
    - CODE_GAME_MOVE_NOT_YOUR_TURN: gameUi.showToast('Not your turn')
    - CODE_GAME_MOVE_INVALID: gameUi.showToast('Invalid move')
    - CODE_GAME_OVER: handled in Phase 5
    - CODE_CLIENT_EXIT: opponent left, show message, return to menu
    - CODE_CLIENT_KICK: kicked for idle, return to menu
  - Setup pointer click handler on canvas

handleClick(pointer):
  - If spectating, ignore
  - If not my turn (local check), ignore (avoid unnecessary server round-trip)
  - board.getIntersection(pointer.x, pointer.y) -> {row, col}
  - If null (clicked too far from intersection), ignore
  - If gameState.board[row][col] != null (local occupied check), ignore
  - connectionService.send(CODE_GAME_MOVE, JSON.stringify({row, col}))

placeStone(data):
  - {row, col, piece, playerNickname, playerId} = data
  - pos = board.getCenterPosition(row, col)
  - Create new Stone(scene, pos.x, pos.y, piece)
  - stone.playPlaceAnimation()
  - Remove last-move indicator from previous stone, add to this one
  - gameState.board[row][col] = piece
  - gameState.moves.push(data)
  - Update turn: gameState.isMyTurn = (data.playerId !== gameState.clientId)
  - gameUi.updateTurn(gameState.isMyTurn)
  - gameUi.addMoveToHistory(data)

shutdown():
  - Unsubscribe all eventBus listeners
  - gameUi.hide()
```

### 4. `game-ui.js` (~100 lines)

DOM manipulation for in-game panels:
- `show(blackName, whiteName, isBlack)` -- create/show player info bar
  - Two player cards: name + piece color indicator
  - Highlight current turn
- `updateTurn(isMyTurn)` -- toggle highlight between player cards, show "Your turn" / "Opponent's turn"
- `addMoveToHistory(moveData)` -- append to scrollable move list
- `showToast(msg)` -- temporary error message, auto-fade after 2s
- `hide()` -- remove DOM elements

Add DOM containers to `index.html`:
```html
<div id="game-panel" class="hidden">
  <div id="player-info"></div>
  <div id="move-history"></div>
  <div id="toast-container"></div>
</div>
```

### 5. Update `game-state-service.js`

Add methods:
- `initGame(startingData)` -- set roomId, player IDs/names, isBlack, isMyTurn (black goes first), init board 15x15 nulls
- `updateBoard(row, col, piece)` -- set board[row][col]
- `isMyTurn` getter based on current state

## Todo List
- [ ] Create `board.js` with grid, star points, coordinate mapping
- [ ] Create `stone.js` with circle rendering and placement tween
- [ ] Create `game-ui.js` with player info, turn indicator, toast
- [ ] Create `game-scene.js` wiring board + stones + events + clicks
- [ ] Add `#game-panel` DOM structure to `index.html`
- [ ] Update `game-config.js` scene list
- [ ] Update `game-state-service.js` with game init and board methods
- [ ] Test: click to place stone, see it appear after server confirms
- [ ] Test: opponent's move appears with animation
- [ ] Test: error toasts on invalid moves

## Success Criteria
- [ ] 15x15 board renders with grid lines and star points
- [ ] Clicking intersection sends move to server
- [ ] Confirmed moves appear as stones with placement animation
- [ ] Last move indicator visible
- [ ] Turn indicator updates correctly
- [ ] Error toasts display and auto-dismiss
- [ ] Spectator mode: board renders moves but clicks are ignored
- [ ] All files under 150 lines, JSDoc on exports

## Risk Assessment
- **Click precision on small screens:** `CELL_SIZE` may be small on mobile. Mitigation: Phaser `Scale.FIT` + generous snap tolerance (40% of cell size).
- **Rapid successive moves in PVE:** AI responds instantly, two `CODE_GAME_MOVE_SUCCESS` events arrive back-to-back. Ensure `placeStone` is idempotent and animation queue doesn't break. Each stone is an independent tween -- no sequential dependency needed.
- **Canvas vs DOM event conflict:** Phaser pointer events and DOM overlay events can conflict. Mitigation: hide DOM overlays when GameScene is active; game-panel is positioned outside the canvas clickable area (above or beside).

## Next Steps
- Phase 5: Game over + spectator (depends on this phase)
