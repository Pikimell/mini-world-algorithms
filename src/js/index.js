const WIDTH = 600;
const HEIGHT = 600;
const ATOM_SIZE = 2;

const LEN_X = WIDTH / ATOM_SIZE;
const LEN_Y = HEIGHT / ATOM_SIZE;

const FRAME_RATE = 5;

let START_GAME = true;

function setup() {
  // frameRate(FRAME_RATE);
  createCanvas(WIDTH, HEIGHT);
  background(0);
  setWorld();
}

function setWorld() {
  for (let i = 0; i < 2; i++) {
    const x = getRandom(0, 500);
    const y = getRandom(0, 500);
    new Atom({ x, y, color: 'red', size: ATOM_SIZE, group: 0 });
  }
}

function clearCanvas() {
  fill(0);
  square(0, 0, WIDTH, HEIGHT);
}

function draw() {
  if (!START_GAME) return;
  clearCanvas();
  rule(Atom.items[0], Atom.items[0], -1);
  Atom.draw();
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

      if (d > 0) {
        const F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }

    atomA.vx = atomA.vx + fx;
    atomA.vy = atomA.vy + fy;

    atomA.x += atomA.vx;
    atomA.y += atomA.vy;

    if (atomA.x < 0 || atomA.x > WIDTH) {
      arguments.vx *= -1;
    }
    if (atomA.y < 0 || atomA.y > HEIGHT) {
      arguments.vx *= -1;
    }
  }
}

window.addEventListener('keydown', () => {
  START_GAME = !START_GAME;
});
