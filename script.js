// script.js

// ✅ List of quiz questions with their choices and correct answers
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"], // added 4 choices
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ✅ This is where the questions will be shown in HTML
const questionsElement = document.getElementById("questions");

// ✅ This will store the answers the user selects
let userAnswers = [];

// ✅ If there are saved answers in sessionStorage, load them back
if (sessionStorage.getItem("progress")) {
  try {
    userAnswers = JSON.parse(sessionStorage.getItem("progress"));
  } catch {
    userAnswers = [];
  }
}

// ✅ Function that shows questions and choices on the page
// (We are not changing this function, keeping it as it is)
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]; // one question at a time
    const questionElement = document.createElement("div"); // make a box for question
    const questionText = document.createTextNode(question.question); // question text
    questionElement.appendChild(questionText); // add text to box

    // loop through all choices of this question
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input"); // make radio button
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`); // group by question
      choiceElement.setAttribute("value", choice);

      // if user had already answered before, keep it checked
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice); // text for choice
      questionElement.appendChild(choiceElement); // add radio button
      questionElement.appendChild(choiceText); // add choice text
    }

    // finally, add this question block into the main container
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions(); // show all questions

// ✅ After rendering, add event listeners to all radio buttons
document.querySelectorAll("input[type='radio']").forEach((input) => {
  input.addEventListener("change", (e) => {
    const name = e.target.name; // example: "question-0"
    const qIndex = parseInt(name.split("-")[1]); // get question number
    userAnswers[qIndex] = e.target.value; // save user answer
    sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // save in sessionStorage
  });
});

// ✅ Handle when user clicks the "Submit" button
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  // check answers one by one
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++; // correct answer
    }
  }
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

  // save score permanently in localStorage
  localStorage.setItem("score", score);
});

// ✅ If score was already saved before, show it when page reloads
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  document.getElementById(
    "score"
  ).textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
