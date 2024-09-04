class Atom {
  static items = {};
  static rules = [];

  constructor({ x, y, color, size = 10 }) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.x = x;
    this.size = size;

    if (!Array.isArray(Atom.items[color])) {
      Atom.items[color] = [];
    }
    Atom.items[color].push(this);
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  static draw() {
    for (const group of Object.values(Atom.items)) {
      for (const atom of group) {
        atom.draw();
      }
    }
  }
}
