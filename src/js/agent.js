const currentAgent = { x: -1, y: -1 };

class Agent {
  static HAPPY = 58;

  static TYPES = {
    t1: '#D16BA5', // розовый
    t2: '#86A8E7', // голубой
  };
  static world = [];
  static empty = [];

  constructor({ x = 0, y = 0, size = 10, type = 0 }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  show() {
    const color = Object.values(Agent.TYPES)[this.type];
    fill(color);
    if (this.x === currentAgent.x && this.y === currentAgent.y) {
      fill('green');
    }

    square(this.x * this.size, this.y * this.size, this.size);
  }
  clear() {
    fill('white');
    square(this.x * this.size, this.y * this.size, this.size);
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  getNeighbors() {
    const result = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const x = this.x + j;
        const y = this.y + i;
        const row = Agent.world[y];

        if (!row) continue;
        const agent = row[x];

        if (!agent || (i == 0 && j == 0)) continue;
        result.push(agent);
      }
    }

    return result;
  }

  isHappy() {
    const happyPercent = Agent.HAPPY / 100;
    const neighbors = this.getNeighbors();
    const filtered = neighbors.filter(el => el.type === this.type);
    const count = filtered.length;
    const resultHappyPercent = count / 8;

    if (this.isCurrent()) {
      console.log(neighbors, filtered);
    }

    return resultHappyPercent > happyPercent;
  }

  isCurrent() {
    const x = this.x === currentAgent.x;
    const y = this.y === currentAgent.y;
    return x && y;
  }

  relocate() {
    this.clear();

    for (let i = 0; i < Agent.empty.length; i++) {
      if (this.isHappy()) break;
      const currentPost = this.getPos();
      const pos = Agent.empty.splice(i, 1)[0];

      Agent.empty.push(currentPost);
      Agent.world[pos.y][pos.x] = this;
      Agent.world[this.y][this.x] = undefined;

      this.x = pos.x;
      this.y = pos.y;
    }

    this.show();
  }
}
