export default class Question {
    constructor (question, choices, correctAnswer) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    }
    isCorrect (guessingAnswer) {
        return guessingAnswer === this.correctAnswer;
    }
}