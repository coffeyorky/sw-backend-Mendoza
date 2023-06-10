const { Router } = require("express");
const { userModel } = require("../models/user.model.js");
const { createHash, checkValidPassword } = require("../utils/brcyptPass.js");
const passport = require("passport");
const { generateToken, authToken } = require("../utils/jsonwebtoken.js");
const jwt = require("jsonwebtoken");

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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // const user = users.find((user) => user.email === email && user.password === password);
  if (email !== "rex@rex" || password !== "rex") {
    return res.status(401).send({
      status: "error",
      message: "revisar usuario y contraseña",
    });
  }
  let token = jwt.sign({ email, password }, "CoderS3cR3tQ@", { expiresIn: "24h" });

  res.cookie("coderCookie", token, { 
       maxAge: 60 * 60 * 1000,
       httpOnly: true
     })
    .status(200).send({
      status: "success",
      message: "Login in successfully",
      token,
    });
});

// router.get("/current", authToken, (req, res) => {
//   res.send({
//     status: "success",
//     payload: req.user,
//   });
// });

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;
    const userExist = users.find((user) => user.email === email);
    if (userExist)
      return res.send({ status: "error", message: "el usuario ya existe" });

    users.push({ username, first_name, last_name, email, password });
    console.log(users);

    const token = generateToken({
      username,
      email,
      role: "user",
    });
    console.log(token);

    res.status(200).send({
      status: "success",
      message: "usuario creado",
      token,
    });
    //await userModel.create(users);
    // res.status(200).render("login")
  } catch (error) {
    console.log(error);
  }
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
