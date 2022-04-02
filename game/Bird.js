import Rectangle from '../engine/rectangle.js';
import GameConfig from './GameConfig.js';

class Bird extends Rectangle {
  constructor() {
    super(
      GameConfig.xBird,
      (GameConfig.height - 50) / 2,
      GameConfig.birdWidth,
      GameConfig.birdHeight
    );
    this.setFillStyle('#f00');
    this.setVisible(false);
    this.canMove = true;
  }

  reset() {
    this.setPositionX((GameConfig.height - 50) / 2);
    this.setVisible(false);
    this.canMove = true;
  }

  eventHandler(event) {
    if (event.code === 'Space' && this.visible) {
      if (event.type === 'keydown') {
        if (this.y > 0) this.y -= 100;
        this.canMove = false;
      } else if (event.type === 'keyup') {
        this.canMove = true;
      }
    }
  }

  update(deltaTime) {
    if (this.visible && this.y < GameConfig.height) {
      this.y += 3;
    }
  }
}

export default new Bird();
