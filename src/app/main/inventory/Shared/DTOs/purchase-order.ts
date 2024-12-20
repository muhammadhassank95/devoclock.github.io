export class PurchaseOrder {
  id: number;
  isActive: true;
  issueDate: Date;
  purchaseOrderType: string;
  budgetDate: Date;
  supplierId: number;
  supplierName: string;
  userLocationId: number;
  userLocationName: string;
  employeeId: number;
  employeeName: string;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  grossAmount: number;
  discount: number;
  paymentModeId: number;
  paymentModeName: string;
  netAmount: number;
  serviceTaxPct: number;
  excisePct: number;
  totalAmount: number;
  freight: number;
  payable: number;
  terms: string =
    "1-OUR P.O NUMBER MUST BE MENTIONED ONYOUR DELIVERY CHALLAN AND INVOICE/BILLS.";
  validityDays: number;
  purchaseOrderDetails: any[];
  voucherNumber: string;
}
