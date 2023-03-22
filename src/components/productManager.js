// const { promises: fs } = require("fs");
import {promises as fs} from "fs";

export default class ProductManager {
  constructor() {
    this.ruta = "./prod.txt";
    this.products = [];
  }

  // crearDoc = async () => {
  //   try {
  //     await fs.promises.writeFile(
  //       "./prod.txt",
  //       JSON.stringify(productsArray, null, 2),
  //       "utf-8"
  //     );
  //   } catch (err) {
  //     console.log(productsArray);
  //   }
  // };
  static id = 0;
  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      id: ProductManager.id,
      title,
      description,
      price,
      imagen,
      code,
      stock,
    };

    this.products.push(newProduct);
    await fs.writeFile(
      this.ruta,
      JSON.stringify(this.products, null, 2),
      "utf-8"
    );
  };

  readProducts = async () => {
    let rea = await fs.readFile(this.ruta, "utf-8");
    return JSON.parse(rea);
  };

  getProducts = async () => {
    let prodRed = await this.readProducts();
    return console.log(prodRed);
  };

  getProductById = async (id) => {
    let us = await this.readProducts();
    if (!us.find((product) => product.id === id)) {
      console.log("producto no ecnontrado");
    }
    console.log(
      "por id",
      us.find((product) => product.id === id)
    );
  };

  deleteById = async (id) => {
    let productos = await this.readProducts();
    let productosFilt = productos.filter((products) => products.id != id);

    await fs.writeFile(
      this.ruta,
      JSON.stringify(productosFilt, null, 2),
      "utf-8"
    );

    console.log("se elimino el producto");
  };

  updateProduct = async (id, ...producto) => {
    await this.deleteById(id);
    let producOld = await this.readProducts();
    let modif = [{...producto, id }, ...producOld];
    await fs.writeFile(this.ruta, JSON.stringify(modif, null, 2), "utf-8")
  };
}

// const productos = new ProductManager();
//  productos.addProduct(
//    "Remera Bad batch",
//    "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
//    100,
//    "https://i.ibb.co/VVcTQv2/thbbr.jpg",
//    "sw10",
//    15
//  );
//   productos.addProduct(
//     "Taza Star wars",
//     "Vasija pequeña de color blanco con el logo de un Trooper en medio",
//     200,
//     "https://i.ibb.co/5k7ZKWY/taza.png",
//     "sw11",
//     15
//   );
//   productos.addProduct(
//     "Figura Black Series",
//     "Figuras HotToys de rex y cody de Clone Wars - 1/6 scale collectible figure",
//     160,
//     "https://i.ibb.co/NZSXyYt/rex.jpg",
//     "st14",
//     15
//   )
//   productos.addProduct(
//     "Funko Hunter Star Wars",
//     "Funko pop de Hunter lider del equipo en la serie The Bad Batch",
//     90,
//     "https://i.ibb.co/pw82S81/funko.jpg",
//     "st15",
//     15
//   );
//  productos.addProduct(
//    "Coleccionable",
//    "Figura HotToys del protagonista de The Mandalorian",  
//    100,  
//    "https://i.ibb.co/sRYD530/tmand.jpg",
//    "st16",
//    15
//  )
//  productos.addProduct(
//    "Comic Darth Maul",
//    "Historias del pasado del hijo de dathomir, 40 hojas",
//    70,
//    "https://i.ibb.co/KNN9Vcm/comic.jpg",
//    "st17",
//    15
//  )

// console.log("añadido", productos.addProduct());

// productos.updateProduct({
//   id: 4,
//   title: "Funko Hunter Star Wars",
//   description: "Funko pop de Hunter lider del equipo en la serie The Bad Batch",
//   price: 150,
//   imagen: "https://i.ibb.co/pw82S81/funko.jpg",
//   code: "st15",
//   stock: 15,
// });

// productos.getProducts();
// productos.getProductById(2);

