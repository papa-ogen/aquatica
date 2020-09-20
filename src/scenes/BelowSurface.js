import Scene from '../prefabs/Scene';
import Background from '../Background';

class BelowSurface extends Scene {
  constructor({
    name, game, uiElements = [],
    ship,
  }) {
    super({ name, game, uiElements });

    this.bg = new Background(game);
    this.ship = ship;
  }

  draw(time) {
    this.bg.draw(time);

    this.ship.draw();

    super.draw();

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

export default BelowSurface;
