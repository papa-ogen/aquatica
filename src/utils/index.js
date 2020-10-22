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

export const normalizeGauge = (panelDegrees, panelRange = 2, min, max, offset = 0) => {
  const arr = [{
    angle: 0 + offset,
    value: 0,
  }];

  const panelIntervals = panelDegrees / panelRange;
  const valueRange = (max - min) / panelRange;

  for (let i = 0; i < panelRange; i += 1) {
    let angle = panelIntervals * (i + 1) + offset;

    if (angle >= 360) {
      angle -= 360;
    }

    arr.push({
      angle,
      value: valueRange * (i + 1), // normalize
    });
  }

  return arr;
};

// TODO: get interval value
export const getGaugeInterval = (min, max, panelDegrees) => panelDegrees / (max - min);

export const normalizeVectors = ({ vector, origin, target }) => {
  const { x, y } = vector;
  const { width, height } = origin;
  const { width: targetWidth, height: targetHeight } = target;
  const variationX = targetWidth / width;
  const variationY = targetHeight / height;
  return { x: x * variationX, y: y * variationY };
};

export const distance = (a, b) => Math.hypot((b.x - a.x), (b.y - a.y));

export const isOnLine = (a, b, c) => {
  const ab = distance(a, b);
  const bc = distance(b, c);
  const ac = distance(a, c);
  return bc + ac === ab;
};

export const getVectorFromAngle = ({
  x = 0, y = 0, angle = 0, length = 0,
}) => {
  const targetX = x + (length * Math.cos(angle));
  const targetY = y + (length * Math.sin(angle));

  return [targetX, targetY];
};
