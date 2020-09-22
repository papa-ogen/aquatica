class GameObject {
  constructor({
    game, ctx, x, y,
  }) {
    this.game = game;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  update() {} // eslint-disable-line

  draw() {} // eslint-disable-line
}

export default GameObject;
