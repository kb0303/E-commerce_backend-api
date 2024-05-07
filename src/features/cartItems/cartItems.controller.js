import CartItemsModel from "./cartItems.model.js";
import CartItemRepository from "./cartItems.repository.js";

export default class CartItemsController {

	constructor() {
		this.repository = new CartItemRepository();
	}

	async add(req, res) {
		try {
			const { productId, quantity } = req.query;
			const userId = req.userId;

			await this.repository.add(productId, userId, quantity);
			res.status(201).send("cart updated, item added")
		} catch (error) {
			console.log(error)
			res.status(500).send("something went wrong")
		}

	}

	async get(req, res) {
		const userId = req.userId;

		const items = await this.repository.getUserCartItems(userId);
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

	delete(req, res) {
		const userId = req.userId;
		const cartItemId = req.params.id;
		CartItemsModel.delete(cartItemId, userId);
		res.status(200).send("Item has been deleted from the cart")
	}

}