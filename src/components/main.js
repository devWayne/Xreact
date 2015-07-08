class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    new Promise();
  }
  toString() {
    return '('+this.x+','+this.y+')';
  }
}
export default Point;
