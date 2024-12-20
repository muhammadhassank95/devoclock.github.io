export class FixedRequisition {
    id: number;
    isActive: boolean;
    issueDate: Date;
    voucherNumber: string;
    requisitionNumber: number;
    fromLocation: number;
    fromLocationName: number;
    toLocation: number;
    toLocationName: string;
    budgetDate: Date;
    costCenterId: number;
    costCenterName: string;
    projectId: number;
    projectName: string;
    ohJobId: number;
    ohJobName: number;
    demandTypeId: number;
    demandTypeName: string;
    totalSaleAmount: number;
    totalBudgetAmount: number;
    totalPurchaseAmount: number;
    status: string;
    inventoryRequisitionDetails: any[];
    itemType = "Fixed"
}
