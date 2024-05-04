import { getDb } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository {

	constructor() {
		this.collection = "users"
	}

	async signUp(newUser) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);

			// inserting document
			await collection.insertOne(newUser);
			return newUser;
		} catch (error) {
			throw new ApplicationError('Something went wrong in the database', 500)
		}
	}


	async findByEmail(email) {
		try {
			const db = getDb();
			const collection = db.collection(this.collection);

			// Finding document
			return await collection.findOne({ email });
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in the database', 500)
		}
	}
}