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
  
    async createResetToken(appUser){
      await Token.create({ _userId: appUser._id, token: crypto.randomBytes(16).toString('hex') })
                .then((token)=>{
                  console.log(token)
                  return token
                })
                .catch((err)=>{
                  console.log(err)
                  return err
                })
    }
  }
  
  module.exports = UserAdapter;