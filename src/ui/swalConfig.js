const styleConfig = {
	title: 'karla',
	confirmButton: 'karla bgc__green',
	cancelButton: 'karla bgc__red'
};

const purchaseWithProd = {
    title: '¿Quieres confirmar tu compra?',
    customClass: styleConfig,
    html: '',
    showConfirmButton: true,
    confirmButtonText: 'Comprar',
    showCancelButton: true,
    cancelButtonText: 'Volver'
};

const purchaseWithoutProd = {
    customClass: styleConfig,
    title: 'No tienes ningún producto en tu carrito.',
    html: '',
    showConfirmButton: false,
    confirmButtonText: '',
    showCancelButton: true,
    cancelButtonText: 'Volver'
};

const completedPurchase = {
    customClass: styleConfig,
    title: 'Pago realizado',
    text: 'Tu compra se concretó exitosamente',
    icon: 'success',
    html: '',
    showConfirmButton: true,
    confirmButtonText: 'Listo',
    showCancelButton: false,
    cancelButtonText: ''
};

const loading = {
    customClass: styleConfig,
    title: 'Cargando',
    html: '<div class="spinCont"></div>',
    showConfirmButton: false,
    confirmButtonText: '',
    showCancelButton: false,
    cancelButtonText: ''
};

const confirmReset = {
    customClass: styleConfig,
    title: '¿Está seguro que desea reiniciar la aplicación?',
    text: 'Esto borrará todo el historial de compras y restaruará el stock de los productos',
    html: '',
    showConfirmButton: true,
    confirmButtonText: 'Reniciar',
    showCancelButton: true,
    cancelButtonText: 'Volver'
}

export const swalConfig = { purchaseWithProd, purchaseWithoutProd, completedPurchase, loading, confirmReset }
