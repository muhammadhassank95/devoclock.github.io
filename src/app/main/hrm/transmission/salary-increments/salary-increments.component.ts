import { Component, ViewChild } from "@angular/core";
import { FileUpload } from "primeng/fileupload"; // Import the FileUpload class
import { EmpSalaryInc, NewSalaryDto } from "../../shared/DTOs/emp-salary-inc";
import { EmpSalaryIncService } from "../../shared/services/emp-salary-inc.service";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
@Component({
  selector: "app-salary-increments",
  templateUrl: "./salary-increments.component.html",
})
export class SalaryIncrementsComponent {
  @ViewChild("fileUpload") fileUpload: FileUpload;
  empSalaryIncDto: EmpSalaryInc = new EmpSalaryInc();
  newSalaryDto: NewSalaryDto = new NewSalaryDto();
  setParms: any;
  newData: any;
  DialogVisibility: boolean;
  salaryBulkModel: boolean;
  loading: boolean = false;
  protected gridColumnApi;
  protected rowSelection;
  protected gridApi;
  rowData: any;
  rowCount: number;
  basicpay = "basic pay";
  allowances = [];
  allowanceMappings = [];
  grossSalary: string;
  basicSalary: string;

  currentSallary: any;
  currentGrossSallary: any;
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;

  constructor(
    private _empSalaryIncService: EmpSalaryIncService,
    private messageService: MessageService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService,
    private confirmationService?: ConfirmationService
  ) {
    this.newSalaryDto.grossSalary = 0;
    this.newSalaryDto.basicPay = 0;
    this.newSalaryDto.incrementDetails = [];
    this.getAllAllowance();
  }

  ngOnInit(): void{
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
  }

