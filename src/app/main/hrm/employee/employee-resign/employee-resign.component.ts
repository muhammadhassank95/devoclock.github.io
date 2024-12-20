import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MarkEmployeeAsResignedDto } from '../../shared/DTOs/employee-dto'
import { EmployeeService } from '../../shared/services/employee.service'
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
@Component({
    selector: 'app-employee-resign',
    templateUrl: './employee-resign.component.html',
})
export class EmployeeResignComponent {
    constructor(
        private employeeService: EmployeeService, private msgService: MessageService
    ) { }
    ngOnChanges(changes: SimpleChanges) {
        debugger
        if (changes.erp && changes.erp.currentValue) {
            this.markEmployeeAsResignedDto.erp = this.erp;
        }
    }
    today: Date = new Date();

    markEmployeeAsResignedDto: MarkEmployeeAsResignedDto = new MarkEmployeeAsResignedDto();
    @Output() close = new EventEmitter<void>();
    @Input() erp: string = '';


    onSubmit() {
        this.employeeService.MarkEmployeeAsResigned(this.markEmployeeAsResignedDto).pipe(
            catchError(error => {
                this.msgService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
                return of(null);
            })
        ).subscribe(response => {
            if (response) {
                this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Employee marked as resigned successfully', life: 2000 });
                this.onClose();
            }
        });
    }

    onClose() {
        this.close.emit();
    }
}
