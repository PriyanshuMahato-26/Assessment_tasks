// Fetch candidates and populate the dropdown
fetch('/api/candidates')
  .then(response => response.json())
  .then(data => {
    const candidateSelect = document.getElementById('candidate');
    data.candidates.forEach(candidate => {
      const option = document.createElement('option');
      option.value = candidate.email;
      option.textContent = `${candidate.name} (${candidate.email})`;
      candidateSelect.appendChild(option);
    });
  });

// Handle template selection and auto-fill email body
document.getElementById('template').addEventListener('change', function() {
  const emailBody = document.getElementById('email-body');
  const selectedTemplate = this.value;

  if (selectedTemplate === 'interview') {
    emailBody.value = 'Dear [Candidate Name],\n\nWe would like to invite you for an interview...\n\nBest regards,\nHR Team';
  } else if (selectedTemplate === 'rejection') {
    emailBody.value = 'Dear [Candidate Name],\n\nThank you for applying. Unfortunately, we have decided to move forward with other candidates...\n\nBest regards,\nHR Team';
  } else if (selectedTemplate === 'followup') {
    emailBody.value = 'Dear [Candidate Name],\n\nWe are following up regarding your recent interview...\n\nBest regards,\nHR Team';
  }
});

// Handle form submission
document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const candidateEmail = document.getElementById('candidate').value;
  const emailBody = document.getElementById('email-body').value.replace('[Candidate Name]', document.getElementById('candidate').options[document.getElementById('candidate').selectedIndex].text.split(' (')[0]);

  fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: candidateEmail, body: emailBody })
  })
  .then(response => response.json())
  .then(data => {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = data.message;
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add(data.success ? 'text-green-500' : 'text-red-500');
  })
  .catch(err => {
    console.error('Error sending email:', err);
  });
});
