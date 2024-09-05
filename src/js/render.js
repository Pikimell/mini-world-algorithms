function atomTemplate({ name, amount }) {
  return `<div class="atom-item item">
        <p>${name} - ${amount}</p>
        <input type="range" min="1" max="5000" step="1" value="${amount}" name="${name}"/>
        <button data-name="${name}">x</button>
    </div>`;
}

function atomsTemplate(atoms) {
  return atoms.map(atomTemplate).join('\n');
}
function renderAtoms(atoms) {
  const markup = atomsTemplate(atoms);
  console.log(markup);
  refs.atomsList.innerHTML = markup;
}
//!======================================================
function ruleTemplate({ g1, g2, value }) {
  return `<div class="rule-item item">
      <p>${g1} - ${g2} - ${value}</p>
      <input type="range" min="-1" max="1" step="0.001" value="${value}" data-g1="${g1}" data-g2="${g2}"/>
      <button data-g1="${g1}" data-g2="${g2}">x</button>
      </div>`;
}
function rulesTemplate(rules) {
  return rules.map(ruleTemplate).join('\n');
}
function renderRules(rules) {
  const markup = rulesTemplate(rules);
  refs.rulesList.innerHTML = markup;
}
