import Game from "./game.js";
import How from "./how.js";
import {sound} from "../data/sound.js"

const Home = ( _ => {
    // Fetching data    
    const $hangman = document.querySelector(".hangman__container");
    const init = () => {
        render();
        addListeners();
    }
    const render = () => {
        let markup = ``;
        markup += `
            <h1 class="hangman__title">HANGMAN</h1>
            <button class="button start">New Game</button>
            <button class="button instructions">Instructions</button>
        `
        $hangman.innerHTML = markup;
    }
    const addListeners = () => {
        const newGameButtonEl = document.querySelector(".button.start");
        const instructionsButtonEl = document.querySelector(".button.instructions");
        newGameButtonEl.addEventListener("click", _ => {
            Game.init();
            sound.click.play();
        });
        instructionsButtonEl.addEventListener("click", _ => {
            How.init();
            sound.click.play();
        } );
    }
    return {
        init,
    }
})();

export default Home;