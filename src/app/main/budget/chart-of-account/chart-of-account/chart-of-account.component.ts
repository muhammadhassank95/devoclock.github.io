import { Component, Injector } from "@angular/core";
import { ChartOfAccount } from "../../shared/Dtos/chart-of-account";
import { BudgetService } from "../../shared/services/budget.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import * as Papa from "papaparse";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-chart-of-account",
  templateUrl: "./chart-of-account.component.html",
})
export class ChartOfAccountComponent {
  chartOfAccountDto: ChartOfAccount = new ChartOfAccount();
  editMode: boolean;
  displayModal: boolean;
  target: string = "ChartOfAccount";
  tableData: any;
  level1Id: string;
  level2Id: string;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  saving: boolean;
  loading: boolean = false;
  showSupplierDetails = false;
  levelOneDropdown: any[] = [];
  levelOneSelectedItem: any;
  levelTwoDropdown: any[] = [];
  levelTwoSelectedItem: any;
  levelThreeDropdown: any[] = [];
  levelThreeSelectedItem: any;
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  linkWithDropdown: any[] = [];
  linkWithSelectedItem: any;
  accountTypeDropdown: any[] = [];
  accountTypeSelectedItem: any;
  currencyDropdown: any[] = [];
  currencySelectedItem: any;

