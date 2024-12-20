import { Component, Injector, OnInit } from "@angular/core";
import { PoliciesService } from "../../shared/services/policies.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { EOBIdto } from "../../shared/DTOs/policies-dto";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-eobi",
  templateUrl: "./eobi.component.html",
})
export class EOBIComponent extends AppComponentBase implements OnInit {
  displayModal: boolean;
  isEditMode: boolean;
  saving: boolean;
  loading: boolean;
  skipCount: number = 0;
  maxCount: number = 10;
  currentPage: number = 1;
  vocDocNumber: string;
  data: any;
  count: number;
  view: boolean;
  createMode: boolean;
  eobiDto: EOBIdto = new EOBIdto();
  permissions: PermissionsDto;
  today: Date = new Date();

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("EmployeePensionFundPolicy");
    this.getAll();
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("EmployeePensionFundPolicy", this.skipCount, this.maxCount)
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
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  openCreateModal() {
    this.eobiDto = new EOBIdto();
    this.eobiDto.issueDate = this.today;
    this.displayModal = true;
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.view = false;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  create() {
    debugger;
    this.saving = true;
    if (!this.createMode) {
      this._policiesService
        .Edit(this.eobiDto, "EmployeePensionFundPolicy")
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
              detail: "Updated Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    } else {
      this._policiesService
        .create(this.eobiDto, "EmployeePensionFundPolicy")
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
              detail: "Saved Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    }
  }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._policiesService
          .delete(id, "EmployeePensionFundPolicy")
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
        this.eobiDto.userLocationId = value.id;
        this.eobiDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      case "TypeOfEmployee":
        this.eobiDto.employeeTypeId = value.id;
        this.eobiDto.employeeTypeName = value.name;
        break;
    }
  }
  OnPercentChange(value, flag: boolean) {
    if (flag) {
      this.eobiDto.employeeContributionPercentage = value;
      if (this.eobiDto.eobiSalary) {
        this.eobiDto.employeePercentageDeduction = +(
          this.eobiDto.eobiSalary *
          (this.eobiDto.employeeContributionPercentage / 100)
        ).toFixed();
      }
    } else {
      this.eobiDto.employerContributionPercentage = value;
      if (this.eobiDto.eobiSalary) {
        this.eobiDto.employerPercentageDeduction = +(
          this.eobiDto.eobiSalary *
          (this.eobiDto.employerContributionPercentage / 100)
        ).toFixed();
      }
    }
  }
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._policiesService
          .approveDocument(id, "EmployeePensionFundPolicy")
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
                  detail: "Approved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  getDataForEdit(id: any) {
    debugger;
    if (id) {
      this._policiesService
        .getDataForEdit(id, "EmployeePensionFundPolicy")
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            debugger;
            this.eobiDto = response;
            this.eobiDto.issueDate = new Date(response.issueDate);
            this.eobiDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.displayModal = true;
          },
        });
    }
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
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._policiesService
      .getAll(
        "EmployeePensionFundPolicy",
        this.skipCount,
        this.maxCount,
        this.vocDocNumber
      )
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.eobiDto.issueDate = value;
    }
    if (this.eobiDto.userLocationId && this.eobiDto.issueDate) {
      this.getVoucherNumber();
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._policiesService
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
          this.eobiDto.userLocationName = response.items[0].name;
          this.eobiDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._policiesService
      .getVoucherNumber(
        "EmployeePensionFundPolicy",
        "EOP",
        this.eobiDto.issueDate,
        this.eobiDto.userLocationId
      )
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please Select Location Id to make correct voucher number",
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.eobiDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  edit(id: number) {
    this.isEditMode = true;
    this.createMode = false;
    this.view = false;

    this.getDataForEdit(id);
  }
  viewOnly(id?: number) {
    this.view = true;
    this.isEditMode = false;
    this.getDataForEdit(id);
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._policiesService
      .getAll(
        "EmployeePensionFundPolicy",
        this.skipCount,
        this.maxCount,
        inputValue
      )
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
}
