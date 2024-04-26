import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors'

import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
// import basicAuth from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import CartItemRouter from './src/features/cartItems/cartItems.routes.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
// import bodyParser from 'body-parser';

const server = express();

// CORS Policy Configuration
server.use(cors());

// server.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', '*');
// 	res.header('Access-Control-Allow-Methods', '*');
// 	// return OK for preflight request.
// 	if (res.method == "OPTIONS") {
// 		return res.sendStatus(200)
// 	}
// 	next();
// })

server.use(express.json());

server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware);

// for all requests related to product, redirect to product routes.
server.use("/api/products", jwtAuth, ProductRouter)

// for all requests related to user, redirect to user routes.
server.use("/api/user", UserRouter)

// for all requests related to cart, redirect to cart routes.
server.use("/api/cart", jwtAuth, CartItemRouter)

// Default request handler
server.get("/", (req, res) => {
	res.send("Welcome to E-Commerce Party")
})

// Error Handler Middleware.
server.use((err, req, res, next) => {
	console.log(err);

	if (err instanceof ApplicationError) {
		res.status(err.code).send(err.message);
	}
	// server errors.
	res.status(500).send("Something went wrong, Please try again later");
})

server.use((req, res) => {
	res.status(404).send("API not found, Please check our documentation for more information at /api-docs")
})
const port = process.env.PORT || 3001;
server.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
});

export default server;
