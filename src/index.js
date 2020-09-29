import Phaser from 'phaser';
import Stats from 'stats.js';
import Boot from './scenes/Boot';
import Preload from './scenes/Loading';
import Main from './scenes/Main';
import BelowSurface from './scenes/BelowSurface/belowSurface';
import BelowSurfaceHUD from './scenes/BelowSurface/ui';

/**
 * Setup the root class for the whole game.
 */
class Game extends Phaser.Game {
  /**
   * Initialize the game before preloading assets.
   */
  constructor() {
    // Setup the game's stage.
    super({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      renderer: Phaser.WEBGL_MULTI,
      antialias: true,
      multiTexture: true,
      enableDebug: process.env.NODE_ENV === 'development',
      physics: {
        default: 'arcade',
        arcade: { debug: false },
      },
    });

    // Setup the different game states.
    this.scene.add('Boot', Boot, false);
    this.scene.add('Loading', Preload, false);
    this.scene.add('Main', Main, false);
    this.scene.add('BelowSurface', BelowSurface, false);
    this.scene.add('BelowSurfaceHUD', BelowSurfaceHUD, false);

    // Kick things off with the boot state.
    this.scene.start('Boot');

    // Handle debug mode.
    if (process.env.NODE_ENV === 'development') {
      this.setupStats();
    }

    // Expose the game on the window if in dev/test.
    if (process.env.NODE_ENV !== 'production') {
      window.game = this;
    }
  }

  /**
   * Display the FPS and MS using Stats.js.
   */
  setupStats() {
    // Setup the new stats panel.
    const stats = new Stats();
    document.body.appendChild(stats.dom);

    // Monkey-patch the update loop so we can track the timing.
    const updateLoop = this.update;
    this.update = (...args) => {
      stats.begin();
      updateLoop.apply(this, args);
      stats.end();
    };
  }
}

new Game();
