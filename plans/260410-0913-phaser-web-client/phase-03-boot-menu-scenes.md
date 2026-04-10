# Phase 3: Boot + Menu Scenes

## Context Links
- [Plan overview](plan.md)
- [Phase 2: Services](phase-02-services-layer.md)
- Server nickname handler: `landlords-server/.../event/ServerEventListener_CODE_CLIENT_NICKNAME_SET.java` -- max 10 chars, non-empty
- Server show options flow: after nickname set, server sends `CODE_SHOW_OPTIONS`
- Server room list: `CODE_GET_ROOMS` -> `CODE_SHOW_ROOMS` with `[{roomId, roomOwner, roomClientCount, roomType}]`

## Overview
- **Priority:** P1
- **Status:** Pending
- **Blocked by:** Phase 1, Phase 2
- **Description:** BootScene connects to server, MenuScene manages all pre-game UI via DOM overlays (nickname, lobby, PVP/PVE menus).

## Key Insights
- Server flow after WS connect: waits 2s, sends `CODE_CLIENT_CONNECT` (data=clientId), then `CODE_CLIENT_NICKNAME_SET` (data=null, meaning "please set nickname")
- If nickname invalid (empty or >10 chars), server sends `CODE_CLIENT_NICKNAME_SET` again with `{invalidLength: N}` -- client should re-prompt
- After valid nickname, server sends `CODE_SHOW_OPTIONS` -- client shows main menu
- PVP: `CODE_ROOM_CREATE` -> `CODE_ROOM_CREATE_SUCCESS` (room JSON) -> wait for opponent -> auto-starts on join
- PVE: `CODE_ROOM_CREATE_PVE` with data "1"/"2"/"3" -> server auto-starts immediately
- Join room: `CODE_ROOM_JOIN` with data=roomId string -> `CODE_ROOM_JOIN_SUCCESS` -> auto-starts if 2 players

## Architecture

### Scene Flow
```
BootScene
  create(): connect to WS, show "Connecting..." text on canvas
  on 'CODE_CLIENT_CONNECT': store clientId, show "Connected!"
  on 'CODE_CLIENT_NICKNAME_SET': transition to MenuScene

MenuScene
  create(): show nickname form via menu-ui.js
  Substates (managed by menu-ui.js DOM swaps):
    1. NICKNAME -- input + submit button
    2. LOBBY -- main menu: PVP / PVE / Spectate buttons
    3. PVP_MENU -- "Create Room" button + room list table + join button
    4. PVE_MENU -- difficulty picker (Easy/Medium/Hard)
    5. SPECTATE_MENU -- room list + watch button
    6. WAITING -- "Waiting for opponent..." (after PVP room create)

  on 'CODE_SHOW_OPTIONS': switch to LOBBY substate
  on 'CODE_SHOW_ROOMS': populate room list table
  on 'CODE_ROOM_CREATE_SUCCESS': switch to WAITING, store roomId
  on 'CODE_ROOM_JOIN_SUCCESS': store room info
  on 'CODE_GAME_STARTING': hide all overlays, transition to GameScene
  on 'CODE_ROOM_JOIN_FAIL_*': show error toast
  on 'CODE_PVE_DIFFICULTY_NOT_SUPPORT': show error toast
  on 'CODE_GAME_WATCH_SUCCESSFUL': transition to GameScene (spectator mode)
```

### DOM Overlay Strategy
- All menus live in `#ui-overlay` div (positioned absolute over Phaser canvas)
- `menu-ui.js` manages showing/hiding substate containers
- Phaser canvas stays visible as background (dark board aesthetic)
- On transition to GameScene, hide `#ui-overlay` entirely

## Related Code Files

### Files to Create
- `web-client/src/scenes/boot-scene.js`  (overwrite Phase 1 placeholder)
- `web-client/src/scenes/menu-scene.js`
- `web-client/src/ui/menu-ui.js`

### Files to Modify
- `web-client/index.html` -- add DOM overlay structure and CSS
- `web-client/src/config/game-config.js` -- add MenuScene to scene list

## Implementation Steps

### 1. Update `index.html` -- Add DOM overlay structure

Inside `#ui-overlay`, add containers for each substate:

