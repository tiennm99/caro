# Phase 1: Project Scaffold

## Context Links
- [Plan overview](plan.md)
- Server WS handler: `landlords-server/.../handler/WebsocketTransferHandler.java`
- Server WS proxy: `landlords-server/.../proxy/WebsocketProxy.java`

## Overview
- **Priority:** P1 (blocker for all other phases)
- **Status:** Pending
- **Description:** Initialize Vite + Phaser 3 project in `web-client/`, verify Phaser boots a blank canvas.

## Requirements
- `npm create vite` with vanilla JS template (or manual init)
- Phaser 3 latest stable as dependency
- Vite dev server on port 5173 (default)
- `index.html` with a `#game-container` div for Phaser canvas + a `#ui-overlay` div for DOM menus
- `src/main.js` creates Phaser.Game with config from `src/config/game-config.js`
- BootScene placeholder that shows "Loading..." text

## Architecture

```
web-client/
  package.json
  vite.config.js
  index.html              <-- #game-container + #ui-overlay
  src/
    main.js               <-- Phaser.Game instantiation
    config/
      game-config.js      <-- Phaser config: 800x800, Scale.FIT, scenes list
    scenes/
      boot-scene.js       <-- placeholder "Loading..." text
  public/
    (empty, for future assets)
```

## Related Code Files

### Files to Create
- `web-client/package.json`
- `web-client/vite.config.js`
- `web-client/index.html`
- `web-client/src/main.js`
- `web-client/src/config/game-config.js`
- `web-client/src/scenes/boot-scene.js`

### Files to Modify
- None

## Implementation Steps

1. Create `web-client/` directory at repo root
2. Create `package.json` with:
   - `name: "caro-web-client"`
   - `type: "module"`
   - `scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" }`
   - `dependencies: { "phaser": "^3.80.0" }`
   - `devDependencies: { "vite": "^6.0.0" }`
3. Create `vite.config.js`:
   ```js
   import { defineConfig } from 'vite';
   export default defineConfig({
     server: { port: 5173 }
   });
   ```
4. Create `index.html`:
   - Minimal HTML5 boilerplate
   - `<div id="game-container"></div>` -- Phaser mounts here
   - `<div id="ui-overlay"></div>` -- DOM menus render here (hidden by default)
   - `<script type="module" src="/src/main.js"></script>`
   - Basic CSS: body margin 0, background #1a1a2e, flex-center the container, overlay absolute positioned over canvas
5. Create `src/config/game-config.js`:
   - Export Phaser config object: `type: Phaser.AUTO`, `width: 800`, `height: 800`
   - `scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }`
   - `parent: 'game-container'`
   - `backgroundColor: '#2d2d44'`
   - `scene: [BootScene]` (import from scenes)
6. Create `src/scenes/boot-scene.js`:
   - Extends `Phaser.Scene`, key: `'BootScene'`
   - `create()`: display centered "Loading..." text
   - Will be expanded in Phase 3 to transition to MenuScene
7. Create `src/main.js`:
   - Import config from `game-config.js`
   - `new Phaser.Game(config)`
   - Export game instance for potential service access
8. Run `npm install` and `npm run dev` to verify Phaser boots

## Success Criteria
- [ ] `npm run dev` starts Vite on port 5173
- [ ] Browser shows Phaser canvas with "Loading..." text
- [ ] No console errors
- [ ] `npm run build` produces working static build in `dist/`

## Risk Assessment
- **Node.js not installed:** User must have Node.js. Document in README.
- **Phaser version mismatch:** Pin to `^3.80.0` for stability.

## Next Steps
- Phase 2: Services layer (can start immediately after scaffold)
