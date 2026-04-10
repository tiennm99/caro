import Phaser from 'phaser';
import { connectionService } from '../services/connection-service.js';
import { eventBus } from '../services/event-bus.js';
import { ClientEventCode } from '../config/protocol-constants.js';

/**
 * BootScene — initial scene that connects to server
 * and transitions to MenuScene once connected.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.add.text(400, 380, 'Gomoku', {
      fontSize: '48px', fontFamily: 'sans-serif', color: '#e94560'
    }).setOrigin(0.5);

    this.add.text(400, 440, 'Connecting to server...', {
      fontSize: '18px', fontFamily: 'sans-serif', color: '#888'
    }).setOrigin(0.5);

    // Connect to server
    connectionService.connect();

    // Transition to menu once server prompts for nickname
    eventBus.on(ClientEventCode.NICKNAME_SET, () => {
      this.scene.start('MenuScene');
    });
  }
}
