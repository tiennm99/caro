## Phase 3: Rewrite Server Event Handlers

### Context Links
- [Plan overview](./plan.md)
- [Phase 2](./phase-02-clean-shared-code.md) (must complete first)
- Key domain files: `Board.java`, `GomokuHelper.java`, `GomokuAI.java`, `Room.java`

### Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 2h
- **Blocked by:** Phase 2

Rewrite the server-side event handlers to implement Gomoku game flow. Create the missing `ServerEventListener_CODE_GAME_MOVE.java`. Fix existing handlers that still contain landlords logic.

### Data Flow: Gomoku Game Lifecycle

```
Client                          Server
  |-- CODE_ROOM_CREATE ---------->|  Create room, assign client as BLACK_PLAYER
  |<-- CODE_ROOM_CREATE_SUCCESS --|
  |                               |
  |-- CODE_ROOM_JOIN ------------>|  Join room, assign as WHITE_PLAYER
  |<-- CODE_ROOM_JOIN_SUCCESS ----|  (to both players)
  |                               |  Auto-start: call CODE_GAME_STARTING
  |<-- CODE_GAME_STARTING --------|  (to both players: board state, who is black/white)
  |                               |
  |-- CODE_GAME_MOVE ------------>|  Validate move via GomokuHelper
  |<-- CODE_GAME_MOVE_SUCCESS ----|  (broadcast to both + spectators)
  |   or CODE_GAME_MOVE_INVALID   |
  |   or CODE_GAME_MOVE_OCCUPIED  |
  |   or CODE_GAME_MOVE_NOT_YOUR_TURN |
  |                               |
  |<-- CODE_GAME_OVER -----------|  (when GomokuHelper detects win/draw)
```

### Files to Create

**`ServerEventListener_CODE_GAME_MOVE.java`** -- the core missing handler

```
Package: org.nico.ratel.landlords.server.event
```

Logic:
1. Parse `data` as JSON: `{ "row": int, "col": int }`
2. Get room from `ServerContains.getRoom(clientSide.getRoomId())`
3. Null-check room -> push `CODE_ROOM_PLAY_FAIL_BY_INEXIST`
4. Check `room.isPlayerTurn(clientSide.getId())` -> if false, push `CODE_GAME_MOVE_NOT_YOUR_TURN`
5. Check `room.getGameBoard().isValidMove(row, col)`:
   - Out of bounds -> `CODE_GAME_MOVE_OUT_OF_BOUNDS`
   - Position occupied -> `CODE_GAME_MOVE_OCCUPIED`
6. Call `GomokuHelper.makeMove(room, row, col, clientSide.getId())`
7. Build result JSON: `{ row, col, piece, playerId, playerNickname, nextPlayerId }`
8. Broadcast `CODE_GAME_MOVE_SUCCESS` to all players + spectators
9. Check `GomokuHelper.isGameOver(room)`:
   - If yes, determine winner, broadcast `CODE_GAME_OVER` with `{ result, winnerNickname, board }`
   - For PVE: if next turn is AI, trigger AI move via `GomokuAI.getNextMove()` and recurse

**`RobotEventListener_CODE_GAME_MOVE.java`** -- AI move handler for PVE

```
Package: org.nico.ratel.landlords.server.robot
```

Logic:
1. Get room, get AI piece color from room
2. Call `GomokuAI.getNextMove(board, difficulty)`
3. Delegate to `ServerEventListener_CODE_GAME_MOVE` with the AI's move data

### Files to Rewrite

**`ServerEventListener_CODE_GAME_STARTING.java`** -- Currently distributes poker cards. Rewrite for Gomoku:
1. Get room
2. Assign players: first player = BLACK, second = WHITE
3. Set `room.setBlackPlayerId(first.getId())`, `room.setWhitePlayerId(second.getId())`
4. Set player roles: `first.setRole(ClientRole.BLACK_PLAYER)`, `second.setRole(ClientRole.WHITE_PLAYER)`
5. Set `room.setStatus(RoomStatus.STARTING)`
6. Set `room.setCurrentTurn(PieceType.BLACK)`
7. Reset board: `room.getGameBoard().reset()`
8. Build result JSON: `{ roomId, blackPlayer: {id, nickname}, whitePlayer: {id, nickname}, boardSize: 15 }`
9. Push `CODE_GAME_STARTING` to both players + spectators
10. For PVE: if AI is BLACK, trigger AI first move

