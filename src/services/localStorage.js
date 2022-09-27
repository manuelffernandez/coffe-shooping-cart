export function updateLocalStorage(cart) {
	localStorage.setItem('user_cart', JSON.stringify(cart));
}

export function getLocalStorage() {
	return JSON.parse(localStorage.getItem('user_cart'));
}