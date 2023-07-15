const { UserDto } = require("../dto/user.dto");

class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    getUsers = () => {
        return this.dao.get()
    }

    getItem = (id) => {
        return this.dao.getById(id)
    }

    createUser = async (user) =>{
        return this.dao.save(user)
    }
    
    updateUser = (uid, userToReplace) => {
        return this.dao.updateUser({_id: uid}, userToReplace)
    }
}

module.exports = UserRepository