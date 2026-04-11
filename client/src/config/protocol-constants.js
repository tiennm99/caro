/**
 * Client-side event bus keys. After the typed-protobuf migration, these are
 * purely local constants used by {@link module:event-bus} consumers — the wire
 * format no longer carries string codes.
 *
 * {@link module:connection-service} maps each {@code Response} oneof case to
 * one of these codes before re-emitting on the event bus.
 * @module protocol-constants
 */

/** @enum {string} Codes the server sends TO the client */
export const ClientEventCode = Object.freeze({
  CLIENT_CONNECT: 'CLIENT_CONNECT',
  NICKNAME_SET: 'NICKNAME_SET',
  SHOW_OPTIONS: 'SHOW_OPTIONS',
  SHOW_ROOMS: 'SHOW_ROOMS',
  ROOM_CREATE_SUCCESS: 'ROOM_CREATE_SUCCESS',
  ROOM_JOIN_SUCCESS: 'ROOM_JOIN_SUCCESS',
  ROOM_JOIN_FAIL_FULL: 'ROOM_JOIN_FAIL_FULL',
  ROOM_JOIN_FAIL_INEXIST: 'ROOM_JOIN_FAIL_INEXIST',
  ROOM_PLAY_FAIL_INEXIST: 'ROOM_PLAY_FAIL_INEXIST',
  GAME_STARTING: 'GAME_STARTING',
  GAME_MOVE_SUCCESS: 'GAME_MOVE_SUCCESS',
  GAME_MOVE_INVALID: 'GAME_MOVE_INVALID',
  GAME_MOVE_OCCUPIED: 'GAME_MOVE_OCCUPIED',
  GAME_MOVE_OUT_OF_BOUNDS: 'GAME_MOVE_OUT_OF_BOUNDS',
  GAME_MOVE_NOT_YOUR_TURN: 'GAME_MOVE_NOT_YOUR_TURN',
  GAME_OVER: 'GAME_OVER',
  GAME_READY: 'GAME_READY',
  CLIENT_EXIT: 'CLIENT_EXIT',
  CLIENT_KICK: 'CLIENT_KICK',
  GAME_WATCH_SUCCESSFUL: 'GAME_WATCH_SUCCESSFUL',
  PVE_DIFFICULTY_NOT_SUPPORT: 'PVE_DIFFICULTY_NOT_SUPPORT',
});
