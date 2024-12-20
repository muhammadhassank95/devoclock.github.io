export class BankReceiptDto {
    documentDate: Date;
    locationId: number;
    locationName: string;
    voucherNumber: string;
    bankId: number;
    bankName: string;
    checqueTitle: string;
    reference: string;
    referenceDate: Date;
    narration: string;
    totalChecqueAmt: number;
    totalTaxAmt: number;
    taxAccId: number;
    taxAccName: string;
    oTaxAccId: number;
    oTaxAccName: string;
    isTaxReceipt: boolean;
}
