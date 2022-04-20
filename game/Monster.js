import Rectangle from '../engine/rectangle.js';
import Bird from './Bird.js';
import BulletManager from './BulletManager.js';
import CountdownTimer from './CountdownTimer.js';
import GameConfig from './GameConfig.js';

class Monster extends Rectangle {
  constructor() {
    super(
      GameConfig.xMonster,
      GameConfig.height / 2,
      GameConfig.monsterWidth,
      GameConfig.monsterHeight
    );
    this.setFillStyle('#b302c7');
    this.direction = Math.random() < 0.5 ? 'up' : 'down';
    this.randomDirectionCountDown = new CountdownTimer(
      GameConfig.timeToRandomDirectionMonster,
      (time) => {
        if (time <= 0) {
          this.direction = Math.random() < 0.5 ? 'up' : 'down';
          this.randomDirectionCountDown.reset();
        }
      }
    );
    this.visible = false;
    this.shootCountdown = new CountdownTimer(0, (time) => {
      if (time <= 0) {
        this.shoot();
        this.shootCountdown.reset();
      }
    });
    this.level = 0;
  }

  reset() {
    this.visible = false;
    this.level = 0;
    this.randomDirectionCountDown.reset();
  }

  shoot() {
    BulletManager.createBullet(this.y + this.height / 2, this.level);
  }

  nextLevel() {
    this.level++;
    this.shootCountdown.setDuration(
      1 / (GameConfig.monsterShootSpeed * this.level)
    );
  }

  getLevel() {
    return this.level;
  }

  update(deltaTime) {
    if (this.visible) {
      this.shootCountdown.update(deltaTime);
      this.randomDirectionCountDown.update(deltaTime);
      this.y =
        this.direction === 'up'
          ? this.y - GameConfig.monsterMove * deltaTime
          : this.y + GameConfig.monsterMove * deltaTime;
      if (this.y <= 0) {
        this.y = 0;
      }
      if (this.y > GameConfig.height - GameConfig.monsterHeight) {
        this.y = GameConfig.height - GameConfig.monsterHeight;
      }
    }
  }
}

export default new Monster();
