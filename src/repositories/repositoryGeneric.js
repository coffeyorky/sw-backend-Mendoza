class RepositoryGeneric {
    constructor(dao){
        this.dao = dao
    }

    async getItems(){
        return await this.dao.get()
    }
    async getItem(id){
        return await this.dao.getById(id)
    }
    async createItem(newItem){
        return await this.dao.create(newItem)
    }
    async updateItem(id){}
    async deleteItem(id){}
}

module.exports= RepositoryGeneric
