const student = JSON.parse(sessionStorage.getItem('student') || 'null');

if (student) {
  const initials = student.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
  document.querySelector('#profileName').textContent = student.name;
  document.querySelector('#profileHeading').textContent = student.name;
  document.querySelector('#profileAvatar').textContent = initials;
  document.querySelector('#profileId').textContent = `Student ID ${student.id}`;
  document.querySelector('#profileStreak').textContent = student.streak;
  document.querySelector('#profileMastery').textContent = `${student.mastery}%`;
}