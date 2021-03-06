import * as CONSTANTS from './constants';

function onMouseDown(e, aquatica) {
  e.preventDefault();
  e.stopPropagation();

  const scene = aquatica.currentScene;

  scene.uiElements.forEach((element) => {
    if (aquatica.uiCanvas.ctx.isPointInPath(element.body, e.offsetX, e.offsetY)) {
      element.callback();
    }
  });

  if (scene.ship) {
    scene.ship.layout.forEach((layout) => {
      if (aquatica.canvas.ctx.isPointInPath(layout.body, e.offsetX, e.offsetY)) {
        layout.callback();
      }
    });
  }

  return;

  // current mouse pos
  const mx = parseInt(e.clientX - aquatica.offsetX, 10);
  const my = parseInt(e.clientY - aquatica.offsetY, 10);

  // test each rect to see if mouse is inside
  aquatica.isDragging = false;

  for (let i = 0; i < aquatica.currentScene.rooms.length; i += 1) {
    const room = aquatica.currentScene.rooms[i];
    if (!room.isDraggable) break;
    if (mx > room.x && mx < room.x + room.width && my > room.y && my < room.y + room.height) {
      // if yes, set that rects isDragging=true
      aquatica.isDragging = true;
      room.isDragging = true;
    }
  }
  // save the current mouse position
  aquatica.startX = mx;
  aquatica.startY = my;
}

function onMouseUp(e, aquatica) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  return;

  // clear all the dragging flags
  aquatica.isDragging = false;

  for (let i = 0; i < aquatica.currentScene.rooms.length; i += 1) {
    const room = aquatica.currentScene.rooms[i];
    room.isDragging = false;
    room.opacity = 1;
  }
}

// handle mouse moves
function onMouseMove(e, game) {
  e.preventDefault();
  e.stopPropagation();

  const scene = game.currentScene;

  scene.uiElements.forEach((element) => {
    if (game.uiCanvas.ctx.isPointInPath(element.body, e.offsetX, e.offsetY)) {
      element.isHovered = true;
    } else {
      element.isHovered = false;
    }
  });

  if (scene.ship) {
    scene.ship.layout.forEach((layout) => {
      if (game.canvas.ctx.isPointInPath(layout.body, e.offsetX, e.offsetY)) {
        layout.isHovered = true;
      } else {
        layout.isHovered = false;
      }
    });
  }

  // if we're dragging anything...
  return;

  if (game.isDragging) {
    // tell the browser we're handling this mouse event

    // get the current mouse position
    const mx = parseInt(e.clientX - game.offsetX, 10);
    const my = parseInt(e.clientY - game.offsetY, 10);

    // calculate the distance the mouse has moved
    // since the last mousemove
    const dx = mx - game.startX;
    const dy = my - game.startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (let i = 0; i < game.currentScene.rooms.length; i += 1) {
      const room = game.currentScene.rooms[i];

      if (room.isDragging) {
        room.opacity = 0.5;
        const x = Math.round(mx / CONSTANTS.GRID_SIZE) * CONSTANTS.GRID_SIZE;
        const y = Math.round(my / CONSTANTS.GRID_SIZE) * CONSTANTS.GRID_SIZE;
        room.x = x;
        room.y = y;
      }
    }

    // reset the starting mouse position for the next mousemove
    game.startX = mx;
    game.startY = my;
  }
}

module.exports = {
  onMouseMove,
  onMouseUp,
  onMouseDown,
};
