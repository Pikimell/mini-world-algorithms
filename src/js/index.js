const WIDTH = 600;
const HEIGHT = 600;
const ATOM_SIZE = 4;

const LEN_X = WIDTH / ATOM_SIZE;
const LEN_Y = HEIGHT / ATOM_SIZE;

const FRAME_RATE = 10;

let START_GAME = true;
const RULES = [];

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(WIDTH, HEIGHT);
  background(0);
  setWorld();
}

function setWorld() {
  createGroupe(200, 'red');
  createGroupe(200, 'yellow');
  createGroupe(100, 'green');
  createGroupe(50, 'blue');
}

function clearCanvas() {
  fill(0);
  beginShape();
  vertex(0, 0);
  vertex(0, HEIGHT);
  vertex(WIDTH, HEIGHT);
  vertex(WIDTH, 0);
  endShape();
}

function draw() {
  if (!START_GAME) return;
  clearCanvas();
  for (const ruleData of RULES) {
    const { atomsA, atomsB, g } = ruleData;
    rule(atomsA, atomsB, g);
  }
  Atom.draw();
}

function createGroupe(amount, color) {
  for (let i = 0; i < amount; i++) {
    const x = getRandom(0, 500);
    const y = getRandom(0, 500);
    new Atom({ x, y, color: color, size: ATOM_SIZE });
  }
}

function rule(firstAtomGroup, secondAtomGroup, g) {
  for (let i = 0; i < firstAtomGroup.length; i++) {
    let fx = 0;
    let fy = 0;
    const atomA = firstAtomGroup[i];

    for (let j = 0; j < secondAtomGroup.length; j++) {
      const atomB = secondAtomGroup[j];
      const dx = atomA.x - atomB.x;
      const dy = atomA.y - atomB.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0 && d < 80) {
        const F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }

    atomA.vx = (atomA.vx + fx) * 0.5;
    atomA.vy = (atomA.vy + fy) * 0.5;

    atomA.x += atomA.vx;
    atomA.y += atomA.vy;

    if (atomA.x <= 0 || atomA.x >= WIDTH) {
      atomA.vx *= -1;
    }
    if (atomA.y <= 0 || atomA.y >= HEIGHT) {
      atomA.vy *= -1;
    }
  }
}

window.addEventListener('keydown', () => {
  START_GAME = !START_GAME;
});
