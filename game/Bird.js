import Rectangle from '../engine/rectangle.js';
import GameConfig from './GameConfig.js';

class Bird extends Rectangle {
  constructor() {
    super(
      GameConfig.xBird,
      (GameConfig.height - GameConfig.birdHeight) / 2,
      GameConfig.birdWidth,
      GameConfig.birdHeight
    );
    this.setFillStyle('yellow');
    this.visible = false;
    this.vy = 0;
    this.angle = 0;
    this.status = 'fall';
  }

  reset() {
    this.y = (GameConfig.height - GameConfig.birdHeight) / 2;
    this.visible = false;
    this.vy = 0;
    this.angle = 0;
    this.status = 'fall';
  }

  eventHandler(event) {
    if (event.code === 'Space' && this.visible) {
      if (event.type === 'keydown') {
        this.status = 'flap';
      } else if (event.type === 'keyup') {
        this.status = 'fall';
        this.vy = 0;
      }
    }
  }

  update(deltaTime) {
    if (this.visible && this.status !== 'flap') {
      if (this.status === 'idle') {
        this.angle += deltaTime * 10;
        const curve = Math.sin(this.angle) * this.height;
        this.y = GameConfig.height - this.height - curve;
      } else {
        this.vy += deltaTime;
        this.y = this.y + this.vy * GameConfig.fallSpeed;
      }
      if (this.y > GameConfig.height - this.height) {
        this.status = 'idle';
        this.angle = 0;
        this.y = GameConfig.height - this.height;
      }
    } else {
      this.y = Math.max(0, this.y - GameConfig.flap * deltaTime);
    }
  }
}

export default new Bird();
