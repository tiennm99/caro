import Phaser from 'phaser';
import { BootScene } from '../scenes/boot-scene.js';
import { MenuScene } from '../scenes/menu-scene.js';
import { GameScene } from '../scenes/game-scene.js';

/** Phaser game configuration */
export const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, GameScene]
};
