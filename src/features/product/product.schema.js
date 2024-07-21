import mongoose from "mongoose";

export const productSchema = new productSchema({
	name: String,
	desc: String, 
	price: Number, 
	category: String, 
	stock: Number
})