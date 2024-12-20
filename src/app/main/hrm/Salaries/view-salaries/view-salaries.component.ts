import { Component } from "@angular/core";
import { Table } from "primeng/table";
import { SalariesService } from "../../shared/services/salaries.service";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import { RestrictionDto } from "../../../budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../../../budget/shared/services/restriction.service";

import {
  GridApi,
  GridReadyEvent,
  ColDef,
  CellEditingStoppedEvent,
} from "ag-grid-community";
import { ViewSalariesDto } from "../../shared/DTOs/salaries-dto";
import * as moment from "moment";
import { jsPDF } from "jspdf";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-view-salaries",
  templateUrl: "./view-salaries.component.html",
})
export class ViewSalariesComponent {
  gridApi: GridApi<any>;
  setParms: any;
  locationDropdown: any[] = [];
  locationSelectedItem: any;

  constructor(
    private _salariesService: SalariesService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}

  viewSalariesDto: ViewSalariesDto = new ViewSalariesDto();
  restrictionDto: RestrictionDto = new RestrictionDto();

  parentDto: {
    voucherNumber: string;
    documentDate: Date;
    SalaryMonth: Date;
    StartDate: Date;
    EndDate: Date;
    locationId: number;
    locationName: string;
    employeeTypeId: number;
    employeeTypeName: string;
    paymentTypeId: number;
    paymentTypeName: string;
  };

  data = [];
  count: number = 0;
  currentPage: number = 1;
  view: boolean;
  salaryRecord: any;
  tableData: any;
  // Filters
  target: "EmployeeSalary";
  SalaryMonth: Date;
  today: Date = new Date();
  MinDate: Date = new Date();
  StartDate: Date;
  EndDate: Date;
  editMode: boolean;
  locationId: number;
  locationName: string;
  dto = {
    maxCount: 10,
    skipCount: 0,
  };
  employeeTypeId: number;
  employeeTypeName: string;
  paymentTypeId: number;
  paymentTypeName: string;
  displayModal: boolean;
  saving: boolean;
  generating: boolean;
  loading: boolean;
  voucherNumber: string;
  documentDate: Date;

