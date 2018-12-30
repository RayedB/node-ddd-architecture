import UserActions from '../../application/useCases/user.usecase'
import UserSerializer from '../serializer/user.serializer'


class AuthorizationController {

    constructor(){
        this.actions = new UserActions();
        this.serializerUser = new UserSerializer();
    }

    async createUser(httpBody) {
        if (httpBody.email && httpBody.password){
            const serializedUserData = this.serializerUser.SerializeForRegister(httpBody);
            if ( serializedUserData instanceof UserSerializer){
                const userCreation = await this.actions.findOrCreateUser(serializedUserData);
                return userCreation
            }
        }
    }

    async authenticateUser(httpBody) {
        if (httpBody.email && httpBody.password){
            const serializedUserData = this.serializerUser.SerializeForLogin(httpBody);
            if ( serializedUserData instanceof UserSerializer){
                const userLogin = await this.actions.loginUser(serializedUserData);
                return userLogin
            }
        }
    }

    async confirmUser(httpRequest) {
        if (httpRequest.query.token == undefined) {
            return {message: "no token", code: 500}
        }
        const confirmation = await this.actions.activateUser(httpRequest.query.token);
        return confirmation
    }

    async forgottenPassword(httpBody) {
        if (httpBody.email == undefined) {
            return {message: "no email sent", code: 500} 
        }
        const email = httpBody.email.trim().toLowerCase()
        const sendToken = await this.actions.forgottenPassword(email)
        return
    }

    async resetPassword(httpRequest) {
        if (httpRequest.query.token == undefined) {
            return {message: "no token", code: 500}
        }
        const serializedUser = this.serializerUser.SerializeForReset(httpRequest.body);
        if ( serializedUser instanceof UserSerializer){
            serializedUser.token = httpRequest.query.token
            console.log(serializedUser)
            const resetPassword = await this.actions.resetPassword(serializedUser);
            return resetPassword
        }
        return {code: 400, message:"An error has occured, could not reset password"}
    }

}

export default AuthorizationController;