import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { BudgetService } from "../../shared/services/budget.service";
import { LevelThree } from "../../shared/Dtos/level-three";
import { Table } from "primeng/table";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-level-three",
  templateUrl: "./level-three.component.html",
})
export class LevelThreeComponent implements OnInit {
  constructor(
    private msgService: MessageService,
    private _budgetService: BudgetService,
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}
  ngOnInit() {
    this.getAll();
    this.fetchDropdownData('COALvl1').subscribe((items) => (this.levelOneDropdown = items));
    this.fetchDropdownData('COALvl2').subscribe((items) => (this.levelTwoDropdown = items));
    this.fetchDropdownData('AccountType').subscribe((items) => (this.accountTypeDropdown = items));
  }
  levelThree: LevelThree = new LevelThree();
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "COALvl3";
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  loading: boolean = false;
  level1Id: string;
  levelOneDropdown: any[] = [];
  levelOneSelectedItem: any;
  levelTwoDropdown: any[] = [];
  levelTwoSelectedItem: any;
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

  onDropdownChange(event: any, type: string){
    const value1 = event.value;
    if(value1){
      switch (type) {
        case "COALvl1":
          const value = event.value;
          this.levelThree.lvl1_SerialNumber = value.id.split("/")[1];
          debugger;
          this.levelThree.lvl1_Id = value.id.split('/')[0];
          this.level1Id = value.id.split('/')[1];
          console.log(this.level1Id)
          this.fetchDropdownData('COALvl2').subscribe((items) => {
            this.levelTwoDropdown = items.filter(item => {
              const idParts = item.id.split('/');
              const numberAfterSlash = idParts[1]?.split('-')[0];
              return numberAfterSlash === this.level1Id;
            });
          });
          break;
        case "COALvl2":
          debugger;
          const value1 = event.value;
          this.levelThree.serialNumber = value1.id.split("/")[1];
          this.level1Id = value1.id;
          this.levelThree.lvl2_Id = value1.id?.split("/")[0];
          this.levelThree.lvl2_SerialNumber = value1.id?.split("/")[1];
          this.levelThree.lvl2_Name = value1.name;
          // this.dto.projectCategoryName = ""
          this.levelThree.COALvl3SerialNumber = "";
          console.log("CoalV2",value1)
          this.getLvl3SerialNumber(value1);
          break;
        case "AccountType":
          const value2 = event.value;
          this.levelThree.accountTypeId = value2.id;
          this.levelThree.accountTypeName = value2.name;
          debugger;
          break;
        default:
          alert(`${type} is not defined`);
      }
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "COALvl1":
        this.levelThree.lvl1_SerialNumber = value.id.split("/")[1];
        debugger;
        this.levelThree.lvl1_Id = value.id.split("/")[0];
        this.level1Id = value.id.split("/")[0];

        // this.levelThree.lvl2_Id = +value.id.split("/")[0];
        // this.levelThree.lvl2_Name = value.name;
        // this.dto.projectCategoryName = ""
        // this.levelThree.COALvl3SerialNumber = "";
        // this.getLvl3SerialNumber(value.id.split("/")[0]);
        break;
      case "COALvl2":
        debugger;
        this.levelThree.serialNumber = value.id.split("/")[1];
        this.level1Id = value.id;
        this.levelThree.lvl2_Id = value.id;
        this.levelThree.lvl2_SerialNumber = value.serialNumber;
        this.levelThree.lvl2_Name = value.name;
        // this.dto.projectCategoryName = ""
        this.levelThree.COALvl3SerialNumber = "";
        console.log(value)
        this.getLvl3SerialNumber(value);
        break;
      case "AccountType":
        this.levelThree.accountTypeId = value.id;
        this.levelThree.accountTypeName = value.name;
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

  getLvl3SerialNumber(value: any) {
    this._budgetService
      .GetLevelThreeCount(value.id?.split("/")[0])
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
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
          console.log(response);
          debugger;
          // this.levelThree.COALvl3SerialNumber = response;
          this.levelThree.serialNumber = `${value.id?.split("/")[1]}-${response}`;
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
    this.levelTwoSelectedItem = null;
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
            this.levelThree = response;
            // this.levelThree = response;
            // this.levelThree = response;
            // this.levelThree = response;
            // this.levelThree = response;
            const levelOneSelectedItem = this.levelOneDropdown.find(
              (item) => item.name === response.lvl1_Name
            );
            const levelTwoSelectedItem = this.levelTwoDropdown.find(
              (item) => item.name === response.lvl2_Name
            );
            console.log("Level 2 Name::", response, this.levelTwoDropdown)
            const accountTypeSelectedItem = this.accountTypeDropdown.find(
              (item) => item.name === response.accountTypeName
            );
            this.levelOneSelectedItem = levelOneSelectedItem;
            this.levelTwoSelectedItem = levelTwoSelectedItem;
            this.accountTypeSelectedItem = accountTypeSelectedItem;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.levelThree = new LevelThree();
      this.levelThree.isActive = true;
    }
  }

  save() {
    this.saving = true;
    if (!this.levelThree.name) {
      this.msgService.add({
        severity: "error",
        detail: "Name is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    this._budgetService
      .create(this.levelThree, this.target)
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
      .update(this.levelThree, this.target)
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
