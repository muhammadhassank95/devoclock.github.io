
class AllowanceDTO {
    allowanceId: number;
    allowanceName: string;
    amount: number;
}

export class ViewSalariesDto {
    id: number;
    isActive: boolean;
    employeeId: number;
    erpId: number;
    employeeName: string;
    departmentId: number;
    departmentName: string;
    designationId: number;
    designationName: string;
    costCenterId: number;
    costCenterName: string;
    projectId: number;
    projectName: string;
    currencyId: number;
    currencyName: string;
    workingDays: number;
    leaveWithOutPay: number;
    absent: number;
    totalDays: number;
    leaves: Record<string, number>;
    grossPay: number;
    allowances: AllowanceDTO[];
    arrearsAmount: number;
    overTimeAutoHours: number;
    autoOverTimeDescription: Record<string, number>;
    autoOverTimeAmount: Record<string, number>;
    overTimeManualHours: number;
    overTimeManualAmout: number;
    dutyHours: number;
    offDays: number;
    offDayRate: number;
    offDayAmount: number;
    wageRate: number;
    others: number;
    grossPayable: number;
    incomeTaxDeduction: number;
    loans: Record<string, number>;
    eobI_EmployeePercentage: number;
    eobI_EmployeeAmount: number;
    eobI_EmployeeMaxAmount: number;
    eobI_EmployerPercentage: number;
    eobI_EmployerAmount: number;
    eobI_EmployerMaxAmount: number;
    sS_EmployeePercentage: number;
    sS_EmployeeAmount: number;
    sS_EmployeeMaxAmount: number;
    sS_EmployerPercentage: number;
    sS_EmployerAmount: number;
    sS_EmployerMaxAmount: number;
    pF_Percentage: number;
    pF_Amount: number;
    absentDeduction: number;
    totalDeductions: number;
    netPayable: number;
    holdSalary: boolean;
}

