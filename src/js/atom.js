class Atom {
  constructor({ x, y, color, velocity, size = 10 }) {
    this.x = x;
    this.y = x;
    this.color = color;
    this.x = x;
    this.size = 10;
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
