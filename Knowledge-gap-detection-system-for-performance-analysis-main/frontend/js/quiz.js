const quadraticQuestions = [
  { text: 'What is the value of x in x² - 5x + 6 = 0?', answers: ['x = 1 or x = 6', 'x = 2 or x = 3', 'x = -2 or x = -3'], correct: 1, explanation: 'Factor the equation as (x - 2)(x - 3) = 0, so the solutions are x = 2 and x = 3.' },
  { text: 'Which expression is a factorization of x² + 7x + 12?', answers: ['(x + 3)(x + 4)', '(x - 3)(x - 4)', '(x + 2)(x + 6)'], correct: 0, explanation: 'The factors must multiply to 12 and add to 7, so 3 and 4 are the matching numbers.' },
  { text: 'What is the vertex of y = (x - 2)² + 3?', answers: ['(-2, 3)', '(2, -3)', '(2, 3)'], correct: 2, explanation: 'In vertex form y = (x - h)² + k, the vertex is (h, k), which here is (2, 3).' },
  { text: 'Which value makes x² - 9 equal to zero?', answers: ['x = 9', 'x = 3 or x = -3', 'x = -9'], correct: 1, explanation: 'x² - 9 is a difference of squares, so it factors to (x - 3)(x + 3) = 0.' },
  { text: 'What is the discriminant of x² + 2x + 1?', answers: ['0', '2', '4'], correct: 0, explanation: 'The discriminant is b² - 4ac = 2² - 4(1)(1) = 0.' },
  { text: 'A parabola opens upward when its leading coefficient is...', answers: ['negative', 'zero', 'positive'], correct: 2, explanation: 'A positive leading coefficient makes the parabola curve upward, like y = x².' },
  { text: 'What is the axis of symmetry for y = x² - 6x + 5?', answers: ['x = -3', 'x = 3', 'x = 6'], correct: 1, explanation: 'The axis of symmetry is x = -b/2a = -(-6)/(2·1) = 3.' },
  { text: 'Which equation has roots 4 and -1?', answers: ['x² - 3x - 4 = 0', 'x² + 3x - 4 = 0', 'x² - 5x + 4 = 0'], correct: 0, explanation: 'The factors are (x - 4)(x + 1) = x² - 3x - 4, giving roots 4 and -1.' },
  { text: 'Solve 2x² - 8 = 0.', answers: ['x = ±2', 'x = ±4', 'x = ±1'], correct: 0, explanation: '2x² = 8 gives x² = 4, so x = ±2.' },
  { text: 'What is the y-intercept of y = x² - 4x + 7?', answers: ['(0, 7)', '(7, 0)', '(0, -7)'], correct: 0, explanation: 'The y-intercept is the value of y when x = 0, which is 7.' },
  { text: 'Which graph opens downward?', answers: ['y = -x² + 2x + 1', 'y = x² + 2x + 1', 'y = 2x² + 1'], correct: 0, explanation: 'A negative leading coefficient makes the parabola open downward.' },
  { text: 'Solve x² + 5x + 6 = 0.', answers: ['x = -2 or x = -3', 'x = 2 or x = 3', 'x = -1 or x = -6'], correct: 0, explanation: 'The factors are (x + 2)(x + 3), which give x = -2 and x = -3.' },
];

