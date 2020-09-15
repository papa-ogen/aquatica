import Component from './Component';

class Text extends Component {
  constructor({
    ctx,
    x = 50, y = 50,
    text,
    color = 'red',
    size = 16,
  }) {
    super({
      ctx, x, y, text, color,
    });

    this.size = size;
  }

  draw() {
    this.ctx.font = `${this.size}px Times New Roman`;
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.text, this.x, this.y);
  }
}

module.exports = Text;
