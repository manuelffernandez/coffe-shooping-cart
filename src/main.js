// ===============================================
// ==================== TAREA ====================
// ===============================================

// TODO: poner button de carrito en el navbar que invoque showPurchaseAlert()

// TODO: Chequear y cambiar nombres de funciones polémicas:
//		● moveProductStockFromThisTo()
//		● checkAndUpdate()

// TODO: modularizar código

// TODO: Dividir la funcionalidad de checkAddButton en: chequear stock en cart, manipular el dom.









// ===============================================
// ==================== CLASS ====================
// ===============================================

//CUANDO MODULARIZE EL CODIGO ACA VAN LOS IMPORTS DE LAS CLASSES
//Las clases se suelen almacenar en ficheros individuales.
//De forma que cada clase que creamos. debería estar en un fichero con su mismo nombre.
//Ej.: Item.js tiene adentro la class Item


class Item {
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

		// (this.stock >= amount)? true : false
	}

	calcSubtotal() {
		return this.price * this.stock;
	}
}

class Storage extends Array {
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
				console.log('el valor fue actualizado');
				return
			}

			storageToUpdate.referenceProduct(product.id).stock += amount;
			console.log('el valor fue actualizado');
			return
		}
		alertToastify(FRASE_STOCKUNAVAILABLE);
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









// ===================================================
// ==================== VARIABLES ====================
// ===================================================

//Referencias a los elementos del DOM
let shop = document.getElementById('shop');
let cartContainer = document.getElementById('cartContainer');

const FRASE_STOCKUNAVAILABLE = 'No hay más stock disponible';
const FRASE_IMPOSSIBLEREDUCE = 'No puede tener menos de un producto';

let url = 'https://634613bf745bd0dbd3761fe4.mockapi.io/products';
let databaseStore = [];

let store = new Storage();
let cart = new Storage();











// ===================================================
// ==================== FUNCIONES ====================
// ===================================================

function generateShop() {
	shop.innerHTML = store.map(function(product) {
		const {id, name, price, stock, desc, img} = product;

		return `
		<div id="store-card-${id}" class="col-12 col-sm-6 col-lg-3">
			<div class="card">
				<img class="card-img-top img-fluid" src="${img}">
				<div class="card-body karla">
					<p class="card-title h5 font__400">${name}</p>
					<p class="card-text font__300">${desc}</p>
					<div class="d-flex justify-content-between">
						<p class="h5 fw-semibold m-0 karla">$${price}</p>
						<button id="add-btn-${id}" onclick="addOrRemoveFromCart(${id}, true)" class="h5 p-2 text-uppercase enabled__addButton paytoneone">Agregar</button>
					</div>
					<p class="card-text"><small class="text-muted">Stock disponible: ${stock} unidades</small></p>
				</div>
			</div>
		</div>
		`
	}).join("");
}



function generateCart() {
	cart.deleteProdWithNoStock();

	if(cart.calcTotal()) {
		cartContainer.innerHTML = `<div class="container mt-2 d-flex justify-content-center">
										<h2 class="display-5 text-dark text-uppercase paytoneone">Tu carrito</h2>
									</div>
									<div id="cartList" class="container-fluid">
									</div>`;

		let cartList = document.getElementById('cartList');
		let totalRow = document.createElement('div');
		let buyRow = document.createElement('div');

		for(let product of cart) {
			const {name, id, price, stock, img} = product;
			let row = document.createElement('div');

			row.className = 'container row mx-auto mb-3 py-2 border';
			row.innerHTML = `<div class="d-flex col-6 offset-3 flex-column align-items-center col-lg-4 offset-lg-0 flex-lg-row justify-content-lg-start">
								<img src="${img}" class="img-fluid w-auto">
								<div class="d-flex flex-row flex-lg-column">
									<p class="ms-2 mb-0 h4 paytoneone">${name}</p>
									<p class="ms-2 mb-0 h4 karla font__400">$${price}</p>
								</div>
							</div>
							<div class="col-4 offset-4 col-lg-1 my-3 p-2 offset-lg-3 my-lg-auto d-flex justify-content-evenly align-items-center border border-dark">
									<button onclick="addOrRemoveFromCart(${id}, false)" class="m-0 h4 bg-transparent border-0 karla font__400">-</button>
									<p class="m-0 h4 karla font__400">${stock}</p>
									<button onclick="addOrRemoveFromCart(${id}, true)" class="m-0 h4 bg-transparent border-0 karla font__300">+</button>
							</div>
							<div class="col-lg-2 m-auto d-flex justify-content-center justify-content-lg-start">
								<p class="ms-2 mb-3 h4 karla font__400">$${product.calcSubtotal()}</p>
							</div>
							<div class="col-lg-1 m-auto d-flex justify-content-center">
								<button onclick="eraseProductFromCart(${id})" class="p-3 border border-danger text-danger text-uppercase deleteButton karla bg-transparent">Eliminar</button>
							</div>`;
			cartList.appendChild(row);
		}

		totalRow.id = 'total-cart-row';
		totalRow.className =  'container row mx-auto mb-3 py-2 border-top align-items-center justify-content-between';
		totalRow.innerHTML = `<p class="col-2 h3 paytoneone">Total</p>
							<p class="col-6 col-md-4 col-lg-2 text-end display-6 karla">$${cart.calcTotal()}</p>`;
		cartList.appendChild(totalRow);

		buyRow.className =  'container row mx-auto px-0 justify-content-end';
		buyRow.innerHTML = `<button onclick="showPurchaseAlert()" class="col-12 col-md-6 col-xl-3 h5 p-2 mb-4 text-uppercase enabled__addButton paytoneone">comprar</button>`;
		cartList.appendChild(buyRow);
	}
}



