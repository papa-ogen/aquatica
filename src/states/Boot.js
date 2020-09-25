import WebFont from 'webfontloader';
import Phaser from 'phaser';
/**
 * Setup the pre-game boot sequence.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Preload any assets needed for the preload state.
   */
  preload() {
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);

    WebFont.load({
      google: { families: ['Exo 2'] },
      active: this.fontsLoaded,
    });

    this.load.image('logo', '../src/assets/images/cockpit.png');
  }

  fontsLoaded() {
    this.fontsReady = true;
  }

  /**
   * Setup anything that is needed before the preload state begins.
   */
  // create() {
  //   // Scale the game to fill the entire page.
  //  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  //   // Don't pause the game on blur.
  //     this.game.stage.disableVisibilityChange = true;

  //   // Disable clearing the canvas on each tick (usually not needed).
  //   this.game.clearBeforeRender = false;

  //   // Disable right click.
  //   this.game.canvas.oncontextmenu = (e) => e.preventDefault();

  //   // Move on to the preload state.
  //   this.game.scene.start('Preload');
  // }

  update() {
    if (this.fontsReady) {
      this.scene.start('Loading');
    }
  }
}
