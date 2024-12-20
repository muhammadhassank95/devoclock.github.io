// export class ServiceOrder {
//     documentDate: string;
//     locationId: number;
//     locationName: string;
//     voucherNumber: number;
//     budgetDate: string;
//     buyMonth: string;
//     supplierId: number;
//     supplierName: string;
//     employeeId: number;
//     employeeName: string;
//     paymentModeId: number;
//     paymentModeName: string;
//     costCenterId: number;
//     costCenterName: string;
//     projectId: number;
//     projectName: string
//     grossAmount: number;
//     excisePct: number;
//     discount: number;
//     totalAmount: number;
//     netAmount: number;
//     freight: number;
//     serviceTaxPct: number;
//     payable: number;
//     terms: string;
//     validityDays: string

//     details: ServiceOrderGrid[];
// }
// export class ServiceOrderGrid {
//     requisitionId: number;
//     requisitionName: string;
//     isActive: true;
//     // remarks: string;
//     // qtyRequired: string;
//     // qtyOrdered: string;
//     qtyFulfilled: number;
//     rate: number;
//     totalAmount: number;
//     poVoucherNumber: number;
// }

export class ServiceOrder {
    isActive: boolean;
    issueDate: Date;
    voucherNumber: string;
    serviceRequistionId: number;
    budgetMonth: Date;
    supplierId: number;
    supplierName: number;
    employeeId: number;
    employeeName: string;
    paymentModeId: number;
    userLocationId: number;
    userLocationName: string;
    projectId: number;
    projectName: string;
    costCenterId: number;
    costCenterName: string;
    paymentModeName: string;
    grossAmount: number;
    discount: number = 0;
    netAmount: number;
    serviceTaxPct: number = 0;
    excisePct: number = 0;
    totalAmount: number;
    freight: number;
    payable: number;
    terms: string = "Hello Terms";
    validityDays: number;
    serviceOrderDetails: any[]
}


// {
//     id: number;
//     isActive: boolean;
//     requisitionId: number;
//     requisitionName: number;
//     qtyFulfilled: number;
//     rate: number;
//     totalAmount: number;
//     poVoucherNumber: string
// }