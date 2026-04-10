/**
 * Board — Phaser GameObject that renders the 15x15 Gomoku grid.
 * Draws wood background, grid lines, star points, and coordinate labels.
 * @module board
 */

import Phaser from 'phaser';

const BOARD_SIZE = 15;
const PADDING = 50;
const STAR_POINTS = [[3,3],[3,11],[7,7],[11,3],[11,11]];
const WOOD_COLOR = 0xdcb35c;
const LINE_COLOR = 0x8b6914;
const LABEL_COLOR = '#5a4510';

export class Board extends Phaser.GameObjects.Graphics {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} canvasSize - total canvas pixel size
   */
  constructor(scene, canvasSize) {
    super(scene);
    this.canvasSize = canvasSize;
    this.cellSize = (canvasSize - 2 * PADDING) / (BOARD_SIZE - 1);
    scene.add.existing(this);
    this.draw();
  }

  /**
   * Get pixel X for a board column.
   * @param {number} col - 0-14
   * @returns {number}
   */
  gridX(col) { return PADDING + col * this.cellSize; }

  /**
   * Get pixel Y for a board row.
   * @param {number} row - 0-14
   * @returns {number}
   */
  gridY(row) { return PADDING + row * this.cellSize; }

  /**
   * Convert pixel coordinates to nearest grid intersection.
   * @param {number} px - pixel X
   * @param {number} py - pixel Y
   * @returns {{ row: number, col: number }|null} - null if out of bounds
   */
  pixelToGrid(px, py) {
    const col = Math.round((px - PADDING) / this.cellSize);
    const row = Math.round((py - PADDING) / this.cellSize);
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return null;
    return { row, col };
  }

  /** @returns {number} */
  getCellSize() { return this.cellSize; }

  /** Draw the full board (background, grid, stars, labels). */
  draw() {
    this.clear();
    this._drawBackground();
    this._drawGrid();
    this._drawStarPoints();
    this._drawLabels();
  }

  /** @private */
  _drawBackground() {
    this.fillStyle(WOOD_COLOR, 1);
    this.fillRect(0, 0, this.canvasSize, this.canvasSize);
    // Subtle grain lines
    this.lineStyle(1, LINE_COLOR, 0.1);
    for (let i = 0; i < this.canvasSize; i += 7) {
      this.lineBetween(0, i, this.canvasSize, i);
    }
  }

  /** @private */
  _drawGrid() {
    this.lineStyle(1, LINE_COLOR, 1);
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.lineBetween(this.gridX(i), this.gridY(0), this.gridX(i), this.gridY(BOARD_SIZE - 1));
      this.lineBetween(this.gridX(0), this.gridY(i), this.gridX(BOARD_SIZE - 1), this.gridY(i));
    }
  }

  /** @private */
  _drawStarPoints() {
    this.fillStyle(LINE_COLOR, 1);
    for (const [r, c] of STAR_POINTS) {
      this.fillCircle(this.gridX(c), this.gridY(r), 4);
    }
  }

  /** @private */
  _drawLabels() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const letter = String.fromCharCode(65 + i);
      this.scene.add.text(this.gridX(i), PADDING - 25, letter, {
        fontSize: '12px', color: LABEL_COLOR, fontFamily: 'sans-serif'
      }).setOrigin(0.5);
      this.scene.add.text(PADDING - 25, this.gridY(i), String(i + 1), {
        fontSize: '12px', color: LABEL_COLOR, fontFamily: 'sans-serif'
      }).setOrigin(0.5);
    }
  }
}
