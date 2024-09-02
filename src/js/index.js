const WIDTH = 700;
const HEIGHT = 700;
const AGENT_SIZE = 5;
const LEN_X = WIDTH / AGENT_SIZE;
const LEN_Y = HEIGHT / AGENT_SIZE;
let agents = [];
let frame = 1;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(255);
  setWorld();
}

function setWorld() {
  agents = new Array(LEN_Y * LEN_X);
  for (let y = 0; y < LEN_Y; y++) {
    for (let x = 0; x < LEN_X; x++) {
      const type = Math.floor(Math.random() * Agent.TYPES.length);
      const options = { x, y, size: AGENT_SIZE, type };
      const agent = new Agent(options);
      agents[y * LEN_X + x] = agent;
    }
  }
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (frame++ % 5 !== 0) return;
  clearCanvas();
  const nextTypes = new Array(agents.length);

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    agent.show();
    nextTypes[i] = agent.changeType({ agents, width: LEN_X });
  }

  for (let i = 0; i < agents.length; i++) {
    agents[i].type = nextTypes[i];
  }
}
