import * as CONSTANTS from '../utils/constants';
import Component from './Component';

class Circle extends Component {
  constructor({
    ctx,
    x = 50, y = 50,
    radius = 30,
    text,
    color = CONSTANTS.COLORS.MING.HEX,
    callback,
  }) {
    super({
      ctx, x, y, text, color, callback,
    });
    this.radius = radius;
    this.isHovered = false;
    this.body = new Path2D();
    this.hasText = !!text;
  }

  draw() {
    this.body.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.isHovered) {
      this.ctx.fillStyle = CONSTANTS.COLORS.JET.HEX;
    } else {
      this.ctx.fillStyle = this.color;
    }

    this.ctx.fill(this.body);

    if (this.hasText) {
      this.ctx.font = '15px "Exo 2"';
      if (this.isHovered) {
        this.ctx.fillStyle = CONSTANTS.COLORS.WHITE.HEX;
      } else {
        this.ctx.fillStyle = CONSTANTS.COLORS.INDIGO_DYE.HEX;
      }
      this.ctx.textAlign = CONSTANTS.TEXT_ALIGN_CENTER;
      this.ctx.fillText(this.text, this.x, this.y + 5);
    }
  }
}

module.exports = Circle;
