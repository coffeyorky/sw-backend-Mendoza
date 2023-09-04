const { verifyToken } = require("../utils/handleToken");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const userModel = require("../dao/models/user.model");

const checkAuth = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
        handleHttpError(res, "Need_Session", 401)
        return
    }
    const token = req.headers.authorization.split(" ").pop()
    const dataToken = await verifyToken(token)

    if(!dataToken._id) {
        handleHttpError(res, "Error_Id_Token", 401)
        return
    }
    const user = await userModel.findById(dataToken._id)
    req.user = user

    next()
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = checkAuth;