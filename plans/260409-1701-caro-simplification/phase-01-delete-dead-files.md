## Phase 1: Delete Dead Files

### Context Links
- [Plan overview](./plan.md)

### Overview
- **Priority:** P1 (do first -- unblocks everything)
- **Status:** Pending
- **Effort:** 30m

Pure deletion phase. No logic changes. Every file listed is either landlords-specific code or obsolete documentation.

### Files to Delete

**Common module -- Poker domain:**
- `landlords-common/src/main/java/org/nico/ratel/landlords/entity/Poker.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/entity/PokerSell.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/enums/PokerLevel.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/enums/PokerType.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/helper/PokerHelper.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/utils/LastCardsUtils.java`

**Common module -- Old robot system:**
- `landlords-common/src/main/java/org/nico/ratel/landlords/robot/AbstractRobotDecisionMakers.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/robot/EasyRobotDecisionMakers.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/robot/MediumRobotDecisionMakers.java`
- `landlords-common/src/main/java/org/nico/ratel/landlords/robot/RobotDecisionMakers.java`

**Common module -- Tests:**
- `landlords-common/src/test/java/org/nico/ratel/landlords/helper/tests/PokerHelperTest.java`
- `landlords-common/src/test/java/org/nico/ratel/landlords/robot/tests/MediumRobotDecisionMakersTests.java`

**Common module -- Chinese i18n:**
- `landlords-common/src/main/resources/messages_zh_CN.properties`

**Server module -- Landlord event handlers (6 files):**
- `landlords-server/.../event/ServerEventListener_CODE_GAME_LANDLORD_ELECT.java`
- `landlords-server/.../event/ServerEventListener_CODE_GAME_POKER_PLAY.java`
- `landlords-server/.../event/ServerEventListener_CODE_GAME_POKER_PLAY_PASS.java`
- `landlords-server/.../event/ServerEventListener_CODE_GAME_POKER_PLAY_REDIRECT.java`
- `landlords-server/.../robot/RobotEventListener_CODE_GAME_LANDLORD_ELECT.java`
- `landlords-server/.../robot/RobotEventListener_CODE_GAME_POKER_PLAY.java`

**Client module -- Landlord event handlers (12 files):**
- `landlords-client/.../event/ClientEventListener_CODE_GAME_LANDLORD_CONFIRM.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_LANDLORD_CYCLE.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_LANDLORD_ELECT.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_CANT_PASS.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_INVALID.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_LESS.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_MISMATCH.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_ORDER_ERROR.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_PASS.java`
- `landlords-client/.../event/ClientEventListener_CODE_GAME_POKER_PLAY_REDIRECT.java`
- `landlords-client/.../event/ClientEventListener_CODE_SHOW_POKERS.java`

**Root-level files:**
- `GOMOKU_CONVERSION_SUMMARY.md`
- `PROTOCO_CN.md`
- `UPDATE.md`
- `serverlist.json`
- `docker/` (entire directory)

### Total: ~35 files/dirs deleted

### Implementation Steps
1. Delete all files listed above via `git rm`
2. Run `mvn compile` -- expect failures (imports of deleted classes). Those are fixed in Phase 2.
3. Commit: `refactor: delete all landlords card game code and obsolete docs`

### Risk Assessment
- **Risk:** Accidentally delete a file still referenced by kept code
- **Mitigation:** Phase 2 explicitly fixes all broken imports. Compile verification in Phase 5.
- **Likelihood:** Low (all files audited against grep results)

### Success Criteria
- [ ] All listed files removed from repo
- [ ] No landlord/poker .java files remain
- [ ] Commit is clean and focused
