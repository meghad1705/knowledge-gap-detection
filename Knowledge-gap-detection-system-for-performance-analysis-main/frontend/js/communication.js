const communicationQuestions = {
  Mathematics: [
    { prompt: 'Explain how to solve a quadratic equation by factoring.', keywords: ['factor', 'equation', 'zero', 'roots', 'solve', 'product', 'sum'] },
    { prompt: 'Describe how the quadratic formula helps find the roots of an equation.', keywords: ['quadratic', 'formula', 'roots', 'discriminant', 'solve', 'equation', 'x'] },
    { prompt: 'Explain what the vertex of a parabola tells us about the graph.', keywords: ['vertex', 'parabola', 'graph', 'minimum', 'maximum', 'axis', 'point'] }
  ],
  Physics: [
    { prompt: "Explain Newton's second law in your own words.", keywords: ['force', 'mass', 'acceleration', 'newton', 'second', 'law', 'motion'] },
    { prompt: 'Describe how friction affects the movement of an object.', keywords: ['friction', 'opposes', 'motion', 'force', 'speed', 'slows', 'surface'] },
    { prompt: 'Explain what momentum means and how it is calculated.', keywords: ['momentum', 'mass', 'velocity', 'motion', 'calculate', 'p'] }
  ],
  'Computer Science': [{ prompt: 'Explain how an algorithm solves a problem step by step.', keywords: ['algorithm', 'problem', 'steps', 'input', 'output', 'logic', 'solve'] }],
  English: [{ prompt: 'Explain how a writer uses evidence to support a main idea.', keywords: ['writer', 'evidence', 'support', 'main', 'idea', 'text', 'example'] }],
  Biology: [{ prompt: 'Explain how cells use energy to carry out their functions.', keywords: ['cells', 'energy', 'function', 'organism', 'process', 'life', 'respiration'] }],
  Chemistry: [{ prompt: 'Explain what happens during a chemical reaction.', keywords: ['chemical', 'reaction', 'atoms', 'molecules', 'products', 'reactants', 'energy'] }],
  History: [{ prompt: 'Explain how one historical event caused changes in society.', keywords: ['event', 'cause', 'effect', 'society', 'change', 'evidence', 'historical'] }],
  Geography: [{ prompt: 'Explain how physical features influence where people live.', keywords: ['physical', 'features', 'people', 'climate', 'location', 'resources', 'settlement'] }],
  Economics: [{ prompt: 'Explain how supply and demand affect prices.', keywords: ['supply', 'demand', 'price', 'market', 'buyers', 'sellers', 'quantity'] }],
  Psychology: [{ prompt: 'Explain how memory supports learning and decision making.', keywords: ['memory', 'learning', 'brain', 'information', 'recall', 'experience', 'decision'] }],
  Sociology: [{ prompt: 'Explain how groups and culture influence individual behavior.', keywords: ['groups', 'culture', 'society', 'behavior', 'norms', 'social', 'individual'] }],
  Philosophy: [{ prompt: 'Explain how an argument can be evaluated for sound reasoning.', keywords: ['argument', 'reasoning', 'evidence', 'premise', 'conclusion', 'logic', 'claim'] }],
  Art: [{ prompt: 'Explain how artists use color and composition to communicate meaning.', keywords: ['artists', 'color', 'composition', 'meaning', 'design', 'visual', 'expression'] }],
  Music: [{ prompt: 'Explain how rhythm and melody work together in a musical piece.', keywords: ['rhythm', 'melody', 'music', 'beat', 'notes', 'sound', 'piece'] }],
  Statistics: [{ prompt: 'Explain how averages and variation help describe data.', keywords: ['average', 'mean', 'variation', 'data', 'median', 'spread', 'sample'] }],
  Programming: [{ prompt: 'Explain how a program uses variables and conditions to make decisions.', keywords: ['program', 'variables', 'conditions', 'code', 'logic', 'input', 'output'] }],
  Engineering: [{ prompt: 'Explain how engineers use design constraints to solve problems.', keywords: ['engineers', 'design', 'constraints', 'problem', 'test', 'solution', 'system'] }],
  Astronomy: [{ prompt: 'Explain how gravity affects the motion of objects in space.', keywords: ['gravity', 'motion', 'space', 'objects', 'orbit', 'mass', 'force'] }],
  'Environmental Science': [{ prompt: 'Explain how human activity can affect an ecosystem.', keywords: ['human', 'activity', 'ecosystem', 'environment', 'pollution', 'species', 'impact'] }],
  Health: [{ prompt: 'Explain how daily habits support physical and mental health.', keywords: ['health', 'habits', 'physical', 'mental', 'sleep', 'nutrition', 'exercise'] }],
  Civics: [{ prompt: 'Explain how citizens participate in a democratic society.', keywords: ['citizens', 'democracy', 'vote', 'rights', 'government', 'community', 'participate'] }],
  'Media Literacy': [{ prompt: 'Explain how to check whether information online is reliable.', keywords: ['information', 'online', 'reliable', 'source', 'evidence', 'bias', 'check'] }],
  Default: [{ prompt: 'Explain the best way to study a difficult topic step by step.', keywords: ['study', 'practice', 'review', 'mistakes', 'steps', 'understand', 'focus'] }]
};