  ngOnInit(): void {
    this.getSalaryPolicy();
    this.getAllSalaries();
    this.VoucherRestriction("MSS");
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
            return response.items.map((item: any) => ({
              id: item.id,
              name: item.name,
            }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }


  onDropdownChange(event: any, type: string){
    const value = event.value;
    switch (type) {
      case "Location":
        this.locationId = value.id;
        this.locationName = value.name;
        this.MakeVoucher();
        break;
      case "TypeOfEmployee":
        this.employeeTypeId = value.id;
        this.employeeTypeName = value.name;
        break;
      case "CurrentPaymentMode":
        this.paymentTypeId = value.id;
        this.paymentTypeName = value.name;
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  getAll() {
    debugger;
    this.generating = true;
    if (!this.StartDate || !this.EndDate) {
      this.messageService.add({
        severity: "error",
        detail: "Please Select Salary Date",
        life: 2000,
      });
      this.generating = false;
      return;
    }
    this._salariesService
      .getAll(
        this.SalaryMonth,
        this.StartDate,
        this.EndDate,
        this.employeeTypeId,
        this.paymentTypeId
      )
      .pipe(
        finalize(() => {
          this.generating = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (res) => {
          debugger;
          var response = this.ModifyResponse(res);
          this.colDefs = this.generateColDefs(response);
          this.data = this.FormatData(response);
          console.log(this.colDefs);
          console.log(this.data);
          debugger;
          this.count = this.data.length;
          this.generating = false;
        },
      });
  }

  getSalaryPolicy() {
    debugger;
    this._salariesService
      .getSalaryStucture()
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
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.salaryRecord = response.items[0];
        },
      });
  }

  ModifyResponse(data) {
    console.log("Modify", data);
    var tempArr = [];
    data.map((item) => {
      var tempObj = {
        ID: item.erpId,
        Name: item.employeeName,
        Currency: item.currencyName,
        TotalDays: item.totalDays,
        Absent: item.absent,
        RestDays: item.restDays,
        WorkDays: item.workingDays,
        leaves: item.leaves,
        GrossPay: item.grossPay,
        allowances: item.allowances,
        "Per Day Duty Hours": item.dutyHours,
        "OT Hrs(Manual)": item.overTimeManualHours,
        "OT Amt(Manual)": item.overTimeManualAmount,
        "OT Hrs(Auto)": item.overTimeAutoHours,
        "OT Amt(Auto)": item.overTimeAutoAmount,
        // 'Off Days': item.offDays,
        // 'Off Day Rate': item.offDayRate,
        // 'Off Day Amount': item.offDayAmount,
        "Wage Rate": item.wageRate,
        // Others: item.others,
        "Gross Payable": item.grossPayable,
        "Tax Ded": item.incomeTaxDeduction,
        "Loan Instal": item.loanInstallment,
        "Loan Bal": item.loanBalance,
        loans: item.loans,
        "LE Fund": item.leaveEncashmentFund,
        "EOBI Emp (%)": item.eobI_EmployeePercentage,
        "EOBI Emp Max": item.eobI_EmployeeMaxAmount,
        EOBI: item.eobI_EmployeeAmount,
        "EOBI Employer (%)": item.eobI_EmployerPercentage,
        "EOBI Employer Max": item.eobI_EmployerMaxAmount,
        "EOBI Employer Amt": item.eobI_EmployerAmount,
        "SS Emp (%)": item.sS_EmployeePercentage,
        "SS Emp Max": item.sS_EmployeeMaxAmount,
        "Social Security": item.sS_EmployeeAmount,
        "SS Employer (%)": item.sS_EmployerPercentage,
        "SS Employer Max": item.sS_EmployerMaxAmount,
        "SS Employer Amt": item.sS_EmployerAmount,
        "PF (%)": item.pF_Percentage,
        "PF Amt": item.pF_Amount,
        "PF Balance": item.pF_Balance,
        "Absent Ded": item.absentDeduction,
        "Total Ded": item.totalDeductions,
        "Net Payable": item.netPayable,
        Designation: item.designationName,
        Department: item.departmentName,
        CostCenter: item.costCenterName,
        Project: item.projectName,
        Location: item.locationName,
        Account: item.accountNumber,
        EmployeeType: item.employeeTypeName,
        PaymentMode: item.paymentModeName,
        BranchName: item.branchName,
        CNIC: item.cnic,
      };

      tempArr.push(tempObj);
    });
    return tempArr;
  }

  generateColDefs(rowData: any) {
    const columnDefs: ColDef[] = [];
    debugger;
    if (rowData.length > 0) {
      const firstRow = rowData[0];
      for (let key in firstRow) {
        if (key === "leaves") {
          for (let item in firstRow[key]) {
            const headerName = item.trim();
            columnDefs.push({
              headerName,
              field: `${item.trim()}`,
              width: 150,
              filter: "agTextColumnFilter",
            });
          }
        }
        // else if (key === 'autoOverTimeDescription') {
        //     for (let item in firstRow[key]) {
        //         const headerName = item.trim();
        //         columnDefs.push({ headerName, field: `${item.trim()}` });
        //     }
        // }
        // else if (key === 'autoOverTimeAmount') {
        //     for (let item in firstRow[key]) {
        //         const headerName = item.trim();
        //         columnDefs.push({ headerName, field: `${item.trim()}` });
        //     }
        // }
        else if (key === "loans") {
          for (let item in firstRow[key]) {
            const headerName = item.trim();
            columnDefs.push({
              headerName,
              field: `${item.trim()}`,
              width: 100,
              filter: "agTextColumnFilter",
            });
          }
        } else if (key === "allowances") {
          for (let item in firstRow[key]) {
            const headerName = item.trim();
            columnDefs.push({
              headerName,
              field: `${item.trim()}`,
              width: 100,
              filter: "agTextColumnFilter",
            });
          }
        } else {
          columnDefs.push({
            headerName: key,
            field: key,
            width: 150,
            filter: this.getFilterType(key, firstRow[key]),
          });
        }
      }
    }
    return columnDefs;
  }
  getFilterType(key: string, value: any): string {
    if (typeof value === "number") {
      return "agNumberColumnFilter";
    } else if (typeof value === "string") {
      return "agTextColumnFilter";
    } else if (value instanceof Date) {
      return "agDateColumnFilter";
    } else {
      return "agTextColumnFilter";
    }
  }
  FormatData(data: any) {
    return data.map((item) => {
      const formattedItem: any = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          if (typeof value === "object") {
            for (const subKey in value) {
              if (Object.prototype.hasOwnProperty.call(value, subKey)) {
                formattedItem[`${subKey.trim()}`] = value[subKey];
              }
            }
          } else {
            formattedItem[key] = value;
          }
        }
      }
      return formattedItem;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    debugger;
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  // onPageChange(event: any) {
  //   debugger;
  //   this.maxCount = event.rows;
  //   this.currentPage = event.page + 1;
  //   this._salariesService
  //     .getAll()
  //     .pipe(
  //       finalize(() => { }),
  //       catchError((error) => {
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error.error.message,
  //         });
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         debugger;
  //         this.data = response;
  //         this.count = this.data.length;
  //       },
  //     });
  // }

  Search() {
    this.getAll();
  }

  Show(id?: number) {
    debugger;
    if (id) {
      this._salariesService
        .getDataForEdit(id, "EmployeeSalary")
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
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (res) => {
            debugger;
            var response = this.ModifyResponse(res.salaryDetails);
            this.colDefs = this.generateColDefs(response);
            this.data = this.FormatData(response);
            console.log(this.colDefs);

            this.voucherNumber = res.voucherNumber;
            this.documentDate = new Date(res.documentDate);
            this.locationId = res.creatorUserId;
            this.SalaryMonth = res?.SalaryMonth;
            this.StartDate = res?.StartDate;
            this.EndDate = res?.EndDate;

            this.locationName = res?.locationName;
            this.employeeTypeId = res?.employeeTypeId;
            this.employeeTypeName = res?.employeeTypeName;
            this.paymentTypeId = res?.paymentTypeId;
            this.paymentTypeName = res?.paymentTypeName;

            if (this.data && this.data.length > 0) {
              // Open modal after data is fetched
              this.displayModal = true;
            }
            debugger;
          },
        });
      this.displayModal = true;
      setInterval(() => {
        this.updateFooterTotals(); // Calculate totals after setting rowData
      }, 500);
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      this.getDefaultLocation("Location", "locationId", "locationName", "");
      this.clearFilters();
      this.displayModal = true;
      this.documentDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  clearFilters() {
    this.SalaryMonth = null;
    this.StartDate = null;
    this.EndDate = null;
    this.employeeTypeId = null;
    this.employeeTypeName = null;
    this.paymentTypeId = null;
    this.paymentTypeName = null;
    this.data = [];
  }

  colDefs: ColDef[] = [];
  pinnedBottomRowData: any[] = [
    {
      basicPay: 0,
      grossPay: 0,
      voucherNumber: "Total",
    },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.data = [];
    this.gridApi.setPinnedBottomRowData([]); // Initialize pinned bottom row
  }
  onFilterChanged() {
    // this.updateFooterTotals();
  }
  // updateFooterTotals() {
  //   let EOBI_Employer_Amt = 0;
  //   let GrossPay = 0;

  //   this.gridApi.forEachNodeAfterFilter((node) => {
  //     EOBI_Employer_Amt += node.data["EOBI Employer Amt"] || 0;
  //     GrossPay += node.data.GrossPay || 0;
  //   });
  //   debugger;
  //   this.pinnedBottomRowData = [
  //     {
  //       "EOBI Employer Amt": EOBI_Employer_Amt,
  //       GrossPay: GrossPay,
  //     },
  //   ];
  //   this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
  // }

  updateFooterTotals() {
    // Extract keys from the first row of data, assuming all rows have the same structure
    const firstRowData = this.gridApi.getDisplayedRowAtIndex(0)?.data || {};
    const keysToSum = Object.keys(firstRowData).filter(
      (key) => typeof firstRowData[key] === "number"
    );

    // Initialize an object to store sums for each key
    const totals: any = {};

    keysToSum.forEach((key) => {
      totals[key] = 0; // Initialize totals for each key
    });

    // Iterate over filtered rows to calculate totals
    this.gridApi.forEachNodeAfterFilter((node) => {
      keysToSum.forEach((key) => {
        totals[key] += node.data[key] || 0; // Sum up values for each key
      });
    });

    // Define columns to exclude from the totals
    const columnsToExclude = ["TotalDays", "Absent", "RestDays", "WorkDays"]; // Add any column you want to exclude

    // Remove unwanted columns from the totals object
    const filteredTotals = Object.keys(totals)
      .filter((key) => !columnsToExclude.includes(key))
      .reduce((acc, key) => {
        acc[key] = totals[key];
        return acc;
      }, {});

    // Create pinned bottom row data with filtered totals
    this.pinnedBottomRowData = [
      {
        ...filteredTotals, // Spread the filtered totals into the pinned row
        Name: "Total",
      },
    ];

    // Update the pinned bottom row in the grid
    this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
  }

  create() {
    this.saving = true;

    if (!this.data.length) {
      this.messageService.add({
        severity: "error",
        detail: "Salaries Not Generated Yet!",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.documentDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._salariesService
      .SaveSalary({
        voucherNumber: this.voucherNumber,
        documentDate: this.documentDate,
        startDate: this.StartDate,
        endDate: this.EndDate,
      })
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.getAllSalaries();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }
  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._salariesService
          .delete(id)
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
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.locationId = value.id;
        this.locationName = value.name;
        this.MakeVoucher();
        break;
      case "TypeOfEmployee":
        this.employeeTypeId = value.id;
        this.employeeTypeName = value.name;
        break;
      case "CurrentPaymentMode":
        this.paymentTypeId = value.id;
        this.paymentTypeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  DownloadCsv() {
    if (!this.data?.length || this.data?.length == 0) {
      return;
    }

    // Convert JSON to CSV
    const headers = Object.keys(this.data[0]);
    const csvRows = [headers.join(",")];

    for (const row of this.data) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create a link element and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Salary Sheet.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  DownloadPdf() {
    if (!this.data?.length || this.data?.length == 0) {
      return;
    }

    // Extract headers and rows
    const headers = Object.keys(this.data[0]);
    const body = [];

    // Adding table headers with rotated text
    body.push(
      headers.map((header) => ({
        text: header,
        style: "tableHeader",
        alignment: "center",
        margin: [0, 2], // Minimize margin to save space
        bold: true,
        rotation: 90, // Rotate header text to save horizontal space
      }))
    );

    // Adding table data
    for (const row of this.data) {
      const rowData = headers.map((header) => row[header]?.toString() || "");
      body.push(rowData);
    }

    // Define the PDF document structure
    const docDefinition = {
      content: [
        { text: "Salary Data Report", style: "header" }, // Title
        {
          table: {
            headerRows: 1,
            widths: headers.map(() => 15), // Further reduce column width to 15
            body: body, // Table data (headers + rows)
          },
          layout: "lightHorizontalLines", // Optional: Add table border style
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        tableHeader: {
          fontSize: 4, // Further reduce the font size of headers to fit more columns
          bold: true,
        },
        tableData: {
          fontSize: 3, // Further reduce the font size of table data
        },
      },
      pageSize: "A1", // Use larger page size (A1) to accommodate more columns
      pageOrientation: "landscape", // Switch to landscape orientation for more horizontal space
      defaultStyle: {
        fontSize: 4, // General font size for the whole document
      },
    };

    // Generate and download the PDF
    pdfMake.createPdf(docDefinition).download("Salary Sheet.pdf");
  }

  SalaryMonthChange(value: Date) {
    debugger;
    this.SalaryMonth = value;

    const year = value.getFullYear();
    const month = value.getMonth();

    this.StartDate = new Date(year, month, 1);

    this.EndDate = new Date(year, month + 1, 0);
  }

  getAllSalaries() {
    debugger;
    this.generating = true;
    this._salariesService
      .getAllSalaries()
      .pipe(
        finalize(() => {
          this.generating = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (res) => {
          debugger;
          this.tableData = res;
        },
      });
  }

  Approve(id: number) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._salariesService
          .Approve(id)
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
              return throwError(error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              this.messageService.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Approved Successfully",
                life: 2000,
              });
              this.getAllSalaries();
            },
          });
      },
    });
  }

  UnApprove(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._salariesService
          .UpApprove(id)
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
              return throwError(error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              this.messageService.add({
                severity: "success",
                summary: "Confirmed",
                detail: "UnApproved Successfully",
                life: 2000,
              });
              this.getAllSalaries();
            },
          });
      },
    });
  }

  dispatch(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._salariesService
          .dispatch(id)
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
              return throwError(error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger;
              this.messageService.add({
                severity: "success",
                summary: "Confirmed",
                detail: "Dispatch Successfully",
                life: 2000,
              });
              this.getAllSalaries();
            },
          });
      },
    });
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.documentDate = value;
    }
    if (this.locationId && this.documentDate) {
      this.voucherNumber =
        "MSS-" +
        moment(this.documentDate).format("YYYY-MM-DD") +
        "-" +
        this.locationId;
    }
  }
  formatDocumentDate(date: string): string {
    return moment(date).format("YYYY/MM");
  }

  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
      },
    });
  }

  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.Show(id);
    this.MinDate = null;
  }
  edit(id?: number) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.view = false;
    this.Show(id);
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  downloadSalariesReport(id: number) {
    debugger;
    this._salariesService
      .downloadSalariesReport(id, "GenerateMasterSalaryReport")
      .subscribe(
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

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * this.dto.maxCount;
    this._salariesService.getAllRecord(this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._salariesService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.locationName = response.items[0].name;
          this.locationId = response.items[0].id;
          this.MakeVoucher();
        },
      });
  }
  VoucherRestriction(prefix: string) {
    this._restrictionService
      .getVoucherRestriction(prefix)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.restrictionDto = mapRestrictionDto(response.items[0]);
          console.log(this.restrictionDto);
        },
      });
  }
}
