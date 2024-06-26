// routes/paths to CartItemsController
import express from "express";
import CartItemsController from "./cartItems.controller.js";

const CartItemRouter = express.Router();

const cartItemsController = new CartItemsController();

CartItemRouter.get('/', (req, res) => {
	cartItemsController.get(req, res)
});
CartItemRouter.post('/', (req, res) => {
	cartItemsController.add(req, res)
});
CartItemRouter.put('/', (req, res) => {
	cartItemsController.update(req, res)
});
CartItemRouter.delete('/:cartItemId', (req, res) => {
	cartItemsController.delete(req, res)
});

export default CartItemRouter;