export class LeavePolicy {
  issueDate: Date;
  remarks: string;
  voucherNumber: string;
  willEffectFromDate: Date;
  userLocationId: number;
  userLocationName: string;
  title: string;
  id: number;
  leavePolicyDetails: LeavePolicyGrid[];
}

export class LeavePolicyGrid {
  leaveType: string;
  totalAvail: number;
  maxAvailPerMonth: number;
  unit: string;
  isLimited: boolean;
  maxAvail: number;
  encashAfterLeaves: number;
  encashment: boolean;
}
