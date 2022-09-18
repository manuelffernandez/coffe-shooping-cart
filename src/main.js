//Crear clase para los objetos de store


//===========================================//
//============== VARS & CONSTS ==============//
//===========================================//

let executeProgram = true;

const FRASE_BIENVENIDO = 'BIENVENIDO\nBienvenido al E-shop de café. Seleccione una opción:\n\n';
const FRASE_COMPRA_PRODUCTO = 'COMPRA\nQue producto desea:\n\n';
const FRASE_COMPRA_CANTIDAD = 'COMPRA\nElija la cantidad de ';
const FRASE_MODIFICAR_PRODUCTO = 'MODIFICAR\nSeleccione el producto del cual desea modificar la cantidad:\n\n';
const FRASE_MODIFICAR_CANTIDAD = 'MODIFICAR\nElija la cantidad que desea modificar de: ';
const FRASE_CARRITO = 'CARRITO\n\nRevise la consola para ver su pedido. Que desea hacer:\n1.Finalzar compra\n2.Volver';
const FRASE_SOLAPAMIENTO_PEDIDO = 'Usted ya tiene un pedido en el carrito.\n Si crea uno nuevo el anterior pedido se borrará. Está seguro?\n\n'

let store = [
	{
		name: 'Café',
		price: 30,
		stock: 10,
		input: '1',
		img:''
	},
	{
		name: 'Jugo',
		price: 25,
		stock: 10,
		input: '2',
		img:''
	},
	{
		name: 'Medialuna',
		price: 15,
		stock: 10,
		input: '3',
		img:''
	},
	{
		name: 'Sandwich',
		price: 35,
		stock: 10,
		input: '4',
		img:''
	}
];

let mainMenu =  [
	{
		name: 'Ordenar pedido',
		input: '1',
		func: getOrder
	},
	{
		name: 'Modificar compra',
		input: '2',
		func: modifyOrder
	},
	{
		name: 'Ver carrito',
		input: '3',
		func: showOrder	
	},
	{
		name: 'Ver store',
		input: '4',
		func: showStoreStock	
	},
	{
		name: 'Finalizar compra',
		input: '0',
		func: endProgram
	}
];

let productsMenu = store.map(element => {
	return {
		name: element.name + ' $' + element.price.toString(),
		input: element.input
	}
}).concat({
	name: 'Volver al menú principal',
	input: '0'
});

let overlapOrderMenu = [
	{
		name: 'Hacer un pedido nuevo',
		input: '1'
	},
	{
		name: 'Volver atrás',
		input: '2'
	}
];

let cart = [];

// let shop = document.getElementById('shop');




//=================================//
//============== DOM ==============//
//=================================//

// function generateShop() {
// 	shop.innerHTML = sotre.map(function(x) {
// 		return `
// 		<div class="col-12 col-sm-6 col-lg-3">
// 			<div class="card">
// 				<img class="card-img-top img-fluid" src="${x.img}">
// 				<div class="card-body">
// 					<p class="card-title h5">${x.name}</p>
// 					<p class="card-text">${x.desc}</p>
// 				</div>
// 				<div class="card-footer d-flex justify-content-between align-items-center">
// 					<p class="h5 fw-semibold m-0">$${x.price}</p>
// 					<div class="prodOperator d-flex justify-content-between align-items-center">
// 						<i onclick="decrementQty(${x.id})" class="fa-solid fa-minus btn btn-danger"></i>
// 						<p id="qty-of-${x.id}" class="prodOperator__quantity m-0 px-3 h4">0</p>
// 						<i onclick="incrementQty(${x.id})" class="fa-solid fa-plus btn btn-success"></i>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 		`
// 	}).join("");
// }

// generateShop();









//===============================================//
//============== FUNCIONES SIMPLES ==============//
//===============================================//

//Devuelve el valor absoluto de un número ingresado como parámetro.
function modulo(a) {
	if(a < 0) {
		return -a;
	}
	return a
}

//Mensaje de alerta que se muestra en pantalla si se ingresa una opción no válida.
function alertUser() {
	alert('El valor ingresado no es correcto. Porfavor coloque el número correspondiente a la opción que desea.');
}

//Muestra por consola el array de store
function showStoreStock() {
	console.log('Lo que queda en la tienda:');
	console.table(store);
}

//Muestra en pantalla los items que puede elegir el usuario dentro de un array.
function showOptionsOfMenu(menuArray) {
	let titlesArray = menuArray.map(elemento => elemento.input + '. ' + elemento.name);
	let titles = titlesArray.join('\n');

	return titles;
}

function findProductIn(arrayWhereSearch, productObjectInputNumber) {
	return arrayWhereSearch.find( item => item.input === productObjectInputNumber);
}

function checkStock(productToCheck, stockToDecrement) { 
	if(productToCheck.stock < stockToDecrement) {
		alert(`No hay stock disponible. Puede agregar hasta ${productToCheck.stock} unidad/es más.`);
		return false;
	}
	return true;
}

//Crea un producto en el cart
function createProductInCart(productObject) {
	cart = [...cart, {
		name: productObject.name,
		stock: 0,
		input: productObject.input
	}];
}

