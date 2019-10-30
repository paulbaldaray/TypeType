window.addEventListener('load', init);

let timeAllowed = 3;
let time = timeAllowed;
let score = 0;
let isGameOver = false;

usrInput = document.querySelector('.usrInput');
curr = document.querySelector('.curr');
scoreShown = document.querySelector('.scoreShown');
tmShown = document.querySelector('.tmShown');
msg = document.querySelector('.msg');
seconds = document.querySelector('.seconds');

words = [
  "[]",
  "[]+[]",
  "1",
  "'1'",
  "1+'1'",
  "'1'-1",
  "[]+{}",
  "![]",
  "'1+1'",
  "false",
  "1+1",
  "1/0",
  "true+true",
  "NaN",
  "undefined",
  "![] + []",
  "null",
  "[[]]",
  "''",
  "![]+ +[]",
  "![] + []",
  "'1'-'1'",
  "String",
  "'a'",
  "'1'-'1'+'1'",
  "'1' * 1",
  "'one' * 1",
  "+!+[]",
  "'one'",
  "'1',1",
  "1,'1'",
  "[1,1,1]",
  "[][[]]",
  "[1]"
];

function init() {
  seconds.innerHTML = timeAllowed;
  showWord(words);
  usrInput.addEventListener('input', start);
  setInterval(countdown, 1000);
  setInterval(checkOver, 50);
}

function start() {
  if (isCorrect()) {
    isGameOver = false;
    time = timeAllowed + 1;
    showWord(words);
    usrInput.value = '';
    score++;
  }
  scoreShown.innerHTML = score;
}

function isCorrect() {
  if(usrInput.value.toLowerCase() === String(typeof(eval(curr.innerHTML))).toLowerCase()) {
    msg.innerHTML = "You're Right!"; 
    msg.style.visibility = "visible";
    return true;
  } else {
    msg.style.visibility = "hidden";
    return false;
  }
}

function showWord(words) {
  rIdx = Math.floor(Math.random() * words.length);
  curr.innerHTML = words[rIdx];
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isGameOver = true;
  }
  tmShown.innerHTML = time;
}

function checkOver() {
  if (isGameOver && time === 0) {
    msg.innerHTML = 'Game Over';
    msg.style.visibility = "visible";
  }
}
