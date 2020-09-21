import test from 'tape';
import { getGridCenter } from './index';

test('Get center of grid', (t) => {
  t.plan(1);
  const tiles = 25;
  const tileSize = 32;

  t.ok(getGridCenter(tiles, tileSize), [416, 13]);

  t.end();
});
