const { schema } = require("../dao/models/products.model");
const UserDto = require("../dto/user.dto");

const userValidation = (schema) => (req, res, next) => {
    const userRaw = req.body
    const user = new UserDto(userRaw)
    const result = schema.validate(user)

    if(result.error)
    return res.status(400).json({ status: "error userVal", payload: result.error })
    next()
}

const objValidation = (schema) => (req, res, next) => {
    const objectData = req.body
    const result = schema.validate(objectData)
    if(result.error)
    return res.status(400).json({ status: "error objValid", payload: result.error})
}

module.exports= { userValidation, objValidation }