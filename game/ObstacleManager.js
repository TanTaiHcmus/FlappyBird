import GameObject from '../engine/gameObject.js';
import GameConfig from './GameConfig.js';
import Obstacle from './Obstacle.js';

class ObstacleManager extends GameObject {
  constructor() {
    super();
    let nextObstacleX = 0;
    while (nextObstacleX <= GameConfig.width + GameConfig.obstacleWidth) {
      this.addChild(new Obstacle());
      nextObstacleX +=
        GameConfig.obstacleWidth + GameConfig.distanceBetweenTwoObstacle;
    }

    this.reset();
  }

  reset() {
    this.speed = 1;
    this.setVisible(false);
    this.children.forEach((child, index) => {
      child.randomTopAndBottomObstacle();
      child.setPositionX(
        GameConfig.width +
          index *
            (GameConfig.obstacleWidth + GameConfig.distanceBetweenTwoObstacle)
      );
    });
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  update(deltaTime) {
    if (!this.getVisible()) return;
    this.children.forEach((child) => {
      const newPositionX =
        child.getPositionX() -
        GameConfig.obstacleSpeed * this.speed * deltaTime;
      child.setPositionX(newPositionX);
      if (newPositionX + GameConfig.obstacleWidth <= 0) {
        child.setPositionX(
          newPositionX +
            this.children.length *
              (GameConfig.obstacleWidth + GameConfig.distanceBetweenTwoObstacle)
        );
      }
    });
  }
}

export default new ObstacleManager();
