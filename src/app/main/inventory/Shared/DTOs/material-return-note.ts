export class MaterialReturnNote {
  id: number;
  supplierId: number;
  supplierSerialNumber: number;
  projectId: number;
  costCenterId: number;
  supplierName: string;
  gatePassNumber: number;
  userLocationId: number;
  userLocationName: string;
  voucherNumber: string;
  issueDate: Date;
  details: any;
}

export class CreateList {
  id: number;
  itemId: number;
  giN_VoucherNumber: string;
  rejectedQty: number;
  returnedQty: number;
  balanceQty: number;
  inspectedRefQty: number;
  remarks: number;
  inspectionDetailId: number;
  materialReturnNoteInfoId: number;
}

export class VoucherDto {
  Target: string;
  Prefix: string;
  IssueDate: Date;
  UserLocationId: number;
}
