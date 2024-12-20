import { Component, OnInit, Injector } from "@angular/core";
import { ssPolicyDto } from "../../shared/DTOs/policies-dto";
import { catchError, finalize, throwError } from "rxjs";
import { PoliciesService } from "../../shared/services/policies.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-social-security",
  templateUrl: "./social-security.component.html",
})
export class SocialSecurityComponent
  extends AppComponentBase
  implements OnInit
{
  displayModal: boolean = false;
  data!: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  isViewMode: boolean;
  createMode: boolean;
  saving: boolean = false;
  loading: boolean;
  socialSDto: ssPolicyDto = new ssPolicyDto();
  today: Date = new Date();
  permissions: PermissionsDto;

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("SocialSecurityPolicy");
    this.getAll();
    this.onClose();
  }

  openCreateModal() {
    this.socialSDto = new ssPolicyDto();
    this.socialSDto.issueDate = this.today;
    this.displayModal = true;
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.isViewMode = false;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("SocialSecurityPolicy", this.skipCount, this.maxCount)
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
          this.socialSDto = new ssPolicyDto();
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
        this._policiesService
          .delete(id, "SocialSecurityPolicy")
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
        this.socialSDto.userLocationId = value.id;
        this.socialSDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      case "TypeOfEmployee":
        this.socialSDto.employeeTypeId = value.id;
        this.socialSDto.employeeTypeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  OnPercentChange(value, flag: boolean) {
    if (flag) {
      this.socialSDto.employeeContributionPercentage = value;
      if (this.socialSDto.salaryLimit) {
        this.socialSDto.employeePercentageDeduction = +(
          this.socialSDto.salaryLimit *
          (this.socialSDto.employeeContributionPercentage / 100)
        ).toFixed();
      }
    } else {
      this.socialSDto.employerContributionPercentage = value;
      if (this.socialSDto.salaryLimit) {
        this.socialSDto.employerPercentageDeduction = +(
          this.socialSDto.salaryLimit *
          (this.socialSDto.employerContributionPercentage / 100)
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
          .approveDocument(id, "SocialSecurityPolicy")
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
        .getDataForEdit(id, "SocialSecurityPolicy")
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
            return throwError(error.message);
          })
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            debugger;
            this.socialSDto = response;
            this.socialSDto.issueDate = new Date(response.issueDate);
            this.socialSDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.displayModal = true;
          },
        });
    }
  }

  create() {
    debugger;
    this.saving = true;
    if (!this.createMode) {
      this._policiesService
        .Edit(this.socialSDto, "SocialSecurityPolicy")
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
        .create(this.socialSDto, "SocialSecurityPolicy")
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
      .getAll("SocialSecurityPolicy", this.skipCount, this.maxCount)
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
      this.socialSDto.issueDate = value;
    }
    if (this.socialSDto.userLocationId && this.socialSDto.issueDate) {
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
          this.socialSDto.userLocationName = response.items[0].name;
          this.socialSDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._policiesService
      .getVoucherNumber(
        "SocialSecurityPolicy",
        "SSP",
        this.socialSDto.issueDate,
        this.socialSDto.userLocationId
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
          this.socialSDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  edit(id: number) {
    this.isEditMode = true;
    this.createMode = false;
    this.isViewMode = false;
    this.getDataForEdit(id);
  }
  viewOnly(id?: number) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.getDataForEdit(id);
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._policiesService
      .getAll("SocialSecurityPolicy", this.skipCount, this.maxCount, inputValue)
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
