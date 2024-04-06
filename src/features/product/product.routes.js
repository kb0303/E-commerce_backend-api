// routes/paths to ProductController
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

const ProductRouter = express.Router();

const productController = new ProductController();

// Paths to controller methods
ProductRouter.get('/', productController.getAllProducts);
ProductRouter.post('/', upload.single('imageUrl'), productController.addProduct);

ProductRouter.get('/filteredProducts', productController.filterProduct);
ProductRouter.get('/:id', productController.getOneProduct);

export default ProductRouter;