import { Component, Input } from "@angular/core";
import { SubCategoryId } from "../../Shared/DTOs/sub-category-id";
import { SetupsService } from "../../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { BudgetService } from "@app/main/budget/shared/services/budget.service";
import { Table } from "@node_modules/primeng/table";

@Component({
  selector: "app-sub-category-id",
  templateUrl: "./sub-category-id.component.html",
})
export class SubCategoryIdComponent {
  subCategoryIdDto: SubCategoryId = new SubCategoryId();

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  loading: boolean;
  saving: boolean;
  currentPage: number = 1;
  target = "ItemSubCategory";
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    itemType: "",
    name: "",
  };
  @Input() type;

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.filterDto.itemType = this.type;
    this._basicTypeService
      .getAll(this.target, this.filterDto)
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
        this._basicTypeService
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
    if (id) {
      this.editMode = true;
      this._basicTypeService
        .getData(id, this.target)
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
            this.subCategoryIdDto = response;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.subCategoryIdDto = new SubCategoryId();
      this.subCategoryIdDto.isActive = true;
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.subCategoryIdDto.name) {
      this.messageService.add({
        severity: "error",
        detail: "Name is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.subCategoryIdDto.sub_serialNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Serial Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    this.subCategoryIdDto.itemType = this.type;
    this._basicTypeService
      .create(this.subCategoryIdDto, this.target)
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

    this._basicTypeService
      .update(this.subCategoryIdDto, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.messageService.add({
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
  // setPickerValue(value: any, title: string) {
  //   debugger
  //   switch (title) {
  //     case "Category":
  //       debugger
  //       this.subCategoryIdDto.categoryId = +value.id.split('/')[0];
  //       this.getSerialNumber(value.id.split('/')[1]);
  //       break;
  //     default:
  //       alert(`${title} is not defined`)
  //   }
  // }
  // getSerialNumber(id: any) {
  //   this._basicTypeService
  //     .GetCategoryCount(id)
  //     .pipe(
  //       finalize(() => { }),
  //       catchError((error) => {
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.message,
  //           life: 2000,
  //         });
  //         return throwError(error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log(response);
  //         this.subCategoryIdDto.categoryId = response;
  //         this.subCategoryIdDto.serialNumber = `${id}${this.subCategoryIdDto.categoryId}`;
  //         debugger
  //       },
  //     });
  // }
  onPageChange(event: any) {
    debugger;
    this.filterDto.itemType = this.type;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * this.filterDto.maxCount;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
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
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.name = inputValue;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
