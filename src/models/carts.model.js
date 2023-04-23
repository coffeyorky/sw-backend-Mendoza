const { Schema, model } = require("mongoose")

const collection = 'carts'

const CartSchema = new Schema({  
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'productos'
        }
        // quantity : {}
    }]
   
})

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const cartModel = model(collection,CartSchema)

module.exports = {
    cartModel
}
