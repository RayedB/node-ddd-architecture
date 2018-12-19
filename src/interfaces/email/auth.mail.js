// import mailer from '../../infrastructure/mailer/mailer'

class AuthMail {
    constructor() {
        // this.mailer = new Mailer()
    }
    sendConfirmation() {
        console.log("send email confirmation")
    }
    sendResetPasswordToken() {
        console.log("reset Password token")
    }
}

module.exports = AuthMail;