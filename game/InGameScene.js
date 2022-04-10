import Scene from '../engine/scene.js';
import Bird from './Bird.js';
import CollisionManager from './CollisionManager.js';
import CountdownTimer from './CountdownTimer.js';
import FadeInEffect from './FadeInEffect.js';
import GameConfig from './GameConfig.js';
import GameOverText from './GameOverText.js';
import ObstacleManager from './ObstacleManager.js';
import ScoreText from './ScoreText.js';
import TimeToStartText, { TIME_TO_START_DURATION } from './TimeToStartText.js';
import WarningText from './WarningText.js';

class InGameScene extends Scene {
  constructor() {
    super('#c7e7ff');
    this.isEndGame = false;
    this.isStart = false;
    this.addChild(Bird);
    this.addChild(ObstacleManager);
    this.addChild(TimeToStartText);
    this.addChild(GameOverText);
    this.addChild(ScoreText);
    this.addChild(WarningText);
    this.remainingTimeToStartCountdown = new CountdownTimer(
      TIME_TO_START_DURATION,
      (time) => {
        TimeToStartText.setText(Math.ceil(time));
        if (time <= 0) {
          TimeToStartText.setVisible(false);
          Bird.setVisible(true);
          ScoreText.setVisible(true);
          ObstacleManager.setVisible(true);
          this.isStart = true;
        }
      }
    );
    this.gameOverCountdown = new CountdownTimer(1.5, (time) => {
      if (time <= 0) {
        this.game.handleBackScene();
      }
    });
    this.randomSpeedCountdown = new CountdownTimer(10, (time) => {
      if (time <= 0) {
        this.randomSpeedCountdown.reset();
        ObstacleManager.setSpeed(1 + Math.floor(Math.random() * 5));
      } else if (time <= 0.5) {
        WarningText.setVisible(false);
      } else if (time <= 2) {
        WarningText.setVisible(true);
      }
    });
    this.fadeInEffect = new FadeInEffect(
      GameConfig.width,
      GameConfig.height,
      0.5
    );
    this.addChild(this.fadeInEffect);
    this.checkCollisionObstacleIndex = 0;
  }

  reset() {
    TimeToStartText.reset();
    Bird.reset();
    ScoreText.reset();
    ObstacleManager.reset();
    GameOverText.reset();
    WarningText.reset();
    this.remainingTimeToStartCountdown.reset();
    this.gameOverCountdown.reset();
    this.fadeInEffect.reset();
    this.randomSpeedCountdown.reset();
    this.isEndGame = false;
    this.checkCollisionObstacleIndex = 0;
    this.isStart = false;
  }

  eventHandler(event) {
    if (!this.isEndGame && this.isStart) Bird.eventHandler(event);
  }

  update(deltaTime) {
    if (!this.isEndGame) {
      this.fadeInEffect.update(deltaTime);
      this.remainingTimeToStartCountdown.update(deltaTime);

      if (this.isStart) {
        this.randomSpeedCountdown.update(deltaTime);
        Bird.update(deltaTime);
        ObstacleManager.update(deltaTime);
        if (this.isDead()) {
          this.isEndGame = true;
          GameOverText.setVisible(true);
        }
      }
    } else {
      this.gameOverCountdown.update(deltaTime);
    }
  }

  isDead() {
    return this.checkCollisionWithBird();
  }

  checkCollisionWithBird() {
    const obstacle = ObstacleManager.children[this.checkCollisionObstacleIndex];

    if (Bird.x > obstacle.x + GameConfig.obstacleWidth) {
      ScoreText.increaseScore();
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
