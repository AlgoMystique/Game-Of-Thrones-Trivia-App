
const questions = [
    {
        question: "Who is known as the 'Mother of Dragons'?",
        answers: [
            { text: "Cersei Lannister", correct: false },
            { text: "Sansa Stark", correct: false },
            { text: "Daenerys Targaryen", correct: true },
            { text: "Arya Stark", correct: false },
        ]
    },
    {
        question: "What is the name of Jon Snow's direwolf?",
        answers: [
            { text: "Ghost", correct: true },
            { text: "Nymeria", correct: false },
            { text: "Summer", correct: false },
            { text: "Shaggydog", correct: false },
        ]
    },
    {
        question: "What is the motto of House Stark?",
        answers: [
            { text: "Fire and Blood", correct: false },
            { text: "Ours is the Fury", correct: false },
            { text: "Winter is Coming", correct: true },
            { text: "Hear Me Roar", correct: false },
        ]
    },
    {
        question: "Who killed the Night King?",
        answers: [
            { text: "Jon Snow", correct: false },
            { text: "Arya Stark", correct: true },
            { text: "Daenerys Targaryen", correct: false },
            { text: "Bran Stark", correct: false },
        ]
    },
    {
        question: "What metal is used to kill White Walkers?",
        answers: [
            { text: "Valyrian Steel", correct: true },
            { text: "Iron", correct: false },
            { text: "Gold", correct: false },
            { text: "Bronze", correct: false },
        ]
    },
    {
        question: "Who sat on the Iron Throne at the end of the series?",
        answers: [
            { text: "Jon Snow", correct: false },
            { text: "Bran Stark", correct: true },
            { text: "Daenerys Targaryen", correct: false },
            { text: "Tyrion Lannister", correct: false },
        ]
    },
    {
        question: "What is the name of Arya Stark's sword?",
        answers: [
            { text: "Ice", correct: false },
            { text: "Needle", correct: true },
            { text: "Longclaw", correct: false },
            { text: "Oathkeeper", correct: false },
        ]
    },
    {
        question: "What is the capital of the Seven Kingdoms?",
        answers: [
            { text: "Winterfell", correct: false },
            { text: "King's Landing", correct: true },
            { text: "The Eyrie", correct: false },
            { text: "Casterly Rock", correct: false },
        ]
    },
    {
        question: "Who is the father of Joffrey Baratheon?",
        answers: [
            { text: "Stannis Baratheon", correct: false },
            { text: "Robert Baratheon", correct: false },
            { text: "Jaime Lannister", correct: true },
            { text: "Eddard Stark", correct: false },
        ]
    },
    {
        question: "What is the ancestral home of House Lannister?",
        answers: [
            { text: "Highgarden", correct: false },
            { text: "Riverrun", correct: false },
            { text: "Casterly Rock", correct: true },
            { text: "Dragonstone", correct: false },
        ]
    },
    {
        question: "Who was the first character to kill a White Walker?",
        answers: [
            { text: "Samwell Tarly", correct: true },
            { text: "Jon Snow", correct: false },
            { text: "Tormund Giantsbane", correct: false },
            { text: "Arya Stark", correct: false },
        ]
    },
    {
        question: "Who created the Night King?",
        answers: [
            { text: "The Children of the Forest", correct: true },
            { text: "The First Men", correct: false },
            { text: "The White Walkers", correct: false },
            { text: "The Targaryens", correct: false },
        ]
    },
    {
        question: "What is the real name of Jon Snow?",
        answers: [
            { text: "Aegon Targaryen", correct: true },
            { text: "Rhaegar Targaryen", correct: false },
            { text: "Eddard Stark", correct: false },
            { text: "Torrhen Stark", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

document.getElementById('unmuteButton').addEventListener('click', function() {
    const audio = document.getElementById('audio');
    
    // Unmute and play the audio
    audio.muted = false;
    audio.play();
  });
  
  
startQuiz();