const { userModel } = require("../models/users.model")


class ProductManagerMongo {

    getUsers = async () => await userModel.find()

    getProductsById = ( id ) => {

    }

    addProduct = async (newItem) => {
        return await userModel.create(newItem)
    }

    updateUser = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    deletUser = async (uid) => {
        return await userModel.deleteOne({_id: uid})
    }

}





module.exports = {ProductManagerMongo}