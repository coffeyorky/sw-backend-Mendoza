class ProdDto {
  static getProdInputFrom = (product) => {
    return {
      title: product.title || "",
      category: product.category || "",
      stock: product.stock || "",
      thumbnail: product.thumbnail || "",
      description: product.description || "",
      price: product.price || "",
      code: product.code || "",
      status: product.status || ""
    };
  };
}

module.exports = ProdDto;
