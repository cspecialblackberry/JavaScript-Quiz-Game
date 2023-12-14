// GIVEN I am taking a code quiz

// WHEN I click the start button
// THEN a timer starts and I am presented with a question

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score

const startButton = document.querySelector('#startButton')
console.log(startButton)
let timer = document.querySelector('#timer')
console.log(timer)
let question = document.querySelector('#question')
console.log(question)
let answerOne = document.querySelector('#answerOne')
console.log(answerOne)
let answerTwo = document.querySelector('#answerTwo')
console.log(answerTwo)
let answerThree = document.querySelector('#answerThree')
console.log(answerThree)
let answerFour = document.querySelector('#answerFour')
console.log(answerFour)
const answerList = document.querySelector('#answerList')
console.log(answerList)
let answerIndicator = document.querySelector('#answerIndicator')
console.log(answerIndicator)

const questions = [
    {
        question: "Which of the following is not a Javascript data type?",
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
        question: "Which of the following is not a Javascript data type?",
        answer1: "string",
        answer2: "boolean",
        answer3: "conditional statement",
        answer4: "number",
        correctAnswer: "conditional statement"
    },

    {
        question: "Which of the following is not a Javascript data type?",
        answer1: "string",
        answer2: "boolean",
        answer3: "conditional statement",
        answer4: "number",
        correctAnswer: "conditional statement"
    }

]

let timerIndex = 60
let currentIndex = 0

const runGame = (event) => {
    event.preventDefault()
    timerIndex = 60
    currentIndex = 0
    timer.textContent = timerIndex
    const runTimer = () => {
        if (currentIndex >= questions.length) {
            clearInterval()
        } else if (timerIndex > 0) {
            timerIndex--
            timer.textContent = timerIndex
        }
        else {
            clearInterval()
            timer.textContent = "Ran out of time, try again!"
        }
    }

    setInterval(runTimer, 1000);


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
        console.log(event.target.textContent)
        console.log(questions[currentIndex].correctAnswer)

        if (event.target.textContent === questions[currentIndex].correctAnswer) {
            answerIndicator.textContent = "Correct!"
            timerIndex += 5
            currentIndex++
            cycleQuestions()
        } else {
            timerIndex -= 10
            answerIndicator.textContent = "Incorrect!"
        }
    }


    answerList.addEventListener('click', checkAnswer)
}

startButton.addEventListener('click', runGame)