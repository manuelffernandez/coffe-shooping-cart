let url = 'https://634613bf745bd0dbd3761fe4.mockapi.io/products';

export default function getDatabaseProducts() {
	return fetch(url)
    .then(response => response.json())
    .catch(err => err);
}
