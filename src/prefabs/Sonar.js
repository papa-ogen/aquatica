import * as CONSTANS from '../utils/constants';

class Sonar {
  constructor({
    ctx,
    x = CONSTANS.GRID_SIZE, y = CONSTANS.CANVAS_HEIGHT, radius = 80,
  }) {
    this.ctx = ctx;
    this.x = x + radius;
    this.y = y - radius - CONSTANS.GRID_SIZE;
    this.radius = radius;
    this.isHovered = false;
    this.body = new Path2D();
    this.color = 'lime';
  }

  draw() {
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