  columnDefs = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      resizeable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: 'Dated',
    //     editable: false,
    //     field: "applicableFrom",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    {
      headerName: "Dated",
      field: "applicableFrom",
      resizable: true,
      suppressSizeToFit: true,
      cellRenderer: this.dateFormatter, // Use the custom formatter
      editable: false,
    },
    {
      headerName: "Gross Salary",
      editable: false,
      field: "grossPay",
      resizable: true,
      suppressSizeToFit: true,
      type: "numericColumn",
    },
    {
      headerName: "Allowance",
      editable: false,
      field: "allowanceBtn",
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
      cellRenderer: (params) => {
        const button = document.createElement("button");
        button.className = "btn btn-primary blue btn-sm";
        button.type = "button";
        button.textContent = "Show";
        button.style.width = "100%";
        button.style.textAlign = "center";
        return button;
      },
    },
  ];

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
      case "Employee":
        this.empSalaryIncDto.EmployeeErpId = value.id;
        this.onFocusLostGetData();
        this.getMasterAllowances();
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  openAllowanceModel() {
    debugger;
    this.DialogVisibility = true;
  }
  openSalaryBulkModel() {
    debugger;
    this.salaryBulkModel = true;
  }
  async myUploader(event) {
    // event.files == files to upload

    this.loading = true;
    // Await the latest allowances
    let data = await this.getLatestAllowances();
    this.allowanceMappings = data.items;

    // Now you have the allowance mappings, and you can proceed with the file upload logic.
    // You can process the uploaded files (event.files) and use the allowanceMappings for further processing.

    console.log("Uploaded files: ", event.files);
    console.log("Allowance mappings: ", this.allowanceMappings);

    debugger;
    const file = event.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Parsed CSV Data:", results.data);

          // console.log(this.csvToJson(results.data));
          var obj = this.csvToJson(results.data);
          debugger;
          this._empSalaryIncService
            .BulkAddSalaryIncrement(obj)
            .pipe(
              finalize(() => {}),
              catchError((error) => {
                this.messageService.add({
                  severity: "error",
                  detail: error.error.error.message,
                  life: 2000,
                });
                this.loading = false;
                return throwError(error.error.error.message);
              })
            )
            .subscribe(() => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "File uploaded successfully",
                life: 1000,
              });
              this.salaryBulkModel = false;
              this.loading = false;
              this.fileUpload.clear();
              this.onFocusLostGetData();
            });
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    } else if (fileExtension === "xlsx") {
      this.handleXLSX(file);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Supported file formats: xlsx,csv",
        life: 2000,
      });
      this.loading = false;
      console.error("Unsupported file type");
      // this.fileInput.nativeElement.value = "";
    }
    // Continue processing the files or mapping them as needed...
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
    };
    reader.onerror = (error) => {
      console.error("Error reading XLSX file:", error);
    };
    reader.readAsArrayBuffer(file);
  }
  async csvToJson(csvData) {
    const jsonResult = [];
    csvData
      .filter((item: any) => item.ErpId)
      .forEach((row) => {
        const allowances = [];

        this.allowanceMappings.forEach((allowance) => {
          if (row[allowance.name] !== undefined) {
            allowances.push({
              allowanceId: allowance.id,
              allowanceName: allowance.name,
              amount: parseFloat(row[allowance.name]) || 0,
            });
          }
        });

        if (row.ErpId != undefined) {
          jsonResult.push({
            id: 0, // Can be generated dynamically if needed
            isActive: row.isActive,
            erpId: row.ErpId,
            applicableFrom: new Date(row.applicableFrom).toISOString(),
            basicPay: parseFloat(row["BASIC PAY"]) || 0,
            grossPay: parseFloat(row["GROSS PAY"]) || 0,
            allowances: allowances,
          });
        }
      });

    return jsonResult;
  }
  async getLatestAllowances() {
    return this._empSalaryIncService
      .getAllAllowance()
      .pipe(
        finalize(() => {}), // Add any final cleanup logic if necessary
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            detail: error.error.error.message,
            life: 2000,
          });

          return throwError(error.error.error.message);
        })
      )
      .toPromise(); // Convert the observable into a promise for async/await usage
  }

  async downloadTemplate() {
    try {
      // Await the allowances data from getLatestAllowances
      const result = await this.getLatestAllowances();

      // Sort and map allowances
      const sortedAllowances = this.sortAllowancesDescending(result.items);

      // Create CSV headers, including the allowances as columns
      let headers = ["ErpId", "applicableFrom", "isActive", "GROSS PAY"];

      sortedAllowances.forEach((item) => {
        headers.push(item.name);
      });

      // Create CSV rows
      const rows = [headers.join(",")]; // Join headers with a comma to form the first row of the CSV

      // You can append additional rows here if necessary, e.g., example row data or empty rows
      // For now, only headers will be in the template CSV

      const csvContent = rows.join("\n"); // Join rows with a newline

      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", "SalaryBulkTemplate.csv");
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the object URL after download
    } catch (error) {
      // Handle any errors that occur during the allowance fetching or template creation
      console.error("Error downloading the template:", error);
    }
  }

  getAllAllowance() {
    this._empSalaryIncService
      .getAllAllowance()
      .pipe(
        finalize(() => {}),

        catchError((error) => {
          this.messageService.add({
            severity: "error",
            detail: error.error.error.message,
            life: 2000,
          });

          return throwError(error.error.error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.newSalaryDto.incrementDetails = this.sortAllowancesDescending(
          result.items
        );
      });
  }
  sortAllowancesDescending(allowanceDetails: any[]): any[] {
    return allowanceDetails.slice().sort((a, b) => b.percentage - a.percentage);
  }
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Employee":
        this.empSalaryIncDto.EmployeeErpId = value.id;
        this.onFocusLostGetData();
        this.getMasterAllowances();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  dateFormatter(params) {
    // Check if the value is present
    if (params.value) {
      // Create a Date object from the value
      const date = new Date(params.value);
      // Format the date to a readable format (e.g., YYYY-MM-DD)
      return date.toISOString().split("T")[0];
    }
    return "";
  }

  calculateSalary() {
    debugger;
    var sumOfAllownce = 0;

    this.newSalaryDto.incrementDetails.map((item) => {
      if (item.name.toLowerCase() === this.basicpay) {
        this.newSalaryDto.basicPay = +(
          (this.newSalaryDto.grossSalary * item.percentage) /
          100
        ).toFixed(2);
        item.value = this.newSalaryDto.basicPay;
      }
    });
    this.newSalaryDto.incrementDetails.map((item) => {
      if (item.name.toLowerCase() !== this.basicpay) {
        if (item.percentage) {
          item.value = +(
            (this.newSalaryDto.basicPay * item.percentage) /
            100
          ).toFixed(2);
        }
      }
    });

    this.newSalaryDto.incrementDetails.forEach((item) => {
      debugger;
      if (item.percentage === 0) {
        sumOfAllownce +=
          item.value !== undefined && item.value !== null ? item.value : 0;
      }
    });

    this.newSalaryDto.newGrossSalary =
      this.newSalaryDto.grossSalary + sumOfAllownce;
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "allowanceBtn":
        this.setParms = params.data.allowances;
        this.openAllowanceModel();
        break;
      default:
        break;
    }
  }

  onGridReady(params) {
    debugger;
    this.rowData = [];
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowSelection = "multiple";
  }

  clear() {
    this.empSalaryIncDto.EmployeeErpId = null;
    this.empSalaryIncDto.applicableFromDate = null;
  }

  save() {
    debugger;
    if (!this.empSalaryIncDto.EmployeeErpId) {
      this.messageService.add({
        severity: "error",
        detail: "Employee Id is Required",
        life: 2000,
      });
      return;
    }
    if (!this.empSalaryIncDto.applicableFromDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      return;
    }
    if (!this.newSalaryDto.grossSalary) {
      this.messageService.add({
        severity: "error",
        detail: "Gross Salary is Required",
        life: 2000,
      });
      return;
    }
    if (!this.newSalaryDto.newGrossSalary) {
      this.messageService.add({
        severity: "error",
        detail: "New Gross Salary is Required",
        life: 2000,
      });
      return;
    }
    if (!this.newSalaryDto.basicPay) {
      this.messageService.add({
        severity: "error",
        detail: "Basic Pay is Required",
        life: 2000,
      });
      return;
    }

    this.confirmationService.confirm({
      message: "Are you sure to Save?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: async () => {
        console.log(this.empSalaryIncDto);

        // Extract allowances from incrementDetails
        var allowances = this.newSalaryDto.incrementDetails.map((item) => ({
          allowanceId: item.id,
          allowanceName: item.name,
          amount: item.value,
        }));

        debugger;

        // Format the applicableFromDate
        const applicableFromDate = new Date(
          this.empSalaryIncDto.applicableFromDate
        );
        const formattedApplicableFromDate = applicableFromDate
          .toISOString()
          .split("T")[0];

        // Find the basic pay allowance
        var basicPay = 0;
        for (let allowance of allowances) {
          if (allowance.allowanceName.includes("BASIC PAY")) {
            basicPay = allowance.amount;
            break;
          }
        }

        debugger;

        // Prepare the newData object
        var newData = {
          erpId: this.empSalaryIncDto.EmployeeErpId,
          applicableFrom: formattedApplicableFromDate,
          grossPay: this.newSalaryDto.newGrossSalary,
          basicPay: basicPay,
          allowances: allowances,
          id: 0,
        };

        debugger;

        // Call the create service method
        this._empSalaryIncService
          .create(newData)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                detail: error.error.error.message,
                life: 2000,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe(() => {
            this.messageService.add({
              severity: "info",
              detail: "Saved Successfully",
              life: 2000,
            });
            this.onFocusLostGetData();
          });
      },
    });
  }

  onFocusLostGetData() {
    debugger;
    console.log(this.empSalaryIncDto.EmployeeErpId);
    if (this.empSalaryIncDto.EmployeeErpId) {
      this._empSalaryIncService
        .getEmployeeSalaryHistory(this.empSalaryIncDto.EmployeeErpId)
        .pipe(
          finalize(() => {}),

          catchError((error) => {
            this.messageService.add({
              severity: "error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe((result) => {
          this.rowData = result;
          debugger;
          this.currentSallary = result.slice(-1)[0];
          this.currentGrossSallary = this.currentSallary.grossPay;

          this.rowCount = this.rowData.length;
        });
    }

    // get allowances
  }

  getMasterAllowances() {
    debugger;
    if (this.empSalaryIncDto.EmployeeErpId) {
      this._empSalaryIncService
        .getMasterAllowance(this.empSalaryIncDto.EmployeeErpId)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe((result) => {
          debugger;
          this.allowances = result.allowances;
          this.grossSalary = result.grossPay;
          this.basicSalary = result.basicPay;
        });
    }
  }
}
