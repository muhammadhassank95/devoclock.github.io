export class MaterialConsumtionNoteDto {
  id: number;
  issueDate: Date;
  userLocationId: number;
  userLocationName: string;
  voucherNumber: string;
  employeeId: number;
  remarks: string;
  employeeName: string;
  materialConsumptionNoteDetails: any[];
}
