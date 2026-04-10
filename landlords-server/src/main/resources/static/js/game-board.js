/**
 * GameBoard — Canvas-based 15x15 Gomoku board rendering.
 * Draws wood background, grid, stones with gradients, hover preview,
 * last-move indicator, and placement animation.
 */
var GameBoard = {
  canvas: null,
  ctx: null,
  cellSize: 0,
  PADDING: 40,
  BOARD_SIZE: 15,
  hoverPos: null,
  animating: null, // {row, col, piece, start}

  init: function() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    var self = this;
    window.addEventListener('resize', function() { self.resize(); });
    this.canvas.addEventListener('click', function(e) { self._handleClick(e); });
    this.canvas.addEventListener('mousemove', function(e) { self._handleHover(e); });
    this.canvas.addEventListener('mouseleave', function() {
      self.hoverPos = null;
      self.draw();
    });
  },

  resize: function() {
    var container = this.canvas.parentElement;
    var size = Math.min(container.clientWidth, container.clientHeight, 700);
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cellSize = (size - 2 * this.PADDING) / (this.BOARD_SIZE - 1);
    this.draw();
  },

  _gridX: function(col) { return this.PADDING + col * this.cellSize; },
  _gridY: function(row) { return this.PADDING + row * this.cellSize; },

  draw: function() {
    var ctx = this.ctx;
    var size = this.canvas.width / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, size, size);
    this._drawBackground(ctx, size);
    this._drawGrid(ctx);
    this._drawStarPoints(ctx);
    this._drawLabels(ctx);
    this._drawStones(ctx);
    this._drawHover(ctx);
  },

  _drawBackground: function(ctx, size) {
    ctx.fillStyle = '#dcb35c';
    ctx.fillRect(0, 0, size, size);
    // Subtle wood grain lines
    ctx.strokeStyle = 'rgba(139, 105, 20, 0.15)';
    ctx.lineWidth = 1;
    for (var i = 0; i < size; i += 7) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
    }
  },

  _drawGrid: function(ctx) {
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 1;
    for (var i = 0; i < this.BOARD_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(this._gridX(i), this._gridY(0));
      ctx.lineTo(this._gridX(i), this._gridY(this.BOARD_SIZE - 1));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this._gridX(0), this._gridY(i));
      ctx.lineTo(this._gridX(this.BOARD_SIZE - 1), this._gridY(i));
      ctx.stroke();
    }
  },

  _drawStarPoints: function(ctx) {
    var pts = [[3,3],[3,11],[7,7],[11,3],[11,11]];
    ctx.fillStyle = '#8b6914';
    for (var i = 0; i < pts.length; i++) {
      ctx.beginPath();
      ctx.arc(this._gridX(pts[i][1]), this._gridY(pts[i][0]), 4, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  _drawLabels: function(ctx) {
    ctx.fillStyle = '#5a4510';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < this.BOARD_SIZE; i++) {
      var letter = String.fromCharCode(65 + i);
      ctx.fillText(letter, this._gridX(i), this.PADDING - 20);
      ctx.fillText(String(i + 1), this.PADDING - 22, this._gridY(i));
    }
  },

  _drawStone: function(ctx, row, col, piece, alpha) {
    var x = this._gridX(col);
    var y = this._gridY(row);
    var r = this.cellSize * 0.43;
    ctx.save();
    ctx.globalAlpha = (alpha !== undefined) ? alpha : 1;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    var grad;
    if (piece === 'BLACK') {
      grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      grad.addColorStop(0, '#555');
      grad.addColorStop(1, '#111');
    } else {
      grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
      grad.addColorStop(0, '#fff');
      grad.addColorStop(1, '#ccc');
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    if (piece === 'WHITE') {
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    ctx.restore();
  },

  _drawStones: function(ctx) {
    var moves = GameState.gameData.moves;
    for (var i = 0; i < moves.length; i++) {
      this._drawStone(ctx, moves[i].row, moves[i].col, moves[i].piece, 1);
    }
    // Last move indicator
    if (moves.length > 0) {
      var last = moves[moves.length - 1];
      ctx.fillStyle = '#e94560';
      ctx.beginPath();
      ctx.arc(this._gridX(last.col), this._gridY(last.row), 4, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  _drawHover: function(ctx) {
    if (!this.hoverPos || !GameState.isMyTurn()) return;
    var r = this.hoverPos.row, c = this.hoverPos.col;
    var occupied = GameState.gameData.moves.some(function(m) { return m.row === r && m.col === c; });
    if (occupied) return;
    var piece = GameState.isBlack ? 'BLACK' : 'WHITE';
    this._drawStone(ctx, r, c, piece, 0.4);
  },

  _toGrid: function(px, offset) {
    return Math.round((px - this.PADDING) / this.cellSize);
  },

  _handleClick: function(e) {
    if (GameState.isSpectator || !GameState.isMyTurn()) return;
    var rect = this.canvas.getBoundingClientRect();
    var col = this._toGrid(e.clientX - rect.left);
    var row = this._toGrid(e.clientY - rect.top);
    if (row < 0 || row >= this.BOARD_SIZE || col < 0 || col >= this.BOARD_SIZE) return;
    var occupied = GameState.gameData.moves.some(function(m) { return m.row === row && m.col === col; });
    if (occupied) return;
    GameConnection.send('CODE_GAME_MOVE', { row: row, col: col });
  },

  _handleHover: function(e) {
    var rect = this.canvas.getBoundingClientRect();
    var col = this._toGrid(e.clientX - rect.left);
    var row = this._toGrid(e.clientY - rect.top);
    if (row < 0 || row >= this.BOARD_SIZE || col < 0 || col >= this.BOARD_SIZE) {
      if (this.hoverPos) { this.hoverPos = null; this.draw(); }
      return;
    }
    if (!this.hoverPos || this.hoverPos.row !== row || this.hoverPos.col !== col) {
      this.hoverPos = { row: row, col: col };
      this.draw();
    }
  },

  animateStone: function(row, col, piece) {
    var self = this;
    var start = performance.now();
    var duration = 150;
    function frame(now) {
      var t = Math.min((now - start) / duration, 1);
      // easeOutBack
      var s = 1.4;
      var p = t - 1;
      var scale = p * p * ((s + 1) * p + s) + 1;
      self.draw();
      // Draw animated stone on top
      var ctx = self.ctx;
      var x = self._gridX(col);
      var y = self._gridY(row);
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.translate(-x, -y);
      self._drawStone(ctx, row, col, piece, 1);
      ctx.restore();
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
};

// Register event handlers
GameState.on('CODE_GAME_STARTING', function() {
  setTimeout(function() { GameBoard.init(); }, 50);
});

GameState.on('CODE_GAME_MOVE_SUCCESS', function(data) {
  GameBoard.animateStone(data.row, data.col, data.piece);
});
