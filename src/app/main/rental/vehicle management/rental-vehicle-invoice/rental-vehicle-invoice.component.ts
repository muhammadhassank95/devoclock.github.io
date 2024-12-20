import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RentalService } from "../../shared/services/rental.service";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import * as moment from "moment";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../../budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../../../budget/shared/services/restriction.service";

@Component({
  selector: "app-rental-vehicle-invoice",
  templateUrl: "./rental-vehicle-invoice.component.html",
})
export class RentalVehicleInvoiceComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  editMode: boolean;
  viewMode: boolean;
  displayModal: boolean;
  target: string = "VehicleInvoice";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  saving: boolean;
  loading: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  dto = {
    DocOrVocNumber: "",
  };
  showSupplierDetails = false;
  dataForEdit: any;
  employeeErpId: number;
  vehicleattendanceform: FormGroup;
  documentNumber: number;
  minDate: Date = new Date();
  rowSelection: string;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowData: any;
  constructor(
    private fb: FormBuilder,
    private _rentalService: RentalService,
    private _restrictionService: RestrictionService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.vehicleattendanceform = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      attendanceMonth: ["", Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      totalAmount: [{ value: "", disabled: true }],
      indexes: [[]],
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("RVI");
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Location":
        debugger;
        this.vehicleattendanceform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.employeeErpId = value.id;
        this.GetDocMaxCount("VehicleInvoice");
        break;
      case "CostCenter":
        this.vehicleattendanceform.patchValue({
          costCenterId: +value.id,
          costCenterName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  getAll(skipCount: number = this.skipCount, maxCount: number = this.maxCount) {
    this._rentalService
      .getAll(this.target)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
  show(id?: number) {
    if (id) {
      this._rentalService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            debugger;
            this.msgService.add({
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
            this.dataForEdit = response;
            this.vehicleattendanceform
              .get("attendanceMonth")
              ?.setValue(new Date(this.dataForEdit.attendanceMonth));
            this.vehicleattendanceform
              .get("userLocationId")
              ?.setValue(this.dataForEdit.userLocationId);
            this.vehicleattendanceform
              .get("userLocationName")
              ?.setValue(this.dataForEdit.userLocationName);
            this.vehicleattendanceform
              .get("issueDate")
              ?.setValue(new Date(this.dataForEdit.issueDate));
            this.vehicleattendanceform
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.vehicleattendanceform
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.rowData = this.dataForEdit.vehicleInvoiceDetails;
            this.calculateTotalAmount();
            this.displayModal = true;
          },
        });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.msgService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      debugger;
      this.getDefaultLocation(
        "Location",
        "userLocationName",
        "userLocationId",
        ""
      );
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.displayModal = true;
      this.vehicleattendanceform.reset();
      this.vehicleattendanceform.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.vehicleattendanceform.get("isActive")?.setValue(true);
      this.vehicleattendanceform.get("issueDate").setValue(this.today);
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.vehicleattendanceform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    const indexes = this.rowData.map((row) => row.index);
    const formData = {
      ...this.vehicleattendanceform.value,
      indexes,
    };
    delete formData.totalAmount;
    this._rentalService
      .create(formData, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
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
    const indexes = this.rowData.map((row) => row.index);
    const updateData = {
      ...this.vehicleattendanceform.value,
      id: this.dataForEdit.id,
      indexes,
    };
    this._rentalService
      .update(updateData, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.msgService.add({
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

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService
          .delete(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.msgService.add({
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
                this.msgService.add({
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
  isFieldInvalid(field: string): boolean {
    const control = this.vehicleattendanceform.get(field);
    return control ? control.invalid && control.touched : false;
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.vehicleattendanceform.value.issueDate = value;
    }
    if (
      this.vehicleattendanceform.value.userLocationId &&
      this.vehicleattendanceform.value.issueDate
    ) {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  MakeVoucher() {
    debugger;

    if (
      this.vehicleattendanceform.value.userLocationId &&
      this.documentNumber
    ) {
      const voucherNumber =
        "RVI-HNL" +
        "-" +
        this.vehicleattendanceform.value.userLocationId +
        "-" +
        this.vehicleattendanceform.value.issueDate.getFullYear() +
        "-" +
        (this.vehicleattendanceform.value.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
      this.vehicleattendanceform.get("voucherNumber").setValue(voucherNumber);
    } else {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._rentalService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
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
          this.vehicleattendanceform
            .get("userLocationName")
            .setValue(response.items[0].name);
          this.vehicleattendanceform
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.GetDocMaxCount("VehicleInvoice");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.vehicleattendanceform.value.userLocationId &&
      this.vehicleattendanceform.value.issueDate
    ) {
      this._rentalService
        .GetDocMaxCount(
          target,
          this.vehicleattendanceform.value.userLocationId,
          this.vehicleattendanceform.value.issueDate
        )
        .pipe(
          finalize(() => {}),
          catchError((error) => {
            this.msgService.add({
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
  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Id",
      editable: false,
      field: "vehicleId",
      resizable: true,
      width: 120,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Id",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      width: 350,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Location Id",
    //   editable: false,
    //   field: "locationId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 300,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "CostCenter Id",
    //   editable: false,
    //   field: "costCenterId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "CostCenter Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Project Id",
    //   editable: false,
    //   field: "projectId",
    //   resizable: true,
    //   width: 150,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   width: 200,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "CostCenter Id",
    //   editable: false,
    //   field: "costCenterId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "CostCenter Title",
    //   editable: false,
    //   field: "costCenterName",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Project Id",
    //   editable: false,
    //   field: "projectId",
    //   width: 200,
    // },
    // {
    //   headerName: "Project Title",
    //   editable: false,
    //   field: "projectName",
    //   width: 200,
    // },
    {
      headerName: "Contract Type",
      editable: false,
      field: "rentalContractTypeTitle",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Contract Voucher No",
      editable: false,
      field: "contractVoucherNumber",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Supplier Id",
    //   editable: false,
    //   field: "supplierId",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Supplier Title",
    //   editable: false,
    //   field: "supplierName",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Rental Contract Id",
      editable: false,
      field: "rentalContractId",
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
    },
    {
      headerName: "Days",
      editable: false,
      field: "attendanceDays",
      resizable: true,
      width: 150,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rate",
      editable: false,
      field: "rate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total",
      editable: false,
      field: "total",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      this.rowData = this.rowData.filter((row) => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
    this.calculateTotalAmount();
  }

  copyVehiclesAttendance(attendanceDate?: string) {
    debugger;
    this._rentalService
      .GetVehiclesAttendance(attendanceDate, this.target)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.msgService.add({
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
          this.rowData = response;
          this.calculateTotalAmount();
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  edit(id: any) {
    if (!this.restrictionDto.isEditAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.vehicleattendanceform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.vehicleattendanceform.disable();
    this.MinDate = null;
  }
  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.msgService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._rentalService
          .Approve(id, this.target)
          .pipe(
            finalize(() => {}),
            catchError((error) => {
              debugger;
              this.msgService.add({
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
                this.msgService.add({
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
  calculateTotalAmount() {
    let total = 0;
    this.rowData.forEach((node) => {
      debugger;

      if (node.total) {
        total += +node.total;
      }
    });
    this.vehicleattendanceform.get("totalAmount").setValue(total);
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * 5;
    this._rentalService
      .getAll(this.target, this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.tableData = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;

    this._rentalService.getAllRecord(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  VoucherRestriction(prefix: string) {
    this._restrictionService
      .getVoucherRestriction(prefix)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          debugger;
          this.restrictionDto = mapRestrictionDto(response.items[0]);
          console.log(this.restrictionDto);
        },
      });
  }
}
