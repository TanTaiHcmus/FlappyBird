import Rectangle from '../engine/rectangle.js';

class FadeInEffect extends Rectangle {
  constructor(width, height, duration) {
    super(0, 0, width, height);
    this.setFillStyle('#000');
    this.timer = duration;
    this.duration = duration;
  }

  reset() {
    this.timer = this.duration;
    this.visible = true;
    this.opacity = 1;
  }

  update(deltaTime) {
    if (this.timer > 0 && this.visible) {
      this.timer -= deltaTime;
      if (this.timer < 0) {
        this.visible = false;
        return;
      }
      this.opacity = (1 / this.duration) * this.timer;
    }
  }
}

export default FadeInEffect;
