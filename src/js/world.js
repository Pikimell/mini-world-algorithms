function createGroup(amount, color) {
  for (let i = 0; i < amount; i++) {
    const x = getRandom(0, WIDTH);
    const y = getRandom(0, HEIGHT);
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

      if (d > 0 && d < MAX_DISTANCE) {
        const F = (g * 1) / d;
        fx += F * dx;
        fy += F * dy;
      }
    }

    atomA.vx = (atomA.vx + fx) * SPEED_RATE;
    atomA.vy = (atomA.vy + fy) * SPEED_RATE;

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

function loadConfig(data) {
  const { groups, rules } = data;
  Atom.items = {};

  for (let group of groups) {
    createGroup(group.amount, group.name);
  }
  Atom.rules = rules;
}
