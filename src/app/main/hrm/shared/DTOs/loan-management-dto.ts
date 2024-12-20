export class InputLoanManagementDto {
  id: number;
  isActive: boolean;
  status: boolean;
  voucherNumber: string;
  employeeERPId: string;
  employeeId: any;
  userLocationId: number;
  userLocationName: string;
  erpName: string;
  loanTypeId: number;
  loanTypeName: string;
  reasonOfDeductionId: number;
  reasonOfDeductionName: string;
  amount: number;
  numberOfInstallments: number;
  installmentAmount: number;
  repaymentStartDate: string | Date | any;
  documentDate: Date | string | any;
  recommendedByERPId: number;
  recommendedByERPName: string;
  comments: string;
  contactNo?: string;
  addresses?: string[];
  jobDuration?: string;
  currentSalary?: string;
  currentLoan?: string;
  attendanceScore?: string;
  contact?: string;
  address?: string;
}

export class LoanArrayDto {
  id: number;
  isActive: boolean;
  voucherNumber: string;
  employeeId: number;
  employeeERPId: string;
  employeeName: string;
  loanTypeId: number;
  loanTypeName: string;
  reasonOfDeductionId: number;
  reasonOfDeductionName: string;
  amount: number;
  numberOfInstallments: number;
  repaymentStartDate: Date;
  documentDate: Date;
  recommendedById: number;
  recommendedByERPId: string;
  recommendedByName: string;
  comments: string;
  status: string;
}

export class FreezeLoanDto {
  RepaymentId: string;
  TransferredToDate: Date;
}
export class GetAllLoanManagementDto {
  items: LoanArrayDto;
  totalCount: number;
}
