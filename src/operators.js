function eraseProductFromCart(IdProduct) {
	let amount = cart.referenceProduct(IdProduct).stock;

	cart.moveProductStockFromThisTo(IdProduct, amount, store);
	cart.deleteProdWithNoStock();
	updateLocalStorageCart(cart);
	refreshIndexDOM();
}

function addOrRemoveFromCart(IdProduct, operator) {
	let operation = operator ? 1 : -1;
	let product = cart.referenceProduct(IdProduct);

	if(product){
		if(-product.stock === operation){
			ui.alertToastify(FRASE_IMPOSSIBLEREDUCE);
			return
		}
	}

	store.moveProductStockFromThisTo(IdProduct, operation, cart);
	updateLocalStorageCart(cart);
	refreshIndexDOM();
}

const operator = {eraseProductFromCart, addOrRemoveFromCart};
export default operator;
