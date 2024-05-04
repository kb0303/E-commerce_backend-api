import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {

	constructor() {
		this.productRepository = new ProductRepository();
	}

	async getAllProducts(req, res) {
		const products = await this.productRepository.findAll()
		res.status(200).send(products);
	}

	async addProduct(req, res) {
		try {
			const { name, desc, price, category, sizes } = req.body;
			const imageUrl = req.file.filename
			const newProduct = new ProductModel(name, desc, price, imageUrl, category, sizes)
			await this.productRepository.add(newProduct);

		} catch (error) {
			console.log(error)
			res.status(500).send("Something went wrong in the database");
		}

		const products = await this.productRepository.findAll()
		res.status(200).send(products);
	}

	getOneProduct(req, res) {
		const id = req.params.id;
		const product = ProductModel.get(id);
		if (!product) {
			res.status(404).send("Product not found")
		} else {
			res.status(200).send(product)
		}
	}

	filterProduct(req, res) {
		const minPrice = req.query.minPrice;
		const maxPrice = req.query.maxPrice;
		const category = req.query.category;
		const filteredProducts = ProductModel.filter(minPrice, maxPrice, category);
		if (!filteredProducts) {
			res.status(404).send("Product not found in this range")
		} else {
			res.status(200).send(filteredProducts);
		}
	}

	rateProduct(req, res) {
		const userID = req.userId;
		const productID = req.query.productID;
		const rating = req.query.rating;

		try {
			ProductModel.rateProduct(userID, productID, rating);
		} catch (error) {
			return res.status(400).send(error.message);
		}

		return res.status(200).send("Rating added, Thanks for your feedback");
	}
}