  natureOfCOATypes = [
    { label: "BANK", value: 0 },
    { label: "PETTY_CASH", value: 1 },
    { label: "VEHICLE", value: 2 },
    { label: "HOUSE", value: 3 },
    { label: "FUEL", value: 4 },
    { label: "TAX", value: 5 },
  ];
  constructor(
    injector: Injector,
    private _budgetService: BudgetService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}
  ngOnInit(): void {
    // this.showSupplierDetails =
    //   this.chartOfAccountDto.accountTypeName?.includes("SUPPLIERS") ||
    //   this.chartOfAccountDto.accountTypeName?.includes("CURRENT LIABILITIES");
    this.getAll();
    this.fetchDropdownData('COALvl1').subscribe((items) => (this.levelOneDropdown = items));
    this.fetchDropdownData('COALvl2').subscribe((items) => (this.levelTwoDropdown = items));
    this.fetchDropdownData('COALvl3').subscribe((items) => (this.levelThreeDropdown = items));
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('LinkWith').subscribe((items) => (this.linkWithDropdown = items));
    this.fetchDropdownData('AccountType').subscribe((items) => (this.accountTypeDropdown = items));
    this.fetchDropdownData('Currency').subscribe((items) => (this.currencyDropdown = items));
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
    if(value){
      switch (type) {
        case "COALvl1":
          const value1 = event.value;
          this.chartOfAccountDto.lvl1_serialNo = value1.id.split("/")[1];
          debugger;
          this.chartOfAccountDto.lvl1Id = value1.id.split("/")[0];
          this.level1Id = value1.id.split("/")[1];
          console.log(this.level1Id)
          this.fetchDropdownData('COALvl2').subscribe((items) => {
            this.levelTwoDropdown = items.filter(item => {
              const idParts = item.id.split('/');
              const numberAfterSlash = idParts[1]?.split('-')[0];
              return numberAfterSlash === this.level1Id;
            });
          });
          // this.getCOASerialNumber(value.id);
          break;
        case "COALvl2":
          const value2 = event.value;
          this.chartOfAccountDto.lvl2_serialNo = value2.id.split("/")[1];
  
          this.chartOfAccountDto.lvl2Id = value2.id.split("/")[0];
          debugger;
          this.level2Id = value2.id.split("/")[1];
          this.fetchDropdownData('COALvl3').subscribe((items) => {
            this.levelThreeDropdown = items.filter(item => {
              const valueAfterSlash = item.id?.split('/') || '';
              const valueFirstTwoParts = valueAfterSlash[1]?.split('-').slice(0, 2).join('-');
          
              console.log('Segment Before Dash:', valueFirstTwoParts, 'Level2Id:', this.level2Id);
              return valueFirstTwoParts === this.level2Id;
            });
          
            console.log('Filtered Dropdown:', this.levelThreeDropdown);
          });
          
          // this.getCOASerialNumber(value.id);
          break;
        case "COALvl3":
          const value3 = event.value;
          this.chartOfAccountDto.lvl3_serialNo = value3.id.split("/")[1];
          debugger;
          this.chartOfAccountDto.lvl3_Id = value3.id.split("/")[0];
          console.log(value3.id,value3)
          console.log(value3.id.split('/').pop())
          this.getAccountType(value3.id.split('/')[0]);
          this.getCOASerialNumber(value3);
          break;
        case "AccountType":
          const value4 = event.value;
          this.chartOfAccountDto.accountTypeId = +value4.id;
          this.chartOfAccountDto.accountTypeName = value4.name;
          debugger;
          // this.showSupplierDetails =
          //   value.name === "SUPPLIERS" || value.name === "CURRENT LIABILITIES"
          //     ? true
          //     : false;
          break;
        case "Location":
          const value5 = event.value;
          this.chartOfAccountDto.locationId = +value5.id;
          this.chartOfAccountDto.locationName = value5.name;
          break;
        case "Currency":
          const value6 = event.value;
          this.chartOfAccountDto.currencyId = +value6.id;
          this.chartOfAccountDto.currencyName = value6.name;
          break;
        case "LinkWith":
          const value7 = event.value;
          this.chartOfAccountDto.linkWithId = +value7.id;
          this.chartOfAccountDto.linkWithName = value7.name;
          break;
        default:
          alert(`${type} is not defined`)
      }
    }
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "COALvl1":
        this.chartOfAccountDto.lvl1_serialNo = value.id.split("/")[1];
        debugger;
        this.chartOfAccountDto.lvl1Id = value.id.split("/")[0];
        this.level1Id = value.id.split("/")[0];

        // this.getCOASerialNumber(value.id);
        break;
      case "COALvl2":
        this.chartOfAccountDto.lvl2_serialNo = value.serialNumber;

        this.chartOfAccountDto.lvl2Id = value.id;
        debugger;
        this.level2Id = value.id;
        // this.getCOASerialNumber(value.id);
        break;
      case "COALvl3":
        this.chartOfAccountDto.lvl3_serialNo = value.serialNumber;
        debugger;
        this.chartOfAccountDto.lvl3_Id = value.id;
        console.log(value)
        this.getAccountType(value.id);
        this.getCOASerialNumber(value);
        break;
      case "AccountType":
        this.chartOfAccountDto.accountTypeId = +value.id;
        this.chartOfAccountDto.accountTypeName = value.name;
        debugger;
        // this.showSupplierDetails =
        //   value.name === "SUPPLIERS" || value.name === "CURRENT LIABILITIES"
        //     ? true
        //     : false;
        break;
      case "Location":
        this.chartOfAccountDto.locationId = +value.id;
        this.chartOfAccountDto.locationName = value.name;
        break;
      case "Currency":
        this.chartOfAccountDto.currencyId = +value.id;
        this.chartOfAccountDto.currencyName = value.name;
        break;
      case "LinkWith":
        this.chartOfAccountDto.linkWithId = +value.id;
        this.chartOfAccountDto.linkWithName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount: number = this.skipCount, maxCount: number = this.maxCount) {
    this._budgetService
      .getAll(this.target, skipCount, maxCount, 0, false)
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

  isValidNumber(value: number | null | undefined): boolean {
    return value !== null && value !== undefined && value !== 0;
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
            this.chartOfAccountDto = response;
            this.chartOfAccountDto.stopEntryBefore = new Date(
              response.stopEntryBefore
            );
            debugger;
            this.chartOfAccountDto.lvl3_Id = response.lvl3_Id;
            this.chartOfAccountDto.lvl3_serialNo = response.lvl3_SerialNumber;
            this.chartOfAccountDto.lvl3_name = response.lvl3_Name;

            // this.chartOfAccountDto.lvl2Id = response.lvl3_Id;
            this.chartOfAccountDto.lvl2_serialNo = response.lvl2_SerialNumber;
            this.chartOfAccountDto.lvl2_name = response.lvl2_Name;

            // this.chartOfAccountDto.lvl1_ = response.lvl3_Id;
            this.chartOfAccountDto.lvl1_serialNo = response.lvl1_SerialNumber;
            this.chartOfAccountDto.lvl1_name = response.lvl1_Name;

            this.displayModal = true;

            // Dropdowns on edit mode
            const level1SelectedItem = this.levelOneDropdown.find(
              (item) => item.name === response.lvl1_Name
            );
            this.levelOneSelectedItem = level1SelectedItem;
            const level2SelectedItem = this.levelTwoDropdown.find(
              (item) => item.name === response.lvl2_Name
            );
            this.levelTwoSelectedItem = level2SelectedItem;
            const level3SelectedItem = this.levelThreeDropdown.find(
              (item) => item.name === response.lvl3_Name
            );
            this.levelThreeSelectedItem = level3SelectedItem;
            const accountTypeSelectedItem = this.accountTypeDropdown.find(
              (item) => item.name === response.accountTypeName
            );
            this.accountTypeSelectedItem = accountTypeSelectedItem;
            const currencySelectedItem = this.currencyDropdown.find(
              (item) => item.name === response.currencyName
            );
            this.currencySelectedItem = currencySelectedItem;
            const linkWithSelectedItem = this.linkWithDropdown.find(
              (item) => item.name === response.linkWithName
            );
            this.linkWithSelectedItem = linkWithSelectedItem;
            const locationSelectedItem = this.locationDropdown.find(
              (item) => item.name === response.locationName
            );
            this.locationSelectedItem = locationSelectedItem;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.chartOfAccountDto = new ChartOfAccount();
      this.chartOfAccountDto.isActive = true;
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    debugger;
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "startsWith");
  }

