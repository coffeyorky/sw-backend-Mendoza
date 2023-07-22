const { orderModel } = require("../models/order.model");

class OrderDaoMongo {
    constructor(){
        this.orderModel = orderModel
    }
    async get(){
        return await this.orderModel.find({})
    }

    async getById(oid){
        return await this.orderModel.findOne({_id: oid})
    }
    async create(newOrder){
        logger.info('dao',newOrder)
        return await this.orderModel.create(newOrder)
    }
    async update(oid){}
    async delete(oid){}
}

module.exports =  OrderDaoMongo
