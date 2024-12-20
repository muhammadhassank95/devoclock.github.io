
export class ServiceInvoice {
    id: number;
    isActive: true;
    employeeId: number;
    employeeName: number;
    supplierId: number;
    supplierName: string;
    projectId: number;
    projectName: string;
    costCenterId: number;
    costCenterName: string;
    userLocationId: number;
    userLocationName: string;
    issueDate: Date;
    voucherNumber: string;
    grnNumber: string;
    invoiceNo: string;
    invoiceDate: Date;
    grossAmount: number;
    discountBeforePct: number;
    discountAfterPct: number;
    netAmount: number;
    serviceTaxPct: number;
    excisePrc: number;
    totalAmount: number;
    freightPct: number;
    netPayable: number;
    comments: string;
    serviceInvoiceDetails: any[];
}
// export class ServiceInvoiceGrid {
//     id: number;
//     isActive: true;
//     orderId: number;
//     orderName: string;
//     poQty: number;
//     received: number;
//     rejected: number;
//     qty: number;
//     rate: number;
//     total: number;
// }
