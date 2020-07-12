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

  // writeMessage(msg);
  // checkNumber(msg);
}

// generate a random number
function getRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

// speak result
recognition.addEventListener('result', onSpeak);
