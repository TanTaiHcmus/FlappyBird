class Scene {
  constructor(backgroundColor) {
    this.children = [];
    this.backgroundColor = backgroundColor || '#000';
    this.game = null;
  }

  setGame(game) {
    this.game = game;
  }

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }

  draw(context) {
    context.globalAlpha = 1;
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.children.forEach((child) => child.getVisible() && child.draw(context));
  }

  addChild(child) {
    this.children.push(child);
    child.setParent(this);
  }

  removeChild(removedChild) {
    this.children = this.children.filter((child) => child !== removedChild);
  }

  exit() {
    if (this.game) {
      this.game.popScene();
    }
  }
}

export default Scene;