const mechanicsQuestions = [
  { text: "Newton's second law is represented by...", answers: ['F = ma', 'E = mc²', 'p = mv²'], correct: 0, explanation: 'Newton’s second law states that force equals mass times acceleration, so F = ma.' },
  { text: 'If mass stays constant and force doubles, acceleration...', answers: ['halves', 'doubles', 'stays the same'], correct: 1, explanation: 'Since F = ma, doubling the force doubles the acceleration when mass stays constant.' },
  { text: 'What is the unit of force?', answers: ['Newton', 'Joule', 'Watt'], correct: 0, explanation: 'The SI unit of force is the newton, which is kg·m/s².' },
  { text: 'If an object is at rest and no net force acts on it, it will...', answers: ['stay at rest', 'accelerate forward', 'move in a circle'], correct: 0, explanation: 'Newton’s first law says an object remains at rest unless acted on by a net force.' },
  { text: 'Momentum is calculated as...', answers: ['mass × velocity', 'force × time', 'mass ÷ velocity'], correct: 0, explanation: 'Momentum p = mv measures how much motion an object has.' },
  { text: 'A greater mass means, for the same force, ...', answers: ['less acceleration', 'more acceleration', 'the same acceleration'], correct: 0, explanation: 'Using F = ma, a larger mass gives a smaller acceleration for the same force.' },
  { text: 'What happens to acceleration when force is tripled and mass stays constant?', answers: ['It triples', 'It halves', 'It stays constant'], correct: 0, explanation: 'Acceleration is directly proportional to force when mass is fixed.' },
  { text: 'What is the net force if two 5 N forces act in opposite directions?', answers: ['0 N', '5 N', '10 N'], correct: 0, explanation: 'The forces cancel each other out, leaving zero net force.' },
  { text: 'Which quantity is a vector?', answers: ['Velocity', 'Speed', 'Mass'], correct: 0, explanation: 'Velocity includes both magnitude and direction, so it is a vector.' },
  { text: 'If an object’s velocity changes, it is said to have...', answers: ['acceleration', 'equilibrium', 'resistance'], correct: 0, explanation: 'Acceleration is any change in velocity over time.' },
  { text: 'What does friction do to motion?', answers: ['Opposes motion', 'Adds force in the same direction', 'Removes mass'], correct: 0, explanation: 'Friction acts opposite the direction of movement or attempted motion.' },
  { text: 'Which is an example of balanced forces?', answers: ['A book resting on a table', 'A car speeding up', 'A falling object'], correct: 0, explanation: 'Balanced forces produce no net change in motion, so the book stays still.' },
];

const communicationQuestions = {
  Mathematics: [
    { prompt: 'Explain how to solve a quadratic equation by factoring.', keywords: ['factor', 'equation', 'zero', 'roots', 'solve', 'product', 'sum'] },
    { prompt: 'Describe how the quadratic formula helps find the roots of an equation.', keywords: ['quadratic', 'formula', 'roots', 'discriminant', 'solve', 'equation', 'x'] },
    { prompt: 'Explain what the vertex of a parabola tells us about the graph.', keywords: ['vertex', 'parabola', 'graph', 'minimum', 'maximum', 'axis', 'point'] }
  ],
  Physics: [
    { prompt: 'Explain Newton’s second law in your own words.', keywords: ['force', 'mass', 'acceleration', 'newton', 'second', 'law', 'motion'] },
    { prompt: 'Describe how friction affects the movement of an object.', keywords: ['friction', 'opposes', 'motion', 'force', 'speed', 'slows', 'surface'] },
    { prompt: 'Explain what momentum means and how it is calculated.', keywords: ['momentum', 'mass', 'velocity', 'motion', 'calculate', 'p'] }
  ],
  Default: [
    { prompt: 'Explain the best way to study a difficult topic step by step.', keywords: ['study', 'practice', 'review', 'mistakes', 'steps', 'understand', 'focus'] },
    { prompt: 'Describe how reflection helps improve learning over time.', keywords: ['reflect', 'mistakes', 'learning', 'improve', 'practice', 'understand'] },
    { prompt: 'Explain how regular revision makes learning stronger.', keywords: ['revision', 'practice', 'memory', 'review', 'understand', 'regular'] }
  ]
};

let questions = quadraticQuestions;
const subjectParam = new URLSearchParams(window.location.search).get('subject');
const subjectPicker = document.querySelector('#quizSubject');
const quizHeading = document.querySelector('.welcome-row h1');
const assessmentTopics = { Mathematics: 'quadratic-equations', Physics: 'mechanics' };
const communicationPrompt = document.querySelector('#communicationPrompt');
const speechTranscript = document.querySelector('#speechTranscript');
const speechButton = document.querySelector('#speechStart');
const speechClear = document.querySelector('#speechClear');
const communicationScore = document.querySelector('#communicationScore');
const communicationSummary = document.querySelector('#communicationSummary');
let currentCommunicationQuestion = null;
let recognition = null;
let speechListening = false;

