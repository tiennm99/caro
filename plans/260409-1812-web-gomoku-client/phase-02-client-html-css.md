# Phase 2: Client — HTML Shell + CSS

## Context Links
- [Phase 1](phase-01-server-static-file-handler.md) — server serves these files
- [Phase 3](phase-03-client-connection-state.md) — JS loaded by this HTML

## Overview
- **Priority:** P1
- **Status:** Pending
- **Effort:** 2h

Create the single-page HTML shell and all CSS. The HTML defines all screens (hidden by default, shown via JS class toggling). CSS provides the professional game aesthetic: dark theme, wooden board area, clean typography, transitions.

## Key Insights

- All screens live in one HTML file, toggled via `.screen.active` CSS class
- Screens: nickname, lobby (main menu), pvp-menu, pve-menu, room-list, waiting-room, game, game-over
- Board rendered on `<canvas>` (Phase 4), everything else is DOM
- CSS handles transitions between screens (fade or slide)
- Responsive: flexbox layout, max-width container, canvas scales

## Architecture

### Screen Flow (DOM sections)

```
#screen-nickname     -->  #screen-lobby
#screen-lobby        -->  #screen-pvp-menu | #screen-pve-menu
#screen-pvp-menu     -->  #screen-room-list | (create room -> #screen-waiting-room)
#screen-pve-menu     -->  #screen-game (auto-starts)
#screen-room-list    -->  #screen-game (join) | #screen-game (watch)
#screen-waiting-room -->  #screen-game (when opponent joins)
#screen-game         -->  #screen-game-over
#screen-game-over    -->  #screen-game (rematch) | #screen-lobby (exit)
```

### Layout Structure

```
.app-container (centered, max-width: 1200px)
  header.game-header (logo, connection status, nickname)
  main#screens-container
    section.screen#screen-nickname
    section.screen#screen-lobby
    section.screen#screen-pvp-menu
    section.screen#screen-pve-menu
    section.screen#screen-room-list
    section.screen#screen-waiting-room
    section.screen#screen-game
      .game-layout (flexbox row)
        .game-sidebar-left (player info, turn indicator)
        .game-board-container (canvas)
        .game-sidebar-right (move history, chat)
    section.screen#screen-game-over
  footer (version, credits)
  #toast-container (floating notifications)
```

## Related Code Files

### Files to Create
- `landlords-server/src/main/resources/static/index.html`
- `landlords-server/src/main/resources/static/css/style.css`

## Implementation Steps

### Step 1: Create `index.html`

Key elements per screen:

**#screen-nickname:**
- Title "Gomoku"
- Input field for nickname
- "Play" button
- Subtitle text

**#screen-lobby:**
- Welcome message with nickname
- Two large buttons: "Player vs Player", "Player vs AI"
- Subtitle describing each mode

**#screen-pvp-menu:**
- "Create Room" button
- "Join Room" (shows room list) button
- "Back" button

**#screen-pve-menu:**
- Three difficulty buttons: Easy / Medium / Hard
- Brief description per difficulty
- "Back" button

**#screen-room-list:**
- Table: Room ID, Owner, Players, Type, Actions (Join / Watch)
- "Refresh" button
- "Back" button
- Empty state message

**#screen-waiting-room:**
- Room info display
- "Waiting for opponent..." message with spinner
- "Leave" button

**#screen-game:**
- Left sidebar: player cards (black/white), turn indicator arrow, timer placeholder
- Center: `<canvas id="game-canvas">` (responsive)
- Right sidebar: move history list (scrollable), coordinates display
- Bottom bar: "Exit" button, sound toggle

**#screen-game-over:**
- Result (Win/Lose/Draw) with large text
- Winner name
- Final board snapshot (reuse canvas)
- "Rematch" and "Exit to Lobby" buttons

**Script tags** at bottom: load JS files in order (game-state.js first, then game-connection.js, game-board.js, game-ui.js, game-audio.js) or use `type="module"`.

**Decision: Use classic `<script>` tags, not ES modules.** Reason: simpler, no CORS issues with `file://` during dev, Java 8 server doesn't need to set module MIME. Global namespace with namespaced objects (`GameState`, `GameConnection`, etc.).

### Step 2: Create `style.css`

**Color palette (dark theme):**
- Background: `#1a1a2e` (dark navy)
- Surface: `#16213e` (card backgrounds)
- Primary: `#e94560` (buttons, accents)
- Text: `#eee`
- Board: `#dcb35c` (golden wood)
- Grid lines: `#8b6914`
- Black stone: `#111`
- White stone: `#f5f5f5`

**Key CSS patterns:**
- `.screen { display: none; }` / `.screen.active { display: flex; }`
- Transition: opacity + transform for screen switches
- `.game-layout { display: flex; gap: 20px; }` with sidebars 200px, center flexible
- Canvas container: `aspect-ratio: 1` or padding trick for square
- Buttons: rounded, hover effects, active press effect
- Toast notifications: fixed bottom-right, slide-in animation
- Responsive: `@media (max-width: 900px)` stack game layout vertically, hide right sidebar
- Stone placement animation: `@keyframes stone-drop` (scale 0->1 with slight bounce)

**Typography:** System font stack, no external fonts (no network dependency).

## Todo List

- [ ] Create `index.html` with all 8 screen sections
- [ ] Add semantic IDs for all interactive elements
- [ ] Add `<canvas id="game-canvas">` in game screen
- [ ] Create `style.css` with dark theme
- [ ] Style all screens (nickname, lobby, menus, room list, game, game over)
- [ ] Add responsive breakpoints
- [ ] Add transition animations for screen switches
- [ ] Add toast notification styles
- [ ] Add loading/spinner styles for waiting room
- [ ] Verify HTML validates (no unclosed tags)

## Success Criteria

- Opening `index.html` directly shows nickname screen (other screens hidden)
- All screens are visually complete when `.active` class is toggled manually in devtools
- Game screen layout is correct: sidebar - canvas - sidebar
- Responsive: stacks vertically below 900px
- No external dependencies (fonts, CDNs)
- File sizes: HTML < 200 lines (content only, no inline styles), CSS can be up to 400 lines (styling exempt from 200-line code rule)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| CSS conflicts between screens | Each screen is a `.screen` section with unique ID; styles scoped via `#screen-name .element` |
| Canvas sizing issues | Use `ResizeObserver` in JS (Phase 4) to match CSS container size |
