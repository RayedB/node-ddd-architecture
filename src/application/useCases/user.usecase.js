import User from '../../domain/models/user.model'
import UserAdapter from '../../interfaces/database/user.databaseAdapter'

class UserActions {
    constructor(){
        this.userAdapter = new UserAdapter();
    }

    createUser(serializedUserData){
        const newUser = new User(serializedUserData.email, serializedUserData.hash)
        this.userAdapter.storeUser(newUser)
        
    }

    // Login a user
    authenticateUser(serializedCredentials){
        //Serialize user input
        //Pass to user adapter
    }

    forgottenPassword(serializedUserData){
        const lostUser = new User(serializedUserData.email)
    }

    // Edit a user's information

}

module.exports = UserActions