import CartItemsModel from "./cartItems.model.js";

export default class CartItemsController {
	add(req, res) {
		const { productId, quantity } = req.query;
		const userId = req.userId;

		CartItemsModel.add(productId, userId, quantity);
		res.status(201).send("cart updated, item added")
	}

	get(req, res) {
		const userId = req.userId;
		console.log(userId);

		const items = CartItemsModel.get(userId);
		if (items <= 0) {
			return res.status(404).send("Cart is empty, Add items to the cart")
		} else {
			return res.status(200).send(items);
		}
	}

	update(req, res) {
		const { productId, quantity } = req.query;
		CartItemsModel.update(productId, quantity);
		res.status(200).send("Cart Item update successfully")
	}
}