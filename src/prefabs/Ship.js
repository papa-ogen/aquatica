import * as CONSTANTS from '../utils/constants';
import { getGridCenter } from '../utils';

class Ship {
  constructor({
    ctx, name, layout, type,
  }) {
    this.ctx = ctx;
    this.name = name;
    this.type = type;
    this.layout = layout.map((l, i) => ({
      ...l,
      color: 'lightblue',
      body: new Path2D(),
      callback: () => {
        this.layout[i].color = 'red';
      },
    }));
    this.opacity = 1;
  }

  createLayout(layout, centerX, centerY) {
    const {
      body, x, y, width, height,
    } = layout;
    body.rect(centerX + x,
      centerY + y - (height / 2) + +CONSTANTS.GRID_SIZE,
      width,
      height);
    this.ctx.fillStyle = layout.color;
    this.ctx.fill(body);
  }

  layoutName(layout, centerX, centerY) {
    const { x, y } = layout;
    this.ctx.fillStyle = 'black';
    this.ctx.font = '14px Times New Roman';
    this.ctx.fillText(layout.name, centerX + x, centerY + y + CONSTANTS.GRID_SIZE);
  }

  draw() {
    this.ctx.textAlign = 'center';
    this.ctx.font = '20px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.name, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 50);
    this.ctx.font = '16px Times New Roman';
    this.ctx.fillText(this.type, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 25);
    this.ctx.textAlign = 'left';

    this.layout.forEach((layout) => {
      const centerX = getGridCenter(CONSTANTS.HORIZONTAL_ROWS, CONSTANTS.GRID_SIZE);
      const centerY = getGridCenter(CONSTANTS.VERTICAL_ROWS, CONSTANTS.GRID_SIZE);

      this.createLayout(layout, centerX, centerY);

      this.layoutName(layout, centerX, centerY);
    });
  }
}

export default Ship;
