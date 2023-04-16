const { connect } = require("mongoose")

let url = "mongodb+srv://Coffeyorky:thebadbatch123@cluster0.j69jxej.mongodb.net/ecommerce?retryWrites=true&w=majority"

const objConfig = {
    connectDB: async ()=>{
        try{
            await connect(url)
            console.log("base de datos conectada")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    objConfig
}