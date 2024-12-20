export class IssuanceNoteDto {

    id: number;
    issueDate: Date;
    voucherNumber: string;
    userLocationId: number;
    userLocationName: string;
    projectId: number;
    projectName: string;
    employeeId: number;
    employeeName: string;
    costCenterId: number;
    costCenterName: string;
    ohJobId: number;
    ohJobName: string;
    documentStatus: string;
    isActive: true;
    partIssuanceNoteDetails: any[];
}

