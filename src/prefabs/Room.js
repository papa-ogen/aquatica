class Room {
  constructor(ctx, x, y, name) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 100;
    this.name = name;
    this.isDraggable = true;
    this.isDragging = false;
    this.opacity = 1;
  }

  draw() {
    this.ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.font = '20px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.name, this.x + (this.width / 2) - 30, this.y + (this.height / 2) + 5);
  }
}

module.exports = Room;
