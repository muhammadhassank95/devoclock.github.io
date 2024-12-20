import { Component } from "@angular/core";
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  CellEditingStoppedEvent,
  CellValueChangedEvent,
} from "ag-grid-community";
import { time } from "console";
import { ConfirmationService, MessageService } from "primeng/api";
import { AttendanceRegisterService } from "../shared/services/attendance-register.service";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { MarkAttendanceDto } from "../shared/DTOs/attendance-dto";
import * as moment from "moment";
import { LeaveManagement } from "../shared/DTOs/leave-management";
import { LeaveManagementService } from "../shared/services/leave-management.service";
import { Moment } from "moment";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-attendance-register",
  templateUrl: "./attendance-register.component.html",
})
export class AttendanceRegisterComponent {
  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  isViewMode: boolean;
  dialogVisibility: boolean;
  SalaryMonth: Date;
  StartDate: Date;
  EndDate: Date;
  saving: boolean = false;
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  protected setParms;
  attendanceDate: Date;
  sDate: Date | string;
  eDate: Date | string;
  EmployeeId: number;
  EmployeeName: number;
  ProjectId: number;
  ProjectName: string;
  LocationId: number;
  LocationName: string;
  EmployeeForSearch: string;
  rowData: any = [];
  maxDate: Date = new Date();
  markAttendanceDto: MarkAttendanceDto = new MarkAttendanceDto();
  leaveDto: LeaveManagement = new LeaveManagement();
  attendanceDateRange: Date;
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  projectDropdown: any[] = [];
  projectSelectedItem: any;
  employeeDropdown: any[] = [];
  employeeSelectedItem: any;

  constructor(
    private _attendanceService: AttendanceRegisterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _leavesService: LeaveManagementService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}

