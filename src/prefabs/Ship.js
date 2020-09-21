import * as CONSTANTS from '../utils/constants';
import { getGridCenter } from '../utils';
import { Text } from '../ui-kit';

class Ship {
  constructor({
    ctx, game, name, layout, type, cost, minCrew, cargoCapacity, fuelCapacity, oxygenCapacity, foodCapacity,
    waterCapacity, wasteCapacity, maxSpeed, effectiveSpeed, dryWeight, ordinance, maxDepth, periscopeDepth,
    width, height,
  }) {
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
  }

  createLayout(layout, centerX, centerY) {
    const { img: bg } = this.game.findAssetByName('layout-square');
    const { img: bgHovered } = this.game.findAssetByName('layout-square-hovered');
    const isHovered = layout.isHovered ? bgHovered : bg;
    const {
      body, x, y, width, height,
    } = layout;
    const offsetX = centerX + x;
    const offsetY = centerY + y;
    body.rect(offsetX, offsetY, width, height);
    this.ctx.fill(body);

    if (layout.type === 'ordinance') {
      this.ctx.globalAlpha = 0.4;
    }

    this.ctx.drawImage(isHovered, offsetX, offsetY, width, height);

    this.ctx.globalAlpha = 1;
  }

  layoutName(layout, centerX, centerY) {
    const {
      x, y, name, height,
    } = layout;
    const text = new Text({
      ctx: this.ctx,
      text: name,
      x: centerX + x,
      y: centerY + y + (height / 2),
      size: 14,
      align: 'align',
    });

    text.draw();
  }

  draw() {
    this.ctx.textAlign = 'center';
    this.ctx.font = '20px Times New Roman';
    this.ctx.fillStyle = 'Black';
    this.ctx.fillText(this.name, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 50);
    this.ctx.font = '16px Times New Roman';
    this.ctx.fillText(this.type, CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT - 25);
    this.ctx.textAlign = 'left';

    const centerX = CONSTANTS.GRID_SIZE * 12; // TODO: fix centering
    const centerY = CONSTANTS.GRID_SIZE * 7; // TODO: fix centering

    this.layout.forEach((layout) => {
      this.createLayout(layout, centerX - (this.width / 4), centerY);

      this.layoutName(layout, centerX - (this.width / 4), centerY);
    });
  }
}

export default Ship;
