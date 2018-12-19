import Mailer from '../../infrastructure/mailer/mailer'

class AuthMail {
    constructor() {
        this.mailer = new Mailer()
    }
    sendConfirmation() {
        this.mailer.sendMail("envoi d'un email")
    }
    sendResetPasswordToken() {
        this.mailer.sendMail("envoi d'un email")
    }
}

module.exports = AuthMail;