```html
<div id="ui-overlay" class="hidden">
  <div id="nickname-screen" class="ui-screen hidden">
    <h1>Caro (Gomoku)</h1>
    <input id="nickname-input" maxlength="10" placeholder="Enter nickname..." />
    <button id="nickname-submit">Play</button>
    <p id="nickname-error" class="error hidden"></p>
  </div>

  <div id="lobby-screen" class="ui-screen hidden">
    <h2>Welcome, <span id="player-name"></span></h2>
    <button id="btn-pvp">Player vs Player</button>
    <button id="btn-pve">Player vs AI</button>
    <button id="btn-spectate">Spectate</button>
  </div>

  <div id="pvp-screen" class="ui-screen hidden">
    <h2>PVP Lobby</h2>
    <button id="btn-create-room">Create Room</button>
    <button id="btn-refresh-rooms">Refresh</button>
    <table id="room-table"><thead><tr><th>ID</th><th>Owner</th><th>Players</th><th></th></tr></thead><tbody></tbody></table>
    <button id="btn-back-pvp">Back</button>
  </div>

  <div id="pve-screen" class="ui-screen hidden">
    <h2>Play vs AI</h2>
    <button data-difficulty="1">Easy</button>
    <button data-difficulty="2">Medium</button>
    <button data-difficulty="3">Hard</button>
    <button id="btn-back-pve">Back</button>
  </div>

  <div id="spectate-screen" class="ui-screen hidden">
    <h2>Spectate</h2>
    <button id="btn-refresh-spectate">Refresh</button>
    <table id="spectate-table"><thead><tr><th>ID</th><th>Owner</th><th>Players</th><th></th></tr></thead><tbody></tbody></table>
    <button id="btn-back-spectate">Back</button>
  </div>

  <div id="waiting-screen" class="ui-screen hidden">
    <h2>Waiting for opponent...</h2>
    <p>Room ID: <span id="waiting-room-id"></span></p>
    <button id="btn-cancel-wait">Cancel</button>
  </div>
</div>
```

CSS: dark theme, centered cards, simple button styles. Keep inline in `<style>` tag (~50 lines).

### 2. `boot-scene.js` (~50 lines)

```
- constructor: super({ key: 'BootScene' })
- create():
  - Display "Connecting..." centered text
  - connectionService.connect(wsUrl)
  - eventBus.on(CLIENT_CONNECT, (clientId) => {
      gameState.clientId = clientId
      this.statusText.setText('Connected!')
    })
  - eventBus.on(NICKNAME_SET, () => {
      this.scene.start('MenuScene')
    })
- wsUrl: derive from window.location or fallback 'ws://localhost:1025/ratel'
  - Config: check URL param ?ws=... for override, else default
```

### 3. `menu-scene.js` (~80 lines)

```
- constructor: super({ key: 'MenuScene' })
- create():
  - menuUi.show('nickname')
  - Register event listeners on eventBus for all menu-related server events
  - Wire up menuUi callbacks for user actions
- Event handlers:
  - CODE_SHOW_OPTIONS: menuUi.show('lobby')
  - CODE_SHOW_ROOMS: menuUi.populateRooms(data)
  - CODE_ROOM_CREATE_SUCCESS: gameState.roomId = data.id; menuUi.show('waiting')
  - CODE_ROOM_JOIN_SUCCESS: store room info in gameState
  - CODE_GAME_STARTING: store game info, menuUi.hideAll(), this.scene.start('GameScene')
  - CODE_ROOM_JOIN_FAIL_*: menuUi.showError('Room full' / 'Room not found')
  - CODE_GAME_WATCH_SUCCESSFUL: gameState.isSpectating = true; menuUi.hideAll(); this.scene.start('GameScene')
- shutdown(): unsubscribe all eventBus listeners, menuUi.hideAll()
```

### 4. `menu-ui.js` (~150 lines)

DOM manipulation module:
- `show(screen)` -- hide all `.ui-screen`, show target, show overlay
- `hideAll()` -- hide overlay
- `populateRooms(roomList)` -- clear + rebuild room table tbody with join/watch buttons
- `showError(msg)` -- show toast or error text, auto-hide after 3s
- `bindActions(callbacks)` -- attach click handlers to all buttons, pass action callbacks:
  - `onNicknameSubmit(nickname)`
  - `onCreateRoom()`
  - `onJoinRoom(roomId)`
  - `onCreatePVE(difficulty)`
  - `onWatchRoom(roomId)`
  - `onRefreshRooms()`
  - `onCancelWait()`
  - `onBack()`

Each callback in menu-scene.js calls the appropriate `connectionService.send()`.

## Todo List
- [ ] Add DOM overlay HTML structure to `index.html`
- [ ] Add CSS styles (dark theme) to `index.html`
- [ ] Implement `boot-scene.js` with WS connect + transition
- [ ] Implement `menu-ui.js` with show/hide/populate/bind
- [ ] Implement `menu-scene.js` wiring eventBus to menuUi
- [ ] Update `game-config.js` scene list: [BootScene, MenuScene]
- [ ] Test: nickname flow end-to-end with running server
- [ ] Test: PVP room create + join flow
- [ ] Test: PVE game start flow

## Success Criteria
- [ ] BootScene connects and transitions to MenuScene on server prompt
- [ ] Nickname submission accepted by server, lobby appears
- [ ] PVP room creation shows waiting screen with room ID
- [ ] Room list populates with active rooms, join works
- [ ] PVE difficulty selection starts game immediately
- [ ] Error toasts show on join failures
- [ ] All files under 150 lines, JSDoc on exports

## Risk Assessment
- **DOM events not cleaned up on scene restart:** Each `menu-scene.js` shutdown must unbind eventBus listeners. Use named function refs (not anonymous) so `off()` works.
- **Race condition:** `CODE_GAME_STARTING` can arrive very quickly after `CODE_ROOM_JOIN_SUCCESS` in PVP (server auto-starts when 2 players join). MenuScene must handle both events without assuming a delay.

## Next Steps
- Phase 4: GameScene + board rendering (depends on this phase)
