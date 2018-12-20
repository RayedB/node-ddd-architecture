import User from '../../domain/models/user.model'
import UserAdapter from '../../interfaces/database/user.databaseAdapter'
import JsonWebToken from '../../interfaces/security/jsonWebToken'
import AuthMail from '../../interfaces/email/auth.mail'


class UserActions {
    constructor(){
        this.userAdapter = new UserAdapter();
        this.emailService = new AuthMail()
    }

    async findOrCreateUser(serializedUserData){
        const newUser = new User(serializedUserData.email, serializedUserData.hash)
        // Look for existing user
        const foundUsers = await this.userAdapter.findUser(newUser)
        if (foundUsers){
            return {message: 'A user with ths email already exists', code: 409};
        }
        // Create new User        
        const createdUser = await this.userAdapter.storeUser(newUser);
        // Send e-mail for confirmation

        if (createdUser !== undefined){
        
            const confirmationToken = await this.userAdapter.createConfirmationToken(createdUser)
            const confirmationEmail = {receipient: createdUser.email, token: confirmationToken.token}
            await this.emailService.sendConfirmation(confirmationEmail);
            return {message: 'User created successfully', code: 200};
        }
        return {message: "An error has occured, user could not be created", code: 500}
    }

    // Login a user
    async loginUser(serializedCredentials){
        
        const requestedUser = await this.userAdapter.findUser(serializedCredentials.email)

        if (requestedUser){
            const authorized = await serializedCredentials.ComparePassword(serializedCredentials.password, requestedUser.hash)
            if (authorized) {
                const jsontoken = new JsonWebToken();
                const payload = {
                    id: requestedUser._id,
                    email: requestedUser.email
                }
                const jwt = jsontoken.generate(payload)
                return {jwt: jwt}
            }
        }
        // Find User
        // Verify Password 
        // Generate token

        // Return object with status code and jwt

        

    }

    activateUser(token){
        this.userAdapter.validateUser(token)
    }

    forgottenPassword(serializedUserData){
        const lostUser = new User(serializedUserData.email)
    }

    // Edit a user's information

}

module.exports = UserActions