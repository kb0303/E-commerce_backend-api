import mongoose from "mongoose";

const url = process.env.DB_URI;

export const connectUsingMongoose = async() => {
	try {
		await mongoose.connect(url);	
		console.log("MongoDb connected using mongoose");
	} catch (err) {
		console.log("Error while connecting to DB")
		console.log(err);
	}
}