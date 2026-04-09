## Phase 5: Integration Test & Compile Verify

### Context Links
- [Plan overview](./plan.md)
- [Phase 3](./phase-03-rewrite-server-events.md), [Phase 4](./phase-04-rewrite-client-events.md) (must both complete first)

### Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 1h
- **Blocked by:** Phase 3, Phase 4

Full build verification, fix remaining compile errors, clean up README, and validate the game flow works end-to-end.

### Implementation Steps

#### 1. Full Maven Build
```bash
mvn clean compile
```
Fix any compile errors iteratively. Common expected issues:
- Missing imports of deleted classes in files not yet touched
- `ClientRole.PLAYER` references in files outside the main event handlers
- `ClientType` references anywhere
- `getNext()`/`getPre()` calls if any kept file uses them

#### 2. Run Existing Tests
```bash
mvn test
```
- `GomokuHelperTest.java` should pass (tests Gomoku logic, no poker deps)
- Deleted tests (PokerHelperTest, MediumRobotDecisionMakersTests) are gone -- no failures from those

#### 3. Add Basic Gomoku Integration Test

Create `landlords-common/src/test/java/org/nico/ratel/landlords/helper/tests/GomokuIntegrationTest.java`:
- Test full game flow in-memory: create Room, assign players, make moves, detect win
- Test draw detection (fill board)
- Test invalid move rejection (occupied, out of bounds, wrong turn)
- Test board reset

#### 4. Clean Up README.md
- Remove references to original ratel/landlords
- Remove badge URLs pointing to ainilili/ratel
- Remove serverlist.json references
- Remove ecosystem links (go-ratel-client etc.) or mark as incompatible
- Remove bilibili video link
- Keep installation instructions, update to reflect current project
- Update game commands section (already correct for Gomoku)

#### 5. Grep Sweep -- Verify No Leftovers

Run these greps to ensure nothing was missed:

```bash
# No poker/landlord references in kept Java files
grep -r "Poker\|PokerSell\|PokerHelper\|PokerLevel\|PokerType" --include="*.java" .
grep -r "landlord\|LANDLORD\|Landlord" --include="*.java" .
grep -r "LastCardsUtils\|lastCards\|lastPokers" --include="*.java" .

# No Chinese characters in Java files
grep -rP "[\x{4e00}-\x{9fff}]" --include="*.java" .

# No references to deleted event codes
grep -r "CODE_GAME_POKER\|CODE_GAME_LANDLORD\|CODE_SHOW_POKERS" --include="*.java" .
```

Allowed exceptions:
- `LandlordException.java` class name -- rename to `GameException.java` or leave (low priority)
- Package names contain `landlords` -- intentionally kept (see plan.md decision #1)
- `LICENSE` file -- keep as-is

#### 6. Verify Game Flow Manually (if time permits)

Start server:
```bash
java -jar landlords-server/target/landlords-server-1.4.0.jar -p 1024
```

Start 2 clients:
```bash
java -jar landlords-client/target/landlords-client-1.4.0.jar -h 127.0.0.1 -p 1024
```

Test flow:
1. Client 1: set nickname, create room
2. Client 2: set nickname, join room
3. Verify game auto-starts, board displays
4. Make alternating moves, verify board updates
5. Play to win condition, verify game over message

### Cleanup Items (Low Priority, Optional)

| Item | Rationale |
|------|-----------|
| Rename `LandlordException` to `GameException` | Cosmetic, low value |
| Rename modules `landlords-*` to `caro-*` | High churn, defer to separate PR |
| Remove `FormatPrinter.java` | Check if used; if not, delete |
| Remove `features/Features.java` | Check if only VERSION constant; if so, keep |
| Simplify `SimpleClient.java` server list fetching | Already addressed in Phase 4 |

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hidden compile error in untouched file | Medium | Low | Full `mvn compile` catches all |
| GomokuHelperTest relies on deleted code | Low | Low | Test file already reviewed -- uses only Gomoku classes |
| Manual test reveals game flow bug | Medium | Medium | Fix in this phase before merging |

### Success Criteria
- [ ] `mvn clean compile` passes with zero errors
- [ ] `mvn test` passes -- all tests green
- [ ] Grep sweep shows no poker/landlord references in Java code (except package names and LandlordException)
- [ ] No Chinese characters in Java files
- [ ] README reflects current Gomoku project
- [ ] GomokuIntegrationTest covers: valid move, invalid move, win detection, draw detection
