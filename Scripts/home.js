const createQuestion = (text, options, correctAnswer) => {
  const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];
  options = (options || []).slice(0, 3); 
  while (options.length < 3) options.push(defaultOptions[options.length]);

  return { text: text || 'Unknown Question', options, correctAnswer: correctAnswer ?? null };
};

const initializeQuizzes = () => {
  let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

  quizzes = quizzes.map((quiz, index) => ({
    id: quiz.id || index + 1,
    quizName: quiz.quizName || 'Untitled Quiz',
    questions: (quiz.questions || []).map(q => createQuestion(q.text, q.options, q.correctAnswer)),
  }));

  if (!quizzes.length) {
    quizzes = [
      {
        id: 1,
        quizName: 'Database Basics',
        questions: [
          createQuestion('What is SQL?', ['A programming language', 'A database type', 'A server'], 0),
          createQuestion('What does CRUD stand for?', ['Create, Read, Update, Delete', 'Copy, Run, Undo, Debug', 'Cache, Restore, Undo, Drop'], 0),
          createQuestion('Which SQL command retrieves data?', ['SELECT', 'INSERT', 'UPDATE'], 0),
        ],
      },
      {
        id: 2,
        quizName: 'Advanced SQL',
        questions: [
          createQuestion('What is a primary key?', ['A unique identifier for a row', 'A password for a database', 'A type of query'], 0),
          createQuestion('What does JOIN do?', ['Combines rows from two tables', 'Deletes rows', 'Sorts rows'], 0),
          createQuestion('What is normalization?', ['Organizing data to reduce redundancy', 'Encrypting data', 'Backing up data'], 0),
        ],
      },
      {
        id: 3,
        quizName: 'SQL Functions',
        questions: [
          createQuestion('What does COUNT() do?', ['Counts rows', 'Adds numbers', 'Deletes duplicates'], 0),
          createQuestion('What is GROUP BY used for?', ['Grouping rows based on a column', 'Filtering rows', 'Sorting rows'], 0),
          createQuestion('What does DISTINCT do?', ['Removes duplicate rows', 'Sorts rows', 'Filters rows'], 0),
        ],
      },
    ];
  }

  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

  const displayQuizzes = () => {
  const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
  const quizList = document.getElementById('quiz-list');

  if (!quizList) {
    console.error('Error: The "quiz-list" element is missing in the HTML.');
    return;
  }

  quizList.innerHTML = quizzes.length
    ? quizzes.map(quiz => `<li role="button" tabindex="0">${quiz.quizName || 'Untitled Quiz'}</li>`).join('')
    : '<p>No quizzes available.</p>';

  document.querySelectorAll('#quiz-list li').forEach((li, index) => {
    li.addEventListener('click', () => startQuiz(quizzes[index].id));
    li.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') startQuiz(quizzes[index].id);
    });
  });
};

const startQuiz = (quizId) => {
  localStorage.setItem('currentQuizId', quizId);
  window.location.href = 'quiz.html';
};

const handleLogout = () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn) {
     return;
  }

  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear(); 
    window.location.href = '../index.html';
  });
};
document.addEventListener('DOMContentLoaded', () => {
  initializeQuizzes();
  displayQuizzes();
  handleLogout();
});