class LoadingScene extends Phaser.Scene {
  preload() {
    this.createPreloader();
  //  this.loadAssets();
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
      percenText.setText(`${parseInt(value * 100)}%`);
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
    const gameConfig = this.cache.json.get('game_data');
    const playerData = this.cache.json.get('player_data');

    // this.scene.start('Main', {
    //   gameConfig, playerData,
    // });
    this.scene.start('Main');
  }

  // loadAssets() {
  //   this.load.json('game_data', require('../assets/data/game_data.json'));
  //   this.load.json('player_data', require('../assets/data/player_data.json'));
  //   this.load.tilemapTiledJSON('level1', require('../assets/map.json'));

  //   this.load.image('bullet', require('../assets/images/bullet.png'));
  //   this.load.image('laser', require('../assets/images/laser.png'));
  //   this.load.image('cursor', require('../assets/images/cursor.png'));
  //   this.load.image('sniper', require('../assets/images/sniper.png'));
  //   this.load.image('map', require('../assets/images/dungeon-tileset.png'));

  //   this.load.spritesheet('alien',
  //     require('../assets/images/alien-sprite.png'),
  //     {
  //       frameWidth: 16, frameHeight: 16,
  //     });

  //   this.load.spritesheet('soldier',
  //     require('../assets/images/soldier-sprite.png'),
  //     {
  //       frameWidth: 16, frameHeight: 16,
  //     });

  //   this.load.audio('gunSound', require('../assets/sounds/Gun+Shot2.mp3'));
  // }
}

export default LoadingScene;
