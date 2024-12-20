import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { PresentEmployeeDTO } from '../../shared/DTOs/attendance-dto'
import { AttendanceService } from '../../shared/services/attendance.service'
import { MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-present-employee',
  templateUrl: './present-employee.component.html',
})
export class PresentEmployeeComponent {


  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isViewMode: boolean;

  startDate: Date;
  endDate: Date;

  presentEmployeeDTO: PresentEmployeeDTO = new PresentEmployeeDTO()

  constructor(
    private _attendanceService: AttendanceService,
    private messageService: MessageService,
  ) {
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onPageChange(event: any) {
    debugger
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this._attendanceService.getPresent(this.formatDateToYYYYMMDD(this.startDate), this.formatDateToYYYYMMDD(this.endDate))
      .pipe(
        finalize(() => { }),
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.totalCount;
        }
      });
  }

  Search() {
    debugger
    if (!this.startDate) {
      return
    }
    else if (!this.endDate) {
      return
    } else {
      this._attendanceService.getPresent(this.formatDateToYYYYMMDD(this.startDate), this.formatDateToYYYYMMDD(this.endDate))
        .pipe(
          finalize(() => { }),
          catchError(error => {
            debugger
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            debugger
            this.data = response.items;
            this.count = response.totalCount;
          }
        });
    }
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

}
