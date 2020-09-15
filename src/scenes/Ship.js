import Scene from '../prefabs/Scene';
import Background from '../Background';

class Ship extends Scene {
  constructor(name, game, rooms = [], uiElements = []) {
    super(name, game, uiElements);
    this.rooms = rooms;

    this.bg = new Background(game);
  }

  draw(time) {
    this.bg.draw(time);

    this.rooms.forEach((room) => {
      room.draw();
    });

    this.uiElements.forEach((element) => {
      element.draw();
    });
  }
}

module.exports = Ship;
