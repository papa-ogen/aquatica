import * as CONSTANTS from '../utils/constants';
import { getGridCenter } from '../utils';
import { Text } from '../ui-kit';
import GameObject from './GameObject';

class Ship extends GameObject {
  constructor({
    ctx, game,
    name, layout, type, cost, minCrew, cargoCapacity, fuelCapacity, oxygenCapacity, foodCapacity,
    waterCapacity, wasteCapacity, maxSpeed, effectiveSpeed, dryWeight, ordinance, maxDepth,
    periscopeDepth, width, height,
  }) {
    super({ game, ctx });
    this.game = game;
    this.ctx = ctx;
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.minCrew = minCrew;
    this.cargoCapacity = cargoCapacity;
    this.fuelCapacity = fuelCapacity;
    this.oxygenCapacity = oxygenCapacity;
    this.foodCapacity = foodCapacity;
    this.waterCapacity = waterCapacity;
    this.wasteCapacity = wasteCapacity;
    this.maxSpeed = maxSpeed;
    this.effectiveSpeed = effectiveSpeed;
    this.dryWeight = dryWeight;
    this.ordinance = ordinance;
    this.maxDepth = maxDepth;
    this.periscopeDepth = periscopeDepth;
    this.width = width;
    this.height = height;
    this.layout = layout.map((l, i) => ({
      ...l,
      color: 'lightblue',
      body: new Path2D(),
      callback: () => {
        this.layout[i].color = 'red';
      },
      isHovered: false,
    }));
    this.opacity = 1;
    this.shipNameText = new Text({
      ctx: this.ctx,
      size: 20,
      text: this.name,
      x: CONSTANTS.CANVAS_HORIZONTAL_CENTER,
      y: CONSTANTS.CANVAS_HEIGHT - 50,
      align: CONSTANTS.TEXT_ALIGN_CENTER,
    });
    this.shipTypeText = new Text({
      ctx: this.ctx,
      size: 16,
      text: this.type,
      x: CONSTANTS.CANVAS_HORIZONTAL_CENTER,
      y: CONSTANTS.CANVAS_HEIGHT - 25,
      align: CONSTANTS.TEXT_ALIGN_CENTER,
    });
  }

  createLayout(layout, centerX, centerY) {
    const {
      body, x, y, width, height,
    } = layout;
    const offsetX = centerX + x;
    const offsetY = centerY + y;
    body.rect(offsetX, offsetY, width, height);
    this.ctx.globalAlpha = 0;
    this.ctx.fill(body);
    this.ctx.globalAlpha = 1;

    if (layout.type === 'ordinance') {
      this.ctx.globalAlpha = 0.4;
    }

    if (layout.img) {
      const { img: bg } = this.game.findAssetByName(layout.img);
      const { img: bgHovered } = this.game.findAssetByName(`${layout.img}-hover`);

      const isHovered = layout.isHovered ? bgHovered : bg;

      this.ctx.drawImage(isHovered, offsetX, offsetY, width, height);
    } else {
      const { img: bg } = this.game.findAssetByName('layout-square');
      const { img: bgHovered } = this.game.findAssetByName('layout-square-hovered');

      const isHovered = layout.isHovered ? bgHovered : bg;

      this.ctx.drawImage(isHovered, offsetX, offsetY, width, height);
    }

    this.ctx.globalAlpha = 1;
  }

  layoutName(layout, centerX, centerY) {
    const {
      x, y, name, height,
    } = layout;
    const text = new Text({
      ctx: this.ctx,
      text: name,
      x: centerX,
      y: centerY + y + (height / 2),
      size: 14,
      color: CONSTANTS.COLORS.BLACK.HEX,
      align: CONSTANTS.TEXT_ALIGN_LEFT,
    });

    text.draw();
  }

  draw() {
    this.shipNameText.draw();
    this.shipTypeText.draw();

    const centerX = CONSTANTS.GRID_SIZE * 12; // TODO: fix centering
    const centerY = CONSTANTS.GRID_SIZE * 7; // TODO: fix centering

    this.layout.forEach((layout) => {
      this.createLayout(layout, centerX - (this.width / 4), centerY);

      this.layoutName(layout, centerX - (this.width / 4), centerY);
    });
  }
}

export default Ship;
