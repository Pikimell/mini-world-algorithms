class Agent {
  static TYPES = ['#7fd9ff', '#ffa17f', '#d07fff'];

  constructor({ x = 0, y = 0, size = 10, type = 0 }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  show() {
    let color = Agent.TYPES[this.type];
    fill(color);
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
        if (i === 0 && j === 0) continue;
        result.push({ x: x + j, y: y + i });
      }
    }

    return result;
  }

  changeType(options) {
    const countTypes = Agent.TYPES.length;
    const nextType = (this.type + 1) % countTypes;
    const types = this.getNeighborsTypes(options);
    const count = types.reduce(
      (acc, type) => acc + (type === nextType ? 1 : 0),
      0
    );
    return count >= 3 ? nextType : this.type;
  }

  getNeighborsTypes({ agents = [], width = 0 }) {
    return this.getNeighbors().reduce((result, { x, y }) => {
      const pos = y * width + x;
      const agent = agents[pos];
      if (agent) {
        result.push(agent.type);
      }
      return result;
    }, []);
  }

  isTestAgent() {
    return this.x === 50 && this.y === 50;
  }
}
