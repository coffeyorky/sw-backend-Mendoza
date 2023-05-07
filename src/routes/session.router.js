const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("login", {});
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "anakin" || password !== "ElElegido") {
    return res.status(401).send("pass o user no es correcto");
  }
  req.session.user = username;
  req.session.admin = true;

  res.send("login success");
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
