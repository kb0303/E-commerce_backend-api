import express from 'express';
import ProductRouter from "./src/features/product/product.routes.js";
import bodyParser from 'body-parser';

const server = express();

server.use(bodyParser.json())

// for all requests related to product, redirect to product routes.
server.use("/api/products", ProductRouter)

server.get("/", (req, res) => {
	res.send("Welcome to E-Commerce Party")
})

server.listen(3000, () => {
	console.log("Server is listening on port 3000")
});
