let currentQuestionIndex = 0;
let score = 0;
let selectedDomain = "";
let userName = "";

const quizData = {
  javascript: [
    { question: "Which keyword is used to declare a variable in ES6?", options: ["var", "let", "const", "define"], answer: "let" },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#", "<!--"], answer: "//" }
  ],
  python: [
    { question: "What keyword is used to define a function in Python?", options: ["function", "def", "lambda", "fun"], answer: "def" },
    { question: "What is the output of: print(3 * 'hi')?", options: ["hihihi", "hi3", "error", "3hi"], answer: "hihihi" }
  ],
  java: [
    { question: "Which method is the entry point of any Java program?", options: ["start()", "main()", "run()", "init()"], answer: "main()" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "instanceof"], answer: "extends" }
  ]
};

function startQuiz() {
  const nameInput = document.getElementById("username");
  const domainSelect = document.getElementById("domain");

  userName = nameInput.value.trim();
  selectedDomain = domainSelect.value;

  if (userName === "" || !selectedDomain) {
    alert("Please enter your name and select a domain.");
    return;
  }

  document.getElementById("intro-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";

  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const questionData = quizData[selectedDomain][currentQuestionIndex];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.textContent = "";
  questionEl.textContent = questionData.question;
  optionsEl.innerHTML = "";

  questionData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correctAnswer = quizData[selectedDomain][currentQuestionIndex].answer;
  const feedbackEl = document.getElementById("feedback");

  if (selected === correctAnswer) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
  }

  currentQuestionIndex++;

  setTimeout(() => {
    if (currentQuestionIndex < quizData[selectedDomain].length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");

  questionEl.textContent = `🎉 Quiz Completed!`;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  scoreEl.innerHTML = `${userName}, your score is ${score}/${quizData[selectedDomain].length}`;
}
