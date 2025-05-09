const loadQuizzes = () => JSON.parse(localStorage.getItem('quizzes')) || [];
const loadCurrentQuiz = (quizId) => loadQuizzes().find((quiz) => quiz.id === quizId);

let currentQuiz, currentQuestionIndex = 0, userAnswers = [];

const renderQuestion = () => {
  const { questions } = currentQuiz;
  const question = questions[currentQuestionIndex];
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');

  document.getElementById('question-text').textContent = question?.text || 'No question available.';
  optionsContainer.innerHTML = question.options.map((option, index) => `
    <label class="quiz-option">
      <input type="checkbox" name="q${currentQuestionIndex}" value="${index}">${option}
    </label>
  `).join('');

  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next';
};

const handleNext = () => {
  const selectedOptions = Array.from(document.querySelectorAll(`input[name="q${currentQuestionIndex}"]:checked`)).map((checkbox) => parseInt(checkbox.value));
  userAnswers[currentQuestionIndex] = selectedOptions;

  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    calculateScore();
  }
};

const calculateScore = () => {
  let score = 0;
  
  currentQuiz.questions.forEach((question, index) => {
    const correctAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
    const userSelectedAnswers = userAnswers[index] || [];

    if (correctAnswers.length === 1 && userSelectedAnswers.length > 1) return; // Multiple answers for a single-correct question

    if (correctAnswers.length === userSelectedAnswers.length && correctAnswers.every((answer) => userSelectedAnswers.includes(answer))) {
      score++;
    }
  });

  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (loggedInUser) saveScore(loggedInUser.email, currentQuiz.id, score);
  else console.error("No logged-in user found in sessionStorage.");

  document.getElementById('quiz-content').classList.add('hidden');
  document.getElementById('quiz-result').textContent = `Your score: ${score}/${currentQuiz.questions.length}`;
  document.getElementById('quiz-result').classList.remove('hidden');
};

const saveScore = (email, quizId, score) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);

  if (!user) return console.error("User not found in localStorage:", email);
  
  if (!user.scores) user.scores = {};
  const quiz = loadQuizzes().find((q) => q.id === quizId);
  if (!quiz) return console.error("Quiz not found in localStorage:", quizId);

  user.scores[quizId] = { quizName: quiz.quizName, score, total: quiz.questions.length };
  localStorage.setItem("users", JSON.stringify(users));
};

document.addEventListener('DOMContentLoaded', () => {
  const quizId = parseInt(localStorage.getItem('currentQuizId'));
  if (!quizId) return alert('No quiz selected!') && (window.location.href = '../index.html');

  currentQuiz = loadCurrentQuiz(quizId);
  if (!currentQuiz) return alert('Quiz not found!') && (window.location.href = '../index.html');

  renderQuestion();
  document.getElementById('next-btn').addEventListener('click', handleNext);
  document.getElementById('back-to-home').addEventListener('click', () => (window.location.href = 'home.html'));
});
