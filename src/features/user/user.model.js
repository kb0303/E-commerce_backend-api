import { getDb } from "../../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
	constructor(name, email, password, type) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	static getAll() {
		return users;
	}
}


let users = [
	{
		"id": 1,
		"name": "seller name",
		"email": "seller@gmail.com",
		"password": "seller123",
		"type": "seller"
	},
	{
		"id": 2,
		"name": "customer name",
		"email": "customer@gmail.com",
		"password": "customer123",
		"type": "customer"
	},
]