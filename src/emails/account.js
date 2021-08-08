const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Enrique_ceas@hotmail.com',
        subject: 'Welcome!',
        text: `${name} be welcome to our site. Let us know how you get along with the application`
    })
}
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Enrique_ceas@hotmail.com',
        subject: 'This is sad :(!',
        text: `${name} Let us know why you decide to leave, you can reply this email and we will be happy to see it :D`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}