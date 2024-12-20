import { Component } from "@angular/core";
import { LevelOne } from "../../shared/Dtos/level-one";
import { BudgetService } from "../../shared/services/budget.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { UrlHelper } from "@shared/helpers/UrlHelper";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
@Component({
  selector: "app-level-one",
  templateUrl: "./level-one.component.html",
})
export class LevelOneComponent {
  levelOne: LevelOne = new LevelOne();
  urlHelper = UrlHelper;
  tableData: any;
  searchQuery: string = "";
  filteredLevel1: any[] = [];
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "COALvl1";
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  loading: boolean = false;
  accountTypeDropdown: any[] = [];
  accountTypeSelectedItem: any;
  constructor(
    private _budgetService: BudgetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}

  ngOnInit() {
    this.getAll();
    this.fetchDropdownData('AccountType').subscribe((items) => (this.accountTypeDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
          return response.items.map((item: any) => ({
            id: +item.id?.split("/")[0] || 0,
            name: item.name,
          }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
  }

  onDropdownChange(event: any){
    const value = event.value;
    if(value){
      this.levelOne.accountTypeId = +value.id;
      this.levelOne.accountTypeName = value.name;
    }
  }

  getAll() {
    this._budgetService
      .getAll(this.target)
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
          this.tableData = response.items;
          this.count = response.totalCount;
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

  show(id?: number) {
    this.accountTypeSelectedItem = null;
    if (id) {
      this.editMode = true;
      this._budgetService
        .getDataForEdit(id, this.target)
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
            this.levelOne = response;
            debugger;
            this.levelOne.accountTypeName = response.accountTypeName;
            this.displayModal = true;
            console.log(response)
            const selectedItem = this.accountTypeDropdown.find(
              (item) => item.id === response.accountTypeId
            );
            console.log("selectedSerial:::", response.serialNumber)
            console.log("selectedItem:::", selectedItem)
            this.accountTypeSelectedItem = selectedItem;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.levelOne = new LevelOne();
      this.levelOne.isActive = true;
    }
  }

  save() {
    this.saving = true;
    if (!this.levelOne.name) {
      this.messageService.add({
        severity: "error",
        detail: "Name is Required",
      });
      this.saving = false;
      return;
    }
    debugger;
    if (
      !this.levelOne.serialNumber ||
      this.levelOne.serialNumber.toString().length !== 2
    ) {
      this.messageService.add({
        severity: "error",
        detail: "Serial Number must be at least 2 characters",
      });
      this.saving = false;
      return;
    }
    this._budgetService
      .create(this.levelOne, this.target)
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
          return throwError(error.error.error.message);
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
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;

    this._budgetService
      .update(this.levelOne, this.target)
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
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.messageService.add({
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

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._budgetService
      .getAll(this.target, this.skipCount, this.maxCount)
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
      case "AccountType":
        this.levelOne.accountTypeId = +value.id;
        this.levelOne.accountTypeName = value.name;
        debugger;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  filterLevelOne() {
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredLevel1 = this.tableData.filter((levelOne) =>
        Object.values(levelOne).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
    } else {
      this.filteredLevel1 = this.tableData;
    }
  }
}
