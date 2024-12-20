export class GoodsInspectionNoteDto {
  id: number;
  deliveryChallanDate: Date;
  deliveryChallanNumber: string;
  gatepassNumber: string;
  invoiceDate: Date;
  invoiceNumber: string;
  isActive: true;
  voucherNumber: string;
  issueDate: Date;
  userLocationId: number;
  userLocationName: string;
  status: string;
  // regionId: number;
  // regionName: string;
  supplierId: number;
  supplierName: string;
  projectId: number;
  projectName: string;
  costCenterId: number;
  costCenterName: string;
  PaymentModeId: number;
  PaymentModeName: string;
  employeeId: number;
  employeeName: string;
  remarks: string;
  goodsInspectionNoteDetails: any[];
}
