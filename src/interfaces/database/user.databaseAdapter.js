import User from '../../infrastructure/database/schema/user.schema'

class UserAdapter {

    async storeUser(appUser) {
      await User.create(appUser)
        .then((user) => {
          return
        })
        .catch((error)=>{
          //return handleError(error);
        })
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
  
    // doesUserExists(email) {
    //   return this.databaseAdapter.doesUserExists(email);
    // }
  }
  
  module.exports = UserAdapter;