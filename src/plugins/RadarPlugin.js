import Phaser from 'phaser';
import Dots from '../prefabs/Dots';
import { normalizeVectors } from '../utils';

export default class RadarPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.enemies = this.scene.enemies;
    this.dots = null;
    this.radarMaxLimit = 400;
  }

  create(x, y, enemies) {
    this.addSounds();

    this.dots = new Dots(this.scene);
    this.enemies = enemies;

    this.container = this.scene.add.container(x, y);

    this.pointer = this.scene.add.image(0, 0, 'radar-pointer')
      .setOrigin(0, 1);

    const body = this.scene.add.image(0, 0, 'radar-body');

    this.container.add(body);
    this.container.add(this.pointer);
  }

  boot() {
    const eventEmitter = this.systems.events;

    eventEmitter.on('update', this.update, this);
  }

  searchEnemies() {
    const {
      angle, width, x, y,
    } = this.pointer;
    const radarRadius = width * 2;
    const gameObjects = this.enemies.getChildren();
    const targetX = x + (width * Math.cos(angle));
    const targetY = y + (width * Math.sin(angle));

    const vector = {
      x: 20, y: -60,
    };

    const normalizedEnemy = normalizeVectors({
      vector,
      origin: {
        width: 1024,
        height: 1024,
      },
      target: {
        width: radarRadius,
        height: radarRadius,
      },
    });

    console.log(normalizedEnemy);

    // console.log(targetX, targetY, gameObjects);
    if (targetX > vector.x && targetY < vector.y) {
      this.blipSound.play(this.soundConfig);
      const dot = this.dots.activate(vector.x, vector.y);
      this.container.add(dot);
    }
  }

  addSounds() {
    this.blipSound = this.scene.sound.add('blip');
    this.soundConfig = {
      mute: false,
      volume: 0.1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
  }

  update() {
    if (this.pointer) {
      this.pointer.rotation += 0.01;
    }

    if (this.pointer && this.enemies) { this.searchEnemies(); }
  }
}
