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
                        <button id="" class="bg-transparent border-0 text-info link">Ver detalle</button>
                    </td>`
    return row
}

function generateAllTableRows(record) {
    let tableBody = document.querySelector('#table-body');

    for(let purchase of record) {
        tableBody.appendChild(generateTableRow(purchase));
    }
}

const purchaseContent = { generateAllTableRows, generateTableStructure };

export default purchaseContent;
