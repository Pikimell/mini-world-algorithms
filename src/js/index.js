const WIDTH = 600;
const HEIGHT = 600;
const AGENT_SIZE = 5;

const LEN_X = WIDTH / AGENT_SIZE;
const LEN_Y = HEIGHT / AGENT_SIZE;

const EMPTY_PERCENT = 0.08;
const EMPTY_COUNT = Math.round(LEN_X * LEN_Y * EMPTY_PERCENT);
const EMPTY_POINTS = Array.from({ length: EMPTY_COUNT });

const FRAME_RATE = 100;

let START_GAME = true;

Agent.world = [];
Agent.empty = EMPTY_POINTS;

function setup() {
  // frameRate(FRAME_RATE);
  createCanvas(WIDTH, HEIGHT);
  background(255);
  setWorld();
}

function setWorld() {
  const length = Math.floor((LEN_X * LEN_Y) / 2);
  const first = Array.from({ length }).fill(0);
  const second = Array.from({ length }).fill(1);

  const res = [...first, ...second];
  for (let y = 0; y < LEN_Y; y++) {
    Agent.world[y] = [];
    for (let x = 0; x < LEN_X; x++) {
      const type = Math.random();
      const options = {
        x,
        y,
        size: AGENT_SIZE,
        type: type > 0.5 ? res.pop() : res.shift(),
      };
      const agent = new Agent(options);
      Agent.world[y].push(agent);
    }
  }

  for (let i = 0; i < EMPTY_POINTS.length; i++) {
    let x, y;
    do {
      x = getRandom(2, LEN_X - 1);
      y = getRandom(2, LEN_Y - 1);
    } while (Agent.world[y][x] === undefined);

    Agent.world[y][x] = undefined;
    EMPTY_POINTS[i] = { x, y };
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

function showAgents() {
  for (const row of Agent.world) {
    for (const agent of row) {
      agent?.show();
    }
  }

  for (let i = 0; i < 100; i++) {
    agentRelocate();
  }
}

function agentRelocate() {
  let x, y;
  do {
    x = getRandom(0, LEN_X - 1);
    y = getRandom(0, LEN_Y - 1);
  } while (Agent.world[y][x] === undefined);

  const agent = Agent.world[y][x];

  agent?.relocate();
  agent?.show();
}
function draw() {
  if (!START_GAME) return;
  clearCanvas();
  showAgents();
}

window.addEventListener('keydown', () => {
  START_GAME = !START_GAME;
});
