class Atom {
  static items = [];

  constructor({ x, y, color, velocity, size = 10, group = 0 }) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.x = x;
    this.size = 10;

    if (!Array.isArray(Atom.items[group])) {
      Atom.items[group] = [];
    }
    Atom.items[group].push(this);
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  static draw() {
    for (const group of Atom.items) {
      for (const atom of group) {
        atom.draw();
      }
    }
  }
}
