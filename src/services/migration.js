// Migration data file to the API of mockapi.io
// This code was executed just once with the purpouse of migrate the items
// json file to the corresponding resource in mockapi. Namely its not called
// in any part of the main.js execution.
// Its maked on the front side because the plataform doesn't have tools to set 
// specific porperty values. It only offers you to generate them via faker.js
// library.
// This way of migration allows to set the imgs paths stored inside the repo 
// and data who complements the site thematic.
// For this reason node-fetch was installed as devDependencies

// For more information visit https://mockapi.io

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
