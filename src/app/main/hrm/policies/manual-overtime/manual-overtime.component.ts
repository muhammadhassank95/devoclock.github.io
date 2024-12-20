import { Component, OnInit, Injector } from "@angular/core";
import { PoliciesService } from "../../shared/services/policies.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { ManualOvertimeDto } from "../../shared/DTOs/policies-dto";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-manual-overtime",
  templateUrl: "./manual-overtime.component.html",
})
export class ManualOvertimeComponent
  extends AppComponentBase
  implements OnInit
{
  displayModal: boolean = false;
  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  createMode: boolean;
  view: boolean;
  saving: boolean = false;
  loading: boolean;
  manualOvertimeDto: ManualOvertimeDto = new ManualOvertimeDto();
  permissions: PermissionsDto;

  otRate: any;
  attendanceDate: Date;
  checkIn: Date;
  checkOut: Date;

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.permissions = new PermissionsDto("ManualOverTime");
    this.getAll();
  }

  openCreateModal() {
    this.otRate = null;
    this.attendanceDate = null;
    this.manualOvertimeDto = new ManualOvertimeDto();
    this.displayModal = true;
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.view = false;
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Employee":
        this.manualOvertimeDto.employeeId = value.id;
        this.manualOvertimeDto.employeeName = value.name;
        this.manualOvertimeDto.erpId = value.additional;
        this.GetShiftDetails();
        break;
      case "Location":
        this.manualOvertimeDto.userLocationId = value.id;
        this.manualOvertimeDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
    }
  }

  GetShiftDetails() {
    if (!this.manualOvertimeDto.erpId) {
      return;
    }
    this._policiesService
      .getEmployeeShift(this.manualOvertimeDto.erpId)
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
          this.manualOvertimeDto.allowedOverTimeHours =
            response.hoursRequiredForOT;
          this.otRate = response.otRate;
          this.getNetOverTime();
        },
      });
  }

  getNetOverTime(val?) {
    if (val) {
      this.manualOvertimeDto.overTimeHours = val;
    }
    if (!this.manualOvertimeDto.overTimeHours) return;
    if (
      this.manualOvertimeDto.allowedOverTimeHours >
      this.manualOvertimeDto.overTimeHours
    ) {
      this.manualOvertimeDto.netOverTimeHours =
        this.manualOvertimeDto.overTimeHours;
    } else {
      this.manualOvertimeDto.netOverTimeHours =
        this.manualOvertimeDto.allowedOverTimeHours;
    }
    this.manualOvertimeDto.overTimeAmount =
      this.manualOvertimeDto.netOverTimeHours * this.otRate;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("ManualOverTime")
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
          this.manualOvertimeDto = new ManualOvertimeDto();
        },
      });
  }

  create() {
    debugger;
    this.saving = true;
    if (!this.createMode) {
      this._policiesService
        .Edit(this.manualOvertimeDto, "ManualOverTime")
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
        .create(this.manualOvertimeDto, "ManualOverTime")
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
          .delete(id, "ManualOverTime")
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
        .getDataForEdit(id, "ManualOverTime")
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
            this.manualOvertimeDto = response;
            this.manualOvertimeDto.issueDate = new Date(response.issueDate);
            this.displayModal = true;
          },
        });
    }
  }

  GetAttendance() {
    if (!this.attendanceDate || !this.manualOvertimeDto.employeeId) return;
    this._policiesService
      .fetchAttendance(this.manualOvertimeDto.employeeId, this.attendanceDate)
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
          this.checkIn = response.checkIn_Time;
          this.checkOut = response.checkOut_Time;
        },
      });
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
      .getAll("ManualOverTime", this.skipCount, this.maxCount)
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
      this.manualOvertimeDto.issueDate = value;
    }
    if (
      this.manualOvertimeDto.userLocationId &&
      this.manualOvertimeDto.issueDate
    ) {
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
          this.manualOvertimeDto.userLocationName = response.items[0].name;
          this.manualOvertimeDto.userLocationId = response.items[0].id;
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._policiesService
      .getVoucherNumber(
        "ManualOvertime",
        "MIT",
        this.manualOvertimeDto.issueDate,
        this.manualOvertimeDto.userLocationId
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
          this.manualOvertimeDto.voucherNumber = response;
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
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._policiesService
          .approveDocument(id, "ManualOverTime")
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
}
