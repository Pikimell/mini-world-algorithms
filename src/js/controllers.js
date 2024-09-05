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
    renderAtoms(data.groups);
  } catch (err) {
    console.log(err);
  }

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
