class CollisionManager {
  static checkCollisionCircleRect(circle, rect) {
    const distX = Math.abs(
      circle.globalPositionX - rect.globalPositionX - rect.width / 2
    );
    const distY = Math.abs(
      circle.globalPositionY - rect.globalPositionY - rect.height / 2
    );

    if (distX > rect.width / 2 + circle.radius) {
      return false;
    }
    if (distY > rect.height / 2 + circle.radius) {
      return false;
    }

    if (distX <= rect.width / 2) {
      return true;
    }
    if (distY <= rect.height / 2) {
      return true;
    }

    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  static checkCollisionRectRect = (rect1, rect2) => {
    if (
      rect1.globalPositionX < rect2.globalPositionX + rect2.width &&
      rect1.globalPositionX + rect1.width > rect2.globalPositionX &&
      rect1.globalPositionY < rect2.globalPositionY + rect2.height &&
      rect1.globalPositionY + rect1.height > rect2.globalPositionY
    ) {
      return true;
    }
    return false;
  };
}

export default CollisionManager;
