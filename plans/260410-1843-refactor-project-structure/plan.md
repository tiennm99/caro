---
title: "Monorepo Refactor: Consolidate to server/ + client/"
description: "Collapse multi-module Maven into standalone server/, rename web-client/ to client/, modernize to Java 25, migrate noson→gson + JUnit 4→5"
status: pending
priority: P2
effort: 12h
branch: master
tags: [refactor, maven, java25, docker, monorepo]
created: 2026-04-10
---

# Refactor Project Structure

## Goal
Collapse 3-module Maven build (`landlords-common`, `landlords-server`, `landlords-client`) into a single standalone `server/` Maven project; rename `web-client/` → `client/`; migrate to Java 25 + gson + JUnit 5; repackage to `com.miti99.caro.*`; delete dead CLI-client + static-UI code.

## Phases (strictly serial — each leaves repo buildable)

| # | Phase | Status | File | Effort |
|---|-------|--------|------|--------|
| 1 | Deletions (CLI client, static UI, i18n) | pending | [phase-01-deletions.md](phase-01-deletions.md) | 1h |
| 2 | Consolidate Java sources into landlords-server | pending | [phase-02-consolidate-java-sources.md](phase-02-consolidate-java-sources.md) | 1.5h |
| 3 | Standalone Maven + Java 25 + shade + noson→gson + JUnit 5 + rename to server/ | pending | [phase-03-standalone-maven-and-rename-server.md](phase-03-standalone-maven-and-rename-server.md) | 3.5h |
| 4 | Package rename org.nico.ratel → com.miti99.caro + Java 25 modernization | pending | [phase-04-package-rename-and-java25-modernization.md](phase-04-package-rename-and-java25-modernization.md) | 3h |
| 5 | Rename web-client/ → client/ | pending | [phase-05-rename-web-client-to-client.md](phase-05-rename-web-client-to-client.md) | 1h |
| 6 | Docs + README sweep | pending | [phase-06-docs-and-readme-sweep.md](phase-06-docs-and-readme-sweep.md) | 2h |

## Dependencies
- Phase N depends on Phase N-1 (hard serial). No parallelism.
- Each phase ends with a **working build + working WS game flow**.
- Phase 3 is the largest risk (build system rewrite); Phase 4 is the largest diff (every Java file touched).

## Rollback
Each phase = one or more commits on `master`. Rollback = `git reset --hard <prev-commit>`; no schema/data migration.

## Out of scope
- Netty threading / virtual threads
- Proto-over-websocket protocol change (proto files moved for future use only)
- web-client internal refactor (dir rename only)
- Removing Ratel/ainilili historical credits from README
