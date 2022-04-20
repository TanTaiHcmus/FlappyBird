import Text from '../engine/text.js';

class SpentTime extends Text {
  constructor() {
    super(10, 25, '00:00:00', '20px Arial');
    this.setFillStyle('red');
    this.spentTime = 0;
  }

  reset() {
    this.spentTime = 0;
    this.setText('00:00:00');
  }

  getHourText() {
    const hour = Math.floor(this.spentTime / 3600);
    return `${Math.floor(hour / 10)}${hour % 10}`;
  }

  getMinuteText() {
    const min = Math.floor((this.spentTime % 3600) / 60);
    return `${Math.floor(min / 10)}${min % 10}`;
  }

  getSecondText() {
    const sec = Math.floor(this.spentTime % 60);
    return `${Math.floor(sec / 10)}${sec % 10}`;
  }

  update(deltaTime) {
    this.spentTime += deltaTime;
    this.setText(
      `${this.getHourText()}:${this.getMinuteText()}:${this.getSecondText()}`
    );
  }
}

export default new SpentTime();
