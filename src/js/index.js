const WIDTH = 1000;
const HEIGHT = 700;
const AGENT_SIZE = 4;
const agents = [];
const LEN_X = WIDTH / AGENT_SIZE;
const LEN_Y = HEIGHT / AGENT_SIZE;
let frame = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(255);
  setWorld();
}

function setWorld() {
  for (let y = 0; y < LEN_Y; y++) {
    for (let x = 0; x < LEN_X; x++) {
      const type = getRandom(0, Object.values(Agent.TYPES).length - 1);
      const options = {
        x,
        y,
        size: AGENT_SIZE,
        type,
      };
      const agent = new Agent(options);
      agents.push(agent);
    }
  }
}

function clearCanvas() {
  fill(255);
  beginShape();
  vertex(0, 0);
  vertex(0, HEIGHT);
  vertex(WIDTH, HEIGHT);
  vertex(WIDTH, 0);
  endShape();
}

function draw() {
  clearCanvas();
  const copy = [];
  for (const agent of agents) {
    agent.show();
    const type = agent.changeType({ agents, width: LEN_X });
    copy.push(type);
  }

  for (let i = 0; i < agents.length; i++) {
    agents[i].type = copy[i];
  }
}
