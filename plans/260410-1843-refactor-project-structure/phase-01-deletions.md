# Phase 1 — Deletions (CLI client, static web UI, i18n)

## Context Links
- Overview: [plan.md](plan.md)
- Next: [phase-02-consolidate-java-sources.md](phase-02-consolidate-java-sources.md)
- Docs touched later: `docs/codebase-summary.md`, `docs/system-architecture.md`

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Remove dead code: the Java CLI client module, the i18n helper only it used, the legacy static web UI served from `landlords-server/src/main/resources/static/` and its handler. Leaves repo structurally identical to today minus dead weight, still buildable via parent POM.

## Key Insights
- `SimplePrinter.printTranslate()` is grep-verified unused after CLI client deletion — safe removal.
- `I18nHelper.enable()` only called from `SimpleClient.java` (CLI) — safe removal.
- `StaticFileHandler` is only registered in `WebsocketProxy` pipeline; removing it means non-WS HTTP requests return default Netty WS error, which is acceptable (locked decision #2).
- Phase 1 does NOT restructure — parent `pom.xml` still exists, module list shrinks by one.

## Requirements
**Functional**
- Repo must still `mvn -pl landlords-server -am clean verify` after phase.
- Server must still boot, accept WebSocket connections, play a full game against the current web-client.

**Non-functional**
- No behavior change for WS clients.
- Single commit (or small atomic series) so rollback is `git reset --hard HEAD~1`.

## Architecture
- Current: `parent pom → {landlords-common, landlords-server, landlords-client}`
- After phase: `parent pom → {landlords-common, landlords-server}`
- WebsocketProxy pipeline loses `StaticFileHandler`; keeps `HttpServerCodec`, `HttpObjectAggregator`, `WebSocketServerProtocolHandler`, `MessageToMessageCodec`, `ChannelInputHandler`.

## Related Code Files

**Delete (directories):**
- `landlords-client/` (entire module)
- `landlords-server/src/main/resources/static/` (css, js, index.html)

**Delete (files):**
- `landlords-common/src/main/java/org/nico/ratel/landlords/helper/I18nHelper.java`
- `landlords-common/src/main/resources/messages_en_US.properties`
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/handler/StaticFileHandler.java`

**Modify:**
- `landlords-common/src/main/java/org/nico/ratel/landlords/print/SimplePrinter.java` — delete the `printTranslate(...)` method(s); keep `printNotice` + `serverLog`
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/proxy/WebsocketProxy.java` — remove `StaticFileHandler` import + `.addLast(new StaticFileHandler())` line (~line 48)
- `pom.xml` (root) — remove `<module>landlords-client</module>`
- `landlords-server/Dockerfile` — remove `COPY landlords-client/...` lines (if any)

## Implementation Steps

1. Create branch checkpoint: ensure clean tree (`git status`), note HEAD sha.
2. `git rm -r landlords-client`
3. `git rm landlords-common/src/main/java/org/nico/ratel/landlords/helper/I18nHelper.java`
4. `git rm landlords-common/src/main/resources/messages_en_US.properties`
5. Open `landlords-common/.../print/SimplePrinter.java`, delete `printTranslate` method(s). Verify no other references remain: `grep -rn "printTranslate" landlords-common landlords-server`.
6. `git rm landlords-server/src/main/java/org/nico/ratel/landlords/server/handler/StaticFileHandler.java`
7. `git rm -r landlords-server/src/main/resources/static`
8. Open `landlords-server/.../proxy/WebsocketProxy.java`:
   - Remove `import ...server.handler.StaticFileHandler;`
   - Remove `.addLast(new StaticFileHandler())` line
9. Open root `pom.xml`, delete `<module>landlords-client</module>` line.
10. Open `landlords-server/Dockerfile`, remove any `COPY landlords-client ...` lines.
11. `grep -rn "I18nHelper\|printTranslate\|StaticFileHandler\|messages_en_US" .` — must return zero (or only matches inside already-deleted paths).
12. Run validation commands.
13. Commit: `refactor: delete CLI client, i18n helper, and legacy static web UI`

## Todo List
- [ ] Delete `landlords-client/` directory
- [ ] Delete `I18nHelper.java`
- [ ] Delete `messages_en_US.properties`
- [ ] Remove `printTranslate()` method from `SimplePrinter.java`
- [ ] Delete `StaticFileHandler.java`
- [ ] Delete `landlords-server/src/main/resources/static/`
- [ ] Remove `StaticFileHandler` from `WebsocketProxy.java` pipeline + import
- [ ] Remove `landlords-client` module from root `pom.xml`
- [ ] Remove `COPY landlords-client` from Dockerfile (if present)
- [ ] Grep-verify no dangling references
- [ ] `mvn -pl landlords-server -am clean verify` passes
- [ ] Manual WS smoke test passes
- [ ] Commit

## Success Criteria
- `mvn -pl landlords-server -am clean verify` exits 0.
- `java -jar landlords-server/target/*.jar` (or existing run command) starts server without error.
- Current web-client can connect via WS, create room, and play one move.
- `curl http://localhost:1025/` no longer returns HTML (returns WS-expected 400 or connection-close — acceptable).
- `grep -rn "landlords-client\|StaticFileHandler\|I18nHelper\|printTranslate\|messages_en_US" .` returns only historical matches in `docs/` (those cleaned in Phase 6).

## Validation Commands
```bash
mvn -pl landlords-server -am clean verify
# In one shell:
java -jar landlords-server/target/landlords-server-*.jar
# In another: open client, play a move
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Unseen dependency on `I18nHelper` outside `SimpleClient` | Low | Med | Grep before delete; fix compile errors if any before commit |
| `printTranslate` called via reflection | Very Low | Low | Grep for `"printTranslate"` string literal too |
| Web-client expects to load a static asset from server | Low | Low | Verified Phase 3 docs — client is self-hosted by Vite/nginx |
| Dockerfile build breaks from stale COPY | Low | Low | `docker compose build server` before commit |

## Security Considerations
- Removing static file serving reduces attack surface (no path traversal, no stale HTML/JS).
- No auth changes.

## Rollback
`git reset --hard <pre-phase1-sha>` — single phase, single commit, no external state.

## Next Steps
- Proceed to Phase 2 only after validation is green.
- Phase 2 depends on knowing the common/server sub-package sets are disjoint (verified in locked decisions).
