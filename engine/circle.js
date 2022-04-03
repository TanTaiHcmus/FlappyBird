import Component from './component.js';

class Circle extends Component {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius || 0;
    this.fillStyle = '';
    this.strokeStyle = '';
  }

  setRadius(radius) {
    this.radius = radius;
  }

  getRadius() {
    return this.radius;
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
    context.arc(
      this.globalPositionX,
      this.globalPositionY,
      this.radius,
      0,
      2 * Math.PI
    );
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

export default Circle;
