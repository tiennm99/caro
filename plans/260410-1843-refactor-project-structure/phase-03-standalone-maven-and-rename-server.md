# Phase 3 — Standalone Maven + Java 25 + shade + noson→gson + JUnit 5 + rename to server/

## Context Links
- Prev: [phase-02-consolidate-java-sources.md](phase-02-consolidate-java-sources.md)
- Next: [phase-04-package-rename-and-java25-modernization.md](phase-04-package-rename-and-java25-modernization.md)
- Overview: [plan.md](plan.md)
- Relevant docs to update later: `docs/code-standards.md`, `docs/deployment-guide.md`, `docs/system-architecture.md`

## Overview
- **Priority:** P2
- **Status:** pending
- **Description:** Rewrite `landlords-server/pom.xml` as a standalone project (no parent), upgrade to Java 25, replace Spring Boot parent with `maven-shade-plugin`, swap `com.smallnico:noson` for `com.google.code.gson:gson`, migrate JUnit 4 tests to JUnit 5, delete root `pom.xml`, then rename directory `landlords-server/` → `server/`. Update Dockerfile base images and docker-compose + CI path references. Package names remain `org.nico.ratel.landlords.*` in this phase — they will be renamed in Phase 4.

## Key Insights
- This is the largest risk phase: build system + deps + dir rename + test framework change.
- Keep phases disjoint: **no** package rename here — doing both at once explodes diff size and makes bisect impossible.
- noson → gson call sites are grep-verified (7 total). Use a shared `Gson` instance where possible for clarity, but correctness-first.
- JUnit 4 → 5: only two test files (`GomokuHelperTest.java`, `GomokuAITest.java`) per docs; mechanical edit.
- Java 25 modernization (records, `var`, switch expressions) is deferred to Phase 4 — this phase changes ONLY build config + imports + dep swaps.
- Version pins:
  - `netty-all` 4.1.x latest stable
  - `protobuf-java` 3.25.5 (pinned per locked decision)
  - `gson` latest stable
  - `junit-jupiter` 5.x latest stable
  - `maven-shade-plugin` 3.6.0 (or latest)
  - Java 25 base images: `maven:3.9-eclipse-temurin-25` (build), `eclipse-temurin:25-jre-alpine` (runtime) — verify tag availability at execution time; fall back to `25-jre` if alpine variant unavailable.

## Requirements
**Functional**
- `mvn -f server/pom.xml clean verify` exits 0.
- Shade produces a runnable fat jar at `server/target/caro-server-0.0.1-beta.jar`.
- `java -jar server/target/caro-server-0.0.1-beta.jar` starts the server on port 1025.
- `docker compose build server && docker compose up server` boots successfully on Java 25.
- Full WS game flow works end-to-end with current web-client.
- All tests (now JUnit 5) pass.

**Non-functional**
- Single coherent commit per logical step (POM rewrite, dep swap, test migration, dir rename, Dockerfile, CI) — or one well-organized squash.
- No code behavior change outside mechanical migrations.

## Architecture
- Before: parent POM → landlords-server; Spring Boot parent provides dep mgmt + packaging.
- After: `server/pom.xml` standalone, explicit deps, `maven-shade-plugin` packaging, `<mainClass>org.nico.ratel.landlords.server.SimpleServer</mainClass>` (package still old until Phase 4).
- Dir: `landlords-server/` → `server/`.
- Dockerfile multi-stage: Java 25 build → Java 25 runtime.

## Related Code Files

**Delete:**
- `pom.xml` (root)

**Rewrite:**
- `landlords-server/pom.xml` → standalone (then moved to `server/pom.xml`)

**Modify (noson → gson call sites):**
- `landlords-server/src/main/java/org/nico/ratel/landlords/helper/MapHelper.java` (2 calls, now under `landlords-server/` after Phase 2)
- `landlords-server/src/main/java/org/nico/ratel/landlords/transfer/TransferProtocolUtils.java` (2 calls)
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/event/ServerEventListener_CODE_GAME_WATCH.java` (1 call)
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/event/ServerEventListener_CODE_GET_ROOMS.java` (1 call)
- `landlords-server/src/main/java/org/nico/ratel/landlords/server/event/ServerEventListener_CODE_ROOM_CREATE.java` (1 call)
- Any additional noson imports in tests — grep to confirm.

**Modify (JUnit 4 → 5):**
- `landlords-server/src/test/java/org/nico/ratel/landlords/.../GomokuHelperTest.java`
- `landlords-server/src/test/java/org/nico/ratel/landlords/.../GomokuAITest.java`

**Rename (directory):**
- `landlords-server/` → `server/`