//Elimina productos del cart que tengan el atributo 'stock' con el value 0 
function cleanCart() {
	for(let item of cart) {
		if (item.stock === 0) {
			cart.splice(cart.indexOf(item), 1)
		}
	}
}

//Solicita un valor numerico al usuario para seleccionar un producto mostrado en pantalla por medio de showOptionsOfMenu().
//Chequea que el valor ingresado sea válido, es decir que coincida con las opciones. En caso de que lo sea, retorna ese valor.
//El parametro menuArray esta definido para ingresarlo en showOptionsOfMenu.
function getUserChoice(frase, menuArray) {
	let desicion;

	while(true) {
		desicion = prompt(frase + showOptionsOfMenu(menuArray));

		for (let i = 0; i < menuArray.length; i++) {
			if (desicion == menuArray[i]['input']) {
				return desicion;
			}
		}
		alertUser();
	}
}

//Solicita un numero al usuario para operar con el producto previamente elegido.
//canReturnNegativeAmount dato booleano que permite el ingreso de valores negativos.
//true: permite valores negativos & false: no permite valores negativos. Valor por defecto: false
function getProductQuantity(frase, productObjectToDisplay, canReturnNegativeAmount = false) {
	while (true) {
		let amount = parseInt(prompt(frase + productObjectToDisplay.name));
		let isAmountNeg;

		if(canReturnNegativeAmount) {
			isAmountNeg = false;
		} else isAmountNeg = amount < 0;

		if (isNaN(amount) || isAmountNeg) {
			alertUser();
			continue;
		} else {
			return amount;
		}
	}
}







//=================================================//
//============== FUNCIONES COMPLEJAS ==============//
//=================================================//

//Mueve una cantidad especificada del store al carrito.
//Suma quantity al la propiedad 'stock' del producto en cart y la resta en 'stock' del mismo producto en store
//Para lograr la operacion inversa, es decir del carrito al store simplemente se ingresa un quantity negativo
function moveProductQtyFromCartToStore(productObjectToSearchInCart, quantity) {
	let cartObject = findProductIn(cart, productObjectToSearchInCart.input);
	let storeObject = findProductIn(store, productObjectToSearchInCart.input);

	if(cartObject === undefined) {
		createProductInCart(productObjectToSearchInCart);
		cartObject = findProductIn(cart, productObjectToSearchInCart.input);
		cartObject.stock += quantity;
		storeObject.stock -= quantity;
	} else {
		cartObject.stock += quantity;
		storeObject.stock.stock -= quantity;
	}
	cleanCart();
}

function defineProductAndAmount(arrayWhereSearch, fraseChoice, fraseQuantity, menuArray, canReceiveNegativeAmount) {
	while(true) {
		let chosenOption = getUserChoice(fraseChoice, menuArray);

		if(chosenOption == '0') {
			return
		}

		let productObject = findProductIn(arrayWhereSearch, chosenOption); 
		let quantity = getProductQuantity(fraseQuantity, productObject, canReceiveNegativeAmount);

		if(checkStock(productObject, modulo(quantity))) {
			moveProductQtyFromCartToStore(productObject, quantity);
		}
	}
}

function getOrder() {
	if(cart.length !== 0) {
		let desicion = getUserChoice(FRASE_SOLAPAMIENTO_PEDIDO, overlapOrderMenu);

		if(desicion == '2') {
			return
		}

		for(let i = 0; i < cart.length; i++) {
			moveProductQtyFromCartToStore(cart[i], -cart[i]['stock'])
		}
	}
	defineProductAndAmount(store, FRASE_COMPRA_PRODUCTO, FRASE_COMPRA_CANTIDAD, store.concat({
		name: 'Volver al menú principal',
		input: '0'
	}), false);
}

function modifyOrder() {
	if(cart.length == 0) {
		alert('Usted no tiene ninguna orden para modificar.');
		return
	}
	
	defineProductAndAmount(cart, FRASE_MODIFICAR_PRODUCTO, FRASE_MODIFICAR_CANTIDAD, cart.concat({
		name: 'Volver al menú principal',
		input: '0'
	}), true);
}

function showCart() {
	let total = 0;

	console.log('Tu pedido es:');
	cart.forEach(product => {
		let productPrice = store.find(element => element.name === product.name)['price'];
		let subtotal = product.stock * productPrice;
		total += subtotal;
		console.log(`${product.stock} ${product.name} subtotal: $${subtotal}`);
	});
	console.log('Total: $' + total);
}

function showOrder() {
	console.log('-'.repeat(70));

	showCart();

	console.log('-'.repeat(70));
	alert('Chequee la consola porfavor');
}

function endProgram() {
	alert(`Gracias por su compra!`);
	showCart();
	executeProgram = false;
}

function initMenu(menu) {
	while(executeProgram) {
		let desicion = getUserChoice(FRASE_BIENVENIDO, mainMenu);

		for (let i = 0; i < menu.length; i++) {
			if (menu[i].input === desicion) {
				menu[i].func();
			}
		}
	}
}

initMenu(mainMenu);
