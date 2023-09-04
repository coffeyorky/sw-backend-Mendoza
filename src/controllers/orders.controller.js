 const { orderService } = require("../service")
 const { logger } = require("../config/logger.config");


 class OrderController{
     async getOrders(req, res){
        try {
            let orders = orderService.getItems()
            res.status(200).send({
                 status: 'success', 
                 payload: orders
             })
         } catch (error) {
            req.logger.error(error)
         }
     }
     async getOrder(req, res){
        try {
            const {oid} = req.params
           const order = await orderService.getItem(oid)
            res.status(200).send({
                status: 'success', 
                 payload: order
             })
         } catch (error) {
            req.logger.error(error)
         }
    }
    async createOrder(req, res){
        try {
            const {body} = req
            logger.info(body)
            const result = await orderService.createItem(body)
            res.status(200).send({
                 status: 'success', 
                message: 'order created'
            })
        } catch (error) {
            req.logger.error(error)
         }
     }
     async updateOrder(req, res){}
     async deleteOrder(req, res){}
 }

 module.exports = {
     OrderController
 }