**Modify after rename:**
- `server/Dockerfile` — Java 25 base images, updated `COPY` paths (no more `landlords-server/` prefix)
- `docker-compose.yml` — `dockerfile: server/Dockerfile` (context stays `.`)
- `.github/workflows/build.yml` — Maven step: `mvn -f server/pom.xml verify`; adjust working-directory if used

## Implementation Steps

### Part A — POM rewrite + dep swap (still in `landlords-server/`)

1. Grep all noson call sites to lock list: `grep -rn "Noson\." landlords-server/src`. Confirm matches the 7 listed above (plus any test hits).
2. Grep JUnit 4 imports: `grep -rn "org.junit.Test\|org.junit.Assert\|org.junit.Before" landlords-server/src/test`.
3. Delete root `pom.xml`.
4. Rewrite `landlords-server/pom.xml` as standalone:
   ```xml
   <project xmlns="http://maven.apache.org/POM/4.0.0" ...>
     <modelVersion>4.0.0</modelVersion>
     <groupId>com.miti99.caro</groupId>
     <artifactId>caro-server</artifactId>
     <version>0.0.1-beta</version>
     <packaging>jar</packaging>
     <properties>
       <maven.compiler.source>25</maven.compiler.source>
       <maven.compiler.target>25</maven.compiler.target>
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
     </properties>
     <dependencies>
       <dependency><groupId>io.netty</groupId><artifactId>netty-all</artifactId><version>4.1.x</version></dependency>
       <dependency><groupId>com.google.protobuf</groupId><artifactId>protobuf-java</artifactId><version>3.25.5</version></dependency>
       <dependency><groupId>com.google.code.gson</groupId><artifactId>gson</artifactId><version>latest</version></dependency>
       <dependency><groupId>org.junit.jupiter</groupId><artifactId>junit-jupiter</artifactId><version>5.x</version><scope>test</scope></dependency>
     </dependencies>
     <build>
       <finalName>caro-server-0.0.1-beta</finalName>
       <plugins>
         <plugin>
           <groupId>org.apache.maven.plugins</groupId><artifactId>maven-shade-plugin</artifactId><version>3.6.0</version>
           <executions><execution><phase>package</phase><goals><goal>shade</goal></goals>
             <configuration>
               <transformers>
                 <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                   <mainClass>org.nico.ratel.landlords.server.SimpleServer</mainClass>
                 </transformer>
               </transformers>
             </configuration>
           </execution></executions>
         </plugin>
         <plugin>
           <artifactId>maven-surefire-plugin</artifactId><version>3.2.x</version>
         </plugin>
       </plugins>
     </build>
   </project>
   ```
   Pin exact versions at execution time to the latest stable releases.
5. `mvn -f landlords-server/pom.xml clean verify` — expect compile errors from noson call sites + JUnit 4 imports. This is the checkpoint before migration.

### Part B — noson → gson migration

6. For each of the 7 call sites, replace:
   - `import com.smallnico.noson.Noson;` → `import com.google.gson.Gson;`
   - Class-level `private static final Gson GSON = new Gson();` where multiple calls exist (DRY)
   - `Noson.reversal(obj)` → `GSON.toJson(obj)`
   - `Noson.convert(json, Clazz.class)` → `GSON.fromJson(json, Clazz.class)`
7. Grep-verify zero `Noson` references remain: `grep -rn "Noson\|noson\|smallnico" landlords-server`.

### Part C — JUnit 4 → 5 migration

8. In both test files:
   - `import org.junit.Test;` → `import org.junit.jupiter.api.Test;`
   - `import org.junit.Before;` → `import org.junit.jupiter.api.BeforeEach;` (and rename annotations)
   - `import org.junit.Assert;` (or static imports) → `import org.junit.jupiter.api.Assertions;` (adjust static imports)
   - `@Before` → `@BeforeEach`
   - `Assert.assertEquals(...)` → `Assertions.assertEquals(...)` (or static import)
9. `mvn -f landlords-server/pom.xml clean verify` — expect green.

### Part D — Directory rename

10. `git mv landlords-server server`
11. Run `mvn -f server/pom.xml clean verify` — expect green (POM has no hardcoded dir paths).

### Part E — Dockerfile + docker-compose + CI

