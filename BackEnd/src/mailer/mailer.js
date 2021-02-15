const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailerjuan0@gmail.com',
    pass: 'Jp123456789' // naturally, replace both with your real credentials or an application-specific password
  }
});


module.exports = transporter

