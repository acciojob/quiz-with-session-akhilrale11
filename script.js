const questions = [
    { id: 1, question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
    { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { id: 3, question: "Which language is used for web development?", options: ["Python", "Java", "JavaScript", "C#"], answer: 2 },
    { id: 4, question: "What is the largest planet in the solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 },
    { id: 5, question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Tolkien", "Hemingway"], answer: 0 },
];

const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");

// Load progress from session storage
const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the quiz
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    q.options.forEach((option, optIndex) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question-${q.id}`;
        radio.value = optIndex;
        radio.checked = savedProgress[q.id] === optIndex;

        radio.addEventListener("change", () => {
            savedProgress[q.id] = optIndex;
            sessionStorage.setItem("progress", JSON.stringify(savedProgress));
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement("br"));
    });

    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
});

// Handle submission
submitBtn.addEventListener("click", () => {
    let score = 0;
    questions.forEach((q) => {
        if (savedProgress[q.id] === q.answer) {
            score++;
        }
    });

    result.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score);
});
