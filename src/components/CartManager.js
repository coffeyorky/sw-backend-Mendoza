import { promises as fs } from "fs";
import ProductManager from "./productManager.js";

const productAll = new ProductManager();

class CartManager {
  constructor() {
    this.ruta = "./src/models/carts.json";
  }

  leeArch = async () => {
    try{
      const carts = await fs.readFile(this.ruta, "utf-8")
      return JSON.parse(carts)
    } catch (error) {
      return[]
    }
  }

  createCart = async (cart) => {
    let carts = await this.leeArch()

    if(carts.length === 0){
      carts.push({id:1, ...cart})
      await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2), "utf-8")
      return carts
    }
    carts.push({id: carts.length + 1, ...cart})
    await fs.writeFile(this.ruta, JSON.stringify(carts, null, 2), "utf-8")
    return carts
  }

  addProductInCart = async (cid, pid) => {
    try {
      let cartsDb = await this.leeArch()
      const idxCart = cartsDb.findIndex(cart => cart.id === cid)
      if(idxCart === -1) {
        return "no existe el cart"
      }
      const idxProduct = cartsDb[idxCart].productos.findIndex(prod => prod.id === pid)
      if(idxProduct === -1) {
        cartsDb[idxCart].productos.push({id: pid, quantity: 1})
      } else {
        cartsDb[idxCart].productos[idxProduct].quantity ++
      }
      await fs.writeFile(this.ruta, JSON.stringify(cartsDb, null, 2), "utf-8")
      return cartsDb
    } catch (error) {
      return new Error(error)
    }
  }

  getCartById = async (cid) => {
    let cartsDb = await this.leeArch()

    let cart = cartsDb.find(cart => cart.id === cid)
    if(!cart) {
      return "no existe el carrito"
    }
    return cart
  }

  // readCart = async () => {
  //   let cart = await fs.readFile(this.ruta);
  //   return JSON.parse(cart);
  // };
  // writeCart = async (cartWr) => {
  //   await fs.writeFile(this.ruta, JSON.stringify(cartWr, null, 2), "utf-8");
  // };

  // exist = async (id) => {
  //   let may = await this.readCart();
  //   return may.find((cart) => cart.id === id);
  // };

  // addCart = async () => {
  //   let cartOld = await this.readCart();
  //   let id = nanoid(2);
  //   let cartConcat = [{ id: id, products: [] }, ...cartOld];
  //   await this.writeCart(cartConcat);
  //   return "Carrito agregado";
  // };

  // getCartById = async (id) => {
  //   let cartById = await this.exist(id);
  //   if (!cartById) return "Carrito no encontrado";
  //   return cartById;
  // };

  // addProdductInCart = async (cartId, productId) => {
  //   let cartFi = await this.exist(cartId);
  //   if (!cartFi) return "Carrito no encontrado";
  //   let productById = await productAll.exist(productId);
  //   if (!cartFi) return "Producto no encontrado";

  //   let cartsAll = await this.readCart();
  //   let cartFilt = cartsAll.filter((cart) => cart.id != cartId);

  //   if (cartFi.products.some((prod) => prod.id === productId)) {
  //     let moreprodICart = cartFi.products.find((prod) => prod.id === productId
  //       );
  //       moreprodICart.cantidad++;
  //     console.log(moreprodICart.cantidad);
  //     let cartsConcat = [cartFi, ...cartFilt];
  //     await this.writeCart(cartsConcat);
  //     return "Producto sumado al carrito";
  //   }

  //   cartFi.products.push({ id: productById.id, cantidad: 1 })

  //   let cartsConcat = [cartFi, ...cartFilt];
  //   await this.writeCart(cartsConcat);
  //   return "Producto agregado al carrito";
  // };
}

export default CartManager;
