const jwt = require("jsonwebtoken");

const PRIVATE_KEY = 'CoderS3cR3tQ@';

const generateToken = (user) => {
  return jwt.sign(user, PRIVATE_KEY, { expiresIn: "24h" });
};

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  if (!authHeader)
    return res
      .status(401)
      .send({ status: "error", message: "no se envio el token" });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, PRIVATE_KEY, (error, credential) => {
    if (error)
      return res
        .status(403)
        .send({ status: "error", message: "Token invalido" });
    req.user = credential.user;
    next();
  });
};

module.exports = {
  generateToken,
  authToken,
};
