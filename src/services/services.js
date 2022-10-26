import { deleteAllPurchases, restoreProductsStock } from './restoredb.js'

const URL_PRODUCTS = 'https://634613bf745bd0dbd3761fe4.mockapi.io/products';
const URL_PURCHASES = 'https://634613bf745bd0dbd3761fe4.mockapi.io/purchases';

function getDatabaseProducts() {
	return fetch(URL_PRODUCTS)
    .then(res => {
        if(!res.ok) {
            console.error('There was an error!', res.status);
            return
        }
        return res.json()
    })
    .catch(err => {
        console.error('There was an error!', err);
        throw new Error(err);
    });
}

function getDatabasePurchaseHistory() {
    return fetch(URL_PURCHASES)
    .then(res => {
        if(!res.ok) {
            console.error('There was an error!', res.status);
            return
        }
        return res.json()
    })
    .catch(err => {
        console.error('There was an error!', err);
        throw new Error(err);
    })
}

async function updateDatabaseProductStock(store, cart) {
    for(let product of cart) {
        let stockAvailable = store.referenceProduct(product.id)['stock'];
        await fetch(URL_PRODUCTS + `/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                stock: stockAvailable
            })
        })
        .then(res => {
            if(!res.ok) {
                console.error('There was an error!', res.status);
            }
        })
        .catch(err => {
            console.error('There was an error!', err);
            throw new Error(err);
        })
    }
}

function postPurchase(cart) {
    let cartToPost = {};
    let purchaseDate = new Date();

    cartToPost.products = {...cart};
    cartToPost.date = `${purchaseDate.getDay()}-${purchaseDate.getMonth()}-${purchaseDate.getFullYear()}`;
    cartToPost.orderId = Math.floor(Math.random() * 50000);

    return fetch(URL_PURCHASES, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(cartToPost)
    })
    .then(res => {
        if(!res.ok) {
            console.error('There was an error!', res.status);
        }
        return res.json();
    })
    .catch(err => {
        console.error('There was an error!', err);
        throw new Error(err);
    })
}

async function restoreDatabaseToDefault() {
    await deleteAllPurchases(URL_PURCHASES);
    await restoreProductsStock(URL_PRODUCTS);
}

const services = {
    getDatabaseProducts,
    updateDatabaseProductStock,
    postPurchase,
    restoreDatabaseToDefault
}

export default services
