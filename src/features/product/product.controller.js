import ProductModel from "./product.model.js";

export default class ProductController {
	getAllProducts(req, res) {
		const products = ProductModel.getAll();
		res.status(200).send(products);
	}

	addProduct(req, res) {
		const { name, desc, price, category, sizes } = req.body;
		const imageUrl = req.file.filename
		const newProduct = { name, desc, price, imageUrl, category, sizes }
		ProductModel.add(newProduct)
		const products = ProductModel.getAll();
		res.status(201).send(products);
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
}