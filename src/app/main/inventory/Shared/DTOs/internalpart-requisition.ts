export class InternalpartRequisition {
  id: number;
  issueDate: Date;
  voucherNumber: string;
  isActive: true;
  // regionId: number;
  // regionName: string;
  employeeId: number;
  employeeName: string;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  ohJobId: number;
  ohJobName: string;
  userLocationId: number;
  userLocationName: string;
  locationName: string;
  internalPartRequisitionDetails: any = [];
}
