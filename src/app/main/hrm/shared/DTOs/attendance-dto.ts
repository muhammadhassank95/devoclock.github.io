export class PresentEmployeeDTO {
    id: number;
    employeeId: number;
    erpId: string;
    employeeName: string;
    checkIn_Time: string;
    lateTime: string;
    checkOut_Time: string;
    attendanceDate: string;
}

export class AbsentEmployeeDTO {
    id: number;
    erpId: string;
    name: string;
    absenteesCount: string;
    absenteesDates: string[];
}

export class BulkDto {
    fpM_Id: number;
    checKIn: string;
    checKOut: string;
    attendanceDate: string;
}


export class BulkDtosContainer {
    bulkDtos: BulkDto[];
}


export class MarkAttendanceDto {
    id: number;
    ERPId: number
    Check_In: Date
    Check_Out: Date
    AttendanceDate: Date
}