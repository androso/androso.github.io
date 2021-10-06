import CustomizeMenu from "/quiz-app-v2/js/views/Customize-menu.js";
// import { renderQuiz } from "/quiz-app-v2/js/modules/uiz.js";
const $appContainer = document.querySelector(".app");
let $questionsNumberInput;
let $submitFormButton;
let $numberInputError;
let $selectCategory;
let $selectDifficulty;
const categories = {
    "general knowledge": 9,
    science: 17,
    "random-category": "",
    books: 10,
    history: 23,
    art: 25
}

export const renderCustomizeMenu = () => {
	if (document.readyState !== "loading") {
		renderHTML();
        addlisteners();
	}
};

const renderHTML = async () => {
	const customizeView = new CustomizeMenu();
	$appContainer.innerHTML = customizeView.getHTML();
    //We cache the dom here because they weren't accesible before
    cacheTheDom();
}; 
const cacheTheDom = () => {
    $questionsNumberInput = document.querySelector(".number-input");
    $submitFormButton = document.querySelector(".quiz__form button");
    $numberInputError = document.querySelector(".submit-error");
    $selectCategory = document.querySelector(".category-select");
    $selectDifficulty = document.querySelector(".difficulty-select");
}

const addlisteners = () => {
    $questionsNumberInput.addEventListener("keydown", getOnlyNumbers);
	$submitFormButton.addEventListener("click", getUserData);
}
const getOnlyNumbers = (event) => {
	if (Number.isNaN(Number(event.key)) && event.key !== "Backspace") {
		event.preventDefault();
	}
	if (event.code === "Enter") {
		getUserData(event);
	}
};
const getUserData = (event) => {
	if (invalidNumber(event)) return false;

	const numberOfQuestions = Number($questionsNumberInput.value);
    const category = $selectCategory.options[$selectCategory.selectedIndex].value;
    const categoryId = !category ? "" : categories[category];
    //if the difficulty the user selected is random, we're gonna send an empty string to the api instead of an id
    const difficulty = $selectDifficulty.options[$selectDifficulty.selectedIndex].value.toLowerCase();
    renderQuiz(numberOfQuestions, categoryId, difficulty);
};
const invalidNumber = (event) => {
	event.preventDefault();
	const numberOfQuestions = Number($questionsNumberInput.value);

	if (numberOfQuestions === 0 || numberOfQuestions > 20) {
		$numberInputError.classList.add("show");
        return true;
	} else {
		$numberInputError.classList.remove("show");
        return false;
	}
};