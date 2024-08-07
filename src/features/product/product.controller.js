import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {

	constructor() {
		this.productRepository = new ProductRepository();
	}

	async getAllProducts(req, res) {
		try {
			const products = await this.productRepository.findAll()
			res.status(200).send(products);

		} catch (error) {
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async addProduct(req, res) {
		try {
			const { name, desc, price, category, sizes } = req.body;
			const imageUrl = req.file.filename

			// creating new product instance
			const newProduct = new ProductModel(name, desc, parseFloat(price), imageUrl, category, sizes.split(','))

			// adding product in the database
			await this.productRepository.add(newProduct);

			// calling list of all products
			const products = await this.productRepository.findAll()
			res.status(200).send(products);

		} catch (error) {
			throw new ApplicationError('Something went wrong in products database', 500)
		}


	}

	async getOneProduct(req, res) {
		try {
			const id = req.params.id;
			const product = await this.productRepository.findOne(id);
			if (!product) {
				res.status(404).send("Product not found")
			} else {
				res.status(200).send(product)
			}
		} catch (error) {
			throw new ApplicationError('Something went wrong in products database', 500)
		}

	}

	async filterProduct(req, res) {
		try {
			const minPrice = req.query.minPrice;
			const maxPrice = req.query.maxPrice;
			const category = req.query.category;

			const filteredProducts = await this.productRepository.filter(minPrice, maxPrice, category);

			res.status(200).send(filteredProducts);

		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async getAllProductsRatings(req, res) {
		try {
			const result = await this.productRepository.getAllRatings();
			res.status(200).send(result);
		} catch (error) {
			console.log(error);
			throw new ApplicationError('Something went wrong in products database', 500)
		}
	}

	async rateProduct(req, res) {
		try {
			const userID = req.userId;
			const productID = req.body.productID;
			const rating = req.body.rating;
			await this.productRepository.rate(userID, productID, rating);
			return res.status(200).send("Rating added, Thanks for your feedback");
		} catch (error) {
			return res.status(400).send(error.message);
		}

	}

	async averagePrice(req, res) {
		try {
			const result = 	await this.productRepository.averageProductPricePerCategory();
			res.status(200).send(result);
		} catch (error) {
			return res.status(400).send(error.message);
		}
	}

	async averageRatingPerProduct(req, res) {
		try {
			const result = await this.productRepository.averageRatingPerProduct();
			res.status(200).send(result);
		} catch (error) {
			return res.status(400).send(error.message);
		}
	}
}