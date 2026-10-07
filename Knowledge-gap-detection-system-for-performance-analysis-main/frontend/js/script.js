const startQuiz = document.querySelector('#startQuiz');
const practiceTopic = document.querySelector('#practiceTopic');
const viewResultButton = document.querySelector('#viewResultButton');
const resultModal = document.querySelector('#resultModal');
const resultList = document.querySelector('#resultList');
const resultScore = document.querySelector('#resultScore');
const resultBadge = document.querySelector('#resultBadge');
const closeResultModal = document.querySelector('#closeResultModal');
const apiBase = 'http://127.0.0.1:8000';
const masteryValues = [92, 76, 68, 81, 74, 71, 83, 65, 79, 72, 88, 69, 77, 86, 73, 67, 80, 75, 82, 70, 78, 64];
const subjectColors = ['blue', 'coral', 'green', 'yellow'];
const loggedInStudent = JSON.parse(sessionStorage.getItem('student') || 'null');
const latestQuizResult = {
  topic: 'Quadratic equations',
  score: 6,
  total: 8,
  questions: [
    { prompt: 'What is the value of x in x² - 5x + 6 = 0?', selected: 'x = 2 or x = 3', correct: 'x = 2 or x = 3', explanation: 'Factor the equation as (x - 2)(x - 3) = 0.', status: 'correct' },
    { prompt: 'Which expression is a factorization of x² + 7x + 12?', selected: '(x + 3)(x + 4)', correct: '(x + 3)(x + 4)', explanation: 'The factors must multiply to 12 and add to 7, so 3 and 4 match.', status: 'correct' },
    { prompt: 'What is the vertex of y = (x - 2)² + 3?', selected: '(-2, 3)', correct: '(2, 3)', explanation: 'In vertex form y = (x - h)² + k, the vertex is (h, k).', status: 'incorrect' },
    { prompt: 'Which value makes x² - 9 equal to zero?', selected: 'x = 3 or x = -3', correct: 'x = 3 or x = -3', explanation: 'x² - 9 factors to (x - 3)(x + 3) = 0.', status: 'correct' },
    { prompt: 'What is the discriminant of x² + 2x + 1?', selected: '4', correct: '0', explanation: 'b² - 4ac = 2² - 4(1)(1) = 0.', status: 'incorrect' },
    { prompt: 'A parabola opens upward when its leading coefficient is...', selected: 'positive', correct: 'positive', explanation: 'A positive leading coefficient makes the parabola open upward.', status: 'correct' },
    { prompt: 'What is the axis of symmetry for y = x² - 6x + 5?', selected: 'x = 6', correct: 'x = 3', explanation: 'The axis is x = -b / 2a = -(-6) / 2 = 3.', status: 'incorrect' },
    { prompt: 'Which equation has roots 4 and -1?', selected: 'x² - 3x - 4 = 0', correct: 'x² - 3x - 4 = 0', explanation: 'This matches (x - 4)(x + 1).', status: 'correct' }
  ]
};

async function loadSummary() {
  const response = await fetch(`${apiBase}/api/performance/summary`);
  if (!response.ok) throw new Error('Summary unavailable');
  const summary = await response.json();
  const mastery = document.querySelector('#masteryValue');
  const accuracy = document.querySelector('#accuracyValue');
  const hours = document.querySelector('#hoursValue');
  const hoursPercent = Math.round(summary.learning_hours / 8 * 100);
  if (mastery) mastery.textContent = summary.overall_mastery;
  if (accuracy) accuracy.textContent = summary.quiz_accuracy;
  if (hours) hours.textContent = summary.learning_hours;
  if (hoursPercent) {
    document.querySelector('#hoursPercent').textContent = `${hoursPercent}%`;
    document.querySelector('#hoursProgress').style.width = `${hoursPercent}%`;
  }
  document.querySelector('#masteryProgress').style.width = `${summary.overall_mastery}%`;
}

async function loadStudents() {
  const response = await fetch(`${apiBase}/api/students/all`);
  if (!response.ok) throw new Error('Students unavailable');
  const students = await response.json();
  const studentMastery = document.querySelector('#studentMastery');
  studentMastery.replaceChildren(...students.map((student, index) => {
    const score = student.mastery;
    const row = document.createElement('div');
    row.className = 'subject-row student-row';
    row.innerHTML = `<div class="subject-name"><span class="subject-dot ${subjectColors[index % subjectColors.length]}"></span><div><strong>${student.name} · ID ${student.id}</strong><small>${student.streak} day streak</small></div></div><strong>${score}%</strong><div class="wide-progress"><i style="width:${score}%"></i></div>`;
    return row;
  }));
}

if (loggedInStudent) {
  const avatar = document.querySelector('.avatar');
  const status = document.querySelector('.topbar-status small');
  if (avatar) avatar.textContent = loggedInStudent.id;
  if (status) status.textContent = `${loggedInStudent.name} · ID ${loggedInStudent.id}`;
}

function openResultModal() {
  if (!resultModal || !resultList) return;

  resultScore.textContent = `${latestQuizResult.score} / ${latestQuizResult.total}`;
  resultBadge.textContent = latestQuizResult.score >= 6 ? 'Strong' : 'Review';
  resultBadge.className = `result-badge ${latestQuizResult.score >= 6 ? 'is-good' : 'is-review'}`;
  resultList.innerHTML = latestQuizResult.questions.map((item, index) => `
    <div class="result-item ${item.status === 'correct' ? 'is-correct' : 'is-incorrect'}">
      <div class="result-item-header">
        <span class="result-item-number">Q${index + 1}</span>
        <span class="result-status">${item.status === 'correct' ? 'Correct' : 'Incorrect'}</span>
      </div>
      <p class="result-question">${item.prompt}</p>
      <div class="result-answer-row">
        <div><span>Your answer</span><strong>${item.selected}</strong></div>
        <div><span>Correct answer</span><strong>${item.correct}</strong></div>
      </div>
      <p class="result-explanation">${item.explanation}</p>
    </div>
  `).join('');

  resultModal.classList.remove('hidden');
  resultModal.setAttribute('aria-hidden', 'false');
}

function closeResultModalDialog() {
  if (!resultModal) return;
  resultModal.classList.add('hidden');
  resultModal.setAttribute('aria-hidden', 'true');
}

loadSummary().catch(() => {
  // The static file remains useful when the API is not running.
});
loadStudents().catch(() => {
  const studentMastery = document.querySelector('#studentMastery');
  if (studentMastery) studentMastery.innerHTML = '<p class="muted">Student data is temporarily unavailable.</p>';
});

startQuiz?.addEventListener('click', () => {
  window.location.href = 'pages/quiz.html';
});

practiceTopic?.addEventListener('click', () => {
  window.location.href = 'pages/quiz.html?topic=quadratic-equations';
});

viewResultButton?.addEventListener('click', openResultModal);
closeResultModal?.addEventListener('click', closeResultModalDialog);
resultModal?.addEventListener('click', (event) => {
  if (event.target.matches('[data-close="true"]')) closeResultModalDialog();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && resultModal && !resultModal.classList.contains('hidden')) {
    closeResultModalDialog();
  }
});
