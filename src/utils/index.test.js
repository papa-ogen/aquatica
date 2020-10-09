import test from 'tape';
import {
  getGridCenter, calculateWaterCurrentVelocity,
  isClosestDirectionLeft,
  convertSpriteAngle,
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
