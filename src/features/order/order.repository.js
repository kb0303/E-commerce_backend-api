import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
	constructor() {
		this.collection = "orders";
	}

	async placeOrder(userId) {
		const client = getClient();
		const session = client.startSession();
		try {
			const db = getDb();

			// Start the transaction
			session.startTransaction();

			// 1. Get cartItems and calculate total amount.
			const items = await this.getTotalAmount(userId, session);
			const cartTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
			console.log(cartTotalAmount);

			// 2. Create an order record.
			const newOrder = new OrderModel(new ObjectId(userId), cartTotalAmount, new Date());
			await db.collection(this.collection).insertOne(newOrder, { session });

			// 3. Reduce the stock.
			for (let item of items) {
				await db.collection("products").updateOne(
					{ _id: item.productId },
					{ $inc: { stock: -item.quantity } },
					{ session }
				);
			}

			// 4. Clear the cart items.
			await db.collection("cartItems").deleteMany(
				{ userId: new ObjectId(userId) },
				{ session }
			);

			// Commit the transaction
			await session.commitTransaction();
		} catch (error) {
			// Abort the transaction in case of error
			await session.abortTransaction();
			console.error('Transaction aborted due to error:', error);
			throw new ApplicationError('Something went wrong in products database', 500);
		} finally {
			// End the session
			session.endSession();
		}
	}

	async getTotalAmount(userId, session) {
		const db = getDb();
		const items = await db.collection("cartItems").aggregate([
			// 1. Get the cart items for the user
			{
				$match: { userId: new ObjectId(userId) }
			},
			// 2. Get the products from the products collection
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
		], { session }).toArray();
		return items;
	}
}
