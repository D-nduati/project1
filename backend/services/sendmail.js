const nodemailer = require('nodemailer');
require("dotenv").config();

const email_config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'mwakidavis89@gmail.com'||process.env.EMAIL_USER,
        pass: 'cnkk kwee rciz xzee'||process.env.EMAIL_PWD
    }
};

const transporter = nodemailer.createTransport(email_config);

async function sendMail(useremail) {
    const message_options = {
        to: useremail,
        from: "mwakidavis89@gmail.com",
        subject: "Welcome to the Grow with Child app!",
        text: "Your account at the Grow with Child application has been created successfully. Please enjoy the app."
    };

    try {
        let results = await transporter.sendMail(message_options);
        console.log(`Message sent successfully! ${results.messageId}`)
    } catch (err) {
        console.error(err.message);
    }
}
module.exports=sendMail;
  