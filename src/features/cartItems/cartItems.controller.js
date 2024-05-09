import CartItemsModel from "./cartItems.model.js";
import CartItemRepository from "./cartItems.repository.js";

export default class CartItemsController {

	constructor() {
		this.repository = new CartItemRepository();
	}

	async add(req, res) {
		try {
			const { productId, quantity } = req.body;
			const userId = req.userId;

			await this.repository.add(productId, userId, quantity);
			res.status(201).send("cart updated, item added")
		} catch (error) {
			console.log(error)
			res.status(500).send("something went wrong")
		}

	}

	async get(req, res) {
		try {
			const userId = req.userId;

			const items = await this.repository.getUserCartItems(userId);
			if (items <= 0) {
				return res.status(404).send("Cart is empty, Add items to the cart")
			} else {
				return res.status(200).send(items);
			}
		} catch (error) {
			console.log(error)
			res.status(500).send("something went wrong")
		}

	}

	async update(req, res) {
		try {
			const { productId, quantity } = req.query;
			await this.repository.updateCartItem(productId, quantity);
			res.status(200).send("Cart Item update successfully")
		} catch (error) {
			console.log(error)
			res.status(500).send("something went wrong")
		}

	}

	async delete(req, res) {
		try {
			const userId = req.userId;
			const cartItemId = req.params.cartItemId;
			await this.repository.deleteCartItem(cartItemId, userId)
			res.status(200).send("Item has been deleted from the cart")
		} catch (error) {
			console.log(error)
			res.status(500).send("something went wrong")
		}

	}

}