// routes/paths to ProductController
import express from "express";
import ProductController from "./product.controller";

const router = express.Router();

const productController = new ProductController();

// Paths to controller methods
router.get('/', productController.getAllProducts);

export default router;