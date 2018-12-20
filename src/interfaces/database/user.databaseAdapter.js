import User from '../../infrastructure/database/schema/user.schema';
import Token from '../../infrastructure/database/schema/token.schema';
import crypto from 'crypto';

class UserAdapter {

    async storeUser(appUser) {
      const userToCreate = new User(appUser)
      try {
        const createdUser = await userToCreate.save()
        return createdUser
      } catch (err){
        return err
      }
    }

    findUser(appUser){
      return User.findOne({email: appUser.email}, (err,user)=> {
        // if (err) return handleError(err);
        return user
      });
    }

    findUserById(id){
      return User.findById(id)
            .then(user => {
                return user;
            })
            .catch(err => {
                return err;
            });
    }

    authenticate(appUser){
      console.log(appUser)
    }
  
    async createConfirmationToken(appUser){
      const tokenToCreate = new Token({ _userId: appUser._id, token: crypto.randomBytes(16).toString('hex') })
      try {
        const createdToken = await tokenToCreate.save()
        return createdToken
      } catch (error) {
        return error
      } 
    }

    async validateUser(token){
      const foundToken = await Token.findOne({token: token})
      if (foundToken == null){
        return {code: 404, message: "token not found"}
      }
      const verifiedUser = await User.findOneAndUpdate({_id: foundToken._userId}, {verified: true})
      console.log(verifiedUser)
    }
  }
  
  module.exports = UserAdapter;