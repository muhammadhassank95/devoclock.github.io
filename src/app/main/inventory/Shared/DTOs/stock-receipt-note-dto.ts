export class StockReceiptNoteDto {
    id: number;
    isActive: true;
    issueDate: Date;
    voucherNumber: string;
    stnId: number;
    fromProjectId: number;
    fromProjectName: string;
    fromCostCenterId: number;
    fromCostCenterName: string;
    fromLocation: number;
    fromLocationName: string;
    userLocationId: number;
    locationName: string;
    toProjectId: number;
    toProjectName: string;
    toCostCenterId: number;
    toCostCenterName: string;
    budgetDate: Date;
    stockReceiptNoteDetails: any[]
}

// {
//     id: number;
//     stnDetailId: number;
//     receivedQty: number
// }
