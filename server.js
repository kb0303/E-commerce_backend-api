import express from 'express';
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import basicAuth from './src/middlewares/basicAuth.middleware.js';
// import bodyParser from 'body-parser';

const server = express();

server.use(express.json())

// for all requests related to product, redirect to product routes.
server.use("/api/products", basicAuth, ProductRouter)

// for all requests related to user, redirect to user routes.
server.use("/api/user", UserRouter)

server.get("/", (req, res) => {
	res.send("Welcome to E-Commerce Party")
})

server.listen(3000, () => {
	console.log("Server is listening on port 3000")
});
