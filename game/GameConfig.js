class GameConfig {
  static gameName = 'Flappy Bird';
  static width = 1000;
  static height = 500;
  static obstacleWidth = 70;
  static distanceBetweenTwoObstacle = 500;
  static minDistanceBetweenTopAndBottomObstacle = 160;
  static minObstacleHeight = 50;
  static birdWidth = 40;
  static birdHeight = 40;
  static monsterWidth = 50;
  static monsterHeight = 50;
  static xMonster = 900;
  static xBird = 100;
  static fps = 60;
  static fallSpeed = 40;
  static flap = 480; // px/s
  static obstacleSpeed = 240; // px/s
  static monsterShootSpeed = 10; // times/s
  static bulletRadius = 5;
  static bulletSpeed = 800; // px/s
  static monsterAppearTick = 3;
}

export default GameConfig;
