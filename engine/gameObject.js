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
}

export default GameObject;
