export class ProvidentFundProfit {
  id: number;
  issueDate: Date;
  voucherNumber: string;
  debitToCOAId: number;
  debitToCOAName: string;
  debitToCOASerialNumber: string;
  userLocationId: number;
  userLocationName: string;
  creditToCOAId: number;
  creditToCOAName: string;
  creditToCOASerialNumber: string;
  totalAmount: number;
  reference: string;
  referenceDate: Date;
  startPeriod: Date;
  endPeriod: Date;
  profitAmount: number;
  reason: string;
  providentFundProfitContributionDetails: any[];
  isActive: boolean;
}

// {
//     employeeId: number;
//     profitAmount: number
// }
