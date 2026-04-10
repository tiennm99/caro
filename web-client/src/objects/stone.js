/**
 * Stone — Phaser GameObject for a single Gomoku stone.
 * Renders black or white circle with gradient effect and drop animation.
 * @module stone
 */

import Phaser from 'phaser';

const STONE_RADIUS_RATIO = 0.43;

export class Stone extends Phaser.GameObjects.Graphics {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x - pixel X
   * @param {number} y - pixel Y
   * @param {string} piece - 'BLACK' or 'WHITE'
   * @param {number} cellSize - board cell size for radius calc
   * @param {boolean} [animate=true] - play drop animation
   */
  constructor(scene, x, y, piece, cellSize, animate = true) {
    super(scene);
    this.setPosition(x, y);
    this.piece = piece;
    this.radius = cellSize * STONE_RADIUS_RATIO;

    this._drawStone();
    scene.add.existing(this);

    if (animate) {
      this.setScale(0);
      scene.tweens.add({
        targets: this,
        scaleX: 1,
        scaleY: 1,
        duration: 180,
        ease: 'Back.easeOut'
      });
    }
  }

  /** @private */
  _drawStone() {
    this.clear();
    const r = this.radius;

    if (this.piece === 'BLACK') {
      // Dark stone with highlight
      this.fillStyle(0x222222, 1);
      this.fillCircle(0, 0, r);
      // Highlight
      this.fillStyle(0x555555, 0.4);
      this.fillCircle(-r * 0.25, -r * 0.25, r * 0.35);
    } else {
      // White stone with subtle border
      this.fillStyle(0xf5f5f5, 1);
      this.fillCircle(0, 0, r);
      // Highlight
      this.fillStyle(0xffffff, 0.6);
      this.fillCircle(-r * 0.25, -r * 0.25, r * 0.3);
      // Border
      this.lineStyle(1, 0x999999, 0.8);
      this.strokeCircle(0, 0, r);
    }
  }
}

/**
 * Create a last-move indicator (small red dot).
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.GameObjects.Graphics}
 */
export function createLastMoveMarker(scene, x, y) {
  const g = scene.add.graphics();
  g.fillStyle(0xe94560, 1);
  g.fillCircle(x, y, 4);
  return g;
}
