export class BankPaymentDto {
    documentDate: Date;
    locationId: number;
    locationName: string;
    voucherNumber: string;
    taxPayment: boolean;
    crossedCheque: boolean;
    bankId: number;
    bankName: string;
    chequeTitle: string;
    noCheque: boolean;
    reference: string;
    referenceDate: Date;
    comments;
    taxAcId: number;
    taxAcName: string;
    oTaxAcId: number;
    oTaxAcName: string;
    totalChqAmount: number;
    totalTaxAmount: number;
}

