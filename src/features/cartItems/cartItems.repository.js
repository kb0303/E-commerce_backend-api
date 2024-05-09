import { ObjectId, ReturnDocument } from "mongodb";
import { getDb } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemRepository {
	constructor() {
		this.collection = 'cartItems'
	}
	// productId, userId, quantity
	async add(productId, userId, quantity) {
		try {
			if (!ObjectId.isValid(productId)) {
				throw new ApplicationError('Invalid ObjectId format', 500);
			}
			const db = getDb();
			const collection = db.collection(this.collection)
			const id = await this.getNextCounter(db);

			await collection.updateOne(
				{ productId: new ObjectId(productId), userId: new ObjectId(userId) },
				{
					$setOnInsert: { _id: id },
					$inc: { quantity: quantity }
				},
				{ upsert: true }
			);
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
			return userCartItems;
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}

	}

	async updateCartItem(productId, quantity) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			await collection.updateOne({ productId: new ObjectId(productId) }, { $set: { quantity: parseFloat(quantity) } })
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async deleteCartItem(cartItemId, userId) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			await collection.deleteOne({ _id: new ObjectId(cartItemId), userId: new ObjectId(userId) })
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}


	async getNextCounter(db) {
		const resultDocument = await db.collection("counters").findOneAndUpdate(
			{ _id: 'cartItemId' },
			{ $inc: { value: 1 } },
			{ returnDocument: 'after' }
		)
		console.log(resultDocument);
		return resultDocument.value;
	}
}