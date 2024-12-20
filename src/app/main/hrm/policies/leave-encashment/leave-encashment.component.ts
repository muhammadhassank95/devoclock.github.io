import { Component, OnInit, Injector } from "@angular/core";
import { PoliciesService } from "../../shared/services/policies.service";
import { LeaveManagementService } from "../../shared/services/leave-management.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { lePolicyDto } from "../../shared/DTOs/policies-dto";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-leave-encashment",
  templateUrl: "./leave-encashment.component.html",
})
export class LeaveEncashmentComponent
  extends AppComponentBase
  implements OnInit
{
  displayModal: boolean;
  saving: boolean;
  data: any;
  count: number;
  loading: boolean;
  isEditMode: boolean;
  view: boolean;
  createMode: boolean;
  skipCount: number = 0;
  maxCount: number = 10;
  currentPage: number = 1;
  PolicyDto: lePolicyDto = new lePolicyDto();
  today: Date = new Date();
  permissions: PermissionsDto;
  leaveTypes: any;
  selectedLeaveTypes: any;

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("LeaveEncashmentPolicy");
    this.getAll();
    this.getLeaveTypes();
  }

  getLeaveTypes() {
    debugger;
    this._policiesService
      .getAllLeaveTypes()
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
          if (response) {
            debugger;
            this.leaveTypes = response.items;
          } else {
            console.log(response.error);
          }
        },
      });
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("LeaveEncashmentPolicy", this.skipCount, this.maxCount)
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
    this.PolicyDto = new lePolicyDto();
    this.PolicyDto.issueDate = this.today;
    this.displayModal = true;
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.view = false;
  }

  create() {
    debugger;
    this.saving = true;
    if (!this.createMode) {
      this._policiesService
        .Edit(this.PolicyDto, "LeaveEncashmentPolicy")
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
              detail: "SavedSuccessfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    } else {
      var tempArr = [];
      this.selectedLeaveTypes?.map((item) => {
        var obj = {
          leaveTypeId: item.id,
          leaveTypeName: item.name,
        };
        tempArr.push(obj);
      });
      this.PolicyDto.leaveEncashmentPolicyDetails = tempArr;
      debugger;
      this._policiesService
        .create(this.PolicyDto, "LeaveEncashmentPolicy")
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
          .delete(id, "LeaveEncashmentPolicy")
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
  getDataForEdit(id: any) {
    debugger;
    if (id) {
      this._policiesService
        .getDataForEdit(id, "LeaveEncashmentPolicy")
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
            this.PolicyDto = response;
            this.selectedLeaveTypes =
              response?.leaveEncashmentPolicyDetails?.map((item: any) => ({
                id: item.leaveTypeId,
                name: item.leaveTypeName,
                isActive: true,
              })) || [];

            this.PolicyDto.issueDate = new Date(response.issueDate);
            this.PolicyDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );

            this.displayModal = true;
          },
        });
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.PolicyDto.userLocationId = value.id;
        this.PolicyDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      case "TypeOfEmployee":
        this.PolicyDto.employeeTypeId = value.id;
        this.PolicyDto.employeeTypeName = value.name;
        break;
      case "FinancialYear":
        this.PolicyDto.financialYearId = value.id;
        this.PolicyDto.financialYearName = value.name;
        break;
    }
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.PolicyDto.issueDate = value;
    }
    if (this.PolicyDto.userLocationId && this.PolicyDto.issueDate) {
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
          this.PolicyDto.userLocationName = response.items[0].name;
          this.PolicyDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._policiesService
      .getVoucherNumber(
        "LeaveEncashmentPolicy",
        "LEP",
        this.PolicyDto.issueDate,
        this.PolicyDto.userLocationId
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
          this.PolicyDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
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
          .approveDocument(id, "LeaveEncashmentPolicy")
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
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._policiesService
      .getAll("LeaveEncashmentPolicy", this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
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
    this._policiesService
      .getAll(
        "LeaveEncashmentPolicy",
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
