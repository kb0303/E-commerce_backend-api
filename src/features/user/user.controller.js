import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController {

	constructor() {
		this.userRepository = new UserRepository();
	}

	async signUp(req, res) {
		try {
			const { name, email, password, type } = req.body;

			// Password hashing using bycrpt
			const hasedPassword = await bcrypt.hash(password, 12)

			const newUser = new UserModel(name, email, hasedPassword, type);
			await this.userRepository.signUp(newUser)
			res.status(201).send(newUser);
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong', 500)
		}
	}

	async signIn(req, res) {
		try {
			const user = await this.userRepository.findByEmail(req.body.email);
			if (!user) {
				res.status(400).send("Incorrect Credentials")
			} else {
				const signedUp = await bcrypt.compare(req.body.password, user.password);

				if (signedUp) {
					const token = jwt.sign({ userId: user._id, email: user.email },
						process.env.JWT_SECRET, {
						expiresIn: '1h'
					})
					return res.status(200).end(token);
				} else {
					return res.status(400).send("Incorrect Credentials")
				}
			}
		} catch (error) {
			console.log(error);
			res.status(500).send("Something went wrong")
		}

	}
}