const state = { index: 0, score: 0, selected: null, answers: [], reviewing: false };
const questionText = document.querySelector('#questionText');
const answerList = document.querySelector('#answerList');
const questionCount = document.querySelector('#questionCount');
const quizScore = document.querySelector('#quizScore');
const progress = document.querySelector('#quizProgress');
const feedback = document.querySelector('#quizFeedback');
const nextButton = document.querySelector('#quizNext');

function genericQuestion(subject) {
  return [
    { text: `Which study habit best supports progress in ${subject}?`, answers: ['Review ideas, practise, and reflect on mistakes', 'Skip practice and only reread notes', 'Wait until the final day to begin'], correct: 0, explanation: 'Regular review, practice, and reflection reinforce understanding and help fix mistakes early.' },
    { text: `Which action best improves mastery in ${subject}?`, answers: ['Work through a few practice problems consistently', 'Avoid trying until the topic feels easy', 'Only read notes without answering questions'], correct: 0, explanation: 'Consistent practice builds recall and makes weak areas easier to spot.' },
    { text: `A strong learning routine for ${subject} includes...`, answers: ['Short focused practice and error review', 'Last-minute memorization only', 'Ignoring feedback from mistakes'], correct: 0, explanation: 'Checking mistakes helps transfer short-term effort into long-term understanding.' },
    { text: `When a concept in ${subject} feels hard, the best next step is...`, answers: ['Break it into smaller pieces and practice again', 'Stop and wait for the final exam', 'Skip it and move on'], correct: 0, explanation: 'Smaller steps reduce overwhelm and make progress measurable.' },
    { text: `What helps you retain ideas from ${subject}?`, answers: ['Explaining them in your own words', 'Reading once without recall', 'Avoiding questions until the end'], correct: 0, explanation: 'Teaching or explaining the idea checks whether you truly understand it.' },
    { text: `Which is the most effective check for understanding in ${subject}?`, answers: ['Solve a related question and compare with the answer', 'Copy the notes without thinking', 'Guess the final answer without checking'], correct: 0, explanation: 'Practice with feedback lets you learn from errors and improve quickly.' },
    { text: `Which study approach is best for ${subject}?`, answers: ['Mix review, practice, and reflection', 'Only memorize formulae', 'Study only when a test is near'], correct: 0, explanation: 'Regular spaced practice helps ideas stick over time.' },
    { text: `What should you do after getting an answer wrong in ${subject}?`, answers: ['Review the cause and retry a similar question', 'Ignore it and move on', 'Assume the method is correct anyway'], correct: 0, explanation: 'Reviewing errors turns mistakes into useful learning signals.' },
    { text: `A productive study session in ${subject} should include...`, answers: ['Focused practice with feedback and a short review', 'Only listening without engagement', 'No checking of mistakes'], correct: 0, explanation: 'Feedback and review turn effort into skill.' },
    { text: `Which habit strengthens confidence in ${subject}?`, answers: ['Regular low-pressure practice', 'Rare, high-stress study sessions', 'Avoiding difficult questions'], correct: 0, explanation: 'Small consistent wins build confidence and show progress.' },
    { text: `For steady progress in ${subject}, what matters most?`, answers: ['Repeated practice with reflection', 'Reading once and hoping it sticks', 'Waiting until everything feels easy'], correct: 0, explanation: 'Mastery grows through repeated retrieval and reflection, not just exposure.' },
    { text: `What is the strongest way to prepare for ${subject} questions?`, answers: ['Attempt examples and review explanations', 'Memorize key words without solving', 'Skip practice and rely on intuition'], correct: 0, explanation: 'Example-based practice and review sharpen both reasoning and recall.' },
  ];
}

function getCommunicationQuestion(subject) {
  const bank = communicationQuestions[subject] || communicationQuestions.Default;
  const question = bank[0];
  currentCommunicationQuestion = question;
  return question;
}

function renderCommunicationPrompt(subject) {
  const question = getCommunicationQuestion(subject);
  if (!communicationPrompt) return;
  communicationPrompt.textContent = question.prompt;
  if (speechTranscript) speechTranscript.value = '';
  if (communicationScore) {
    communicationScore.textContent = 'Awaiting response';
    communicationScore.className = 'communication-score';
  }
  if (communicationSummary) communicationSummary.textContent = 'Speak clearly and include key ideas from the prompt.';
}

