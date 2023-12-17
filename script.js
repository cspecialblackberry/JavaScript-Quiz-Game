// GIVEN I am taking a code quiz

// WHEN I click the start button
// THEN a timer starts and I am presented with a question DONE

// WHEN I answer a question
// THEN I am presented with another question DONE

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock DONE 

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

const startButton = document.querySelector('#startButton')
const buttonSection = document.querySelector('#button-section')
let timer = document.querySelector('#timer')
let question = document.querySelector('#question')
let answerOne = document.querySelector('#answerOne')
let answerTwo = document.querySelector('#answerTwo')
let answerThree = document.querySelector('#answerThree')
let answerFour = document.querySelector('#answerFour')
let answerList = document.querySelector('#answerList')
let answerIndicator = document.querySelector('#answerIndicator')
let initials = document.querySelector('#initials')
let score = document.querySelector('#score')
const initialsInput = document.createElement('input')
initialsInput.setAttribute('class', 'initials-input')
initialsInput.textContent = "Enter your initials!"
const initialsInputButton = document.createElement('button')
initialsInputButton.textContent = 'Submit'
initialsInputButton.setAttribute('class', 'initials-input-button')

//check if the user has a score in local storage and puts it on the page if so
if (localStorage.getItem('initials') && localStorage.getItem('score')) {
    initials.textContent = ("Initials= " + localStorage.getItem('initials'))
    score.textContent = ("Score= " + localStorage.getItem('score'))
}

//question array
const questions = [
    {
        question: "Which of the following is NOT a Javascript data type?",
        answer1: "string",
        answer2: "boolean",
        answer3: "conditional statement",
        answer4: "number",
        correctAnswer: "conditional statement",
    },

    {
        question: "How many items can be stored in an array?",
        answer1: "10",
        answer2: "as many as there are when it is first initialized",
        answer3: "25",
        answer4: "any number",
        correctAnswer: "any number",
    },

    {
        question: "Which variable type can not be changed?",
        answer1: "var",
        answer2: "const",
        answer3: "let",
        answer4: "log",
        correctAnswer: "const"
    },

    {
        question: "Which of the following is NOT a comparison operator?",
        answer1: "<=",
        answer2: "||",
        answer3: "===",
        answer4: ">",
        correctAnswer: "||"
    },

    {
        question: "What kind of objects allow us to call upon a block of code to perform a certain task anywhere in our code?",
        answer1: "method",
        answer2: "function",
        answer3: "boolean",
        answer4: "forEach",
        correctAnswer: "function",
    },

    {
        question: "What can we use to perform a task a set number of times",
        answer1: "return",
        answer2: "object",
        answer3: "function",
        answer4: "for-loop",
        correctAnswer: "for-loop",
    },

]

let timerIndex = 60
let currentIndex = 0

//resets all variables to their default and calls the first game function. Also removes input box if user didn't
//input their score.
const runGame = (event) => {
    event.preventDefault()
    timerIndex = 60
    currentIndex = 0
    timer.textContent = timerIndex
    answerIndicator.textContent = ""
    answerList.removeAttribute("class", "hide-answer-list")
    answerIndicator.removeAttribute("class", "hide-answer-list")
    if(buttonSection.children.length===4){
        buttonSection.removeChild(initialsInput)
        buttonSection.removeChild(initialsInputButton)
    }


    //removes question list and posts congratulation or loss messages when the game is ended.
    const removeContent = () => {
        answerList.setAttribute('class', 'hide-answer-list')
        answerIndicator.setAttribute('class', 'hide-answer-list')
        if (currentIndex >= questions.length) {
            timer.textContent = "You win!"
            question.textContent = "Congratulations, you conquered the Javascript Brain Trip! Enter your initials again to save your score. Hit the start button again to try and beat your score!"
        } else {
            question.textContent = "You, ran out of time, click the start button to try again!"
            timer.textContent = "Ran out of time, try again!"
        }
    }

    //puts score in local storage and puts it to the page.
    const setScore = (event) => {
        event.preventDefault()
        localStorage.setItem("initials", initialsInput.value)
        localStorage.setItem("score", timerIndex)
        initials.textContent = ("Initials= " + localStorage.getItem('initials'))
        score.textContent = ("Score= " + localStorage.getItem('score'))
        buttonSection.removeChild(initialsInput)
        buttonSection.removeChild(initialsInputButton)
    }

    //ends the timer, removes event listeners from the answer list and adds an input box if the user won.
    const endGame = () => {
        clearInterval(timerFunction)
        if (currentIndex >= questions.length) {
            buttonSection.appendChild(initialsInput)
            buttonSection.appendChild(initialsInputButton)
            initialsInputButton.addEventListener('click', setScore)
        }
        removeContent()
        answerList.removeEventListener('click', checkAnswer)
        answerList.removeEventListener('touch', checkAnswer)
    }

    //decrements the timer if it is above zero, ends the game otherwise.
    const runTimer = () => {
        if (timerIndex > 0) {
            timerIndex--
            timer.textContent = timerIndex
        } else {
            endGame()
        }
    }

    const timerFunction = setInterval(runTimer, 1000);

    //checks if the user has completed all questions, if they have ends the game if not, cycles to the next question.
    const cycleQuestions = () => {
        if (currentIndex >= questions.length) {
            endGame()
            return
        }
        question.textContent = questions[currentIndex].question
        answerOne.textContent = questions[currentIndex].answer1
        answerTwo.textContent = questions[currentIndex].answer2
        answerThree.textContent = questions[currentIndex].answer3
        answerFour.textContent = questions[currentIndex].answer4
    }

    //compares the selected answer to the correct answer, if it is correct increments the question index and calls
    //to cycle questions, if incorrect subtracts ten seconds from the game timer.
    const checkAnswer = (event) => {
        event.preventDefault()
        if (event.target.textContent === questions[currentIndex].correctAnswer) {
            answerIndicator.textContent = "Correct!"
            currentIndex++
            cycleQuestions()
        } else {
            timerIndex -= 10
            answerIndicator.textContent = "Incorrect!"
        }
    }

    //adds event listeners to the answer list and calls to cycle to the first question.
    const addClicks = () => {
        answerList.addEventListener('click', checkAnswer,)
        answerList.addEventListener('touch', checkAnswer,)
        cycleQuestions()
    }

    addClicks()

}

startButton.addEventListener('click', runGame)
startButton.addEventListener('touch', runGame)