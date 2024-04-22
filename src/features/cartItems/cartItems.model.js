export default class CartItemsModel {
	constructor(productId, userId, quantity, id) {
		this.productId = productId;
		this.userId = userId;
		this.quantity = quantity;
		this.id = id;
	}

	static add(productId, userId, quantity) {
		const cartItem = new CartItemsModel(productId, userId, quantity)
		cartItem.id = cartItems.length + 1;
		cartItems.push(cartItem);
		return cartItem;
	}

	static get(userId) {
		return cartItems.filter(i => i.userId == userId)
	}

	static update(productId, quantity) {
		const cartItem = cartItems.find(item => item.productId == productId)
		if (!cartItem) {
			return "Cart Item not found"
		} else {
			cartItem.quantity = quantity;
			return cartItem
		}
	}

	static delete(cartItemId, userId) {
		const cartItemIndex = cartItems.findIndex(i => i.id == cartItemId && i.userId == userId)
		if (cartItemIndex == -1) {
			return "Item not found"
		} else {
			return cartItems.splice(cartItemIndex, 1);
		}
	}
}

var cartItems = [
	new CartItemsModel(1, 1, 1, 1),
	new CartItemsModel(2, 2, 2, 5),
	new CartItemsModel(3, 1, 3, 6)
]