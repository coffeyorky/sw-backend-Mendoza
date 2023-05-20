const { Router } = require("express");
const productManager = require("../dao/productManagerMongo");
const { authSession } = require("../middleware/auth.middleware");

const router = Router();

router.get("/", authSession, async (req, res) => {
  try {
    const { page = 1, limit=4 } = req.query;
    const { docs, hasPrevPage, prevPage, hasNextPage, nextPage } =
      await productManager.getProduct({ page, limit });
    if (!docs) {
      return res.status(400).send("no hay productos");
    }
    res.status(200).render(`product`, {
      products: docs,
      hasPrevPage,
      prevPage,
      hasNextPage,
      nextPage,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  res.send("get product by id");
});

router.post("/", async (req, res) => {
  try {
    let { title, description, price, thumbnail, stock, code, status } =
      req.body;
    if (!title || !thumbnail) {
      return res.status(400).send({ message: "pasar todos los datos" });
    }
    let prodAgregado = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      stock,
      code,
      status,
    });
    res.status(201).send({
      prodAgregado,
      message: "producto creado",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  let productToReplace = req.body;
  if (
    !productToReplace.title ||
    !productToReplace.thumbnail ||
    !productToReplace.price ||
    !productToReplace.code
  ) {
    return res.status(400).send({ message: "pasar todos los datos" });
  }
  let result = await productManager.updateProduct(pid, productToReplace);
  res.status(201).send({
    users: result,
    message: "Producto Modificado",
  });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  let result = await productManager.deleteProduct(pid);
  res.status(200).send({ message: "Producto borrado", result });
});

module.exports = router;
