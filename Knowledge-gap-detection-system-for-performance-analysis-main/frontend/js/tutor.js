const tutorForm = document.querySelector('#tutorForm');
const tutorInput = document.querySelector('#tutorInput');
const chatLog = document.querySelector('#chatLog');
const tutorSubjects = document.querySelector('#tutorSubjects');
const apiBase = 'http://127.0.0.1:8000';

function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `chat-bubble ${type}-bubble`;
  message.textContent = text;
  chatLog.append(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function replyTo(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('newton')) return 'Start with the relationship F = ma: force changes an object’s motion, and mass tells you how much it resists that change.';
  if (lowerPrompt.includes('array')) return 'Quick check: which operation is usually constant time in an array, reading an item by its index or searching for a value?';
  return 'Try splitting the equation into factors first. I can give you another hint after you identify the two numbers whose product is the constant term.';
}

function submitPrompt(prompt) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return;
  addMessage(cleanPrompt, 'user');
  tutorInput.value = '';
  window.setTimeout(() => addMessage(replyTo(cleanPrompt), 'tutor'), 250);
}

tutorForm.addEventListener('submit', event => { event.preventDefault(); submitPrompt(tutorInput.value); });
document.querySelectorAll('[data-prompt]').forEach(button => button.addEventListener('click', () => submitPrompt(button.dataset.prompt)));

async function loadTutorSubjects() {
  const response = await fetch(`${apiBase}/api/content`);
  if (!response.ok) throw new Error('Subjects unavailable');
  const items = await response.json();
  const subjects = [...new Set(items.map(item => item.subject))];
  subjects.forEach(subject => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = subject;
    button.dataset.prompt = `Help me learn ${subject}`;
    button.addEventListener('click', () => submitPrompt(button.dataset.prompt));
    tutorSubjects.append(button);
  });
}

loadTutorSubjects().catch(() => {
  tutorSubjects.innerHTML = '<span class="muted">Subject suggestions unavailable.</span>';
});