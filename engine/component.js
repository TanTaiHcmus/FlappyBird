class Component {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.parent = null;
    this.visible = true;
    this.opacity = 1;
  }

  setParent(parent) {
    this.parent = parent;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setPositionX(x) {
    this.x = x;
  }

  setPositionY(y) {
    this.y = y;
  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

  getGlobalPosition() {
    if (!this.parent) return { x: 0, y: 0 };
    if (!this.parent.getGlobalPosition) return { x: this.x, y: this.y };

    const { x, y } = this.parent.getGlobalPosition();
    return { x: x + this.x, y: y + this.y };
  }

  getGlobalPositionX() {
    if (!this.parent) return 0;
    return this.parent.getGlobalPositionX
      ? this.parent.getGlobalPositionX() + this.x
      : this.x;
  }

  getGlobalPositionY() {
    if (!this.parent) return 0;
    return this.parent.getGlobalPositionY
      ? this.parent.getGlobalPositionY() + this.y
      : this.y;
  }

  setOpacity(value) {
    this.opacity = value;
  }

  getOpacity() {
    return this.opacity;
  }

  getGlobalOpacity() {
    return (
      this.opacity *
      (this.parent.getGlobalOpacity ? this.parent.getGlobalOpacity() : 1)
    );
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getVisible() {
    return this.visible;
  }

  draw(context) {
    context.globalAlpha = this.getGlobalOpacity();
  }

  removeFromParent() {
    this.parent.removeChild(this);
  }
}

export default Component;
