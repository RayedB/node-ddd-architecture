import nodemailer from 'nodemailer';
// import mg from 'nodemailer-mailgun-transport';


class Mailer {
    constructor(){
        // this.nodemailerMailgun = nodemailer.createTransport(mg(auth));
    }

    sendMail(data){
        this.nodemailerMailgun.sendMail(data)
            .then((res)=> {
                return res
            })
            .catch((err)=> {
                throw err
            })
    }
}

module.exports = Mailer