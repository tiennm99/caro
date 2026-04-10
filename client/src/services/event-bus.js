/**
 * Simple pub/sub event bus for decoupling WebSocket from scenes.
 * @module event-bus
 */

class EventBus {
  constructor() {
    /** @type {Map<string, Set<function>>} */
    this._listeners = new Map();
  }

  /**
   * Subscribe to an event.
   * @param {string} event - event name (e.g. ClientEventCode value)
   * @param {function} callback - handler function
   */
  on(event, callback) {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set());
    }
    this._listeners.get(event).add(callback);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event
   * @param {function} callback
   */
  off(event, callback) {
    const set = this._listeners.get(event);
    if (set) set.delete(callback);
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event
   * @param {*} data - parsed event data
   */
  emit(event, data) {
    const set = this._listeners.get(event);
    if (!set) return;
    for (const cb of set) {
      try { cb(data); } catch (e) { console.error(`EventBus error [${event}]:`, e); }
    }
  }
}

export const eventBus = new EventBus();
