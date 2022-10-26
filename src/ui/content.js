// ======================================================
// ==================== purchHistory ====================
// ======================================================
function generatePurchaseModal(purchase) {
    let modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.tabIndex = '-1';
    modal.id = `modal-${purchase.id}`;
    modal.setAttribute('aria-labelledby', `modalLabel-${purchase.id}`)
    modal.setAttribute('aria-hidden', 'true')

    modal.innerHTML = `<div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="exampleModalLabel" class="modal-title h3 fs-5 karla">Compra N°${purchase.orderId}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="rounded px-3 py-1 fs-5 enabled__addButton karla" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>`;

    return modal
}

function generateAllPurchaseModals(record) {
    let allModals = document.createElement('div')

    for(let purchase of record) {
        allModals.appendChild(generatePurchaseModal(purchase));
    }
    return allModals
}

function generateTableStructure() {
    let table = `<thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Número de compra</th>
                        <th scope="col">Monto total</th>
                        <th scope="col">Ver más</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>`;
    return table
}

function generateTableRow(purchase) {
    let row = document.createElement('tr');

    row.innerHTML = `<td>${purchase.date}</td>
                    <td>${purchase.orderId}</td>
                    <td>$${purchase.amount}</td>
                    <td>
                        <button id="" class="bg-transparent border-0 text-info link" data-bs-toggle="modal" data-bs-target="#modal-${purchase.id}">Ver detalle</button>
                    </td>`
    return row
}

function generateAllTableRows(record) {
    let tableBody = document.querySelector('#table-body');

    for(let purchase of record) {
        tableBody.appendChild(generateTableRow(purchase));
    }
}

const htmlGenerator = {
    generateAllTableRows,
    generateTableStructure,
    generateAllPurchaseModals
}

export default htmlGenerator;
