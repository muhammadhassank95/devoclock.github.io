import { Component,OnInit,Injector } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html'
})
export class AttendanceComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector){
    super(injector);
}
  permissions: PermissionsDto;
  ngOnInit() {}
  empId: number;
  empName: string;

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Employee":
        this.empId = value.id;
        this.empName = value.name;
        break;

      default:
        alert(`${title} is not defined`);
    }
  }
  isPermitted(service: string): boolean {
    return this.isGranted(service);
  }
  downloadPDF(): void {
    // const doc = new jsPDF();

    // doc.text('HNL PVT', 10, 10);
    // doc.text(`Employee ID: ${this.empId}`, 10, 10);
    // doc.text(`Employee Name: ${this.empName}`, 10, 20);

    // // Save the PDF
    // doc.save('download.pdf');


    const link = document.createElement('a');
    link.href = 'assets/appointmentletter.pdf';
    link.download = 'appointmentletter.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }



}
