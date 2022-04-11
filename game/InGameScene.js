import Scene from '../engine/scene.js';
import Bird from './Bird.js';
import BulletManager from './BulletManager.js';
import CollisionManager from './CollisionManager.js';
import CountdownTimer from './CountdownTimer.js';
import FadeInEffect from './FadeInEffect.js';
import GameConfig from './GameConfig.js';
import GameOverText from './GameOverText.js';
import Monster from './Monster.js';
import ObstacleManager from './ObstacleManager.js';
import ScoreText from './ScoreText.js';
import TimeToStartText, { TIME_TO_START_DURATION } from './TimeToStartText.js';
import WarningText from './WarningText.js';

class InGameScene extends Scene {
  constructor() {
    super('#c7e7ff');
    this.status = 'prepare';
    this.tick = 0;
    this.checkCollisionObstacleIndex = 0;
    this.addChild(Bird);
    this.addChild(ObstacleManager);
    this.addChild(TimeToStartText);
    this.addChild(GameOverText);
    this.addChild(ScoreText);
    this.addChild(WarningText);
    this.addChild(BulletManager);
    this.addChild(Monster);
    this.remainingTimeToStartCountdown = new CountdownTimer(
      TIME_TO_START_DURATION,
      (time) => {
        TimeToStartText.setText(Math.ceil(time));
        if (time <= 0) {
          TimeToStartText.setVisible(false);
          Bird.setVisible(true);
          ScoreText.setVisible(true);
          ObstacleManager.setVisible(true);
          this.status = 'start';
        }
      }
    );
    this.gameOverCountdown = new CountdownTimer(1.5, (time) => {
      if (time <= 0) {
        this.game.handleBackScene();
      }
    });
    this.appearMonsterCountdown = new CountdownTimer(10, (time) => {
      if (time <= 0) {
        Monster.setVisible(false);
        this.tick = 0;
        this.randomSpeedCountdown.reset();
        ObstacleManager.reset();
        this.checkCollisionObstacleIndex = 0;
        ObstacleManager.setVisible(true);
      } else if (time <= 2) {
        Monster.setSpeed(3);
      } else if (time <= 5) {
        Monster.setSpeed(2.5);
      } else if (time <= 8) {
        Monster.setSpeed(2);
      }
    });
    this.randomSpeedCountdown = new CountdownTimer(10, (time) => {
      if (time <= 0) {
        this.tick++;
        if (this.tick === GameConfig.monsterAppearTick) {
          ObstacleManager.setVisible(false);
          Monster.reset();
          Monster.setVisible(true);
          this.appearMonsterCountdown.reset();
        } else {
          this.randomSpeedCountdown.reset();
          ObstacleManager.setSpeed(1 + Math.floor(Math.random() * 5));
        }
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
  }

  reset() {
    TimeToStartText.reset();
    Bird.reset();
    ScoreText.reset();
    ObstacleManager.reset();
    GameOverText.reset();
    WarningText.reset();
    BulletManager.reset();
    Monster.reset();
    this.remainingTimeToStartCountdown.reset();
    this.gameOverCountdown.reset();
    this.fadeInEffect.reset();
    this.randomSpeedCountdown.reset();
    this.appearMonsterCountdown.reset();
    this.status = 'prepare';
    this.checkCollisionObstacleIndex = 0;
    this.tick = 0;
  }

  eventHandler(event) {
    if (this.status !== 'prepare' && this.status !== 'endGame')
      Bird.eventHandler(event);
  }

  update(deltaTime) {
    switch (this.status) {
      case 'prepare': {
        this.fadeInEffect.update(deltaTime);
        this.remainingTimeToStartCountdown.update(deltaTime);
        break;
      }
      case 'start': {
        if (this.tick < GameConfig.monsterAppearTick) {
          this.randomSpeedCountdown.update(deltaTime);
          ObstacleManager.update(deltaTime);
        } else {
          this.appearMonsterCountdown.update(deltaTime);
          Monster.update(deltaTime);
        }

        Bird.update(deltaTime);
        BulletManager.update(deltaTime);
        this.checkCollisionWithBird();
        break;
      }
      case 'endGame': {
        this.gameOverCountdown.update(deltaTime);
        break;
      }
    }
  }

  checkCollisionWithBird() {
    if (this.tick < GameConfig.monsterAppearTick) {
      const obstacle =
        ObstacleManager.children[this.checkCollisionObstacleIndex];

      if (Bird.x > obstacle.x + GameConfig.obstacleWidth) {
        ScoreText.increaseScore();
        this.checkCollisionObstacleIndex =
          (this.checkCollisionObstacleIndex + 1) %
          ObstacleManager.children.length;
      } else if (
        CollisionManager.checkCollisionRectRect(Bird, obstacle.topObstacle) ||
        CollisionManager.checkCollisionRectRect(Bird, obstacle.bottomObstacle)
      ) {
        this.status = 'endGame';
        GameOverText.setVisible(true);
      }
    }

    const visibleBullet = BulletManager.getVisibleBullet();
    if (visibleBullet.length > 0) {
      visibleBullet.forEach((bullet) => {
        if (CollisionManager.checkCollisionCircleRect(bullet, Bird)) {
          if (ScoreText.getScore() === 0) {
            this.status = 'endGame';
            GameOverText.setVisible(true);
          } else {
            ScoreText.decreaseScore();
            BulletManager.removeBullet(bullet);
          }
        }
      });
    }
  }
}

export default new InGameScene();
