export class ServiceQuotation {
  id: number;
  siteId: 0;
  siteName: "";
  isActive: boolean;
  issueDate: Date;
  userLocationId: number;
  supplierId: number;
  employeeId: number;
  employeeName: string;
  employeeErpId: string;
  // regionId: number;
  // regionName: string;
  supplierName: string;
  userLocationName: string;
  indentNumber: string;
  supplierSerialNumber: string;
  voucherNumber: string;
  requisitionNumber: number;
  fromLocation: number;
  fromLocationName: number;
  attentionPerson: string;
  toLocation: number;
  toLocationName: string;
  fromProjectId: number;
  fromProjectName: string;
  fromCostCenterId: number;
  fromCostCenterName: string;
  budgetDate: Date;
  costCenterId: number;
  designation: string;
  costCenterName: string;
  projectId: number;
  projectName: string;
  ohJobId: number;
  ohJobName: number;
  demandTypeId: number;
  invoiceSubmissionDate: Date;
  demandTypeName: string;
  businessMonth: Date;
  totalSaleAmount: number;
  referenceNumber: string;
  grossAmount: number;
  gstAmount: number;
  pstAmount: number;
  totalAmount: number;
  isConfirmed: true;
  remarks: string;
  totalBudgetAmount: number;
  totalPurchaseAmount: number;
  status: string;
  subject: string;
  terms: string;
  origin: string;
  validity: string;
  startingComments: string;
  endingComments: string;
  paragraph: string;
  voucherStatusRemarks: string;
  voucherStatusId: number;
  voucherStatusName: string;
  serviceQuotationDetails: any[];
  //   itemType = Stock;
}