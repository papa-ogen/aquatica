class Canvas {
  constructor({ id, width, height }) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.BB = this.canvas.getBoundingClientRect();
    this.offsetX = this.BB.left;
    this.offsetY = this.BB.top;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
}

export default Canvas;
