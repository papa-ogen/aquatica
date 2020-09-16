class Scene {
  constructor({ name, game, uiElements = [] }) {
    this.name = name;
    this.game = game;
    this.uiElements = uiElements;
  }
}

module.exports = Scene;
