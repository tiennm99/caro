# Phase 5: Game Over + Spectator Mode

## Context Links
- [Plan overview](plan.md)
- [Phase 4: Game Scene](phase-04-game-scene-board.md)
- Server game over: `landlords-server/.../event/ServerEventListener_CODE_GAME_MOVE.java` lines 115-131
- Server ready handler: `landlords-server/.../event/ServerEventListener_CODE_GAME_READY.java`
- Server watch handler: `landlords-server/.../event/ServerEventListener_CODE_GAME_WATCH.java`
- Spectator event wrapper: `ClientEventListener_CODE_GAME_WATCH.java` -- `{code, data}` wrapping

## Overview
- **Priority:** P2
- **Status:** Pending
- **Blocked by:** Phase 4
- **Description:** Handle game end (win/lose/draw), rematch flow, opponent disconnect, and spectator mode viewing.

## Key Insights

### Game Over
- `CODE_GAME_OVER` data: `{result: "BLACK_WIN"|"WHITE_WIN"|"DRAW", winnerNickname: string, board: string}`
- Sent to both players and spectators
- After game over, players can send `CODE_GAME_READY` to signal rematch willingness
- `CODE_GAME_READY` response: `{clientNickName, status: "READY"|"NO_READY", clientId}`
- Ready is a toggle -- sending again toggles back to NO_READY
- When both players are READY, server auto-fires `CODE_GAME_STARTING` again (new game, same room)

### Opponent Disconnect
- `CODE_CLIENT_EXIT` data (to player): `{roomId, exitClientId, exitClientNickname}` -- room is destroyed server-side
- `CODE_CLIENT_KICK` data: client nickname string -- idle kick, room destroyed
- After either, client should return to lobby (server sends `CODE_SHOW_OPTIONS` after cleanup)

### Spectator Mode
- Spectator receives `CODE_GAME_WATCH` events wrapping inner events: `{code: "CODE_...", data: ...}`
- Inner codes: `CODE_ROOM_JOIN_SUCCESS`, `CODE_GAME_STARTING`, `CODE_GAME_MOVE_SUCCESS`, `CODE_CLIENT_EXIT`, `CODE_CLIENT_KICK`, `CODE_GAME_OVER`
- Spectator also receives `CODE_GAME_WATCH_SUCCESSFUL` directly: `{owner, status}`
- Spectator exits by sending `CODE_GAME_WATCH_EXIT`, then navigates back to menu
- Spectator CANNOT make moves, ready up, or interact with game

## Architecture

### Game Over Flow
```
CODE_GAME_OVER received
  -> GameScene: disable click handler
  -> Show GameOverScene (overlay or scene transition)
     - Display: "You Win!" / "You Lose!" / "Draw!"
     - Winner name
     - Buttons: [Rematch] [Exit to Lobby]
  
  [Rematch] clicked:
    -> send CODE_GAME_READY
    -> show "Waiting for opponent..." or "Both ready!"
    -> on CODE_GAME_READY from opponent: update UI to show their ready status
    -> on CODE_GAME_STARTING: clear overlay, reset board, start new game in GameScene

  [Exit] clicked:
    -> send CODE_CLIENT_EXIT
    -> gameState.reset()
    -> scene.start('MenuScene')
```

### Spectator Flow
```
MenuScene: user clicks Watch on a room
  -> send CODE_GAME_WATCH with roomId
  -> receive CODE_GAME_WATCH_SUCCESSFUL: {owner, status}
  -> transition to GameScene with isSpectating=true

GameScene (spectator):
  - Board renders normally
  - Click handler disabled
  - Player info shows "Spectating" badge
  - Move events come wrapped in CODE_GAME_WATCH: {code, data}
  - Unwrap and handle inner code normally (reuse placeStone, etc.)
  - On game over: show result, offer [Exit Spectating] button
  - Exit: send CODE_GAME_WATCH_EXIT, return to MenuScene
```

### Spectator Event Unwrapping (in game-scene.js)
```js
eventBus.on(ClientEventCode.GAME_WATCH, (wrapData) => {
  const innerCode = wrapData.code;
  const innerData = typeof wrapData.data === 'string' 
    ? tryParseJson(wrapData.data) 
    : wrapData.data;
  // Route to existing handlers
  this.handleServerEvent(innerCode, innerData);
});
```

## Related Code Files

### Files to Create
- `web-client/src/scenes/game-over-scene.js`

### Files to Modify
- `web-client/src/scenes/game-scene.js` -- add game over, exit, kick, spectator event handlers
- `web-client/src/ui/game-ui.js` -- add game over overlay, spectator badge
- `web-client/src/config/game-config.js` -- add GameOverScene to scene list
- `web-client/index.html` -- add game-over DOM overlay structure

## Implementation Steps

### 1. Game Over DOM overlay (in `index.html`)

```html
<div id="game-over-overlay" class="hidden">
  <div class="game-over-card">
    <h1 id="game-result-text"></h1>
    <p id="game-result-detail"></p>
    <div id="rematch-status" class="hidden">
      <p>You: <span id="my-ready-status">Not Ready</span></p>
      <p>Opponent: <span id="opponent-ready-status">Not Ready</span></p>
    </div>
    <div class="game-over-buttons">
      <button id="btn-rematch">Rematch</button>
      <button id="btn-exit-game">Exit to Lobby</button>
    </div>
  </div>
</div>
```

