import Scene from '../engine/scene.js';
import Text from '../engine/text.js';
import FadeInEffect from './FadeInEffect.js';
import GameConfig from './GameConfig.js';

class HomeScene extends Scene {
  constructor() {
    super();
    const gameName = new Text(
      GameConfig.width / 2,
      GameConfig.height / 2 - 30,
      GameConfig.gameName,
      '50px Arial',
      'center'
    );
    this.addChild(gameName);
    gameName.setFillStyle('#f00');

    const guideText = new Text(
      GameConfig.width / 2,
      GameConfig.height / 2 + 30,
      'Press ENTER to start',
      '30px Arial',
      'center'
    );

    this.addChild(guideText);
    guideText.setFillStyle('#fff');
    this.fadeInEffect = new FadeInEffect(
      GameConfig.width,
      GameConfig.height,
      1
    );
    this.addChild(this.fadeInEffect);
  }

  reset() {
    this.fadeInEffect.reset();
  }

  update(deltaTime) {
    this.fadeInEffect.update(deltaTime);
  }

  eventHandler(event) {
    if (event.code === 'Enter' && event.type === 'keydown') {
      this.game.handleStartGame();
    }
  }
}

export default new HomeScene();
