// when the user hits next
    // i want to get the the user's choice
        // if there's no choice: alert("you need to pick an option");
        // call quiz.guess(userGuess)
            // if currentQuestion.isCorrect(answer)
                // update Quiz.score
            // update Quiz.currentIndex --> nextQuestion();

    // i want to replace cachedELs with Els from the new question(object)
        // question
        // tracker
        // innerProgressEl
        // maybe the tagline
        // choices

    // i want to replace all elements with the new from the next question
        // change quizQuestionEl
            //
        // change "nth of nQuestions" in the html
            // trackerEl.innerText = `${currentIndex+1} of ${quiz.questions.length}`
        // i want to increase the progress bar by (100 / nQuestions)%
            // let width = 0;
            // let widthIncrease = 100 / quiz.questions.length
            // innerProgressEl.style.width = `${width + widthIncrease}%`;
        // change the choices for those of the new question
            // choicesEl.map(
            //     (choice, index) => {
            //         console.log(choice.innerText, ", before");
            //         choice.innerHTML = "<i></i>" + currentQuestion.choices[index];
            //     }
            // )
        // When User submits last question
            // Change tagline for "Well done" or smth

// When the user hits the restart button
    // All El on page will be changed for those of q1
