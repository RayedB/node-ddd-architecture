import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';


class UserSerializer {

    SerializeForRegister(httpBody) {
        if (httpBody.email && isEmail(httpBody.email) && httpBody.password) {
            this.email = httpBody.email.trim().toLowerCase()
            const saltRounds = 7;
            this.hash = bcrypt.hashSync(httpBody.password, saltRounds);
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

    async ComparePassword(password, hash) {
        const match = await bcrypt.compare(password, hash);
        if (match) {
            return true
        }
        return false
    }
}
module.exports = UserSerializer