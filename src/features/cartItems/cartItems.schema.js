import mongoose from "mongoose";

export const cartItemsSchema = new cartItemsSchema({
	productId: {type: mongoose.Types.ObjectId, ref: 'products'},
	userId: {type: mongoose.Types.ObjectId, ref: 'users'}, 
	quantity: Number
})