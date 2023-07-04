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
        
      const { page = 1, limit = 10 } = req.query;
      const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
        await usersService.getUsers({ page, limit });

      if (!docs) {
        return res.status(400).send("No hay usuarios");
      }
    //   res.status(200).render({
    //     users: docs,
    //     hasPrevPage,
    //     prevPage,
    //     hasNextPage,
    //     nextPage,
    //   });
      
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
    res.send("email al usuario enviado")
  };

  getUser = async (req, res) => {
    const { id } = req.params;
    res.status(200).send(id);
  };

  createUser = async (req, res, next) => {
    try {
      let { first_name, last_name, email, edad } = req.body;
      if (!first_name || !last_name || !email) {
        CustomeError.createError({
          name: "User creation error",
          cause: generateUserErrorInfo({ first_name, last_name, email }),
          message: "Error trying to created user",
          code: EErrors.INVALID_TYPE_ERROR,
        });

        //return response.status(400).send({ message: 'Che pasar todos los datos'})
      }

      //let userAgregado = await usersService.createUser({first_name, last_name})
      let userAgregado = users.push({ first_name, last_name, email });
      // console.log(userAgregado)

      res.status(201).send({
        users,
        userAgregado,
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
