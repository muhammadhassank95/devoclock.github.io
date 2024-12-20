import { Component } from "@angular/core";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { catchError, finalize, throwError } from "rxjs";
import { MessageService } from "primeng/api";
import * as Papa from "papaparse";
import { Table } from "primeng/table";
import * as XLSX from "xlsx";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
interface LedgerItem {
  locationId: number | null;
  locationName: string;
  fromChartOfAccountId: number | null;
  fromChartOfAccountName: string;
  toChartOfAccountId: number | null;
  toChartOfAccountName: string;
  fromProjectId: number | null;
  fromProjectName: string;
  toProjectId: number | null;
  toProjectName: string;
  fromCostCenterId: number | null;
  fromCostCenterName: string;
  toCostCenterId: number | null;
  toCostCenterName: string;
  fromSupplierId: number | null;
  fromSupplierName: string;
  toSupplierId: number | null;
  toSupplierName: string;
  fromPattyId: number | null;
  fromPattyName: string;
  toPattyId: number | null;
  toPattyName: string;
  // regionId: number | null;
  // regionName: string;
  startDate: string;
  endDate: string;
  debit: number;
  credit: number;
}

@Component({
  selector: "app-general-ledger",
  templateUrl: "./general-ledger.component.html",
  styleUrl: "./general-ledger.component.css",
})
export class GeneralLedgerComponent {
  tableData: LedgerItem[] = [];
  // tableData: [] = [];
  count: number = 0;
  target: string = "GeneralLedger";
  dialogVisibility: boolean;
  loading: boolean;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  loadTableData: boolean;
  showSerialNumberFromCOA: string;
  showSerialNumberToCOA: string;
  showSerialNumberFromSupplier: string;
  showSerialNumberToSupplier: string;
  showSerialNumberFromClient: string;
  showSerialNumberToClient: string;
  showSerialNumberFromPatty: string;
  showSerialNumberToPatty: string;
  checkCOASubledger: any;
  dto: any = {
    locationId: null,
    locationName: "",
    fromChartOfAccountId: null,
    fromChartOfAccountName: "",
    toChartOfAccountId: null,
    toChartOfAccountName: "",
    fromProjectId: null,
    fromProjectName: "",
    toProjectId: null,
    toProjectName: "",
    fromCostCenterId: null,
    fromCostCenterName: "",
    toCostCenterId: null,
    toCostCenterName: "",
    fromSupplierId: null,
    fromSupplierName: "",
    toSupplierId: null,
    toSupplierName: "",
    fromClientId: null,
    fromClientName: "",
    toClientId: null,
    toClientName: "",
    fromPattyId: null,
    fromPattyName: "",
    toPattyId: null,
    toPattyName: "",
    fromEmployeeId: null,
    fromEmployeeName: "",
    toEmployeeId: null,
    toEmployeeName: "",
    // regionId: null,
    // regionName: "",
    startDate: "",
    endDate: "",
    debit: 0,
    credit: 0,
  };
  filterdto = {
    skipCount: 0,
    maxCount: 5,
    linkedDocument: 1,
  };
  showErpIdFrom: number;
  showErpIdTo: number;

  statusOptions = [
    { label: "Posted", value: "posted" },
    { label: "Unposted", value: "unposted" },
  ];

