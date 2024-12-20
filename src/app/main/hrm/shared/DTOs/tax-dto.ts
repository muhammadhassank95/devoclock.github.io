export class TaxDto {
  id: number;
  isActive: boolean;
  userLocationId: number;
  userLocationName: string;
  willEffectFromDate: Date;
  voucherNumber: string;
  issueDate: Date;
  incomeTaxDeductionPolicyDetails: TaxArrayDto[];
}

export class TaxArrayDto {
  fromAmount: number;
  toAmount: number;
  percentage: number;
  amount: number;
}
