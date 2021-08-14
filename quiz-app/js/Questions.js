export default class Question {
    constructor (question, choices, answerKey) {
        this.question = question;
        this.choices = choices;
        this.answerKey = answerKey;
    }
    isCorrect (answer) {
        
        return this.choices.indexOf(answer) === this.answerKey;
    }
}

