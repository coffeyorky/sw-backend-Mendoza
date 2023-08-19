class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  get = (params) => {
    return this.dao.get(params);
  };
  getById = (id) => {
    return this.dao.getById(id);
  };
  create = async (newCart) => {
    return this.dao.save(newCart);
  };
  update = (uid, cartToReplace) => {
    return this.dao.updateCart({ _id: uid }, cartToReplace);
  };
  delete = (id) => {
    return this.dao.deleteCart(id);
  };
}

module.exports = CartRepository;
