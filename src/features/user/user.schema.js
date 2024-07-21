import mongoose from "mongoose";

export const userSchema = new userSchema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	type: { type: String, enum: ['customer', 'seller'] }
})