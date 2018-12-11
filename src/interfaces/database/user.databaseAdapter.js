import User from '../../infrastructure/database/schema/user.schema'

class UserAdapter {

    storeUser(appUser) {
      return User.create(appUser,(err,result) => {
        if (err) return handleError(err);
        console.log(result)
      })
    }

    findUser(){
      
    }
  
    // doesUserExists(email) {
    //   return this.databaseAdapter.doesUserExists(email);
    // }
  }
  
  module.exports = UserAdapter;