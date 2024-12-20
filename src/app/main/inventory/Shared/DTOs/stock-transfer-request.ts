export class StockTransferRequest {
  id: number;
  issueDate: Date;
  voucherNumber: string;
  consumptionMonth: Date;
  // regionId: number;
  // regionName: string;
  // providerRegionId: number;
  // providerRegionName: string;
  requestercostCenterId: number;
  requestercostCenterName: string;
  requesterprojectId: number;
  requesterprojectName: string;
  fromcostCenterId: number;
  fromcostCenterName: string;
  fromprojectId: number;
  fromprojectName: string;
  userLocationId: number;
  userLocationName: string;
  requesterLocationId: number;
  requesterLocationName: string;
  remarks: string;
  documentStatus: string;
  status: string;
  // builtyNumber: string;
  // builtyDate: Date;
  // natureOfTransport: string;
  // attachmentScanCopyPath: string;
  stockTransferNoteDetails: any[];
}

export class StockTransferRequestNew {
  id: number;
  builtyDate: string;
  builtyNumber: string;
  natureOfTransport: string;
  acknowledgementDate: string;
  acknowledgementPerson: string;
  attachmentScanCopyPath: string;
}
