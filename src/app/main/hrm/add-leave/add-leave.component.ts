import { Component, HostListener } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { LeaveManagementService } from "../shared/services/leave-management.service";
import { EmployeeService } from "../shared/services/employee.service";

import { ConfirmationService, MessageService } from "primeng/api";
import { LeaveManagement } from "../shared/DTOs/leave-management";
import { Table } from "primeng/table";
import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { AppAuthService } from "@shared/auth/app-auth.service";

@Component({
  selector: "app-add-leave",
  templateUrl: "./add-leave.component.html",
})
export class AddLeaveComponent {
  loading: boolean = false;
  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  documentNumber: string;
  financialYearId: number;
  financialYearName: string;
  isViewMode: boolean;
  editMode: boolean = false;
  dialogVisibility: boolean;
  saving: boolean = false;
  shouldHideDialog: boolean = false;
  tempDate: Date;
  paidDate: Date;
  setParms: any;
  costCenterId: number;
  costCenterName: string;
  projectId: number;
  projectName: string;
  departmentId: number;
  departmentName: string;
  joiningDate: Date;
  probationStartDate: Date;
  today: Date = new Date();
  probationEndDate: Date;
  colDefs: ColDef[] = [];
  rowData: any[] = [];
  locationId: number;
  locationName: string;
  leaveDto: LeaveManagement = new LeaveManagement();
  protected gridApi: GridApi;
  rowSelection: string;
  financialYears: any;
  constructor(
    private _leavesService: LeaveManagementService,
    private _employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService,
    private _authService?: AppAuthService
  ) {}

