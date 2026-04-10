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

    // Transition to menu once server prompts for nickname. Server emits
    // NICKNAME_SET both as the initial prompt AND on validation rejection,
    // so unsubscribe after the first hit — otherwise later rejections would
    // bounce the scene back to MenuScene (restart loop).
    const onPrompt = () => {
      eventBus.off(ClientEventCode.NICKNAME_SET, onPrompt);
      this.scene.start('MenuScene');
    };
    eventBus.on(ClientEventCode.NICKNAME_SET, onPrompt);
  }
}
