import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HoldSalaryDto } from '../shared/DTOs/hold-salary-dto';
import { catchError, finalize, throwError } from 'rxjs';


@Component({
  selector: 'app-appointment-letter',
  templateUrl: './appointment-letter.component.html',
})
export class AppointmentLetterComponent {

  data: any
  count: number
  saving: boolean
  editMode: boolean
  dialogVisibility: boolean

  dto = {
    empId: 0,
    empName: '',
    date: '',
    voucherNumber: 0,
    narration: ''
  }

  constructor(
    private messageService: MessageService,
    private confirmationService?: ConfirmationService,
  ) { }

  openModal() {
    this.dialogVisibility = true
  }


  setPickerValue(value: any, title: string) {
    debugger
    switch (title) {
      // case "Location":
      //     debugger
      //     this.locationId = +value.id
      //     this.locationName = value.name
      //     this.MakeVoucher();
      //     break;
      // case "Supplier":
      //     debugger
      //     this.supplierId = +value.id
      //     this.supplierName = value.name
      //     break;
      // case "Employee":
      //     debugger
      //     this.serviceInvoice.employeeId = +value.additional;
      //     this.serviceInvoice.employeeName = value.name
      //     break;
      default:
        alert(`${title} is not defined`)
    }
  }


  downloadPDF(): void {
    const link = document.createElement('a');
    link.href = 'assets/appointmentletter.pdf';
    link.download = 'appointmentletter.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
  onDialogClose() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to close without saving?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.dialogVisibility = false;
        },
        reject: () => {
            this.dialogVisibility = true;
        }
    });
}

}
