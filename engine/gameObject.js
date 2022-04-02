import Component from './component.js';

class GameObject extends Component {
  constructor(x, y) {
    super(x, y);
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    child.setParent(this);
  }

  removeChild(removedChild) {
    this.children = this.children.filter((child) => child !== removedChild);
  }

  draw(context) {
    super.draw(context);
    this.children.forEach((child) => child.getVisible() && child.draw(context));
  }

  setPosition(x, y) {
    super.setPosition(x, y);
    this.children.forEach((child) => {
      child.syncGlobalPosition();
    });
  }

  setPositionX(x) {
    super.setPositionX(x);
    this.children.forEach((child) => {
      child.syncGlobalPositionX();
    });
  }

  setPositionY(y) {
    super.setPositionY(y);
    this.children.forEach((child) => {
      child.syncGlobalPositionY();
    });
  }

  setOpacity(value) {
    super.setOpacity(value);
    this.children.forEach((child) => {
      child.syncGlobalOpacity();
    });
  }
}

export default GameObject;
