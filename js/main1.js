const questions = [
    {
        question: "¿Cual de estos animales tiene la picadura más dolorosa?",
        answers: [
            {text:"Araña Lobo", correct: false},
            {text:"Avispa Japonesa", correct: false},
            {text:"Abeja", correct: false},
            {text:"Hormiga Bala", correct: true},
        ]
    },
    {
        question: "¿Cual de estos animales no pone huevos?",
        answers: [
            {text:"Tiburon", correct: false},
            {text:"Ornitorrinco", correct: false},
            {text:"Perros", correct: true},
            {text:"equidna", correct: false},
        ]
    },
    {
        question: "¿Cual de estos animales es más rapido?",
        answers: [
            {text:"Halcón Peregrino", correct: true},
            {text:"Halcón gerifalte", correct: false},
            {text:"Guepardo", correct: false},
            {text:"Colibri", correct: false},
        ]
    },
    {
        question: "¿Cual de estos animales ya se ha extinto?",
        answers: [
            {text:"Oso polar", correct: false},
            {text:"Paloma pasajera", correct: true},
            {text:"Lince ibérico", correct: false},
            {text:"Oso panda", correct: false},
        ]
    }
];

const  questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // indice del cuestionario
let score = 0;

const miformulario = document.querySelector('#formularios');

function IngresaNombre(e){
    e.preventDefault();
    let formulario = e.target;
    console.log(formulario.children[0].value);
    localStorage.setItem('nombre',formulario.children[0].value);
}

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Siguiente";
    miformulario.addEventListener('submit',IngresaNombre);
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1 //aumentar num de la pregunta;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    document.querySelector('#res').innerHTML= "<strong></strong>"; //sobre escribir el Div dinámico para que se resetee a vacio
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

        document.querySelector('#res').innerHTML= "<strong>Excelente</strong>"; //escribir en el div dinámico
    }else{
        selectedBtn.classList.add("incorrect");
        document.querySelector('#res').innerHTML= "<strong>Puedes hacerlo mejor</strong>"; //escribir en el div dinámico
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Tu puntaje es ${score} de ${questions.length}`;
    nextButton.innerHTML = "Juega Otra vez";
    //--------------
    dummy=localStorage.getItem('nombre');
    document.querySelector('#res').innerHTML= `<br></br><strong>Muy bien ${dummy} , has terminado el juego</strong>`
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

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
