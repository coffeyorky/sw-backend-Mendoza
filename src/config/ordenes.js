// const { ordenes } = require("./ordenes");
// const productsModel = require("../models/products.model");

//  const insertProducts = async() =>{
    //      const result = await productsModel.insertMany(ordenes)
    //      console.log(result)
    //  }
    //  insertProducts()
    //  const product = await productsModel.aggregate([
    //    {
    //      $match: {category: `figuras`}
    //    },
    //    {
    //      $group: {_id: `figuras`, promedio: {$avg: `$price`}}
    //    }
    //  {
    //     $sort: {_id: 1}
    //  }
    //   {
    //      $merge: {
    //       into: "reports"
    //     }
    //   }
    //  ])
    //   console.log(product)
const ordenes = [
    {
        title: "Remera Bad batch",
        description: "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
        price: 100,
        category: "ropa",
        thumbnail: "https://i.ibb.co/VVcTQv2/thbbr.jpg",
        stock: 15,
        code: "sw10",
        status: true
    },
    {
        title: "Taza Star wars",
        description: "Vasija pequeña de color blanco con el logo de un Trooper en medio",
        price: 25,
        category: "merch",
        thumbnail: "https://i.ibb.co/5k7ZKWY/taza.png",
        stock: 15,
        code: "sw11",
        status: true
    },
    {
        title: "Figura Black Series",
        description: "Figuras HotToys de rex y cody de Clone Wars - 1/6 scale collectible figure",
        price: 160,
        category: "figuras", 
        thumbnail: "https://i.ibb.co/NZSXyYt/rex.jpg",
        stock: 15,
        code: "sw12",
        status: true
    },
    {
        title: "Funko Hunter Star Wars",
        description: "Funko pop de Hunter lider del equipo en la serie The Bad Batch",
        price: 20,
        category: "figuras", 
        thumbnail: "https://i.ibb.co/pw82S81/funko.jpg",
        stock: 15,
        code: "sw13",
        status: true
    },
    {
        title: "Coleccionable",
        description: "Figura HotToys del protagonista de The Mandalorian",
        price: 200,
        category: "figuras", 
        thumbnail: "https://i.ibb.co/sRYD530/tmand.jpg",
        stock: 15,
        code: "sw14",
        status: true
    },
    {
        title: "Comic Darth Maul",
        description: "Historias del pasado del hijo de dathomir, 40 hojas",
        price: 20,
        category: "novelas",
        thumbnail: "https://i.ibb.co/KNN9Vcm/comic.jpg",
        stock: 15,
        code: "sw15",
        status: true
    },
    {
        title: "Tostadora Darth Vader",
        description: "Pequeña maquina diseñada para tostar pan, esta en particular hace las tostadas con marcas de Darth vader",
        price: 90,
        category: "merch",
        thumbnail: "https://i.ibb.co/nsVSL12/tostadora-Vader.png",
        stock: 15,
        code: "sw16",
        status: "true"
    },
    {
        title: "Tetera de R2D2",
        description: "Vasija de metal, porcelana, con tapadera y un pico provisto de colador interior o exterior, la cual se usa para hacer y servir el té pintada para asemejar al amigable amigo de anakin skywalker R2D2",
        price: 30,
        category: "merch",
        thumbnail: "https://i.ibb.co/3B5kt9Z/tetera.png",
        stock: 15,
        code: "sw17",
        status: "true"
    },
    {
        title: "Botas navideñas de Star Wars",
        description: "Son bolsas de tela vacía en forma de bota inpirada en diseños de Star wars que se cuelga el día de San Nicolás o Nochebuena para que San Nicolás (o las figuras relacionadas con Papá Noel y Santa Claus) pueda llenarlo con pequeños juguetes, dulces, frutas, monedas u otros obsequios",
        price: 50,
        category: "merch",
        thumbnail: "https://i.ibb.co/Px8YpF0/starwars-Medias.png",
        stock: 15,
        code: "sw18",
        status: "true"
    },
    {
        title: "Medias Boba Fett",
        description: "Prendas de tejido sintetico con estampado de Boba Fett",
        price: 10,
        category: "ropa",
        thumbnail: "https://i.ibb.co/mGPV4rm/medias-boba-Fett.jpg",
        stock: 15,
        code: "sw19",
        status: "true"
    },
    {
        title: "ARTFX TECH | THE BAD BATCH",
        description: "Figura de escala 1/7. Ningún otro ser o máquina es rival para sus habilidades tecnológicas mejoradas genéticamente. Conoce al experto en dispositivos y mecánica del escuadrón Clone Force 99, Tech",
        price: 180,
        category: "figuras", 
        thumbnail: "https://i.ibb.co/m0HNRGM/kotobukiya-Tech-Tbb.jpg",
        stock: 15,
        code: "sw20",
        status: "true"
    },
    {
        title: "Star Wars: Savage Opress Mini Busto",
        description: "Una vez un Hermano de la Noche común, ahora Savage Opress convertido en el aprendiz Sith del Conde Dooku, y más tarde en la mano derecha del imperio criminal de Darth Maul. ¡Ahora, es un mini busto a escala 1/6 completamente nuevo de Gentle Giant LTD! Con una altura aproximada de 6,5 pulgadas, este detallado minibusto captura al Dathomirian con el sable de luz apuntando a su oponente",
        price: "150",
        category: "figuras", 
        thumbnail: "https://i.ibb.co/0ng5kH1/CW-Savage-Opress-Bust.jpg",
        stock: 15,
        code: "sw21",
        status: "true"
    }
]


module.exports = {
    ordenes
}
