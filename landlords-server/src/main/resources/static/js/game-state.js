/**
 * GameState — global state machine and event bus.
 * Manages screen transitions, game data, and event dispatch.
 */
var GameState = {
  // Client identity
  clientId: null,
  nickname: '',

  // Room state
  roomId: null,
  isBlack: false,
  isSpectator: false,

  // Current game data
  gameData: {
    blackPlayerId: null,
    blackPlayerNickname: '',
    whitePlayerId: null,
    whitePlayerNickname: '',
    boardSize: 15,
    moves: [],
    currentTurn: 'BLACK',
    result: null,
    winnerNickname: ''
  },

  // Event bus
  _handlers: {},

  on: function(code, fn) {
    if (!this._handlers[code]) this._handlers[code] = [];
    this._handlers[code].push(fn);
  },

  emit: function(code, data) {
    var handlers = this._handlers[code];
    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        try { handlers[i](data); } catch (e) { console.error('Handler error:', code, e); }
      }
    }
  },

  switchScreen: function(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.remove('active');
    }
    var target = document.getElementById(id);
    if (target) {
      // Small delay for CSS transition
      setTimeout(function() { target.classList.add('active'); }, 20);
    }
  },

  resetGameData: function() {
    this.gameData = {
      blackPlayerId: null, blackPlayerNickname: '',
      whitePlayerId: null, whitePlayerNickname: '',
      boardSize: 15, moves: [], currentTurn: 'BLACK',
      result: null, winnerNickname: ''
    };
    this.isSpectator = false;
  },

  isMyTurn: function() {
    if (this.isSpectator) return false;
    var myPiece = this.isBlack ? 'BLACK' : 'WHITE';
    return this.gameData.currentTurn === myPiece;
  },

  init: function() {
    this._registerCoreHandlers();
  },

  _registerCoreHandlers: function() {
    var self = this;

    this.on('CODE_CLIENT_CONNECT', function(data) {
      self.clientId = parseInt(data);
    });

    this.on('CODE_CLIENT_NICKNAME_SET', function() {
      self.switchScreen('screen-nickname');
    });

    this.on('CODE_SHOW_OPTIONS', function() {
      self.switchScreen('screen-lobby');
    });

    this.on('CODE_GAME_STARTING', function(data) {
      self.resetGameData();
      self.roomId = data.roomId;
      self.gameData.blackPlayerId = data.blackPlayerId;
      self.gameData.blackPlayerNickname = data.blackPlayerNickname;
      self.gameData.whitePlayerId = data.whitePlayerId;
      self.gameData.whitePlayerNickname = data.whitePlayerNickname;
      self.isBlack = (self.clientId === data.blackPlayerId);
      self.gameData.currentTurn = 'BLACK';
      self.switchScreen('screen-game');
    });

    this.on('CODE_GAME_MOVE_SUCCESS', function(data) {
      self.gameData.moves.push(data);
      self.gameData.currentTurn = (data.piece === 'BLACK') ? 'WHITE' : 'BLACK';
    });

    this.on('CODE_GAME_OVER', function(data) {
      self.gameData.result = data.result;
      self.gameData.winnerNickname = data.winnerNickname;
      self.switchScreen('screen-game-over');
    });

    this.on('CODE_CLIENT_EXIT', function() {
      self.resetGameData();
      self.roomId = null;
      self.switchScreen('screen-lobby');
    });

    this.on('CODE_CLIENT_KICK', function() {
      self.resetGameData();
      self.roomId = null;
      self.switchScreen('screen-lobby');
    });

    this.on('CODE_ROOM_CREATE_SUCCESS', function(data) {
      self.roomId = data.id;
      self.switchScreen('screen-waiting-room');
    });

    this.on('CODE_SHOW_ROOMS', function() {
      self.switchScreen('screen-room-list');
    });

    this.on('CODE_GAME_WATCH_SUCCESSFUL', function() {
      self.isSpectator = true;
      self.switchScreen('screen-game');
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  GameState.init();
});
