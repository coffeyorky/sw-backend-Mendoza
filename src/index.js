const express = require("express");
const ProductRou = require("./routes/productos.routes.js");
const { CartRouter } = require("./routes/carts.routes.js");
const viewsRouter = require("./routes/allProduct.routes.js");
const views = require("./routes/views.routes.js");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use("/virtual", express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


app.use("/", express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/realTimeProducts", views);
app.use("/api/productos", ProductRou);
app.use("/api/cart", CartRouter);



const httpServer = app.listen(PORT, (err) => {
  if(err) console.log(err)
  console.log(`Servidor Expres puerto ${PORT}`);
});

const io = new Server(httpServer)
const logs = []


 io.on("connection", socket => {
   console.log("connected")
   socket.on("message1", data =>{
     console.log(data)
     io.emit("log",data)
   })


   socket.on("message2", data => {
     logs.push({socketid:socket.id,message:data})
     io.emit("log",{logs})
   })
 })
