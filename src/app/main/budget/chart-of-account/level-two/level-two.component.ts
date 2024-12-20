import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { LevelTwo } from "../../shared/Dtos/level-two";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { BudgetService } from "../../shared/services/budget.service";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-level-two",
  templateUrl: "./level-two.component.html",
})
export class LevelTwoComponent implements OnInit {
  constructor(
    private msgService: MessageService,
    private _budgetService: BudgetService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}
  ngOnInit() {
    this.getAll();
    this.fetchDropdownData('COALvl1').subscribe((items) => (this.levelOneDropdown = items));
    this.fetchDropdownData('AccountType').subscribe((items) => (this.accountTypeDropdown = items));
  }
  levelTwo: LevelTwo = new LevelTwo();
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "COALvl2";
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  loading: boolean = false;
  levelOneDropdown: any[] = [];
  levelOneSelectedItem: any;
  accountTypeDropdown: any[] = [];
  accountTypeSelectedItem: any;

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

  onLevelOneDropdownChange(event: any){
    const value = event.value;
    if(value){
      console.log(value)
      this.levelTwo.lvl1_Id = +value.id.split("/")[0];
        this.levelTwo.levelOneSerialNumber = value.id.split("/")[1];
        this.getLvl2SerialNumber(value.id.split("/")[0]);
      // this.levelOne.accountTypeId = +value.id;
      // this.levelOne.accountTypeName = value.name;
    }
  }

  onAccountTypeDropdownChange(event: any){
    const value = event.value;
    if(value){
      console.log(value)
      this.levelTwo.accountTypeId = value.id;
      this.levelTwo.accountTypeName = value.name;
      console.log(this.levelTwo.serialNumber);
    }
  }
  
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "COALvl1":
        debugger;

        this.levelTwo.lvl1_Id = +value.id.split("/")[0];
        this.levelTwo.levelOneSerialNumber = value.id.split("/")[1];
        this.getLvl2SerialNumber(value.id.split("/")[0]);
        break;
      case "AccountType":
        this.levelTwo.accountTypeId = value.id;
        this.levelTwo.accountTypeName = value.name;
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

  getLvl2SerialNumber(id: any) {
    this._budgetService
      .GetLevelTwoCount(id)
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
          // this.levelTwo.COALvl2SerialNumber = response;
          this.levelTwo.serialNumber = `${this.levelTwo.levelOneSerialNumber}-${response}`;
          debugger;
        },
      });
  }

  getAll() {
    this._budgetService
      .getAll(this.target)
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

  show(id?: number) {
    this.levelOneSelectedItem = null;
    this.accountTypeSelectedItem = null;
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
            console.log(response)
            this.levelTwo = response;
            this.levelTwo.lvl1_Id = response.lvl1_Id;
            this.levelTwo.levelOneSerialNumber = response.lvl1_SerialNumber;
            this.levelTwo.lvl1_Name = response.lvl1_Name;
            const levelOneSelectedItem = this.levelOneDropdown.find(
              (item) => item.name === response.lvl1_Name
            );
            const accountTypeSelectedItem = this.accountTypeDropdown.find(
              (item) => item.name === response.accountTypeName
            );
            this.levelOneSelectedItem = levelOneSelectedItem;
            this.accountTypeSelectedItem = accountTypeSelectedItem;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.levelTwo = new LevelTwo();
      this.levelTwo.isActive = true;
    }
  }

  save() {
    this.saving = true;
    if (!this.levelTwo.name) {
      this.msgService.add({
        severity: "error",
        detail: "Name is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._budgetService
      .create(this.levelTwo, this.target)
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
      .update(this.levelTwo, this.target)
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
}
