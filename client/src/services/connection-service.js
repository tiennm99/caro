/**
 * WebSocket connection service.
 * Wraps browser WebSocket with heartbeat, auto-reconnect, and typed protobuf
 * Request/Response encoding on single port 1999.
 * @module connection-service
 */

import { eventBus } from './event-bus.js';
import { ClientEventCode } from '../config/protocol-constants.js';
import { miti99 } from '../generated/protocol.js';

const { Request, Response } = miti99.caro.protocol;

/** Default server WebSocket URL */
const DEFAULT_WS_URL = 'ws://localhost:1999/ratel';

/** Maps a {@code Response.payload} oneof case name to a local event bus key. */
const RESPONSE_CASE_TO_CLIENT_CODE = Object.freeze({
  clientConnect: ClientEventCode.CLIENT_CONNECT,
  nicknameSet: ClientEventCode.NICKNAME_SET,
  showOptions: ClientEventCode.SHOW_OPTIONS,
  showRooms: ClientEventCode.SHOW_ROOMS,
  roomCreateSuccess: ClientEventCode.ROOM_CREATE_SUCCESS,
  roomJoinSuccess: ClientEventCode.ROOM_JOIN_SUCCESS,
  roomJoinFailFull: ClientEventCode.ROOM_JOIN_FAIL_FULL,
  roomJoinFailNotFound: ClientEventCode.ROOM_JOIN_FAIL_INEXIST,
  roomPlayFailNotFound: ClientEventCode.ROOM_PLAY_FAIL_INEXIST,
  gameStarting: ClientEventCode.GAME_STARTING,
  gameReady: ClientEventCode.GAME_READY,
  gameMoveSuccess: ClientEventCode.GAME_MOVE_SUCCESS,
  gameMoveInvalid: ClientEventCode.GAME_MOVE_INVALID,
  gameMoveOccupied: ClientEventCode.GAME_MOVE_OCCUPIED,
  gameMoveOutOfBounds: ClientEventCode.GAME_MOVE_OUT_OF_BOUNDS,
  gameMoveNotYourTurn: ClientEventCode.GAME_MOVE_NOT_YOUR_TURN,
  gameOver: ClientEventCode.GAME_OVER,
  pveDifficultyNotSupport: ClientEventCode.PVE_DIFFICULTY_NOT_SUPPORT,
  watchGameSuccess: ClientEventCode.GAME_WATCH_SUCCESSFUL,
  clientExit: ClientEventCode.CLIENT_EXIT,
});

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
      this._ws.binaryType = 'arraybuffer';
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

  // -------- Typed send helpers (one per Request oneof variant) --------

  sendHeartbeat() { this._sendRequest({ heartbeat: {} }); }
  sendNickname(nickname) { this._sendRequest({ setNickname: { nickname } }); }
  sendClientInfo(version) { this._sendRequest({ setClientInfo: { version } }); }
  sendCreateRoom() { this._sendRequest({ createRoom: {} }); }
  sendCreatePveRoom(difficulty) { this._sendRequest({ createPveRoom: { difficulty } }); }
  sendGetRooms() { this._sendRequest({ getRooms: {} }); }
  sendJoinRoom(roomId) { this._sendRequest({ joinRoom: { roomId } }); }
  sendGameReady() { this._sendRequest({ gameReady: {} }); }
  sendGameMove(row, col) { this._sendRequest({ gameMove: { row, col } }); }
  sendGameReset() { this._sendRequest({ gameReset: {} }); }
  sendWatchGame(roomId) { this._sendRequest({ watchGame: { roomId } }); }
  sendWatchGameExit() { this._sendRequest({ watchGameExit: {} }); }
  sendClientExit() { this._sendRequest({ clientExit: {} }); }

  /** Close the connection intentionally. */
  disconnect() {
    this._intentionalClose = true;
    this._stopHeartbeat();
    if (this._ws) this._ws.close();
  }

  /**
   * Encode a Request oneof payload and push it as a binary frame.
   * @param {object} oneofPayload - e.g. {@code { gameMove: {row, col} }}
   * @private
   */
  _sendRequest(oneofPayload) {
    if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, cannot send:', oneofPayload);
      return;
    }
    try {
      const req = Request.create(oneofPayload);
      const bytes = Request.encode(req).finish();
      this._ws.send(bytes);
    } catch (e) {
      console.error('Request encode failed:', e, oneofPayload);
    }
  }

  /**
   * Decode an incoming binary Response frame and emit via event bus.
   * @param {MessageEvent} event
   * @private
   */
  _onMessage(event) {
    try {
      const bytes = new Uint8Array(event.data);
      const res = Response.decode(bytes);
      const caseName = res.payload; // protobufjs exposes the set oneof case name here
      if (!caseName) return;
      const eventCode = RESPONSE_CASE_TO_CLIENT_CODE[caseName];
      if (!eventCode) {
        console.warn('Unknown Response oneof case:', caseName);
        return;
      }
      // Convert the proto message into a plain object for consumers.
      const payloadMsg = res[caseName];
      const payloadObj = payloadMsg && typeof payloadMsg.toJSON === 'function'
        ? payloadMsg.toJSON()
        : payloadMsg;
      eventBus.emit(eventCode, payloadObj);
    } catch (e) {
      console.error('Message decode error:', e, event.data);
    }
  }

  /** @private */
  _startHeartbeat() {
    this._stopHeartbeat();
    this._heartbeatTimer = setInterval(() => {
      this.sendHeartbeat();
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
      return `${proto}//${window.location.hostname}:1999/ratel`;
    }
    return DEFAULT_WS_URL;
  }
}

export const connectionService = new ConnectionService();
