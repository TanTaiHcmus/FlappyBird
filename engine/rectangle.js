import Component from './component.js';

class Rectangle extends Component {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width || 0;
    this.height = height || 0;
    this.fillStyle = '';
    this.strokeStyle = '';
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setFillStyle(color) {
    this.fillStyle = color;
  }

  setStrokeStyle(color) {
    this.strokeStyle = color;
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    if (this.fillStyle) {
      context.fillStyle = this.fillStyle;
      context.fill();
    }
    if (this.strokeStyle) {
      context.strokeStyle = this.strokeStyle;
      context.stroke();
    }
  }
}

export default Rectangle;
