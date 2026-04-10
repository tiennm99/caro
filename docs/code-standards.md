# Code Standards & Guidelines

## Core Principles

**YAGNI** — You Aren't Gonna Need It (don't add features not in spec)  
**KISS** — Keep It Simple, Stupid (prefer straightforward solutions)  
**DRY** — Don't Repeat Yourself (extract common patterns)

All code must be:
- **Readable** — Clear naming, logical structure, self-documenting
- **Maintainable** — Under 200 lines per file, single responsibility
- **Testable** — Isolated logic, mockable dependencies
- **Documented** — Public APIs have Javadoc/JSDoc

---

## Java Code Standards

### Package Naming

```
com.miti99.caro.{common|server}.{subcomponent}
```

**Examples:**
- `com.miti99.caro.common.entity` — Shared data models
- `com.miti99.caro.common.helper` — Game logic & utilities
- `com.miti99.caro.common.robot` — AI engine
- `com.miti99.caro.server.event` — Server event handlers
- `com.miti99.caro.server.handler` — Netty pipeline handlers
- `com.miti99.caro.server.proxy` — TCP/WebSocket server bootstrap

### Class Naming

**Style:** PascalCase

**Patterns:**
- `FooBar` — Regular classes
- `FooBarListener` — Event listeners
- `FooBarHandler` — Protocol/network handlers
- `FooBarProxy` — Message sending proxies
- `FooBarTest` — Unit test classes
- `FooBarImpl` — Concrete implementations (rare)
- `AbstractFooBar` — Base classes

**Examples:**
```java
// Good
public class Board { ... }
public class ServerEventListener_CODE_GAME_MOVE { ... }
public class GomokuHelper { ... }

// Avoid
public class board { ... }            // lowercase
public class GameMoveListener { ... } // unclear purpose
```

### File Organization

**One public class per file:**
```
ClassName.java
├── Package declaration
├── Imports (alphabetical)
├── Class declaration
├── Constants (static final)
├── Instance fields (private)
├── Constructor(s)
├── Public methods
├── Package-private methods
└── Private methods
```

**Max file size:** 200 lines (including comments & blanks)

**If exceeding 200 lines:** Split into multiple classes or extract to utility class.

### Method Naming

**Style:** camelCase, verb-first

**Patterns:**
```java
// Getters
public String getName() { ... }
public boolean isValid() { ... }
public List<Room> getRooms() { ... }

// Setters
public void setName(String name) { ... }

// Predicates
public boolean isValidMove(int row, int col) { ... }
public boolean canWin(Board board, int row, int col) { ... }

// Executors
public boolean makeMove(int row, int col, PieceType piece) { ... }
public void execute(ClientTransferData data) { ... }

// Factory/Builder
public static Board create() { ... }
public GameMove build() { ... }

// Converter/Parser
public static GameMove fromJson(String json) { ... }
public String toJson() { ... }
```

### Variable Naming

**Style:** camelCase, noun-first

**Rules:**
- Single letter only for loop counters: `for (int i = 0; i < size; i++)`
- Prefer descriptive names over abbreviations
- Boolean variables start with `is`, `has`, `can`, `should`

**Examples:**
```java
// Good
int moveCount = 0;
String playerNickname = "Alice";
boolean isValidMove = true;
List<GameMove> moveHistory = new ArrayList<>();
PieceType[][] board = new PieceType[15][15];

// Avoid
int count = 0;          // unclear what's being counted
String name = "Alice";  // unclear which name
boolean valid = true;   // unclear what's valid
List moves = new ArrayList();  // raw type
int b[][] = ...        // unclear purpose
```

### Constants

**Style:** UPPER_SNAKE_CASE, always `static final`

**Examples:**
```java
public static final int BOARD_SIZE = 15;
public static final int WIN_CONDITION = 5;
public static final long HEARTBEAT_INTERVAL_MS = 30_000;
private static final String RESOURCE_PATH = "static/";
```

