export default class UserModel {
	constructor(name, email, password, type) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.type = type;
	}

	static signUp(name, email, password, type) {
		const newUser = new UserModel(name, email, password, type);
		newUser.id = users.length + 1;
		users.push(newUser);
		return newUser;
	}

	static signIn(email, password) {
		const user = users.find(u => u.email == email && u.password == password);
		return user;
	}
}


var users = [
	{
		"name": "seller name",
		"email": "seller@gmail.com",
		"password": "seller123",
		"type": "seller"
	}
]