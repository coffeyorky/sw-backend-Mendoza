const RepositoryGeneric = require("./repositoryGeneric")

class OrderRepository extends RepositoryGeneric {
    constructor(dao){
        super(dao)
    }

}

module.exports = OrderRepository
