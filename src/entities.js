export class Item {
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

export class Storage extends Array {
	referenceProduct(IdProduct) {
		return this.find(product => product.id == IdProduct);
	}

	createProduct(product) {
		this.push(new Item(product.id, product.name, product.price, 1, product.desc, product.img));
	}

	moveProductStockFromThisTo(IdProduct, amount, storageToUpdate) {
		let product = this.referenceProduct(IdProduct);

		if(product.checkStock(amount)) {
			product.stock -= amount;

			if(storageToUpdate.referenceProduct(IdProduct) === undefined) {
				storageToUpdate.createProduct(product);
				storageToUpdate.referenceProduct(product.id).stock = amount;
				return
			}

			storageToUpdate.referenceProduct(product.id).stock += amount;
			return
		}
		ui.alertToastify(FRASE_STOCKUNAVAILABLE);
	}

	deleteProdWithNoStock() {
		this.forEach(product => {
			if(!product.stock) {
				let index = this.indexOf(product);
				this.splice(index, 1);
			}
		});
	}

	calcTotal() {
		let total = 0;

		this.forEach(product => total += product.calcSubtotal());
		return total;
	}
}
