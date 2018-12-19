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

        // this.actions.bounceUser(this.serializerdUser)
    }

}

export default AuthorizationController;