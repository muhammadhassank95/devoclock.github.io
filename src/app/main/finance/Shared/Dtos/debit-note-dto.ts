export class DebitNoteDto {
    documentDate: Date;
    locationId: number;
    locationName: string;
    voucherNumber: string;
    accountId: number;
    accountName: string;
    creditToId: number;
    creditToName: string;
    narration: string;
    totalAmt: number;
    salesTax: number;
    netAmount: number
}
