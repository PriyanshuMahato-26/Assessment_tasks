// Fetch questions from the backend
fetch('/api/questions')
  .then(response => response.json())
  .then(data => {
    const questionsContainer = document.getElementById('questions-container');
    data.questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('mb-4');
      questionDiv.innerHTML = `
        <p class="font-semibold">${index + 1}. ${q.question}</p>
        <input type="text" id="answer-${index}" class="border border-gray-300 p-2 w-full rounded-md" placeholder="Your answer here" required>
      `;
      questionsContainer.appendChild(questionDiv);
    });
  });

// Submit answers to the backend
document.getElementById('submit-btn').addEventListener('click', () => {
  const userAnswers = Array.from(document.querySelectorAll('input')).map(input => input.value.trim());
  
  fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: userAnswers })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('score').textContent = data.score;
    document.getElementById('result-section').classList.remove('hidden');
  });
});
