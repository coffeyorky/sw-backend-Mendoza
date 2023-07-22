class ProdDto {
  static getProdInputFrom = (product) => {
    return {
      title: product.title || "",
      category: product.category || "",
      stock: product.stock || "",
      image: product.image || "",
    };
  };
}

module.exports = ProdDto;