### Comments & Documentation

**Javadoc:** Required for all public classes, methods, fields

```java
/**
 * Checks if placing a piece at (row, col) results in a win.
 *
 * @param board The game board state
 * @param row   Row index (0-14)
 * @param col   Column index (0-14)
 * @param piece The piece type (BLACK or WHITE)
 * @return true if this move wins the game, false otherwise
 */
public static boolean canWin(Board board, int row, int col, PieceType piece) {
    // ...
}
```

**Inline Comments:** Document WHY, not WHAT

```java
// Bad
i++; // increment i

// Good
moveCount++; // Move count used to detect draw condition (full board = 225)

// Good
if (moveCount >= BOARD_SIZE * BOARD_SIZE) {  // 225 moves = draw
    result = GameResult.DRAW;
}
```

### Imports

**Rules:**
- No wildcard imports (`import java.util.*`)
- Alphabetical order
- Group by package (java, javax, third-party, org.nico...)

```java
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;

import com.miti99.caro.common.entity.Board;
import com.miti99.caro.common.enums.PieceType;
```

### Error Handling

**All errors must be caught and handled:**

```java
// Good
try {
    int row = Integer.parseInt(input.split(",")[0]);
    int col = Integer.parseInt(input.split(",")[1]);
    if (!board.isValidMove(row, col)) {
        sendError(ctx, "Invalid move");
        return;
    }
} catch (NumberFormatException e) {
    sendError(ctx, "Invalid format, expected 'row,col'");
    return;
} catch (ArrayIndexOutOfBoundsException e) {
    sendError(ctx, "Missing row or column");
    return;
}

// Avoid
int row = Integer.parseInt(input.split(",")[0]); // Uncaught exceptions
```

**Never silently swallow exceptions:**

```java
// Bad
try {
    doSomething();
} catch (Exception e) {
    // Silent failure
}

// Good
try {
    doSomething();
} catch (IOException e) {
    logger.error("Failed to do something", e);
    throw new RuntimeException("Unrecoverable error", e);
}
```

### Type Safety

**Use specific types, not Object:**

```java
// Bad
Object room = new Room();
Object move = new GameMove(7, 7, BLACK);

// Good
Room room = new Room();
GameMove move = new GameMove(7, 7, PieceType.BLACK);
```

**Use enums, not strings/ints for fixed values:**

```java
// Bad
String roomType = "PVP";  // Could be "pvp", "pve", "PvP", etc.
int difficulty = 2;       // What does 2 mean?

// Good
RoomType roomType = RoomType.PVP;
int difficulty = 2;  // Medium (clear from context or const)
```

---

## JavaScript Code Standards

### Module System

**Style:** ES modules (import/export)

```javascript
// Export
export function getNextMove(board, difficulty) { ... }
export class Board { ... }
export const BOARD_SIZE = 15;

// Import
import { getNextMove, BOARD_SIZE } from './ai.js';
import Board from './board.js';
```

**One default export per file (when possible):**

```javascript
// good: single responsibility
export default class GameScene extends Phaser.Scene { ... }

// good: utility module with multiple exports
export function connectToServer(url) { ... }
export function sendMove(move) { ... }
```

### File Naming

**Style:** kebab-case

**Patterns:**
- `game-scene.js` — Phaser scene class
- `connection-service.js` — Service module
- `event-bus.js` — Utility/helper
- `protocol-constants.js` — Constant definitions
- `board.js` — Game object class

**Examples:**
```
// Good
game-scene.js
connection-service.js
protocol-constants.js
menu-ui.js

// Avoid
gameScene.js             // camelCase in web
game_scene.js            // snake_case in web
GameScene.js             // PascalCase in web
```

### Variable Naming

**Style:** camelCase

