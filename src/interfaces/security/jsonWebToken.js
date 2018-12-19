import jwt from 'jsonwebtoken';
import AccessTokenManager from '../../application/security/AccessTokenManager'

//CHANGE SECRET WITH PROCESS.ENV VAR
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "shhh";
console.log(JWT_SECRET_KEY)

class JsonWebToken {
  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
  }

  decode(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_SECRET_KEY);
    } catch(err) {
      return false
    }
  }

}

module.exports = JsonWebToken