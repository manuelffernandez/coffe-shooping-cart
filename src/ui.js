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
						<button id="add-btn-${id}" onclick="addOrRemoveFromCart(${id}, true)" class="h5 p-2 text-uppercase enabled__addButton paytoneone">Agregar</button>
					</div>
					<p class="card-text"><small class="text-muted">Stock disponible: ${stock} unidades</small></p>
				</div>
			</div>
		</div>
		`
	}).join("");
}

function generateCart(cart, cartTotal) {
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
        const prodSubtotal = price*stock;

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
							<p class="ms-2 mb-3 h4 karla font__400">$${prodSubtotal}</p>
						</div>
						<div class="col-lg-1 m-auto d-flex justify-content-center">
							<button onclick="eraseProductFromCart(${id})" class="p-3 border border-danger text-danger text-uppercase deleteButton karla bg-transparent">Eliminar</button>
						</div>`;
		cartList.appendChild(row);
	}

	totalRow.id = 'total-cart-row';
	totalRow.className =  'container row mx-auto mb-3 py-2 border-top align-items-center justify-content-between';
	totalRow.innerHTML = `<p class="col-2 h3 paytoneone">Total</p>
						<p class="col-6 col-md-4 col-lg-2 text-end display-6 karla">$${cartTotal}</p>`;
	cartList.appendChild(totalRow);

	buyRow.className =  'container row mx-auto px-0 justify-content-end';
	buyRow.innerHTML = `<button onclick="showPurchaseAlert(${cart, cartTotal})" class="col-12 col-md-6 col-xl-3 h5 p-2 mb-4 text-uppercase enabled__addButton paytoneone">comprar</button>`;
	cartList.appendChild(buyRow);
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

function changeButtonStyleToDisable(button) {
	button.classList.remove('enabled__addButton');
	button.classList.add('disabled__addButton');
}

function changeButtonStyleToEnable(button) {
	button.classList.remove('disabled__addButton');
	button.classList.add('enabled__addButton');
}

function generateAlertCartList(cart, cartTotal) {
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
        const prodSubtotal = stock*price;
		let row = document.createElement('div');
		row.className = 'container row mx-auto border-top';

		row.innerHTML = `<div class="col-2 fs-6 my-2">${stock}</div>
						<div class="col-3 fs-6 my-2 offset-1">${name}</div>
						<div class="col-3 fs-6 my-2">$${price}</div>
						<div class="col-3 fs-6 my-2">$${prodSubtotal}</div>`;
		list.appendChild(row);
	}

	totalRow.className = 'container row py-3 mx-auto border-top border-2 justify-content-between';
	totalRow.innerHTML = `<p class="col-3 text-start paytoneone">Total</p>
					<p class="col-3 karla">$${cartTotal}</p>`;
	list.appendChild(totalRow);

	return list
}

function showPurchaseAlert(cart, cartTotal) {
	Swal.fire({
		title: '¿Quieres confirmar tu compra?',
		customClass: {
			title: 'karla'
		},
		html: generateAlertCartList(cart, cartTotal),
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

const ui = {generateShop, generateCart, alertToastify, changeButtonStyleToDisable, changeButtonStyleToEnable};
export default ui;
