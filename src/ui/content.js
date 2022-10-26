// ======================================================
// ==================== purchHistory ====================
// ======================================================
function generatePurchaseModal(purchase) {
    let modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'exampleModal';
    modal.tabIndex = '-1'
    modal.setAttribute('aria-labelledby', 'exampleModalLabel')
    modal.setAttribute('aria-hidden', 'true')
    // modal.ariaLabel = 'exampleModalLabel'
    // modal.ariaHidden = 'true';

    modal.innerHTML = `<div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            ...
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
        </div>`;

    console.log(modal);
    return modal
}

function generateAllPurchaseModals(record) {
    let allModals = document.createElement('div');

    for(let purchase of record) {
        allModals.appendChild(generatePurchaseModal(purchase))
    }

    return allModals
}

function generateTableStructure() {
    let table = `<thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">ID de la orden</th>
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
                        <button id="" class="bg-transparent border-0 text-info link" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver detalle</button>
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