**`ServerEventListener_CODE_GAME_READY.java`** -- Currently checks for 3 players and uses `ClientRole.PLAYER`. Rewrite:
1. Change player count check from 3 to 2
2. Replace `ClientRole.PLAYER` references with check for non-null channel (human player)
3. Remove Chinese log messages (`"房间状态"`, `"玩家状态"`)
4. When all ready, call `CODE_GAME_STARTING`

**`ServerEventListener_CODE_ROOM_CREATE.java`** -- Currently calls `room.setCurrentSellClient()`. Rewrite:
1. Remove `room.setCurrentSellClient()` call
2. Set first player as `ClientRole.BLACK_PLAYER`
3. Rest is fine

**`ServerEventListener_CODE_ROOM_CREATE_PVE.java`** -- Currently creates 2 robots for 3-player game. Rewrite:
1. Create room with human player
2. Create 1 AI robot (not 2) -- Gomoku is 2-player
3. Assign human as BLACK, AI as WHITE (or configurable)
4. Replace `RobotDecisionMakers.contains()` with simple difficulty range check (1-3)
5. Remove `client.setNext()`/`client.setPre()` linked-list wiring
6. Auto-start game immediately

**`ServerEventListener_CODE_ROOM_JOIN.java`** -- Currently allows up to 3 players. Rewrite:
1. Change full-room check from `size == 3` to `size == 2`
2. Remove `next`/`pre` linked-list wiring
3. When 2nd player joins, auto-start game (call `CODE_GAME_STARTING`)
4. Remove Chinese comments

**`ServerEventListener_CODE_CLIENT_EXIT.java`** -- Currently uses `ClientRole.PLAYER`. Update:
1. Replace `ClientRole.PLAYER` with check against `BLACK_PLAYER`/`WHITE_PLAYER`
2. Remove Chinese comments

**`RoomClearTask.java`** -- Heavy landlords logic (robot substitution, poker custody). Rewrite:
1. Keep timeout-based room cleanup (waitingStatusInterval, liveTime)
2. Remove all robot-substitution logic (lines 76-130)
3. Remove references to `currentSellClient`, `lastSellClient`, `landlordId`, `setPokers`, `setType`
4. On timeout: just close the room and notify players
5. Remove `RobotEventListener` import and call

**`RobotEventListener.java`** (interface) -- Keep but will only resolve `CODE_GAME_MOVE`:
1. No structural change needed, reflection-based lookup still works

### Files to Verify (minor touch-ups)

- `ServerEventListener_CODE_GAME_WATCH.java` -- likely uses Chinese comments, remove them
- `ServerEventListener_CODE_GAME_WATCH_EXIT.java` -- same
- `ServerEventListener_CODE_CLIENT_OFFLINE.java` -- verify no poker references
- `ServerEventListener_CODE_CLIENT_INFO_SET.java` -- verify clean
- `ServerEventListener_CODE_CLIENT_NICKNAME_SET.java` -- verify clean
- `ServerEventListener_CODE_GET_ROOMS.java` -- verify clean

### Architecture: PVE Move Flow

```
Human makes move -> ServerEventListener_CODE_GAME_MOVE
  -> validate + apply move
  -> check game over?
  -> if not over && next turn is AI:
       -> GomokuAI.getNextMove(board, difficulty)
       -> apply AI move to board via GomokuHelper
       -> broadcast AI move as CODE_GAME_MOVE_SUCCESS
       -> check game over again
```

No separate robot event listener needed for moves -- handle AI inline in CODE_GAME_MOVE handler to avoid complexity. Delete RobotEventListener_CODE_GAME_MOVE if created, or simply don't create it.

**Revised approach:** Handle AI response inline in `ServerEventListener_CODE_GAME_MOVE.java` rather than via separate RobotEventListener. Simpler, fewer files, same behavior.

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Breaking room join flow (2 vs 3 players) | Medium | High | Unit test: create room, join, verify auto-start |
| AI move infinite loop (AI triggers AI) | Low | High | Guard: only trigger AI if current turn belongs to AI player, and game not over |
| Race condition on concurrent moves | Low | Medium | Room operations already single-threaded per room via Netty event loop |

### Success Criteria
- [ ] `ServerEventListener_CODE_GAME_MOVE.java` exists and handles move validation + win detection
- [ ] PVE mode creates 1 AI robot, not 2
- [ ] Room join auto-starts at 2 players
- [ ] No references to Poker, PokerSell, PokerHelper, LastCardsUtils in any server file
- [ ] No Chinese text in any server file (except LICENSE)
- [ ] `mvn compile -pl landlords-server` passes