  openModal(id?: number) {
    debugger;
    this.dialogVisibility = true;
    this.rowData = [];
    this.leaveDto = new LeaveManagement();
    this.costCenterId = null;
    this.costCenterName = null;
    this.locationId = null;
    this.locationName = null;
    this.projectId = null;
    this.projectName = null;
    this.departmentId = null;
    this.departmentName = null;
    this.joiningDate = null;
    this.probationStartDate = null;
    this.probationEndDate = null;
    if (id) {
      this.isViewMode = true;
      this.editMode = false;
      this._leavesService
        .getDataForEdit(id)
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
            this.leaveDto = response;
            this.getDefaultLocation(
              "Location",
              "locationName",
              "locationId",
              response.costCenterId
            );
            this.leaveDto.approvedTypeName = response.approvedLeaveTypeName;
            this.leaveDto.recommendedByERPId = response.recommendedById;
            this.leaveDto.recomendedByName = response.recommendedByName;
            this.leaveDto.employeeERPId = response.employeeERPId;
            this.leaveDto.employeeId = response.employeeId;
            this.leaveDto.leaveStartDate = new Date(response.leaveStartDate);
            this.leaveDto.leaveEndDate = new Date(response.leaveEndDate);
            this.leaveDto.documentDate = new Date(response.documentDate);
            this.leaveDto.compensatoryLeaveAvailed = new Date(
              response.compensatoryLeaveAvailed
            );
            this.getEmployeeDetails();
          },
        });
    } else {
      this.leaveDto = new LeaveManagement();
      this.leaveDto.documentDate = this.today;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.isViewMode = false;
      this.editMode = false;
    }
  }

  openEditModal(id?: number) {
    debugger;
    this.dialogVisibility = true;
    this.rowData = [];
    this.leaveDto = new LeaveManagement();
    if (id) {
      this.isViewMode = false;
      this.editMode = true;
      this._leavesService
        .getDataForEdit(id)
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
            this.leaveDto = response;

            this.leaveDto.approvedTypeName = response.approvedLeaveTypeName;
            this.leaveDto.recomendedByName = response.recommendedByName;
            this.leaveDto.recommendedByERPId = response.recommendedByERPId;
            this.leaveDto.employeeERPId = response.employeeERPId;
            this.leaveDto.employeeId = response.employeeId;
            this.leaveDto.leaveStartDate = new Date(response.leaveStartDate);
            this.leaveDto.leaveEndDate = new Date(response.leaveEndDate);
            this.leaveDto.documentDate = new Date(response.documentDate);
            this.leaveDto.compensatoryLeaveAvailed = new Date(
              response.compensatoryLeaveAvailed
            );
            this.getEmployeeDetails();
          },
        });
    } else {
      // this.isViewMode = false;
      this.leaveDto = new LeaveManagement();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    // this._leavesService.getAll()
    //     .pipe(
    //         finalize(() => { }),
    //         catchError(error => {
    //             this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message });
    //             return throwError(error.error.error.message);
    //         })
    //     )
    //     .subscribe({
    //         next: (response) => {
    //             if (response.success) {
    //                 this.data = response.items;
    //                 this.count = response.totalCount;
    //             } else {
    //                 console.log(response.error);
    //             }
    //         }
    //     });
    this.getAll();
  }

  ngOnInit(): void {
    this.getAll();
    this.loadFinancialYears();
    this.checkLeaves();
    // window.addEventListener('keydown', this.handleKeyboardEvent);
  }

  // handleKeyboardEvent = (event: KeyboardEvent) => {
  //     if (event.ctrlKey && event.key === 'e') {
  //         event.preventDefault();
  //         this.openEditModal();
  //     }
  // };
  getAll() {
    debugger;
    this.loading = true;
    this._leavesService
      .getAll()
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
        this._leavesService
          .delete(id)
          .pipe(
            finalize(() => {}),
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

  create() {
    debugger;
    this.isViewMode = false;
    // this.dialogVisibility = false;
    this.saving = true;
    console.log(this.leaveDto);
    if (!this.handleValidations()) {
      return;
    }
    debugger;
    const serviceCall = this.leaveDto.id
      ? this._leavesService.edit(this.leaveDto)
      : this._leavesService.create(this.leaveDto);

    serviceCall
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
          const message = this.leaveDto.id
            ? "Updated successfully"
            : "Saved Successfully";
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: message,
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.dialogVisibility = false;
        },
      });
  }

  // Function to call API and generate dynamic grid configuration
  checkLeaves() {
    this._leavesService
      .createCheckLeaves(this.leaveDto.employeeERPId, this.financialYearId)
      .subscribe((response: any) => {
        if (response.result) {
          const data = response.result;
          this.colDefs = data.map((leave) => ({
            headerName: leave.leaveTypeName,
            field: leave.leaveTypeName.replace(/\s+/g, "_").toLowerCase(),
            editable: false,
            resizable: true,
          }));
          const maxRows = Math.max(
            ...data.map((leave) => leave.dateTimes.length)
          );
          this.rowData = Array.from({ length: maxRows }, () => ({}));
          data.forEach((leave) => {
            leave.dateTimes.forEach((date, index) => {
              this.rowData[index][
                leave.leaveTypeName.replace(/\s+/g, "_").toLowerCase()
              ] = date;
            });
          });
        } else {
          this.rowData = [];
        }
      });
  }
  handleValidations() {
    debugger;
    if (!this.leaveDto.documentDate) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Document Date",
      });
      return false;
    }
    if (!this.leaveDto.voucherNumber) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Voucher Number",
      });
      return false;
    }
    if (!this.leaveDto.employeeERPId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Employee ID",
      });
      return false;
    }
    if (!this.leaveDto.leaveStartDate) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Leave Start Date",
      });
      return false;
    }
    if (!this.leaveDto.leaveEndDate) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Leave End Date",
      });
      return false;
    }
    if (!this.leaveDto.compensatoryLeaveAvailed) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Compensatory Leave Availed Date",
      });
      return false;
    }
    if (!this.leaveDto.employeeLeaveTypeId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Employee Leave Type ID",
      });
      return false;
    }
    if (!this.leaveDto.departmentLeaveTypeId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Recommended by Leave Type ID",
      });
      return false;
    }
    if (!this.leaveDto.approvedLeaveTypeId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Approved Leave Type ID",
      });
      return false;
    }
    if (!this.leaveDto.reasonForLeave) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Reason for Leave",
      });
      return false;
    }
    if (!this.leaveDto.recommendedByERPId) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Recommended By Employee ID",
      });
      return false;
    }
    if (!this.leaveDto.comments) {
      this.messageService.add({
        severity: "warn",
        summary: "Required",
        detail: "Please Enter Comments",
      });
      return false;
    }
    return true;
  }

  setPickersValue(value: any, target: string) {
    switch (target) {
      case "Employee":
        debugger;
        this.leaveDto.employeeERPId = value.id;
        this.leaveDto.employeeName = value.name;
        this.leaveDto.employeeId = value.additional;
        this.getEmployeeDetails();
        this.checkLeaves();
        break;
      case "RecEmployee":
        debugger;
        this.leaveDto.recommendedByERPId = value.id;
        this.leaveDto.recomendedByName = value.name;
        break;
      case "FinancialYear":
        debugger;
        this.financialYearId = value.id;
        this.financialYearName = value.name;
        this.checkLeaves();
        break;
      case "ApprovedLeaveType":
        this.leaveDto.approvedLeaveTypeId = value.id;
        break;
      case "EmpLeaveType":
        this.leaveDto.employeeLeaveTypeId = value.id;
        break;
      case "DeptLeaveType":
        this.leaveDto.departmentLeaveTypeId = value.id;
        break;
      case "Location":
        this.locationId = value.id;
        break;
      case "CostCenter":
        this.costCenterId = value.id;
        break;
      case "Project":
        this.projectId = value.id;
        break;
      case "Department":
        this.departmentId = value.id;
        break;
      case "LocationForVN":
        this.leaveDto.userLocationId = +value.id;
        this.leaveDto.userLocationName = value.name;
        this.GetDocMaxCount("LeaveManagement");
        break;

      default:
        alert(`${target} not found`);
        break;
    }
  }
  getEmployeeDetails() {
    debugger;
    this._employeeService
      .getEmpDetais(this.leaveDto.employeeERPId)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
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
      .subscribe((result) => {
        debugger;
        this.probationStartDate = new Date(result["probationStartDate"]);
        this.probationEndDate = new Date(result["probationEndDate"]);
        this.joiningDate = new Date(result["joiningDate"]);
        this.costCenterId = result["costCenterId"];
        this.costCenterName = result["costCenterName"];
        this.projectId = result["projectId"];
        this.projectName = result["projectName"];
        this.departmentId = result["departmentId"];
        this.departmentName = result["departmentName"];
        this.locationId = result["locationId"];
        this.locationName = result["locationName"];
      });
  }
  leaveDateChange(event: any, start: boolean) {
    if (start) {
      this.leaveDto.leaveStartDate = event;
    } else {
      this.leaveDto.leaveEndDate = event;
    }
    const startDate = new Date(this.leaveDto.leaveStartDate);
    const endDate = new Date(
      this.leaveDto.leaveEndDate !== undefined
        ? this.leaveDto.leaveEndDate
        : this.leaveDto.leaveStartDate
    );
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    this.leaveDto.numberOfDays = dayDiff;
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.leaveDto.documentDate = value;
    }
    if (this.leaveDto.userLocationId && this.leaveDto.documentDate) {
      this.GetDocMaxCount("LeaveManagement");
    }
  }
  MakeVoucher() {
    debugger;

    if (this.leaveDto.userLocationId && this.documentNumber) {
      this.leaveDto.voucherNumber =
        "LM-HNL" +
        "-" +
        this.leaveDto.userLocationId +
        "-" +
        this.leaveDto.documentDate.getFullYear() +
        "-" +
        (this.leaveDto.documentDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("LeaveManagement");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._leavesService
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
          this.leaveDto.userLocationName = response.items[0].name;
          this.leaveDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("LeaveManagement");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (this.leaveDto.userLocationId && this.leaveDto.documentDate) {
      this._leavesService
        .GetDocMaxCount(
          target,
          this.leaveDto.userLocationId,
          this.leaveDto.documentDate
        )
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
            this.documentNumber = response;
            this.MakeVoucher();
          },
        });
    }
  }

  Approve(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._leavesService
          .approve(id)
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
  loadFinancialYears() {
    debugger;
    const storedFinancialYears = localStorage.getItem("FinancialYearObject");
    if (storedFinancialYears) {
      this.financialYears = JSON.parse(storedFinancialYears);
      // console.log('Loaded Financial Years:', this.financialYears);
      this.financialYearId = this.financialYears.id;
    } else {
      // console.error('No financial years found in local storage');
      this._authService.logout();
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.dialogVisibility = false;
      },
      reject: () => {
        this.dialogVisibility = true;
      },
    });
  }
}
