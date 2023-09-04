const userModel = require("./models/user.model");
const { logger } = require("../config/logger.config");

class UserDaoMongo {
  //  get = async ({page, limit, query=""}) =>  {
  //      const resp = await userModel.paginate({}, {limit, page, lean: true})
  //      console.log(resp)
  //      return resp
  //  }
  get = (params) => {
    return userModel.find(params)
  };

  getById = (id) => {
    return userModel.findOne(id);
  };

  save = (newItem) => {
    return userModel.create(newItem);
  };

  updateUser = (uid, userToReplace) => {
    return userModel.updateOne({ _id: uid }, userToReplace);
  };

  deletUser = (uid) => {
    return userModel.deleteOne({ _id: uid });
  };
}

module.exports = UserDaoMongo;
