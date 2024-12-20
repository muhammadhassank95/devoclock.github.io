export class EmpSalaryInc {
    EmployeeErpId: number;
    EmployeeErpName: string;
    applicableFromDate: Date | string;
}


export class EmpSalaryIncGrid {
    erpId: string;
    employeeName: string;
    applicableFrom: Date | string;
    basicPay: number;
    houseRent: number;
    medicalAllowance: number;
    otherAllowance: number;
    arrears: number;
    grossSalary: number;
}

export class NewSalaryObjectDto {
    percentage: number;
    editAbleSalary: boolean;
    editAbleAllownce: boolean;
    name: string;
    value: number;
    id: number;
}

export class NewSalaryDto {
    grossSalary: number;
    basicPay: number;
    newGrossSalary: number;
    createdBy: string;
    incrementDetails: NewSalaryObjectDto[]
}
