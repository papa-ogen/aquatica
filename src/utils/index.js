export const getGridCenter = (tiles, tileSize) => {
  const pixels = Math.round(tiles / 2) * tileSize;
  const tile = pixels / tileSize;

  return [pixels, tile];
};

export const calculateWaterCurrentVelocity = (wcAngle,
  wcVelocity, playerAngle) => (wcAngle - playerAngle) * wcVelocity;
