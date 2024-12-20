import { Component, ViewChild } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AttendanceService } from '../../shared/services/attendance.service'
import { newBaseUrl } from '@shared/AppBaseURL/appBaseURL';


import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-machine-integration',
  templateUrl: './machine-integration.component.html',
})
export class MachineIntegrationComponent {
  erpId1: number
  erpId2: number
  empName1: number
  empName2: number

  loadingBulk: boolean
  title = 'csv-download-demo';


  @ViewChild('fileInput') fileInput: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _attendanceService: AttendanceService,
  ) {
  }

  uploadFile(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      this.handleCSV(file);
    } else if (fileExtension === 'xlsx') {
      this.handleXLSX(file);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Supported file formats: xlsx,csv", life: 2000 });
      console.error('Unsupported file type');
      this.fileInput.nativeElement.value = '';
    }
  }
  handleCSV(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Parsed CSV Data:', results.data);
        this.sendToApi(results.data);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }

  downloadCSVTemplate() {
    const headers = ['erpId', 'biometricId'];
    const rows = [headers.join(',')]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join('\n'); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'template.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSX(file: File): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array((event.target as FileReader).result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = json[0] as string[];
      const rows = json.slice(1);

      const result = rows.map(row => {
        const obj: any = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });

      console.log('Parsed XLSX Data:', result);
      this.sendToApi(result);
    };
    reader.onerror = (error) => {
      console.error('Error reading XLSX file:', error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApi(data: any): void {
    this.loadingBulk = true
    debugger

    var finalArray = []
    data.map(item => {
      if (item.erpId !== "") {
        finalArray.push({
          "erpId": item.erpId,
          "biometricId": item.biometricId,
        })
      }
    }

    )


    console.log("FILE DATA", finalArray);
    this._attendanceService.CreateMachineIntegrationBulk(finalArray)
      .pipe(
        finalize(() => { }),
        catchError(error => {
          debugger
          const errorUrl = newBaseUrl + error.error.error.message
          if (errorUrl) {
            window.open(errorUrl, '_blank');
          }

          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
          this.erpId1 = null
          this.empName1 = null
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Uploaded Successfully', life: 2000 });
          this.erpId1 = null
          this.empName1 = null
        }
      });
    this.loadingBulk = false
  }

}
