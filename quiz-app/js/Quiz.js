export default class Quiz {
    constructor (questions) {
        this.questions = questions;
        this.score = 0;
        this.currentIndex = 0;
    }
    getCurrentQuestion () {
        return this.questions[this.currentIndex];
    }
    nextQuestion () {
        this.currentIndex++;
    }
    hasEnded () {
        return this.currentIndex === this.questions.length;
    }
    guess (userGuess) {
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.isCorrect(userGuess)) {
            this.score++
        }
        this.nextQuestion();
    }
}