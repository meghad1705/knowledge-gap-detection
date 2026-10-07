const loginForm = document.querySelector('#loginForm');
const studentIdInput = document.querySelector('#studentId');
const loginError = document.querySelector('#loginError');
const apiBase = window.location.port === '8000'
  ? window.location.origin
  : 'http://127.0.0.1:8000';

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';

  const studentId = Number(studentIdInput.value);
  if (!Number.isInteger(studentId) || studentId < 1 || studentId > 100) {
    loginError.textContent = 'Enter a student ID from 1 to 100.';
    studentIdInput.focus();
    return;
  }

  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Checking...';

  try {
    const response = await fetch(`${apiBase}/api/students/${studentId}`);
    if (response.status === 404) {
      loginError.textContent = 'We could not find that student ID. Please try again.';
      return;
    }
    if (!response.ok) throw new Error('Student service unavailable');
    const student = await response.json();
    sessionStorage.setItem('student', JSON.stringify(student));
    window.location.replace('index.html');
  } catch (error) {
    loginError.textContent = 'Student login is unavailable. Start the API and try again.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Continue <span>→</span>';
  }
});
