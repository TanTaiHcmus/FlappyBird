import GameObject from '../engine/gameObject.js';
import GameConfig from './GameConfig.js';
import Obstacle from './Obstacle.js';

class ObstacleManager extends GameObject {
  constructor() {
    super(0, 0);
    let nextObstacleX = 0;
    while (nextObstacleX <= GameConfig.width + GameConfig.obstacleWidth) {
      this.addChild(new Obstacle());
      nextObstacleX +=
        GameConfig.obstacleWidth + GameConfig.distanceBetweenTwoObstacle;
    }
    this.reset();
  }

  reset() {
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

  update(deltaTime) {
    this.children.forEach((child) => {
      child.setPositionX(child.getPositionX() - GameConfig.gameSpeed);
    });
  }
}

export default new ObstacleManager();
