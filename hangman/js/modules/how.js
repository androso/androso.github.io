import Home from "./home.js";
import {sound as Sounds} from "../data/sound.js";
const How = (() => {
    const $hangman = document.querySelector(".hangman__container");
    const init = () => {
        render();
        addListeners();
    }
    const render = () => {
        let markup = `
            <h1 class="hangman__title">INSTRUCTIONS</h1>
            <ul class="how">
                <li>Here are the instructions for Hangman!!</li>
                <li>When you start a new game, the machine will automatically pick a super random word 🙄</li>
                <li>Your job is to guess that word by guessing one letter at a time</li>
                <li>If you succesfully guess the world within 7 tries, you would've saved the world!</li>
                <li>But if you loose i hope you'd had a good life, say goodbye to everyone 👻</li>
            </ul>
            <button class="button hangman__trigger">Main Menu</button>
        `  
        $hangman.innerHTML = markup;
    }
    const addListeners = () => {
        const $hangmanTrigger = document.querySelector(".hangman__trigger");
        $hangmanTrigger.addEventListener ("click", () => {
            Home.init();
            Sounds.click.play();
        });
    }
    return {
        init,
    }
})();
export default How;