import test from 'tape';
import {
  getGridCenter,
  calculateWaterCurrentVelocity,
  isClosestDirectionLeft,
  convertSpriteAngle,
  normalizeGauge,
  getGaugeInterval,
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
      degree: 0,
      value: 0,
    },
    {
      degree: 160,
      value: 3000,
    },
    {
      degree: 320,
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
    { degree: 0, value: 0 },
    { degree: 26.666666666666668, value: 50 },
    { degree: 53.333333333333336, value: 100 },
    { degree: 80, value: 150 },
    { degree: 106.66666666666667, value: 200 },
    { degree: 133.33333333333334, value: 250 },
    { degree: 160, value: 300 },
    { degree: 186.66666666666669, value: 350 },
    { degree: 213.33333333333334, value: 400 },
    { degree: 240, value: 450 },
    { degree: 266.6666666666667, value: 500 },
    { degree: 293.33333333333337, value: 550 },
    { degree: 320, value: 600 }];

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
      degree: 220,
      value: 0,
    },
    {
      degree: 0,
      value: 50,
    },
    {
      degree: 140,
      value: 100,
    },
  ];

  t.deepEqual(normalizeGauge(givenPanelDegrees,
    undefined, givenMinValue, givenMaxValue, givenOffset), expectedGaugeObject);

  t.end();
});

test('Shpuld return degree interval', (t) => {
  t.plan(1);

  t.equal(getGaugeInterval(0, 100, 100), 1);
});
