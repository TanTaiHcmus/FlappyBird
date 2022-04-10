import Text from '../engine/text.js';
import GameConfig from './GameConfig.js';

class WarningText extends Text {
  constructor() {
    super(GameConfig.width / 2, 150, 'Warning!!!', '35px Arial', 'center');
    this.setFillStyle('yellow');
    this.setVisible(false);
  }

  reset() {
    this.setVisible(false);
  }
}

export default new WarningText();
