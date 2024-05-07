import { ObjectId } from "mongodb";
import { getDb } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemRepository {
	constructor() {
		this.collection = 'cartItems'
	}
	// productId, userId, quantity
	async add(productId, userId, quantity) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection)
			const newCartItem = await collection.insertOne({productId: new ObjectId(productId), userId: new ObjectId(userId), quantity});
			return newCartItem;
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}

	}

	async getUserCartItems(userId) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection)
			const userCartItems = await collection.find({ userId: new ObjectId(userId) }).toArray();
			console.log(userId, userCartItems);
			return userCartItems;
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}

	}
}