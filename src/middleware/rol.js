const { verifyToken } = require("../utils/handleToken");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const userModel = require("../dao/models/user.model");
 /**
  * @param {*} rol
  * @returns
  */
const authorization = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    console.log({ user });
    const rolesByUser = user.role;

    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );
    if (!checkValueRol) {
      handleHttpError(res, "User_Not_permissions", 403);
      return;
    }
    next();
  } catch (error) {
    console.log(error)
  }
}; 

module.exports = {
  authorization,
};
