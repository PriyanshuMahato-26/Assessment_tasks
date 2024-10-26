document.getElementById('question-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer })
    })
    .then(response => response.json())
    .then(data => {
      alert('Question added successfully!');
      document.getElementById('question-form').reset();
      loadQuestions();
    });
  });
  
  // Load existing questions
  function loadQuestions() {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        const questionsList = document.querySelector('#questions-list ul');
        questionsList.innerHTML = '';
        data.questions.forEach((q, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}. ${q.question} (Answer: ${q.answer})`;
          questionsList.appendChild(li);
        });
      });
  }
  
  loadQuestions();
  