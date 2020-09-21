import Component from './Component';

class Circle extends Component {
  constructor({
    ctx,
    x = 50, y = 50,
    radius = 30,
    text,
    color = 'red',
    callback,
  }) {
    super({
      ctx, x, y, text, color, callback,
    });
    this.radius = radius;
    this.isHovered = false;
    this.body = new Path2D();
  }

  draw() {
    this.body.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.isHovered) {
      this.ctx.fillStyle = 'green';
    } else {
      this.ctx.fillStyle = this.color;
    }

    this.ctx.fill(this.body);

    this.ctx.font = '16px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.text, this.x, this.y + 5);
  }
}

module.exports = Circle;
