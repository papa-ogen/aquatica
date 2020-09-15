class Button {
  constructor({
    ctx,
    x = 0, y = 100,
    width = 120, height = 30,
    text = 'Button Text',
    callback = () => null,
    isActive = true,
  }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.callback = callback;
    this.isHovered = false;
    this.isClicked = false;
    this.isActive = isActive;
  }

  draw() {
    if (this.isHovered) {
      this.ctx.fillStyle = 'rgba(0, 102, 204, 1)';
    } else if (this.isActive) {
      this.ctx.fillStyle = 'rgba(0, 150, 255, 1)';
    } else {
      this.ctx.fillStyle = 'rgba(0, 150, 255, 1)';
    }

    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.font = '16px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.text, this.x + 10, this.y + (this.height / 2) + 5);
  }
}

module.exports = Button;
