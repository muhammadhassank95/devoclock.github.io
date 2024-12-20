import { Component, ViewChild } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { BudgetService } from "../shared/services/budget.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";

import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import * as moment from "moment";

@Component({
  selector: "app-bulk-upload",
  templateUrl: "./bulk-upload.component.html",
})
export class BulkUploadComponent {
  erpId1: number;
  erpId2: number;
  empName1: number;
  empName2: number;

  loadingBulkLvl1: boolean;
  loadingBulkLvl2: boolean;
  loadingBulkLvl3: boolean;
  loadingBulkCoa: boolean;
  loadingBulkSupplier: boolean;
  title = "csv-download-demo";

  @ViewChild("fileInput") fileInput: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _budgetService: BudgetService
  ) {}

  uploadFile(input: any): void {
    debugger;
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

  downloadCSVTemplateLv11() {
    const headers = ["isActive", "name", "serialNumber", "accountTypeName"];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Lvl1.csv");
    a.click();
    window.URL.revokeObjectURL(url);
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
    this.loadingBulkLvl1 = true;
    debugger;

    var finalArray = [];
    data
      .filter((item: any) => item.name)
      .map((item) => {
        if (item.name !== "") {
          finalArray.push({
            isActive: item.isActive,
            name: item.name,
            serialNumber: item?.serialNumber?.toString(),
            accountTypeName: item?.accountTypeName?.toString(),
          });
        }
      });

    console.log("FILE DATA", finalArray);

    this._budgetService
      .CreateBulk(finalArray)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }

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
    this.loadingBulkLvl1 = false;
  }

  uploadFileLvl2(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSVLvl2(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSXLvl2(file);
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
  handleCSVLvl2(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        this.sendToApiLvl2(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  downloadCSVTemplateLvl2() {
    const headers = [
      "isActive",
      "name",
      "serialNumber",
      "lvl1SerialNumber",
      "accountTypeName",
    ];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Lvl2.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSXLvl2(file: File): void {
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
      this.sendToApiLvl2(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApiLvl2(data: any): void {
    this.loadingBulkLvl2 = true;
    debugger;

    var finalArray = [];
    data
      .filter((item: any) => item.name)
      .map((item) => {
        if (item.name !== "") {
          finalArray.push({
            // "id": item.id,
            isActive: item.isActive,
            name: item.name,
            lvl1SerialNumber: item?.lvl1SerialNumber?.toString(),
            serialNumber: item?.serialNumber?.toString(),
            accountTypeName: item?.accountTypeName?.toString(),
          });
        }
      });

    console.log("FILE DATA", finalArray);
    this._budgetService
      .CreateBulkLvl2(finalArray)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }

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
    this.loadingBulkLvl2 = false;
  }

  uploadFileLvl3(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSVLvl3(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSXLvl3(file);
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
  handleCSVLvl3(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        this.sendToApiLvl3(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  downloadCSVTemplateLvl3() {
    const headers = [
      "isActive",
      "name",
      "serialNumber",
      "lvl2SerialNumber",
      "accountTypeName",
    ];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "Lvl3.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSXLvl3(file: File): void {
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
      this.sendToApiLvl3(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApiLvl3(data: any): void {
    this.loadingBulkLvl3 = true;

    var finalArray = [];
    data
      .filter((item) => item.name)
      .map((item) => {
        if (item.name !== "") {
          finalArray.push({
            // "id": item.id,
            isActive: item.isActive,
            name: item.name,
            serialNumber: item.serialNumber?.toString(),
            lvl2SerialNumber: item.lvl2SerialNumber?.toString(),
            accountTypeName: item?.accountTypeName?.toString(),
          });
        }
      });

    console.log("FILE DATA", finalArray);
    this._budgetService
      .CreateBulkLvl3(finalArray)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }

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
    this.loadingBulkLvl3 = false;
  }

  uploadFileSupplier(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSVSupplier(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSXSupplier(file);
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
  handleCSVSupplier(file: File): void {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log("Parsed CSV Data:", results.data);
        this.sendToApiSupplier(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }

  downloadCSVTemplateSupplier() {
    const headers = [
      "title",
      "shortName",
      "address",
      "phoneNumber",
      "cityName",
      "countryName",
      "gstRate",
      "pocName",
      "pocNumber",
      "faxNumber",
      "ntn",
      "stn",
      "cnic",
      "email",
      "taxSectionName",
      "chartOfAccountSerialNumber",
      "employeeERPId",
      "vendorTypeName",
      "isActive",

      "tax",
    ];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "supplier.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSXSupplier(file: File): void {
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
      this.sendToApiSupplier(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  // sendToApiSupplier(data: any): void {
  //   this.loadingBulkSupplier = true;
  //   // Define the required fields for validation
  //   const requiredFields = [
  //     "title",
  //     "shortName",
  //     "address",
  //     "cityName",
  //     "countryName",
  //     "gstRate",
  //     "pocName",
  //     "pocNumber",
  //     "faxNumber",
  //     "ntn",
  //     "stn",
  //     "cnic",
  //     "email",
  //     "taxSectionName",
  //     "chartOfAccountSerialNumber",
  //     "employeeERPId",
  //     "vendorTypeName",
  //     "tax",
  //   ];

  //   // Initialize error tracking
  //   let validationErrors: string[] = [];
  //   const finalArray = data
  //     .filter((item) =>
  //       Object.values(item).some((value: any) => value && value.trim() !== "")
  //     ) // Filter out empty rows
  //     .map((item, index) => {

  //       const missingFields = requiredFields.filter(
  //         (field) => !item[field] || item[field] === ""
  //       );
  //       if (missingFields.length > 0) {
  //         // Report missing fields with the row index (starting from 1)
  //         validationErrors.push(
  //           `Row ${index + 1}: Missing ${missingFields.join(", ")}`
  //         );
  //       }
  //       return {
  //         isActive: item.isActive,
  //         title: item.title,
  //         shortName: item.shortName,
  //         address: item.address,
  //         phoneNumber: item.phoneNumber,
  //         cityName: item.cityName,
  //         countryName: item.countryName,
  //         gstRate: item.gstRate,
  //         pocName: item.pocName,
  //         pocNumber: item.pocNumber,
  //         faxNumber: item.faxNumber,
  //         ntn: item.ntn,
  //         stn: item.stn,
  //         cnic: item.cnic,
  //         email: item.email,
  //         taxSectionName: item.taxSectionName,
  //         chartOfAccountSerialNumber: item.chartOfAccountSerialNumber,
  //         employeeERPId: item.employeeERPId,
  //         vendorTypeName: item.vendorTypeName,

  //         tax: item.tax,
  //       };
  //     });
  //   // // Check if there are any validation errors
  //   // if (validationErrors.length > 0) {
  //   //   this.messageService.add({
  //   //     severity: "error",
  //   //     summary: "Validation Errors",
  //   //     detail: validationErrors.join("\n"),
  //   //     life: 5000,
  //   //   });
  //   //   this.loadingBulkSupplier = false;
  //   //   return;
  //   // }
  //   console.log("FILE DATA", finalArray);
  //   let Currentdata = {
  //     bulkDtos: finalArray,
  //   };

  //   debugger
  //   this._budgetService
  //     .CreateBulkSupplier(Currentdata)
  //     .pipe(
  //       finalize(() => { }),
  //       catchError((error) => {
  //         debugger;
  //         const errorUrl = newBaseUrl + error.error.error.message;
  //         if (errorUrl) {
  //           window.open(errorUrl, "_blank");
  //         }
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error.error.message,
  //           life: 2000,
  //         });
  //         this.erpId1 = null;
  //         this.empName1 = null;
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         debugger;
  //         this.messageService.add({
  //           severity: "info",
  //           summary: "Confirmed",
  //           detail: "Uploaded Successfully",
  //           life: 2000,
  //         });
  //         this.erpId1 = null;
  //         this.empName1 = null;
  //       },
  //     });
  //   this.loadingBulkSupplier = false;
  // }
  sendToApiSupplier(data: any): void {
    this.loadingBulkSupplier = true;

    const finalArray = data
      .filter((item) => {
        // No filtering based on empty rows
        return true;
      })
      .map((item) => {
        return {
          isActive: item.isActive,
          title: item.title,
          shortName: item.shortName,
          address: item.address,
          phoneNumber: item.phoneNumber,
          cityName: item.cityName,
          countryName: item.countryName,
          gstRate: item.gstRate,
          pocName: item.pocName,
          pocNumber: item.pocNumber,
          faxNumber: item.faxNumber,
          ntn: item.ntn,
          stn: item.stn,
          cnic: item.cnic,
          email: item.email,
          taxSectionName: item.taxSectionName,
          chartOfAccountSerialNumber: item.chartOfAccountSerialNumber,
          employeeERPId: item.employeeERPId,
          vendorTypeName: item.vendorTypeName,
          tax: item.tax,
        };
      });

    console.log("FILE DATA", finalArray);
    let Currentdata = {
      bulkDtos: finalArray,
    };

    this._budgetService
      .CreateBulkSupplier(Currentdata)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }
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
    this.loadingBulkSupplier = false;
  }

  uploadFileCOA(input: any): void {
    debugger;
    const file = input.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      this.handleCSVCOA(file);
    } else if (fileExtension === "xlsx") {
      this.handleXLSXCOA(file);
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
  handleCSVCOA(file: File): void {
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
  downloadCSVTemplateCOA() {
    const headers = [
      "isActive",
      "name",
      "serialNumber",
      "lvl3_SerialNumber",
      "accountTypeName",
      "currencyName",
      "credit",
      "debit",
      "stopEntryBefore",
      "locationName",
      "limit",
      "checkBudget",
      "linkWithName",
      "hasSubLedger",
    ];
    const rows = [headers.join(",")]; // Join headers with comma to form the first row of the CSV

    const csvContent = rows.join("\n"); // Join rows with newline to form the complete CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "COA.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  }

  handleXLSXCOA(file: File): void {
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
      this.sendToApiCOA(result);
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }

  sendToApiCOA(data: any): void {
    this.loadingBulkCoa = true;
    debugger;

    var finalArray = [];
    data.map((item) => {
      // if (item.id !== "") {
      finalArray.push({
        // "id": item.id,
        isActive: item.isActive,
        name: item.name,
        serialNumber: item.serialNumber,
        lvl3_SerialNumber: item.lvl3_SerialNumber?.toString(),
        accountTypeName: item.accountTypeName,
        currencyName: item.currencyName,
        credit: item.credit,
        debit: item.debit,
        stopEntryBefore: item.stopEntryBefore,

        locationName: item.locationName,
        limit: item.limit,
        checkBudget: item.checkBudget,
        linkWithName: item.linkWithName,
        hasSubLedger: item.hasSubLedger,
      });
    });

    console.log("FILE DATA", finalArray);
    let Currentdata = {
      bulkDtos: finalArray,
    };
    debugger;
    this._budgetService
      .CreateBulkCOA(Currentdata)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          const errorUrl = newBaseUrl + error.error.error.message;
          if (errorUrl) {
            window.open(errorUrl, "_blank");
          }

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
    this.loadingBulkCoa = false;
  }
}
