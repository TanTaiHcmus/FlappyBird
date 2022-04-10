import Text from '../engine/text.js';
import GameConfig from './GameConfig.js';

class ScoreText extends Text {
  constructor() {
    super(GameConfig.width / 2, 50, 'Score: 0', '30px Arial', 'center');
    this.setFillStyle('#f587f1');
    this.setVisible(false);
    this.score = 0;
  }

  increaseScore() {
    this.score++;
    this.setText(`Score: ${this.score}`);
  }

  reset() {
    this.setVisible(false);
    this.score = 0;
    this.setText('Score: 0');
  }
}

export default new ScoreText();
