import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';


class Mailer {
    constructor(){
        const auth = {
            auth: {
              api_key: process.env.MAILGUN_API_KEY,
              domain: process.env.MAILGUN_DOMAIN
            }
          }
        this.nodemailerMailgun = nodemailer.createTransport(mg(auth));
    }

    sendMail(data){
        console.log(data.token)
        this.nodemailerMailgun.sendMail({
            from: 'no-reply@node-ddd-app.com',
            to: 'rayed.benbrahim@gmail.com', // An array if you have multiple recipients.
            //   cc:'second@domain.com',
            //   bcc:'secretagent@company.gov',
            subject: 'Confirm your account',
            //   'h:Reply-To': 'reply2this@company.com',
            //You can use "html:" to send HTML email content. It's magic!
            //You can use "text:" to send plain-text content. It's oldschool!
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + process.env.DB_HOST+':'+process.env.port+'/auth/confirm?token='+data.token
            }, (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${info}`);
            }
        })
    }
}

module.exports = Mailer