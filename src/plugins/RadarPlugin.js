import Phaser from 'phaser';
import Dots from '../prefabs/Dots';

export default class RadarPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.scene = scene;
    this.enemies = this.scene.enemies;
    this.dots = null;
    this.radarMaxLimit = 400;
  }

  create(x, y, enemies) {
    this.dots = new Dots(this.scene);
    this.enemies = enemies;

    this.container = this.scene.add.container(x, y);

    this.pointer = this.scene.add.image(0, 0, 'radar-pointer')
      .setOrigin(0, 0.5);

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

    const enemy = {
      x: 20, y: -60,
    };

    // console.log(targetX, targetY, gameObjects);
    if (targetX > enemy.x && targetY < enemy.y) {
      const dot = this.dots.activate(enemy.x, enemy.y);
      this.container.add(dot);
    }
  }

  update() {
    if (this.pointer) {
      this.pointer.angle += 1;
    }

    if (this.pointer && this.enemies) { this.searchEnemies(); }
  }
}
