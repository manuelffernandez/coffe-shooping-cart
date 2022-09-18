
//Referencias a los elementos del DOM
let shop = document.getElementById('shop');
let cartList = document.getElementById('cartList');

//Arrays de ejemplo
let store = [
	{
		name: 'Café',
		price: 30,
		stock: 10,
		input: '1',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/coffee.jpg'
	},
	{
		name: 'Jugo',
		price: 25,
		stock: 10,
		input: '2',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/juice.jpg'
	},
	{
		name: 'Medialuna',
		price: 15,
		stock: 10,
		input: '3',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/medialuna.jpg'
	},
	{
		name: 'Sandwich',
		price: 35,
		stock: 10,
		input: '4',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
		img:'../src/assets/img/cards_img/sandwich.jpg'
	}
];

let cart = [
	{
		name: 'Sandwich',
		price: 35,
		stock: 5,
		img:'../src/assets/img/cards_img/sandwich.jpg'
	},
	{
		name: 'Café',
		price: 30,
		stock: 3,
		img:'../src/assets/img/cards_img/coffee.jpg'
	}
];


//Genera las cards de todos los productos del array 'sotre' por medio del método map
function generateShop() {
	shop.innerHTML = store.map(function(product) {
		return `
		<div class="col-12 col-sm-6 col-lg-3">
			<div class="card">
				<img class="card-img-top img-fluid" src="${product.img}">
				<div class="card-body karla">
					<p class="card-title h5 font__400">${product.name}</p>
					<p class="card-text font__300">${product.desc}</p>
					<div class="d-flex justify-content-between">
						<p class="h5 fw-semibold m-0 karla">$${product.price}</p>
						<button class="h5 p-2 text-uppercase button__cart paytoneone">Agregar</button>
					</div>
				</div>
			</div>
		</div>
		`
	}).join("");
}


//Genera las cards de los elementos del array 'cart' iterando a traves de sus elementos con un forOf
//Para insertarlo en el DOM, se crea un elemento div y se utiliza el metodo 'appendChild()' en la referencia cartList
function generateCart() {
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
								<button id="increment_btn_${product.input}" class="m-0 h4 bg-transparent border-0 karla font__400">-</button>
								<p class="m-0 h4 karla font__400">${product.stock}</p>
								<button id="decrement_btn_${product.input}" class="m-0 h4 bg-transparent border-0 karla font__300">+</button>					
						</div>
						<div class="col-lg-2 m-auto d-flex justify-content-center justify-content-lg-start">
							<p class="ms-2 mb-3 h4 karla font__400">$175</p>
						</div>
						<div class="col-lg-1 m-auto d-flex justify-content-center">
							<button class="p-3 border border-danger text-danger text-uppercase karla bg-transparent">Eliminar</button>
						</div>`;
		cartList.appendChild(row);
	}
}


//Invoco funciones
generateShop();
generateCart();