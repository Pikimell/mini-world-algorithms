const refs = {
  groupForm: document.querySelector('.js-group-form'),
  rulesForm: document.querySelector('.js-rules-form'),
  configForm: document.querySelector('.js-config-form'),
};

refs.groupForm.addEventListener('submit', onGroupSubmit);
refs.rulesForm.addEventListener('submit', onRuleSubmit);
refs.configForm.addEventListener('submit', onLoadConfig);

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

  RULES.push(rule);

  console.log(RULES);
  e.target.reset();
}

function onLoadConfig(e) {
  e.preventDefault();
  try {
    const json = e.target.elements.config.value;
    const data = JSON.parse(json);
    loadConfig(data);
  } catch {}

  e.target.reset();
}
