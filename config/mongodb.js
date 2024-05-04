import { MongoClient } from "mongodb";

let client;
export const connectToMongoDb = () => {
	MongoClient.connect(process.env.DB_URI)
		.then(clientInstance => {
			client = clientInstance;
			console.log("Connected to mongoDb");
		})
		.catch(err => {
			console.log(err);
		})
}

export const getDb = () => {
	return client.db();
}