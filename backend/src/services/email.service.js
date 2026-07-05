// Wraps Nodemailer so services never build raw mail options themselves.
const transporter = require('../config/mailer.config');

async function send(to, subject, html) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

exports.sendWelcomeEmail = (to, name) =>
  send(to, 'Welcome to CodeSync!', `<p>Hi ${name}, welcome aboard 🎉</p>`);

exports.sendPasswordResetEmail = (to, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  return send(to, 'Reset your CodeSync password', `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`);
};

exports.sendContestReminderEmail = (to, contest) =>
  send(to, `Reminder: ${contest.name} starts soon`, `<p>${contest.name} on ${contest.platform} starts at ${contest.start_time}.</p>`);
