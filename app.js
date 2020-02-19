const EMOJIBOX = document.getElementById('emojicPanel');
var LETTERSBOX = document.getElementById('lettersPanel');
var ANSWERBOX = document.getElementById('answerPanel');
var quizNumber = document.getElementById('quizNumber');
var playScreen = document.getElementById('container');
var home = document.getElementById('homeScreen');
const btn = document.getElementById('btn');
const playButton = document.getElementById('playButton');
var level = 0;
var currentLevel = level + 1;
var name;
var welcome = false;
const EMOJIS = [
	'📱🍎',
	'👨🕷🕸',
	'🍔👑',
	'👙🚿',
	'⚾️🧢',
	'🤕🚑💉🏥',
	'💰🔫',
	'🐄🤠👢',
	'0️⃣0️⃣7️⃣🔫',
	'🚪🛎',
	'👨🔨⚡️',
	'👨📬✉️',
	'⛹️‍♀️🏀🗑',
	'👨 🎣🐟',
	'🕶☀️',
	'🐡🎈',
	'✉️❤️',
	'🎨👨🖼',
	'👮‍♂️🚔',
	'📚✏️👨‍🎓🏫',
	'👙🏖🌴'
];
const ANSWERS = [
	'IPHONE',
	'SPIDERMAN',
	'BURGERKING',
	'TRAJEDEBAÑO',
	'BEISBOL',
	'HOSPITAL',
	'ROBO',
	'VAQUERO',
	'JAMESBOND',
	'TIMBRE',
	'THOR',
	'MENSAJERO',
	'BASKETBALL',
	'PESCADOR',
	'LENTEDESOL',
	'PEZGLOBO',
	'CARTADEAMOR',
	'PINTOR',
	'POLICIA',
	'ESCUELA',
	'PLAYA'
];

const clickSound = new Audio();
clickSound.src = 'sound/clickSound.ogg';
const errorSound = new Audio();
errorSound.src = 'sound/error.mp3';
const correctSound = new Audio();
correctSound.src = 'sound/correct.mp3';

startQuiz(EMOJIS);
btn.addEventListener('click', nextLevel);
playButton.addEventListener('click', () => {
	playButton.style.visibility = 'hidden';
	home.style.visibility = 'hidden';
	playScreen.style.visibility = 'visible';
});

function nextLevel() {
	level += 1;
	currentLevel = level + 1;

	// This clear all element inside of  divs
	EMOJIBOX.innerText = '';
	LETTERSBOX.innerText = '';
	ANSWERBOX.innerText = '';

	// this hidden the buttone
	btn.classList.remove('show');

	// This show the current level text
	quizNumber.innerHTML = `<i>LEVEL: <i style="color:white">${currentLevel}</i> de ${EMOJIS.length + 1}</h3>`;

	// this remove the the last corrent msg
	ANSWERBOX.classList.remove('correct');
	LETTERSBOX.classList.remove('right');

	// this start the game again but we a new level
	addPlayerToSystem(name, level);
	startQuiz(EMOJIS);
}

function startQuiz(quiz) {
	authPlayer();

	if (quiz[level]) {
		let style = `style="color:white"`;

		quizNumber.innerHTML = `<h3>LEVEL: <i ${style}>${currentLevel}</i>  de ${quiz.length}</h3>`;

		EMOJIBOX.innerText = quiz[level];

		let randomPosForLetter = ANSWERS[level].split('').sort();

		randomPosForLetter.forEach((e) => {
			LETTERSBOX.innerHTML += `<span>${e}</pan>`;

			LETTERSBOX.childNodes.forEach((el) => {
				el.addEventListener('click', fisrtBoxTarget);
			});
		});

		function fisrtBoxTarget(e) {
			var char = e.target;

			char.remove();
			clickSound.play();

			ANSWERBOX.innerHTML += `<span>${char.innerText}</span>`;

			checkForWin();

			ANSWERBOX.childNodes.forEach((el) => {
				el.addEventListener('click', secondBoxTarget);
			});
		}
		function checkForWin() {
			if (ANSWERBOX.innerText === ANSWERS[level]) {
				ANSWERBOX.classList.add('correct');
				LETTERSBOX.classList.add('right');
				btn.classList.add('show');
				correctSound.play();
			} else if (ANSWERS[level].length === ANSWERBOX.innerText.length) {
				ANSWERBOX.classList.add('incorrect');
				LETTERSBOX.classList.add('wrong');
				errorSound.play();
			} else {
				ANSWERBOX.classList.remove('incorrect');
				ANSWERBOX.classList.remove('correct');
				LETTERSBOX.classList.remove('wrong');
			}
		}

		function secondBoxTarget(e) {
			var char = e.target;

			char.remove();
			clickSound.play();

			LETTERSBOX.innerHTML += `<span>${char.innerText}</span>`;
			checkForWin();

			LETTERSBOX.childNodes.forEach((el) => {
				el.addEventListener('click', fisrtBoxTarget);
			});
		}
	} else {
		EMOJIBOX.innerText = `Thanks For Playing The Game! New Level Soon!`;
	}
}

function authPlayer() {
	var existPlayer = getPlayerFromSytem(); // this get the player data from localstorage if not exist is null

	if (existPlayer === null) {
		name = prompt('Cual es tu nombre: ');
		addPlayerToSystem(name, level);
	} else {
		name = existPlayer.name;
		level = existPlayer.level;
		currentLevel = level + 1;

		if (!welcome) {
			alert(`BIENVENIDO DE NUEVO ${name}!`);
			welcome = true;
		}
	}
}
