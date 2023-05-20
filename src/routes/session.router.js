const { Router } = require("express");
const { userModel } = require("../models/user.model");

const router = Router();

router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (!user) {
    return res.send({ status: "error", message: "pase o user no son correctos"});
  }

    req.session.user = {
     username: user.username,
     email: user.email,
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

router.post("register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist)
      return res.send({ status: "error", message: "ya existe el usuario" });
    const newUser = {
      username,
      first_name,
      last_name,
      email,
      password,
    };
    await userModel.create(newUser);
    res.status(200).render("login");
  } catch (error) {
    console.log(error);
  }
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
