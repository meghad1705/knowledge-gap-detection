const test = require('node:test');
const assert = require('node:assert/strict');

const { buildAnswerReview } = require('./quiz.js');

test('buildAnswerReview returns the right answer and explanation', () => {
  const review = buildAnswerReview(
    { text: 'What is 2 + 2?', answers: ['3', '4', '5'], correct: 1, explanation: 'Adding two and two gives four.' },
    0,
    true
  );

  assert.equal(review.isCorrect, false);
  assert.match(review.message, /Correct answer/i);
  assert.match(review.message, /4/i);
  assert.match(review.message, /Adding two and two gives four\./i);
});
