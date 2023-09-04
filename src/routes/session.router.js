const { Router } = require("express");
const passport = require("passport");
const {
  get,
  postSession,
  getRegister,
  postRegister,
  getCookie,
  getFake,
  getGit,
  getPass,
  putFind,
  getCount,
  getLogout,
} = require("../controllers/session.controller");
const router = Router();

router.get("/login", get);
router.post("/login", postSession);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/current", getCookie);
router.get("/test/user", getFake);
router.get("/github", passport.authenticate("github"));
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/failregister" }),
  getGit
);
router.get("/failregister", getPass);
router.put("/recoverypass", putFind);
router.get("/", getCount);
router.get("/logout", getLogout);

module.exports = router;