function gradeCommunicationAnswer(answerText) {
  if (!currentCommunicationQuestion || !communicationScore || !communicationSummary) return;

  const response = answerText.toLowerCase();
  const keywordMatches = currentCommunicationQuestion.keywords.filter(keyword => response.includes(keyword.toLowerCase()));
  const score = Math.round((keywordMatches.length / currentCommunicationQuestion.keywords.length) * 100);

  let statusClass = 'is-low';
  let label = 'Needs review';
  if (score >= 80) {
    statusClass = 'is-good';
    label = 'Strong answer';
  } else if (score >= 50) {
    statusClass = 'is-medium';
    label = 'Good effort';
  }

  const missingKeywords = currentCommunicationQuestion.keywords.filter(keyword => !response.includes(keyword.toLowerCase()));
  communicationScore.textContent = `${score}% • ${label}`;
  communicationScore.className = `communication-score ${statusClass}`;

  const matchSummary = keywordMatches.length
    ? `Keyword match: ${keywordMatches.join(', ')}.`
    : 'No key words matched yet.';
  const missingSummary = missingKeywords.length
    ? ` Try to include: ${missingKeywords.slice(0, 3).join(', ')}.`
    : '';
  communicationSummary.textContent = `${matchSummary}${missingSummary}`;
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (speechButton) {
      speechButton.disabled = true;
      speechButton.innerHTML = 'Speech not supported <span>🎤</span>';
    }
    return null;
  }

  if (!recognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      speechListening = true;
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (speechTranscript) speechTranscript.value = transcript;
      gradeCommunicationAnswer(transcript);
    };

    recognition.onerror = (event) => {
      speechListening = false;
      if (speechButton) {
        speechButton.classList.remove('is-listening');
        speechButton.innerHTML = 'Tap to speak <span>🎤</span>';
      }
      const message = event.error === 'not-allowed'
        ? 'Microphone access was blocked. Allow microphone access for this page, then try again.'
        : event.error === 'no-speech'
          ? 'No speech was detected. Try again and speak a little more clearly.'
          : 'Speech recognition could not start. Check your microphone and try again.';
      if (communicationSummary) communicationSummary.textContent = message;
    };

    recognition.onend = () => {
      speechListening = false;
      if (speechButton) {
        speechButton.classList.remove('is-listening');
        speechButton.innerHTML = 'Tap to speak <span>🎤</span>';
      }
    };
  }

  return recognition;
}

async function startSpeechCapture() {
  const recognizer = setupSpeechRecognition();
  if (!recognizer) return;
  if (speechListening) return;

  if (speechButton) {
    speechButton.classList.add('is-listening');
    speechButton.innerHTML = 'Listening... <span>🎙️</span>';
  }

  speechListening = true;
  try {
    recognizer.start();
  } catch (error) {
    speechListening = false;
    if (speechButton) {
      speechButton.classList.remove('is-listening');
      speechButton.innerHTML = 'Tap to speak <span>🎤</span>';
    }
    if (communicationSummary) communicationSummary.textContent = 'Speech recognition is already active. Try again when it finishes.';
  }
}

async function initializeQuiz() {
  const contentResponse = await fetch(`${window.location.origin}/api/content`);
  if (!contentResponse.ok) throw new Error('Subjects unavailable');
  const items = await contentResponse.json();
  const subjects = [...new Set(items.map(item => item.subject))];
  subjectPicker.replaceChildren(...subjects.map(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    option.selected = subject === (subjectParam || 'Mathematics');
    return option;
  }));
  const selectedSubject = subjects.includes(subjectParam) ? subjectParam : 'Mathematics';
  subjectPicker.value = selectedSubject;
  quizHeading.textContent = `${selectedSubject} practice`;
  questions = selectedSubject === 'Mathematics' ? quadraticQuestions : selectedSubject === 'Physics' ? mechanicsQuestions : genericQuestion(selectedSubject);
  renderCommunicationPrompt(selectedSubject);
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.index];
  state.selected = null;
  state.reviewing = false;
  questionText.textContent = question.text;
  questionCount.textContent = `QUESTION ${state.index + 1} OF ${questions.length}`;
  quizScore.textContent = `${state.score} correct`;
  progress.style.width = `${((state.index + 1) / questions.length) * 100}%`;
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';
  nextButton.disabled = true;
  nextButton.innerHTML = 'Choose an answer <span>→</span>';
  answerList.innerHTML = question.answers.map((answer, index) => `<button class="answer-button" data-answer="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span>${answer}</button>`).join('');
  answerList.querySelectorAll('.answer-button').forEach(button => button.addEventListener('click', selectAnswer));
}

