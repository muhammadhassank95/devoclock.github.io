export class SubLedger {
    id: number;
    isActive: true;
    serialNumber: string;
    name: string;
    lvl3_Id: string;
    lvl3_serialNo: number;
    lvl3_name: number;
    lvl1Id: number;
    lvl1_serialNo: number;
    lvl1_name: string;
    lvl2Id: number;
    lvl2_serialNo: number;
    lvl2_name: string;
    accountTypeId: number;
    accountTypeName: string;
    currencyId: number;
    currencyName: string;
    credit: null;
    hasSubLedger: boolean;
    debit: string;
    stopEntryBefore: Date | string;
    locationId: number;
    locationName: string;
    limit: string;
    checkBudget: boolean;
    linkWithId: number;
    linkWithName: string;
    numberOfDays: string;
    totalCreditLimit: number;
    terms: string;

}
