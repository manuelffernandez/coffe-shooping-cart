import services from "./services/services.js";
import ui from "./ui/ui.js";

let record;
const modals = document.querySelector('#modal-container');
const table = document.querySelector('#purchase-table');

async function initHistory() {
    ui.showLoadingAlert('Cargando historial de compras')
    record = await services.getDatabasePurchaseHistory();
    ui.closeAlert();

    if(!record.length) {
    } else {
        ui.generatePurchaseHistoryTable(table, record);
        ui.generatePurchaseHistoryModals(modals, record)
    }
}

initHistory();
