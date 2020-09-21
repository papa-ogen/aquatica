import * as CONSTANTS from '../utils/constants';

class Background {
  constructor({ game, asset }) {
    this.game = game;
    this.asset = asset;
    this.ctx = game.bgCanvas.ctx;
  }

  createGrid() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(0, 0, 100, 1)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < CONSTANTS.HORIZONTAL_ROWS; i += 1) {
      this.ctx.moveTo(i * CONSTANTS.GRID_SIZE, 0);
      this.ctx.lineTo(i * CONSTANTS.GRID_SIZE, CONSTANTS.CANVAS_HEIGHT);
    }

    for (let j = 0; j < CONSTANTS.VERTICAL_ROWS; j += 1) {
      this.ctx.moveTo(0, j * CONSTANTS.GRID_SIZE);
      this.ctx.lineTo(CONSTANTS.CANVAS_WIDTH, j * CONSTANTS.GRID_SIZE);
    }

    this.ctx.stroke();
  }

  draw() {
    this.game.bgCanvas.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

    if (this.asset) {
      this.ctx.drawImage(this.asset.img, 0, 0);
    } else {
      this.ctx.fillStyle = 'blue';
    }

    if (this.game.debug) {
      this.createGrid();
    }
  }
}

export default Background;
