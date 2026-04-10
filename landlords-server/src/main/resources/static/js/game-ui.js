/**
 * GameUI — DOM manipulation for lobby, panels, move history,
 * game-over screen, toast notifications, and button wiring.
 */
var GameUI = {

  init: function() {
    this._wireNickname();
    this._wireLobby();
    this._wirePvpMenu();
    this._wirePveMenu();
    this._wireRoomList();
    this._wireWaitingRoom();
    this._wireGame();
    this._wireGameOver();
    this._registerEventHandlers();
  },

  // --- Button wiring ---

  _wireNickname: function() {
    var form = document.getElementById('nickname-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('nickname-input').value.trim();
      if (!name) return;
      GameState.nickname = name;
      GameConnection.send('CODE_CLIENT_NICKNAME_SET', name);
    });
  },

  _wireLobby: function() {
    document.getElementById('btn-goto-pvp').addEventListener('click', function() {
      GameState.switchScreen('screen-pvp-menu');
    });
    document.getElementById('btn-goto-pve').addEventListener('click', function() {
      GameState.switchScreen('screen-pve-menu');
    });
  },

  _wirePvpMenu: function() {
    document.getElementById('btn-create-room').addEventListener('click', function() {
      GameConnection.send('CODE_ROOM_CREATE', '');
    });
    document.getElementById('btn-join-room').addEventListener('click', function() {
      GameConnection.send('CODE_GET_ROOMS', '');
    });
    document.getElementById('btn-pvp-back').addEventListener('click', function() {
      GameState.switchScreen('screen-lobby');
    });
  },

  _wirePveMenu: function() {
    document.getElementById('btn-pve-easy').addEventListener('click', function() {
      GameConnection.send('CODE_ROOM_CREATE_PVE', '1');
    });
    document.getElementById('btn-pve-medium').addEventListener('click', function() {
      GameConnection.send('CODE_ROOM_CREATE_PVE', '2');
    });
    document.getElementById('btn-pve-hard').addEventListener('click', function() {
      GameConnection.send('CODE_ROOM_CREATE_PVE', '3');
    });
    document.getElementById('btn-pve-back').addEventListener('click', function() {
      GameState.switchScreen('screen-lobby');
    });
  },

  _wireRoomList: function() {
    document.getElementById('btn-refresh-rooms').addEventListener('click', function() {
      GameConnection.send('CODE_GET_ROOMS', '');
    });
    document.getElementById('btn-room-list-back').addEventListener('click', function() {
      GameState.switchScreen('screen-pvp-menu');
    });
  },

  _wireWaitingRoom: function() {
    document.getElementById('btn-leave-room').addEventListener('click', function() {
      GameConnection.send('CODE_CLIENT_EXIT', '');
    });
  },

  _wireGame: function() {
    document.getElementById('btn-exit-game').addEventListener('click', function() {
      GameConnection.send('CODE_CLIENT_EXIT', '');
    });
  },

  _wireGameOver: function() {
    document.getElementById('btn-rematch').addEventListener('click', function() {
      GameConnection.send('CODE_GAME_READY', '');
    });
    document.getElementById('btn-exit-to-lobby').addEventListener('click', function() {
      GameConnection.send('CODE_CLIENT_EXIT', '');
    });
  },

  // --- Event handlers ---

  _registerEventHandlers: function() {
    var self = this;

    GameState.on('CODE_SHOW_OPTIONS', function() {
      document.getElementById('lobby-nickname').textContent = GameState.nickname;
      document.getElementById('header-nickname').textContent = GameState.nickname;
    });

    GameState.on('CODE_ROOM_CREATE_SUCCESS', function(data) {
      var id = data.id || data.roomId || '';
      document.getElementById('waiting-room-id').textContent = id;
    });

    GameState.on('CODE_SHOW_ROOMS', function(data) {
      self._renderRoomList(data);
    });

    GameState.on('CODE_GAME_STARTING', function(data) {
      self._setupGameScreen(data);
    });

    GameState.on('CODE_GAME_MOVE_SUCCESS', function(data) {
      self._addMoveToHistory(data);
      self._updateTurnIndicator();
    });

    GameState.on('CODE_GAME_OVER', function(data) {
      self._showGameOver(data);
    });

    // Error toasts
    GameState.on('CODE_ROOM_JOIN_FAIL_BY_FULL', function() { self.showToast('Room is full', 'error'); });
    GameState.on('CODE_ROOM_JOIN_FAIL_BY_INEXIST', function() { self.showToast('Room not found', 'error'); });
    GameState.on('CODE_GAME_MOVE_NOT_YOUR_TURN', function() { self.showToast('Not your turn', 'error'); });
    GameState.on('CODE_GAME_MOVE_OCCUPIED', function() { self.showToast('Position occupied', 'error'); });
    GameState.on('CODE_GAME_MOVE_OUT_OF_BOUNDS', function() { self.showToast('Out of bounds', 'error'); });
    GameState.on('CODE_GAME_MOVE_INVALID', function() { self.showToast('Invalid move', 'error'); });
    GameState.on('CODE_CLIENT_KICK', function() { self.showToast('Kicked for inactivity', 'error'); });
    GameState.on('CODE_PVE_DIFFICULTY_NOT_SUPPORT', function() { self.showToast('Difficulty not supported', 'error'); });
    GameState.on('_disconnected', function() { self.showToast('Disconnected from server. Refresh to reconnect.', 'error'); });
  },

  // --- Room list ---

  _renderRoomList: function(data) {
    var rooms = data;
    if (typeof data === 'string') {
      try { rooms = JSON.parse(data); } catch (e) { rooms = []; }
    }
    if (!Array.isArray(rooms)) rooms = [];

    var tbody = document.getElementById('room-table-body');
    var empty = document.getElementById('room-list-empty');
    tbody.innerHTML = '';

    if (rooms.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    for (var i = 0; i < rooms.length; i++) {
      var r = rooms[i];
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + (r.roomId || r.id) + '</td>' +
        '<td>' + (r.roomOwner || '') + '</td>' +
        '<td>' + (r.roomClientCount || 0) + '/2</td>' +
        '<td>' + (r.status || r.roomStatus || '') + '</td>' +
        '<td>' +
          '<button class="btn btn-sm btn-primary" onclick="GameUI.joinRoom(' + (r.roomId || r.id) + ')">Join</button> ' +
          '<button class="btn btn-sm btn-secondary" onclick="GameUI.watchRoom(' + (r.roomId || r.id) + ')">Watch</button>' +
        '</td>';
      tbody.appendChild(tr);
    }
  },

  joinRoom: function(roomId) {
    GameConnection.send('CODE_ROOM_JOIN', String(roomId));
  },

  watchRoom: function(roomId) {
    GameConnection.send('CODE_GAME_WATCH', String(roomId));
  },

  // --- Game screen ---

  _setupGameScreen: function(data) {
    document.getElementById('player-black-name').textContent = data.blackPlayerNickname;
    document.getElementById('player-white-name').textContent = data.whitePlayerNickname;
    document.getElementById('move-list').innerHTML = '';
    this._updateTurnIndicator();
  },

  _updateTurnIndicator: function() {
    var isBlackTurn = GameState.gameData.currentTurn === 'BLACK';
    var blackCard = document.getElementById('player-card-black');
    var whiteCard = document.getElementById('player-card-white');
    blackCard.classList.toggle('active', isBlackTurn);
    whiteCard.classList.toggle('active', !isBlackTurn);
  },

  _addMoveToHistory: function(data) {
    var list = document.getElementById('move-list');
    var n = GameState.gameData.moves.length;
    var col = String.fromCharCode(65 + data.col);
    var row = data.row + 1;
    var div = document.createElement('div');
    div.className = 'move-entry';
    div.innerHTML = '<span class="move-num">#' + n + '</span> ' +
      '<span class="move-piece move-piece-' + data.piece.toLowerCase() + '"></span> ' +
      '<span class="move-coord">' + col + row + '</span>';
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
  },

  // --- Game over ---

  _showGameOver: function(data) {
    var resultEl = document.getElementById('game-over-result');
    var winnerEl = document.getElementById('game-over-winner');

    if (data.result === 'DRAW') {
      resultEl.textContent = 'Draw!';
      resultEl.className = 'result-text result-draw';
      winnerEl.textContent = '';
    } else if (data.winnerNickname === GameState.nickname) {
      resultEl.textContent = 'You Win!';
      resultEl.className = 'result-text result-win';
      winnerEl.textContent = '';
    } else {
      resultEl.textContent = 'You Lose!';
      resultEl.className = 'result-text result-lose';
      winnerEl.textContent = 'Winner: ' + data.winnerNickname;
    }
  },

  // --- Toast ---

  showToast: function(message, type) {
    var container = document.getElementById('toast-container');
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(function() {
      toast.classList.add('toast-exit');
      setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  GameUI.init();
});
