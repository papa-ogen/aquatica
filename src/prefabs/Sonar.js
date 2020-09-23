import * as CONSTANTS from '../utils/constants';
import GameObject from './GameObject';

class Sonar extends GameObject {
  constructor({
    ctx,
    x = CONSTANTS.GRID_SIZE, y = CONSTANTS.CANVAS_HEIGHT, radius = 80,
  }) {
    super({ ctx, x: x + radius, y: y - radius - CONSTANTS.GRID_SIZE });
    this.radius = radius;
    this.isHovered = false;
    this.body = null;
    this.color = 'lime';

    this.speed = 1;
    this.timePassed = 0;
    this.oldTimeStamp = 0;
    this.secondsPassed = 0;
  }

  update(time) {
    const diff = (this.speed * time);
    // this.x += this.speed;
    console.log(diff, this.x);
  }

  draw() {
    this.body = new Path2D();
    this.body.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.isHovered) {
      this.ctx.fillStyle = 'green';
    } else {
      this.ctx.fillStyle = this.color;
    }

    this.ctx.fill(this.body);
  }
}

export default Sonar;
