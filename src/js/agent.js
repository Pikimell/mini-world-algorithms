class Agent {
  static TYPES = {
    t1: '#D16BA5',
    t2: '86A8E7',
    t3: '#86A8E7',
    t4: '#D16BA5',
    t5: 'yellow',
    t6: 'green',
  };

  constructor({ x = 0, y = 0, size = 10, type = 0 }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  show() {
    const color = Object.values(Agent.TYPES)[this.type];
    fill(color);

    if (this.x === 50 && this.y === 50) {
      fill('red');
    }
    square(this.x * this.size, this.y * this.size, this.size);
  }

  getPos() {
    return { x: this.x, y: this.y };
  }

  getNeighbors() {
    const x = this.x;
    const y = this.y;

    const result = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue;
        result.push({ x: x + j, y: y + i });
      }
    }

    return result;
  }

  changeType(options) {
    const countTypes = Object.values(Agent.TYPES).length;
    const nextType = (this.type + 1) % countTypes;
    const types = this.getNeighborsTypes(options);
    // if (this.isTestAgent()) {
    //   console.log(this.getPos());
    //   console.log(types);
    // }
    const count = types.filter(i => i.type === nextType).length;
    return count >= 2 ? nextType : this.type;
  }

  getNeighborsTypes({ agents = [], width = 0 }) {
    const neighbors = this.getNeighbors();
    const result = [];

    for (const { x, y } of neighbors) {
      const pos = y * width + x;
      const agent = agents[pos];
      if (agent) {
        result.push({ type: agent.type, pos: agent.getPos() });
      }
    }
    return result;
  }

  isTestAgent() {
    return this.x === 50 && this.y === 50;
  }
}
