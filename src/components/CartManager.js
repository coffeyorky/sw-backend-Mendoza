const { promises : fs } = require("fs");

class CartManager {
  constructor() {
    this.ruta = "./src/models/carts.json";
  }
  leeArch = async () => {
    try {
      const carts = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  };
  createCart = async (cart) => {
    let carts = await this.leeArch();

    if (carts.length === 0) {
      carts.push({ id: 1, ...cart });
      await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2), "utf-8");
      return carts;
    }
    carts.push({ id: carts.length + 1, ...cart });
    await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2), "utf-8");
    return carts;
  };

  addProductInCart = async (cid, pid) => {
    try {
      let cartsDb = await this.leeArch();
      const idxCart = cartsDb.findIndex((cart) => cart.id === cid);
      if (idxCart === -1) {
        return "no existe el cart";
      }
      const idxProduct = cartsDb[idxCart].productos.findIndex(
        (prod) => prod.id === pid
      );
      if (idxProduct === -1) {
        cartsDb[idxCart].productos.push({ id: pid, quantity: 1 });
      } else {
        cartsDb[idxCart].productos[idxProduct].quantity++;
      }
      await fs.writeFile(this.ruta, JSON.stringify(cartsDb, null, 2), "utf-8");
      return cartsDb;
    } catch (error) {
      return new Error(error);
    }
  };

  getCartById = async (cid) => {
    let cartsDb = await this.leeArch();

    let cart = cartsDb.find((cart) => cart.id === cid);
    if (!cart) {
      return "no existe el carrito";
    }
    return cart;
  };


}

module.exports = CartManager
