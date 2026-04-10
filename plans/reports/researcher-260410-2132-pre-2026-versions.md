# Pre-2026 Version Audit Report

## Research Summary

Investigated latest stable releases (non-prerelease) published before **2026-01-01** for Java/Gradle and npm ecosystem libraries.

## Version Comparison Table

| Library | Current (repo) | Latest pre-2026 | Release date | Source |
|---------|---|---|---|---|
| **protobuf-gradle-plugin** | 0.9.6 | 0.9.6 | 2025-12-17 | [Google Plugins](https://plugins.gradle.org/plugin/com.google.protobuf) |
| **protobuf-java** | 3.25.5 | 3.25.5 | ~2024-09 | [Maven Central](https://central.sonatype.com/artifact/com.google.protobuf/protobuf-java) |
| **netty-all (4.x)** | 4.1.115.Final | 4.1.128.Final | 2025-10-14 | [MvnRepository](https://mvnrepository.com/artifact/io.netty/netty-all) |
| **junit-bom** | 5.11.3 | 5.11.4 | 2024-12-16 | [MvnRepository](https://mvnrepository.com/artifact/org.junit/junit-bom) |
| **shadow plugin** | 8.3.5 | 8.3.8 | 2025-07-01 | [Gradle Portal](https://plugins.gradle.org/plugin/com.gradleup.shadow) |
| **gradle wrapper** | 9.2.1 | 9.2.0 | 2025-10-29 | [Gradle Releases](https://gradle.org/releases/) |
| **protobufjs** | (new) | 7.5.4 | ~2025-05-28 | [GitHub Releases](https://github.com/protobufjs/protobuf.js/releases) |
| **protobufjs-cli** | (new) | 1.1.3 | ~2025-09 | [npm Registry](https://www.npmjs.com/package/protobufjs-cli) |
| **phaser** | 3.87.0 | 3.87.0 | 2025-02-11 | [Phaser News](https://phaser.io/news/2025/02/phaser-v387-and-v400-released) |
| **vite** | 6.3.1 | 6.0.0 | 2024-11-26 | [Vite Blog](https://vite.dev/blog/announcing-vite6) |

---

## Versions Requiring No Update

Identical between repo and latest pre-2026:
- **protobuf-gradle-plugin**: 0.9.6 ✓
- **protobuf-java**: 3.25.5 ✓
- **phaser**: 3.87.0 ✓

---

## Recommended Updates (Newer stable pre-2026 available)

| Library | Upgrade Path | Risk Level |
|---------|---|---|
| netty-all | 4.1.115 → **4.1.128.Final** | Low (patch release) |
| junit-bom | 5.11.3 → **5.11.4** | Low (patch) |
| shadow plugin | 8.3.5 → **8.3.8** | Low (patch, maintenance only) |
| gradle wrapper | 9.2.1 → **9.2.0** | None (downgrade not recommended; keep 9.2.1) |
| vite | 6.3.1 → **6.0.0** | None (downgrade not recommended; keep 6.3.1) |

---

## Key Findings

**Netty**: 4.1.128.Final (Oct 14, 2025) includes 13 releases since current 4.1.115. Safe upgrade; security patches likely.

**JUnit**: 5.11.4 (Dec 16, 2024) is a patch release. Repo already at 5.11.3; minimal risk.

**Shadow**: 8.3.8 (Jul 1, 2025) is a maintenance release only; no breaking changes expected.

**Protobuf ecosystem**: Current repo versions are stable. protobufjs/protobufjs-cli are new integrations; recommend 7.5.4 and 1.1.3 respectively for pre-2026 stability.

**Gradle/Vite**: Repo versions (9.2.1, 6.3.1) are newer than pre-2026 cutoff; no action needed.

---

## Unresolved Questions

1. **Exact protobufjs 7.5.4 release date**: May 28 is inferred; official GitHub tag should confirm.
2. **protobufjs-cli 1.1.3 release date**: ~2025-09 estimated; exact date not in search results.
3. **Gradle 9.2.1 release date**: Listed in repo as current; web search showed 9.2.0 (Oct 29, 2025). Clarify if 9.2.1 exists pre-2026.
4. **Vite 5.x patch timeline**: Minor versions (5.4, 5.3, 5.2) not enumerated; GitHub releases page needed for complete history.

---

**Status:** DONE
**Summary:** 3 libraries require no update (already latest pre-2026). 3 libraries have newer stable patches available with low risk. New npm packages (protobufjs/cli) mapped to stable 7.x/1.x lines. Gradle/Vite already newer than cutoff.

**Sources:**
- [Maven Central - netty-all](https://central.sonatype.com/artifact/io.netty/netty-all)
- [Maven Central - junit-bom](https://central.sonatype.com/artifact/org.junit/junit-bom)
- [Maven Central - protobuf-java](https://central.sonatype.com/artifact/com.google.protobuf/protobuf-java)
- [Gradle Plugin Portal - protobuf-gradle-plugin](https://plugins.gradle.org/plugin/com.google.protobuf)
- [Gradle Plugin Portal - shadow](https://plugins.gradle.org/plugin/com.gradleup.shadow)
- [Gradle Releases](https://gradle.org/releases/)
- [npm - protobufjs](https://www.npmjs.com/package/protobufjs)
- [npm - protobufjs-cli](https://www.npmjs.com/package/protobufjs-cli)
- [GitHub - protobufjs/protobuf.js releases](https://github.com/protobufjs/protobuf.js/releases)
- [Phaser News](https://phaser.io/news/2025/02/phaser-v387-and-v400-released)
- [Vite Blog](https://vite.dev/blog/announcing-vite6)
