const { Router } = require("express");
const PaymentsService = require("../service/payments.service");


const prodArray = [
     {
         "id": "1",
         "title": "Remera Bad batch",
         "description": "Remera de talla universal con estampado de los personajes de la serie The Bad Batch",
         "code": "sw10",
         "price": 100,
         "status": "true",
         "stock": 15,
         "category": "ropa",
         "imagen": "https://i.ibb.co/VVcTQv2/thbbr.jpg"
       },
       {
        "id": "2",
        "title": "Taza Star wars",
        "description": "Vasija pequeña de color blanco con el logo de un Trooper en medio",
        "code": "sw11",
        "price": 200,
        "status": "true",
        "stock": 15,
        "category": "merch",
        "imagen": "https://i.ibb.co/5k7ZKWY/taza.png"
      },
      {
       "id": "3",
        "title": "Figura Black Series",
        "description": "Figuras HotToys de rex y cody de Clone Wars - 1/6 scale collectible figure",
        "code": "st14",
        "price": 160,
        "status": "true",
        "stock": 15,
        "category": "figuras",
        "imagen": "https://i.ibb.co/NZSXyYt/rex.jpg"
      },
      {
        "id": "4",
        "title": "Funko Hunter Star Wars",
        "description": "Funko pop de Hunter lider del equipo en la serie The Bad Batch",
        "code": "st15",
        "price": 90,
        "status": "true",
        "stock": 15,
        "category": "figuras",
        "imagen": "https://i.ibb.co/pw82S81/funko.jpg"
      },
      {
        "id": "5",
        "title": "Coleccionable",
        "description": "Figura HotToys del protagonista de The Mandalorian",
        "code": "st16",
        "price": 100,
        "status": "true",
        "stock": 15,
        "category": "figuras",
        "imagen": "https://i.ibb.co/sRYD530/tmand.jpg"
      },
      {
        "id": "6",
        "title": "Comic Darth Maul",
        "description": "Historias del pasado del hijo de dathomir, 40 hojas",
        "code": "st17",
        "price": 70,
        "status": "true",
        "stock": 15,
        "category": "novelas",
        "imagen": "https://i.ibb.co/KNN9Vcm/comic.jpg"
      }
 ]
const router = Router();

router.post("/payment-intents", async (req, res) =>{
    const productRequested = prodArray.find(product => product.id === Number(req.query.id))

    if(!productRequested) return res.status(404).send({
        status: "error",
        error: "Product not found"
    })

    const paymentIntentInfo = {
        amount: productRequested.price,
        currency: 'usd',
        metadata:{
            userId:'id.autogenerado-por-mongo',
            orderDetails: JSON.stringify({
                [productRequested.name]: 2
            },null, '\t'),
            address: JSON.stringify({
                street: 'Calle de prueba',
                postalCode: '3213',
                externalNumber: '123123'
            }, null, '\t')
        }
    }


    const service = new PaymentsService()
    let result = await service.createPaymentIntent(paymentIntentInfo)
    console.log(result)

    res.send({
    status: "success",
    payload: result
    })
})

module.exports = router;