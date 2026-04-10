# Phase 6 — Docs + README sweep

## Context Links
- Prev: [phase-05-rename-web-client-to-client.md](phase-05-rename-web-client-to-client.md)
- Overview: [plan.md](plan.md)
- Files touched: all 6 in `docs/` + root `README.md`

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Update every documentation file in `docs/` and the root `README.md` to reflect the post-refactor reality: new module/directory names, new package names, new jar path, dropped dependencies, Java 25, and removal of the CLI client + built-in static web UI. Preserve historical Ratel/ainilili credits in the README Credits section.

## Key Insights
- This is the final cleanup phase; it does not touch any code.
- Docs can safely mention the old names only in a "history" context — the grep-verify rule at the end tolerates zero hits outside a permitted Credits block.
- Architecture diagrams in `system-architecture.md` likely reference `StaticFileHandler` and the three-module Maven structure — both are obsolete.
- `codebase-summary.md` has the fastest staleness decay; prioritize it.

## Requirements
**Functional**
- Every doc accurately describes the current repo state.
- No references to deleted code, deleted modules, or old directory names outside permitted historical credits.
- Build/run/test commands in `deployment-guide.md` work when copy-pasted.

**Non-functional**
- Single commit (or one per doc file if reviewers prefer granularity).
- Preserve the tone and structure of existing docs — do not rewrite them wholesale.

## Architecture
- Documentation tree unchanged in shape; contents updated.

## Related Code Files

**Modify:**
- `README.md`
- `docs/codebase-summary.md`
- `docs/code-standards.md`
- `docs/deployment-guide.md`
- `docs/project-overview-pdr.md`
- `docs/project-roadmap.md`
- `docs/system-architecture.md`

## Implementation Steps

1. Enumerate stale references up-front:
   ```bash
   grep -rn "landlords-\|web-client\|org\.nico\.ratel\|noson\|StaticFileHandler\|I18nHelper\|printTranslate\|SimpleClient\|landlords-client\|landlords-common\|messages_en_US" README.md docs/
   ```
   Save to scratch. Every hit must be resolved below.

2. **`docs/codebase-summary.md`:**
   - Replace module list `landlords-common / landlords-server / landlords-client / web-client` with `server/ + client/`
   - Update package namespace mentions: `org.nico.ratel.landlords.*` → `com.miti99.caro.{common,server}.*`
   - Update directory trees (common sub-packages moved under `server/src/main/java/com/miti99/caro/common/`)
   - Remove CLI client section entirely
   - Remove built-in static web UI section entirely
   - Update test file paths (e.g. `GomokuHelperTest.java`, `GomokuAITest.java`) to reflect new location + JUnit 5
   - Mention Java 25 + shade jar path `server/target/caro-server-0.0.1-beta.jar`
   - Update dep table: drop `noson`, drop JUnit 4, drop Spring Boot parent; add `gson`, `junit-jupiter 5.x`, `maven-shade-plugin 3.6.0`

3. **`docs/code-standards.md`:**
   - Java version: update to 25
   - Package prefix: update to `com.miti99.caro`
   - Mention record usage guideline (records for immutable DTOs), `var` usage guideline (when RHS is obvious)
   - Test framework: JUnit 5 (`org.junit.jupiter.api`)

4. **`docs/deployment-guide.md`:**
   - Build command: `mvn -f server/pom.xml clean verify` (drop multi-module `-pl` syntax)
   - Run command: `java -jar server/target/caro-server-0.0.1-beta.jar`
   - Docker: `docker compose build server` + `docker compose up -d` — note service names `server` and `client`
   - Docker base images: Java 25
   - Remove any mention of `landlords-client` jar or CLI run command
   - Remove any mention of static UI at `http://localhost:1025/`
   - Update env vars / ports table if present (1025 WS unchanged)

5. **`docs/project-overview-pdr.md`:**
   - Update project structure diagram
   - Drop CLI client feature description
   - Drop built-in web UI feature description
   - Update tech stack section (Java 25, gson, JUnit 5)

6. **`docs/project-roadmap.md`:**
   - Add completed entry for this refactor (date: 2026-04-10)
   - Remove any roadmap items that targeted the deleted modules
   - Preserve any forward-looking items (e.g. "proto-over-websocket") — note protos are now under `server/src/main/resources/proto/`

