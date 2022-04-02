import Text from '../engine/text.js';
import GameConfig from './GameConfig.js';

export const TIME_TO_START_DURATION = 3000; //ms

class TimeToStartText extends Text {
  constructor() {
    super(
      GameConfig.width / 2,
      120,
      TIME_TO_START_DURATION / 1000,
      '70px Arial',
      'center'
    );
    this.setFillStyle('#ff1e12');
  }

  reset() {
    this.setVisible(true);
  }
}

export default new TimeToStartText();
