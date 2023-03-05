productsArray = [
    {
    id: 1, 
    tittle: "Remera Bad batch",
    description: "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
    price: "100",
    thumbnail: "https://i.ibb.co/VVcTQv2/thbbr.jpg",
    code: "sw10",
    stock: "15",
},


]

class ProductManager {
    constructor(){
        this.products = this.productsArray
    }
    addProduct(newProduct){
        const product = this.products.find(prod => prod.code === newProduct.code)
        if(product){
            return "existe"
        } 
        if (this.products.length === 0){
          this.products.push( {id: 1,  ...newProduct})
        } else {
          this.products.push( {id: this.products[this.product.length-1].id + id,  ...newProduct})
        }
         
    }
    getProducts(){
        return this.products
    }
    getProductById(){
        const product = this.products.find(prod => prod.id === id ) 
        if (!product) {
            return "not found"
        }
    }
}

const productos = new ProductManager()

console.log(productos.getProducts())
productos.addProduct({
    id: 2, 
    tittle: "Taza Star wars",
    description: "Vasija pequeña de color blanco con el logo de un Trooper en medio",
    price: "200",
    thumbnail: "https://i.ibb.co/5k7ZKWY/taza.png",
    code: "sw11",
    stock: "15"
})

console.log(productos.getProducts())
