const { promises : fs } = require("fs");
const { nanoid } = ("nanoid");

class ProductManager {
  constructor() {
    this.ruta = "./src/dao/models/products.json";
  }
  readProducts = async () => {
    let products = await fs.readFile(this.ruta);
    return JSON.parse(products);
  };
  writeProducts = async (product) => {
    await fs.writeFile(this.ruta, JSON.stringify(product, null, 2), "utf-8");
  };

  exist= async (id) => {
    let may = await this.readProducts();
    return may.find(prod => prod.id === id);
  }

  addProducts = async (product) => {
    let productGuar = await this.readProducts();
    product.id = nanoid(2);
    let prodAll = [...productGuar, product];
    await this.writeProducts(prodAll);

    return "Producto Agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProdById = async (id) => {
     let prodById = await this.exist(id);
     if (prodById) return "producto no encontrado";
     return prodById;
  };

  updateProducts = async (id, produc) => {
    let prodById = await this.exist(id);
    if(!prodById) return "Producto no encontrado"
    await this.deleteProducts(id)
    let oldProd = await this.readProducts()
    let products = [{...produc, id : id}, ...oldProd]
    await this.writeProducts(products)
    return "Producto Actualizado"
  }

  deleteProducts = async (id) => {
    let day = await this.readProducts();
    let exProd = day.some(prod => prod.id === id);
    if (exProd) {
      let fltrProd = day.filter(prod => prod.id != id);
      await this.writeProducts(fltrProd);
      return "producto eliminado"
    }
    return "no se encontro el producto a eliminar"
  };
}

module.exports = ProductManager;
