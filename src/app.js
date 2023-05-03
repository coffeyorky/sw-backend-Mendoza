const express = require("express");
const routerApp = require("./routes");
const ProductRou = require("./routes/productos.routes.js");
const CartRouter = require("./routes/carts.routes.js");
const viewsRouter = require("./routes/allProduct.routes.js");
const cookieRouter = require("./routes/cookie.router.js")
const handlebars = require("express-handlebars");
const { objConfig } = require("./config/config.js");
const cookieParser = require("cookie-parser")

objConfig.connectDB();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("CoderS3cR3tQ@"))

app.use(routerApp);

app.use(express.static("public"));

app.use("/virtual", express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/subir", express.static(__dirname + "/public"));

app.use("/cookie", cookieRouter)
app.use("/", viewsRouter);
app.use("/api/producto", ProductRou);
app.use("/api/cart", CartRouter);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Servidor Expres puerto ${PORT}`);
});