### 2. `game-over-scene.js` (~80 lines)

Decision: use DOM overlay managed by game-ui.js rather than a separate Phaser scene. The board should remain visible behind the overlay. Rename this to game-over logic inside `game-ui.js` instead.

Actually -- implement as **methods in `game-ui.js`** rather than a separate scene. This avoids scene transition complexity and keeps the board visible.

- `showGameOver(result, winnerNickname, isWinner, isDraw)` -- populate and show overlay
- `showRematchStatus(myReady, opponentReady)` -- update ready indicators
- `hideGameOver()` -- hide overlay for new game
- `showSpectatorGameOver(result, winnerNickname)` -- simplified: result + exit button only

Remove `game-over-scene.js` from plan. Update `game-config.js` -- no extra scene needed.

### 3. Update `game-scene.js` -- Game Over Handling (~30 lines added)

```
on CODE_GAME_OVER:
  - Parse result, determine if current player won
  - Disable click handler
  - gameUi.showGameOver(result, winnerNickname, isWinner, isDraw)
  - Wire rematch button: send CODE_GAME_READY, show rematch status

on CODE_GAME_READY:
  - Update rematch status display
  - If both ready, server will send CODE_GAME_STARTING

on CODE_GAME_STARTING (during rematch):
  - gameState.resetBoard()
  - Clear all stone objects from scene
  - gameUi.hideGameOver()
  - Re-init board state (new black/white assignment)
  - Re-enable click handler
```

### 4. Update `game-scene.js` -- Exit/Kick Handling (~15 lines added)

```
on CODE_CLIENT_EXIT:
  - gameUi.showToast(exitClientNickname + ' left the game')
  - After 2s delay: gameState.reset(), scene.start('MenuScene')

on CODE_CLIENT_KICK:
  - gameUi.showToast('Kicked for being idle')
  - gameState.reset(), scene.start('MenuScene')
```

### 5. Update `game-scene.js` -- Spectator Support (~25 lines added)

```
create():
  - if gameState.isSpectating:
    - Disable click handler
    - gameUi.showSpectatorBadge()
    - Register CODE_GAME_WATCH listener (unwrap + route)

on CODE_GAME_WATCH:
  - Unwrap {code, data}
  - Route to existing handlers (placeStone, game over, etc.)

Spectator exit button:
  - send CODE_GAME_WATCH_EXIT
  - gameState.reset()
  - scene.start('MenuScene')
```

### 6. Update `game-ui.js` -- New Methods (~50 lines added)

- `showGameOver(...)` -- show overlay with result text
- `hideGameOver()` -- hide overlay
- `showRematchStatus(myReady, opponentReady)` -- toggle ready indicators
- `showSpectatorBadge()` -- add "SPECTATING" label to player info
- `showSpectatorExit()` -- add exit button for spectators

## Todo List
- [ ] Add game-over DOM overlay to `index.html`
- [ ] Add game over methods to `game-ui.js`
- [ ] Add `CODE_GAME_OVER` handler in `game-scene.js`
- [ ] Add rematch flow (`CODE_GAME_READY` send + receive) in `game-scene.js`
- [ ] Add rematch restart logic (clear board, re-init) in `game-scene.js`
- [ ] Add `CODE_CLIENT_EXIT` and `CODE_CLIENT_KICK` handlers in `game-scene.js`
- [ ] Add spectator event unwrapping (`CODE_GAME_WATCH`) in `game-scene.js`
- [ ] Add spectator UI elements (badge, exit button) to `game-ui.js`
- [ ] Test: win/lose/draw displays correctly
- [ ] Test: rematch flow -- both ready -> new game starts
- [ ] Test: opponent exits mid-game -> return to lobby
- [ ] Test: spectator sees moves and game over

## Success Criteria
- [ ] Game over overlay shows correct result (win/lose/draw)
- [ ] Rematch button sends ready signal, UI shows both players' ready state
- [ ] New game starts with cleared board when both ready
- [ ] Exit button sends `CODE_CLIENT_EXIT` and returns to lobby
- [ ] Opponent disconnect shows notification and returns to lobby after delay
- [ ] Spectator sees all moves in real-time, cannot interact
- [ ] Spectator exit sends `CODE_GAME_WATCH_EXIT` and returns to lobby
- [ ] `game-scene.js` stays under 200 lines total
- [ ] `game-ui.js` stays under 200 lines total

## Risk Assessment
- **Rematch player color swap:** Server re-assigns black/white in `CODE_GAME_STARTING`. Client must NOT assume same colors. Re-read `blackPlayerId` from new starting data.
- **Stale event listeners after rematch:** Board reset clears stones but scene is NOT restarted. Event listeners persist, which is correct -- no unbind/rebind needed.
- **Spectator joining mid-game:** Server sends `CODE_GAME_WATCH_SUCCESSFUL` with room status but does NOT replay past moves. Spectator sees the board from their join point onward. This is a server limitation -- document it, don't try to work around.

## Next Steps
- Phase 6: Polish + error handling (cross-cutting)
