import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model('User', userSchema);

export default class UserRepository {
	async signUp(user) {
		try {
			const newUser = new UserModel(user);
			await newUser.save();
			return newUser;
		} catch (err) {
			console.log(err)
		}
	}

	async signIn(email, password) {
		try {
			const signedInUser = await UserModel.findOne({ email, password });
			return signedInUser;
		} catch (err) {
			console.log(err)
		}
	}

	async findByEmail(email) {
		try {
			// Finding document
			return await UserModel.findOne({ email });
		} catch (error) {
			console.log(error);
		}
	}
}