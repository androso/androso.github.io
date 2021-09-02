import Home from "./home.js";
import { sound as Sounds } from "../data/sound.js";
import wordList from "../data/dictionary.js";
import ResultsScreen from "./results.js";
import Board from "./board.js";
const Game = (() => {
	const $hangmanContainer = document.querySelector(".hangman__container");
	const defaultLives = 7;
	let livesLeftCounter = defaultLives;
	let randomWord = "";
	// In order to update the word in the DOM without changing randomWord, i created this copy as a form of placeholder
	let guessingWord = [];

	const init = () => {
		getRandomWord();
		getWordPlaceholder();
		renderScreen();
		renderCanvas();
		addListeners();
	};
	const getRandomWord = () => {
		const randomIndex = getRandomIndex(wordList);
		randomWord = [...wordList[randomIndex]];
		// randomWord = [..."mina"];
	};
	const getWordPlaceholder = () => {
		guessingWord = [...randomWord];
		guessingWord.map((letter, index) => {
			guessingWord[index] = "_";
		});
	};
	const renderScreen = () => {
		livesLeftCounter = defaultLives;
		let markup = `
        <p class="hangman__stats">Lives: <span class="lives-counter">${livesLeftCounter}</span></p>
        <h1 class="hangman__title">Hangman</h1>
        <canvas class="hangman__board">
        </canvas>
        <div class="hangman__word">
            ${guessingWord.join(" ")}
        </div>
        <p class="hangman__instructions">Pick an alphabet below to guess the whole word.</p>
        <ul class="hangman__letters">
            <li class="hangman__letter">a</li>
            <li class="hangman__letter">b</li>
            <li class="hangman__letter">c</li>
            <li class="hangman__letter">d</li>
            <li class="hangman__letter">e</li>
            <li class="hangman__letter">f</li>
            <li class="hangman__letter">g</li>
            <li class="hangman__letter">h</li>
            <li class="hangman__letter">i</li>
            <li class="hangman__letter">j</li>
            <li class="hangman__letter">k</li>
            <li class="hangman__letter">l</li>
            <li class="hangman__letter">m</li>
            <li class="hangman__letter">n</li>
            <li class="hangman__letter">o</li>
            <li class="hangman__letter">p</li>
            <li class="hangman__letter">q</li>
            <li class="hangman__letter">r</li>
            <li class="hangman__letter">s</li>
            <li class="hangman__letter">t</li>
            <li class="hangman__letter">u</li>
            <li class="hangman__letter">v</li>
            <li class="hangman__letter">w</li>
            <li class="hangman__letter">x</li>
            <li class="hangman__letter">y</li>
            <li class="hangman__letter">z</li>
        </ul>
        <button class="button hangman__trigger">Main Menu</button>
        `;
		$hangmanContainer.innerHTML = markup;
	};
	const renderCanvas = () => {
		const $hangmanCanvas = document.querySelector("canvas");
		Board.render($hangmanCanvas, livesLeftCounter);
	};
	const addListeners = () => {
		const $mainMenuButton = document.querySelector(".hangman__trigger");
		const $hangmanLetters = document.querySelectorAll(".hangman__letter");

		$mainMenuButton.addEventListener("click", () => {
			Home.init();
			Sounds.click.play();
		});
		$hangmanLetters.forEach((letter, index) => {
			letter.addEventListener("click", () => {
				const letter = event.target;
				if (isnotClicked(letter)) {
					toggleLetter(letter);
					checkAnswer(letter);
				}
			});
		});
	};
	const getRandomIndex = (array) => {
		return Math.floor(Math.random() * array.length);
	};
	const toggleLetter = (letter) => {
		Sounds.click.play();
		letter.classList.add("hangman__letter--active");
	};
	const isnotClicked = (letter) => {
		if (letter.matches(".hangman__letter--active")) {
			return false;
		}
		return true;
	};
	const checkAnswer = (letter) => {
		const $hangmanWord = document.querySelector(".hangman__word");
		const letterLowerCased = letter.innerText.toLowerCase();
		const $livesCounter = document.querySelector(".lives-counter");

		if (randomWord.includes(letterLowerCased)) {
			updateHangmanWord(letterLowerCased, $hangmanWord);
		} else {
			updateLivesCounter($livesCounter);
			renderCanvas();
		}
	};

	const updateHangmanWord = (letter, $hangmanWord) => {
		const letterIndex = randomWord.indexOf(letter);
		guessingWord[letterIndex] = randomWord[letterIndex];

		if (guessedWord()) {
			Sounds.win.play();
			ResultsScreen.init("won", randomWord);
		}
		replaceDomElement($hangmanWord, guessingWord.join(" "));
	};
	const updateLivesCounter = ($livesCounter) => {
		livesLeftCounter -= 1;
		if (livesLeftCounter < 1) {
			Sounds.lose.play();
			ResultsScreen.init("lose", randomWord);
		}
		replaceDomElement($livesCounter, livesLeftCounter);
	};
	const guessedWord = () => {
		return guessingWord.toString() === randomWord.toString();
	};
	const replaceDomElement = (element, value) => {
		element.innerHTML = value;
	};
	return {
		init,
	};
})();
export default Game;
