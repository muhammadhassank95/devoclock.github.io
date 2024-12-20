import { Component, OnInit, Injector } from "@angular/core";
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  CellValueChangedEvent,
} from "ag-grid-community";
import { ConfirmationService, MessageService } from "primeng/api";
import { AnnualLEDto } from "../../shared/DTOs/policies-dto";
import { PoliciesService } from "../../shared/services/policies.service";
import { catchError, finalize, throwError } from "rxjs";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-annual-le",
  templateUrl: "./annual-le.component.html",
})
export class AnnualLEComponent extends AppComponentBase implements OnInit {
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  protected setParms;
  displayModal: boolean;
  data: any;
  rowData: any;
  encash: any;
  carryForward: any;
  count: number;
  saving: boolean;
  loading: boolean;
  skipCount: number = 0;
  maxCount: number = 10;
  currentPage: number = 1;
  annualLEDto: AnnualLEDto = new AnnualLEDto();
  permissions: PermissionsDto;

  constructor(
    injector: Injector,
    private _policiesService: PoliciesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    super(injector);
  }

  openCreateModal() {
    this.displayModal = true;
  }

  colDefs: ColDef[] = [
    {
      headerName: "ID",
      editable: false,
      field: "erpId",
      suppressSizeToFit: true,
      width: 80,
    },
    {
      headerName: "EmpTitle",
      editable: false,
      field: "employeeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Department",
      editable: false,
      field: "departmentName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Designation",
      editable: false,
      field: "designationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "JoinDate",
      editable: false,
      field: "joiningDate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Availed",
      editable: false,
      field: "availed",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Allowed",
      editable: false,
      field: "allowed",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Available",
      editable: false,
      field: "available",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Encashed",
      editable: true,
      field: "encash",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Carry Forward",
      editable: true,
      field: "carryForward",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  ngOnInit(): void {
    this.permissions = new PermissionsDto("AnnualLeaveEncashment");
    this.getAll();
  }

  getAll() {
    debugger;
    this._policiesService
      .getAll("AnnualLeaveEncashment", this.skipCount, this.maxCount)
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

  onGridReady(params: GridReadyEvent) {
    this.rowData = [];
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.annualLEDto.locationId = value.id;
        this.annualLEDto.locationName = value.name;
        break;
      case "Project":
        this.annualLEDto.projectId = value.id;
        this.annualLEDto.projectName = value.name;
        break;
      case "CostCenter":
        this.annualLEDto.costCenterId = value.id;
        this.annualLEDto.costCenterName = value.name;
        break;
      case "FinancialYear":
        this.annualLEDto.financialYearId = value.id;
        this.annualLEDto.financialYearName = value.name;
        break;
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
          .delete(id, "AnnualLeaveEncashmentPolicy")
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

  Generate() {
    this._policiesService
      .getLeaveEncashmentDocument(
        this.annualLEDto.financialYearId,
        this.annualLEDto.locationId,
        this.annualLEDto.projectId,
        this.annualLEDto.costCenterId
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
          this.rowData = response.details;
          this.encash = response.encash;
          this.carryForward = response.carryForwad;
        },
      });
  }

  save() {
    this.saving = true;
    this.annualLEDto.subDetails = this.rowData.map((item) => {
      return {
        employeeId: item.employeeId,
        allowed: item.allowed,
        available: item.available,
        availed: item.availed,
        encash: item.encash,
        carryForward: item.carryForward,
        totalAmount: +item.encash + +item.carryForward,
      };
    });
    debugger;
    if (!this.annualLEDto.voucherNumber) {
      this.messageService.add({
        severity: "warn",
        detail: "Voucher is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.annualLEDto.documentDate) {
      this.messageService.add({
        severity: "warn",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.annualLEDto.financialYearId) {
      this.messageService.add({
        severity: "warn",
        detail: "Financial Year is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      !this.annualLEDto.subDetails ||
      this.annualLEDto.subDetails.length < 1
    ) {
      this.messageService.add({
        severity: "warn",
        detail: "Details are Missing",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    this._policiesService
      .SubmitLeaveEncashDoc(this.annualLEDto)
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
          this.displayModal = false;
          this.saving = false;
          this.getAll();
        },
      });
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    const colId = event.colDef.field;
    if (colId === "encash" || colId === "carryForward") {
      if (
        (colId === "encash" && event.newValue > this.encash) ||
        (colId === "carryForward" && event.newValue > this.carryForward)
      ) {
        this.messageService.add({
          severity: "error",
          summary: "Validation Error",
          detail: `The value for ${colId} must be less than or equal to ${
            colId === "encash" ? this.encash : this.carryForward
          }`,
          life: 2000,
        });

        event.node.setDataValue(colId, event.oldValue);
      } else {
        const encashValue = event.data.encash || 0;
        const carryForwardValue = event.data.carryForward || 0;
        const totalAmount = +encashValue + +carryForwardValue;
        event.node.setDataValue("totalAmount", totalAmount);
      }
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
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._policiesService
      .getAll("AnnualLeaveEncashment", this.skipCount, this.maxCount)
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
