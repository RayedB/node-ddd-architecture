import jwt from 'jsonwebtoken';
import AccessTokenManager from '../../application/security/AccessTokenManager'

//CHANGE SECRET WITH PROCESS.ENV VAR
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "shhh";
console.log(JWT_SECRET_KEY)

class JsonWebToken extends AccessTokenManager{
  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY);
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }

}

module.exports = JsonWebToken