```javascript
// Good
const playerNickname = "Alice";
let isConnected = false;
const moveHistory = [];
const gameBoard = board;

// Avoid
const player_nickname = "Alice";   // snake_case
const PlayerNickname = "Alice";    // PascalCase
const p = "Alice";                 // single letter (non-loop)
```

### Constants

**Style:** camelCase (JavaScript convention) or UPPER_SNAKE_CASE (for global constants)

```javascript
// Module-level constants
const BOARD_SIZE = 15;
const WIN_CONDITION = 5;
const HEARTBEAT_INTERVAL_MS = 30_000;

// Local constants (same case as variables)
const maxRetries = 3;
const timeout = 5000;
```

### Function Naming

**Style:** camelCase, verb-first

```javascript
// Declarative
export function connectToServer(url) { ... }
export function sendMove(row, col) { ... }
export function parseEventCode(code) { ... }

// Predicates
function isValidMove(row, col) { ... }
function hasWon(board, row, col) { ... }
function canReconnect() { ... }

// Handlers (suffix with 'Handler' or 'On{Event}')
function handleConnection() { ... }
function onMoveMade(move) { ... }
```

### Classes & Objects

**Style:** PascalCase for class constructors

```javascript
// Good: Class definition
export class Board {
    constructor(size = 15) {
        this.size = size;
        this.grid = [];
    }

    placeStone(row, col, color) { ... }
}

// Usage
const board = new Board();

// Good: Object literal
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
};

// Avoid
const board = Board();  // Should use new
```

### Comments & Documentation

**JSDoc:** Required for all exports

```javascript
/**
 * Connects to the WebSocket server and establishes game communication.
 *
 * @param {string} url - The WebSocket server URL (e.g., 'ws://localhost:1025/ratel')
 * @returns {Promise<WebSocket>} Promise resolving to the connected WebSocket
 * @throws {Error} If connection fails or timeout occurs
 */
export function connectToServer(url) {
    // ...
}

/**
 * @typedef {Object} GameMove
 * @property {number} row - Row index (0-14)
 * @property {number} col - Column index (0-14)
 * @property {string} piece - 'BLACK' or 'WHITE'
 */

/**
 * Sends a move to the server.
 *
 * @param {GameMove} move - The move to send
 * @returns {Promise<void>}
 */
export async function sendMove(move) {
    // ...
}
```

**Inline Comments:** Document non-obvious logic

```javascript
// Good
const reconnectDelay = Math.min(1000 * Math.pow(2, retryCount), 30000);  // Exponential backoff, max 30s

// Bad
const x = Math.min(1000 * Math.pow(2, r), 30000);  // No context
```

### Error Handling

**Use try/catch for async operations:**

```javascript
// Good
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error('Failed to fetch:', error);
    showToast('Connection error');
    throw error;
}

// Avoid
fetch(url).then(r => r.json());  // Unhandled rejection
```

### Async/Await

**Prefer async/await over .then():**

```javascript
// Good
async function loadBoard() {
    try {
        const response = await fetch('/api/board');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load board:', error);
    }
}

// Avoid
function loadBoard() {
    return fetch('/api/board')
        .then(r => r.json())
        .catch(e => console.error(e));
}
```

### Array & Object Methods

**Use modern methods (map, filter, reduce):**

```javascript
// Good
const evenNumbers = numbers.filter(n => n % 2 === 0);
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Avoid
const evenNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
    }
}
```

### Destructuring

**Use destructuring for clarity:**

```javascript
// Good
const { row, col, piece } = move;
const [ x, y ] = coordinates;
const { code, data } = message;

// Avoid
const row = move.row;
const col = move.col;
const piece = move.piece;
```

---

## Shared Standards

### File Size Management

**Java:** Keep files under 200 lines (including comments)
**JavaScript:** Keep files under 300 lines

**When to split:**
- File approaching limit
- Multiple independent classes/functions
- Different concerns (e.g., UI + logic mixed)

