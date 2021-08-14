import Question from "./Questions.js";
import Quiz from "./Quiz.js";

//--------DOM interaction--------//
const App = (() => {
	//Caching the DOM (getting the el we're gonna use)
	const quizEl = document.querySelector(".quiz");
	const quizQuestionEl = document.querySelector(".quiz__question");
	const trackerEl = document.querySelector(".quiz__current-question");
	const taglineEl = document.querySelector(".quiz__tagline");
	let choicesEl = Array.from(document.querySelectorAll(".quiz__label"));
	const innerProgressEl = document.querySelector(".quiz__progress-bar__inner");
	const nextButtonEl = document.querySelector(".button.next");
	const restartButtonEl = document.querySelector(".button.restart");

	//---- QUESTIONS (creating the quiz) ----//
	const q1 = new Question(
		"What was the pre-SIXTEEN name of Park Jihyo?",
		["Park Ji-soo", "Park Jin-soo", "Mark Jinroo", "Renata"],
		0
	);
	const q2 = new Question(
		"What's Mina's American name?",
		["Zofia", "Zelenya", "Sharon", "Salma"],
		2
	);
	const q3 = new Question(
		"How many members does Twice have?",
		['10', '8', '4', '9'],
		3
	);
	console.log(q3.isCorrect("9"));
	const q4 = new Question(
		"What is Twice debut song?",
		["Like Ooh-Ahh", "Cry For Me", "One In A Million", "Lovesick Girls"],
		0
	);
	const q5 = new Question(
		"Sana is from",
		["El Salvador", "Mexico", "Korea", "Japan"],
		3
	);
	const q6 = new Question(
		"Why did Jihyo changed her name?",
		[
			"The name was too common in idols",
			"JyP was dumb asf",
			"She didn't like it",
			"It was Chae's idea",
		],
		0
	);

	const quiz = new Quiz([q1, q2, q3, q4, q5, q6]);

	//ProgressBar
	const nQuestions = quiz.questions.length;
	const barWidthIncrease = 100 / nQuestions;
	let barWidth = 0;

	//---- INTERACTING ----//

	nextButtonEl.addEventListener("click", checkAnswer);
	restartButtonEl.addEventListener("click", restart);

	function checkAnswer() {

		// we first get
		let answer = document.querySelector(".quiz__input:checked + label");
		if (!answer) {
			alert("Pick an answer");
			return;
		}
		answer = answer.innerText;
		
		
		
		// we then check
		quiz.guess(answer);
		replaceQuestion();
		

	}
	function replaceQuestion() {
		const inputCheckedEl = document.querySelector(".quiz__input:checked");
		const currentQuestion = quiz.getCurrentQuestion();
		const currentQuestionIndex = quiz.currentIndex + 1;
		barWidth = barWidth + barWidthIncrease;
		
		if (quiz.currentIndex === quiz.questions.length) {
			quizQuestionEl.innerText = "Great Job!";
			const finalScore = Math.floor((quiz.score * 100) / quiz.questions.length);
			trackerEl.innerText = `Your final score: ${finalScore}%`
			innerProgressEl.style.width = `${barWidth}%`;
			taglineEl.innerText = "Completed!"
			nextButtonEl.style.display = "none";
			return;
		}
		inputCheckedEl.checked = false;
		quizQuestionEl.innerText = currentQuestion.question;
		trackerEl.innerText = `${currentQuestionIndex} of ${nQuestions}`;
		innerProgressEl.style.width = `${barWidth}%`;
		choicesEl.map((choice, index) => {
			choice.innerHTML = `<i></i>${currentQuestion.choices[index]}`;
		});

	}
	function restart() {
		quiz.score = 0;
		quiz.currentIndex = 0;
		replaceQuestion();
		barWidth = 0;
		innerProgressEl.style.width = `0%`;
		nextButtonEl.style.display = "block";
		taglineEl.innerText = "Pick an option below!"
	}
})();
