import Scene from '../engine/scene.js';
import Bird from './Bird.js';
import CollisionManager from './CollisionManager.js';
import CountdownTimer from './CountdownTimer.js';
import FadeInEffect from './FadeInEffect.js';
import GameConfig from './GameConfig.js';
import GameOverText from './GameOverText.js';
import ObstacleManager from './ObstacleManager.js';
import TimeToStartText, { TIME_TO_START_DURATION } from './TimeToStartText.js';

class InGameScene extends Scene {
  constructor() {
    super('#c7e7ff');
    this.isEndGame = false;
    this.addChild(Bird);
    this.addChild(ObstacleManager);
    this.addChild(TimeToStartText);
    this.addChild(GameOverText);
    this.remainingTimeToStartCountdown = new CountdownTimer(
      TIME_TO_START_DURATION,
      (time) => {
        TimeToStartText.setText(Math.ceil(time));
        if (time <= 0) {
          TimeToStartText.setVisible(false);
          Bird.setVisible(true);
          ObstacleManager.setVisible(true);
        }
      }
    );
    this.gameOverCountdown = new CountdownTimer(1.5, (time) => {
      if (time <= 0) {
        this.game.handleBackScene();
      }
    });
    this.fadeInEffect = new FadeInEffect(
      GameConfig.width,
      GameConfig.height,
      0.5
    );
    this.addChild(this.fadeInEffect);
    this.checkCollisionObstacleIndex = 0;
    this.score = 0;
  }

  reset() {
    TimeToStartText.reset();
    Bird.reset();
    ObstacleManager.reset();
    GameOverText.reset();
    this.remainingTimeToStartCountdown.reset();
    this.gameOverCountdown.reset();
    this.fadeInEffect.reset();
    this.isEndGame = false;
    this.checkCollisionObstacleIndex = 0;
    this.score = 0;
  }

  eventHandler(event) {
    if (!this.isEndGame) Bird.eventHandler(event);
  }

  update(deltaTime) {
    if (!this.isEndGame) {
      this.fadeInEffect.update(deltaTime);
      this.remainingTimeToStartCountdown.update(deltaTime);
      Bird.update(deltaTime);
      ObstacleManager.update(deltaTime);

      if (this.isDead()) {
        this.isEndGame = true;
        GameOverText.setVisible(true);
      }
    } else {
      this.gameOverCountdown.update(deltaTime);
    }
  }

  isDead() {
    return (
      Bird.getPositionY() + Bird.height >= GameConfig.height ||
      this.checkCollisionWithBird()
    );
  }

  checkCollisionWithBird() {
    const obstacle = ObstacleManager.children[this.checkCollisionObstacleIndex];

    if (Bird.x > obstacle.x + GameConfig.obstacleWidth) {
      this.score++;
      this.checkCollisionObstacleIndex =
        (this.checkCollisionObstacleIndex + 1) %
        ObstacleManager.children.length;
      return false;
    } else if (Bird.x + GameConfig.birdWidth < obstacle.x) {
      return false;
    } else
      return (
        CollisionManager.checkCollisionRectRect(Bird, obstacle.topObstacle) ||
        CollisionManager.checkCollisionRectRect(Bird, obstacle.bottomObstacle)
      );
  }
}

export default new InGameScene();
