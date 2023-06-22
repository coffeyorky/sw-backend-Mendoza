const { usersService } = require("../service");
const UserDto = require('../dto/user.dto')
const UserDaoMongo = require("../dao/mongo/products.mongo");

class UserController {
    getUsers = async (req, res) =>{
        try {
            const { page=1, limit=10 } = req.query
            const { docs, 
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage, 
            } = await usersService.getUsers({page, limit})
            
            if (!docs) {
                return res.status(400).send('No hay usuarios')            
            }
            res.status(200).send({
                users: docs,
                hasPrevPage,
                prevPage,
                hasNextPage,
                nextPage
            })
        } catch (error) {
            console.log(error)
        }
    }
    getUser = async (req, res) =>{
        const {id} = req.params
        res.status(200).send(id)

    }
    createUser = async (req, res) =>{
        try {
            let {first_name, last_name} = request.body
            if (!first_name || !last_name) {
                return response.status(400).send({ message: 'Che pasar todos los datos'})
            }
    
            let userAgregado = await usersService.createUser({first_name, last_name})
            // console.log(userAgregado)
    
            response.status(201).send({ 
                userAgregado,
                message: 'usuario creado' 
            })  
        } catch (error) {
            console.log(error)
        }
    }
    updateUser = async (req, res) =>{
        try {
            const { uid } = request.params
            let userToReplace = request.body
            if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
                return response.status(400).send({ message: 'Che pasar todos los datos'})
            }
            let result = await usersService.updateUser(uid, userToReplace)
            response.status(201).send({ 
                users: result,
                message: 'usuario Modificado' 
            })        
            } catch (error) {
                console.log(error) 
            }
    }

    deleteUser = async (req, res) =>{
        try {
            const { uid } = req.params
       
           let result = await usersService.deletUser(uid)
           
           res.status(200).send({ message:"Usuario borrado", result })       
           } catch (error) {
               console.log(error)
           }
    }
}



module.exports = new UserController;