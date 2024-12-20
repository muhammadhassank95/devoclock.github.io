import { Component, Injector } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { SubLedgerService } from "../shared/services/sub-ledger.service";
import { Table } from "primeng/table";
import { SubLedger } from "../shared/Dtos/sub-ledger";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-sub-ledger",
  templateUrl: "./sub-ledger.component.html",
})
export class SubLedgerComponent {
  subLedgerDto: SubLedger = new SubLedger();
  editMode: boolean;
  displayModal: boolean;
  displaytableModal: boolean;
  target: string = "ChartOfAccount";
  tableData: any;
  loading: boolean = false;
  SubledgertableData: any;
  SubledgerCount: number;
  subLedgerForm: FormGroup;
  count: number;
  coaForSubLedger = "";
  dataForEdit: any;
  employeeErpId: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  saving: boolean;
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
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  subLedgerTypes = [
    { label: "SUPPLIER", value: 0 },
    { label: "SUPPLIER_WITH_GST", value: 1 },
    { label: "IMPORTED_SUPPLIER", value: 2 },
    { label: "CLIENT", value: 3 },
    { label: "CLIENT_NON_REGULAR", value: 4 },
    { label: "ADVANCES_TO_EMPLOYEES", value: 5 },
    { label: "ADVANCE_AGAINST_FUEL_EXPENSE", value: 6 },
    { label: "LOAN_TO_EMPLOYEES", value: 7 },
    { label: "SECURITY_AGAINST_HOUSE_RENT", value: 8 },
    { label: "SECURITY_AGAINST_FUEL", value: 9 },
    { label: "BID_SECURITY", value: 10 },
    { label: "CASH_IN_HAND_REGIONS", value: 11 },
    { label: "TRADE_CREDITORS", value: 12 },
    { label: "TRADE_CREDITORS_GST", value: 13 },
    { label: "TRADE_CREDITORS_IMPORT", value: 14 },
    { label: "TRADE_CREDITORS_SERVICES", value: 15 },
    { label: "TRADE_CREDITORS_RENTAL_V", value: 16 },
    { label: "TRADE_CREDITORS_FUEL_CNG", value: 17 },
    { label: "TRADE_CREDITORS_HOUSE_RENT", value: 18 },
    { label: "GUARANTEE_MARGIN", value: 19 },
  ];

