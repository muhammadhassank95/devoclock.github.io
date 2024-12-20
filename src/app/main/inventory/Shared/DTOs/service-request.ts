export class ServiceRequest {
  issueDate: Date;
  consumptionMonth: Date;
  voucherNumber: string;
  employeeId: number;
  employeeName: string;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  userLocationId: number;
  userLocationName: string;
  // regionId: number;
  // regionName: string;
  ohJobId: number;
  ohJobName: string;
  supplierId: number;
  supplierName: string;
  totalAmount: number;
  serviceRequisitionDetails: ServiceRequestGrid[];
}

export class ServiceRequestGrid {
  itemId: number;
  remarks: string;
  qtyRequired: number;
  costRate: number;
  totalAmount: number;
  requestDate: Date;
}
