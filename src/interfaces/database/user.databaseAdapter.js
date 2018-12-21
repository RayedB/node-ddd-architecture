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

    async findUser(appUser){
      try{
        const foundUser = await User.findOne({email: appUser.email})
        return foundUser
      } catch (err){
        return err
      }
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
      try {
        const foundToken = await Token.findOne({token: token})
        if (foundToken == null){
          return {code: 400, message: "token not found"}
        }
        const verifiedUser = await User.findOne({_id: foundToken._userId})
        if (verifiedUser == null){
          return {code: 400, message: "No user linked to this token"}
        }
        if (verifiedUser.verified){
          return {code:200, message: "User already verified, please login" }
        }
        verifiedUser.verified = true;
        await verifiedUser.save()
        return {code:200, message: "account has been verified"}
      } catch (error) {
        return error
      }      
    }
  }
  
  module.exports = UserAdapter;