**How to split:**
- Extract to new module with clear responsibility
- Update imports in calling code
- Ensure no circular dependencies

### Naming Conventions Summary

| Item | Java | JavaScript |
|------|------|-----------|
| **Package/Module** | `com.miti99.caro.{common,server}.foo` | `foo-bar.js`, `/services/` |
| **Class** | `PascalCase` | `PascalCase` (exported) |
| **Function** | `camelCase()` | `camelCase()` |
| **Variable** | `camelCase` | `camelCase` |
| **Constant** | `UPPER_SNAKE_CASE` | `UPPER_SNAKE_CASE` or `camelCase` |
| **Boolean** | `isValid`, `hasWon`, `canMove` | `isValid`, `hasWon`, `canMove` |
| **File** | `ClassName.java` | `kebab-case.js` |

### Git Commit Messages

**Format:** Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `refactor:` — Code restructure (no behavior change)
- `test:` — Add/update tests
- `perf:` — Performance improvement
- `chore:` — Build, deps, config (no code logic)

**Examples:**
```bash
git commit -m "feat(server): add room spectator support"
git commit -m "fix(client): prevent out-of-bounds moves"
git commit -m "docs: update deployment guide"
git commit -m "refactor: extract game logic to helper"
git commit -m "test: add 20 new AI test cases"
```

**Rules:**
- Keep subject under 50 characters
- Use imperative mood ("add", not "added")
- No period at end of subject
- Reference issues if applicable: `fix #123`
- No AI references in message

### Code Review Checklist

Before submitting code:

- [ ] Compiles/builds without errors
- [ ] All tests pass (run `mvn test` or `npm test`)
- [ ] No dead code or commented-out lines
- [ ] File size under limit (200 lines Java, 300 JS)
- [ ] Naming follows conventions
- [ ] Public methods have Javadoc/JSDoc
- [ ] Error handling present (try/catch or validation)
- [ ] No hardcoded values (use constants)
- [ ] No console.log/System.out.println left (except logging)
- [ ] Git commit message follows conventional commits

### Testing Requirements

**Unit Tests:**
- Required for public methods that have business logic
- Test happy path, error cases, edge cases
- Use descriptive test names: `test{Feature}{Condition}{Result}`

**Example:**
```java
@Test
public void testCanWinDetectsHorizontalFive() { ... }

@Test
public void testCanWinReturnsfalseForFour() { ... }

@Test
public void testCanWinHandlesBoardEdges() { ... }
```

**Test Coverage:**
- Game logic: 100%
- Network layer: 80%+
- UI: 60%+ (integration tests)

---

## Linting & Formatting

### Java
- Use IDE default formatter (IntelliJ IDEA / Eclipse)
- No trailing whitespace
- 4-space indentation
- Max line length: 120 characters (soft limit)

### JavaScript
- No specific linter configured (Prettier optional)
- 2-space indentation
- Max line length: 100 characters
- Use `const` by default, `let` when rebinding needed, avoid `var`

### Common Rules (Both)
- No trailing whitespace
- Imports sorted alphabetically
- No unused imports/variables
- No circular dependencies

---

## Performance Guidelines

### Java
- Avoid creating objects in hot loops (game move validation)
- Use appropriate data structures (ArrayList vs LinkedList)
- Cache frequently accessed values (board size constant)
- Profile before optimizing

### JavaScript
- Avoid DOM manipulation in render loops (use Phaser rendering)
- Debounce event handlers if called frequently
- Use `requestAnimationFrame` for animations (Phaser handles this)
- Minimize WebSocket message size (encode data efficiently)

---

## Security Guidelines

### Java
- Validate all input (move coordinates, nickname length)
- Sanitize strings before broadcast (prevent injection)
- Use immutable objects for shared state when possible
- Never expose internal state directly

### JavaScript
- Validate server messages before trusting (type checks)
- Sanitize HTML from user input (prevent XSS)
- Don't store sensitive data in localStorage
- Use HTTPS/WSS in production (TLS required)

