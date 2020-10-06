import test from 'tape';
import { getGridCenter, calculateWaterCurrentVelocity } from './index';

test('Get center of grid', (t) => {
  t.plan(1);
  const tiles = 25;
  const tileSize = 32;

  t.deepEqual(getGridCenter(tiles, tileSize), [416, 13]);

  t.end();
});

test('Return velocity based on water current', (t) => {
  t.plan(1);
  const waterCurrentAngle = 180;
  const waterCurrentVelocity = 2;
  const playerAngle = 0;

  t.equal(calculateWaterCurrentVelocity(waterCurrentAngle,
    waterCurrentVelocity, playerAngle), 2);

  t.end();
});
