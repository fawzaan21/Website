// Questions Pool
const questionsPool = [
    { question: "What is the best bait for trout fishing?", options: ["Worms", "Bread", "Corn", "Cheese"], answer: 0 },
    { question: "Which reel is best for beginners?", options: ["Spincast", "Baitcaster", "Fly Reel", "Trolling Reel"], answer: 0 },
    { question: "Which knot is ideal for tying hooks?", options: ["Palomar Knot", "Square Knot", "Bowline", "Sheepshank"], answer: 0 },
    { question: "What does 'catch and release' mean?", options: ["Keep the fish", "Release fish back", "Tag the fish", "None of the above"], answer: 1 },
    { question: "What is a lure?", options: ["Fake bait", "Fishing rod", "Fishing hook", "Boat part"], answer: 0 },
    // Add 35 more questions here following the same structure
];

// Global Variables
const totalQuestions = 10;
let currentQuestions = [];
let score = 0;

// Helper Functions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateRandomQuestions() {
    const shuffled = shuffle([...questionsPool]);
    return shuffled.slice(0, totalQuestions);
}

function displayQuestions() {
    const quizArea = document.getElementById("quiz-area");
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.innerHTML = `
            <h3>Q${index + 1}: ${q.question}</h3>
            <ul class="options">
                ${q.options.map((option, i) => `
                    <li>
                        <label>
                            <input type="radio" name="q${index}" value="${i}"> ${option}
                        </label>
                    </li>
                `).join("")}
            </ul>
        `;
        quizArea.appendChild(questionDiv);
    });
}

function calculateScore() {
    currentQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score += 1;
        }
    });
}

// Event Listeners
document.getElementById("submit-btn").addEventListener("click", () => {
    calculateScore();
    const scoreArea = document.getElementById("score-area");
    scoreArea.textContent = `Your Score: ${score} / ${totalQuestions}`;
    document.getElementById("submit-btn").disabled = true;
});

// Initialize Quiz
document.addEventListener("DOMContentLoaded", () => {
    currentQuestions = generateRandomQuestions();
    displayQuestions();
});
