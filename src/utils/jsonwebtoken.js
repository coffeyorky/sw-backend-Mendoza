const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "CoderKey";

const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader)
  if (!authHeader)
    return res
      .status(401)
      .send({ status: "error", message: "no se envio el token" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return res
        .status(401)
        .send({ status: "error", message: "Token invalido" });
    req.user = credentials.user;
    next();
  });
};

module.exports = {
  generateToken,
  authToken,
};
