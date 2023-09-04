const express = require("express");
const cors = require("cors");
const routerApp = require("./routes");
const ProductRou = require("./routes/productos.routes.js");
const CartRouter = require("./routes/carts.routes.js");
const viewsRouter = require("./routes/allProduct.routes.js");
const cookieRouter = require("./routes/cookie.router.js");
const sessionRouter = require("./routes/session.router.js");
const paymentsRouter = require("./routes/payments.router");
const ordersRouter = require("./routes/orders.router.js");
const { UserRouter } = require("./routes/user.js");
const usersRouter = require("./routes/users.router.js");
const testRouter = require("./routes/pruebas.router.js");
const handlebars = require("express-handlebars");
const { configObje, } = require("./config/config.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const { Server } = require("socket.io");
const { initSocket } = require("./utils/initSocker.js");
const { create } = require("connect-mongo");
const { initializePassport } = require("./passport-jwt/passport.config");
const passport = require("passport");
const { logger } = require("./config/logger.config");
const { addLogger } = require("./middleware/logger.middleware");
const  mongoose = require("mongoose");
const { swaggerOptions } = require("./config/swagger.config");


require("dotenv").config();

configObje.dbConnection();

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL)
// console.log(connection)
const specs = swaggerJsDoc(swaggerOptions);

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  logger.info(`Escuchando en el puerto: ${PORT}`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("CoderS3cR3t@"));
app.use(cors());

app.use(session({
  name : 'codeil',
  secret : 'something',
  resave :false,
  saveUninitialized: true,
  cookie : {
          maxAge:(1000 * 60 * 100)
  }      })) 
// app.use(session({
//   store: create({
//     mongoURL: configObje.mongoURL,
//     mongoOptions: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     ttl: 100000000*24
//   }),
//   secret: "secretCoder",
//   resave: true,
//   saveUninitialized: true
// }))
initializePassport();
app.use(passport.initialize());
// app.use(passport.session())

// processFunction()

app.use(routerApp);
app.use(addLogger);

app.use(express.static("public"));

app.use("/virtual", express.static(__dirname + "/public"));

//handlrebars_______________________
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
//handlrebars_______________________

app.use("/subir", express.static(__dirname + "/public"));

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/api/payments", paymentsRouter)
app.use("/api/session", sessionRouter);
app.use("/cookie", cookieRouter);
app.use("/", viewsRouter);
app.use("/api/producto", ProductRou);
app.use("/api/carts", CartRouter);
app.use("/api/users", usersRouter);
app.use("/api/ordenes", ordersRouter);

app.use("/pruebas", testRouter);

const usRouter = new UserRouter();
app.use("/users", usRouter.getRouter());

// app.get("/", (req, res) => {
//   res.render("index");
// });

initSocket(io);


const message = []
io.on("connection", (socket) => {
  console.log(`User ${socket.id} Connection`);

  //Nombre del usuario
  let userName = "";
  // Mesaje de Coneccion
  socket.on("userConnection", (data) => {
    userName = data.user;
    message.push({
      id: socket.id,
      info: "connection",
      name: data.user,
      message: `${data.user} Connectado`,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userConnection", message);
  });
  // Mensaje de Mesaje enviado
  socket.on("userMessage", (data) => {
    message.push({
      id: socket.id,
      info: "message",
      name: userName,
      message: data.message,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userMessage", message);
  });
  //Mensage Usuario escribiendo
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