const quizSubjects = ['Mathematics', 'Physics', 'Computer Science', 'English', 'Biology', 'Chemistry', 'History', 'Geography', 'Economics', 'Psychology', 'Sociology', 'Philosophy', 'Art', 'Music', 'Statistics', 'Programming', 'Engineering', 'Astronomy', 'Environmental Science', 'Health', 'Civics', 'Media Literacy'];

const subjectParam = new URLSearchParams(window.location.search).get('subject');
const subjectPicker = document.querySelector('#communicationSubject');
const communicationPrompt = document.querySelector('#communicationPrompt');
const speechTranscript = document.querySelector('#speechTranscript');
const speechButton = document.querySelector('#speechStart');
const speechClear = document.querySelector('#speechClear');
const recordingTimer = document.querySelector('#recordingTimer');
const communicationScore = document.querySelector('#communicationScore');
const communicationSummary = document.querySelector('#communicationSummary');
let currentCommunicationQuestion = null;
let recognition = null;
let speechListening = false;
let recordingStartedAt = 0;
let timerInterval = null;
let transcriptParts = [];
const maxRecordingMs = 2 * 60 * 1000;

function selectCommunicationQuestion(subject) {
  const bank = communicationQuestions[subject] || communicationQuestions.Default;
  currentCommunicationQuestion = bank[0];
  return currentCommunicationQuestion;
}

function renderCommunicationPrompt(subject) {
  const question = selectCommunicationQuestion(subject);
  communicationPrompt.textContent = question.prompt;
  speechTranscript.value = '';
  communicationScore.textContent = 'Awaiting response';
  communicationScore.className = 'communication-score';
  communicationSummary.textContent = 'Speak clearly and include the key ideas from the prompt.';
  resetRecordingTimer();
}

