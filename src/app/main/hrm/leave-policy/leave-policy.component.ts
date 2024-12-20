import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { LeavePolicyService } from "../shared/services/leave-policy.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { LeavePolicy } from "../shared/DTOs/leave-policy";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
@Component({
  selector: "app-leave-policy",
  templateUrl: "./leave-policy.component.html",
})
export class LeavePolicyComponent extends AppComponentBase implements OnInit {
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  suggestionModalRef: BsModalRef;
  permissions: PermissionsDto;
  loading: boolean;
  data!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  isViewMode: boolean;
  dialogVisibility: boolean;
  createMode: boolean;
  saving: boolean = false;
  view: boolean;
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  rowData: any[] = [];
  today: Date = new Date();
  protected setParms;

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      width: 80,
    },
    {
      headerName: "Leave ID",
      editable: false,
      field: "leaveTypeId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addLeave",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Leave Type Title",
      editable: false,
      field: "leaveTypeName",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Available",
      field: "allowedCount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: "Max Available per Month",
      field: "maxAvailableMonthly",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: "Unit",
      field: "unit",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Days", "Weeks"],
      },
    },
    {
      headerName: "Limit",
      field: "isLimited",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Yes", "No"],
      },
    },
    {
      headerName: "Max Available",
      field: "maxAvailableFor",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: "Encash After Leaves",
      field: "encashmentAfterLeaved",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: "Allow Encashment",
      field: "encashmentAllow",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Yes", "No"],
      },
    },
  ];

  leavePolicyDto: LeavePolicy = new LeavePolicy();
  target: string;

  constructor(
    injector: Injector,
    private _leavePolicyService: LeavePolicyService,
    private messageService: MessageService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("LeavePolicy");
    this.getAll();
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
    this._leavePolicyService
      .getAll("LeavePolicy", this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }

  openModal(id?: number) {
    debugger;
    this.dialogVisibility = true;
    if (id) {
      this._leavePolicyService
        .getDataForEdit(id)
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
            this.leavePolicyDto = response;
            this.leavePolicyDto.issueDate = new Date(response.issueDate);
            this.leavePolicyDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.rowData = response.leavePolicyDetails.map((detail) => {
              return {
                ...detail,
                isLimited: detail.isLimited ? "Yes" : "No",
                encashmentAllow: detail.encashmentAllow ? "Yes" : "No",
              };
            });
            this.leavePolicyDto.title = response.title;
            this.leavePolicyDto.voucherNumber = response.voucherNumber;
          },
        });
    } else {
      this.rowData = [];
      this.leavePolicyDto = new LeavePolicy();
      this.leavePolicyDto.issueDate = this.today;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.createMode = true;
      this.isEditMode = true;
      this.view = false;
    }
  }

  getAll() {
    debugger;
    this._leavePolicyService
      .getAll("LeavePolicy", this.skipCount, this.maxCount)
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
          this.leavePolicyDto = new LeavePolicy();
        },
      });
  }

  create() {
    debugger;
    this.saving = true;
    let tempArray = [];

    if (this.gridApi) {
      this.gridApi.forEachNode((node) => {
        tempArray.push(node.data);
      });
    }

    // Convert "Yes"/"No" to boolean (true/false) for isLimited field
    this.rowData = tempArray.map((row) => {
      if (row.isLimited === "Yes") {
        row.isLimited = true;
      } else if (row.isLimited === "No") {
        row.isLimited = false;
      }
      if (row.encashmentAllow === "Yes") {
        row.encashmentAllow = true;
      } else if (row.encashmentAllow === "No") {
        row.encashmentAllow = false;
      }
      return row;
    });

    this.leavePolicyDto.leavePolicyDetails = this.rowData;

    if (!this.createMode) {
      this._leavePolicyService
        .edit(this.leavePolicyDto)
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
              detail: "Updated Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
          },
        });
    } else {
      this._leavePolicyService
        .create(this.leavePolicyDto)
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
              detail: "Saved Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
          },
        });
    }
  }

  //   handleValidations() {
  //     if (!this.leavePolicyDto.leavePolicyTypeId) {
  //       this.messageService.add({
  //         severity: "warn",
  //         summary: "Required",
  //         detail: "Please Enter Leave Type"
  //       });
  //       return false;
  //     }
  //     return true
  //   }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._leavePolicyService
          .delete(id)
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

  // Grid

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }
  onAddRow() {
    const newItem: any = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        newItem[colDef.field] = null;
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addLeave":
        this.setParms = params;
        this.openSelectLeaveType();
        break;
      default:
        break;
    }
  }

  openSelectLeaveType() {
    debugger;
    this.target = "LeaveType";
    const initialState: any = {
      target: this.target,
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.leaveTypeId = +result.id;
      this.setParms.data.leaveTypeName = result.name;
      this.gridApi.refreshCells();
    });
  }

  // Pickers

  // setPickerValue(value: any, title: string) {
  //     switch (title) {
  //         case "LeavePolicy":
  //             this.leavePolicyDto.leavePolicyTypeId = +value.id;
  //             break;
  //         case "Department":
  //             this.leavePolicyDto.departmentId = +value.id;
  //             break;
  //         case "Designation":
  //             this.leavePolicyDto.designationId = +value.id;
  //             break;
  //         case "Grade":
  //             this.leavePolicyDto.gradeId = +value.id;
  //             break;
  //         default:
  //             alert(`${title} is not defined`)
  //     }
  // }

  // handleLeavePolicySelection(value: any, controlID1: string, controlName1: string) {
  //     debugger
  //     this.leavePolicyDto.leavePolicyTypeId = +value.id;
  //     this.leavePolicyDto.leavePolicyTypeName = value.name;
  // }

  // handleDepartmentSelection(value: any, controlID1: string, controlName1: string) {
  //     debugger
  //     this.leavePolicyDto.departmentId = +value.id;
  //     this.leavePolicyDto.departmentName = value.name;
  // }
  // handleDesignationSelection(value: any, controlID1: string, controlName1: string) {
  //     debugger
  //     this.leavePolicyDto.designationId = +value.id;
  //     this.leavePolicyDto.designationName = value.name;
  // }
  // handleGradeSelection(value: any, controlID1: string, controlName1: string) {
  //     debugger
  //     this.leavePolicyDto.gradeId = +value.id;
  //     this.leavePolicyDto.gradeName = value.name;
  // }
  // handleEmpTypeSelection(value: any, controlID1: string, controlName1: string) {
  //     debugger
  //     this.leavePolicyDto.empTypeId = +value.id;
  //     this.leavePolicyDto.empTypeName = value.name;
  // }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.leavePolicyDto.userLocationId = value.id;
        this.leavePolicyDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      default:
        alert(`${title} is not defined`);
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
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.leavePolicyDto.issueDate = value;
    }
    if (this.leavePolicyDto.userLocationId && this.leavePolicyDto.issueDate) {
      this.getVoucherNumber();
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._leavePolicyService
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
          this.leavePolicyDto.userLocationName = response.items[0].name;
          this.leavePolicyDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._leavePolicyService
      .getVoucherNumber(
        "LeavePolicy",
        "LP",
        this.leavePolicyDto.issueDate,
        this.leavePolicyDto.userLocationId
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
          this.leavePolicyDto.voucherNumber = response;
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
    this.openModal(id);
  }
  viewOnly(id?: number) {
    this.view = true;
    this.isEditMode = false;
    this.openModal(id);
  }
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._leavePolicyService
          .approveDocument(id, "LeavePolicy")
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
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._leavePolicyService
      .getAll("LeavePolicy", this.skipCount, this.maxCount, inputValue)
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
