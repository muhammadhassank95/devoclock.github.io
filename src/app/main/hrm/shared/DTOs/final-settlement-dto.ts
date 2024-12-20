export class FinalSettlementDto {
    id: number;
    // creationTime: Date;
    // creatorUserId: number;
    // lastModificationTime: Date;
    // lastModifierUserId: number;
    // isDeleted: true;
    // deleterUserId: number;
    // deletionTime: Date;
    isActive: true;
    // tenantId: number;
    employeeId: number;
    employeeName: string;
    documentDate: Date;
    resignationDate: Date;
    noticePeriod: number;
    releaseDate: Date;
    noticePeriodDate: Date;
    salaryDue: number;
    overTime: number;
    leaveEncashmentFund: number;
    providentFund: number;
    incomeTaxDeduction: number;
    employee_EOBI_Deductions: number;
    employer_EOBI_Deductions: number;
    employee_SS_Deductions: number;
    employer_SS_Deductions: number;
    loanTaken: number;
    pendingLoan: number;
    employeeGrossPayable: number;
    employeeNetPayable: number;
    chequeNumber: string;
    chequeDate: Date;
    drawnOn: string
}
