// Archivo de migración de datos para la API de mockapi.io
// Este codigo fue ejecutado una sola vez con el objetivo de migrar los items
// al recurso correspondiente en mockapi.
// Esto se hizo desde el lado del front porque las herramientas que ofrece la plataforma
// no sirven para generar valores especificos a las propiedades
// Para más información sobre esta API visite https://mockapi.io

import fetch from "node-fetch";

class Item {
	constructor(id, name, price, stock, desc, img) {
        this.id = id;
		this.name = name;
		this.price = price;
		this.stock = stock;
		this.desc = desc;
		this.img = img;
    }
}

const url = 'https://634613bf745bd0dbd3761fe4.mockapi.io/products';
let genericDescription = 'Lorem ipsum dolor sit amet, consectetur adipisicing.';

let defaultStore = [
    new Item('1', 'Café', 15, 10, genericDescription, './src/assets/img/cards_img/coffee.jpg'),
	new Item('2', 'Jugo', 20, 10, genericDescription, './src/assets/img/cards_img/juice.jpg'),
	new Item('3', 'Medialuna', 20, 10, genericDescription, './src/assets/img/cards_img/medialuna.jpg'),
	new Item('4', 'Sandwich', 30, 10, genericDescription, './src/assets/img/cards_img/sandwich.jpg')
];

function postProductsResourceItem(productObj = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(productObj)
    })
    .then(res => res)
    .catch(err => {
        console.error('There was an error!', err);
        throw new Error(err);
    })
}

async function postDefaultStoreItems() {
    console.log('posting items from local array to database started');
    for(let product of defaultStore) {
        try {
            await postProductsResourceItem(product)
            console.log(`product ${product.name} posted`)
        } catch(err) {
            console.log('cant be posted')
            console.log(err)
            return
        }
    }
    console.log('posting to database finished');
}

postDefaultStoreItems();
