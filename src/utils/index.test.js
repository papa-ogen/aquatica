import test from 'tape';
import {
  getGridCenter,
  calculateWaterCurrentVelocity,
  isClosestDirectionLeft,
  convertSpriteAngle,
  normalizeGauge,
  getGaugeInterval,
  normalizeVectors,
  isOnLine,
  distance,
} from './index';

test('Get center of grid', (t) => {
  t.plan(1);
  const tiles = 25;
  const tileSize = 32;

  t.deepEqual(getGridCenter(tiles, tileSize), [416, 13]);

  t.end();
});

// test('Return velocity based on water current', (t) => {
//   t.plan(1);
//   const waterCurrentAngle = 180;
//   const waterCurrentVelocity = 2;
//   const playerAngle = 0;

//   t.equal(calculateWaterCurrentVelocity(waterCurrentAngle,
//     waterCurrentVelocity, playerAngle), 2);

//   t.end();
// });

test('Return true if closest direction is left', (t) => {
  t.plan(2);
  const givenTargetCourse = 350;
  const givenCurrentCourse = 45;

  t.equal(isClosestDirectionLeft(givenTargetCourse,
    givenCurrentCourse), true);
  t.equal(isClosestDirectionLeft(300,
    359), true);

  t.end();
});

test('Return false if closest direction is right', (t) => {
  t.plan(1);
  const givenTargetCourse = 80;
  const givenCurrentCourse = 45;

  t.equal(isClosestDirectionLeft(givenTargetCourse,
    givenCurrentCourse), false);

  t.end();
});

test('Return false if closest direction is right', (t) => {
  t.plan(6);

  t.equal(convertSpriteAngle(0), 90);
  t.equal(convertSpriteAngle(90), 180);
  t.equal(convertSpriteAngle(-90), 0);
  t.equal(convertSpriteAngle(-180), 270);
  t.equal(convertSpriteAngle(110), 200);
  t.equal(convertSpriteAngle(-92), 358);

  t.end();
});

test('Return a mapping object for gauge', (t) => {
  t.plan(1);

  const givenPanelDegrees = 320;
  const givenMinValue = 0;
  const givenMaxValue = 6000;

  const expectedGaugeObject = [
    {
      angle: 0,
      value: 0,
    },
    {
      angle: 160,
      value: 3000,
    },
    {
      angle: 320,
      value: 6000,
    },
  ];

  t.deepEqual(normalizeGauge(givenPanelDegrees, undefined,
    givenMinValue, givenMaxValue), expectedGaugeObject);

  t.end();
});

test('Return a mapping object for gauge with 12 interval', (t) => {
  t.plan(1);

  const givenPanelDegrees = 320;
  const givenPanelInterval = 12;
  const givenMinValue = 0;
  const givenMaxValue = 600;

  const expectedGaugeObject = [
    { angle: 0, value: 0 },
    { angle: 26.666666666666668, value: 50 },
    { angle: 53.333333333333336, value: 100 },
    { angle: 80, value: 150 },
    { angle: 106.66666666666667, value: 200 },
    { angle: 133.33333333333334, value: 250 },
    { angle: 160, value: 300 },
    { angle: 186.66666666666669, value: 350 },
    { angle: 213.33333333333334, value: 400 },
    { angle: 240, value: 450 },
    { angle: 266.6666666666667, value: 500 },
    { angle: 293.33333333333337, value: 550 },
    { angle: 320, value: 600 }];

  t.deepEqual(normalizeGauge(givenPanelDegrees,
    givenPanelInterval, givenMinValue, givenMaxValue), expectedGaugeObject);

  t.end();
});

test('Return a mapping object for gauge with offset', (t) => {
  t.plan(1);

  const givenPanelDegrees = 280;
  const givenMinValue = 0;
  const givenMaxValue = 100;
  const givenOffset = 220;

  const expectedGaugeObject = [
    {
      angle: 220,
      value: 0,
    },
    {
      angle: 0,
      value: 50,
    },
    {
      angle: 140,
      value: 100,
    },
  ];

  t.deepEqual(normalizeGauge(givenPanelDegrees,
    undefined, givenMinValue, givenMaxValue, givenOffset), expectedGaugeObject);

  t.end();
});

test('Should return degree interval', (t) => {
  t.plan(2);

  t.equal(getGaugeInterval(0, 100, 100), 1);
  t.equal(getGaugeInterval(0, 6000, 300), 0.05);
});

test('Should return new vector based on target', (t) => {
  t.plan(1);

  const givenVector = {
    x: 100,
    y: 75,
  };

  const givenOrigin = {
    width: 1000,
    height: 1000,
  };

  const givenTarget = {
    width: 100,
    height: 100,
  };

  const expectedVector = {
    x: 10,
    y: 7.5,
  };

  t.deepEqual(normalizeVectors({
    vector: givenVector,
    origin: givenOrigin,
    target: givenTarget,
  }), expectedVector);
});

test('Calculate distance between two points', (t) => {
  t.plan(1);
  const x1 = 100;
  const y1 = 0;
  const x2 = 200;
  const y2 = 0;
  const a = x1 - x2;
  const b = y1 - y2;

  t.equal(distance(a, b), 100);
});

test('Is dot between two points', (t) => {
  t.plan(1);
  const x1 = 100;
  const y1 = 0;
  const x2 = 200;
  const y2 = 0;
  const x3 = 150;
  const y3 = 0;

  const distanceAb = distance(x1 - x2, y1 - y2);
  const distanceBc = distance(x2 - x3, y2 - y3);
  const distanceAc = distance(x1 - x3, y1 - y3);

  t.equal(isOnLine(distanceAb, distanceBc, distanceAc), true);
});
