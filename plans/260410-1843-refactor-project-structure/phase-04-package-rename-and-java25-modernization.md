# Phase 4 — Package rename + Java 25 opportunistic modernization

## Context Links
- Prev: [phase-03-standalone-maven-and-rename-server.md](phase-03-standalone-maven-and-rename-server.md)
- Next: [phase-05-rename-web-client-to-client.md](phase-05-rename-web-client-to-client.md)
- Overview: [plan.md](plan.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Rename all Java packages from `org.nico.ratel.landlords.*` to `com.miti99.caro.{common,server}.*`, updating `package` + `import` + `<mainClass>` + any string references. Then apply opportunistic Java 25 language modernization (records, `var`, switch expressions, text blocks) while every file is already being touched. Scope limited to low-risk, obvious rewrites; Netty handler threading untouched.

## Key Insights
- Server's sub-packages (`event, handler, proxy, timer, SimpleServer, ServerContains`) map to `com.miti99.caro.server.*`.
- All other sub-packages (`channel, entity, enums, exception, features, helper, print, robot, transfer, utils`) map to `com.miti99.caro.common.*`.
- The existing `handler/` sub-package sits in BOTH: common-origin files (from `landlords-common/handler/` pre-phase-2) → `com.miti99.caro.common.handler`; server-origin files (pre-existing server handlers) → `com.miti99.caro.server.handler`. Planner must split them at rename time. Use git log to identify origin if ambiguous.
- Java 25 modernization is strictly opportunistic — if a file needs 10 lines changed to become a record, skip it; if it needs 2 lines, do it.
- Record candidates: inspect `common/entity/` for pure-data classes (fields + getters only, no mutation). `Room` was called out as a candidate — verify mutability before converting; if any setter is actively used, keep as class.

## Requirements
**Functional**
- `mvn -f server/pom.xml clean verify` exits 0.
- All tests pass (same count as end of Phase 3).
- Full WS game flow passes.
- `java -jar` still runs; `<mainClass>` updated in shade config.

**Non-functional**
- One commit for the mechanical package rename; separate commit(s) for Java 25 modernization so bisect stays useful.
- No behavior change beyond what language features imply.

## Architecture
- Before: `org.nico.ratel.landlords.{channel,entity,...,server.event,...}`
- After: `com.miti99.caro.common.{channel,entity,...}` + `com.miti99.caro.server.{event,handler,proxy,timer}` + `com.miti99.caro.server.SimpleServer` + `com.miti99.caro.server.ServerContains`

## Related Code Files

**Rename (directories):**
- `server/src/main/java/org/nico/ratel/landlords/channel/` → `server/src/main/java/com/miti99/caro/common/channel/`
- Repeat for: `entity, enums, exception, features, helper, print, robot, transfer, utils`
- `server/src/main/java/org/nico/ratel/landlords/handler/` → split into:
  - common-origin files → `server/src/main/java/com/miti99/caro/common/handler/`
  - server-origin files → `server/src/main/java/com/miti99/caro/server/handler/` (merge with existing content)
- `server/src/main/java/org/nico/ratel/landlords/server/event/` → `server/src/main/java/com/miti99/caro/server/event/`
- Same for `handler, proxy, timer`
- `server/src/main/java/org/nico/ratel/landlords/server/SimpleServer.java` → `server/src/main/java/com/miti99/caro/server/SimpleServer.java`
- `server/src/main/java/org/nico/ratel/landlords/server/ServerContains.java` → `server/src/main/java/com/miti99/caro/server/ServerContains.java`
- `server/src/test/java/org/nico/ratel/landlords/*` → `server/src/test/java/com/miti99/caro/common/*` (tests cover common-package code)

**Modify (content):**
- Every `.java` file under `server/src/{main,test}/java/` — update `package` declaration + every `import org.nico.ratel.landlords.*`
- `server/pom.xml` — `<mainClass>com.miti99.caro.server.SimpleServer</mainClass>`

**Grep verify:**
- `grep -rn "org.nico.ratel" server/` — zero hits expected
- `grep -rn "landlords" server/src/main/java` — zero hits (catches string literals too)

## Implementation Steps

### Part A — Mechanical package rename

1. Verify clean tree; note HEAD sha.
2. Create target dirs:
   ```bash
   mkdir -p server/src/main/java/com/miti99/caro/common
   mkdir -p server/src/main/java/com/miti99/caro/server
   mkdir -p server/src/test/java/com/miti99/caro/common
   ```
3. Move common sub-packages:
   ```bash
   for pkg in channel entity enums exception features helper print robot transfer utils; do
     git mv "server/src/main/java/org/nico/ratel/landlords/$pkg" \
            "server/src/main/java/com/miti99/caro/common/$pkg"
   done
   ```
4. **Split the ambiguous `handler/` dir:** list files in `server/src/main/java/org/nico/ratel/landlords/handler/` and classify each as common vs server using `git log --follow` origin. Move common-origin to `com.miti99.caro.common.handler/`, server-origin to `com.miti99.caro.server.handler/`. If classification uncertain for a file, default to **common** (safer — it's referenced from server, not vice versa) and adjust if compile fails.
5. Move server sub-packages:
   ```bash
   for pkg in event handler proxy timer; do
     git mv "server/src/main/java/org/nico/ratel/landlords/server/$pkg" \
            "server/src/main/java/com/miti99/caro/server/$pkg"
   done
   ```
   If `handler` target dir was created in step 4, merge contents file-by-file instead.
6. Move server root classes:
   ```bash
   git mv server/src/main/java/org/nico/ratel/landlords/server/SimpleServer.java \
          server/src/main/java/com/miti99/caro/server/SimpleServer.java
   git mv server/src/main/java/org/nico/ratel/landlords/server/ServerContains.java \
          server/src/main/java/com/miti99/caro/server/ServerContains.java
   ```
7. Delete the now-empty old tree:
   ```bash
   rm -rf server/src/main/java/org/nico/ratel/landlords/server
   rm -rf server/src/main/java/org/nico/ratel
   rm -rf server/src/main/java/org/nico
   rm -rf server/src/main/java/org
   ```
8. Move test sources analogously into `server/src/test/java/com/miti99/caro/common/...`.
9. Rewrite `package` and `import` statements across all moved files. Use a scripted sed/IDE refactor with careful preview. Two regex rules cover everything:
   - `package org\.nico\.ratel\.landlords\.server(\.\w+)?;` → `package com.miti99.caro.server\1;`
   - `package org\.nico\.ratel\.landlords(\.\w+)?;` → `package com.miti99.caro.common\1;`
   - `import org\.nico\.ratel\.landlords\.server(\.[\w\.]+);` → `import com.miti99.caro.server\1;`
   - `import org\.nico\.ratel\.landlords(\.[\w\.]+);` → `import com.miti99.caro.common\1;`
   - Apply in the order: server rules BEFORE common rules (so `landlords.server.X` isn't eaten by the common rule first).
10. Update `server/pom.xml` — `<mainClass>org.nico.ratel.landlords.server.SimpleServer</mainClass>` → `<mainClass>com.miti99.caro.server.SimpleServer</mainClass>`
11. Grep for stragglers: `grep -rn "org\.nico\.ratel\|landlords" server/ .github/ docker-compose.yml`. Investigate any hits. Docs hits are fine (Phase 6 handles them).
12. `mvn -f server/pom.xml clean verify` — green expected. Fix any misclassified `handler/` files if compile fails.
13. Commit: `refactor: rename packages org.nico.ratel.landlords -> com.miti99.caro.{common,server}`

### Part B — Java 25 opportunistic modernization

14. **Record candidates:** list files in `com.miti99.caro.common.entity/`. For each, inspect:
    - All fields `final` (or convertible without breakage)?
    - Only getters, no setters or mutating methods?
    - No inheritance hierarchy depended on?
    - If yes → rewrite as `record`. If doubt → skip.
15. **`var` for local variables:** within method bodies only, where RHS type is trivially obvious (e.g., `Map<String, List<Foo>> x = new HashMap<>();` → `var x = new HashMap<String, List<Foo>>();`). Do not use `var` where readers can't infer the type at a glance.
16. **Switch expressions:** convert `switch` statements that are pure `case X: return Y;` or assignment-only to arrow-form switch expressions. Leave fall-through switches alone.
17. **Text blocks:** find multi-line string concatenation (e.g., help text, ASCII art) and convert to `"""..."""`.
18. **Explicit non-goals (do NOT do):**
    - Rewrite Netty handlers
    - Change threading model
    - Introduce sealed types or pattern matching in switch (keeps diff small)
    - Inline/extract methods beyond what modernization requires
19. Run validation after each small batch; commit in logical groups (e.g., `refactor(java25): convert common/entity classes to records`, `refactor(java25): var + switch expressions`).

## Todo List
- [ ] Create target package directories
- [ ] Move 10 common sub-packages via `git mv`
- [ ] Split ambiguous `handler/` (classify common vs server per file)
- [ ] Move server sub-packages (event, handler, proxy, timer)
- [ ] Move `SimpleServer`, `ServerContains`
- [ ] Move test sources
- [ ] Rewrite `package` + `import` lines (server rules before common rules)
- [ ] Update `<mainClass>` in `server/pom.xml`
- [ ] Grep-verify zero `org.nico.ratel` / `landlords` in `server/`
- [ ] `mvn -f server/pom.xml clean verify` green
- [ ] WS smoke test passes
- [ ] Commit package rename
- [ ] List record candidates in `common/entity/`
- [ ] Apply record conversions (skip if risky)
- [ ] Apply `var` for obvious local types
- [ ] Convert trivial `switch` statements to switch expressions
- [ ] Apply text blocks to multi-line strings
- [ ] Re-run `mvn verify` after each modernization batch
- [ ] Commit modernization in logical groups

## Success Criteria
- `mvn -f server/pom.xml clean verify` exits 0.
- Shade jar runs; WS game flow passes.
- Zero hits for `grep -rn "org\.nico\.ratel" server/`.
- Tests still pass with same count.
- No new compiler warnings about raw types or deprecated APIs introduced.

## Validation Commands
```bash
# After package rename
mvn -f server/pom.xml clean verify
grep -rn "org\.nico\.ratel\|landlords" server/src
# After each Java 25 batch
mvn -f server/pom.xml clean verify
java -jar server/target/caro-server-0.0.1-beta.jar &
# WS smoke test
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| `handler/` misclassification (common vs server) | Med | Med | Compile catches mistakes; step 4 default to common; document classifications in commit |
| Regex package rewrite misses edge case (e.g., fully-qualified names in code) | Med | Med | Grep-verify with `org\.nico\.ratel` hunts any survivors |
| String literal references to old package (reflection, logging) | Low | Med | Grep for `"org.nico.ratel"` specifically |
| Record conversion breaks serialization (gson field naming) | Med | Med | Test actual WS payload with web-client after each record conversion; revert if payload changes |
| `var` overuse hurts readability | Low | Low | Restrict to cases where RHS is obvious |
| Switch expression semantic change (fall-through) | Low | High | Only convert switches without fall-through; code review each |
| Java 25 modernization balloons scope | High | Low | Strict time-box; skip doubtful cases |

## Security Considerations
- None (pure rename + language feature adoption).
- gson records may encode differently; verify JSON stability on the wire to avoid breaking web-client.

## Rollback
- Package rename: `git revert <rename-commit>` — mechanical, safe.
- Java 25 batches: each is a separate commit, revert individually.
- Full phase: `git reset --hard <pre-phase4-sha>`.

## Next Steps
- Phase 5: rename `web-client/` → `client/` and update docker-compose + CI path references.
