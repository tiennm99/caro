# Phase 2 — Consolidate Java sources into landlords-server

## Context Links
- Prev: [phase-01-deletions.md](phase-01-deletions.md)
- Next: [phase-03-standalone-maven-and-rename-server.md](phase-03-standalone-maven-and-rename-server.md)
- Overview: [plan.md](plan.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Physically move `landlords-common/src/**` into `landlords-server/src/**`, delete the `landlords-common` module, delete `protoc-resource/` (after moving `*.proto` + `generate.sh` to `landlords-server/src/main/resources/proto/`). Parent POM still exists after this phase but only contains a single child module; it will be removed in Phase 3.

## Key Insights
- `landlords-common` sub-packages (`channel, entity, enums, exception, features, handler, helper, print, robot, transfer, utils`) are **disjoint** from `landlords-server`'s sub-packages (`event, handler, proxy, timer` + `SimpleServer`, `ServerContains`) — merge can be a plain directory-level `git mv` with no filename collisions.
- **Potential collision:** both modules have a `handler/` sub-package. Verify file names don't clash before moving; if they do, move individually.
- Proto files are moved now (not Phase 3) so Phase 3 can focus on POM rewrite without also juggling file moves.

## Requirements
**Functional**
- `mvn -pl landlords-server -am clean verify` (which after this phase equals `mvn verify` on the single remaining module) passes.
- All existing tests still run and pass.

**Non-functional**
- Zero Java source edits (no package renames yet, no noson→gson yet).
- File history preserved via `git mv`.

## Architecture
- Before: two Maven modules, common as dep of server.
- After: single module `landlords-server` containing all Java code + proto resources. Root `pom.xml` now has `<modules><module>landlords-server</module></modules>`.

## Related Code Files

**Move (directories, preserving structure):**
- `landlords-common/src/main/java/org/nico/ratel/landlords/channel/` → `landlords-server/src/main/java/org/nico/ratel/landlords/channel/`
- Same for: `entity`, `enums`, `exception`, `features`, `helper`, `print`, `robot`, `transfer`, `utils`
- `landlords-common/src/main/java/org/nico/ratel/landlords/handler/` → merge into `landlords-server/src/main/java/org/nico/ratel/landlords/handler/` (verify no filename clashes first)
- `landlords-common/src/test/java/**` → `landlords-server/src/test/java/**` (create target dir if missing)
- `protoc-resource/*.proto` + `protoc-resource/generate.sh` → `landlords-server/src/main/resources/proto/`

**Delete (after moves):**
- `landlords-common/` entirely
- `protoc-resource/` entirely

**Modify:**
- `pom.xml` (root) — remove `<module>landlords-common</module>`
- `landlords-server/pom.xml` — remove `<dependency>` block referencing `landlords-common`
- `landlords-server/Dockerfile` — remove `COPY landlords-common ...` + `COPY protoc-resource protoc-resource` lines (if present)

## Implementation Steps

1. Verify clean tree; note HEAD sha.
2. **Collision check:** `ls landlords-common/src/main/java/org/nico/ratel/landlords/handler/ landlords-server/src/main/java/org/nico/ratel/landlords/handler/` — list both directories. If any filename appears in both, stop and report (should not happen per codebase-summary).
3. Create target test dir: `mkdir -p landlords-server/src/test/java/org/nico/ratel/landlords`
4. Create target proto dir: `mkdir -p landlords-server/src/main/resources/proto`
5. Move Java main sources, one sub-package at a time, using `git mv`:
   ```bash
   for pkg in channel entity enums exception features helper print robot transfer utils; do
     git mv "landlords-common/src/main/java/org/nico/ratel/landlords/$pkg" \
            "landlords-server/src/main/java/org/nico/ratel/landlords/$pkg"
   done
   ```
6. Move `handler/` sub-package file-by-file (since server already has a `handler/` dir):
   ```bash
   git mv landlords-common/src/main/java/org/nico/ratel/landlords/handler/*.java \
          landlords-server/src/main/java/org/nico/ratel/landlords/handler/
   rmdir landlords-common/src/main/java/org/nico/ratel/landlords/handler
   ```
7. Move tests: `git mv landlords-common/src/test/java/org/nico/ratel/landlords/* landlords-server/src/test/java/org/nico/ratel/landlords/` (create any missing intermediate dirs first).
8. Move proto: `git mv protoc-resource/*.proto protoc-resource/generate.sh landlords-server/src/main/resources/proto/`
9. Delete emptied dirs:
   ```bash
   git rm -r landlords-common
   git rm -r protoc-resource
   ```
10. Edit root `pom.xml` — remove `<module>landlords-common</module>`.
11. Edit `landlords-server/pom.xml` — remove the `<dependency>…landlords-common…</dependency>` block.
12. Edit `landlords-server/Dockerfile` — delete `COPY landlords-common ...` and `COPY protoc-resource protoc-resource` lines.
13. Run validation.
14. Commit: `refactor: consolidate landlords-common into landlords-server; move protos into server resources`

## Todo List
- [ ] Collision check between `common/handler` and `server/handler`
- [ ] Move 10 disjoint sub-packages via `git mv`
- [ ] Merge `handler/` sub-package file-by-file
- [ ] Move test sources
- [ ] Move proto files + generate.sh
- [ ] Delete `landlords-common/` and `protoc-resource/`
- [ ] Update root `pom.xml` modules
- [ ] Remove `landlords-common` dependency from `landlords-server/pom.xml`
- [ ] Update `Dockerfile` COPY paths
- [ ] `mvn -pl landlords-server -am clean verify` passes
- [ ] Tests run + pass (count matches pre-phase)
- [ ] Commit

## Success Criteria
- `mvn -pl landlords-server -am clean verify` exits 0.
- Test count in Surefire report ≥ pre-phase count (no tests silently lost).
- Server boots; WS smoke test passes.
- `find landlords-common protoc-resource 2>/dev/null` returns nothing.
- `git log --follow` on a moved file shows history preserved.

## Validation Commands
```bash
mvn -pl landlords-server -am clean verify
java -jar landlords-server/target/landlords-server-*.jar &
# WS smoke test via web-client
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Filename collision in `handler/` sub-package | Low | Med | Step 2 explicit check; abort phase if found |
| Lost test sources (not moved) | Low | High | Compare test count before/after |
| Git loses file history | Low | Low | Use `git mv` not raw `mv`+add |
| Dockerfile build breaks from stale `COPY` | Med | Low | `docker compose build server` before commit |
| Maven reactor caches stale jar | Low | Low | `mvn clean` before verify |

## Security Considerations
- None (pure file move).

## Rollback
`git reset --hard <pre-phase2-sha>` — single phase, atomic commit.

## Next Steps
- Phase 3: standalone POM rewrite, Java 25, shade, deps modernization, dir rename `landlords-server/` → `server/`.
