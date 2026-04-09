---
title: "Caro/Gomoku Codebase Simplification"
description: "Strip landlords card game code, fix Gomoku game flow end-to-end, simplify to working client-server Gomoku"
status: pending
priority: P1
effort: 6h
branch: master
tags: [cleanup, gomoku, simplification]
created: 2026-04-09
---

# Caro/Gomoku Codebase Simplification

## Overview

Strip all leftover Chinese Landlords card game code from this Netty-based project, leaving a clean Gomoku (Five-in-a-Row) client-server application. The Gomoku domain classes (Board, GameMove, GomokuHelper, GomokuAI, PieceType, GameResult) already exist and are well-implemented. The main gap is the server/client event handlers still run landlords logic.

## Phase Summary

| # | Phase | Status | Effort | Blocked By |
|---|-------|--------|--------|------------|
| 1 | Delete dead files | Pending | 30m | - |
| 2 | Clean shared code (common module) | Pending | 1h | Phase 1 |
| 3 | Rewrite server event handlers | Pending | 2h | Phase 2 |
| 4 | Rewrite client event handlers | Pending | 1.5h | Phase 2 |
| 5 | Integration test & compile verify | Pending | 1h | Phase 3, 4 |

## Phases

- [Phase 1: Delete Dead Files](./phase-01-delete-dead-files.md)
- [Phase 2: Clean Shared Code](./phase-02-clean-shared-code.md)
- [Phase 3: Rewrite Server Event Handlers](./phase-03-rewrite-server-events.md)
- [Phase 4: Rewrite Client Event Handlers](./phase-04-rewrite-client-events.md)
- [Phase 5: Integration Test & Compile Verify](./phase-05-integration-verify.md)

## Key Architectural Decisions

1. **Keep module names as `landlords-*`** -- renaming Maven modules cascades into groupId, package names, imports across every file. High churn, zero functional value. Defer to a separate PR if desired.
2. **Keep WebSocket support** -- already wired, removing adds risk, keeping costs nothing.
3. **2-player rooms** -- Gomoku is 2-player. Change room full check from `size == 3` to `size == 2`. Auto-start when second player joins.
4. **Remove scoring system** -- Gomoku has no points/scoring. Strip `score`, `scoreRate`, `baseScore`, `scoreInc` from Room and ClientSide.
5. **PVE uses GomokuAI** -- Replace old robot system with single GomokuAI class. Delete AbstractRobotDecisionMakers, Easy/MediumRobotDecisionMakers, RobotDecisionMakers.

## Rollback Plan

Each phase is a separate commit. `git revert` any phase independently. Phase 1 (file deletion) is fully recoverable from git history.
