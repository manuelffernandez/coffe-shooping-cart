export default function generatePurchaseObject(cart) {
    let auxiliarCart = [...cart];
    let purchaseDate = new Date();
    let purchase = {};

    for(let product of auxiliarCart) {
        delete product.img;
        delete product.desc;
    }
    purchase.products = {...auxiliarCart};
    purchase.date = `${purchaseDate.getDay()}-${purchaseDate.getMonth()}-${purchaseDate.getFullYear()}`;
    purchase.orderId = Math.floor(Math.random() * 50000);

    return purchase
}