function selectAnswer(event) {
  if (state.reviewing) return;
  state.selected = Number(event.currentTarget.dataset.answer);
  answerList.querySelectorAll('.answer-button').forEach(button => button.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  nextButton.disabled = false;
  nextButton.innerHTML = state.index === questions.length - 1 ? 'See my result <span>↗</span>' : 'Check answer <span>→</span>';
}

function showAnswerReview(question, selectedIndex) {
  const isCorrect = selectedIndex === question.correct;
  const correctLetter = String.fromCharCode(65 + question.correct);
  const correctAnswer = question.answers[question.correct];

  answerList.querySelectorAll('.answer-button').forEach(button => {
    const answerIndex = Number(button.dataset.answer);
    button.disabled = true;
    button.classList.toggle('answer-correct', answerIndex === question.correct);
    button.classList.toggle('answer-wrong', answerIndex === selectedIndex && answerIndex !== question.correct);
    button.classList.remove('selected');
  });

  feedback.className = `quiz-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
  feedback.innerHTML = isCorrect
    ? `<strong>Correct.</strong> ${correctLetter}. ${correctAnswer}. ${question.explanation}`
    : `<strong>Not quite.</strong> The correct answer is ${correctLetter}. ${correctAnswer}. ${question.explanation}`;

  nextButton.disabled = false;
  nextButton.innerHTML = state.index === questions.length - 1 ? 'See my result <span>↗</span>' : 'Next question <span>→</span>';
}

async function finishQuiz() {
  nextButton.disabled = true;
  try {
    const response = await fetch(`${window.location.origin}/api/quizzes/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topic: 'Quadratic equations', answers: state.answers }) });
    if (!response.ok) throw new Error('Unable to submit');
  } catch (error) {
    // A local-only session still shows the score when the API is offline.
  }
  questionText.textContent = `You scored ${state.score} out of ${questions.length}`;
  answerList.innerHTML = '<p class="muted">Nice work. Your next recommendation is based on the questions you missed.</p>';
  feedback.textContent = state.score >= 6 ? 'Strong session. Keep building on this momentum.' : 'Good start. A short review will help these ideas stick.';
  nextButton.textContent = 'Back to overview';
  nextButton.disabled = false;
  nextButton.onclick = () => { window.location.href = '../index.html'; };
}

subjectPicker.addEventListener('change', () => {
  window.location.href = `quiz.html?subject=${encodeURIComponent(subjectPicker.value)}`;
});

if (speechButton) {
  speechButton.addEventListener('click', startSpeechCapture);
}

if (speechClear) {
  speechClear.addEventListener('click', () => {
    if (speechTranscript) speechTranscript.value = '';
    if (communicationSummary) communicationSummary.textContent = 'Speak clearly and include key ideas from the prompt.';
    if (communicationScore) {
      communicationScore.textContent = 'Awaiting response';
      communicationScore.className = 'communication-score';
    }
  });
}

nextButton.addEventListener('click', () => {
  if (state.selected === null) return;

  if (state.reviewing) {
    if (state.index === questions.length - 1) finishQuiz();
    else { state.index += 1; renderQuestion(); }
    return;
  }

  state.answers.push(state.selected);
  if (state.selected === questions[state.index].correct) state.score += 1;
  state.reviewing = true;
  quizScore.textContent = `${state.score} correct`;
  showAnswerReview(questions[state.index], state.selected);
});

initializeQuiz().catch(() => {
  subjectPicker.innerHTML = '<option>Mathematics</option>';
  renderCommunicationPrompt('Mathematics');
  renderQuestion();
});