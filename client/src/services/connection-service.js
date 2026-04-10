/**
 * WebSocket connection service.
 * Wraps browser WebSocket with heartbeat, auto-reconnect, and message parsing.
 * @module connection-service
 */

import { eventBus } from './event-bus.js';
import { ServerEventCode } from '../config/protocol-constants.js';

/** Default server WebSocket URL */
const DEFAULT_WS_URL = 'ws://localhost:1025/ratel';

class ConnectionService {
  constructor() {
    /** @type {WebSocket|null} */
    this._ws = null;
    /** @type {number|null} */
    this._heartbeatTimer = null;
    /** @type {number} */
    this._reconnectDelay = 1000;
    /** @type {boolean} */
    this._intentionalClose = false;
  }

  /**
   * Connect to the game server.
   * @param {string} [url] - WebSocket URL, defaults to same-origin or localhost
   */
  connect(url) {
    const wsUrl = url || this._resolveUrl();
    this._intentionalClose = false;

    try {
      this._ws = new WebSocket(wsUrl);
    } catch (e) {
      console.error('WebSocket creation failed:', e);
      return;
    }

    this._ws.onopen = () => {
      console.log('WebSocket connected');
      this._reconnectDelay = 1000;
      this._startHeartbeat();
      eventBus.emit('ws:connected', null);
    };

    this._ws.onmessage = (event) => this._onMessage(event);

    this._ws.onclose = () => {
      console.log('WebSocket disconnected');
      this._stopHeartbeat();
      eventBus.emit('ws:disconnected', null);
      if (!this._intentionalClose) this._scheduleReconnect(wsUrl);
    };

    this._ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  }

  /**
   * Send a message to the server.
   * @param {string} code - ServerEventCode value
   * @param {string|object} [data] - payload (objects are JSON.stringify'd)
   */
  send(code, data) {
    if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, cannot send:', code);
      return;
    }
    const dataStr = (data === undefined || data === null) ? ''
      : (typeof data === 'string') ? data
      : JSON.stringify(data);
    this._ws.send(JSON.stringify({ code, data: dataStr, info: '' }));
  }

  /** Close the connection intentionally. */
  disconnect() {
    this._intentionalClose = true;
    this._stopHeartbeat();
    if (this._ws) this._ws.close();
  }

  /**
   * Parse incoming WebSocket message and emit via event bus.
   * @param {MessageEvent} event
   * @private
   */
  _onMessage(event) {
    try {
      const msg = JSON.parse(event.data);
      let data = msg.data;
      if (data && typeof data === 'string') {
        try { data = JSON.parse(data); } catch (_) { /* keep as string */ }
      }
      eventBus.emit(msg.code, data);
    } catch (e) {
      console.error('Message parse error:', e, event.data);
    }
  }

  /** @private */
  _startHeartbeat() {
    this._stopHeartbeat();
    this._heartbeatTimer = setInterval(() => {
      this.send(ServerEventCode.HEARTBEAT, '');
    }, 50000);
  }

  /** @private */
  _stopHeartbeat() {
    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer);
      this._heartbeatTimer = null;
    }
  }

  /**
   * Reconnect with exponential backoff (max 30s).
   * @param {string} url
   * @private
   */
  _scheduleReconnect(url) {
    console.log(`Reconnecting in ${this._reconnectDelay}ms...`);
    setTimeout(() => this.connect(url), this._reconnectDelay);
    this._reconnectDelay = Math.min(this._reconnectDelay * 2, 30000);
  }

  /**
   * Derive WebSocket URL from current page location or fall back to default.
   * @returns {string}
   * @private
   */
  _resolveUrl() {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
        && window.location.hostname !== '127.0.0.1') {
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${proto}//${window.location.hostname}:1025/ratel`;
    }
    return DEFAULT_WS_URL;
  }
}

export const connectionService = new ConnectionService();
