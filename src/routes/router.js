const { Router } = require("express");
const { logger } = require("../config/logger.config");

class ClassRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        req.logger.error(error);
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomeResponse(req, res, next) {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) => res.send({ status: "error", error });
    res.sendUserError = (error) => res.send({ status: "error", error });
    next();
  }

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next(); //cualquiera lo puede ver
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res
        .status(401)
        .send({ status: "error", error: "Not Authenticated" });

    const token = authHeader.split(" ")[1];
    logger.info(token);
    let user = jwt.verify(token, "CoderS3cR3t@");
    logger.info(user);
    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).send({ status: "error", error: "Not permission" });

    res.user = user;
    next();
  };

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallbacks(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallbacks(callbacks)
    );
  }
  put(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallbacks(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomeResponse,
      this.applyCallbacks(callbacks)
    );
  }

  //   get(path, ...callbacks) {
  //     this.router.get(path, this.applyCallbacks(callbacks))
  //   }
}

module.exports = ClassRouter;
