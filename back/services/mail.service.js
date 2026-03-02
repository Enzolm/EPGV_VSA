const transporter = require("../config/mailer").transporter;

const sendActivationEmail = async (to, token) => {
  const fs = require("fs");
  const path = require("path");
  const link = `${process.env.FRONT_URL}/create_mdp/${token}`;

  const templatePath = path.join(__dirname, "../email/email.html");
  let htmlContent = fs.readFileSync(templatePath, "utf8");
  htmlContent = htmlContent.replaceAll("{{LIEN_ACTIVATION}}", link);

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Activation de votre compte",
    html: htmlContent,
  });
};

const sendPasswordResetEmail = async (to, token) => {
  const fs = require("fs");
  const path = require("path");
  const link = `${process.env.FRONT_URL}/reset-password/${token}`;

  const templatePath = path.join(__dirname, "../email/reset-password.html");
  let htmlContent = fs.readFileSync(templatePath, "utf8");
  htmlContent = htmlContent.replaceAll("{{LIEN_REINITIALISATION}}", link);

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Réinitialisation de votre mot de passe",
    html: htmlContent,
  });
};

module.exports = { sendActivationEmail, sendPasswordResetEmail };
