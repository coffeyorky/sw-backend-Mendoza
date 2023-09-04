const { UserDto } = require("../dto/user.dto");

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  get = (params) => {
    return this.dao.get(params);
  };
  getById = (id) => {
    return this.dao.getById(id);
  };
  createUser = async (user) => {
    return this.dao.save(user);
  };
  getUserByEmail = (email) =>{
    return this.dao.getBy({email});
}
  updateUser = (uid, userToReplace) => {
    return this.dao.updateUser({ _id: uid }, userToReplace);
  };
  deleteItem = (id) => {
    return this.dao.delete(id);
  };
}

module.exports = UserRepository;
