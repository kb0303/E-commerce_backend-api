import UserModel from "./user.model.js";

export default class UserController {
	signUp(req, res) {
		const { name, email, password, type } = req.body;
		const newUser = UserModel.signUp(name, email, password, type);
		res.status(201).send(newUser);
	}

	signIn(req, res) {
		const signedUp = UserModel.signIn(req.body.email, req.body.password);
		if (!signedUp) {
			res.status(400).send("Incorrect Credentials")
		} else {
			res.send("Login Successfull")
		}
	}
}