  save() {
    this.saving = true;
    if (!this.chartOfAccountDto.name) {
      this.msgService.add({
        severity: "error",
        detail: "Name is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.chartOfAccountDto.lvl1Id) {
      this.msgService.add({
        severity: "error",
        detail: "Lvl 1 ID is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.chartOfAccountDto.lvl2Id) {
      this.msgService.add({
        severity: "error",
        detail: "Lvl 2 ID is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.chartOfAccountDto.lvl3_Id) {
      this.msgService.add({
        severity: "error",
        detail: "Lvl 3 ID is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    // if (!this.chartOfAccountDto.locationId) {
    //   this.msgService.add({
    //     severity: "error",
    //     detail: "locationId is Required",
    //     life: 2000,
    //   });
    //   this.saving = false;
    //   return;
    // }
    this._budgetService
      .create(this.chartOfAccountDto, this.target)
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

    this._budgetService
      .update(this.chartOfAccountDto, this.target)
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

  getCOASerialNumber(obj: any) {
    this._budgetService
      .GetChartOfAccountCount(obj.id.split('/')[0])
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;

          this.chartOfAccountDto.serialNumber = `${obj.id.split('/')[1]}${
            "-" + response
          }`;
        },
      });
  }
  onValueSelected(selectedItem: any) {
    debugger;
    console.log("Selected Item:", selectedItem);
    debugger;
    this.chartOfAccountDto.locationId = selectedItem.id;
    this.chartOfAccountDto.locationName = selectedItem.name;
  }
  downloadCSVFile() {
    // Assuming this.tableData is an array of objects
    const data = this.tableData;

    if (!data || data.length === 0) {
      return; // No data to export
    }

    // Convert data to CSV using PapaParse
    const csv = Papa.unparse(data);

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a link element and trigger download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  downloadPDFFile() {
    this.saving = true;

    this._budgetService
      .getPDFReport(this.chartOfAccountDto, "PdfReport")
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response: any) => {
          this.msgService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Successfully",
            life: 2000,
          });

          debugger;
          const pdfUrl = newBaseUrl + response.result; // Assuming 'response' contains the URL path
          debugger;
          // Open the PDF link in a new tab
          window.open(pdfUrl, "_blank");

          this.saving = false;
        },
      });
  }

  getAccountType(id: number) {
    debugger;
    this._budgetService
      .getDataForEdit(id, "COALvl3")
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
          this.chartOfAccountDto.accountTypeId = response.accountTypeId;
          this.chartOfAccountDto.accountTypeName = response.accountTypeName;
          console.log(response.accountTypeId+ " - " +response.accountTypeName)
          const accountTypeSelectedItem = this.accountTypeDropdown.find(
            (item) => item.name === response.accountTypeName
          );
          this.accountTypeSelectedItem = accountTypeSelectedItem;
        },
      });
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
}
