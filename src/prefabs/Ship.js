import * as CONSTANTS from '../utils/constants';
import { getGridCenter } from '../utils';
import { Text} from '../ui-kit'

class Ship {
  constructor({
    ctx, name, layout, type, width, height
  }) {
    this.ctx = ctx;
    this.name = name;
    this.type = type;
    this.width = width
    this.height = height
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
    const { x, y, name } = layout;
    const text = new Text({ 
      ctx: this.ctx, 
      text: name, 
      x:  centerX + x,
      y: centerY + y + CONSTANTS.GRID_SIZE,
      size: 14,
      align: 'left'
    })

    text.draw()
  }

  draw() {
    this.ctx.textAlign = 'center';
    this.ctx.font = '20px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.name, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 50);
    this.ctx.font = '16px Times New Roman';
    this.ctx.fillText(this.type, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 25);
    this.ctx.textAlign = 'left';

    const [centerX] = getGridCenter(CONSTANTS.HORIZONTAL_ROWS, CONSTANTS.GRID_SIZE)
    const [centerY] = getGridCenter(CONSTANTS.VERTICAL_ROWS, CONSTANTS.GRID_SIZE);
    
    this.layout.forEach((layout) => {

      this.createLayout(layout, centerX - (this.width / 4), centerY);

      this.layoutName(layout, centerX - (this.width / 4), centerY);
    });
  }
}

export default Ship;
