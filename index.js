window.addEventListener('load', init);

let timeAllowed = 5;
let time = timeAllowed;
let score = 0;
let isGameOver = false;
let i1 = null, i2 = null;

usrInput = document.querySelector('.usrInput');
curr = document.querySelector('.curr');
scoreShown = document.querySelector('.scoreShown');
tmShown = document.querySelector('.tmShown');
msg = document.querySelector('.msg');
seconds = document.querySelector('.seconds');
startButton = document.querySelector('.btn-start');

function init() {
  startButton.addEventListener('click', begin);
}

function begin() {
  usrInput.value = "";
  usrInput.addEventListener('input', play);
  msg.style.visibility = "hidden";
  GameOver = false;
  score = 0;
  time = timeAllowed;
  curr.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  seconds.innerHTML = timeAllowed;
  showWord(words);
  i1 = setInterval(countdown, 1000);
  if(i2 == null) i2 = setInterval(checkOver, 50);
}


function play() {
  if(isCorrect()) {
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
    msg.innerHTML = "Right!"; 
    msg.style.visibility = "visible";
    return true;
  } else {
    msg.style.visibility = "hidden";
    return false;
  }
}

function showWord(words) {
  rIdx = Math.floor(Math.random() * words.length);
  while(curr.innerHTML == words[rIdx]) {
    rIdx = Math.floor(Math.random() * words.length);
  }
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
    msg.innerHTML = "Game Over";
    msg.style.visibility = "visible";

    startButton.innerHTML = "Play Again?";
    startButton.style.visibility = "visible";
    curr.style.visibility = "hidden";
    usrInput.removeEventListener('input', play);
    clearInterval(i1);
  }
}

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
  "[1]",
  "[1]+[1]",
  "['a']*['b']",
  "Number",
  "'1'+'1'%'1'",
  "'1'%'1'"
];


