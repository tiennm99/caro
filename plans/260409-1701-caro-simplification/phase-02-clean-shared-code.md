## Phase 2: Clean Shared Code (Common Module)

### Context Links
- [Plan overview](./plan.md)
- [Phase 1](./phase-01-delete-dead-files.md) (must complete first)

### Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 1h
- **Blocked by:** Phase 1

Remove all landlords references from shared entities, enums, helpers, and printers. After this phase, the common module compiles cleanly with only Gomoku domain code.

### Key Insights
- `Room.java` is already mostly clean (gomoku fields present). But it still has `setCurrentSellClient()` called from server code, and leftover `scoreRate`/`baseScore`/`score` fields.
- `ClientSide.java` has no `pokers` field (already removed) but still has `score`, `scoreInc`, `type` (ClientType = LANDLORD/PEASANT), and linked-list `next`/`pre` fields used for 3-player turn order.
- `ClientEventCode.java` and `ServerEventCode.java` are already cleaned up -- only Gomoku codes remain. No changes needed.
- `ClientRole.java` has `PLAYER, ROBOT, BLACK_PLAYER, WHITE_PLAYER` -- needs simplification.
- `ClientStatus.java` has `CALL_LANDLORD` -- remove it.
- `ClientType.java` (LANDLORD/PEASANT) -- delete entire enum, not applicable to Gomoku.
- `SimplePrinter.java` has `printPokers()` method referencing deleted PokerHelper -- must remove.
- `ClientEventListener.java` (client base class) has `lastPokers`, `lastSellClientNickname`, `lastSellClientType` static fields -- must remove.

### Files to Modify

| File | Changes |
|------|---------|
| `entity/Room.java` | Remove `scoreRate`, `baseScore`, `currentSellClient`, `firstSellClient`, `landlordPokers`, `landlordId`, `lastSellClient` and all their getters/setters. Keep gomoku fields. |
| `entity/ClientSide.java` | Remove `score`, `scoreInc`, `type` (ClientType), `next`, `pre`, `round` fields + getters/setters. Gomoku doesn't need linked-list player chaining (use Room's clientSideMap). |
| `enums/ClientRole.java` | Remove `PLAYER` and `ROBOT`. Keep `BLACK_PLAYER`, `WHITE_PLAYER`. Add `SPECTATOR`. |
| `enums/ClientStatus.java` | Remove `CALL_LANDLORD`. Keep `TO_CHOOSE`, `NO_READY`, `READY`, `WAIT`, `PLAYING`. |
| `enums/ClientType.java` | **Delete entire file** -- no concept of landlord/peasant in Gomoku. |
| `print/SimplePrinter.java` | Remove `printPokers()` method and `import Poker/PokerHelper`. Remove `pokerDisplayFormat` field. |
| `helper/I18nHelper.java` | Verify no reference to `messages_zh_CN.properties` (already handles fallback to en_US). |

### Files to Delete
- `landlords-common/src/main/java/org/nico/ratel/landlords/enums/ClientType.java`

### Implementation Steps

1. **Delete `ClientType.java`**

2. **Clean `Room.java`:**
   - Remove fields: `scoreRate`, `baseScore` (and `getScore()`, `initScoreRate()`, `increaseRate()` methods)
   - Verify no `landlordPokers`, `currentSellClient`, `firstSellClient`, `lastSellClient`, `landlordId` fields exist (grep confirms Room.java already lacks these -- they exist only in deleted server files that call non-existent setters)
   - Actually: grep shows `room.setCurrentSellClient()` called from server files, but Room.java has no such method. These are in files being deleted in Phase 1. **No Room.java changes needed for these.**
   - Remove: `scoreRate`, `baseScore`, `getScore()`, `getBaseScore()`, `setBaseScore()`, `getScoreRate()`, `setScoreRate()`, `initScoreRate()`, `increaseRate()` -- these are unused in Gomoku

3. **Clean `ClientSide.java`:**
   - Remove `type` field (ClientType) + getter/setter
   - Remove `score`, `scoreInc` fields + getter/setter/`addScore()`
   - Remove `next`, `pre` fields + getter/setter (3-player circular list not needed for 2-player Gomoku; use Room.clientSideMap)
   - Remove `round`, `resetRound()`, `addRound()`, `getRound()`
   - Update `init()` to remove references to removed fields

4. **Clean `ClientRole.java`:**
   - Remove `PLAYER` and `ROBOT`
   - Add `SPECTATOR`
   - Result: `BLACK_PLAYER, WHITE_PLAYER, SPECTATOR`

5. **Clean `ClientStatus.java`:**
   - Remove `CALL_LANDLORD`

6. **Clean `SimplePrinter.java`:**
   - Remove `import org.nico.ratel.landlords.entity.Poker`
   - Remove `import org.nico.ratel.landlords.helper.PokerHelper`
   - Remove `pokerDisplayFormat` static field
   - Remove `printPokers()` method

7. **Clean `ClientEventListener.java` (client module base class):**
   - Remove `import org.nico.ratel.landlords.entity.Poker`
   - Remove static fields: `lastPokers`, `lastSellClientNickname`, `lastSellClientType`
   - Remove `initLastSellInfo()` method

8. Run `mvn compile -pl landlords-common` -- must pass

### Risk Assessment
- **Risk:** Removing `next`/`pre` from ClientSide breaks server event handlers that use circular linked list for turn order
- **Mitigation:** Server handlers are rewritten in Phase 3 to use Room's `isPlayerTurn()` / `currentTurn` instead. Phase 3 must not use `client.getNext()`.
- **Likelihood:** Medium
- **Impact:** Compile error (caught immediately)

### Security Considerations
None -- no auth/data changes.

### Success Criteria
- [ ] `ClientType.java` deleted
- [ ] No `import.*Poker` in any kept file
- [ ] No `score`/`scoreRate`/`baseScore` in Room or ClientSide
- [ ] ClientRole has exactly: `BLACK_PLAYER, WHITE_PLAYER, SPECTATOR`
- [ ] `mvn compile -pl landlords-common` passes
