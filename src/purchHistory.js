import services from "./services/services.js";
import ui from "./ui/ui.js";

let record;
const table = document.querySelector('#purchase-table');
const purchButtonsFunctionsList = {

}

async function initHistory() {
    ui.showLoadingAlert('Cargando historial de compras')
    record = await services.getDatabasePurchaseHistory();
    ui.closeAlert();

    if(!record.length) {
    } else {
        ui.generatePurchaseHistoryTable(table, record);
    }
}

initHistory();
