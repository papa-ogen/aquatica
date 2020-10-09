export const getGridCenter = (tiles, tileSize) => {
  const pixels = Math.round(tiles / 2) * tileSize;
  const tile = pixels / tileSize;

  return [pixels, tile];
};

export const calculateWaterCurrentVelocity = (wcAngle,
  wcVelocity, playerAngle) => (wcAngle - playerAngle) * wcVelocity;

export const isClosestDirectionLeft = (targetCourse, currentCourse) => {
  let leftDegrees;
  let rightDegrees;

  if (targetCourse < currentCourse) {
    leftDegrees = currentCourse - targetCourse;
    rightDegrees = (360 - currentCourse) + targetCourse;
  } else {
    leftDegrees = (360 - targetCourse) + currentCourse;
    rightDegrees = targetCourse - currentCourse;
  }
  return leftDegrees < rightDegrees;
};

export const convertSpriteAngle = (angle) => {
  const offset = 90;
  if (angle >= 0) return angle + offset;
  if (angle < -90) return angle + 360 + offset;
  if (angle < 0) return angle + offset;
  return angle;
};
