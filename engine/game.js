class Game {
  constructor(width, height, fps) {
    this.viewport = document.createElement('canvas');
    this.context = this.viewport.getContext('2d');
    this.viewport.width = width;
    this.viewport.height = height;
    this.scenes = [];
    this.prevTimestamp = 0;
    this.isStart = false;
    this.ticker = null;
    this.fps = fps || 60;
  }

  start() {
    if (!this.isStart) {
      this.isStart = true;
      this.ticker = setInterval(() => {
        if (!this.isStart || this.scenes.length === 0) return;
        this.update(1000 / this.fps);
        this.scenes[this.scenes.length - 1].draw(this.context);
      }, 1000 / this.fps);
    }
  }

  end() {
    this.isStart = false;

    if (this.ticker) {
      clearInterval(this.ticker);
      this.ticker = null;
    }
  }

  getCanvas() {
    return this.viewport;
  }

  pushScene(scene) {
    this.scenes.push(scene);
    scene.setGame(this);
  }

  popScene() {
    if (this.scenes.length > 0) this.scenes.pop();
  }

  update(deltaTime) {}
}

export default Game;