function generateAlertCartList() {
	let totalRow = document.createElement('div');
	let list = document.createElement('div');
	list.className = 'container row';
	list.innerHTML = `<div class="container row mx-auto border-bottom">
						<div class="col-2 fs-6 text-start fw-bold karla">Cant.</div>
						<div class="col-3 offset-1 fs-6 fw-bold karla">Producto</div>
						<div class="col-3 fs-6 fw-bold karla">Precio</div>
						<div class="col-3 fs-6 fw-bold karla">Subtotal</div>
					</div>`;

	for(let product of cart) {
		const {name, stock, price} = product;
		let row = document.createElement('div');
		row.className = 'container row mx-auto border-top';

		row.innerHTML = `<div class="col-2 fs-6 my-2">${stock}</div>
						<div class="col-3 fs-6 my-2 offset-1">${name}</div>
						<div class="col-3 fs-6 my-2">$${price}</div>
						<div class="col-3 fs-6 my-2">$${product.calcSubtotal()}</div>`;
		list.appendChild(row);
	}

	totalRow.className = 'container row py-3 mx-auto border-top border-2 justify-content-between';
	totalRow.innerHTML = `<p class="col-3 text-start paytoneone">Total</p>
					<p class="col-3 karla">$${cart.calcTotal()}</p>`;
	list.appendChild(totalRow);

	return list
}



function showPurchaseAlert() {
	Swal.fire({
		title: '¿Quieres confirmar tu compra?',
		customClass: {
			title: 'karla'
		},
		html: generateAlertCartList(),
		showConfirmButton: true,
		confirmButtonText: 'Comprar',
		confirmButtonColor: '#63c979',
		showCancelButton: true,
		cancelButtonText: 'Volver',
		cancelButtonColor: '#d33'
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Pago realizado',
				text: 'Tu compra se concretó exitosamente',
				icon: 'success',
				showConfirmButton: true,
				confirmButtonText: 'Listo',
				showCloseButton: true
		   });
		}
	})
}



function alertToastify(frase) {
	Toastify({
		text: frase,
		duration: 800,
		newWindow: true,
		gravity: "top",
		position: "right",
		stopOnFocus: false,
		style: {
			color: '#f2f2da',
			background: "#63c979"
		}
	}).showToast();
}



function disableOrEnableAddBtn() {
	cart.forEach(product => {
		const {id, stock} = product;
		let button = document.querySelector(`#add-btn-${id}`);

		if(stock) {
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



function refreshIndexDOM() {
	shop.innerHTML = '';
	generateShop();

	cartContainer.innerHTML = '';
	generateCart();

	disableOrEnableAddBtn();
}



function updateLocalStorageCart(cart) {
	localStorage.setItem('user_cart', JSON.stringify(cart));
}



function getCartFromLocalStorage() {
	return JSON.parse(localStorage.getItem('user_cart'));
}




function addOrRemoveFromCart(IdProduct, operator) {
	let operation = operator ? 1 : -1;
	let product = cart.referenceProduct(IdProduct);

	if(product){
		if(-product.stock === operation){
			alertToastify(FRASE_IMPOSSIBLEREDUCE);
			return
		}
	}

	store.moveProductStockFromThisTo(IdProduct, operation, cart);
	updateLocalStorageCart(cart);
	refreshIndexDOM();
}



//Vacia todas las unidades de un producto especificado por id del carrito
function eraseProductFromCart(IdProduct) {
	let amount = cart.referenceProduct(IdProduct).stock;

	cart.moveProductStockFromThisTo(IdProduct, amount, store);
	cart.deleteProdWithNoStock();
	updateLocalStorageCart(cart);
	refreshIndexDOM();
}



function checkAndUpdate() {
	const cartLS = getCartFromLocalStorage();

	if(cartLS) {
		cartLS.map(element => {
			store.moveProductStockFromThisTo(element.id, element.stock, cart);
		});
	}
}

function synchronizeStoreWithDatabaseStore() {
	databaseStore.forEach(product => {
		const {id, name, price, stock, desc, img} = product;
		let item = new Item(id,	name, price, stock, desc, img);

		store.push(item);
	});
}


// ==================================================================
// ==================== FUNCIONES ASÍNCRONAS API ====================
// ==================================================================
function getDatabaseProducts() {
	return fetch(url)
    .then(response => response.json())
    .catch(err => err);
}

async function updateLocalDatabaseStoreArray() {
    console.log('loading items from database onto local array');
    databaseStore = await getDatabaseProducts();
	console.log(databaseStore);
    console.log('loading complete');
}



function init() {
	updateLocalDatabaseStoreArray()
		.then(() => {
			synchronizeStoreWithDatabaseStore();
			checkAndUpdate();
			refreshIndexDOM();
		})
		.catch(err => console.log(err))
}

init();
