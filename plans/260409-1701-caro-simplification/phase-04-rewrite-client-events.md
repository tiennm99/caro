## Phase 4: Rewrite Client Event Handlers

### Context Links
- [Plan overview](./plan.md)
- [Phase 2](./phase-02-clean-shared-code.md) (must complete first)
- Can run **in parallel** with Phase 3 (no file overlap)

### Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 1.5h
- **Blocked by:** Phase 2

Rewrite client-side event handlers to display Gomoku game state. The client is a CLI app -- it reads server events and prints board/prompts to the console, then sends user input back.

### Files to Rewrite

**`ClientEventListener_CODE_GAME_STARTING.java`** -- Currently prints poker cards. Rewrite:
1. Parse server data: `{ roomId, blackPlayer: {id, nickname}, whitePlayer: {id, nickname}, boardSize }`
2. Print: "Game starting! You are [BLACK/WHITE]"
3. Print initial empty board via `GomokuHelper.formatBoardForDisplay()`
4. If player is BLACK, prompt for first move
5. Remove all Poker imports and references

**`ClientEventListener_CODE_GAME_OVER.java`** -- Currently shows poker scores. Rewrite:
1. Parse: `{ result, winnerNickname, board }`
2. Print final board state
3. Print result: "Black wins!" / "White wins!" / "Draw!" via `GomokuHelper.getWinnerMessage()`
4. Remove score display logic
5. Call `ClientEventListener_CODE_GAME_READY.gameReady(channel)` to offer rematch

**`ClientEventListener_CODE_SHOW_OPTIONS_PVE.java`** -- Currently calls `initLastSellInfo()`. Update:
1. Remove `initLastSellInfo()` call (method deleted in Phase 2)
2. Keep difficulty selection (Easy/Medium/Hard maps to 1/2/3)
3. Rest is clean

**`ClientEventListener_CODE_SHOW_OPTIONS_SETTING.java`** -- Check for poker display format references:
1. Remove any `pokerDisplayFormat` references
2. Keep language selection if present

**New: `ClientEventListener_CODE_GAME_MOVE_SUCCESS.java`** -- Handle successful move broadcast:
1. Parse: `{ row, col, piece, playerNickname, nextPlayerId }`
2. Print: "[playerNickname] placed [BLACK/WHITE] at (row, col)"
3. Print updated board via `GomokuHelper.formatBoardForDisplay()`
4. If it's this player's turn next, prompt for move input
5. Read input as "row,col", send `CODE_GAME_MOVE` to server with `{ row, col }`

**New: `ClientEventListener_CODE_GAME_MOVE_INVALID.java`** -- Handle invalid move:
1. Print "Invalid move. Please try again."
2. Re-prompt for move input

**New: `ClientEventListener_CODE_GAME_MOVE_OCCUPIED.java`** -- Handle occupied position:
1. Print "Position already occupied. Please choose another."
2. Re-prompt for move input

**New: `ClientEventListener_CODE_GAME_MOVE_OUT_OF_BOUNDS.java`** -- Handle out of bounds:
1. Print "Move out of bounds. Board is 15x15 (0-14)."
2. Re-prompt for move input

**New: `ClientEventListener_CODE_GAME_MOVE_NOT_YOUR_TURN.java`** -- Handle wrong turn:
1. Print "It's not your turn. Please wait."

**New: `ClientEventListener_CODE_SHOW_BOARD.java`** -- Handle board display request:
1. This is a client-only code; may need special handling
2. Or simply handle "board" command locally in the move input loop

### Files Unchanged (already clean)
- `ClientEventListener_CODE_CLIENT_CONNECT.java`
- `ClientEventListener_CODE_CLIENT_EXIT.java`
- `ClientEventListener_CODE_CLIENT_KICK.java`
- `ClientEventListener_CODE_CLIENT_NICKNAME_SET.java`
- `ClientEventListener_CODE_ROOM_CREATE_SUCCESS.java`
- `ClientEventListener_CODE_ROOM_JOIN_SUCCESS.java`
- `ClientEventListener_CODE_ROOM_JOIN_FAIL_BY_FULL.java`
- `ClientEventListener_CODE_ROOM_JOIN_FAIL_BY_INEXIST.java`
- `ClientEventListener_CODE_ROOM_PLAY_FAIL_BY_INEXIST.java`
- `ClientEventListener_CODE_SHOW_OPTIONS.java`
- `ClientEventListener_CODE_SHOW_OPTIONS_PVP.java`
- `ClientEventListener_CODE_SHOW_ROOMS.java`
- `ClientEventListener_CODE_PVE_DIFFICULTY_NOT_SUPPORT.java`
- `ClientEventListener_CODE_GAME_READY.java`
- `ClientEventListener_CODE_GAME_WATCH.java`
- `ClientEventListener_CODE_GAME_WATCH_SUCCESSFUL.java`

### Move Input Pattern

The client prompts for a move and sends it to server. Pattern used in new handlers:

```java
String input = SimpleWriter.write(nickname, "move");
// Parse "row,col" format
// Handle special commands: "board"/"b", "history"/"h", "exit"/"e"
if (input matches "\\d+,\\d+") {
    String moveData = MapHelper.newInstance()
        .put("row", row).put("col", col).json();
    pushToServer(channel, ServerEventCode.CODE_GAME_MOVE, moveData);
} else if (input is "board" or "b") {
    // print board locally (need to store board state client-side or request from server)
} else if (input is "exit" or "e") {
    pushToServer(channel, ServerEventCode.CODE_CLIENT_EXIT, null);
}
```

**Key decision:** Store board state client-side (in a static field on the listener or a shared client state object) so "board" and "history" commands work without server round-trip.

### Client-Side State

Add a simple static state holder (or use existing `User.java`):

```java
// In ClientEventListener or a new small class
static Board localBoard = null;
static PieceType myPiece = null;
static String myNickname = null;
```

Set these in `CODE_GAME_STARTING` handler. Update board in `CODE_GAME_MOVE_SUCCESS` handler.

### Files to Verify (Chinese text removal)
- `ClientEventListener_CODE_GAME_WATCH.java` -- grep found Chinese; remove
- `ClientEventListener_CODE_GAME_WATCH_SUCCESSFUL.java` -- check

### SimpleClient.java Changes
- Remove `serverAddressSource` array (fetches from upstream ratel repo)
- When no `-h` flag provided, print error asking user to specify host instead of fetching server list
- Remove `getServerAddressList()` method
- Keep language selection logic (only en_US matters now)

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Move input parsing errors (non "row,col" format) | Medium | Low | Validate format, re-prompt on bad input |
| Client board state out of sync with server | Low | Medium | Server is authoritative; client board is display-only. Re-sync on each CODE_GAME_MOVE_SUCCESS |
| Blocking on SimpleWriter.write() during opponent's turn | Low | Low | Existing pattern -- client blocks on stdin. Move prompt only shown when it's player's turn |

### Success Criteria
- [ ] 5 new client event handler files created for Gomoku move codes
- [ ] `CODE_GAME_STARTING` prints board, not poker cards
- [ ] `CODE_GAME_OVER` shows winner without scores
- [ ] Client can display board and prompt for "row,col" input
- [ ] No Poker imports in any client file
- [ ] No Chinese text in any client file
- [ ] `mvn compile -pl landlords-client` passes
