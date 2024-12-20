export class CashPayment {
    documentDate: Date;
    locationId: number;
    locationName: string;
    voucherNumber: string;
    taxPayment: boolean;
    crossedCheque: boolean;
    cashId: number;
    cashName: string;
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

