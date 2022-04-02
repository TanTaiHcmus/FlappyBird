import Component from './component.js';

class Text extends Component {
  constructor(x, y, text, font, align) {
    super(x, y);
    this.text = text;
    this.font = font;
    this.align = align || 'left';
  }

  setText(text) {
    this.text = text;
  }

  setFont(font) {
    this.font = font;
  }

  setAlign(align) {
    this.align = align;
  }

  setFillStyle(color) {
    this.fillStyle = color;
  }

  setStrokeStyle(color) {
    this.strokeStyle = color;
  }

  draw(context) {
    super.draw(context);
    context.font = this.font;
    context.textAlign = this.align;

    if (this.fillStyle) {
      context.fillStyle = this.fillStyle;
      context.fillText(this.text, this.x, this.y);
    }
    if (this.strokeStyle) {
      context.strokeStyle = this.strokeStyle;
      context.strokeText(this.text, this.x, this.y);
    }
  }
}

export default Text;
