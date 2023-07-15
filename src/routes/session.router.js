const { Router } = require("express");
const { createHash, isValidPassword } = require("../utils/brcyptPass.js");
const passport = require("passport");
const { generateToken, authToken } = require("../utils/jsonwebtoken.js");
const jwt = require("jsonwebtoken");
const UserDaoMongo = require("../dao/mongo/user.mongo");
const { userModel } = require("../models/user.model.js");
const { faker } = require("@faker-js/faker");
const { logger } = require("../utils/logger.js");

const userDaoMongo = new UserDaoMongo();
const router = Router();

const users = [
  {
    first_name: "rex",
    last_name: "rex",
    email: "rex@rex",
    password: "rex",
    admin: true,
  },
];

router.get("/", (req, res) => {
  res.render("login", {});
});

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (email !== "rex@rex" || password !== "rex") {
//     return res.status(401).send({
//       status: "error",
//       message: "revisar usuario y contraseña",
//     });
//   }
//   let token = jwt.sign({ email, password, role:"user_premium" }, 'CoderS3cR3t@', {
//     expiresIn: "24h",
//   });
//   res
//     .cookie("coderCookie", token, {
//       maxAge: 60*60*1000,
//       httpOnly: true,
//     })
//     .status(200)
//     .send({
//       status: "success",
//       message: "Login in successfully",
//       token,
//     });
// });

router.post("/", async (req, res) => {
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

    const isValid = isValidPassword(user, password);
    logger.info(isValid);
    if (!isValid)
      return res.status(401).send({
        status: "error",
        message: "revisar usuario y contraseña",
      });
      logger.info("logged in!");

    res.send({
      status: "success",
      message: "login correcto",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

// router.post("/register", async (req, res) => {
//   try {
//     const { username, first_name, last_name, email, password } = req.body;
//     const userExist = users.find((user) => user.email === email);
//     if (userExist)
//       return res.send({ status: "error", message: "el usuario ya existe" });

//     users.push({ username, first_name, last_name, email, password });

//     const token = generateToken({
//       username,
//       email,
//       role: "user",
//     });
//     console.log(token);

//     res.status(200).send({
//       status: "success",
//       message: "usuario creado",
//       token,
//     });
//     //await userModel.create(users);
//     // res.status(200).render("login")
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/register", async (req, res) => {
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
    //res.status(200).render("login")
  } catch (error) {
    logger.info(error);
  }
});

router.get("/test/user", (req, res) => {
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
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/failregister" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/producto");
  }
);

router.get("/failregister", (req, res) => {
  res.send({ status: "error", message: "error al crear el usuario" });
});

router.put("/recoverypass", async (req, res) => {
  const { email, password } = req.body;
  const user = await userDaoMongo.findOne({ email });
  if (!user)
    return res
      .status(401)
      .send({ status: "error", message: "el usuario no existe" });
  user.password = createHash(password);
  await user.save();
  res.send({ status: "success", message: "contraseña actualizada" });
});

router.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se a visitado el sitio ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ status: "Logout error", message: err });
    res.send("logout ok");
  });
});

module.exports = router;