12. Rewrite `server/Dockerfile`:
    - Build stage: `FROM maven:3.9-eclipse-temurin-25 AS build`, `WORKDIR /build`, `COPY pom.xml .`, `COPY src src`, `RUN mvn -B -DskipTests package`
    - Runtime stage: `FROM eclipse-temurin:25-jre-alpine` (fallback `25-jre`), `WORKDIR /app`, `COPY --from=build /build/target/caro-server-0.0.1-beta.jar app.jar`, `EXPOSE 1025`, `ENTRYPOINT ["java","-jar","app.jar"]`
    - Note: build-stage context is the `server/` dir because docker-compose will set `context: ./server` OR root with `dockerfile: server/Dockerfile` — choose based on current compose shape. Locked decision: context stays `.`, dockerfile path `server/Dockerfile`; COPY paths in build stage must be `server/pom.xml` and `server/src`.
13. Edit `docker-compose.yml`:
    - `services.server.build.context: .`
    - `services.server.build.dockerfile: server/Dockerfile`
    - Container name and other fields untouched.
14. Edit `.github/workflows/build.yml`:
    - Maven step: `run: mvn -f server/pom.xml -B verify`
    - Cache key / path for `~/.m2` unchanged.
15. Run validation.
16. Commit (or split into logical commits): `refactor: standalone maven + java 25 + shade + gson + junit5; rename landlords-server to server`

## Todo List
- [ ] Grep-lock noson call sites (expect 7)
- [ ] Grep-lock JUnit 4 test files (expect 2)
- [ ] Delete root `pom.xml`
- [ ] Rewrite `landlords-server/pom.xml` standalone with Java 25 + shade
- [ ] Pin exact latest versions (netty, gson, junit-jupiter, shade-plugin)
- [ ] Migrate 7 noson → gson call sites
- [ ] Migrate 2 test files JUnit 4 → 5
- [ ] `mvn verify` green before directory rename
- [ ] `git mv landlords-server server`
- [ ] Rewrite `server/Dockerfile` with Java 25 base images + new COPY paths
- [ ] Update `docker-compose.yml` dockerfile path
- [ ] Update `.github/workflows/build.yml` Maven step
- [ ] `mvn -f server/pom.xml clean verify` green
- [ ] `docker compose build server` succeeds
- [ ] `docker compose up server` + WS smoke test passes
- [ ] Commit

## Success Criteria
- Build: `mvn -f server/pom.xml clean verify` exits 0.
- Artifact: `server/target/caro-server-0.0.1-beta.jar` exists and is runnable.
- Runtime: `java -jar` boots, WS port listens, full game flow passes.
- Docker: `docker compose build server` succeeds; container runs on Java 25 (`docker compose exec server java -version` shows 25).
- CI: manually simulate `mvn -f server/pom.xml -B verify` from repo root — exits 0.
- Grep: zero `Noson`, `smallnico`, `junit.Test`, `junit.Assert` references in `server/`.

## Validation Commands
```bash
mvn -f server/pom.xml clean verify
java -jar server/target/caro-server-0.0.1-beta.jar &
# WS smoke test
docker compose build server
docker compose up -d server
docker compose exec server java -version
# WS smoke test against containerized server
docker compose down
```

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Java 25 not available in Spring/Netty deps | Low | High | Dropping Spring parent removes risk; Netty 4.1 is pure-Java, compatible with 25 |
| `eclipse-temurin:25-jre-alpine` tag missing | Med | Low | Fall back to `25-jre`; note in commit |
| Shade plugin misses a transformer (e.g., META-INF services) | Med | Med | Add `ServicesResourceTransformer` if Netty uses SPI (it does for some providers); test jar directly |
| gson behaves differently than noson (whitespace, field naming) | Low | Med | Smoke test covers actual WS payloads; inspect JSON on wire with browser devtools |
| JUnit 5 needs `junit-jupiter` (aggregator) not just `junit-jupiter-api` | Low | Low | Use aggregator artifact per locked decision |
| CI fails because cache key stale | Low | Low | `actions/cache` is keyed by POM hash — will self-invalidate |
| `git mv` on Windows case-insensitive FS misses | Low | Low | Directory rename is a distinct name change, no case issue |
| Dockerfile context mismatch between compose and Dockerfile `COPY` | Med | Med | Explicit step 12 note; test `docker compose build` before commit |

## Security Considerations
- Dropping Spring Boot parent removes transitive CVE exposure from Spring ecosystem.
- gson has a larger install base + active security maintenance vs noson (unmaintained).
- Pin all versions explicitly; no version ranges.

## Rollback
`git reset --hard <pre-phase3-sha>` — single-phase rollback. Because this phase also deletes root `pom.xml`, rollback restores it automatically.

## Next Steps
- Phase 4: rename all packages `org.nico.ratel.landlords.*` → `com.miti99.caro.{common,server}.*` + opportunistic Java 25 modernization (records, `var`, switch expressions).
