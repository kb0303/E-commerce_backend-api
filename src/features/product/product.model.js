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
}

var products = [
	new ProductModel(
		1,
		'Atomic Habits',
		'A supremely practical and useful book.',
		300,
		'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
	),
	new ProductModel(
		2,
		'Ikigai',
		'The Japanese secret to a long and happy life',
		340,
		'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
		"category2",
		"M"
	),
	new ProductModel(
		3,
		'Deep Work',
		'RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD',
		280,
		'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
		"category3",
		"XXL"
	)
]