---

## Documentation Requirements

**Every public method/function must have:**
1. **Brief description** — One-line summary
2. **Parameters** — Type and purpose of each argument
3. **Return value** — Type and meaning of return
4. **Exceptions** — What can be thrown and why

**Example (Javadoc):**
```java
/**
 * Determines the winner of the game by checking for 5-in-a-row.
 *
 * @param board The current game board
 * @param lastRow Row of the last placed piece
 * @param lastCol Column of the last placed piece
 * @param lastPiece The piece type placed (BLACK or WHITE)
 * @return GameResult.BLACK_WIN, GameResult.WHITE_WIN, GameResult.DRAW, or GameResult.IN_PROGRESS
 */
public static GameResult checkGameResult(Board board, int lastRow, int lastCol, PieceType lastPiece) {
    // ...
}
```

**Example (JSDoc):**
```javascript
/**
 * Sends a game move to the server.
 * @param {number} row - Row index (0-14)
 * @param {number} col - Column index (0-14)
 * @returns {Promise<void>} Resolves when move is confirmed by server
 * @throws {Error} If move is invalid or connection lost
 */
export async function sendMove(row, col) {
    // ...
}
```

---

## Maintenance & Refactoring

### When to Refactor
- File exceeds size limit
- Duplicated logic appears (DRY violation)
- Method/function has 3+ responsibilities
- Test coverage below target
- Code is confusing (needs better naming)

### Refactoring Rules
- Keep behavior identical (use tests to verify)
- One refactoring per commit
- Descriptive commit message: `refactor(scope): description`
- Code review required before merge

### Deprecation
If removing a feature:
1. Mark with `@Deprecated` (Java) or JSDoc comment
2. Provide migration path in docs
3. Give 2+ release cycles notice
4. Remove after deprecation period

---

## Tools & Environment

**Recommended Tools:**
- **IDE:** IntelliJ IDEA (Java), VS Code (JavaScript)
- **Java:** Maven 3.9+, Java 25 (LTS) — uses `release 25`, records, switch expressions, `var`
- **JavaScript:** Node.js 22+, Vite 6+
- **Version Control:** Git

**Java 25 modernization guidelines:**
- Prefer `record` for immutable DTOs (e.g. wire-format envelopes like `Msg`)
- Use `var` for local variables where the RHS type is obvious at a glance
- Use switch expressions (`switch (...) { case X -> ...; }`) for pure mapping
- Use text blocks (`"""..."""`) for multi-line strings
- Test framework is JUnit 5 (`org.junit.jupiter.api`) — use `@Test`, `Assertions.*`

**CI/CD:**
- GitHub Actions runs on every push
- Build must pass before merge to master
- Tests must be green (no failures ignored)
- Linting recommended (but not enforced)

---

## Common Anti-Patterns to Avoid

| Anti-Pattern | Example | Better Approach |
|--------------|---------|-----------------|
| Magic numbers | `if (x > 225)` | `if (x > BOARD_SIZE * BOARD_SIZE)` |
| Overly long methods | 100+ line method | Extract to smaller methods |
| Null pointers | `user.getRoom().getId()` | Check nulls or use Optional |
| Silent failures | `try { } catch (Exception e) { }` | Log error and handle appropriately |
| String concatenation | `"Hello " + name + "!"` | Use StringBuilder or template strings |
| Global state | `static globalBoard` | Pass as parameter or inject |
| Callback hell | `.then(...).then(...)` | Use async/await |
| Hardcoded paths | `"/Users/alice/data"` | Use constants or config files |

---

## Summary

Caro codebase prioritizes:
1. **Clarity** over cleverness
2. **Simplicity** over features
3. **Testability** over 100% coverage
4. **Maintainability** over premature optimization

Follow these standards to ensure code is understandable, modifiable, and trustworthy for the next developer (or your future self).