  DropdownTerms = [
    { label: "CASH", value: 0 },
    { label: "CREDIT", value: 1 },
  ];
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _subLedgerService: SubLedgerService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    this.subLedgerForm = this.fb.group({
      chartOfAccountSerialNumber: [""],
      chartOfAccountName: [""],
      title: ["", Validators.required],
      shortName: ["", Validators.required],
      address: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      cityId: [null, [Validators.required]],
      cityName: [""],
      provinceId: [null, [Validators.required]],
      provinceName: [""],
      countryId: [null],
      countryName: [""],
      gstRate: [""],
      pocName: ["", [Validators.required]],
      pocNumber: ["", [Validators.required]],
      faxNumber: [""],
      chequeTitle: ["", [Validators.required]],
      ntn: ["", [Validators.required]],
      stn: ["", [Validators.required]],
      cnic: ["", [Validators.required]],
      email: ["", [Validators.email]],
      employeeId: [null],
      employeeName: [""],
      vendorTypeId: [null, [Validators.required]],
      vendorTypeName: [""],
      taxSectionId: [null],
      taxSectionName: [""],
      tax: [""],
      COAserialNumber: [""],
      COAName: [""],
      numberOfDays: [""],
      SupplierAccountNumber: [""],
      isActive: [true],
      chartOfAccountId: [null, [Validators.required]],
      serialNumber: ["", [Validators.required]],
      chartOfAccountSubLedgerType: ["", [Validators.required]],
      locationId: "",
      locationName: "",
      terms: ["", [Validators.required]],
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

  getAll(
    skipCount: number = this.skipCount,
    maxCount: number = this.maxCount,
    HasSubLedger = true
  ) {
    this.loading = true;
    this._subLedgerService
      .getAll(this.target, skipCount, maxCount, true, true)
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
          this.loading = false;
        },
      });
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Employee":
        debugger;
        this.subLedgerForm.patchValue({
          employeeId: value?.additional,
          employeeName: value.name,
        });
        this.employeeErpId = value.id;
        break;
      case "VendorType":
        this.subLedgerForm.patchValue({
          vendorTypeId: +value.id,
          vendorTypeName: value.name,
        });
        break;
      case "Location":
        this.subLedgerForm.patchValue({
          locationId: value.id,
          locationName: value.name,
        });
        break;
      case "City":
        this.subLedgerForm.patchValue({
          cityId: +value.id,
          cityName: value.name,
        });
        break;
      case "Province":
        this.subLedgerForm.patchValue({
          provinceId: +value.id,
          provinceName: value.name,
        });
        break;
      case "Country":
        this.subLedgerForm.patchValue({
          countryId: +value.id,
          countryName: value.name,
        });
        break;
      case "TaxSection":
        this.subLedgerForm.patchValue({
          taxSectionId: +value?.id,
          taxSectionName: value?.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.subLedgerForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  view(COA_id: any) {
    debugger;
    this.coaForSubLedger = COA_id;
    this.displaytableModal = false;
    this.loading = true;
    this._subLedgerService
      .getAllSupplier(
        "ChartOfAccountSubLedger",
        (this.skipCount = 0),
        (this.maxCount = 5),
        false,
        COA_id
      )
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
          this.SubledgertableData = response.items;
          this.SubledgerCount = response.totalCount;
          this.loading = false;
        },
      });
    this.displaytableModal = true;
  }

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 10;
    this._subLedgerService
      .getAllSupplier(
        "ChartOfAccountSubLedger",
        this.skipCount,
        this.maxCount,
        false,
        this.coaForSubLedger
      )
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
          this.SubledgertableData = response.items;
          this.count = response.totalCount;
          this.loading = false;
        },
      });
  }

  onPageChangeForSubLedger(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.skipCount = (this.currentPage - 1) * 10;
    this.getAll();
  }

  async create(row: any) {
    debugger;
    this.subLedgerForm.get("chartOfAccountId").setValue(row.id);
    this.subLedgerForm
      .get("chartOfAccountSerialNumber")
      .setValue(row.serialNumber);
    this.subLedgerForm.get("chartOfAccountName").setValue(row.name);
    debugger;
    await this.getMaxCount(row.id);
    this.displayModal = true;
  }

  async getMaxCount(id: number) {
    debugger;
    this._subLedgerService
      .GetDocMaxCount("ChartOfAccountSubLedger", id)
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
          const coaSerialNumber = this.subLedgerForm.get(
            "chartOfAccountSerialNumber"
          ).value;
          const serialNumber = response.toString();
          const concatenatedValue = `${coaSerialNumber}-${serialNumber}`;
          this.subLedgerForm.get("serialNumber").setValue(concatenatedValue);
          // = data;
          // this.subLedgerForm.value.serialNumber = data.serialNumber;
        },
      });
  }

  save() {
    this.saving = true;
    if (!this.subLedgerForm.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._subLedgerService
      .create(this.subLedgerForm.value, "ChartOfAccountSubLedger")
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
          this.subLedgerForm.reset();
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
        this._subLedgerService
          .delete(id, "ChartOfAccountSubLedger")
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
                this.view(this.dataForEdit.chartOfAccountId);
              }
            },
          });
      },
    });
  }

  update() {
    debugger;
    this.saving = true;
    const updateData = {
      ...this.subLedgerForm.value,
      id: this.dataForEdit.id,
    };
    this._subLedgerService
      .update(updateData, "ChartOfAccountSubLedger")
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

          this.saving = false;
          this.displayModal = false;
          this.view(this.dataForEdit.chartOfAccountId);
          this.subLedgerForm.reset();
        },
      });
  }

  showdata(id: number) {
    debugger;
    if (id) {
      this.editMode = true;
      this._subLedgerService
        .getDataForEdit(id, "ChartOfAccountSubLedger")
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

            // Set form fields with the response data
            this.subLedgerForm.patchValue({
              chartOfAccountSerialNumber:
                this.dataForEdit.chartOfAccountSerialNumber,
              chartOfAccountName: this.dataForEdit.chartOfAccountName,
              chartOfAccountId: this.dataForEdit.chartOfAccountId,
              title: this.dataForEdit.title,
              shortName: this.dataForEdit.shortName,
              address: this.dataForEdit.address,
              phoneNumber: this.dataForEdit.phoneNumber,
              cityId: this.dataForEdit.cityId,
              cityName: this.dataForEdit.cityName,
              provinceId: this.dataForEdit.provinceId,
              provinceName: this.dataForEdit.provinceName,
              countryId: this.dataForEdit.countryId,
              countryName: this.dataForEdit.countryName,
              gstRate: this.dataForEdit.gstRate,
              pocName: this.dataForEdit.pocName,
              pocNumber: this.dataForEdit.pocNumber,
              faxNumber: this.dataForEdit.faxNumber,
              ntn: this.dataForEdit.ntn,
              stn: this.dataForEdit.stn,
              cnic: this.dataForEdit.cnic,
              email: this.dataForEdit.email,
              chequeTitle: this.dataForEdit.chequeTitle,
              employeeId: this.dataForEdit.employeeId,
              employeeName: this.dataForEdit.employeeName,
              locationId: this.dataForEdit.locationId,
              locationName: this.dataForEdit.locationName,
              vendorTypeId: this.dataForEdit.vendorTypeId,
              vendorTypeName: this.dataForEdit.vendorTypeName,
              taxSectionId: this.dataForEdit.taxSectionId,
              taxSectionName: this.dataForEdit.taxSectionName,
              tax: this.dataForEdit.tax,
              COAserialNumber: this.dataForEdit.COAserialNumber,
              COAName: this.dataForEdit.COAName,
              SupplierAccountNumber: this.dataForEdit.SupplierAccountNumber,
              isActive: this.dataForEdit.isActive,
              serialNumber: this.dataForEdit.serialNumber,
              chartOfAccountSubLedgerType:
                this.dataForEdit.chartOfAccountSubLedgerType,
            });
            this.displayModal = true;
          },
          error: (error) => {
            console.error("Error retrieving data:", error);
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.subLedgerForm.reset();
      this.subLedgerForm.enable();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
  onGlobalFilterForSubledger(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
}
