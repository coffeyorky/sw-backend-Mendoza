const { Schema, model } = require('mongoose')

const collection = 'usuarios'

const UserSchema = new Schema({
    username: {
        type: String,
        index:true
    },
    first_name: {
        type: String,
        index:true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: String
})

const userModel = model(collection, UserSchema)

module.exports = {
    userModel
}
