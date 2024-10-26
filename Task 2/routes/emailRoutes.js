const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidateModel');
const nodemailer = require('nodemailer');

// GET all candidates
router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json({ candidates });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

// POST send email
router.post('/send-email', async (req, res) => {
  const { to, body } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any other service or SMTP settings
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password', // Replace with your email password
    },
  });

  let mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: 'HR Response',
    text: body,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'Error sending email' });
    }
    res.json({ success: true, message: 'Email sent successfully' });
  });
});

module.exports = router;
