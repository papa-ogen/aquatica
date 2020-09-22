import * as CONSTANTS from '../utils/constants';

class Player {
  constructor({
    credits, oxygen, food, coffee, water, waste, fuel, position = {
      lon: 0,
      lat: 0,
    },
    depth,
    bubble,
    noiseLevel,
    ballast,
    shipState = CONSTANTS.SHIP_STATE.ANCHOR,
    shipLevel = CONSTANTS.SHIP_LEVEL.ABOVE_WATER,
  }) {
    this.credits = credits;
    this.oxygen = oxygen;
    this.food = food;
    this.coffee = coffee;
    this.water = water;
    this.waste = waste;
    this.fuel = fuel;
    this.position = position;
    this.depth = depth;
    this.bubble = bubble;
    this.noiseLevel = noiseLevel;
    this.ballast = ballast;
    this.shipState = shipState;
    this.shipLevel = shipLevel;
  }
}

export default Player;
