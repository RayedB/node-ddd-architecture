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

        this.nodemailerMailgun.sendMail({
            from: 'myemail@example.com',
            to: 'rayed.benbrahim@gmail.com', // An array if you have multiple recipients.
            //   cc:'second@domain.com',
            //   bcc:'secretagent@company.gov',
            subject: 'Hey you, awesome!',
            //   'h:Reply-To': 'reply2this@company.com',
            //You can use "html:" to send HTML email content. It's magic!
            html: '<b>Wow Big powerful letters</b>',
            //You can use "text:" to send plain-text content. It's oldschool!
            text: 'Mailgun rocks, pow pow!'
            }, (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${info}`);
            }
        })
            .then((res)=> {
                return res
            })
            .catch((err)=> {
                throw err
            })
    }
}

module.exports = Mailer