/**
 * MenuScene — shows DOM overlay menus (nickname, lobby, PVP/PVE).
 * Phaser canvas shows a subtle background; all interaction is via DOM.
 * @module menu-scene
 */

import Phaser from 'phaser';
import { eventBus } from '../services/event-bus.js';
import { ClientEventCode } from '../config/protocol-constants.js';
import { showNicknameScreen, hideOverlay } from '../ui/menu-ui.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    // Subtle background
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Grid pattern background decoration
    const g = this.add.graphics();
    g.lineStyle(1, 0x16213e, 0.4);
    for (let i = 0; i < 800; i += 40) {
      g.lineBetween(i, 0, i, 800);
      g.lineBetween(0, i, 800, i);
    }

    // Show nickname entry
    showNicknameScreen();

    // Transition to GameScene when game starts
    eventBus.on(ClientEventCode.GAME_STARTING, this._onGameStarting.bind(this));
  }

  /**
   * Handle game starting — transition to GameScene.
   * @private
   */
  _onGameStarting() {
    hideOverlay();
    this.scene.start('GameScene');
  }

  shutdown() {
    eventBus.off(ClientEventCode.GAME_STARTING, this._onGameStarting.bind(this));
  }
}
