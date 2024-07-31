import KafkaConfig from "./config.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Servidor SMTP do Outlook
  port: 587,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const kafkaConfig = new KafkaConfig()

function enviar_email(email_json){
  const mailOptions = {
    from: process.env.EMAIL_USER, // Endereço de origem
    to: email_json.email, // Endereço do destinatário
    subject: email_json.subject,
    text: email_json.message,
    html: `<p>${email_json.message}</p>` // Opcional: conteúdo em HTML
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Erro ao enviar e-mail: ', error);
    }
    console.log('E-mail enviado: ', info.response);
  });

}

kafkaConfig.consume("my-topic", (value) => {
    const email_json = JSON.parse(value);
    enviar_email(email_json)
    console.log("📨 Email enviado!");
  });
