const ProdDto = require("../dto/product.dto")

//const RepositoryGeneric = require("./repositoryGeneric");

class ProductRepository {
    constructor(dao){
        this.dao = dao
    }
    get = (params) => {
        return this.dao.get(params)
    }

    getProduct = (id) => {
        return this.dao.getBy(id)
    }

    create = (newProduct) => {
        return this.dao.save(newProduct)
    }

    updateProd = (id, productToReplace) => {
        return this.dao.updateProduct(id, productToReplace)
    }
    deleteItem = (id) =>{
        return this.dao.deleteProduct(id);
    }

}

module.exports = ProductRepository