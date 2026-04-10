# Phase 4: Client — Canvas Board Rendering

## Context Links
- [Phase 3](phase-03-client-connection-state.md) — state machine this renders from
- [ServerEventListener_CODE_GAME_MOVE.java](../../landlords-server/src/main/java/org/nico/ratel/landlords/server/event/ServerEventListener_CODE_GAME_MOVE.java) — move data format

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 2h
- **Depends on:** Phase 3

Canvas-based 15x15 Gomoku board with wood texture background, grid lines, coordinate labels, stone rendering with placement animation, and click-to-move input.

## Key Insights

- Board is 15x15 with intersections (not cells) — stones placed on line crossings
- Canvas needs to be responsive (resize with container)
- Only redraw what changed: full board on init, single stone on move
- Click detection: map pixel coords to nearest grid intersection
- Animation: stone scales from 0 to 1 over ~150ms on placement
- Last move indicator: small dot or highlight on most recent stone
- Coordinate labels: A-O columns, 1-15 rows along edges

## Architecture

### Canvas Layout (conceptual)

```
padding (40px) for labels
  |
  v
  A  B  C  D  E  ... O
1  +--+--+--+--+--...+
2  +--+--+--+--+--...+
.  .  .  .  .  .     .
15 +--+--+--+--+--...+
```

### Coordinate System

```
PADDING = 40  (space for labels)
cellSize = (canvasSize - 2 * PADDING) / 14  (14 gaps for 15 lines)
gridX(col) = PADDING + col * cellSize
gridY(row) = PADDING + row * cellSize
```

### Rendering Layers (draw order)

1. **Background** — fill with wood color (`#dcb35c`) or CSS gradient
2. **Grid lines** — 15 horizontal + 15 vertical lines
3. **Star points** — 5 dots at standard positions: (3,3), (3,11), (7,7), (11,3), (11,11)
4. **Coordinate labels** — letters top/bottom, numbers left/right
5. **Stones** — iterate `GameState.gameData.moves`, draw circles with gradients
6. **Last move marker** — small red dot on center of last placed stone
7. **Hover indicator** — semi-transparent stone at nearest intersection (if player's turn)

### Stone Rendering

- Black: radial gradient from `#444` (top-left highlight) to `#111`
- White: radial gradient from `#fff` to `#ddd` with thin `#999` border
- Radius: `cellSize * 0.43` (slight gap between adjacent stones)
- Shadow: `ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(0,0,0,0.5)'`

## Related Code Files

### Files to Create
- `landlords-server/src/main/resources/static/js/game-board.js` (~190 lines)

### Files Referenced
- `game-state.js` — reads `GameState.gameData.moves`, `GameState.isBlack`, `GameState.gameData.currentTurn`
- `game-connection.js` — calls `GameConnection.send('CODE_GAME_MOVE', {row, col})`

## Implementation Steps

### Step 1: Canvas setup and sizing

```js
const GameBoard = {
  canvas: null,
  ctx: null,
  cellSize: 0,
  PADDING: 40,
  BOARD_SIZE: 15,
  animatingStone: null,  // {row, col, piece, progress, startTime}
  hoverPos: null,        // {row, col} or null

  init() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleHover(e));
    this.canvas.addEventListener('mouseleave', () => { this.hoverPos = null; this.draw(); });
  },

  resize() {
    const container = this.canvas.parentElement;
    const size = Math.min(container.clientWidth, container.clientHeight, 700);
    this.canvas.width = size;
    this.canvas.height = size;
    this.cellSize = (size - 2 * this.PADDING) / (this.BOARD_SIZE - 1);
    this.draw();
  }
};
```

### Step 2: Drawing functions

- `draw()` — clear canvas, call drawBoard, drawStones, drawHover
- `drawBoard()` — fill background, draw grid lines, star points, labels
- `drawStone(row, col, piece, alpha)` — draw single stone with gradient, optional alpha for animation/hover
- `drawStones()` — iterate moves array, draw each; for last move add red dot marker
- `drawHover()` — if hoverPos set and it's player's turn and position empty, draw semi-transparent stone

### Step 3: Click handling

```js
handleClick(e) {
  if (GameState.isSpectator) return;
  const rect = this.canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const col = Math.round((x - this.PADDING) / this.cellSize);
  const row = Math.round((y - this.PADDING) / this.cellSize);
  if (row < 0 || row >= this.BOARD_SIZE || col < 0 || col >= this.BOARD_SIZE) return;

  // Check it's our turn
  const myPiece = GameState.isBlack ? 'BLACK' : 'WHITE';
  if (GameState.gameData.currentTurn !== myPiece) return;

  // Check position not occupied (client-side pre-check)
  const occupied = GameState.gameData.moves.some(m => m.row === row && m.col === col);
  if (occupied) return;

  GameConnection.send('CODE_GAME_MOVE', JSON.stringify({row, col}));
}
```

### Step 4: Stone placement animation

On `CODE_GAME_MOVE_SUCCESS`:
1. Set `animatingStone = {row, col, piece, startTime: Date.now()}`
2. Run `requestAnimationFrame` loop for 150ms
3. Draw stone with `scale = easeOutBack(progress)` where progress = elapsed/150
4. After animation completes, set `animatingStone = null`, full redraw

### Step 5: Register event handlers

```js
GameState.on('CODE_GAME_STARTING', () => {
  GameBoard.init();  // or re-init
  GameBoard.draw();
});

GameState.on('CODE_GAME_MOVE_SUCCESS', (data) => {
  GameBoard.animateStone(data.row, data.col, data.piece);
});
```

## Todo List

- [ ] Create `game-board.js` with `GameBoard` global object
- [ ] Implement canvas sizing with ResizeObserver or resize event
- [ ] Draw wood-colored background
- [ ] Draw 15x15 grid lines
- [ ] Draw star points (5 standard positions)
- [ ] Draw coordinate labels (A-O, 1-15)
- [ ] Draw black stones with radial gradient + shadow
- [ ] Draw white stones with radial gradient + border
- [ ] Draw last-move indicator (red dot)
- [ ] Implement click-to-grid-intersection mapping
- [ ] Client-side turn + occupied validation before sending
- [ ] Stone placement animation (scale easeOutBack, 150ms)
- [ ] Hover indicator (semi-transparent stone preview)
- [ ] Register for `CODE_GAME_STARTING` and `CODE_GAME_MOVE_SUCCESS` events
- [ ] Test: visual check of board rendering in browser

## Success Criteria

- Board renders centered with grid, labels, star points
- Black/white stones render with gradient and shadow
- Clicking an intersection sends move to server
- Clicking occupied position or out of turn does nothing
- New stones animate in with scale effect
- Last move has red dot indicator
- Hover shows preview stone
- Board resizes cleanly when window resizes
- File under 200 lines

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Click position off by one pixel | Use `Math.round()` to snap to nearest intersection |
| Canvas blurry on HiDPI | Multiply canvas dimensions by `devicePixelRatio`, scale context |
| Animation jank | Use `requestAnimationFrame`, keep draw logic simple |
| Hover flicker | Only redraw on position change, debounce moves |
