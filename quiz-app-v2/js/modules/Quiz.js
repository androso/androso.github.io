import Quiz from "/quiz-app-v2/js/utils/Quiz-constructor.js";
import Question from "/quiz-app-v2/js/utils/Questions-constructor.js";
import GameScreen from "/quiz-app-v2/js/views/Game-screen.js";
import { renderCustomizeMenu } from "/quiz-app-v2/js/modules/Customize.js";

const $appContainer = document.querySelector(".app");
let quiz;
let progressBarWidth = 0;

export const renderQuiz = (numberOfQuestions, categoryId, difficulty) => {
	getQuestionsData(numberOfQuestions, categoryId, difficulty);
};

const loadHTML = () => {
	const gameView = new GameScreen();
	$appContainer.innerHTML = gameView.getHTML();
};

const addListeners = () => {
	const $nextButton = document.querySelector(".button.next");
	const $restartButton = document.querySelector(".button.restart");
	const $modalContainer = document.querySelector(".modal");

	$modalContainer.addEventListener("click", (event) => {
		closeModal(event, $modalContainer);
	});
	$nextButton.addEventListener("click", checkAnswer);
	$restartButton.addEventListener("click", renderCustomizeMenu);
};
const closeModal = (event, $modalContainer) => {
	if (
		event.target.matches(".modal__message") ||
		event.target.matches(".modal__body")
	) {
		return false;
	}
	$modalContainer.classList.toggle("show");
};

const checkAnswer = () => {
	const $checkedLabel = document.querySelector(".quiz__input:checked + label");
	const $alertModal = document.getElementsByClassName("modal")[0];

	if (!$checkedLabel) {
		$alertModal.classList.toggle("show");
		return false;
	}
	const answer = $checkedLabel.innerText;
	quiz.guess(answer);
	renderNewQuestion(quiz);
};

const getQuestionsData = async (numberOfQuestions, categoryId, difficulty) => {
	const $spinnerContainer = document.querySelector(".spinner-container");
	const reqLink = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

	$spinnerContainer.classList.toggle("spinner-container--active");
	const questionsData = await (await fetch(reqLink)).json();
	$spinnerContainer.classList.toggle("spinner-container--active");

	const questions = questionsData.results.map((questionObject) => {
		const question = questionObject.question;
		const wrongChoices = questionObject.incorrect_answers;
		const correctChoice = questionObject.correct_answer;
		const allChoices = shuffle([...wrongChoices, correctChoice]);
		return new Question(question, allChoices, correctChoice);
	});

	quiz = new Quiz(questions);
	loadHTML();
	addListeners();
	renderNewQuestion(quiz);
};
const shuffle = (array) => {
	let currentIndex = array.length;
	let randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
	return array;
}
const renderNewQuestion = (quiz) => {
	const $quizQuestion = document.querySelector(".quiz__question");
	const $tracker = document.querySelector(".quiz__current-question");
	const $tagline = document.querySelector(".quiz__tagline");
	let $choices = Array.from(document.querySelectorAll(".quiz__label"));
	const $checkedInput = document.querySelector(".quiz__input:checked");
	const currentQuestion = quiz.getCurrentQuestion();
	const currentQuestionIndex = quiz.getCurrentIndex();
	const $nextButton = document.querySelector(".button.next");

	if (quiz.hasEnded()) {
		//Render results screen
		$quizQuestion.innerText = "Geat Job!";
		const finalScore = Math.floor((quiz.score * 100) / quiz.questions.length);
		$tracker.innerText = `Your final score: ${finalScore}%`;
		$tagline.innerText = "Completed!";
		$nextButton.style.display = "none";
		progressBarWidth = 0;
		return true;
	}

	if ($checkedInput) $checkedInput.checked = false;
	$quizQuestion.innerHTML = currentQuestion.question;
	$tracker.innerText = `${currentQuestionIndex} of ${quiz.questions.length}`;
	incrementProgressBar();
	$tagline.innerText = `Pick and option from below !`;
	$choices.map(($choice, index) => {
		$choice.innerHTML = `<i></i>${currentQuestion.choices[index]}`;
	});
};

const incrementProgressBar = () => {
	const $innerProgressBar = document.querySelector(".quiz__progress-bar__inner");
	const increaseBarWidth = 100 / quiz.questions.length;
	progressBarWidth+= increaseBarWidth;
	$innerProgressBar.style.width = `${progressBarWidth}%`;
}
