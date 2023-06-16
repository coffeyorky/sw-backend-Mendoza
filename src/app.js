const express = require("express");
const routerApp = require("./routes");
const ProductRou = require("./routes/productos.routes.js");
const CartRouter = require("./routes/carts.routes.js");
const viewsRouter = require("./routes/allProduct.routes.js");
const cookieRouter = require("./routes/cookie.router.js");
const sessionRouter = require("./routes/session.router.js");
const userRouter = require("./routes/users.router.js");
const testRouter = require("./routes/pruebas.router.js");
const handlebars = require("express-handlebars");
const { objConfig } = require("./config/config.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store");

const fileStorege = FileStore(session);
const { create } = require("connect-mongo");
const { initializePassport } = require("./passport-jwt/passport.config");
const passport = require("passport");

objConfig.connectDB();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser("CoderS3cR3tQ@"))
app.use(cookieParser('CoderS3cR3t@'));
// app.use(session({
//   store: new MongoStorege({
//     ttl: 100000000000,
//     retries: 3,
//     path: __dirname+`/fileSession`
//   }),
//   secret: "secretCoder",
//   resave: true,
//   saveUninitialized: true
// }))

// app.use(session({
//   store: create({
//     mongoUrl: objConfig.url,
//     mongoOptions: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//       },
//       ttl: 100000000*24
//   }),
//   secret: "secretCoder",
//   resave: true,
//   saveUninitialized: true
// }))

initializePassport();
app.use(passport.initialize());
// app.use(passport.session())

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
app.use("/api/cart", CartRouter);
app.use("/api/usuarios", userRouter);
app.use("/pruebas", testRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Servidor Expres puerto ${PORT}`);
});
