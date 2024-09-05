let START_GAME = true;

function setup() {
  frameRate(FRAME_RATE);
  createCanvas(WIDTH, HEIGHT);
  background(255);
}

function clearCanvas() {
  background(0);
  // fill(0);
  // beginShape();
  // vertex(0, 0);
  // vertex(0, HEIGHT);
  // vertex(WIDTH, HEIGHT);
  // vertex(WIDTH, 0);
  // endShape();
}

function draw() {
  if (!START_GAME) return;
  clearCanvas();

  for (const ruleData of Atom.rules) {
    const { g1, g2, value } = ruleData;
    rule(Atom.items[g1], Atom.items[g2], value);
  }

  Atom.draw();
}
