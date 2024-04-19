import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

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
			const token = jwt.sign({ userId: signedUp.id, email: signedUp.email }, 'ssuHAsNns6Wa6nzgsXwa0850fNhoTM6B', {
				expiresIn: '1h'
			})
			res.status(200).end(token);
		}
	}
}