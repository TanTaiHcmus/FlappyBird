import Rectangle from '../engine/rectangle.js';
import Bird from './Bird.js';
import BulletManager from './BulletManager.js';
import CountdownTimer from './CountdownTimer.js';
import GameConfig from './GameConfig.js';

class Monster extends Rectangle {
  constructor() {
    super(
      GameConfig.xMonster,
      0,
      GameConfig.monsterWidth,
      GameConfig.monsterHeight
    );
    this.setFillStyle('#b302c7');
    this.visible = false;
    this.shootCountdown = new CountdownTimer(
      1 / GameConfig.monsterShootSpeed,
      (time) => {
        if (time <= 0) {
          this.shoot();
          this.shootCountdown.reset();
        }
      }
    );
    this.setSpeed(1);
  }

  reset() {
    this.visible = false;
    this.shootCountdown.reset();
    this.setSpeed(1);
  }

  shoot() {
    BulletManager.createBullet(this.y + this.height / 2);
  }

  setSpeed(speed) {
    if (this.speed !== speed) {
      this.speed = speed;
      this.shootCountdown.setDuration(
        1 / (GameConfig.monsterShootSpeed * speed)
      );
    }
  }

  update(deltaTime) {
    if (this.visible) {
      this.shootCountdown.update(deltaTime);
      this.y = Bird.getPositionY();
    }
  }
}

export default new Monster();
