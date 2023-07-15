const { Router } = require('express')
const { getUsers, get, getUser, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const { authToken } = require("../utils/jsonwebtoken")

const router = Router()

// get http://localhost:8080/api/users
router.get('/', getUsers)
router.get('/mail', get)
router.get('/:id', getUser)
router.post('/c', createUser)
router.put('/:uid', updateUser)
router.delete('/:uid', deleteUser)

module.exports = router

