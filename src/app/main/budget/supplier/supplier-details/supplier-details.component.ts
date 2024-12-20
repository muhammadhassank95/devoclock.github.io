import { Component, ViewChild } from "@angular/core";
import { BudgetService } from "../../shared/services/budget.service";
import { SupplierDetails } from "../../shared/Dtos/supplier-details";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Table } from "primeng/table";
import * as XLSX from "xlsx";
import * as Papa from "papaparse";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
@Component({
  selector: "app-supplier-details",
  templateUrl: "./supplier-details.component.html",
})
export class SupplierDetailsComponent {
  // supplierDetailDto: SupplierDetails = new SupplierDetails();
  editMode: boolean;
  displayModal: boolean;
  bulkModel: boolean = false;
  loading: boolean = false;
  target: string = "ChartOfAccountSubLedger";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 50;
  saving: boolean;
  showSupplierDetails = false;
  dataForEdit: any;
  employeeErpId: number;
  supplierFrom: FormGroup;
  cityDropdown: any[] = [];
  citySelectedItem: any;
  provinceDropdown: any[] = [];
  provinceSelectedItem: any;
  countryDropdown: any[] = [];
  countrySelectedItem: any;
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;
  vendorTypeDropdown: any[] = [];
  vendorTypeSelectedItem: any;
  taxSectionDropdown: any[] = [];
  taxSectionSelectedItem: any;
  chartOfAccountDropdown: any[] = [];
  chartOfAccountSelectedItem: any;
  @ViewChild("fileInput") fileInput: any;
  constructor(
    private fb: FormBuilder,
    private _budgetService: BudgetService,
    private msgService: MessageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    this.supplierFrom = this.fb.group({
      title: ["", Validators.required],
      shortName: ["", Validators.required],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      city: new FormControl({}, Validators.required),
      // cityId: [null, [Validators.required]],
      // cityName: [""],
      province: new FormControl({}, Validators.required),
      // provinceId: [null, [Validators.required]],
      // provinceName: [""],
      country: new FormControl({}, Validators.required),
      // countryId: [null],
      // countryName: [""],
      gstRate: [""],
      pocName: [""],
      pocNumber: [""],
      faxNumber: [""],
      ntn: [""],
      stn: [""],
      cnic: ["", [Validators.required]],
      email: ["", [Validators.email]],
      employee: new FormControl({}, Validators.required),
      // employeeId: [null],
      // employeeName: [""],
      vendorType: new FormControl({}, Validators.required),
      // vendorTypeId: [null, [Validators.required]],
      // vendorTypeName: [""],
      taxSection: new FormControl({}, Validators.required),
      // taxSectionId: [null],
      // taxSectionName: [""],
      tax: [""],
      isActive: [true],
      chartOfAccount: new FormControl({}, Validators.required),
      // chartOfAccountId: [null, [Validators.required]],
      // chartOfAccountName: [""],
      showSerialNumber: "",
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.fetchDropdownData('City').subscribe((items) => (this.cityDropdown = items));
    this.fetchDropdownData('Province').subscribe((items) => (this.provinceDropdown = items));
    this.fetchDropdownData('Country').subscribe((items) => (this.countryDropdown = items));
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
    this.fetchDropdownData('VendorType').subscribe((items) => (this.vendorTypeDropdown = items));
    this.fetchDropdownData('TaxSection').subscribe((items) => (this.taxSectionDropdown = items));
    this.fetchDropdownData('ChartOfAccount').subscribe((items) => (this.chartOfAccountDropdown = items));
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

  onDropdownChange(event: any, type: any){
    const value = event.value;
    switch (type) {
      case "Employee":
        debugger;
        this.supplierFrom.patchValue({
          employeeId: value?.additional,
          employeeName: value.name,
        });
        this.employeeErpId = value.id;
        break;
      case "VendorType":
        this.supplierFrom.patchValue({
          vendorTypeId: +value.id,
          vendorTypeName: value.name,
        });
        break;
      case "City":
        this.supplierFrom.patchValue({
          cityId: +value.id,
          cityName: value.name,
        });
        break;
      case "Province":
        this.supplierFrom.patchValue({
          provinceId: +value.id,
          provinceName: value.name,
        });
        break;
      case "Country":
        this.supplierFrom.patchValue({
          countryId: +value.id,
          countryName: value.name,
        });
        break;
      case "TaxSection":
        this.supplierFrom.patchValue({
          taxSectionId: +value?.id,
          taxSectionName: value?.name,
        });
        break;
      case "ChartOfAccount":
        this.supplierFrom.patchValue({
          chartOfAccountId: +value?.id.split("/")[1],
          chartOfAccountName: value?.name,
          showSerialNumber: value?.id.split("/")[1],
        });
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Employee":
        debugger;
        this.supplierFrom.patchValue({
          employeeId: value?.additional,
          employeeName: value.name,
        });
        this.employeeErpId = value.id;
        break;
      case "VendorType":
        this.supplierFrom.patchValue({
          vendorTypeId: +value.id,
          vendorTypeName: value.name,
        });
        break;
      case "City":
        this.supplierFrom.patchValue({
          cityId: +value.id,
          cityName: value.name,
        });
        break;
      case "Province":
        this.supplierFrom.patchValue({
          provinceId: +value.id,
          provinceName: value.name,
        });
        break;
      case "Country":
        this.supplierFrom.patchValue({
          countryId: +value.id,
          countryName: value.name,
        });
        break;
      case "TaxSection":
        this.supplierFrom.patchValue({
          taxSectionId: +value?.id,
          taxSectionName: value?.name,
        });
        break;
      case "ChartOfAccount":
        this.supplierFrom.patchValue({
          chartOfAccountId: +value?.id.split("/")[0],
          chartOfAccountName: value?.name,
          showSerialNumber: value?.id.split("/")[1],
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount: number = this.skipCount, maxCount: number = this.maxCount) {
    this._budgetService
      .getAll(this.target, skipCount, maxCount)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.tableData = response.items;
          this.count = response.totalCount;
        },
      });
  }
  show(id?: number) {
    if (id) {
      this.editMode = true;
      this._budgetService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            debugger;
            this.msgService.add({
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
            this.dataForEdit = response;
            let objCity = {
              id: response.cityId,
              name: response.cityName,
            }
            let objProvince = {
              id: response.provinceId,
              name: response.provinceName,
            }
            let objCountry = {
              id: response.countryId,
              name: response.countryName,
            }
            let objVendorType = {
              id: response.vendorTypeId,
              name: response.vendorTypeName,
            }
            let objEmployee = {
              id: response.employeeId,
              name: response.employeeName,
            }
            let objTaxSection = {
              id: response.taxSectionId,
              name: response.taxSectionName,
            }
            let objChartOfAccount = {
              id: response.chartOfAccountId,
              name: response.chartOfAccountName,
            }
            this.supplierFrom.patchValue({
              ...response,
              city: objCity,
              province: objProvince,
              country: objCountry,
              vendorType: objVendorType,
              employee: objEmployee,
              taxSection: objTaxSection,
              chartOfAccount: objChartOfAccount
            });
            // this.supplierFrom.get("title").setValue(this.dataForEdit.title);
            // this.supplierFrom
            //   .get("shortName")
            //   .setValue(this.dataForEdit.shortName);
            // this.supplierFrom.get("address").setValue(this.dataForEdit.address);
            // this.supplierFrom
            //   .get("phoneNumber")
            //   .setValue(this.dataForEdit.phoneNumber);
            // // this.supplierFrom.get("cityId").setValue(this.dataForEdit.cityId);
            // // this.supplierFrom
            // //   .get("cityName")
            // //   .setValue(this.dataForEdit.cityName);
            // this.supplierFrom
            //   .get("provinceId")
            //   .setValue(this.dataForEdit.provinceId);
            // this.supplierFrom
            //   .get("provinceName")
            //   .setValue(this.dataForEdit.provinceName);
            // this.supplierFrom
            //   .get("countryId")
            //   .setValue(this.dataForEdit.countryId);
            // this.supplierFrom
            //   .get("countryName")
            //   .setValue(this.dataForEdit.countryName);
            // this.supplierFrom.get("gstRate").setValue(this.dataForEdit.gstRate);
            // this.supplierFrom.get("pocName").setValue(this.dataForEdit.pocName);
            // this.supplierFrom
            //   .get("pocNumber")
            //   .setValue(this.dataForEdit.pocNumber);
            // this.supplierFrom
            //   .get("faxNumber")
            //   .setValue(this.dataForEdit.faxNumber);
            // this.supplierFrom.get("ntn").setValue(this.dataForEdit.ntn);
            // this.supplierFrom.get("stn").setValue(this.dataForEdit.stn);
            // this.supplierFrom.get("cnic").setValue(this.dataForEdit.cnic);
            // this.supplierFrom.get("email").setValue(this.dataForEdit.email);
            // this.supplierFrom
            //   .get("vendorTypeId")
            //   .setValue(this.dataForEdit.vendorTypeId);
            // this.supplierFrom
            //   .get("vendorTypeName")
            //   .setValue(this.dataForEdit.vendorTypeName);
            // this.supplierFrom
            //   .get("employeeId")
            //   .setValue(this.dataForEdit.employeeId);
            // this.supplierFrom
            //   .get("employeeName")
            //   .setValue(this.dataForEdit.employeeName);
            // this.supplierFrom
            //   .get("taxSectionId")
            //   .setValue(this.dataForEdit.taxSectionId);
            // this.supplierFrom
            //   .get("taxSectionName")
            //   .setValue(this.dataForEdit.taxSectionName);
            // this.supplierFrom.get("tax").setValue(this.dataForEdit.tax);
            // this.supplierFrom
            //   .get("chartOfAccountId")
            //   .setValue(this.dataForEdit.chartOfAccountId);
            // this.supplierFrom
            //   .get("chartOfAccountName")
            //   .setValue(this.dataForEdit.chartOfAccountName);
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.supplierFrom.reset();
      // this.supplierDetailDto.isActive = true;
    }
  }

  save() {
    this.saving = true;
    let obj = {
      ...this.supplierFrom.value,
      cityId : this.supplierFrom.value.city.id,
      cityName: this.supplierFrom.value.city.name,
      provinceId : this.supplierFrom.value.province.id,
      provinceName: this.supplierFrom.value.province.name,
      countryId : this.supplierFrom.value.country.id,
      countryName: this.supplierFrom.value.country.name,
      employeeId : this.supplierFrom.value.employee.id,
      employeeName: this.supplierFrom.value.employee.name,
      vendorTypeId : this.supplierFrom.value.vendorType.id,
      vendorTypeName: this.supplierFrom.value.vendorType.name,
      taxSectionId : this.supplierFrom.value.taxSection.id,
      taxSectionName: this.supplierFrom.value.taxSection.name,
      chartOfAccountId : this.supplierFrom.value.chartOfAccount.id,
      chartOfAccountName: this.supplierFrom.value.chartOfAccount.name,
    }
    if (!this.supplierFrom.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._budgetService
      .create(obj, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;
    let obj = {
      ...this.supplierFrom.value,
      cityId : this.supplierFrom.value.city.id,
      cityName: this.supplierFrom.value.city.name,
      provinceId : this.supplierFrom.value.province.id,
      provinceName: this.supplierFrom.value.province.name,
      countryId : this.supplierFrom.value.country.id,
      countryName: this.supplierFrom.value.country.name,
      employeeId : this.supplierFrom.value.employee.id,
      employeeName: this.supplierFrom.value.employee.name,
      vendorTypeId : this.supplierFrom.value.vendorType.id,
      vendorTypeName: this.supplierFrom.value.vendorType.name,
      taxSectionId : this.supplierFrom.value.taxSection.id,
      taxSectionName: this.supplierFrom.value.taxSection.name,
      chartOfAccountId : this.supplierFrom.value.chartOfAccount.id,
      chartOfAccountName: this.supplierFrom.value.chartOfAccount.name,
    }
    const updateData = {
      ...this.supplierFrom.value,
      id: this.dataForEdit.id,
    };
    this._budgetService
      .update(obj, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.getAll();
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
        this._budgetService
          .delete(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.msgService.add({
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
                this.msgService.add({
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
  isFieldInvalid(field: string): boolean {
    const control = this.supplierFrom.get(field);
    return control ? control.invalid && control.touched : false;
  }
  uploadFile(input: any): void {
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
  sendToApiSupplier(data: any): void {
    this.loading = true;
    // Define the required fields for validation
    const requiredFields = [
      "title",
      "shortName",
      "address",
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
      "tax",
    ];
    // Initialize error tracking
    let validationErrors: string[] = [];
    const finalArray = data
      .filter((item) =>
        Object.values(item).some((value: any) => value && value.trim() !== "")
      ) // Filter out empty rows
      .map((item, index) => {
        debugger;
        const missingFields = requiredFields.filter(
          (field) => !item[field] || item[field] === ""
        );
        if (missingFields.length > 0) {
          // Report missing fields with the row index (starting from 1)
          validationErrors.push(
            `Row ${index + 1}: Missing ${missingFields.join(", ")}`
          );
        }
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
    // Check if there are any validation errors
    if (validationErrors.length > 0) {
      this.messageService.add({
        severity: "error",
        summary: "Validation Errors",
        detail: validationErrors.join("\n"),
        life: 5000,
      });
      this.loading = false;
      return;
    }
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
        },
      });
    this.loading = false;
  }
  downloadCSVTemplate() {
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
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._budgetService
      .getAll(this.target, this.skipCount, this.maxCount, 0, false)
      .subscribe({
        next: (response) => {
          debugger;

          this.tableData = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
}
