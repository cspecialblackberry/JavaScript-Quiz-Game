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
const answerList = document.querySelector('#answerList')
let answerIndicator = document.querySelector('#answerIndicator')
let initials = document.querySelector('#initials')
let score = document.querySelector('#score')
const initialsInput = document.createElement('input')
initialsInput.setAttribute('class', 'initials-input')
const initialsInputButton = document.createElement('button')
initialsInputButton.textContent = 'submit'
initialsInputButton.setAttribute('class', 'initials-input-button')

if (localStorage.getItem('initials') && localStorage.getItem('score')){
    initials.textContent = ("Initials= " + localStorage.getItem('initials'))
    score.textContent = ("Score= " + localStorage.getItem('score'))
}

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
        correctAnswer: "any number"
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
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: "",
    },

    {
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: "",
    },

]

let timerIndex = 60
let currentIndex = 0
let finalScore = 0

const runGame = (event) => {
    event.preventDefault()
    timerIndex = 60
    currentIndex = 0
    timer.textContent = timerIndex
    answerIndicator.textContent = ""


    const endGame = () => {
        finalScore = timerIndex
        console.log(finalScore)
        localStorage.setItem("score", finalScore)
        buttonSection.appendChild(initialsInput)
        buttonSection.appendChild(initialsInputButton)
        const setInitials = (event) => {
            event.preventDefault()
            console.log(initialsInput.value)
            localStorage.setItem("initials", initialsInput.value)
            initials.textContent = ("Initials= " + localStorage.getItem('initials'))
            score.textContent = ("Score= " + localStorage.getItem('score'))
        }
        initialsInputButton.addEventListener('click', setInitials)
    }

    const runTimer = () => {
        if (currentIndex >= questions.length) {
            endGame()
            clearInterval(timerFunction)
        } else if (timerIndex > 0) {
            timerIndex--
            timer.textContent = timerIndex
        }
        else {
            clearInterval(timerFunction)
            timer.textContent = "Ran out of time, try again!"
        }
    }

    const timerFunction = setInterval(runTimer, 1000);


    const cycleQuestions = () => {
        if (currentIndex >= questions.length) {
            timer.textContent = "You win!"
            runTimer()
            return
        }
        question.textContent = questions[currentIndex].question
        answerOne.textContent = questions[currentIndex].answer1
        answerTwo.textContent = questions[currentIndex].answer2
        answerThree.textContent = questions[currentIndex].answer3
        answerFour.textContent = questions[currentIndex].answer4
    }

    cycleQuestions()

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


    answerList.addEventListener('click', checkAnswer)
    answerList.addEventListener('touch', checkAnswer)
}

startButton.addEventListener('click', runGame)