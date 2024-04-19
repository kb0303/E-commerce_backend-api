import express from 'express';
import ProductRouter from "./src/features/product/product.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
// import basicAuth from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import CartItemRouter from './src/features/cartItems/cartItems.routes.js';
// import bodyParser from 'body-parser';

const server = express();

server.use(express.json())

// for all requests related to product, redirect to product routes.
server.use("/api/products", jwtAuth, ProductRouter)

// for all requests related to user, redirect to user routes.
server.use("/api/user", UserRouter)

// for all requests related to cart, redirect to cart routes.
server.use("/api/cart", jwtAuth, CartItemRouter)

server.get("/", (req, res) => {
	res.send("Welcome to E-Commerce Party")
})

server.listen(3000, () => {
	console.log("Server is listening on port 3000")
});
