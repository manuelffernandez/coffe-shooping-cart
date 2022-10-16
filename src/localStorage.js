export function updateLocalStorageCart(cart) {
	localStorage.setItem('user_cart', JSON.stringify(cart));
}
export function getCartFromLocalStorage() {
	return JSON.parse(localStorage.getItem('user_cart'));
}
