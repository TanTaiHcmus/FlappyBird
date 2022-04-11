class CountdownTimer {
  constructor(duration, onUpdate) {
    this.duration = duration;
    this.timer = duration;
    this.onUpdate = onUpdate;
  }

  reset() {
    this.timer = this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
    this.timer = duration;
  }

  isCompleted() {
    return this.timer <= 0;
  }

  getCurrentTime() {
    return this.timer;
  }

  update(deltaTime) {
    if (this.timer > 0) {
      this.timer -= deltaTime;
      if (this.timer < 0) {
        this.timer = 0;
      }
      this.onUpdate(this.timer);
    }
  }
}

export default CountdownTimer;
