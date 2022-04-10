import Rectangle from '../engine/rectangle.js';
import GameConfig from './GameConfig';

class Monster extends Rectangle {
  constructor() {
    super(
      GameConfig.width - 100,
      GameConfig.height - 50,
      GameConfig.monsterWidth,
      GameConfig.monsterHeight
    );
    this.setFillStyle('#b302c7');
    this.visible = false;
  }

  reset() {}
}
