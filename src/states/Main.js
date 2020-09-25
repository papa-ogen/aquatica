import throttle from 'lodash.throttle';
// import Player from '../objects/Player';

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.Scene {
  /**
   * Setup all objects, etc needed for the main game state.
   */
  create() {
    // Setup listener for window resize.
    window.addEventListener('resize', throttle(this.resize.bind(this), 50), false);

    this.levelText = this.add.text(0, 0, 'Welcome to hell...', {
      fontFamily: 'roboto', fontSize: '16px', fill: '#fff',
    });
    // this.levelText.setFontSize(20);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    Phaser.Display.Align.In.Center(
      this.levelText,
      this.add.zone(width / 2, height / 2, width, height),
    );
  }

  /**
   * Resize the game to fit the window.
   */
  resize() {
    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    this.scale.setGameSize(width, height);
  }

  /**
   * Handle actions in the main game loop.
   */
  update() {

  }
}
