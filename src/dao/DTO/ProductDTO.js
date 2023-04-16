export default class ProductDTO {
  static getInsertDTO = (product) => {
    //Asegurar que lo que se inserte en la dv coincida con lo que se pide
    return {
      name: product.name,
      type: product.type,
      description: product.description || "Sin descripcion",
      price: product.price,
      stock: product.stock,
      Imgurl: product.Imgurl || "url de img",
    };
  };

  static getPresenterDTO = (product) => {
    return {
      name: product.name,
      price: product.price,
      Imgurl: product.Imgurl,
    };
  };

  static getDetailDTO = (product) => {
    return {
      name: product.name,
      type: product.type,
      description: product.description,
      price: product.price,
      stock: product.stock,
      Imgurl: product.Imgurl,
    };
  };
}
