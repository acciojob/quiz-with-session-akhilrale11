// Define the questions and options
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correctAnswer: "Shakespeare"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        correctAnswer: "2"
    }
];

// Function to load the quiz
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    // Loop through the questions and render them
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}" ${getSelectedAnswer(index) === option ? 'checked' : ''}>
                        ${option}
                    </label>
                    <br>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Function to get the selected answer from session storage
function getSelectedAnswer(index) {
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    return progress[`question${index}`];
}

// Function to save the progress in session storage
function saveProgress() {
    const progress = {};
    questions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            progress[`question${index}`] = selectedOption.value;
        }
    });
    sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Function to calculate the score
function calculateScore() {
    let score = 0;
    const progress = JSON.parse(sessionStorage.getItem('progress')) || {};
    
    questions.forEach((question, index) => {
        if (progress[`question${index}`] === question.correctAnswer) {
            score++;
        }
    });

    localStorage.setItem('score', score);
    return score;
}

// Event listener for the submit button
document.getElementById('submit-btn').addEventListener('click', () => {
    saveProgress();  // Save progress before submitting
    const score = calculateScore();  // Calculate score
    document.getElementById('result').innerText = `Your score is ${score} out of 5.`;
});

// Initialize the quiz on page load
loadQuiz();

// Event listener for input changes to save progress
document.querySelector('body').addEventListener('change', () => {
    saveProgress();
});

// Optionally, display previous score from localStorage if available
const previousScore = localStorage.getItem('score');
if (previousScore) {
    document.getElementById('result').innerText = `Previous score: ${previousScore} out of 5.`;
}
