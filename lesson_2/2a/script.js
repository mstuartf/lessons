var state = {
  'step-0': true,
  'step-1': false,
  'step-2': false,
  'step-3': false,
  'step-4': false,
  'step-5': false,
};


window.addEventListener('load', () => {
  alignPageContentsWithState();
  setupEventListeners();
  setupButton();
});


function alignPageContentsWithState() {
  for (var i = 0; i <= 5; i++) {
    var id = "step-" + i;
    var el = document.getElementById(id);

    if (state[id] === true) {
      el.classList.add("bg-blue-300");
      el.classList.remove("bg-red-300");
    } else {
      el.classList.add("bg-red-300");
      el.classList.remove("bg-blue-300");
    }
  }
}

function setupEventListeners() {
  for (var i = 0; i <= 5; i++) {
    var id = "step-" + i;
    var el = document.getElementById(id);
    el.addEventListener("click", setStepToTrue)
  }
}

function setStepToTrue(clickEvent) {
  var id = clickEvent.target.id;
  state[id] = true;
  alignPageContentsWithState();
}

function resetState() {
  for (var i = 0; i <= 5; i++) {
    var id = "step-" + i;
    state[id] = false;
  }
  alignPageContentsWithState();
}

function setupButton() {
  var button = document.getElementById("reset-button")
  button.addEventListener("click", resetState);
}
