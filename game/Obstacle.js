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
    const topHeight =
      GameConfig.minObstacleHeight +
      Math.floor(
        Math.random() *
          (GameConfig.height -
            2 * GameConfig.minObstacleHeight -
            GameConfig.minDistanceBetweenTopAndBottomObstacle)
      );
    const bottomHeight =
      GameConfig.minObstacleHeight +
      Math.floor(
        Math.random() *
          (GameConfig.height -
            GameConfig.minObstacleHeight -
            topHeight -
            GameConfig.minDistanceBetweenTopAndBottomObstacle)
      );
    this.topObstacle.setHeight(topHeight);
    this.bottomObstacle.setHeight(bottomHeight);
    this.bottomObstacle.setPositionY(GameConfig.height - bottomHeight);
  }
}

export default Obstacle;
