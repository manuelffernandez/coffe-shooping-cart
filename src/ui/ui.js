import { swalConfig } from "./swalConfig.js";
import toastyStyles from "./toastyConfig.js";
import htmlGenerator from "./content.js";

const toastyReference = {
	red: toastyStyles.red,
	green: toastyStyles.green,
	white: toastyStyles.white
};

function generateShop(store) {
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
						<a href="#card-${id}">
							<button id="addNew-btn-${id}" class="h5 m-0 p-2 text-uppercase enabled__addButton paytoneone listenedButton">Agregar</button>
						</a>
					</div>
					<p class="card-text"><small class="text-muted">Stock disponible: ${stock} unidades</small></p>
				</div>
			</div>
		</div>
		`
	}).join("");
}

function generateCart(cart) {
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

		row.id = `card-${id}`
		row.className = 'container row mx-auto mb-3 py-2 border';
		row.innerHTML = `<div class="d-flex col-6 offset-3 flex-column align-items-center col-lg-4 offset-lg-0 flex-lg-row justify-content-lg-start">
							<img src="${img}" class="img-fluid w-auto">
							<div class="d-flex flex-row flex-lg-column">
								<p class="ms-2 mb-0 h4 paytoneone">${name}</p>
								<p class="ms-2 mb-0 h4 karla font__400">$${price}</p>
							</div>
						</div>
						<div class="col-4 offset-4 col-lg-1 my-3 p-2 offset-lg-3 my-lg-auto d-flex justify-content-evenly align-items-center border border-dark">
								<button id="remove-btn-${id}" class="m-0 h4 bg-transparent border-0 karla font__400 listenedButton">-</button>
								<p class="m-0 h4 karla font__400">${stock}</p>
								<button id="add-btn-${id}" class="m-0 h4 bg-transparent border-0 karla font__300 listenedButton">+</button>
						</div>
						<div class="col-lg-2 m-auto d-flex justify-content-center justify-content-lg-start">
							<p class="ms-2 mb-3 h4 karla font__400">$${product.calcSubtotal()}</p>
						</div>
						<div class="col-lg-1 m-auto d-flex justify-content-center">
							<a href="#cartContainer">
								<button id="erase-btn-${id}" class="p-3 border border-danger text-danger text-uppercase deleteButton karla bg-transparent listenedButton">Eliminar</button>
							</a>
						</div>`;
		cartList.appendChild(row);
	}

	totalRow.id = 'total-cart-row';
	totalRow.className =  'container row mx-auto mb-3 py-2 border-top align-items-center justify-content-between';
	totalRow.innerHTML = `<p class="col-2 h3 paytoneone">Total</p>
						<p class="col-6 col-md-4 col-lg-2 text-end display-6 karla">$${cart.calcTotal()}</p>`;
	cartList.appendChild(totalRow);

	buyRow.className =  'container row mx-auto px-0 justify-content-end';
	buyRow.innerHTML = `<button id="confirm-btn" class="col-12 col-md-6 col-xl-3 h5 p-2 mb-4 text-uppercase enabled__addButton paytoneone listenedButton">comprar</button>`;
	cartList.appendChild(buyRow);
}

function alertToastify(frase, color) {
	Toastify({
		text: frase,
		duration: 800,
		newWindow: true,
		gravity: "top",
		position: "right",
		stopOnFocus: false,
		style: toastyReference[color]
	}).showToast();
}

function changeButtonStyleToDisable(button) {
	button.classList.remove('enabled__addButton');
	button.classList.add('disabled__addButton');
}

function changeButtonStyleToEnable(button) {
	button.classList.remove('disabled__addButton');
	button.classList.add('enabled__addButton');
}

function generateAlertCartList(cart) {
	if(cart) {
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
	} else {
		return ''
	}
}

function swalAlert(configObj, cart, optionalTitle) {
	if(configObj === swalConfig.purchaseWithProd) {
		configObj.html = generateAlertCartList(cart);
	}
	if(optionalTitle) {
		configObj.title = optionalTitle;
	}
	return Swal.fire(configObj);
}

function showPurchaseAlert(cart) {
	if(cart.calcTotal()) {
		return swalAlert(swalConfig.purchaseWithProd, cart);
	} else {
		return swalAlert(swalConfig.purchaseWithoutProd);
	}

}

function showCompletedPurchaseAlert() {
	swalAlert(swalConfig.completedPurchase);
}

function showConfirmResetAppAlert() {
	return swalAlert(swalConfig.confirmReset);
}

function showLoadingAlert(optionalTitle) {
	swalAlert(swalConfig.loading, null, optionalTitle);
}

function closeAlert() {
	Swal.close();
}

function generatePurchaseHistoryModals(modalElement, record) {
	modalElement.appendChild(htmlGenerator.generateAllPurchaseModals(record));
}

function generatePurchaseHistoryTable(tableElement, record) {
    tableElement.innerHTML = htmlGenerator.generateTableStructure();
    htmlGenerator.generateAllTableRows(record)
}

const ui = {
	generateShop,
	generateCart,
	showPurchaseAlert,
	showCompletedPurchaseAlert,
	showLoadingAlert,
	showConfirmResetAppAlert,
	closeAlert,
	alertToastify,
	changeButtonStyleToDisable,
	changeButtonStyleToEnable,
	generatePurchaseHistoryTable,
	generatePurchaseHistoryModals
};

export default ui;
