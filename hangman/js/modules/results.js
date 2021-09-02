import Home from "./home.js";
import {sound as Sounds}  from "../data/sound.js";
const ResultsScreen = (() => {
	const init = (result = "lose", randomWord) => {
		renderScreen(result, randomWord);
        addListeners();
	};
    const renderScreen = (result, randomWord) => {
        const $hangmanContainer = document.querySelector(".hangman__container");
		let markup = `
        <h1 class="hangman__title">game over</h1>
        <h3 class="result">You ${result !== 'lose' ? 'WON' : 'LOSE'}!</h3>
        <h3 class="result">The word is ${randomWord.join("").toUpperCase()}.</h3>
        <button class="button hangman__trigger">Main Menu</button>
        `;
        $hangmanContainer.innerHTML = markup;   
    }
    const addListeners = () => {
        const $restartButton = document.querySelector(".hangman__trigger");
        $restartButton.addEventListener("click", () => {
            Home.init(); 
            Sounds.click.play();
        })
    }

	return {
		init,
	};
})();

export default ResultsScreen;
