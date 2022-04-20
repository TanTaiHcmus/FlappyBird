import Circle from '../engine/circle.js';
import GameConfig from './GameConfig.js';

class Bullet extends Circle {
  constructor(y, damage) {
    super(GameConfig.xMonster, y, GameConfig.bulletRadius);
    this.setFillStyle('#b302c7');
    this.yStart = y;
    this.yEnd = Math.floor(Math.random() * GameConfig.height);
    this.damage = damage;
    this.calcDeltaXAndDeltaY();
  }

  reset(y, damage) {
    this.setPosition(GameConfig.xMonster, y);
    this.visible = true;
    this.yStart = y;
    this.yEnd = Math.floor(Math.random() * GameConfig.height);
    this.damage = damage;
    this.calcDeltaXAndDeltaY();
  }

  calcDeltaXAndDeltaY() {
    const timeToEnd =
      Math.sqrt(
        GameConfig.xMonster * GameConfig.xMonster +
          (this.yStart - this.yEnd) * (this.yStart - this.yEnd)
      ) / GameConfig.bulletSpeed;

    this.deltaX = GameConfig.xMonster / timeToEnd;
    this.deltaY = (this.yStart - this.yEnd) / timeToEnd;
  }

  getDamage() {
    return this.damage;
  }

  update(deltaTime) {
    this.x = this.x - this.deltaX * deltaTime;
    this.y = this.y - this.deltaY * deltaTime;

    if (this.x <= 0) {
      this.parent.removeBullet(this);
    }
  }
}

export default Bullet;
