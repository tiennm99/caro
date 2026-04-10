# Phase 6: Client — Audio

## Context Links
- [Phase 4](phase-04-client-board-rendering.md) — stone placement triggers sound

## Overview
- **Priority:** P2
- **Status:** Pending
- **Effort:** 0.5h
- **Depends on:** Phase 4

Sound effects for stone placement and game-over events. Handles browser autoplay restrictions gracefully.

## Key Insights

- Browsers block `Audio.play()` before user interaction — must unlock on first click
- Three sounds: stone click (each move), win jingle, lose/draw sound
- Audio files: use small MP3s or generate tones with Web Audio API
- Mute toggle button in game UI
- KISS approach: preload `Audio` objects, play on events

## Architecture

```js
GameAudio = {
  sounds: { stone: Audio, win: Audio, lose: Audio },
  muted: false,
  unlocked: false,

  init()        // preload sounds, attach unlock listener
  play(name)    // play if not muted and unlocked
  toggle()      // flip muted state
  unlock()      // called on first user click anywhere
}
```

### Audio Asset Strategy

**Option A:** Ship MP3 files in `static/audio/`. Simple but need to source/create files.
**Option B:** Generate sounds with Web Audio API. No files needed, but more code.

**Decision: Option A (MP3 files).** Simpler, better sound quality. Use royalty-free short clips or generate with an audio tool. Fallback: if audio files missing, game works silently (no errors).

For initial implementation, create placeholder silence detection — if MP3 fails to load, disable audio silently. Audio files can be sourced later; the code handles their absence.

## Related Code Files

### Files to Create
- `landlords-server/src/main/resources/static/js/game-audio.js` (~60 lines)
- `landlords-server/src/main/resources/static/audio/stone-place.mp3`
- `landlords-server/src/main/resources/static/audio/game-win.mp3`
- `landlords-server/src/main/resources/static/audio/game-lose.mp3`

## Implementation Steps

### Step 1: Create `game-audio.js`

```js
const GameAudio = {
  sounds: {},
  muted: false,
  unlocked: false,

  init() {
    this.sounds.stone = new Audio('audio/stone-place.mp3');
    this.sounds.win = new Audio('audio/game-win.mp3');
    this.sounds.lose = new Audio('audio/game-lose.mp3');

    // Preload
    Object.values(this.sounds).forEach(s => {
      s.load();
      s.onerror = () => {}; // Silently ignore missing files
    });

    // Unlock on first interaction
    const unlockFn = () => {
      if (!this.unlocked) {
        // Play and immediately pause a silent context to unlock
        Object.values(this.sounds).forEach(s => {
          s.play().then(() => s.pause()).catch(() => {});
        });
        this.unlocked = true;
      }
      document.removeEventListener('click', unlockFn);
    };
    document.addEventListener('click', unlockFn);

    // Mute toggle
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }
  },

  play(name) {
    if (this.muted || !this.sounds[name]) return;
    const s = this.sounds[name];
    s.currentTime = 0;
    s.play().catch(() => {});
  },

  toggle() {
    this.muted = !this.muted;
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) btn.textContent = this.muted ? 'Sound: OFF' : 'Sound: ON';
  }
};
```

### Step 2: Register event handlers

```js
GameState.on('CODE_GAME_MOVE_SUCCESS', () => {
  GameAudio.play('stone');
});

GameState.on('CODE_GAME_OVER', (data) => {
  if (data.result === 'DRAW') {
    GameAudio.play('lose');
  } else if (data.winnerNickname === GameState.nickname) {
    GameAudio.play('win');
  } else {
    GameAudio.play('lose');
  }
});
```

### Step 3: Audio assets

Generate minimal MP3 files. Options:
- Use Web Audio API in a helper script to generate and export short tones
- Use ffmpeg to create synthetic sounds: `ffmpeg -f lavfi -i "sine=frequency=800:duration=0.1" stone-place.mp3`
- Source royalty-free clips

For MVP: create minimal placeholder files. If ffmpeg available, generate with:
```bash
# Stone click: short 800Hz blip
ffmpeg -f lavfi -i "sine=frequency=800:duration=0.08" -q:a 9 audio/stone-place.mp3
# Win: ascending tone
ffmpeg -f lavfi -i "sine=frequency=523:duration=0.15" -f lavfi -i "sine=frequency=659:duration=0.15" -f lavfi -i "sine=frequency=784:duration=0.3" -filter_complex "[0][1][2]concat=n=3:v=0:a=1" -q:a 9 audio/game-win.mp3
# Lose: descending tone
ffmpeg -f lavfi -i "sine=frequency=400:duration=0.2" -f lavfi -i "sine=frequency=300:duration=0.3" -filter_complex "[0][1]concat=n=2:v=0:a=1" -q:a 9 audio/game-lose.mp3
```

If ffmpeg unavailable, create empty placeholder files. Audio is non-critical.

## Todo List

- [ ] Create `game-audio.js` with preload, play, toggle, unlock
- [ ] Register stone placement sound on `CODE_GAME_MOVE_SUCCESS`
- [ ] Register win/lose sound on `CODE_GAME_OVER`
- [ ] Add mute toggle button handler
- [ ] Generate or source MP3 audio files
- [ ] Handle missing audio files gracefully (no errors)
- [ ] Test: sound plays on stone placement in browser

## Success Criteria

- Stone click sound plays on each move
- Win/lose sound plays on game over
- Mute toggle works
- No console errors if audio files missing
- No autoplay errors (unlocked on first click)
- File under 200 lines (expected ~60 lines)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Browser blocks autoplay | Unlock pattern on first user click |
| MP3 files missing | `onerror` handler silences failures; game works without sound |
| Audio latency on mobile | Short clips (<0.5s); acceptable for board game |
