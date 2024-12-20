import { Component, ViewChild } from "@angular/core";
import { AttendanceService } from "../../shared/services/attendance.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import * as Papa from "papaparse";
import * as XLSX from "xlsx";

@Component({
  selector: "app-mark-attendance",
  templateUrl: "./mark-attendance.component.html",
})
export class MarkAttendanceComponent {
  erpId1: number;
  erpId2: number;
  empName1: number;
  empName2: number;

  loadingBulk: boolean;

  @ViewChild("fileInput") fileInput: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _attendanceService: AttendanceService
  ) {}

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Employee1":
        this.erpId1 = +value.id;
        break;
      case "Employee2":
        this.erpId2 = +value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  CheckIn() {
    debugger;
    if (!this.erpId1) {
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure to Check In?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        this._attendanceService
          .CheckIn(this.erpId1)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
                life: 2000,
              });
              this.erpId1 = null;
              this.empName1 = null;
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Checked In Successfully",
                life: 2000,
              });
              this.erpId1 = null;
              this.empName1 = null;
            },
          });
      },
    });
  }

  CheckOut() {
    debugger;
    if (!this.erpId2) {
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure to Check Out?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        this._attendanceService
          .CheckOut(this.erpId2)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
                life: 2000,
              });
              this.erpId2 = null;
              this.empName2 = null;
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              this.messageService.add({
                severity: "info",
                summary: "Confirmed",
                detail: "Checked Out Successfully",
                life: 2000,
              });
              this.erpId2 = null;
              this.empName2 = null;
            },
          });
      },
    });
  }

  downloadCSVTemplate() {
    const headers = ["fpM_Id", "checkTime", "checkType", "attendanceDate"];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "template.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // onFileSelected(event: any): void {
  //   debugger
  //   const file = event.target.files[0];
  //   if (!file) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   const fileExtension = file.name.split('.').pop().toLowerCase();

  //   if (fileExtension === 'csv') {
  //     this.handleCSV(file);
  //   } else if (fileExtension === 'xlsx') {
  //     this.handleXLSX(file);
  //   } else {
  //     console.error('Unsupported file type');
  //   }
  // }

  // handleCSV(file: File): void {
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       console.log('Parsed CSV Data:', results.data);
  //       this.sendToApi(results.data);
  //     },
  //     error: (error) => {
  //       console.error('Error parsing CSV:', error);
  //     }
  //   });
  // }

  // handleXLSX(file: File): void {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const data = new Uint8Array((event.target as FileReader).result as ArrayBuffer);
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     const headers = json[0] as string[];
  //     const rows = json.slice(1);

  //     const result = rows.map(row => {
  //       const obj: any = {};
  //       headers.forEach((header, index) => {
  //         obj[header] = row[index];
  //       });
  //       return obj;
  //     });

  //     console.log('Parsed XLSX Data:', result);
  //     this.sendToApi(result);
  //   };
  //   reader.onerror = (error) => {
  //     console.error('Error reading XLSX file:', error);
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  // sendToApi(data: any): void {
  //   debugger
  //   this._attendanceService.CreateBulk(data)
  //     .pipe(
  //       finalize(() => { }),
  //       catchError(error => {
  //         debugger
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
  //         this.erpId1 = null
  //         this.empName1 = null
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         debugger
  //         this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Uploaded Successfully', life: 2000 });
  //         this.erpId1 = null
  //         this.empName1 = null
  //       }
  //     });
  // }

  uploadFile(input: any): void {
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSV(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSX(file);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Supported file formats: xlsx,csv",
        life: 2000,
      });
      console.error("Unsupported file type");
      this.fileInput.nativeElement.value = "";
    }
  }

  handleCSV(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        this.sendToApi(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  handleXLSX(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(
        (event.target as FileReader).result as ArrayBuffer
      );
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = json[0] as string[];
      const rows = json.slice(1);

      const result = rows.map((row) => {
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      console.log("Parsed XLSX Data:", result);
      this.sendToApi(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApi(data: any): void {
    this.loadingBulk = true;
    debugger;

    var finalArray = [];
    data.map((item) => {
      if (item.attendanceDate != undefined) {
        finalArray.push({
          biometricId: item.fpM_Id,
          checkTime: item.checkTime,
          checkType: item.checkType,
          attendanceDate: item.attendanceDate,
        });

        // "fpM_Id", "checkTime", "checkType", "attendanceDate"
      }
    });

    console.log("FILE DATA", finalArray);
    this._attendanceService
      .CreateBulk(finalArray)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          this.erpId1 = null;
          this.empName1 = null;
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.messageService.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Uploaded Successfully",
            life: 2000,
          });
          this.erpId1 = null;
          this.empName1 = null;
        },
      });
    this.loadingBulk = false;
  }
}
