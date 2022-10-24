import { deleteAllPurchases, restoreProductsStock } from './restoredb.js'

const URL_PRODUCTS = 'https://634613bf745bd0dbd3761fe4.mockapi.io/products';
const URL_PURCHASES = 'https://634613bf745bd0dbd3761fe4.mockapi.io/purchases';

function getDatabaseProducts() {
	return fetch(URL_PRODUCTS)
    .then(response => response.json())
    .catch(err => {
        throw new Error(err);
    });
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
            if(res.ok) {
                console.log(`producto: ${product.name} publicado exitosamente`);
            } else {
                console.log(`Algo salió mal. Código de error: ${res.status}`)
            }
        })
        .catch(err => {
            throw new Error(err);
        })
    }
}

function postPurchase(cart) {
    return fetch(URL_PURCHASES, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(cart)
    })
    .then(res => {
        if(res.ok) {
            console.log('POST exitoso');
        } else {
            console.log(`Algo salió mal. Código de error: ${res.status}`)
        }
    })
    .catch(err => {
        throw new Error(err);
    })
}

async function restoreDatabaseToDefault() {
    await deleteAllPurchases(URL_PURCHASES);
    restoreProductsStock(URL_PRODUCTS);
}

const services = {
    getDatabaseProducts,
    updateDatabaseProductStock,
    postPurchase,
    restoreDatabaseToDefault
}

export default services
