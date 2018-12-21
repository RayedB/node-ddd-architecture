import User from '../../domain/models/user.model'
import UserAdapter from '../../interfaces/database/user.databaseAdapter'
import JsonWebToken from '../../interfaces/security/jsonWebToken'
import AuthMail from '../../interfaces/email/auth.mail'


class UserActions {
    constructor(){
        this.userAdapter = new UserAdapter();
        this.emailService = new AuthMail()
    }
// USER REGISTRATION
    async findOrCreateUser(serializedUserData){
        const newUser = new User(serializedUserData.email, serializedUserData.hash)

        const foundUsers = await this.userAdapter.findUser(newUser.email)
        if (foundUsers){
            return {message: 'A user with ths email already exists', code: 409};
        }

        const createdUser = await this.userAdapter.storeUser(newUser);

        if (createdUser !== undefined){
            const sentToken = await this.sendConfirmationToken(createdUser)
            return sentToken
            
        }
        return {message: "An error has occured, user could not be created", code: 400}
    }

    async sendConfirmationToken(user) {
        const confirmationToken = await this.userAdapter.createConfirmationToken(user)
            const confirmationEmail = {receipient: user.email, token: confirmationToken.token}
            if (user.verified){
                await this.emailService.sendResetPasswordToken(confirmationEmail);
                return
            }
            await this.emailService.sendConfirmation(confirmationEmail);
            return {message: 'User created successfully', code: 200};
            
    }

    async activateUser(token){
        const activation = await this.userAdapter.validateUser(token)
        return activation
    }
    // END OF USER REGISTRATION

    // USER LOGIN
    async loginUser(serializedCredentials){
        const requestedUser = await this.userAdapter.findUser(serializedCredentials.email)
        if (requestedUser == null) {
            return {code:400, message:"An error has occured"}
        }

        const tomorrow = this.tomorrow()
        if (requestedUser.verified == false && requestedUser.createdAt < tomorrow ) {
            return {code:409, message:"Please verify your account"}
        } else if (requestedUser.verified == false) {
            const resendToken = await this.sendConfirmationToken(requestedUser)
            if (resenedToken.code == 200) {
                return {message: 'Token sent successfully', code: 200};
            }
        }

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

    async forgottenPassword(email){
        const foundUser = await this.userAdapter.findUser(email)
        if (foundUser) {
            this.sendConfirmationToken(foundUser)
        }
        return
    }

    async resetPassword(user) {
        const resetPassword = await this.userAdapter.resetUserPassword(user)
        return resetPassword
    }
    // END OF USER LOGIN

    // UTILS FUNCTION
    tomorrow(){
        let date = new Date()
        date.setDate(date.getDate() + 1);
        return date
    }

    

}

module.exports = UserActions