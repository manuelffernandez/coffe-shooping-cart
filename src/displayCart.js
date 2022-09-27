
// ==================== TAREA ====================
//El boton de restar cantidad en el carrito debe detenerse una vez llegue a cero y no eliminar el elemento del cart

//Chequear y cambiar nombres de funciones polémicas:
//moveProductStockFromThisTo()
//cleanStorage()
//checkAddButtons()

//Dividir la funcionalidad de checkAddButton en: chequear stock en cart, manipular el dom.


//Suavizar animacion de la aparacion de elementos en el cart










// ==================== IMPORTS ====================
import {updateLocalStorage, getLocalStorage} from './services/localStorage.js';










// ==================== CLASS ====================

//CUANDO MODULARIZE EL CODIGO ACA VAN LOS IMPORTS DE LAS CLASSES
//Las clases se suelen almacenar en ficheros individuales.
//De forma que cada clase que creamos. debería estar en un fichero con su mismo nombre.
//Ej.: Item.js tiene adentro la class Item

//Representa productos
class Item {
	constructor(name, id, price, stock, desc, img) {
		this.name = name;
		this.id = id;
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

//Representa almacenamiento de Items.
class Storage extends Array {
	findProduct(IdProduct) {
		return this.find(product => product.id == IdProduct);
	}

	createProduct(product) {
		this.push(new Item(product.name, product.id, product.price, 1, product.desc, product.img));
	}

	moveProductStockFromThisTo(IdProduct, amount, storageToUpdate) {
		let product = this.findProduct(IdProduct);

		if(product.checkStock(amount)) {
			product.stock -= amount;

			if(storageToUpdate.findProduct(IdProduct) === undefined) {
				storageToUpdate.createProduct(product);
				storageToUpdate.findProduct(product.id).stock = amount;
			} else {
				storageToUpdate.findProduct(product.id).stock += amount;	
			}

			console.log('el valor fue actualizado');
		} else {
			console.log('no hay stock');
		}
	}

	cleanStorage() {
		this.forEach(product => {
			if(product.stock === 0) {
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










// ==================== VARIABLES ====================

//Referencias a los elementos del DOM
let shop = document.getElementById('shop');
let cartContainer = document.getElementById('cartContainer');

let genericDescription = '1 Lorem ipsum dolor sit amet, consectetur adipisicing.';

let store = new Storage(
	new Item('Café', '1', 15, 10, genericDescription, './src/assets/img/cards_img/coffee.jpg'),
	new Item('Jugo', '2', 20, 10, genericDescription, './src/assets/img/cards_img/juice.jpg'),
	new Item('Medialuna', '3', 20, 10, genericDescription, './src/assets/img/cards_img/medialuna.jpg'),
	new Item('Sandwich', '4', 30, 10, genericDescription, './src/assets/img/cards_img/sandwich.jpg')
);

let cart = new Storage();









// ==================== FUNCIONES ====================

//Genera las cards de todos los productos del array 'sotre' por medio del método map
function generateShop() {
	shop.innerHTML = store.map(function(product) {
		return `
		<div id="store-card-${product.id}" class="col-12 col-sm-6 col-lg-3">
			<div class="card">
				<img class="card-img-top img-fluid" src="${product.img}">
				<div class="card-body karla">
					<p class="card-title h5 font__400">${product.name}</p>
					<p class="card-text font__300">${product.desc}</p>
					<div class="d-flex justify-content-between">
						<p class="h5 fw-semibold m-0 karla">$${product.price}</p>
						<button id="add-btn-${product.id}" onclick="addOrRemoveFromCart(${product.id}, true)" class="h5 p-2 text-uppercase enabled__addButton paytoneone">Agregar</button>
					</div>
					<p class="card-text"><small class="text-muted">Stock disponible: ${product.stock} unidades</small></p>
				</div>
			</div>
		</div>
		`
	}).join("");
}



//Genera las cards de los elementos del array 'cart' iterando a traves de sus elementos con un forOf
//Para insertarlo en el DOM, se crea un elemento div y se utiliza el metodo 'appendChild()' en la referencia cartList
function generateCart() {
	cart.cleanStorage();

	if(cart.calcTotal()) {
		let totalRow = document.createElement('div');
		let cartTotal = cart.calcTotal();

		cartContainer.innerHTML = `<div class="container mt-2 d-flex justify-content-center">
										<h2 class="display-5 text-dark text-uppercase paytoneone">Tu carrito</h2>
									</div>
									<div id="cartList" class="container-fluid">
									</div>`;

		for(let product of cart) {
			let row = document.createElement('div');
			row.className = 'container row mx-auto mb-3 py-2 border';
			row.innerHTML = `<div class="d-flex col-6 offset-3 flex-column align-items-center col-lg-4 offset-lg-0 flex-lg-row justify-content-lg-start">
								<img src="${product.img}" class="img-fluid w-auto">
								<div class="d-flex flex-row flex-lg-column">
									<p class="ms-2 mb-0 h4 paytoneone">${product.name}</p>
									<p class="ms-2 mb-0 h4 karla font__400">$${product.price}</p>
								</div>
							</div>
							<div class="col-4 offset-4 col-lg-1 my-3 p-2 offset-lg-3 my-lg-auto d-flex justify-content-evenly align-items-center border border-dark">
									<button onclick="addOrRemoveFromCart(${product.id}, false)" class="m-0 h4 bg-transparent border-0 karla font__400">-</button>
									<p class="m-0 h4 karla font__400">${product.stock}</p>
									<button onclick="addOrRemoveFromCart(${product.id}, true)" class="m-0 h4 bg-transparent border-0 karla font__300">+</button>					
							</div>
							<div class="col-lg-2 m-auto d-flex justify-content-center justify-content-lg-start">
								<p class="ms-2 mb-3 h4 karla font__400">$${product.calcSubtotal()}</p>
							</div>
							<div class="col-lg-1 m-auto d-flex justify-content-center">
								<button onclick="eraseProductFromCart(${product.id})" class="p-3 border border-danger text-danger text-uppercase deleteButton karla bg-transparent">Eliminar</button>
							</div>`;
			cartList.appendChild(row);
		}

		totalRow.id = 'total-cart-row';
		totalRow.className = 'container row mx-auto mb-3 py-2 border-top align-items-center justify-content-between';
		totalRow.innerHTML = `<p class="col-1 h3 paytoneone">Total</p>
							<p class="col-1 display-6 karla">$${cartTotal}</p>`;

		cartList.appendChild(totalRow);
	} else return
}


//Recorre el array cart en busca de los productos existentes. En base a ello los habilita o deshabilita los botones de agregar productos, aplicando los correspondientes estilos.
function checkAddButtons() {
	cart.forEach(product => {
		let button = document.querySelector(`#add-btn-${product.id}`);

		if(cart.findProduct(product.id).stock !== 0) {		
			button.classList.remove('enabled__addButton');
			button.classList.add('disabled__addButton');
			button.disabled = true;
		} else {
			button.classList.remove('disabled__addButton');
			button.classList.add('enabled__addButton');
			button.disabled = false;
		}
	});
}



//Actualiza los elementos del DOM en base a los datos de los objetos 'Storage'
function refreshIndexDOM() {
	shop.innerHTML = '';
	generateShop();

	cartContainer.innerHTML = '';
	generateCart();
	
	checkAddButtons();
}



//Agrega o remueve una unidad del producto especificado por id del carrito
//El booleano 'operator' define si se agrega o remueve
function addOrRemoveFromCart(IdProduct, operator) {
	let operation = operator ? 1 : -1;

	store.moveProductStockFromThisTo(IdProduct, operation, cart);

	updateLocalStorage(cart);
	refreshIndexDOM();
}



//Vacia todas las unidades de un producto especificado por id del carrito
function eraseProductFromCart(IdProduct) {
	let amount = cart.findProduct(IdProduct).stock;
	cart.moveProductStockFromThisTo(IdProduct, amount, store);
	cart.cleanStorage();
	updateLocalStorage(cart);
	refreshIndexDOM();
}



function checkAndUpdate() {
	const cartLS = getLocalStorage();

	if(cartLS) {
		cartLS.map(element => {
			store.moveProductStockFromThisTo(element.id, element.stock, cart);
		});
	}
}



function init() {
	checkAndUpdate();
	refreshIndexDOM();
}

init();
