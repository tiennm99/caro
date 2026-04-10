# Phase 03 — Server Cleanup (Dead Code + Gson Removal)

## Context Links
- [plan.md](plan.md)
- [phase-02b-migrate-handlers.md](phase-02b-migrate-handlers.md)
- `server/src/main/java/com/miti99/caro/common/entity/Msg.java`
- `server/src/main/java/com/miti99/caro/common/utils/JsonUtils.java`
- `server/src/main/java/com/miti99/caro/common/helper/MapHelper.java`
- `server/src/main/java/com/miti99/caro/common/transfer/ByteKit.java`
- `server/src/main/java/com/miti99/caro/common/transfer/ByteLink.java`
- `server/src/main/java/com/miti99/caro/common/transfer/TransferProtocolUtils.java`
- `server/src/main/java/com/miti99/caro/common/handler/DefaultDecoder.java`
- `server/src/main/java/com/miti99/caro/common/enums/ServerEventCode.java`
- `server/build.gradle.kts` (gson dep removal)

## Overview
- **Priority:** P3 (cleanup; doesn't block client)
- **Status:** pending (blocked by Phase 02b)
- Remove dead code now that typed records replace JSON envelopes AND inner-JSON payloads. `JsonUtils`, `MapHelper`, `Msg`, and gson dep all die together.

## Key Insights
- Post-02b usage audit (must re-grep before deletion — findings below are projected):
  - `Msg.java` — orphaned after 02a. DELETE.
  - `JsonUtils.java` — was used by 4 listeners + ChannelUtils envelope path. All 02b handlers port inline, so zero remaining callers. DELETE.
  - `MapHelper.java` — was used by many listeners for `MapHelper.newInstance().put(...).json()`. All replaced by proto builders in 02b. DELETE.
  - `TransferProtocolUtils.java`, `ByteKit.java`, `ByteLink.java` — only reachable via `DefaultDecoder` which was only used by TCP path. DELETE.
  - `DefaultDecoder.java` — only referenced from dead transfer package. DELETE.
  - `gson` dependency in `build.gradle.kts` — was required transitively by JsonUtils + MapHelper. DELETE.
  - `ServerEventCode.java` — was the string key for reflection dispatch. After 02b, nothing references it on the server (the sealed record hierarchy IS the taxonomy). DELETE.
  - `ClientEventCode.java` — server no longer references any code value (outbound messages are typed proto Response). Client JS still uses it as a local event bus constant. **KEEP** in server source for now: client mirror via `enums-overview` doc — OR delete from server since it's never imported. Grep confirms it has zero Java imports after 02b → DELETE.
- After deletion the `common/transfer` and `common/handler` packages are empty and git auto-cleans them.

## Requirements
**Functional**
- No behavior change. Pure deletion.
- 37 tests still pass.

**Non-functional**
- Server LOC drops noticeably (~500 LOC est).
- `build.gradle.kts` loses gson dep.
- Shadow jar shrinks.

## Architecture
No architectural change. Removes dead helpers and a dead dep.

## Related Code Files
**Modify**
- `server/build.gradle.kts` — remove `implementation("com.google.code.gson:gson")` line (verify exact coordinate during implementation).

**Create**
- None.

**Delete**
- `server/src/main/java/com/miti99/caro/common/entity/Msg.java`
- `server/src/main/java/com/miti99/caro/common/utils/JsonUtils.java`
- `server/src/main/java/com/miti99/caro/common/helper/MapHelper.java`
- `server/src/main/java/com/miti99/caro/common/transfer/ByteKit.java`
- `server/src/main/java/com/miti99/caro/common/transfer/ByteLink.java`
- `server/src/main/java/com/miti99/caro/common/transfer/TransferProtocolUtils.java`
- `server/src/main/java/com/miti99/caro/common/handler/DefaultDecoder.java`
- `server/src/main/java/com/miti99/caro/common/enums/ServerEventCode.java`
- `server/src/main/java/com/miti99/caro/common/enums/ClientEventCode.java` (pending re-grep confirmation)
- Empty directories `common/transfer/`, `common/handler/`, `common/utils/` if only `JsonUtils` lived there.

## Implementation Steps
1. **Pre-delete grep audit** — confirm zero references:
   - `grep -rn "import com.miti99.caro.common.entity.Msg" server/src` → empty.
   - `grep -rn "import com.miti99.caro.common.utils.JsonUtils" server/src` → empty.
   - `grep -rn "import com.miti99.caro.common.helper.MapHelper" server/src` → empty.
   - `grep -rn "TransferProtocolUtils\|ByteKit\|ByteLink\|DefaultDecoder" server/src` → only the files themselves.
   - `grep -rn "import com.miti99.caro.common.enums.ServerEventCode" server/src` → empty.
   - `grep -rn "import com.miti99.caro.common.enums.ClientEventCode" server/src` → empty. If non-empty: keep `ClientEventCode` in this phase, flag to a follow-up cleanup task.
2. `git rm` each confirmed-dead file.
3. Edit `server/build.gradle.kts`: remove gson dep line. Confirm no other subproject imports gson via transitive.
4. `./gradlew -p server clean build` — all 37 tests must pass.
5. Optional: `./gradlew -p server shadowJar && ls -lh server/build/libs/*.jar` — log the before/after size for the commit body.
6. Commit: `refactor(server): drop gson and dead json/map/tcp helpers`.

## Todo List
- [ ] Grep audit: `Msg`, `JsonUtils`, `MapHelper`, `TransferProtocolUtils`, `ByteKit`, `ByteLink`, `DefaultDecoder`, `ServerEventCode`, `ClientEventCode`
- [ ] `git rm` confirmed-dead files
- [ ] Remove gson dep from `build.gradle.kts`
- [ ] `./gradlew -p server clean build` green (37/37)
- [ ] Commit: `refactor(server): drop gson and dead json/map/tcp helpers`

## Success Criteria
- `find server/src/main/java/com/miti99/caro/common/transfer -type f` → empty.
- `find server/src/main/java/com/miti99/caro/common/handler -type f` → empty.
- `find server/src/main/java/com/miti99/caro/common/entity/Msg.java` → nothing.
- `find server/src/main/java/com/miti99/caro/common/utils/JsonUtils.java` → nothing.
- `find server/src/main/java/com/miti99/caro/common/helper/MapHelper.java` → nothing.
- `grep -n "gson" server/build.gradle.kts` → nothing.
- 37 unit tests pass.
- Shadow jar size decrease documented in commit body.

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Hidden reflective reference to deleted class | Very Low | Medium | No reflection used after 02a |
| Build caches reference stale class files | Low | Low | `clean` before `build` |
| `ClientEventCode` still referenced somewhere unexpected | Medium | Low | Grep confirms before delete; if non-empty keep + defer |
| Gson transitively required by another dep (e.g. protobuf-java-util) | Low | Low | Verify with `./gradlew -p server dependencies` after remove; if break, restore line |
| `common/entity/GameMove.java` — orphaned? | Medium | Low | GameMove is used by `GomokuAI` for return type; KEEP |
| `common/entity/Board.java`, `ClientSide.java`, `Room.java` orphaned? | Very Low | N/A | All still load-bearing for game logic; KEEP |

## Security Considerations
- None. Deletion only.

## Next Steps
- Server work done. Phase 04 migrates the client.