  ngOnInit(): void {
    // this.getAll();
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.projectDropdown = items));
    this.fetchDropdownData('Employee').subscribe((items) => (this.employeeDropdown = items));
  }

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
    const value = event.value;
    switch (type) {
      case "Location":
        this.LocationId = value.id;
        break;
      case "Project":
        this.ProjectId = +value.id;
        break;
      case "Employee":
        debugger;
        this.EmployeeId = +value.id;
        this.EmployeeName = value.name;
        this.EmployeeForSearch = value.additional;
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  getAll() {
    debugger;
    this._attendanceService
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
          this.checkStatus(response);
        },
      });
  }

  checkStatus(response) {
    this.data = response.attendanceDetails;
    debugger;
    this.data.map((item) => {
      if (!item.checkIn_Time) {
        item.status = "A";
      } else {
        item.status = "P";
      }
    });
    this.count = response.totalCount;
  }

  markAttendance() {
    const currentDate = new Date(); // Get the current date
    // Parse the given date string to a Date object
    const parsedDate = new Date(Date.parse(this.setParms.data.attendanceDate));
    if (parsedDate > currentDate) {
      this.messageService.add({
        severity: "warn", // Use "warn" to display a warning
        summary: "Warning",
        detail: "Future date attendance is not allowed.",
        life: 2000,
      });
      return;
    }
    this._attendanceService
      .MarkAttendance(this.setParms.data)
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
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Marked Successfully",
            life: 2000,
          });
          this.Search();
        },
      });
  }

  colDefs: ColDef[] = [
    {
      headerName: "ID",
      editable: false,
      field: "erpId",
      filter: "agTextColumnFilter",
      suppressSizeToFit: true,
      resizable: true,
    },
    {
      headerName: "Name",
      editable: false,
      field: "employeeName",
      filter: "agTextColumnFilter",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Check In (00:00 AM/PM)",
      field: "checkIn_Time",
      editable: true,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Check Out (00:00 AM/PM)",
      editable: true,
      field: "checkOut_Time",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Status",
      editable: true,
      field: "status",
      sortable: true,
      resizable: true,
      cellEditor: "agSelectCellEditor",
      suppressSizeToFit: true,
      filter: "agTextColumnFilter",
      cellEditorParams: {
        values: ["P", "A"],
      },
    },
    {
      headerName: "Attendance Date",
      editable: false,
      field: "attendanceDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Action",
      editable: false,
      field: "action",
      sortable: true,
      resizable: true,
      cellRenderer: this.saveButtonRender,
      suppressSizeToFit: true,
    },

    {
      headerName: "locationName",
      editable: false,
      field: "locationName",
      filter: "agTextColumnFilter",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "projectName",
      editable: false,
      field: "projectName",
      filter: "agTextColumnFilter",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "CostCenter",
      editable: false,
      field: "costCenterName",
      filter: "agTextColumnFilter",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Leave",
    //   editable: false,
    //   width: 80,
    //   field: "apply",
    //   sortable: true,
    //   resizable: true,
    //   cellRenderer: this.applyButtonRender,
    //   suppressSizeToFit: true,
    // },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "action":
        this.setParms = params;
        this.markAttendance();
        break;
      case "apply":
        this.setParms = params;
        this.applyLeave();
        break;
      default:
        break;
    }
  }

  saveButtonRender(params): HTMLElement {
    const button = document.createElement("button");
    button.innerHTML = "Save";
    // Apply inline styles for size modification
    button.style.height = "25px"; // Adjust height
    button.style.width = "80px"; // Adjust width
    button.style.fontSize = "12px"; // Adjust font size
    button.style.textAlign = "center"; // Adjust font size
    button.style.justifyContent = "center"; // Adjust font size
    button.style.alignItems = "center"; // Adjust font size
    button.style.border = "1px solid black"; // Adjust padding

    return button;
  }
  applyButtonRender(params): HTMLElement {
    const button = document.createElement("button");
    button.innerHTML = "Apply";

    return button;
  }

  Search() {
    if (this.attendanceDateRange) {
      this.sDate = this.attendanceDateRange;
      this.eDate = this.attendanceDateRange;

      if (!this.EmployeeId) {
        this.EmployeeForSearch = "";
      } else {
        const givenDate = moment(this.attendanceDateRange);
        this.sDate = givenDate.startOf("month").format("yy-MM-DD");
        this.eDate = this.attendanceDateRange;
      }
    }
    if (!this.EmployeeId) {
      this.EmployeeForSearch = "";
    }

    this._attendanceService
      .getAll(
        this.sDate,
        this.eDate,
        this.ProjectId,
        this.LocationId,
        this.EmployeeForSearch
      )
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
          this.checkStatus(response);
        },
      });
    // } else {
    //   alert("Date is required");
    // }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.LocationId = value.id;
        break;
      case "Project":
        this.ProjectId = +value.id;
        break;
      case "Employee":
        debugger;
        this.EmployeeId = +value.id;
        this.EmployeeName = value.name;
        this.EmployeeForSearch = value.additional;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  applyLeave() {
    debugger;
    console.log(this.setParms.data);
    this.leaveDto = new LeaveManagement();
    this.rowData = [];
    this.dialogVisibility = true;
  }

  // onCellEditingStopped(event: CellEditingStoppedEvent) {
  //   debugger;
  //   const data = event.data;

  //   // Validation function for time
  //   const validateTimeFormat = (time: string): string => {
  //     const isValid = moment(time, 'hh:mm A', true).isValid();
  //     return isValid ? moment(time, 'hh:mm A').format('hh:mm:ss A') : null;
  //   };

  //   // Validate and format checkIn_Time
  //   const formattedCheckInTime = validateTimeFormat(data.checkIn_Time);
  //   if (formattedCheckInTime) {
  //     data.checkIn_Time = formattedCheckInTime;
  //   } else {
  //     console.error("Invalid Check In Time format");
  //     data.checkIn_Time = ''; // Reset to empty string if invalid
  //   }

  //   // Validate and format checkOut_Time
  //   const formattedCheckOutTime = validateTimeFormat(data.checkOut_Time);
  //   if (formattedCheckOutTime) {
  //     data.checkOut_Time = formattedCheckOutTime;
  //   } else {
  //     console.error("Invalid Check Out Time format");
  //     data.checkOut_Time = ''; // Reset to empty string if invalid
  //   }

  //   console.log("DATA", data);
  //   this.gridApi.refreshCells({ rowNodes: [event.node] });
  // }

  // onCellEditingStopped(event: CellEditingStoppedEvent) {
  //     debugger;
  //     const data = event.data;

  //     const regex = /^(0[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?(\s)?(AM|PM)$/i;

  //     const clearCellValue = (fieldName: string) => {
  //         data[fieldName] = ''; // Clear the cell value
  //         this.gridApi.refreshCells({ rowNodes: [event.node], force: true }); // Refresh the cell to reflect the change
  //     };

  //     if (!regex.test(data.checkIn_Time)) {
  //         this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Invalid Check In Time format', life: 2000 });
  //         clearCellValue('checkIn_Time');
  //     }

  //     if (!regex.test(data.checkOut_Time)) {
  //         this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Invalid Check Out Time format', life: 2000 });
  //         clearCellValue('checkOut_Time');
  //     }
  // }

  // onCellValueChanged(event: CellValueChangedEvent) {
  //   const data = event.data;
  //   const regex = /^(0[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?(\s)?(AM|PM)$/i;

  //   const clearCellValue = (fieldName: string) => {
  //     data[fieldName] = ""; // Clear the cell value
  //     this.gridApi.refreshCells({ rowNodes: [event.node], force: true }); // Refresh the cell to reflect the change
  //   };

  //   const convertTo24Hour = (time: string): number => {
  //     const [timePart, modifier] = time.split(/\s+/);
  //     let [hours, minutes] = timePart.split(":");

  //     if (hours === "12") {
  //       hours = "00";
  //     }

  //     if (modifier === "PM") {
  //       hours = parseInt(hours, 10) + 12 + "";
  //     }

  //     return parseInt(hours + minutes, 10);
  //   };

  //   if (
  //     event.colDef.field === "checkIn_Time" &&
  //     !regex.test(data.checkIn_Time)
  //   ) {
  //     this.messageService.add({
  //       severity: "warn",
  //       summary: "Invalid",
  //       detail: "Invalid Check In Time format",
  //       life: 2000,
  //     });
  //     clearCellValue("checkIn_Time");
  //   }

  //   if (
  //     event.colDef.field === "checkOut_Time" &&
  //     !regex.test(data.checkOut_Time)
  //   ) {
  //     this.messageService.add({
  //       severity: "warn",
  //       summary: "Invalid",
  //       detail: "Invalid Check Out Time format",
  //       life: 2000,
  //     });
  //     clearCellValue("checkOut_Time");
  //   }

  //   // Check if both times are valid before comparing
  //   if (regex.test(data.checkIn_Time) && regex.test(data.checkOut_Time)) {
  //     const checkInTime = convertTo24Hour(data.checkIn_Time);
  //     const checkOutTime = convertTo24Hour(data.checkOut_Time);

  //     if (checkOutTime <= checkInTime) {
  //       this.messageService.add({
  //         severity: "warn",
  //         summary: "Invalid",
  //         detail: "Check Out Time must be greater than Check In Time",
  //         life: 2000,
  //       });
  //       clearCellValue("checkOut_Time");
  //     }
  //   }
  // }

  onCellValueChanged(event: CellValueChangedEvent) {
    debugger;
    const data = event.data;
    const regex = /^(0[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?(\s)?(AM|PM)$/i;

    const clearCellValue = (fieldName: string) => {
      data[fieldName] = ""; // Clear the cell value
      this.gridApi.refreshCells({ rowNodes: [event.node], force: true }); // Refresh the cell to reflect the change
    };

    const convertTo24Hour = (time: string): number => {
      const [timePart, modifier] = time.split(/\s+/);
      let [hours, minutes] = timePart.split(":");

      if (hours === "12") {
        hours = "00";
      }

      if (modifier === "PM") {
        hours = parseInt(hours, 10) + 12 + "";
      }

      return parseInt(hours + minutes, 10);
    };

    if (
      event.colDef.field === "checkIn_Time" &&
      !regex.test(data.checkIn_Time)
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Invalid",
        detail: "Invalid Check In Time format",
        life: 2000,
      });
      clearCellValue("checkIn_Time");
    }

    if (
      event.colDef.field === "checkOut_Time" &&
      !regex.test(data.checkOut_Time)
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Invalid",
        detail: "Invalid Check Out Time format",
        life: 2000,
      });
      clearCellValue("checkOut_Time");
    }

    // Check if both times are valid before comparing
    if (regex.test(data.checkIn_Time) && regex.test(data.checkOut_Time)) {
      const checkInTime = convertTo24Hour(data.checkIn_Time);
      const checkOutTime = convertTo24Hour(data.checkOut_Time);

      if (checkOutTime <= checkInTime) {
        this.messageService.add({
          severity: "warn",
          summary: "Invalid",
          detail: "Check Out Time must be greater than Check In Time",
          life: 2000,
        });
        clearCellValue("checkOut_Time");
      }
    }

    if (event.colDef.field === "status") {
      // Call the API to get shift details
      this._attendanceService
        .getEmployeeShift(data.employeeId)
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
            if (data.status === "P") {
              data.checkIn_Time = response.inTime;
              data.checkOut_Time = response.outTime;
            } else if (data.status === "A") {
              data.checkIn_Time = "";
              data.checkOut_Time = "";
            }
            this.gridApi.refreshCells({ rowNodes: [event.node], force: true });
          },
        });
    }
  }

  setPickersValue(value: any, target: string) {
    switch (target) {
      case "Employee":
        this.leaveDto.employeeERPId = value.id;
        this.checkLeaves(value.id);
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
      case "RecEmployee":
        this.leaveDto.recommendedByERPId = value.id;
        break;

      default:
        alert(`${target} not found`);
        break;
    }
  }

  leaveDateChange(event: any, start: boolean) {
    debugger;
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
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    this.leaveDto.numberOfDays = dayDiff;
  }

  create() {
    debugger;
    this.isViewMode = false;
    // this.dialogVisibility = false;
    this.saving = true;

    if (!this.handleValidations()) {
      this.saving = false;
      return;
    }

    this._leavesService
      .create(this.leaveDto)
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
          this.dialogVisibility = false;
        },
      });
  }

  handleValidations() {
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

  colDefs2: ColDef[] = [
    {
      headerName: "Leave Type",
      field: "leaveType",
      editable: false,
    },
    {
      headerName: "Remaining",
      field: "remaining",
      editable: false,
    },
    {
      headerName: "Total",
      field: "total",
      editable: false,
    },
  ];

  checkLeaves(Id: any) {
    debugger;
    this._leavesService.createCheckLeaves(Id, 0).subscribe((response: any) => {
      debugger;
      if (response.result) {
        debugger;
        this.rowData = Object.keys(response.result).map((leaveType) => {
          const [remaining, total] = response.result[leaveType].split("/");
          return {
            leaveType: leaveType.trim(),
            remaining: parseInt(remaining),
            total: parseInt(total),
          };
        });
      } else {
        this.rowData = [];
      }
    });
  }

  attendanceDateChange(value: Date) {
    debugger;
    this.SalaryMonth = value;

    const year = value.getFullYear();
    const month = value.getMonth();

    this.StartDate = new Date(year, month, 1);

    this.EndDate = new Date(year, month + 1, 0);
  }

  GetShiftDetails() {
    if (!this.markAttendanceDto.ERPId) {
      return;
    }
    this._attendanceService
      .getEmployeeShift(this.markAttendanceDto.ERPId)
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
          this.markAttendanceDto = response.result;
        },
      });
  }
}
