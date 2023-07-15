class RepositoryGeneric {
    constructor(dao){
        this.dao = dao
    }

    getItems = () =>{
        return this.dao.get()
    } 

    getItem = (id) =>{
        return this.dao.getById(id)
    }

    createItem = (newItem) => {
        return this.dao.create(newItem)
    }

    updateItem = (id, doc) => {
        return this.dao.update(id,doc);
    }

    deleteItem = (id) =>{
        return this.dao.delete(id);
    }
}

module.exports= RepositoryGeneric
