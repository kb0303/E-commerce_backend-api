// routes/paths to OrderController
import express from "express";
import OrderController from "./order.controller.js";

const OrderRouter = express.Router();

const orderController = new OrderController();


OrderRouter.post('/', (req, res, next) => {
	orderController.placeOrder(req, res, next)
});

export default OrderRouter;