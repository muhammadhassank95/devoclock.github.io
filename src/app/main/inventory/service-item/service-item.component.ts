import { SetupsService } from "./../Shared/Services/inventory-setup.service";
import { ServiceItem } from "./../Shared/DTOs/service-item";
import { Component } from "@angular/core";
import { Table } from "primeng/table";

import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
@Component({
  selector: "app-service-item",
  templateUrl: "./service-item.component.html",
})
export class ServiceItemComponent {
  serviceItemDto: ServiceItem = new ServiceItem();

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  loading: boolean;
  target = "ServiceItem";
  currentPage: number = 1;
  filterDto = {
    maxCount: 5,
    skipCount: 0,
    name: "",
  };

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
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
          this.loading = false;
        },
      });
  }
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
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
            this.serviceItemDto = response;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.serviceItemDto = new ServiceItem();
      this.serviceItemDto.isActive = true;
    }
  }

  save() {
    this.saving = true;

    this._basicTypeService
      .create(this.serviceItemDto, this.target)
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
      .update(this.serviceItemDto, this.target)
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

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "ChartOfAccountP":
        debugger;
        this.serviceItemDto.purchaseChartOfAccountId = value.id.split("/")[0];
        this.serviceItemDto.purchaseChartOfAccountName = value.name;
        break;
      case "ChartOfAccountS":
        debugger;
        this.serviceItemDto.salesChartOfAccountId = value.id.split("/")[0];
        this.serviceItemDto.salesChartOfAccountName = value.name;
        break;
      case "ServiceItemCategory":
        debugger;
        this.serviceItemDto.serviceItemCategoryId = value.id;
        this.serviceItemDto.serviceItemCategoryName = value.name;
        this.getNextSerialNumber("ServiceItemCategory", value.id);
        break;
      case "Unit":
        debugger;
        this.serviceItemDto.unitId = value.id;
        this.serviceItemDto.unitName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
    // this.updateNameField();
  }

  getNextSerialNumber(AppService: string, id: any) {
    if (id) {
      this._basicTypeService
        .GetNextCategoryCount(AppService, id)
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
            this.serviceItemDto.serialNumber = response;
          },
        });
    }
  }
  // updateNameField() {
  //   this.serviceItemDto.name = `${this.serviceItemDto.costCenterName || ""} ${
  //     this.serviceItemDto.projectName || ""
  //   }`.trim();
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    // this.skipcount = 0;
    // this.maxcount = 10;
    this.filterDto.name = inputValue;
    this.getAll();
  }
}
