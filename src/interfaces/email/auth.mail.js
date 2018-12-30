import Mailer from '../../infrastructure/mailer/mailer'

class AuthMail {
    constructor() {
        this.mailer = new Mailer()
    }
    sendConfirmation(data) {
        data.subject = 'Confirm your account',
        data.text = 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + process.env.DB_HOST+':8081/auth/confirm?token='+data.token
        this.mailer.sendMail(data)
        return
    }
    sendResetPasswordToken(data) {
        data.subject = 'Reset your password'
        data.text = 'Hello,\n\n' + 'Please click here to reset your password: \nhttp:\/\/' + process.env.DB_HOST+':8081/auth/reset?token='+data.token
        this.mailer.sendMail(data)
        return
        
    }
}

module.exports = AuthMail;