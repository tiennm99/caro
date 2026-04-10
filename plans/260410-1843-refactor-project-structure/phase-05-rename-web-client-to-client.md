# Phase 5 — Rename web-client/ → client/

## Context Links
- Prev: [phase-04-package-rename-and-java25-modernization.md](phase-04-package-rename-and-java25-modernization.md)
- Next: [phase-06-docs-and-readme-sweep.md](phase-06-docs-and-readme-sweep.md)
- Overview: [plan.md](plan.md)

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Rename top-level `web-client/` directory to `client/`, update docker-compose service/container names + build context, and fix every `web-client/**` path reference in both GitHub Actions workflows. No changes inside `client/` source tree.

## Key Insights
- Internal files of the frontend (src/, package.json, Vite config) are untouched — pure directory rename.
- Service name change (`web-client` → `client`) and container name change (`caro-web-client` → `caro-client`) are distinct from the directory rename; any external docs/scripts referencing the old container name must be updated in Phase 6.
- `deploy-pages.yml` has multiple `web-client/**` path references (path filter, working-directory, npm cache path, upload-pages-artifact path) — enumerate all before editing.

## Requirements
**Functional**
- `cd client && npm ci && npm run build` succeeds (proves nothing internal broke).
- `docker compose build client` succeeds.
- `docker compose up client` serves the UI; manual browser check loads the game.
- WS connection from new `client` container to `server` container still works end-to-end.
- CI workflows remain syntactically valid (YAML parse) — verify via `gh workflow view` or `actionlint` if available; otherwise manual dispatch after push.

**Non-functional**
- Single commit for the directory rename + config updates.
- File history preserved via `git mv`.

## Architecture
- Before: `web-client/` (Vite + Phaser); compose service `web-client`, container `caro-web-client`.
- After: `client/` (identical contents); compose service `client`, container `caro-client`.

## Related Code Files

**Rename (directory):**
- `web-client/` → `client/`

**Modify:**
- `docker-compose.yml`:
  - `services.web-client:` → `services.client:`
  - `services.client.container_name: caro-web-client` → `caro-client`
  - `services.client.build.context: ./web-client` → `./client`
  - Any `depends_on: [web-client]` or similar cross-references
- `.github/workflows/build.yml`:
  - Job working directory: `web-client` → `client`
  - `paths:` filter: `web-client/**` → `client/**`
  - `cache-dependency-path: web-client/package-lock.json` → `client/package-lock.json`
  - Any step-level `working-directory: web-client` → `client`
- `.github/workflows/deploy-pages.yml`:
  - `paths:` filter: `web-client/**` → `client/**`
  - `working-directory: web-client` → `client` (all occurrences)
  - `cache-dependency-path: web-client/package-lock.json` → `client/package-lock.json`
  - `actions/upload-pages-artifact` `path: web-client/dist` → `client/dist`
  - Any `${{ github.workspace }}/web-client` → `${{ github.workspace }}/client`

## Implementation Steps

1. Verify clean tree; note HEAD sha.
2. Enumerate all `web-client` references for final grep target: `grep -rn "web-client" .github docker-compose.yml`. Print to scratch and verify each will be covered by edits below.
3. `git mv web-client client`
4. Edit `docker-compose.yml`:
   - Rename `web-client` service key to `client`
   - Update `container_name` to `caro-client`
   - Update `build.context` to `./client`
   - Update any `depends_on` entries
5. Edit `.github/workflows/build.yml`:
   - Replace all `web-client` occurrences with `client` (use scoped replace to avoid touching unrelated words)
   - Confirm `paths:` filter, `working-directory`, `cache-dependency-path`
6. Edit `.github/workflows/deploy-pages.yml`:
   - Same style of replacement; verify `upload-pages-artifact` `path` is now `client/dist`
7. Grep-verify: `grep -rn "web-client\|caro-web-client" .github docker-compose.yml` — expect zero hits.
8. Local build check: `cd client && npm ci && npm run build`
9. Docker check: `docker compose build client && docker compose up -d client`
10. Browser smoke test: open UI, confirm it loads and connects to server (if server is also up).
11. `docker compose down`
12. Optional: `actionlint .github/workflows/*.yml` if installed.
13. Commit: `refactor: rename web-client/ to client/ and update compose + CI references`

## Todo List
- [ ] Enumerate all `web-client` references for coverage check
- [ ] `git mv web-client client`
- [ ] Update `docker-compose.yml` service key, container_name, build.context
- [ ] Update `.github/workflows/build.yml` paths + working-directory + cache paths
- [ ] Update `.github/workflows/deploy-pages.yml` paths + working-directory + cache + artifact path
- [ ] Grep-verify zero `web-client` references outside `docs/`
- [ ] `npm ci && npm run build` in `client/` passes
- [ ] `docker compose build client` succeeds
- [ ] Browser smoke test passes
- [ ] Commit

## Success Criteria
- Zero `web-client` / `caro-web-client` hits in `docker-compose.yml` and `.github/`.
- `client/` builds locally and via Docker.
- Browser loads the game and connects to server.
- Workflows parse without errors.

## Validation Commands
```bash
grep -rn "web-client" .github docker-compose.yml
cd client && npm ci && npm run build && cd ..
docker compose build client
docker compose up -d client
# Manual browser check at the exposed port
docker compose down
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Missed `web-client/**` path in `deploy-pages.yml` | Med | Med | Step 2 enumeration + step 7 grep-verify |
| GitHub Pages deploy breaks until next successful run | Med | Low | Trigger manual dispatch after merge to validate |
| `paths:` filter skips all pushes because no matching change | Low | Low | First push after rename will definitely match |
| docker-compose service rename breaks downstream scripts | Low | Low | Search repo for `web-client` usage outside listed files |
| Cached npm artifacts keyed by old path | Low | Low | `actions/cache` key includes `package-lock.json` hash — self-invalidates |

## Security Considerations
- None. Directory rename does not change any security posture.

## Rollback
`git reset --hard <pre-phase5-sha>` — single-phase rollback; GitHub Pages will resume from previous config on next push.

## Next Steps
- Phase 6: sweep `docs/` and `README.md` for stale references (`landlords-`, `web-client`, `org.nico.ratel`, `noson`, CLI client, built-in web UI).
