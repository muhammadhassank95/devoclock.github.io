export class GatePassDtos {

    id: number;
    gI_IssueDate: Date;
    gI_VoucherNumber: string;
    gO_IssueDate: Date;
    gO_VoucherNumber: string;
    chartOfAccountId: number;
    chartOfAccountName: string;
    reference: string;
    gI_UserLocationId: number;
    gI_UserLocationName: string;
    gO_UserLocationId: number;
    gO_UserLocationName: string;
    referenceDate: Date;
    timeIn: string;
    timeOut: string;
    employeeId: number;
    employeeName: string;
    departmentId: number;
    departmentName: string;
    destinationId: number;
    destinationName: string;
    driver: string;
    vehicleRegistrationNumber: string;
    isReturnable: true;
    items: any = [];
}

export class InwardGatePass {
    id: number;
    employeeId: number;
    employeeName: string;
    chartOfAccountId: number;
    chartOfAccountName: string;
    departmentId: number;
    departmentName: string;
    deliveryChallanNumber: string;
    deliveryChallanDate: Date;
    timeIn: string;
    destination: string;
    supplierId: number;
    supplierName: string;
    projectId: number;
    projectName: string;
    costCenterId: number;
    costCenterName: string;
    driver: string;
    vehicleRegistrationNumber: string;
    isReturnable: true;
    isActive: true;
    voucherNumber: string;
    inwardGatepassDetails: any[];
    issueDate: Date;
    regionId: number;
    userLocationId: number;
    userLocationName: string;
    status: string;
}