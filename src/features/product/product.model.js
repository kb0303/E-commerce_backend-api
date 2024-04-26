import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
	constructor(id, name, desc, price, imageUrl, category, sizes) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.price = price;
		this.imageUrl = imageUrl;
		this.category = category;
		this.sizes = sizes;
	}
	static getAll() {
		return products;
	}

	static add(product) {
		product.id = products.length + 1
		products.push(product);
		return product;
	}

	static filter(minPrice, maxPrice, category) {
		const result = products.filter((product) => {
			return (
				(!minPrice || product.price >= minPrice) &&
				(!maxPrice || product.price <= maxPrice) &&
				(!category || product.category == category)
			)
		});
		return result;
	}

	static get(id) {
		const product = products.find(p => p.id == id)
		return product;
	}

	static rateProduct(userID, productID, rating) {
		const user = UserModel.getAll().find(u => u.id == userID)
		if (!user) {
			throw new ApplicationError('User not found', 404);
		}

		const product = products.find(p => p.id == productID);
		if (!product) {
			throw new ApplicationError('Product not found', 404);
		}

		// check if there are any ratings and if not return ratings array.
		if (!product.ratings) {
			product.ratings = [];
			product.ratings.push({
				rating: rating
			});
		} else {
			// check if user rating is already available.
			const existingRating = product.ratings.findIndex(r => r.userID == userID)

			if (existingRating >= 0) {
				product.ratings[existingRating] = {
					rating: rating
				}
			} else {
				// if no existing rating then add new 
				product.ratings.push({
					rating: rating
				})
			}
		}

	}
}

var products = [
	new ProductModel(
		1,
		'Atomic Habits',
		'A supremely practical and useful book.',
		300,
		'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
		"category1"
	),
	new ProductModel(
		2,
		'Ikigai',
		'The Japanese secret to a long and happy life',
		340,
		'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
		"category2",
		['S', 'XL', 'XXL']
	),
	new ProductModel(
		3,
		'Deep Work',
		'RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD',
		280,
		'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
		"category3",
		['M', 'XL', 'S']
	)
]