const {Schema, model} = require('mongoose')

const orderCollection = 'orders'

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    }],
    total: Number,
    created: Date
})

const orderModel = model(orderCollection, orderSchema)

module.exports = {
    orderModel
}
