import Phaser from 'phaser';

class LoadingScene extends Phaser.Scene {
  preload() {
    this.createPreloader();
    this.loadAssets();
  }

  createPreloader() {
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    // add logo image
    const logo = this.add.image(width / 2, height / 2 - 110, 'logo');
    logo.setScale(0.1);

    // display progress bar
    const progressBar = this.add.graphics();
    const progresBox = this.add.graphics();
    progresBox.fillStyle(0x222222, 0.8);
    progresBox.fillRect(width / 2 - 160, height / 2 + 30, 320, 50);

    // loading text
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 16,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    // percent text
    const percenText = this.make.text({
      x: width / 2,
      y: height / 2 + 56,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percenText.setOrigin(0.5, 0.5);

    // loading assets text
    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percenText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progresBox.destroy();
      progressBar.destroy();
      assetText.destroy();
      loadingText.destroy();
      percenText.destroy();
    });
  }

  create() {
    const shipData = this.cache.json.get('shipData');

    this.scene.start('Main', {
      shipData,
    });
  }

  loadAssets() {
    this.load.json('shipData', 'src/data/ships.json');

    this.load.tilemapTiledJSON('level1', 'src/data/1.json');

    // this.load.setPath('assets/');
    this.load.image('diver', 'src/assets/images/diver.png');
    this.load.image('compass-pointer-white', 'src/assets/images/compass-pointer-white.png');
    this.load.image('compass-pointer', 'src/assets/images/compass-pointer.png');
    this.load.image('compass-body', 'src/assets/images/compass-body.png');
    this.load.image('gauge-bg', 'src/assets/images/gauge-bg.png');
    this.load.image('manta', 'src/assets/images/manta.png');
    this.load.image('sub-2', 'src/assets/images/sub-2.png');
    this.load.image('sub-2-shadow', 'src/assets/images/sub-2-shadow.png');
    this.load.image('brick', ['src/assets/images/brick.jpg', 'src/assets/images/brick_n.png']);
    this.load.image('shark-bg', 'src/assets/images/shark-bg.jpg');
    this.load.image('cockpit', 'src/assets/images/cockpit.png');
    this.load.image('cockpit-hover', 'src/assets/images/cockpit-hover.png');
    this.load.image('layout-square', 'src/assets/images/layout-square.png');
    this.load.image('layout-square-hover', 'src/assets/images/layout-square-hover.png');
    this.load.image('main', 'src/assets/images/main.png');
    this.load.image('main-hover', 'src/assets/images/main-hover.png');
    this.load.image('background', 'src/assets/images/shark-bg.jpg');
    this.load.image('desert-tiles', ['src/assets/sprites/desert-tiles.png', 'src/assets/sprites/desert-tiles_n.png']);
    this.load.image('red', 'src/assets/images/red.png');
    this.load.image('bubble', 'src/assets/images/bubble.png');
    this.load.image('sub-shadow', 'src/assets/images/sub-shadow.png');
    this.load.image('mask', 'src/assets/images/mask.png');
    this.load.image('cursor', 'src/assets/images/cursor.png');
    this.load.spritesheet('sub',
      ['src/assets/sprites/sub-sprite.png', 'src/assets/sprites/sub-sprite_n.png'],
      { frameWidth: 210, frameHeight: 132 });
    this.load.spritesheet('fish',
      'src/assets/sprites/fish-sprite.png',
      { frameWidth: 32, frameHeight: 32, endFrame: 18 });

  //   this.load.audio('gunSound', require('../assets/sounds/Gun+Shot2.mp3'));
  }
}

export default LoadingScene;
