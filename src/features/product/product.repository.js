import { getDb } from "../../../config/mongodb.js";

export default class ProductRepository {

	constructor() {
		this.collection = "products"
	}

	async findAll() {
		const db = getDb();
		const collection = db.collection(this.collection);
		const products = await collection.find().toArray();
		return products;
	}

	async add(newProduct) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);
			await collection.insertOne(newProduct);
			return newProduct;
		} catch (error) {
			console.log(error);
		}
	}
}