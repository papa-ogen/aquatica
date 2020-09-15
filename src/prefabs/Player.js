class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  draw() {
    const radius = 10;
    const lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.arc(this.x - radius - (lineWidth * 2),
      this.y - radius - (lineWidth * 2), radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'pink';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#003300';
    this.ctx.stroke();
  }
}

module.exports = Player;
