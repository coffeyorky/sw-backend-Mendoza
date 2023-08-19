const { usersService } = require("../service");
const UserDto = require("../dto/user.dto");
const UserDaoMongo = require("../dao/mongo/products.mongo");
const CustomeError = require("../utils/errors/CustomError");
const EErrors = require("../utils/errors/EErrors");
const { generateUserErrorInfo } = require("../utils/errors/info");
const { logger } = require("../utils/logger");
const { sendMail } = require("../utils/sendMail");

const users = [];

class UserController {
  getUsers = async (req, res) => {
    try {
      // const { page = 1, limit = 10 } = req.query;
      // const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
      //   await usersService.getUsers({ page, limit });
      const users = await usersService.get();
      if (!users) {
        return res.status(400).send("No hay usuarios");
      }
        //  res.status(200).render({
        //    users: docs,
        //    hasPrevPage,
        //    prevPage,
        //    hasNextPage,
        //    nextPage,
        //  });
        res.status(200).send({
            status: "success", 
            payload: users
            });
    } catch (error) {
      console.log(error);
    }
  };

  get = async (req, res) => {
    let userMail = "rossitamb@gmail.com";
    let subject = "Email de prueba";
    let html = `
            <h1>hola</h1>
            `;
    await sendMail({ userMail, subject, html });
    res.send("email al usuario enviado");
  };

  getUser = async (req, res) => {
    const { id } = req.params;
    res.status(200).send(id);
  };

  createUser = async (req, res, next) => {
    try {
      let { username, first_name, last_name, password, email} = req.body;
      const newUser = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password,
        email: email
      }
      if (!first_name || !last_name || !email) {
        CustomeError.createError({
          name: "User creation error",
          cause: generateUserErrorInfo({ first_name, last_name, email }),
          message: "Error trying to created user",
          code: EErrors.INVALID_TYPE_ERROR,
        });
      }

      let result = await usersService.createUser(newUser)
      //let userAgregado = users.push({ first_name, last_name, email });

      res.status(201).send({
        status: "success",
        message: "usuario creado",
      });
    } catch (error) {
      next(error);
    }
  };
  updateUser = async (req, res) => {
    try {
      const { uid } = request.params;
      let userToReplace = request.body;
      if (
        !userToReplace.first_name ||
        !userToReplace.last_name ||
        !userToReplace.email
      ) {
        return response
          .status(400)
          .send({ message: "Che pasar todos los datos" });
      }
      let result = await usersService.updateUser(uid, userToReplace);
      response.status(201).send({
        users: result,
        message: "usuario Modificado",
      });
    } catch (error) {
      req.logger.error(error);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { uid } = req.params;

      let result = await usersService.deletUser(uid);

      res.status(200).send({ message: "Usuario borrado", result });
    } catch (error) {
      req.logger.error(error);
    }
  };
}

module.exports = new UserController();
