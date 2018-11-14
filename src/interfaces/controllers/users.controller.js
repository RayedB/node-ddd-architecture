import UserActions from '../../application/useCases/user.usecase'
import UserSerializer from '../serializer/user.serializer'

class UserController {

    constructor(req) {
        this.actions = new UserActions()
        this.serializerdUser = new UserSerializer(req.body)
    }

    createUser() {
        this.actions.createUser(this.serializerdUser)
    }

    listUsers(){
        return "hello"
    }
}

module.exports = UserController