const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SITE_URL } = process.env;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msgTemplate = {
  to: "abc1971h@gmail.com",
  from: "abc1971h@gmail.com",
  subject: "letter from app",
  text: "and easy to do anywhere, even with Node.js",
  html: ` `,
};

const sendMail = async (msg) => {
  await sgMail.send({ ...msgTemplate, ...msg });
};

const sendConfirmMail = async ({ email: to, verificationToken }) => {
  const subject = `Activate your ${SITE_URL} account`;
  const html = `
  <p>Hi there,</p>
  <p>Thank you for signing up. Click on the link below to verify your email:</p>
  <a href="${SITE_URL}/api/users/verify/${verificationToken}" rel="noreferrer" target="_blank">${SITE_URL}</a>
  <br>
  <p>Best,<br>the Team.</p>
  `;
  await sendMail({ to, html, subject });
};

module.exports = sendConfirmMail;
