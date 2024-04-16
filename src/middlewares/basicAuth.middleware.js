const basicAuth = (req, res, next) => {
	const authHeader = req.headers["authorization"]

	// check if authorization header is empty
	if(!authHeader) {
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
	console.log(creds);
}

export default basicAuth;
