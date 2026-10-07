const apiBase = 'http://127.0.0.1:8000';
const videoGrid = document.querySelector('#videoGrid');
const filterRow = document.querySelector('#videoFilters');

const artClasses = ['physics', 'code', 'math'];
const artSymbols = ['F = ma', '[ ]', 'x²', '∑', '◌', '△'];

function createFilter(subject, active = false) {
  const button = document.createElement('button');
  button.className = `filter-button${active ? ' active' : ''}`;
  button.type = 'button';
  button.textContent = subject;
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    loadContent(subject === 'All subjects' ? '' : subject);
  });
  return button;
}

function createCard(item, index) {
  const card = document.createElement('article');
  card.className = 'video-card';
  const artClass = artClasses[index % artClasses.length];
  const symbol = artSymbols[index % artSymbols.length];
  card.innerHTML = `<div class="video-art ${artClass}"><span>${symbol}</span><button class="play-button" aria-label="Play ${item.title}">▶</button></div><div class="video-copy"><p class="eyebrow">${item.subject.toUpperCase()} · ${item.duration_minutes} MIN</p><h2>${item.title}</h2><p class="muted">${item.description}</p><button class="text-button" type="button">Start lesson →</button></div>`;
  return card;
}

async function loadContent(subject = '') {
  const response = await fetch(`${apiBase}/api/content${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`);
  if (!response.ok) throw new Error('Learning content unavailable');
  const items = await response.json();
  videoGrid.replaceChildren(...items.map(createCard));
}

async function initializeLibrary() {
  const response = await fetch(`${apiBase}/api/content`);
  if (!response.ok) throw new Error('Learning catalog unavailable');
  const items = await response.json();
  const subjects = [...new Set(items.map((item) => item.subject))];
  filterRow.replaceChildren(createFilter('All subjects', true), ...subjects.map((subject) => createFilter(subject)));
  videoGrid.replaceChildren(...items.map(createCard));
}

initializeLibrary().catch(() => {
  videoGrid.innerHTML = '<p class="muted">Learning content is temporarily unavailable.</p>';
});
