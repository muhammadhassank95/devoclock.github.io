import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { EmployeeInputDto, PreviousJobHistoryDetail, EmployeeReplacementDto } from '../../shared/DTOs/employee-dto';
import { catchError, finalize, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-replacement',
  templateUrl: './employee-replacement.component.html',
})
export class EmployeeReplacementComponent implements OnInit {
  @Input() erpId: string = '';
  employee: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  employeeInputDto: EmployeeInputDto = new EmployeeInputDto()
  employeeReplacementDto: EmployeeReplacementDto = new EmployeeReplacementDto()
  loading: boolean = false;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  replacementDate: string | null = null;


  constructor(private employeeService: EmployeeService, private msgService: MessageService) { }

  ngOnInit(): void {
    debugger;
    if (this.erpId) {
      debugger
      this.fetchEmployeeDetails(this.erpId);
    }
  }

  fetchEmployeeDetails(erpId: string) {
    this.employeeService.getAll(this.skipCount, this.maxCount).subscribe(
      (data) => {
        debugger;
        this.employee = data.items.find((emp) => emp.erp === erpId);
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }

  setPickerValue(value: any, title: string) {
    debugger
    switch (title) {
      case "Employee":
        this.employeeReplacementDto.erp = value.id;
        this.employeeReplacementDto.name = value.name;
        break;
    }
  }
  onSubmit() {
    if (this.replacementDate) {
      this.employeeReplacementDto.ReplacementDate = this.replacementDate;
    }

    this.employeeReplacementDto.ResignedEmployeeERPId = this.erpId;
    debugger
    this.employeeService.createEmployeeReplacement(this.employeeReplacementDto).pipe(
      catchError(error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
        return throwError(error.message);
      })
    ).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Employee replacement created successfully', life: 2000 });
      this.onClose();
    });
  }
  onClose() {
    this.close.emit();
  }

}
