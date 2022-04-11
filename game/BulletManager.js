import GameObject from '../engine/gameObject.js';
import Bullet from './Bullet.js';

class BulletManager extends GameObject {
  constructor() {
    super();
    this.invisibleBullet = [];
    this.visibleBullet = [];
  }

  reset() {
    this.visibleBullet.forEach((bullet) => {
      bullet.setVisible(false);
      this.invisibleBullet.push(bullet);
    });
    this.visibleBullet = [];
  }

  createBullet(y) {
    if (this.invisibleBullet.length > 0) {
      const bullet = this.invisibleBullet.pop();
      this.visibleBullet.push(bullet);
      bullet.reset(y);
    } else {
      const bullet = new Bullet(y);
      this.visibleBullet.push(bullet);
      this.addChild(bullet);
    }
  }

  getVisibleBullet() {
    return this.visibleBullet;
  }

  update(deltaTime) {
    this.visibleBullet.forEach((bullet) => {
      bullet.update(deltaTime);
    });
  }

  removeBullet(bullet) {
    bullet.setVisible(false);
    this.invisibleBullet.push(bullet);
    this.visibleBullet = this.visibleBullet.filter(
      (bullet1) => bullet !== bullet1
    );
  }
}

export default new BulletManager();
