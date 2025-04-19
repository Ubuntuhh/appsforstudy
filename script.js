// Datos del cuestionario
const quizData = {
    questions: [
        "�Cu�l es la extensi�n de un proyecto de Visual Basic?",
        "�Qu� control se utiliza para mostrar texto que el usuario no puede modificar?",
        "�Qu� instrucci�n se utiliza para declarar una variable en Visual Basic?",
        "�Qu� estructura de control se utiliza para repetir un bloque de c�digo mientras se cumpla una condici�n?",
        "�C�mo se llama el evento que se activa cuando se hace clic sobre un bot�n?"
    ],
    optionsA: [
        ".vbp",
        "TextBox",
        "Dim",
        "If-Then-Else",
        "Click"
    ],
    optionsB: [
        ".exe",
        "Label",
        "Var",
        "For-Next",
        "MouseDown"
    ],
    optionsC: [
        ".vb",
        "Button",
        "Set",
        "Do-Loop",
        "Change"
    ],
    optionsD: [
        ".sln",
        "RichTextBox",
        "Let",
        "Select-Case",
        "MouseClick"
    ],
    correctAnswers: ["A", "B", "A", "C", "A"]
};

// Variables de control
let currentQuestion = 0;
let score = 0;
let totalQuestions = quizData.questions.length;

// Elementos del DOM
const questionElement = document.getElementById('question');
const optionALabel = document.getElementById('labelA');
const optionBLabel = document.getElementById('labelB');
const optionCLabel = document.getElementById('labelC');
const optionDLabel = document.getElementById('labelD');
const progressElement = document.getElementById('progress');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results-container');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartButton = document.getElementById('restart-button');

// Iniciar el cuestionario
loadQuestion(0);

// Funci�n para cargar una pregunta
function loadQuestion(index) {
    // Desmarcar todas las opciones
    document.querySelectorAll('input[name="answer"]').forEach(option => {
        option.checked = false;
    });
    
    // Mostrar la pregunta y opciones
    questionElement.textContent = (index + 1) + ". " + quizData.questions[index];
    optionALabel.textContent = "A) " + quizData.optionsA[index];
    optionBLabel.textContent = "B) " + quizData.optionsB[index];
    optionCLabel.textContent = "C) " + quizData.optionsC[index];
    optionDLabel.textContent = "D) " + quizData.optionsD[index];
    
    // Actualizar progreso
    progressElement.textContent = "Pregunta " + (index + 1) + " de " + totalQuestions;
    
    // Cambiar texto del bot�n en la �ltima pregunta
    if (index === totalQuestions - 1) {
        nextButton.textContent = "Finalizar";
    } else {
        nextButton.textContent = "Siguiente";
    }
}

// Funci�n para verificar la respuesta
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert("Por favor selecciona una respuesta");
        return false;
    }
    
    if (selectedOption.value === quizData.correctAnswers[currentQuestion]) {
        score++;
    }
    
    return true;
}

// Funci�n para mostrar resultados
function showResults() {
    questionContainer.style.display = "none";
    resultsContainer.style.display = "block";
    
    const percentage = Math.round((score / totalQuestions) * 100);
    scoreText.textContent = "Tu puntuaci�n: " + score + " de " + totalQuestions + " (" + percentage + "%)";
    
    if (percentage >= 80) {
        feedbackText.textContent = "�Excelente trabajo! Dominas los conceptos b�sicos de Visual Basic.";
    } else if (percentage >= 60) {
        feedbackText.textContent = "Buen trabajo. Tienes conocimientos s�lidos de Visual Basic.";
    } else {
        feedbackText.textContent = "Necesitas repasar algunos conceptos de Visual Basic.";
    }
}

// Evento del bot�n siguiente
nextButton.addEventListener('click', function() {
    if (checkAnswer()) {
        currentQuestion++;
        
        if (currentQuestion < totalQuestions) {
            loadQuestion(currentQuestion);
        } else {
            showResults();
        }
    }
});

// Evento del bot�n reiniciar
restartButton.addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    
    questionContainer.style.display = "block";
    resultsContainer.style.display = "none";
    
    loadQuestion(0);
});