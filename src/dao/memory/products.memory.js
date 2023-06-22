class ProductDaoMemory {
    constructor(){
        this.productos = []
    }
    get(){
        return this.productos 
    }
}

module.exports = ProductDaoMemory