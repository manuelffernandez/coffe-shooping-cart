class Item {
	constructor(name, price, stock, desc, img) {
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
    new Item('Café', 15, 10, genericDescription, './src/assets/img/cards_img/coffee.jpg'),
	new Item('Jugo', 20, 10, genericDescription, './src/assets/img/cards_img/juice.jpg'),
	new Item('Medialuna', 20, 10, genericDescription, './src/assets/img/cards_img/medialuna.jpg'),
	new Item('Sandwich', 30, 10, genericDescription, './src/assets/img/cards_img/sandwich.jpg')
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
    .catch(err => err)

}

async function postDefaultStoreItems() {
    console.log('posting items from local array to database started');
    for(product of defaultStore) {
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
