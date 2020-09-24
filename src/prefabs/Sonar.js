import * as CONSTANTS from '../utils/constants';
import GameObject from './GameObject';
import { Circle } from '../ui-kit';

class Sonar extends GameObject {
  constructor({
    ctx,
    player,
    x = CONSTANTS.GRID_SIZE, y = CONSTANTS.CANVAS_HEIGHT, radius = 80,
  }) {
    super({ ctx, x: x + radius, y: y - radius - CONSTANTS.GRID_SIZE });
    this.player = player;
    this.radius = radius;
    this.isHovered = false;
    this.body = null;
    this.color = 'lime';

    this.speed = 1;
    this.timePassed = 0;
    this.oldTimeStamp = 0;
    this.secondsPassed = 0;

    this.player = this.player;
  }

  update(time) {
    // const diff = (this.speed * time);
    // this.x += this.speed;
  }

  drawPlayerPosition() {
    const angle = this.player.position.direction - 90; // TODO: Shouldn't zero degrees center north?
    const radian = angle * (Math.PI / 180);
    const x = this.radius * Math.cos(radian);
    const y = this.radius * Math.sin(radian);
    const circle = new Circle({
      ctx: this.ctx,
      x: this.x + x,
      y: this.y + y,
      radius: 8,
      color: 'white',
      text: 'N',
    });

    circle.draw();
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

    this.drawPlayerPosition();
  }
}

export default Sonar;
