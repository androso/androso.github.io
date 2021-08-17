import Question from "./Questions.js";
import Quiz from "./Quiz.js";

// TODO: Use more functions, make the program more functional and less imperative
// TODO:
//-------- DOM Interaction --------//
const App = (() => {
	const quizQuestionEl = document.querySelector(".quiz__question");
	const trackerEl = document.querySelector(".quiz__current-question");
	const taglineEl = document.querySelector(".quiz__tagline");
	const choicesContainerEl = document.querySelector(".quiz__choices-container");
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
		[10, 8, 4, 9],
		3
	);
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
    const nQuestions = quiz.questions.length;

	const checkAnswer = () => {
		// We first get
		let answer = document.querySelector(".quiz__input:checked");
        if (!answer)  {
            alert("You must pick an option from below!") 
            return false;
        };
        answer = Number(answer.getAttribute("data-order"));
		// We then check
		quiz.guess(answer);
	};
	const listeners = () => {
		nextButtonEl.addEventListener("click", () => {
			checkAnswer();
			renderQuiz();
		});
		restartButtonEl.addEventListener("click", () => {
			quiz.reset();
			currentProgressBarWidth = 0;
            nextButtonEl.style.display = 'block';
			renderQuiz();
		});
	};
    // -------- HELPERS -------- //
	const setValue = (element, value) => {
		element.innerHTML = value;
	};
    const getPercentage = (num1, num2) => {
        return Math.round((num1 / num2) * 100);
    }

	const renderQuestion = () => {
		const question = quiz.getCurrentQuestion().question;
		setValue(quizQuestionEl, question);
	};
	const renderTracker = () => {
		const questionIndex = quiz.currentIndex + 1;
		
		setValue(trackerEl, `${questionIndex} of ${nQuestions}`);
	};

	const increaseProgressPercentage = 100 / nQuestions;
	let currentProgressBarWidth = 0;
	const renderProgressBar = () => {
		if (quiz.currentIndex != 0)
			currentProgressBarWidth += increaseProgressPercentage;
		innerProgressEl.style.width = `${currentProgressBarWidth}%`;
	};

	const renderTagline = () => {
		if (quiz.hasEnded()) {
			setValue(taglineEl, "Completed!");
		} else {
			setValue(taglineEl, "Pick An Option Below!");
		}
	};
	const renderChoices = () => {
		let markup = "";
		const currentChoices = quiz.getCurrentQuestion().choices;
		currentChoices.forEach((element, index) => {
			markup += 
            `
            <li class="quiz__choice">
				<input type="radio" name="choice" data-order="${index}" id="choice${index}" class="quiz__input"/>
                <label for="choice${index}" class="quiz__label">
					<i></i>
                    </span>${element}</span>
                </label>
            </li>
            `;
		});
        setValue(choicesContainerEl, markup);
	};
	const renderResultsScreen = () => {
        const finalScore = `Your final score is ${getPercentage(quiz.score, nQuestions)}%`;
        setValue(quizQuestionEl, "Good Job!!");
        setValue(trackerEl, finalScore);
        renderTagline();
        renderProgressBar();
        nextButtonEl.style.display= "none";
	};
	const renderQuiz = () => {
		if (quiz.hasEnded()) {
			// Render Last Screen
			// We disable the inputs
			renderResultsScreen();
		} else {
			// Render Question
			renderQuestion();
			// Render Tracker
			renderTracker();
			// Render Progress bar
			renderProgressBar();
			// Render Tagline
			renderTagline();
			// Render Choices
			renderChoices();
		}
		// }
	};

	return {
		launch() {
			listeners();
			renderQuiz();
		},
	};
})();

App.launch();
