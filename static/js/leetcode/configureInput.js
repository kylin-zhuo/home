var nUnits = 3;

function configureInputFields(qid) {
  console.debug('configureInputFields -', qid);
  if (qid === '1') {
    displayInputUnits([1,2]);
  }
  if (qid === '448') {
    // only display input unit 1
    displayInputUnits([1]);
    // set the default values in input unit 1
    setDefaultInputValue(1, '[8,6,6,3,1,2,8,4]');
  }
}

function displayInputUnits(units) {
  var unit = 1;
  while (unit <= nUnits) {
    if (units.indexOf(unit) == -1) {
      document.querySelector("#input-unit-" + unit).classList.add('hidden');
    } else {
      document.querySelector("#input-unit-" + unit).classList.remove('hidden');
    }
    unit += 1;
  }
}

function setDefaultInputValue(inputId, defaultValue) {
  document.querySelector('#input' + inputId).value = defaultValue;
}
