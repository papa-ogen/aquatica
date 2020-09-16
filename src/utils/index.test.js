import test from 'tape';
import { getGridCenter } from './index';

test('Get center of grid', (t) => {
  t.plan(1);
  const tiles = 27;
  const tileSize = 16;

  t.equal(getGridCenter(tiles, tileSize), 224);

  t.end();
});
