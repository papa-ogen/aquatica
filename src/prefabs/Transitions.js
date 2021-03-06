/* eslint-disable */

class Transitions {
  static random(min = 0, max = 255) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  toDegrees(angle) {
    return angle * (180 / Math.PI);
  }
  
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  
  static easingFunctions() {
    return {
      // no easing, no acceleration
      linear(t) { return t; },
      // accelerating from zero velocity
      easeInQuad(t) { return t * t; },
      // decelerating to zero velocity
      easeOutQuad(t) { return t * (2 - t); },
      // acceleration until halfway, then deceleration
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t)
        * t;
      },
      // accelerating from zero velocity
      easeInCubic(t) { return t * t * t; },
      // decelerating to zero velocity
      easeOutCubic(t) { return (--t) * t * t + 1; },
      // acceleration until halfway, then deceleration
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1)
        * (2 * t - 2) * (2 * t - 2) + 1;
      },
      // accelerating from zero velocity
      easeInQuart(t) { return t * t * t * t; },
      // decelerating to zero velocity
      easeOutQuart(t) { return 1 - (--t) * t * t * t; },
      // acceleration until halfway, then deceleration
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8
        * (--t) * t * t * t;
      },
      // accelerating from zero velocity
      easeInQuint(t) { return t * t * t * t * t; },
      // decelerating to zero velocity
      easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
      // acceleration until halfway, then deceleration
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t
          : 1 + 16 * (--t) * t * t * t * t;
      },
    };
  }

  static elasticEasingFunctions() {
    return {
      // elastic bounce effect at the beginning
      easeInElastic(t) { return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1; },
      // elastic bounce effect at the end
      easeOutElastic(t) { return 0.04 * t / (--t) * Math.sin(25 * t); },
      // elastic bounce effect at the beginning and end
      easeInOutElastic(t) {
        return (t -= 0.5) < 0 ? (0.02 + 0.01 / t)
        * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
      },
    };
  }
}

export default Transitions;
