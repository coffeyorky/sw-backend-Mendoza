const { UserDto } = require("../dto/user.dto");

class UserRepository {
    constructor(dao){
        this.dao = dao
    }
    getUsers = async () => {
        return await this.dao.get()
    }

    getItem = async (id) => {
        return await this.dao.getById(id)
    }

    createUser = async (user) =>{
        let newUser = new UserDto(user)
        let result = await this.dao.save.create(newUser)
        return result
    }
    updateUser = async (uid, userToReplace) => {
        return await this.dao.updateUser({_id: uid}, userToReplace)
    }
}

module.exports = UserRepository