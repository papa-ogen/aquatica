import Component from './Component';
import * as CONSTANTS from '../utils/constants';

class Text extends Component {
  constructor({
    ctx,
    x = 50, y = 50,
    text,
    color = CONSTANTS.COLORS.WHITE.HEX,
    size = 16,
    align = CONSTANTS.TEXT_ALIGN_LEFT,
    opacity,
  }) {
    super({
      ctx, x, y, text, color, opacity,
    });

    this.size = size;
    this.align = align;
  }

  draw() {
    this.ctx.textAlign = this.align;
    this.ctx.font = `${this.size}px "Exo 2"`;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

module.exports = Text;
