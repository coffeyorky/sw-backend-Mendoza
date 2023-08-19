const { createHash, isValidPassword } = require("../utils/brcyptPass.js");
const passport = require("passport");
const { generateToken, authToken } = require("../utils/jsonwebtoken.js");
const jwt = require("jsonwebtoken");
const UserDaoMongo = require("../dao/user.mongo.js");
const userModel = require("../dao/models/user.model.js");
const { faker } = require("@faker-js/faker");
const { logger } = require("../utils/logger.js");
const UserDto = require("../dto/user.dto.js");

const userDaoMongo = new UserDaoMongo();

const users = [
  {
    first_name: "rex",
    last_name: "rex",
    email: "rex@rex",
    password: "rex",
    admin: true,
  },
];

class SessionController {
  get = (req, res) => {
    res.render("login", {});
  };

  postSession = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      logger.info(user);
      if (!user) {
        return res.send({
          status: "error",
          message: "revisar usuario y contraseña",
        });
      }
      const isValid = await isValidPassword(user, password);
      logger.info(isValid);
      if (!isValid)
        return res.status(401).send({
          status: "error",
          message: "revisar usuario y contraseña",
        });
      logger.info("logged in!");
      const userDto = UserDto.getUserTokenFrom(user);
      const token = jwt.sign(userDto, "tokenSecretJWT", { expiresIn: "24h" });
      res
        .cookie("coderCookie", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        })
        .send({
          status: "success",
          message: "login correcto",
        });
    } catch (error) {
      console.log(error);
    }
  };

  getRegister = (req, res) => {
    res.render("register");
  };

  postRegister = async (req, res) => {
    try {
      const { username, first_name, last_name, email, password } = req.body;
      const userExist = await userModel.findOne({ email });
      if (userExist)
        return res
          .status(401)
          .send({ status: "error", message: "el usuario ya existe" });
      const hashedPassword = createHash(password);
      const newUser = {
        username,
        first_name,
        last_name,
        email,
        password: hashedPassword,
      };
      logger.info(users);
      const resp = await userModel.create(newUser);
      const token = generateToken({
        username,
        email,
        role: "user",
      });
      logger.info(token);

      res.status(200).send({
        status: "success",
        message: "usuario creado",
        token,
      });
    } catch (error) {
      logger.info(error);
    }
  };

  getCookie = async (req, res) => {
    const cookie = req.cookies["coderCookie"];
    const user = jwt.verify(cookie, "tokenSecretJWT");
    if (user) return res.send({ status: "success", payload: user });
  };

  getFake = (req, res) => {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();

    res.send({
      first_name,
      last_name,
      email,
      password,
    });
  };

  getGit = (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/producto");
  };

  getPass = (req, res) => {
    res.send({ status: "error", message: "error al crear el usuario" });
  };

  putFind = async (req, res) => {
    const { email, password } = req.body;
    const user = await userDaoMongo.findOne({ email });
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "el usuario no existe" });
    user.password = createHash(password);
    await user.save();
    res.send({ status: "success", message: "contraseña actualizada" });
  };

  getCount = (req, res) => {
    if (req.session.counter) {
      req.session.counter++;
      res.send(`Se a visitado el sitio ${req.session.counter} veces`);
    } else {
      req.session.counter = 1;
      res.send("Bienvenido");
    }
  };

  getLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: "Logout error", message: err });
      res.send("logout ok");
    });
  };
}

module.exports = new SessionController();