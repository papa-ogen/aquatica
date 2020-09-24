import * as CONSTANTS from '../utils/constants';

class Player {
  constructor({
    credits, capacity, position = {
      lon: "39°09'24.6''S",
      lat: "175°37'55.8''E",
      direction: 0,
      depth: 0,
    },
    bubble = 0,
    noiseLevel = 0,
    ballast = 0,
    shipState = CONSTANTS.SHIP_STATE.ANCHOR,
    shipLevel = CONSTANTS.SHIP_LEVEL.ABOVE_WATER,
    engineHeat = 0,
    crew,
    speed,
  }) {
    this.credits = credits;
    this.capacity = { ...capacity, waste: 0 };
    this.position = position;
    this.bubble = bubble;
    this.noiseLevel = noiseLevel;
    this.ballast = ballast;
    this.shipState = shipState;
    this.shipLevel = shipLevel;
    this.engineHeat = engineHeat;
    this.crew = crew;
    this.speed = { ...speed, currentSpeed: 0, targetSpeed: 0 };
  }
}

export default Player;
