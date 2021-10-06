import ViewConstructor from "/quiz-app-v2/js/utils/ViewConstructor.js";

export default class extends ViewConstructor {
    constructor () {
        super();
    }
     getHTML () {
        return `
        <main class="quiz">
            <div class="quiz__header">
                <h1 class="quiz__question">
                   
                </h1>
                <p class="quiz__current-question"></p>
                <div class="quiz__progress-bar">
                    <div class="quiz__progress-bar__inner"></div>
                </div>
                <p class="quiz__tagline"></p>
            </div>
            <div class="quiz__body">
                <ul class="quiz__choices-container">
                    <li class="quiz__choice">
                        <input
                            type="radio"
                            name="choice"
                            id="choice0"
                            class="quiz__input"
                        />
                        <label for="choice0" class="quiz__label">
                            <i></i></label
                        >
                    </li>
                    <li class="quiz__choice">
                        <input
                            type="radio"
                            name="choice"
                            id="choice1"
                            class="quiz__input"
                        />
                        <label for="choice1" class="quiz__label">
                            <i></i></label
                        >
                    </li>
                    <li class="quiz__choice">
                        <input
                            type="radio"
                            name="choice"
                            id="choice2"
                            class="quiz__input"
                        />
                        <label for="choice2" class="quiz__label">
                            <i></i></label
                        >
                    </li>
                    <li class="quiz__choice">
                        <input
                            type="radio"
                            name="choice"
                            id="choice3"
                            class="quiz__input"
                        />
                        <label for="choice3" class="quiz__label"> <i></i></label>
                    </li>
                </ul>
            </div>
            <div class="quiz__footer">
                <button class="button button--bordered next">Next</button>
                <button class="button button--bordered restart">Restart</button>
            </div>
        </main>
        <div class="modal">
			<div class="modal__content">
				<div class="modal__header">
					<button class="modal__close-icon">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<div class="modal__body">
					<h3 class="modal__message">You must pick an answer first</h3>
					<button class="modal__button">Close</button>
				</div>
			</div>
		</div>
        `
    }
}