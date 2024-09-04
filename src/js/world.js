const ATOM_SIZE = 4;

function createGroup(amount, color) {
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

    // if (atomA.x < 0) {
    //   atomA.x += WIDTH;
    // } else if (atomA.x > WIDTH) {
    //   atomA.x -= WIDTH;
    // }

    // if (atomA.y < 0) {
    //   atomA.y += HEIGHT;
    // } else if (atomA.y > HEIGHT) {
    //   atomA.y -= HEIGHT;
    // }
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
