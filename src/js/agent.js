class Agent {
  static HAPPY = 58;
  static TYPES = {
    t1: '#D16BA5', // рожевий
    t2: '#86A8E7', // блакитний
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
    square(this.x * this.size, this.y * this.size, this.size);
  }

  clear() {
    fill('white');
    square(this.x * this.size, this.y * this.size, this.size);
  }

  getNeighbors() {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const x = this.x + j;
        const y = this.y + i;
        if (Agent.world[y] && Agent.world[y][x]) {
          neighbors.push(Agent.world[y][x]);
        }
      }
    }
    return neighbors;
  }

  isHappy() {
    const neighbors = this.getNeighbors();
    const similarNeighbors = neighbors.filter(
      el => el.type === this.type
    ).length;
    return similarNeighbors / 8 > Agent.HAPPY / 100;
  }

  relocate() {
    if (this.isHappy()) return;

    this.clear();

    let newPos;
    const currentPos = { x: this.x, y: this.y };
    if (Math.random() > 0.5) {
      newPos = Agent.empty.pop();
    } else {
      newPos = Agent.empty.shift();
    }

    Agent.world[newPos.y][newPos.x] = this;
    Agent.world[currentPos.y][currentPos.x] = undefined;

    this.x = newPos.x;
    this.y = newPos.y;

    if (Math.random() > 0.5) {
      Agent.empty.push(currentPos);
    } else {
      Agent.empty.unshift(currentPos);
    }

    this.show();
  }
}
