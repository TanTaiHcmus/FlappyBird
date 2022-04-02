import Scene from '../engine/scene.js';
import Bird from './Bird.js';
import CountdownTimer from './CountdownTimer.js';
import FadeInEffect from './FadeInEffect.js';
import GameConfig from './GameConfig.js';
import GameOverText from './GameOverText.js';
import TimeToStartText, { TIME_TO_START_DURATION } from './TimeToStartText.js';

class InGameScene extends Scene {
  constructor() {
    super('#c7e7ff');
    this.isEndGame = false;
    this.addChild(Bird);
    this.addChild(TimeToStartText);
    this.addChild(GameOverText);
    this.remainingTimeToStartCountdown = new CountdownTimer(
      TIME_TO_START_DURATION,
      (time) => {
        TimeToStartText.setText(Math.ceil(time / 1000));
        if (time <= 0) {
          TimeToStartText.setVisible(false);
          Bird.setVisible(true);
        }
      }
    );
    this.gameOverCountdown = new CountdownTimer(1500, (time) => {
      if (time <= 0) {
        this.game.handleBackScene();
      }
    });
    this.fadeInEffect = new FadeInEffect(
      GameConfig.width,
      GameConfig.height,
      500
    );
    this.addChild(this.fadeInEffect);
  }

  reset() {
    TimeToStartText.reset();
    Bird.reset();
    GameOverText.reset();
    this.remainingTimeToStartCountdown.reset();
    this.gameOverCountdown.reset();
    this.fadeInEffect.reset();
    this.isEndGame = false;
  }

  eventHandler(event) {
    Bird.eventHandler(event);
  }

  update(deltaTime) {
    if (!this.isEndGame) {
      this.fadeInEffect.update(deltaTime);
      this.remainingTimeToStartCountdown.update(deltaTime);
      Bird.update(deltaTime);

      if (this.isDead()) {
        this.isEndGame = true;
        GameOverText.setVisible(true);
      }
    } else {
      this.gameOverCountdown.update(deltaTime);
    }
  }

  isDead() {
    return Bird.getPositionY() + Bird.height >= GameConfig.height;
  }
}

export default new InGameScene();
