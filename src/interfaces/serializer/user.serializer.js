import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';


class UserSerializer {

    SerializeForRegister(httpBody) {
        if (httpBody.email && isEmail(httpBody.email) && httpBody.password) {
            this.email = httpBody.email.trim().toLowerCase()
            this.hash = this.hashPassword(httpBody.password)
            return this
        }
        
        return {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "invalid query"
        }
    
    }

    SerializeForLogin(httpBody) {
        this.email = httpBody.email.trim().toLowerCase()
        this.password = httpBody.password;
        return this
    }

    SerializeForReset(httpBody) {
        this.hash = this.hashPassword(httpBody.password)
        return this
    }

    async ComparePassword(password, hash) {
        const match = await bcrypt.compare(password, hash);
        if (match) {
            return true
        }
        return false
    }

    hashPassword(password) {
        const saltRounds = 7;
        return bcrypt.hashSync(password, saltRounds);
    }
}
module.exports = UserSerializer