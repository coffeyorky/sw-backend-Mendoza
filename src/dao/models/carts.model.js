const { Schema, model } = require("mongoose")

const collection = 'carts'

const CartSchema = new Schema({  
    products: [{
        title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
          },
          thumbnail: {
            type: String
          },
        quantity : Number
    }]
})

 CartSchema.pre('findOne', function(){
     this.populate('products.product')
 })

const cartModel = model(collection, CartSchema)

module.exports = 
    cartModel