/**
 * GameAudio — Sound effects for stone placement and game results.
 * Uses Web Audio API to generate tones (no external audio files needed).
 */
var GameAudio = {
  ctx: null,
  muted: false,
  unlocked: false,

  init: function() {
    var self = this;

    // Unlock audio context on first user click
    document.addEventListener('click', function unlock() {
      if (!self.unlocked) {
        self.ctx = new (window.AudioContext || window.webkitAudioContext)();
        self.unlocked = true;
      }
      document.removeEventListener('click', unlock);
    });

    var btn = document.getElementById('btn-toggle-sound');
    if (btn) {
      btn.addEventListener('click', function() { self.toggle(); });
    }
  },

  _playTone: function(frequency, duration, type) {
    if (this.muted || !this.ctx) return;
    try {
      var osc = this.ctx.createOscillator();
      var gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type || 'sine';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) { /* ignore audio errors */ }
  },

  playStone: function() {
    this._playTone(800, 0.08, 'sine');
  },

  playWin: function() {
    var self = this;
    this._playTone(523, 0.15, 'sine');
    setTimeout(function() { self._playTone(659, 0.15, 'sine'); }, 150);
    setTimeout(function() { self._playTone(784, 0.3, 'sine'); }, 300);
  },

  playLose: function() {
    var self = this;
    this._playTone(400, 0.2, 'triangle');
    setTimeout(function() { self._playTone(300, 0.3, 'triangle'); }, 200);
  },

  toggle: function() {
    this.muted = !this.muted;
    var icon = document.getElementById('sound-icon');
    if (icon) icon.innerHTML = this.muted ? '&#128264;' : '&#128266;';
  }
};

// Register event handlers
GameState.on('CODE_GAME_MOVE_SUCCESS', function() {
  GameAudio.playStone();
});

GameState.on('CODE_GAME_OVER', function(data) {
  if (data.result === 'DRAW') {
    GameAudio.playLose();
  } else if (data.winnerNickname === GameState.nickname) {
    GameAudio.playWin();
  } else {
    GameAudio.playLose();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  GameAudio.init();
});
