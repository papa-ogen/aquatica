import * as CONSTANTS from './utils/constants';

class Background {
  constructor(game) {
    this.game = game;
    this.ctx = game.bgCanvas.ctx;
  }

  createGrid() {
    this.ctx.strokeStyle = 'rgba(0, 0, 100, 1)';

    for (let i = 0; i < CONSTANTS.HORIZONTAL_ROWS; i += 1) {
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(i * CONSTANTS.GRID_SIZE, 0);
      this.ctx.lineTo(i * CONSTANTS.GRID_SIZE, CONSTANTS.CANVAS_HEIGHT);
      this.ctx.stroke();
    }

    for (let j = 0; j < CONSTANTS.VERTICAL_ROWS; j += 1) {
      this.ctx.moveTo(0, j * CONSTANTS.GRID_SIZE);
      this.ctx.lineTo(CONSTANTS.CANVAS_WIDTH, j * CONSTANTS.GRID_SIZE);
      this.ctx.stroke();
    }
  }

  seaBottom() {
    const seaBottom = this.game.assets.find((asset) => asset.name === 'sea-bottom');
    if (seaBottom.loaded) {
      this.ctx.drawImage(seaBottom.img, 0, 0);
      // TODO: Create new canvas for sea-bottom
      // const amplitude = 20;
      // const period = 2000;
      // const x = amplitude * Math.sin(time / period) + 50;
      // this.game.canvas.style.filter = `blur(2px) brightness(${x}%) hue-rotate(140deg)`;
    }
  }

  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);

    this.seaBottom();

    if (!this.game.debug) {
      this.createGrid();
    }

    // this.game.canvas.style.filter = 'none';
  }
}

export default Background;