function formatRecordingTime(milliseconds) {
  const seconds = Math.min(120, Math.floor(milliseconds / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} / 02:00`;
}

function updateRecordingTimer() {
  if (!recordingStartedAt || !recordingTimer) return;
  const elapsed = Date.now() - recordingStartedAt;
  recordingTimer.textContent = formatRecordingTime(elapsed);
  if (elapsed >= maxRecordingMs) stopSpeechCapture('The two-minute recording limit has been reached.');
}

function resetRecordingTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  recordingStartedAt = 0;
  transcriptParts = [];
  if (recordingTimer) recordingTimer.textContent = '00:00 / 02:00';
}

function stopSpeechCapture(message) {
  speechListening = false;
  clearInterval(timerInterval);
  timerInterval = null;
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
    }
  }
  speechButton.classList.remove('is-listening');
  speechButton.innerHTML = 'Tap to speak <span>🎤</span>';
  if (message) communicationSummary.textContent = message;
}

function gradeCommunicationAnswer(answerText) {
  const response = answerText.toLowerCase();
  const matched = currentCommunicationQuestion.keywords.filter(keyword => response.includes(keyword));
  const score = Math.round((matched.length / currentCommunicationQuestion.keywords.length) * 100);
  const status = score >= 80 ? ['is-good', 'Strong answer'] : score >= 50 ? ['is-medium', 'Good effort'] : ['is-low', 'Needs review'];
  const missing = currentCommunicationQuestion.keywords.filter(keyword => !response.includes(keyword));
  communicationScore.textContent = `${score}% • ${status[1]}`;
  communicationScore.className = `communication-score ${status[0]}`;
  communicationSummary.textContent = `${matched.length ? `Keyword match: ${matched.join(', ')}.` : 'No key words matched yet.'}${missing.length ? ` Try to include: ${missing.slice(0, 3).join(', ')}.` : ''}`;
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speechButton.disabled = true;
    speechButton.innerHTML = 'Speech not supported <span>🎤</span>';
    return null;
  }
  if (recognition) return recognition;

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = event => {
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      if (event.results[index].isFinal) transcriptParts.push(event.results[index][0].transcript);
    }
    const transcript = transcriptParts.join(' ').trim();
    speechTranscript.value = transcript;
    gradeCommunicationAnswer(transcript);
  };
  recognition.onerror = event => {
    stopSpeechCapture();
    communicationSummary.textContent = event.error === 'not-allowed'
      ? 'Microphone access was blocked. Allow microphone access for this page, then try again.'
      : event.error === 'no-speech'
        ? 'No speech was detected. Try again and speak more clearly.'
        : 'Speech recognition could not start. Check your microphone and try again.';
  };
  recognition.onend = () => {
    if (speechListening && Date.now() - recordingStartedAt < maxRecordingMs) {
      setTimeout(() => {
        if (speechListening) recognition.start();
      }, 250);
      return;
    }
    stopSpeechCapture('Recording finished.');
  };
  return recognition;
}

function startSpeechCapture() {
  const recognizer = setupSpeechRecognition();
  if (!recognizer) return;
  if (speechListening) {
    stopSpeechCapture('Recording stopped.');
    return;
  }
  transcriptParts = [];
  recordingStartedAt = Date.now();
  timerInterval = setInterval(updateRecordingTimer, 250);
  speechListening = true;
  speechButton.classList.add('is-listening');
  speechButton.innerHTML = 'Listening... <span>🎙️</span>';
  try {
    recognizer.start();
  } catch (error) {
    speechListening = false;
    speechButton.classList.remove('is-listening');
    speechButton.innerHTML = 'Tap to speak <span>🎤</span>';
    clearInterval(timerInterval);
    timerInterval = null;
    communicationSummary.textContent = 'Speech recognition is already active. Try again when it finishes.';
  }
}

async function initializeCommunicationTest() {
  const response = await fetch(`${window.location.origin}/api/content`);
  if (!response.ok) throw new Error('Subjects unavailable');
  const items = await response.json();
  const subjects = [...new Set([...quizSubjects, ...items.map(item => item.subject)])];
  subjectPicker.replaceChildren(...subjects.map(subject => new Option(subject, subject)));
  const selectedSubject = subjects.includes(subjectParam) ? subjectParam : 'Mathematics';
  subjectPicker.value = selectedSubject;
  renderCommunicationPrompt(selectedSubject);
}

subjectPicker.addEventListener('change', () => {
  window.location.href = `communication.html?subject=${encodeURIComponent(subjectPicker.value)}`;
});
speechButton.addEventListener('click', startSpeechCapture);
speechTranscript.addEventListener('input', () => {
  if (speechTranscript.value.trim()) gradeCommunicationAnswer(speechTranscript.value.trim());
});
speechClear.addEventListener('click', () => {
  if (speechListening) stopSpeechCapture('Recording cleared.');
  speechTranscript.value = '';
  resetRecordingTimer();
  communicationScore.textContent = 'Awaiting response';
  communicationScore.className = 'communication-score';
  communicationSummary.textContent = 'Speak clearly and include the key ideas from the prompt.';
});
initializeCommunicationTest().catch(() => {
  subjectPicker.innerHTML = '<option>Mathematics</option>';
  renderCommunicationPrompt('Mathematics');
});
