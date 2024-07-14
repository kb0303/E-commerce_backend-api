import { ObjectId } from "mongodb";
import { getDb } from "../../../config/mongodb.js";

export default class OrderRepository {
	constructor() {
		this.collection = "orders";
	}

	async placeOrder(userId) {

		try {
			// 1. get cartItems and calculate total amount.
			await this.getTotalAmount(userId);

			// 2. Create an order record.

			//  3. Reduce the stock.

			//  4. Clear the cart items.	
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500);
		}
	}

	async getTotalAmount(userId) {
		const db = getDb();
		const items = await db.collection("cartItems").aggregate([
			//  1. get the cart items for the user
			{
				$match: { userId: new ObjectId(userId) }
			},
			//  2. get the products from the products collection
			{
				$lookup: {
					from: "products",
					localField: "productId",
					foreignField: "_id",
					as: "productInfo"
				}
			},
			// 3. Unwind the productInfo (because it is nested inside cartItems)
			{
				$unwind: "$productInfo"
			},
			// 4. Calculate total amount for each cartItems.
			{
				$addFields: {
					"totalAmount": {
						$multiply: ["$productInfo.price", "$quantity"]
					}
				}
			}
		]).toArray();
		const cartTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0)
		console.log(cartTotalAmount);
	}
}