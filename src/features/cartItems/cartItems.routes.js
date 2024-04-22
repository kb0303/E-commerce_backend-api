// routes/paths to CartItemsController
import express from "express";
import CartItemsController from "./cartItems.controller.js";

const CartItemRouter = express.Router();

const cartItemsController = new CartItemsController();

CartItemRouter.get('/', cartItemsController.get);
CartItemRouter.post('/', cartItemsController.add);
CartItemRouter.put('/', cartItemsController.update);
CartItemRouter.delete('/:id', cartItemsController.delete);

export default CartItemRouter;