export class lePolicyDto {
  id: number;
  userLocationId: number;
  userLocationName: string;
  issueDate: Date;
  willEffectFromDate: Date;
  voucherNumber: string;
  employeeTypeId: number;
  employeeTypeName: string;
  isLEBasedOnBasicPay: boolean;
  isActive: boolean;
  maxCarryForward: string;
  maxAllowedforEncashment: string;
  remarks: string;
  financialYearId: number;
  financialYearName: string;
  leaveEncashmentPolicyDetails: leArray[];
}

class leArray {
  leaveTypeId: number;
  leaveTypeName: string;
}

export class ssPolicyDto {
  id: number;
  isActive: boolean;
  userLocationId: number;
  userLocationName: string;
  issueDate: Date;
  voucherNumber: string;
  willEffectFromDate: string | Date;
  employeeTypeId: number;
  employeeTypeName: string;
  isSSBasedOnBasicPay: boolean;
  salaryLimit: number;
  employeeContributionPercentage: number;
  employeeContributionMaxDeduction: number;
  employerContributionPercentage: number;
  employerContributionMaxDeduction: number;
  payTillAge: number;
  ageLimit: number;
  remarks: string;
  employeePercentageDeduction: number;
  employerPercentageDeduction: number;
}

export class EOBIdto {
  id: number;
  isActive: true;
  userLocationId: number;
  userLocationName: string;
  voucherNumber: string;
  issueDate: Date;
  willEffectFromDate: string | Date;
  employeeTypeId: number;
  employeeTypeName: string;
  // isEOBIBasedOnBasicPay: boolean;
  eobiSalary: number;
  employeeContributionPercentage: number;
  employeeContributionMaxDeduction: number;
  employerContributionPercentage: number;
  employerContributionMaxDeduction: number;
  ageLimit: number;
  payTillAge: number;
  remarks: string;

  employeePercentageDeduction: number;
  employerPercentageDeduction: number;
}

export class AnnualLEDto {
  id: number;
  voucherNumber: string;
  documentDate: string;
  paymentDate: string;
  subDetails: LEGrid[];

  locationId: number;
  locationName: string;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  financialYearId: number;
  financialYearName: string;
}

class LEGrid {
  employeeId: number;
  allowed: number;
  available: number;
  availed: number;
  encash: number;
  carryForward: number;
  totalAmount: number;
}

export class OvertimepolicyDto {
  id: number;
  isActive: true;
  issueDate: string | Date;
  voucherNumber: string;
  userLocationId: number;
  userLocationName: string;
  willEffectFromDate: string | Date;
  oT_NormalRate: number;
  maxOTHours_NormalDays: number;
  otRateRestDay_CPLGiven: number;
  otRateRestDay_CPLNotGiven: number;
  maxOTHours_RestDays: number;
  otRateGauztedDay_CPLGiven: number;
  otRateGauztedDay_CPLNotGiven: number;
  maxOTHours_GauztedDays: number;
  // isOTBasedOnBasicPay: true;
  isOTBasedOnGrossPay: boolean;
  remarks: string;
}
export class ProvidentPolicyDto {
  id: number;
  isActive: true;
  userLocationId: number;
  userLocationName: string;
  voucherNumber: string;
  issueDate: Date;
  willEffectFromDate: string | Date;
  percentage: number;
  isPFBasedOnGrossPay: true;
}
export class ManualOvertimeDto {
  id: number;
  isActive: boolean;
  issueDate: Date;
  voucherNumber: number;
  employeeId: number;
  erpId: number;
  employeeName: string;
  userLocationId: number;
  userLocationName: string;
  additional: string;
  overTimeHours: number;
  allowedOverTimeHours: number;
  netOverTimeHours: number;
  isOTBasedOnGrossPay: boolean;
  overTimeAmount: number;
}

export class SalaryStructureDto {
  id: number;
  isActive: true;
  days: number;
  salaryGeneratingType: number;
}
