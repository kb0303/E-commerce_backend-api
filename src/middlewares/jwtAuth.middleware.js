import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
	const jwtSecret = process.env.JWT_SECRET;
	const token = req.headers["authorization"];

	if (!token) {
		return res.status(401).send("Unauthorized");
	}

	try {
		const payload = jwt.verify(token, jwtSecret	)

		req.userId = payload.userId;

		console.log(payload)
	} catch (error) {
		console.log(error)
		return res.status(401).send("Unauthorized");
	}

	next();
}

export default jwtAuth;
