import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';


class UserSerializer {
    // Move this to SerializeForRegistration
    constructor(httpBody) {
        
    }

    SerializeForRegister(httpBody) {
        this.email = httpBody.email.trim().toLowerCase()
        //Password Encryption should be elsewhere !
        const saltRounds = 7;
        this.hash = bcrypt.hashSync(httpBody.password, saltRounds);
    }

    SerializeForLogin(httpBody) {
        this.email = httpBody.email.trim().toLowerCase()
    }
}
module.exports = UserSerializer