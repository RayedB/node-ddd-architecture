import Mailer from '../../infrastructure/mailer/mailer'

class AuthMail {
    constructor() {
        this.mailer = new Mailer()
    }
    sendConfirmation(data) {
        this.mailer.sendMail(data)
    }
    sendResetPasswordToken() {
        this.mailer.sendMail("envoi d'un email")
    }
}

module.exports = AuthMail;