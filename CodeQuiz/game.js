const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '99',
        choice4: '7',
        answer: 2, 
    },
    {
        question: 'What is the capital city of the state of California?',
        choice1: 'Sacramento',
        choice2: 'San Francisco',
        choice3: 'Los Angles',
        choice4: 'Methdesto',
        answer: 1, 
    },
    {
        question: 'What is the name of the first person to land on the moon?',
        choice1: 'Donald Trump',
        choice2: 'Oprah Winfrey',
        choice3: 'Neil Armstrong',
        choice4: 'Bill Nye Da MF Science Guy',
        answer: 3, 
    },
    {
        question: 'Where is the tallest building in the world located?',
        choice1: 'New York',
        choice2: 'Toyoko',
        choice3: 'Seattle',
        choice4: 'Dubai',
        answer: 4, 
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.getElementsByClassName.width = '${(questionCounter/MAX_QUESTIONS) * 100}%'

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question 

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000) 
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()