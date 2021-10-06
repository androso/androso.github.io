import ViewConstructor from "/quiz-app-v2/js/utils/ViewConstructor.js";

export default class extends ViewConstructor {
    constructor () {
        super();
    }
     getHTML () {
        return `
        <div class="quiz__customize-container">
				<h1 class="quiz__title">It's Trivia Time!!</h1>
					<div class="quiz__customization">
						<div class="quiz__customize-modal">
							<span class="customize">Customize</span>
						</div>
						<form class="quiz__form">
							<div class="spinner-container">
								<div class="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>	
							<div class="form__input questions-number__container">
								<label for="questions-number">Number of Questions:</label>
								<br />
								<input required max="20" min="1" class="number-input"type="number" id="questions-number" placeholder="1-20" />
								<span class="submit-error">Number must be between 1 and 20</span>
							</div>
							<div class="form__input category__container">
								<label for="category">Select Category</label>
								<br />
								<select required id="category" class="category-select">
									<option value="">Any Category</option>
									<option value="books">Books</option>
									<option value="general knowledge">General knowledge</option>
									<option value="art">Art</option>
									<option value="history">History</option>
									<option value="science">Science</option>
								</select>
							</div>
							<div class="form__input difficulty__container">
								<label for="difficulty">Select Difficulty</label>
								<br>
								<select required id="difficulty" class="difficulty-select">
									<option value="">Any Difficulty</option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
							<button type="submit">START</button>
						</form>
					</div>
				</div>
        `
    }
}