7. **`docs/system-architecture.md`:**
   - Update component diagram: no `StaticFileHandler`; pipeline is `HttpServerCodec → HttpObjectAggregator → WebSocketServerProtocolHandler → MessageToMessageCodec → ChannelInputHandler`
   - Update module diagram: single `server/` module (no parent, no common, no CLI)
   - Update package tree: `com.miti99.caro.{common,server}.*`
   - Remove the static-UI serving flow
   - Drop references to `I18nHelper` / i18n properties file

8. **`README.md`:**
   - Quick start section: new build/run commands
   - Architecture overview: `server/` + `client/` with short descriptions
   - Drop CLI client getting-started section
   - Drop built-in web UI section (replaced by `client/`)
   - Update screenshots / asset paths if any were served from the deleted static dir
   - **Credits section:** preserve Ratel / ainilili attribution verbatim (historical, not a live reference)
   - Add note: "Originally forked from ainilili/ratel (Landlords card game). Rewritten as Caro (Gomoku)." if not already present

9. Re-run the enumeration grep from step 1. Expected remaining hits:
   - Zero in `docs/`.
   - In `README.md`: only the Credits section's historical mention of `ratel` / `ainilili`.
   - If any other hit remains, resolve it.

10. Commit: `docs: sweep all docs + README for post-refactor state (server/ + client/, java 25, gson, junit5)`

## Todo List
- [ ] Enumerate stale references across `README.md` + `docs/`
- [ ] Update `docs/codebase-summary.md`
- [ ] Update `docs/code-standards.md`
- [ ] Update `docs/deployment-guide.md`
- [ ] Update `docs/project-overview-pdr.md`
- [ ] Update `docs/project-roadmap.md`
- [ ] Update `docs/system-architecture.md`
- [ ] Update root `README.md` (preserve Credits)
- [ ] Re-run grep — verify zero hits outside Credits
- [ ] Copy-paste verify deployment-guide commands actually work
- [ ] Commit

## Success Criteria
- `grep -rn "landlords-\|org\.nico\.ratel\|noson\|StaticFileHandler\|I18nHelper\|printTranslate\|SimpleClient\|messages_en_US" docs/ README.md` returns only permitted Credits matches (if any).
- `grep -rn "web-client" docs/ README.md` returns zero hits.
- Commands in `deployment-guide.md` execute successfully when copy-pasted.
- Architecture diagrams match actual runtime pipeline.

## Validation Commands
```bash
grep -rn "landlords-\|web-client\|org\.nico\.ratel\|noson\|StaticFileHandler\|I18nHelper\|printTranslate\|SimpleClient\|messages_en_US\|1.4.0" docs/ README.md
# Copy-paste build/run commands from deployment-guide.md:
mvn -f server/pom.xml clean verify
java -jar server/target/caro-server-0.0.1-beta.jar
docker compose build
docker compose up -d
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stale command in deployment-guide copied by user and fails | Med | Med | Explicit copy-paste validation in step 10 |
| Architecture diagram drawn incorrectly | Low | Low | Read `WebsocketProxy.java` to confirm current pipeline before drawing |
| Credits section accidentally stripped | Low | Low | Explicit "preserve Credits" step; diff review |
| Roadmap entry timestamped incorrectly | Low | Low | Use today's date from context: 2026-04-10 |
| Missed grep keyword (e.g., `1.4.0` old jar version) | Low | Low | Enumeration step includes version string |

## Security Considerations
- None (docs-only).

## Rollback
`git reset --hard <pre-phase6-sha>` — single-phase, docs-only, safe.

## Next Steps
- Refactor complete. Post-merge tasks for a follow-up session:
  - Verify CI `build.yml` run is green
  - Verify `deploy-pages.yml` publishes `client/dist` to GH Pages
  - Monitor first week of prod for any regression in the WS protocol (gson JSON stability)

## Unresolved Questions
- Exact latest stable versions to pin (netty-all, gson, junit-jupiter, maven-shade-plugin) — defer to implementer at execution time.
- Whether `eclipse-temurin:25-jre-alpine` is published; fallback is `25-jre`.
- Whether `docs/project-roadmap.md` has other in-flight items that must be reconciled with this refactor's completion.
- Whether any CI secret or GH Pages repo setting references the old `web-client` path externally (outside `.github/workflows/`).
