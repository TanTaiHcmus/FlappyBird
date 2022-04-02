class Component {
  constructor(x, y) {
    this.positionX = x || 0;
    this.positionY = y || 0;
    this.globalPositionX = this.positionX;
    this.globalPositionY = this.positionY;
    this.parent = null;
    this.visible = true;
    this.alpha = 1;
    this.globalAlpha = this.alpha;
  }

  setParent(parent) {
    this.parent = parent;
    this.syncGlobalPosition();
    this.syncGlobalOpacity();
  }

  setPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.syncGlobalPosition();
  }

  getPosition() {
    return { x: this.positionX, y: this.positionY };
  }

  setPositionX(x) {
    this.positionX = x;
    this.syncGlobalPositionX();
  }

  set x(x) {
    this.positionX = x;
    this.syncGlobalPositionX();
  }

  setPositionY(y) {
    this.positionY = y;
    this.syncGlobalPositionY();
  }

  set y(y) {
    this.positionY = y;
    this.syncGlobalPositionY();
  }

  getPositionX() {
    return this.positionX;
  }

  get x() {
    return this.positionX;
  }

  getPositionY() {
    return this.positionY;
  }

  get y() {
    return this.positionY;
  }

  getGlobalPosition() {
    return {
      x: this.globalPositionX,
      y: this.globalPositionY,
    };
  }

  getGlobalPositionX() {
    return this.globalPositionX;
  }

  getGlobalPositionY() {
    return this.globalPositionY;
  }

  setOpacity(value) {
    this.alpha = value;
    this.syncGlobalOpacity();
  }

  set opacity(value) {
    this.alpha = value;
    this.syncGlobalOpacity();
  }

  getOpacity() {
    return this.alpha;
  }

  get opacity() {
    return this.alpha;
  }

  getGlobalOpacity() {
    return this.globalAlpha;
  }

  syncGlobalPosition() {
    const { x, y } =
      this.parent && this.parent.getGlobalPosition
        ? this.parent.getGlobalPosition()
        : { x: 0, y: 0 };
    this.globalPositionX = this.positionX + x;
    this.globalPositionY = this.positionY + y;
  }

  syncGlobalPositionX() {
    this.globalPositionX =
      this.positionX +
      (this.parent && this.parent.getGlobalPositionX
        ? this.parent.getGlobalPositionX()
        : 0);
  }

  syncGlobalPositionY() {
    this.globalPositionY =
      this.positionY +
      (this.parent && this.parent.getGlobalPositionY
        ? this.parent.getGlobalPositionY()
        : 0);
  }

  syncGlobalOpacity() {
    this.globalAlpha =
      this.alpha *
      (this.parent && this.parent.getGlobalOpacity
        ? this.parent.getGlobalOpacity()
        : 1);
  }

  setVisible(visible) {
    this.visible = visible;
  }

  getVisible() {
    return this.visible;
  }

  draw(context) {
    context.globalAlpha = this.globalAlpha;
  }

  removeFromParent() {
    this.parent.removeChild(this);
  }
}

export default Component;
