const MAXTIME = 100;
let time, score, gameOver, gameAnswer, gameQuestion;
let gameTimer = null;

const gameInput = document.getElementById('gameInput');
const displayMessage = document.getElementById('displayMessage');
const gameScore = document.getElementById('gameScore');
const gameTime = document.getElementById('gameTime');
const statusMessage = document.getElementById('statusMessage');
const startButton = document.getElementById('startButton');

function start() {
	GameOver = false;
	score = 0;
	time = MAXTIME;
	gameInput.value = "";
	displayMessage.style.visibility = "visible";
	startButton.style.visibility = "hidden";
	statusMessage.style.visibility = "hidden";
	gameInput.addEventListener('input', play);
	gameInput.focus();
	showWord(words);
	gameTimer = setInterval(() => gameTime.innerHTML = Math.floor(--time / 20) + 1, 50);
}

function play() {
	if(isCorrect()) {
		gameOver = false;
		time = MAXTIME;
		showWord(words);
		gameInput.value = '';
		score++;
	}
	gameScore.innerHTML = score;
}

function isCorrect() {
	let correct = gameInput.value.toLowerCase() === gameAnswer.toLowerCase();
	statusMessage.innerHTML = correct ? "Right!" : statusMessage.innerHTML;
	statusMessage.style.visibility = correct ? "visible" : "hidden";
	return correct;
}

function showWord(words) {
	do gameQuestion = words[Math.floor(Math.random() * words.length)];
	while (displayMessage.innerHTML == gameQuestion);
	gameAnswer = String(typeof(eval(gameQuestion)));
	displayMessage.innerHTML = gameQuestion;
}

function checkOver() {
	if (time < -5) {
		gameInput.removeEventListener('input', play);
		statusMessage.innerHTML = "Game Over";
		statusMessage.style.visibility = "visible";
		startButton.innerHTML = "Play Again?";
		startButton.style.visibility = "visible";
		let isVowel = /[aeiou]/.test(gameAnswer[0]);
		displayMessage.innerHTML = gameQuestion + ` is a${isVowel?'n':''} ` + gameAnswer;
		clearInterval(gameTimer);
	}
}

setInterval(checkOver, 50);

const words = [
	"[]", "[]+[]", "1", "'1'",
	"1+'1'", "'1'-1", "[]+{}", "![]",
	"'1+1'", "false", "1+1", "1/0",
	"true+true", "NaN", "undefined", "![] + []",
	"null", "[[]]", "''", "![]+ +[]",
	"![] + []", "'1'-'1'", "String", "'a'",
	"'1'-'1'+'1'", "'1' * 1", "'one' * 1", "+!+[]",
	"'one'", "'1',1", "1,'1'", "[1,1,1]",
	"[][[]]", "[1]", "[1]+[1]", "['a']*['b']",
	"Number", "'1'+'1'%'1'", "'1'%'1'",
];
