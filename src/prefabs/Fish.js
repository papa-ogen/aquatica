class Fish {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, 10, 15, Math.PI / 4, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}

module.exports = Fish;
