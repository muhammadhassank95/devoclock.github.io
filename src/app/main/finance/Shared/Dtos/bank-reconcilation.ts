export class BankReconcilation {
  locationId: number;
  locationName: string;
  documentDate: Date;
  voucherNumber: string;
  voucherDate: Date;
  ledgerVoucherNumber: number;
  ledgerVoucherDate: Date;
  havingValue;
  startDate: Date;
  finishDate: Date;
  comment: string;
  chartOfAccountId: number;
  chartOfAccountName: string;
  typeOfTransactionId: number;
  typeOfTransactionName: string;
  chartOfAccountSerialNumber;
  unreconciledEntries: number;
  unreconciledDebit: number;
  unreconciledCredit: number;

  reconciledEntries: number;
  reconciledDebit: number;
  reconciledCredit: number;

  totalEntries: number;
  totalDebit: number;
  totalCredit: number;
}
