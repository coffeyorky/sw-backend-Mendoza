const { Router } = require("express");
const { userModel } = require("../models/user.model.js");
const { createHash, checkValidPassword } = require("../utils/brcyptPass.js");
const passport = require("passport");
const { generateToken } = require("../utils/jsonwebtoken.js");

const router = Router();

const users = []

router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/login", async (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", message: "revisar usuario y contraseña" });

  // const { username, password } = req.body;
  // const user = await userModel.findOne({ username });
  // console.log(user)

  // if (!user) {
  //   return res.send({
  //     status: "error",
  //     message: "pase o user no son correctos"
  //   });
  // }

  // const isValidPassword = checkValidPassword({
  //   hashedPassword: user.password,
  //   password
  // })
  // if (!isValidPassword) {
  //   return res.send({ status: "error", message: "revisar usuario y contraseña"})
  // }

  req.session.user = {
    username: req.user.username,
    email: req.user.email,
    admin: true,
  };

  res.send({
    status: "success",
    payload: req.session.user,
    message: "login correcto",
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
const {name, email, password} = req.body

  const userExist = users.find((user) => user.email === email)
  if(userExist) return res.status(400).send({status: "error", message: "el usuario ya existe"})
  const newUser = {
    name,
    email,
    password
  }

  users.push()

  const accessToken = generateToken(newUser)

    res.send({
      status: "success",
      message: "usuario creado",
      accessToken,
    });
    // try {
    //   const { username, first_name, last_name, email, password } = req.body;

    //   const exist = await userModel.findOne({ email });
    //   if (exist) return res.send({ status: "error", message: "ya existe el usuario" });

    //   const passwordHash = createHash(password)
    //   console.log({passwordHash})

    //   const newUser = {
    //     username,
    //     first_name,
    //     last_name,
    //     email,
    //     password: passwordHash,
    //   };

    //   await userModel.create(newUser);
    //   res.status(200).render("login");

    // } catch (error) {
    //   console.log(error);
    // }
  }
);

router.get(
  "/github",
  passport.authenticate("github")
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/failregister" }),
  (req, res) => {
    req.session.user = req.user
    res.redirect("/api/producto")
  }
);

router.get("/failregister", (req, res) => {
  res.send({ status: "error", message: "error al crear el usuario" });
});

router.put("/recoverypass", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
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
