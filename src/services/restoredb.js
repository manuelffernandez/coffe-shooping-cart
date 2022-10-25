function getDatabasePurchases(url) {
    return fetch(url)
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            console.log(`Algo salió mal. Código de error: ${res.status}`)
        })
        .catch(err => {
            console.error('There was an error!', err);
            throw new Error(err);
        })
}

export async function deleteAllPurchases(url) {
    let purchases = await getDatabasePurchases(url);

    for(let i = 0; i < purchases.length; i++) {
        await fetch(url + `/${purchases[i].id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if(!res.ok) {
                    console.error('There was an error!', res.status);
                    return
                }
            })
    }
}

export async function restoreProductsStock(url) {
    for(let i = 1; i <= 4; i++) {
        await fetch(url + `/${i}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                stock: 10
            })
        })
            .then(res => {
                if(!res.ok) {
                    console.error('There was an error!', res.status);
                    return
                }
            })
            .catch(err => {
                console.error('There was an error!', err);
                throw new Error(err);
            })
    }
}
