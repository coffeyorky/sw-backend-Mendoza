const express = require("express");
const routerApp = require("./routes");
const ProductRou = require("./routes/productos.routes.js");
const CartRouter = require("./routes/carts.routes.js");
const viewsRouter = require("./routes/allProduct.routes.js");
const cookieRouter = require("./routes/cookie.router.js");
const sessionRouter = require("./routes/session.router.js");
const { UserRouter } = require("./routes/user.js");
const usersRouter = require("./routes/users.router.js");
const testRouter = require("./routes/pruebas.router.js");
const handlebars = require("express-handlebars");
const configObje = require("./config/config.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store");

const { Server } = require('socket.io')
const { initSocket } = require('./utils/initSocker.js')
const { create } = require("connect-mongo");
const { initializePassport } = require("./passport-jwt/passport.config");
const passport = require("passport");
// const { processFunction } = require("./utils/process.js");
require("dotenv").config()

configObje.dbConnection();
// configObje.dbConnection();

const app = express();
const PORT = process.env.PORT || 8080
//console.log(configObje)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('CoderS3cR3t@'));

initializePassport();
app.use(passport.initialize());
// app.use(passport.session())

// processFunction()

app.use(routerApp);

app.use(express.static("public"));

app.use("/virtual", express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/subir", express.static(__dirname + "/public"));

app.use("/session", sessionRouter);
app.use("/cookie", cookieRouter);
app.use("/", viewsRouter);
app.use("/api/producto", ProductRou);
app.use("/api/carts", CartRouter);
app.use("/api/usuarios", usersRouter);

app.use("/pruebas", testRouter);

const usRouter = new UserRouter()
app.use("/users", usRouter.getRouter())

// app.listen(PORT, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Servidor Expres puerto ${PORT}`);
// });
const httpServer = app.listen(PORT,err =>{
  if (err)  console.log(err)
  console.log(`Escuchando en el puerto: ${PORT}`)
})


const io = new Server(httpServer)
initSocket(io)