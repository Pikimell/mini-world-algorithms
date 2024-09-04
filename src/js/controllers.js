const refs = {
  groupForm: document.querySelector('.js-group-form'),
  rulesForm: document.querySelector('.js-rules-form'),
  configForm: document.querySelector('.js-config-form'),
  saveConfigBtn: document.querySelector('.js-save-config'),
  rulesList: document.querySelector('.js-rules'),
  randomRulesBtn: document.querySelector('.js-random-rules'),
};

refs.groupForm.addEventListener('submit', onGroupSubmit);
refs.rulesForm.addEventListener('submit', onRuleSubmit);
refs.configForm.addEventListener('submit', onLoadConfig);
refs.saveConfigBtn.addEventListener('click', onSaveConfig);
refs.rulesList.addEventListener('change', onRuleChange);
refs.rulesList.addEventListener('click', onRuleRemove);
refs.randomRulesBtn.addEventListener('click', onRandomRulesClick);

function onGroupSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  createGroup(+data.amount, data.name);
  console.log(Atom.items);
  e.target.reset();
}
function onRuleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const rule = {
    g1: data.g1,
    g2: data.g2,
    value: +data.value,
  };

  Atom.rules.push(rule);

  const markup = ruleTemplate(rule);
  refs.rulesList.insertAdjacentHTML('beforeend', markup);

  e.target.reset();
}

function onLoadConfig(e) {
  e.preventDefault();
  try {
    const json = e.target.elements.config.value;
    const data = JSON.parse(json);
    loadConfig(data);
    renderRules(Atom.rules);
  } catch {}

  e.target.reset();
}

function onSaveConfig() {
  const groups = Object.keys(Atom.items).map(el => ({
    name: el,
    amount: Atom.items[el].length,
  }));

  const data = {
    groups,
    rules: Atom.rules,
  };

  const json = JSON.stringify(data);

  console.log(json);
}

function onRuleChange(e) {
  const g1 = e.target.dataset.g1;
  const g2 = e.target.dataset.g2;
  const item = Atom.rules.find(el => el.g1 === g1 && el.g2 === g2);
  item.value = +e.target.value;
}
function onRuleRemove(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const g1 = e.target.dataset.g1;
  const g2 = e.target.dataset.g2;
  const itemIndex = Atom.rules.findIndex(el => el.g1 === g1 && el.g2 === g2);
  Atom.rules.splice(itemIndex, 1);

  renderRules(Atom.rules);
}
function onRandomRulesClick() {
  for (let rule of Atom.rules) {
    const isPositive = Math.random() > 0.5;
    const rand = Math.random();
    rule.value = rand * (isPositive ? 1 : -1);
  }
  renderRules(Atom.rules);
}

function ruleTemplate({ g1, g2, value }) {
  return `<div class="rule-item">
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
