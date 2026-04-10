/**
 * GameConnection — WebSocket transport layer.
 * Connects to server, sends/receives JSON messages, handles heartbeat.
 */
var GameConnection = {
  ws: null,
  _heartbeatTimer: null,

  connect: function() {
    var protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    var url = protocol + location.host + '/ratel';

    this.ws = new WebSocket(url);
    var self = this;

    this.ws.onopen = function() {
      console.log('WebSocket connected');
      document.getElementById('connection-status').classList.add('connected');
      self._startHeartbeat();
    };

    this.ws.onmessage = function(event) {
      try {
        var msg = JSON.parse(event.data);
        var code = msg.code;
        var data = msg.data;

        // Try parsing data as JSON, fall back to raw string
        if (data && typeof data === 'string') {
          try { data = JSON.parse(data); } catch (e) { /* keep as string */ }
        }

        GameState.emit(code, data);
      } catch (e) {
        console.error('Message parse error:', e, event.data);
      }
    };

    this.ws.onclose = function() {
      console.log('WebSocket disconnected');
      document.getElementById('connection-status').classList.remove('connected');
      self._stopHeartbeat();
      GameState.emit('_disconnected');
    };

    this.ws.onerror = function(err) {
      console.error('WebSocket error:', err);
    };
  },

  send: function(code, data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected');
      return;
    }
    var dataStr = '';
    if (data !== undefined && data !== null) {
      dataStr = (typeof data === 'string') ? data : JSON.stringify(data);
    }
    this.ws.send(JSON.stringify({ code: code, data: dataStr, info: '' }));
  },

  _startHeartbeat: function() {
    var self = this;
    this._heartbeatTimer = setInterval(function() {
      self.send('CODE_CLIENT_HEAD_BEAT', '');
    }, 50000);
  },

  _stopHeartbeat: function() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer);
      this._heartbeatTimer = null;
    }
  },

  disconnect: function() {
    this._stopHeartbeat();
    if (this.ws) this.ws.close();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  GameConnection.connect();
});
