export default class Item {
	constructor(id, name, price, stock, desc, img) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.desc = desc;
		this.img = img;
	}

	checkStock(amount) {
		if(this.stock >= amount) {
			return true
		}
		return false
	}

	calcSubtotal() {
		return this.price * this.stock;
	}
}
