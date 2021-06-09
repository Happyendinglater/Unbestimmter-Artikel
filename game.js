const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Julia ist im Kaufhaus. Ein Heft kostet drei Euro. Ein Kuli kostet einen Euro. Julia gibt dem Verkäufer fünf Euro. Was stimmt?",
        choice1: "Julia hat noch 5 Euro.",
        choice2: 'Julia hat noch einen Euro.  ',
        choice3: 'Julia hat noch 4 Euro.',
        
        answer: 2,
    },
    {
        question: "Frau Eisler hängt vier Bilder an die Wand. Eins ist ein Bild von ihrem Sohn. Ein Bild ist von ihrer Tochter. Eins ist von ihrem Mann. Und das vierte Bild ist von ihren Eltern. Was stimmt?",
        choice1: "Sie hat ein Bild von ihrern Geschwistern.",
        choice2: "Zwei Bilder sind von ihren Kindern. ",
        choice3: "Keine Bilder sind von ihrer Familie.",
        
        answer: 2,
    },
    {
        question: "In ihrem Rucksack hat Silvia zwei Bücher, ein Heft, zwei Kulis und einen Bleistift. Was stimmt?",
        choice1: "Silvia hat drei Stifte.",
        choice2: "Silvia hat keine Stifte.",
        choice3: "Silvia hat einen Stift.",
        
        answer: 1,
    },
    {
        question: "Das Zimmer hat drei Fenster. Herr Dankwart macht ein Fenster auf.",
        choice1: "Keine Fenster sind geschlossen. ",
        choice2: "Kein Fenster ist offen.",
        choice3: "Ein Fenster ist offen.",
        
        answer: 3,
    },
    {
        question: "Robert hat zwei Computer, einen alten und einen neuen. Er verkauft seinem Freund Antonio den alten Computer. Was stimmt?",
        choice1: "Robert hat noch einen Computer. ",
        choice2: "Antonio hat den neuen Computer.",
        choice3: "Robert hat keinen Computer.",
        
        answer: 1,
    },
    {
        question: "Der Deutschkurs hat 14 Studenten und 12 Studentinnen. Der Seminarraum für Deutsch hat 24 Stühle. Was stimmt?",
        choice1: "Der Raum braucht noch zwei Stühle. ",
        choice2: "Der Raum hat schon genug Stühle.",
        choice3: "Der Raum hat zwei mehr Stühle als Studenten und Studentinnen.",
        
        answer: 1,
    },
    {
        question: "Das ist _____ Krokodil. _____ Das krokodil lebt in Brasilien. ",
        choice1: "ein, das",
        choice2: "Ein, der",
        choice3: "ein, Das",
        
        answer: 3,  
    },
    {
        question: "Dort steht _____ Giraffe. _____ Giraffe hat einen langen Hals. ",
        choice1: "Die, Eine",
        choice2: "Eine, die",
        choice3: "eine, Die",
        
        answer: 3,
    },
    {
        question: "Hier ist _____ ein Löwe. _____ Löwe hat große Zähne.",
        choice1: "ein, Der",
        choice2: "Ein, Der",
        choice3: "Eine, eine ",
        
        answer: 1,
    },
    {
        question: "Das ist _____ Schlange. _____ Schlange ist giftig. ",
        choice1: "Eine, Die",
        choice2: "Die, die",
        choice3: "eine, Die",
        
        answer: 3,
    },
    {
        question: "Ein Auto ist _____ Tier.",
        choice1: "ein",
        choice2: "eine",
        choice3: "kein",
        
        answer: 3,
    },
    {
        question: "Arzt und Aphotheker sind ____Berufe. ",
        choice1: "eine",
        choice2: "ein",
        choice3: "–",
        
        answer: 3,
    },
    {
        question: "Der Pazifik ist _____ Fluss. ",
        choice1: "Kein",
        choice2: "kein",
        choice3: "Keine",
        
        answer: 2,
    },
    {
        question: "Die Himalaya und die Anden sind _____ Inseln. ",
        choice1: "keiner",
        choice2: "keinem ",
        choice3: "keine",
        
        answer: 3,
    },
    {
        question: "Sommer ist _____ Jahreszeit. ",
        choice1: "eine",
        choice2: "einen",
        choice3: "Eine",
        
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

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
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
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

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
