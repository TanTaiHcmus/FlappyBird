import Game from '../engine/game.js';
import GameConfig from './GameConfig.js';
import HomeScene from './HomeScene.js';
import InGameScene from './InGameScene.js';

class MainGame extends Game {
  constructor() {
    super(GameConfig.width, GameConfig.height, GameConfig.fps);
  }

  run() {
    window.addEventListener('keydown', this.eventHandler.bind(this));
    window.addEventListener('keyup', this.eventHandler.bind(this));
    this.start();
    this.pushScene(HomeScene);
  }

  update(deltaTime) {
    if (this.scenes.length > 0) {
      this.scenes[this.scenes.length - 1].update(deltaTime);
    }
  }

  eventHandler(event) {
    if (this.scenes.length > 0) {
      this.scenes[this.scenes.length - 1].eventHandler(event);
    }
  }

  handleBackScene() {
    this.popScene();
    if (this.scenes.length > 0) {
      this.scenes[this.scenes.length - 1].reset();
    }
  }

  handleStartGame() {
    this.pushScene(InGameScene);
    InGameScene.reset();
  }
}

export default new MainGame();
