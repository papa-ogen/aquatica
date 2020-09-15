class Component {
  constructor({
    ctx,
    x = 50, y = 50,
    text,
    color = 'red',
    isActive = true,
    callback = () => null,
  }) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.text = text;
    this.isHovered = false;
    this.isActive = isActive;
    this.body = new Path2D();
    this.color = color;
    this.callback = callback;
  }
}

module.exports = Component;
