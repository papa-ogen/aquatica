class MouseEvent {
  constructor(game) {
    this.game = game;
    this.ctx = game.ctx;
    this.isDragging = false;

    this.game.canvas.onmousemove = this.onMouseMove;
  }

  onMouseMove(e) {
    console.log('moving mouse');
  }
}

// const MouseEvent = (function () {
//   let instance;

//   function createInstance() {
//     const object = new Object('I am the instance');
//     return object;
//   }

//   return {
//     getInstance() {
//       if (!instance) {
//         instance = createInstance();
//       }
//       return instance;
//     },
//   };
// }());

module.exports = MouseEvent;
