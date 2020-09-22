class Component {
  constructor({
    ctx,
    x = 50, y = 50,
    text,
    color = '#111',
    isActive = true,
    callback = () => null,
    opacity = 1,
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
    this.opacity = opacity;
  }

  update() {} // eslint-disable-line

  draw() {} // eslint-disable-line
}

export default Component;
