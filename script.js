const msgEl = document.getElementById('msg');

const randomNum = getRandomNum();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();

// capture user speech
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class='box'>${msg}</div>
  `;
}

// check message against number
function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  // check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>number must be between 1 and 100`;
    return;
  }

  // check number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h2> Congrats you have guessed the number! <br><br> it was ${randomNum}<h2>
      <button class='play-again' id='play-again'>Play again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

// generate a random number
function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

// speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.addEventListener('click', (e) => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
