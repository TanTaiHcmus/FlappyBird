import Text from '../engine/text.js';
import GameConfig from './GameConfig.js';

class GameOverText extends Text {
  constructor() {
    super(
      GameConfig.width / 2,
      GameConfig.height / 2,
      'Game Over',
      '70px Arial',
      'center'
    );
    this.setFillStyle('#ff1e12');
    this.setVisible(false);
  }

  reset() {
    this.setVisible(false);
  }
}

export default new GameOverText();
