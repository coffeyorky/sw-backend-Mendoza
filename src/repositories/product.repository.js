const { UserDto } = require("../dto/user.dto");

//const RepositoryGeneric = require("./repositoryGeneric");

class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    getProducts = async () => {
        return await this.dao.getProduct()
    }

    getProduct = async (id) => {
        return await this.dao.getById(id)
    }

    createProduct = async (newProduct) => {
        return await this.dao.addProduct(newProduct)
    }

    updateProd = async (id, productToReplace) => {
        return await this.dao.updateProduct(id, productToReplace)
    }


}

module.exports = ProductRepository