import GameObject from '../engine/gameObject.js';
import Rectangle from '../engine/rectangle.js';
import GameConfig from './GameConfig.js';

class Obstacle extends GameObject {
  constructor() {
    super();
    this.topObstacle = new Rectangle(
      0,
      0,
      GameConfig.obstacleWidth,
      GameConfig.minObstacleHeight
    );
    this.topObstacle.setFillStyle('green');
    this.bottomObstacle = new Rectangle(
      0,
      0,
      GameConfig.obstacleWidth,
      GameConfig.minObstacleHeight
    );
    this.bottomObstacle.setFillStyle('green');
    this.addChild(this.topObstacle);
    this.addChild(this.bottomObstacle);
    this.randomTopAndBottomObstacle();
  }

  randomTopAndBottomObstacle() {
    const distanceBetweenTopAndBottomObstacle =
      GameConfig.minDistanceBetweenTopAndBottomObstacle +
      Math.floor(
        Math.random() *
          (GameConfig.maxDistanceBetweenTopAndBottomObstacle -
            GameConfig.minDistanceBetweenTopAndBottomObstacle)
      );
    const topHeight =
      GameConfig.minObstacleHeight +
      Math.floor(
        Math.random() *
          (GameConfig.height -
            2 * GameConfig.minObstacleHeight -
            distanceBetweenTopAndBottomObstacle)
      );
    const bottomHeight =
      GameConfig.height - topHeight - distanceBetweenTopAndBottomObstacle;
    this.topObstacle.setHeight(topHeight);
    this.bottomObstacle.setHeight(bottomHeight);
    this.bottomObstacle.setPositionY(
      topHeight + distanceBetweenTopAndBottomObstacle
    );
  }
}

export default Obstacle;
