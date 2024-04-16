import UserModel from "../features/user/user.model.js";

const basicAuth = (req, res, next) => {
	const authHeader = req.headers["authorization"]

	// check if authorization header is empty
	if (!authHeader) {
		return res.status(401).send("No authorization details found")
	}
	console.log(authHeader);

	// Extract Credentials
	const base64Credentials = authHeader.replace('Basic', '')
	console.log(base64Credentials);

	// decode credentials
	const decodeCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
	console.log(decodeCredentials);

	const creds = decodeCredentials.split(':');
	const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

	if (user) {
		next()
	} else {
		res.status(401).send("Incorrect Credentials")
	}
}

export default basicAuth;
