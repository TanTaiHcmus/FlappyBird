import Circle from '../engine/circle.js';
import GameConfig from './GameConfig.js';

class Bullet extends Circle {
  constructor(y) {
    super(GameConfig.xMonster, y, GameConfig.bulletRadius);
    this.setFillStyle('#b302c7');
  }

  reset(y) {
    this.setPosition(GameConfig.xMonster, y);
    this.visible = true;
  }

  update(deltaTime) {
    this.x = this.x - deltaTime * GameConfig.bulletSpeed;
    if (this.x <= 0) {
      this.parent.removeBullet(this);
    }
  }
}

export default Bullet;
