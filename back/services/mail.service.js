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

module.exports = { sendActivationEmail };
