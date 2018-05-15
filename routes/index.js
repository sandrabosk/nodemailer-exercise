const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// post route that carries the information to back-end from the form
router.post('/send-email', (req, res, next) => {
  console.log("=========", process.env.email, process.env.password)
  let { email, subject, message } = req.body;
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  }));
  transporter.sendMail({
    from: '"My Awesome Project 👻" <myawesome@project.com>',
    to: email, 
    subject: subject, 
    text: message,
    html: `<b>${message}</b>`
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
});

module.exports = router;