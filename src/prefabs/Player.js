import * as CONSTANTS from '../utils/constants';

class Player {
  constructor({
    credits, oxygen, food, coffee, water, waste, fuel, position = {
      lon: "39°09'24.6''S",
      lat: "175°37'55.8''E",
      direction: 0,
      depth: 0,
    },
    bubble,
    noiseLevel,
    ballast,
    shipState = CONSTANTS.SHIP_STATE.ANCHOR,
    shipLevel = CONSTANTS.SHIP_LEVEL.ABOVE_WATER,
    engineHeat = 0,
    crew,
    speed = 0,
  }) {
    this.credits = credits;
    this.oxygen = oxygen;
    this.food = food;
    this.coffee = coffee;
    this.water = water;
    this.waste = waste;
    this.fuel = fuel;
    this.position = position;
    this.bubble = bubble;
    this.noiseLevel = noiseLevel;
    this.ballast = ballast;
    this.shipState = shipState;
    this.shipLevel = shipLevel;
    this.engineHeat = engineHeat;
    this.crew = crew;
    this.speed = speed;
  }
}

export default Player;
