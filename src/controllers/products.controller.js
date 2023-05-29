import { productService } from "../dao/index.js";

const createProduct = async (req, res) => {
  const file = req.file;
  const { name, type, description, price, stock } = req.body;
  const product = await productService.createProduct({
    name,
    type,
    description,
    price,
    stock,
    Imgurl: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`,
  });
  req.logger.info(`El producto ${product.name} fue creado con éxito`);
  res.send({ status: "success", success: true, payload: product });
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.send({ status: "success", success: true, payload: products });
};

export default {
  createProduct,
  getProducts,
};