  selectedNodes: any;
  showExportOptions = false;
  exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "Excel", value: "xlsx" },
    { label: "PDF", value: "pdf" },
    // Add more options as needed
  ];

  constructor(
    private financeService: FinanceModuleService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // this.getGeneralledgerDataAgainstFilters();
    this.getAll();
  }
  // downloadCSVFile() {
  //   const data = this.tableData;
  //   if (!data || data.length === 0) {
  //     return;
  //   }
  //   const csv = Papa.unparse(data);
  //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   if (link.download !== undefined) {
  //     const url = URL.createObjectURL(blob);
  //     link.setAttribute("href", url);
  //     link.setAttribute("download", "data.csv");
  //     link.style.visibility = "hidden";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }

  getAll() {
    this.loadTableData = true;
    let currentPrenms = {
      maxCount: this.maxCount,
      skipCount: this.skipCount,
    };
    this.financeService
      .getAll(this.target, currentPrenms)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            () =>
              new Error(
                error.error.error.message || "An unknown error occurred"
              )
          );
        })
      )
      .subscribe((response) => {
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loadTableData = false;
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  show() {
    this.dialogVisibility = true;
    this.dto.endDate = new Date();
    const financialYear = JSON.parse(
      localStorage.getItem("FinancialYearObject")
    );
    const startDate = financialYear?.startDate
      ? new Date(financialYear.startDate)
      : new Date();
    this.dto.startDate = startDate;
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    debugger;
    switch (title) {
      case "Project From":
        this.dto.fromProjectId = +value.id || null;
        this.dto.fromProjectName = value.name;
        break;
      case "Project To":
        this.dto.toProjectId = +value.id || null;
        this.dto.toProjectName = value.name;
        break;
      case "From A/c":
        this.dto.fromChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.fromChartOfAccountName = value.name;
        this.showSerialNumberFromCOA = value.id.split("/")[1] || "";
        break;
      case "To A/c":
        this.dto.toChartOfAccountId = value.id.split("/")[0] || "";
        this.dto.toChartOfAccountName = value.name;
        this.showSerialNumberToCOA = value.id.split("/")[1] || "";
        break;
      case "Location":
        this.dto.locationId = +value.id || null;
        this.dto.locationName = value.name;
        break;
      case "C.C. From":
        this.dto.fromCostCenterId = +value.id || null;
        this.dto.fromCostCenterName = value.name;
        break;
      case "C.C. To":
        this.dto.toCostCenterId = +value.id || null;
        this.dto.toCostCenterName = value.name;
        break;
      case "from Supplier":
        this.dto.fromSupplierId = +value.id || null;
        this.dto.fromSupplierName = value.title;
        this.showSerialNumberFromSupplier = value.serialNumber;
        break;
      case "to Supplier":
        this.dto.toSupplierId = +value.id || null;
        this.dto.toSupplierName = value.title;
        this.showSerialNumberToSupplier = value.serialNumber;
        break;
      case "from Client":
        this.dto.fromClientId = +value.id || null;
        this.dto.fromClientName = value.title;
        this.showSerialNumberFromClient = value.serialNumber;
        break;
      case "to Client":
        this.dto.toClientId = +value.id || null;
        this.dto.toClientName = value.title;
        this.showSerialNumberToClient = value.serialNumber;
        break;
      case "from Patty":
        this.dto.fromPattyId = +value.id || null;
        this.dto.fromPattyName = value.title;
        this.showSerialNumberFromPatty = value.serialNumber;
        break;
      case "to Patty":
        this.dto.toPattyId = +value.id || null;
        this.dto.toPattyName = value.title;
        this.showSerialNumberToPatty = value.serialNumber;
        break;
      case "from Employee":
        this.dto.fromEmployeeId = value.additional || null;
        this.dto.fromEmployeeName = value.name;
        this.showErpIdFrom = value.id;
        break;
      case "to Employee":
        this.dto.toEmployeeId = +value.additional || null;
        this.dto.toEmployeeName = value.name;
        this.showErpIdTo = value.id;
        break;
      // case "Region":
      //   this.dto.regionId = +value.id || null;
      //   this.dto.regionName = value.name;
      //   break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getGeneralledgerDataAgainstFilters() {
    debugger;
    if (
      !this.dto.fromSupplierId ||
      !this.dto.toSupplierId ||
      !this.dto.fromClientId ||
      !this.dto.toClientId
    ) {
    } else if (!this.dto.fromChartOfAccountId || !this.dto.toChartOfAccountId) {
      this.messageService.add({
        severity: "error",
        detail: "Please Select Chart of Accounts",
        life: 2000,
      });
      return;
    }
    if (!this.dto.startDate || !this.dto.endDate) {
      this.messageService.add({
        severity: "error",
        detail: "Please Select a Date Range",
        life: 2000,
      });
      return;
    }
    // this.financeService
    //   .getDataForEdit(this.dto.fromChartOfAccountId, "ChartOfAccount")
    //   .pipe(
    //     finalize(() => {}),
    //     catchError((error) => {
    //       this.messageService.add({
    //         severity: "error",
    //         summary: "Error",
    //         detail: error.error.error.message,
    //         life: 2000,
    //       });
    //       return throwError(error.error.error.message);
    //     })
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       if (
    //         response.hasSubLedger === true &&
    //         !(
    //           this.dto.fromSupplierId ||
    //           this.dto.toSupplierId ||
    //           this.dto.fromClientId ||
    //           this.dto.toClientId
    //         )
    //       ) {
    //         this.messageService.add({
    //           severity: "error",
    //           detail: "Please Select Subledger against Chart of Account",
    //           life: 2000,
    //         });
    //         return;
    //       }

    //     },
    //   });

    this.financeService
      .getAll(this.target, this.dto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            new Error(error.error.error.message || "An unknown error occurred")
          );
        })
      )
      .subscribe((response) => {
        this.tableData = response.items;
        this.count = response.totalCount;
        this.dialogVisibility = false;
      });
  }
  downloadCSVFile() {
    const data = this.tableData;

    if (!data || data.length === 0) {
      return;
    }

    let totalDebit = 0;
    let totalCredit = 0;

    data.forEach((row: any) => {
      totalDebit += row.debit || 0;
      totalCredit += row.credit || 0;
    });

    const totalsRow = {
      date: "",
      description: "Totals",
      debit: totalDebit,
      credit: totalCredit,
    };

    const updatedData = [...data, totalsRow];
    const csv = Papa.unparse(updatedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadExcelFile() {
    const data = this.tableData;

    if (!data || data.length === 0) {
      return;
    }

    let totalDebit = 0;
    let totalCredit = 0;

    // Calculate totals
    data.forEach((row: any) => {
      totalDebit += row.debit || 0;
      totalCredit += row.credit || 0;
    });

    // Prepare the totals row
    const totalsRow = {
      date: "",
      description: "Totals",
      debit: totalDebit,
      credit: totalCredit,
    };

    // Add the totals row to the data
    const updatedData = [...data, totalsRow];

    // Create a worksheet from the updated data
    const ws = XLSX.utils.json_to_sheet(updatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "General Ledger");

    // Save the Excel file
    XLSX.writeFile(wb, "data.xlsx");
  }

  // downloadPDFFile() {
  //   const doc = new jsPDF();

  //   // Title
  //   doc.setFontSize(18);
  //   doc.text('General Ledger Report', 10, 10);

  //   // Move down for the date range
  //   doc.setFontSize(12);

  //   // Prepare data for table
  //   const columns = [
  //     'Location',
  //     'From Account',
  //     'To Account',
  //     'From Project',
  //     'To Project',
  //     'From Cost Center',
  //     'To Cost Center',
  //     'From Supplier',
  //     'To Supplier',
  //     'Debit',
  //     'Credit'
  //   ];

  //   const rows: any[] = [];
  //   let totalDebit = 0;
  //   let totalCredit = 0;

  //   // Populate rows and calculate totals
  //   this.tableData.forEach(item => {
  //     totalDebit += item.debit || 0;
  //     totalCredit += item.credit || 0;

  //     rows.push([
  //       item.locationName || 'N/A',
  //       item.fromChartOfAccountName || 'N/A',
  //       item.toChartOfAccountName || 'N/A',
  //       item.fromProjectName || 'N/A',
  //       item.toProjectName || 'N/A',
  //       item.fromCostCenterName || 'N/A',
  //       item.toCostCenterName || 'N/A',
  //       item.fromSupplierName || 'N/A',
  //       item.toSupplierName || 'N/A',
  //       item.debit || 0,
  //       item.credit || 0
  //     ]);
  //   });

  //   // Add the totals row
  //   const totalsRow = [
  //     'Totals',
  //     totalDebit, // Total Debit
  //     totalCredit // Total Credit
  //   ];

  //   // Add column titles and data to the PDF
  //   doc.autoTable(columns, [...rows, totalsRow], {
  //     startY: 30, // Y position to start drawing the table
  //     styles: { overflow: 'linebreak' },
  //     columnStyles: {
  //       0: { cellWidth: 30 },
  //       1: { cellWidth: 30 },
  //       2: { cellWidth: 30 },
  //       3: { cellWidth: 30 },
  //       4: { cellWidth: 30 },
  //       5: { cellWidth: 30 },
  //       6: { cellWidth: 30 },
  //       7: { cellWidth: 30 },
  //       8: { cellWidth: 30 },
  //       9: { cellWidth: 30 },
  //       10: { cellWidth: 30 },
  //     }
  //   });

  //   // Save the PDF
  //   doc.save('general_ledger_report.pdf');
  // }

  downloadPDFFile() {
    debugger;
    const data = this.tableData;

    // if (!data?.length || data?.length === 0) {
    //   return;
    // }
    this.financeService
      .getGeneralLedgerReportFilters(
        "PdfReport",
        this.dto.startDate,
        this.dto.endDate,
        this.dto.fromSupplierId,
        this.dto.toSupplierId,
        this.dto.fromClientId,
        this.dto.toClientId,
        this.dto.fromPattyId,
        this.dto.toPattyId,
        this.dto.fromChartOfAccountId,
        this.dto.toChartOfAccountId,
        this.dto.fromProjectId,
        this.dto.toProjectId,
        this.dto.fromCostCenterId,
        this.dto.toCostCenterId,
        this.dto.locationId,
        this.dto.fromEmployeeId,
        this.dto.toEmployeeId
        // this.dto.regionId
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            () =>
              new Error(
                error.error.error.message || "An unknown error occurred"
              )
          );
        })
      )
      .subscribe((response) => {
        const pdfLink = response;
        const fullPdfLink = `${newBaseUrl}${pdfLink}`;
        window.open(fullPdfLink, "_blank");
      });
  }

  exportFiles(format: string) {
    this.showExportOptions = false; // Close the dropdown after selection

    switch (format) {
      case "csv":
        this.downloadCSVFile();
        break;
      case "xlsx":
        this.downloadExcelFile(); // Implement this function for Excel
        break;
      case "pdf":
        this.downloadPDFFile(); // Implement this function for PDF
        break;
      default:
        console.error("Unsupported format:", format);
    }
  }

  // getTotalDebit(): number {
  //   return this.tableData.reduce(
  //     (sum, item) => sum + (Number(item.debit) || 0),
  //     0
  //   );
  // }

  // getTotalCredit(): number {
  //   return this.tableData.reduce(
  //     (sum, item) => sum + (Number(item.credit) || 0),
  //     0
  //   );
  // }

  getTotalDebit(): string {
    const total = this.tableData.reduce(
      (sum, item) => sum + (Number(item.debit) || 0),
      0
    );
    return total.toFixed(2); // Ensures two decimal places
  }

  getTotalCredit(): string {
    const total = this.tableData.reduce(
      (sum, item) => sum + (Number(item.credit) || 0),
      0
    );
    return total.toFixed(2); // Ensures two decimal places
  }

  downloadReportsOnClick(item: any) {
    debugger;
    switch (item.voucherPrefix) {
      case "RMI":
        this.pdfReport(
          item.linkedDocumentId,
          "PdfReport/GenerateVehicleInvoiceReport"
        );
        break;
      case "SIV":
        this.pdfReport(
          item.linkedDocumentId,
          "PdfReport/GenerateServiceInvoiceReport"
        );
        break;
      case "PUI":
        this.pdfReport(
          item.linkedDocumentId,
          "PdfReport/GeneratePurchaseInvoiceReport"
        );
        break;
      case "MSS":
        this.pdfReport(
          item.linkedDocumentId,
          "PdfReport/GenerateMasterSalaryReport"
        );
        break;
      case "BP":
        this.pdfReport(
          item.linkedDocumentId,
          "PdfReport/GenerateBankPaymentReport"
        );
        break;
      default:
        alert("Invalid VTP");
    }
  }

  pdfReport(id: number, target) {
    debugger;
    this.financeService.downloadReportByClickGL(id, target).subscribe(
      (response: any) => {
        const pdfLink = response;
        const fullPdfLink = `${newBaseUrl}${pdfLink}`;
        window.open(fullPdfLink, "_blank");
      },
      (error) => {
        console.error("Error generating report:", error);
      }
    );
  }

  onPageChangeForGeneralLedger(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.skipCount = (this.currentPage - 1) * 10;
    this.getAll();
  }
  // checkChartOfAccountHasSubLedger() {
  //   debugger;
  //   this.financeService
  //     .getDataForEdit(this.dto.fromChartOfAccountId, "ChartOfAccount")
  //     .pipe(
  //       finalize(() => {}),
  //       catchError((error) => {
  //         debugger;
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error.error.message,
  //           life: 2000,
  //         });
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         if (response.hasSubLedger === true) {
  //           this.messageService.add({
  //             severity: "error",
  //             detail: "Please Select Subledger against Chart of Account",
  //             life: 2000,
  //           });
  //           return;
  //         }
  //       },
  //     });
  // }
}
