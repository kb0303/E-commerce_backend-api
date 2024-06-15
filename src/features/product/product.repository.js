import { ObjectId } from "mongodb";
import { getDb } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class ProductRepository {

	constructor() {
		this.collection = "products"
	}

	async findAll() {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			const products = await collection.find().toArray();
			return products;

		} catch (error) {
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async findOne(id) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			const products = await collection.findOne({ _id: new ObjectId(id) });
			return products;
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}

	}

	async add(newProduct) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			await collection.insertOne(newProduct);
			return newProduct;
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}


	async filter(minPrice, maxPrice, category) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			let filterExpression = {};
			if (minPrice) {
				filterExpression.price = { $gte: parseFloat(minPrice) }
			}
			if (maxPrice) {
				filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) }
			}
			if (category) {
				filterExpression.category = { $eq: category };
			}
			return await collection.find(filterExpression).toArray();

		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async rate(userID, productID, rating) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);

			// 1. Remove existing rating entry, if any
			await collection.updateOne(
				{ _id: new ObjectId(productID) },
				{ $pull: { ratings: { userID: new ObjectId(userID) } } }
			);

			// 2. Add new rating entry
			await collection.updateOne(
				{ _id: new ObjectId(productID) },
				{ $push: { ratings: { userID: new ObjectId(userID), rating } } }
			);

		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async averageProductPricePerCategory() {
		try {
			const db = getDb();
			const collection = db.collection(this.collection)

			return await collection.aggregate([
				{
					// Stage1: Get avg price of product
					$group: {
						_id: "$category",
						averagePrice: { $avg: "$price" }
					}
				}
			]).toArray();
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async averageRatingPerProduct() {
		try {
			const db = getDb();
			const collection = db.collection(this.collection)
			return await collection.aggregate([
				{
					$unwind: "$ratings"
				},
				{
					$group: {
						_id: "$name",
						averageRating: {avg: "$ratings.rating"}
					}
				}
			]).toArray()
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}
}