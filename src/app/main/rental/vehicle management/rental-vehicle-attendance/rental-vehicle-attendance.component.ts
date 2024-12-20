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
  selector: "app-rental-vehicle-attendance",
  templateUrl: "./rental-vehicle-attendance.component.html",
})
export class RentalVehicleAttendanceComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();

  editMode: boolean;
  viewMode: boolean;
  displayModal: boolean;
  target: string = "VehicleAttendance";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 5;
  saving: boolean;
  loading: boolean;
  showSupplierDetails = false;
  dataForEdit: any;
  employeeErpId: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  dto = {
    DocOrVocNumber: "",
  };
  vehicleattendanceform: FormGroup;
  documentNumber: number;
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
      costCenterId: [null, Validators.required],
      costCenterName: [""],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      vehicleAttendanceDetails: [[]],
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("RVA");
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Location":
        debugger;
        this.vehicleattendanceform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "RVA",
          this.vehicleattendanceform.value?.issueDate,
          value?.id
        );
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
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.vehicleattendanceform
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.vehicleattendanceform
              .get("userLocationId")
              ?.setValue(this.dataForEdit.userLocationId);
            this.vehicleattendanceform
              .get("userLocationName")
              ?.setValue(this.dataForEdit.userLocationName);
            this.vehicleattendanceform
              .get("costCenterId")
              .setValue(this.dataForEdit.costCenterId);
            this.vehicleattendanceform
              .get("costCenterName")
              .setValue(this.dataForEdit.costCenterName);
            this.rowData = this.dataForEdit.vehicleAttendanceDetails;
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
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.vehicleattendanceform.enable();
      this.rowData = [];
      this.displayModal = true;
      this.vehicleattendanceform.reset();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.vehicleattendanceform.get("issueDate").setValue(this.today);
      // this.vehicleattendanceform.get("isActive").setValue(true);
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
    this.vehicleattendanceform.patchValue({
      vehicleAttendanceDetails: this.rowData,
    });
    this._rentalService
      .create(this.vehicleattendanceform.value, this.target)
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
    this.vehicleattendanceform.patchValue({
      vehicleAttendanceDetails: this.rowData,
    });
    const updateData = {
      ...this.vehicleattendanceform.value,
      id: this.dataForEdit.id,
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
      this.getVoucherNumber(
        "RVA",
        this.vehicleattendanceform.value.issueDate,
        this.vehicleattendanceform.value.userLocationId
      );
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
            .setValue(response.items[0].shortName);
          this.vehicleattendanceform
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "RVA",
            this.vehicleattendanceform.value.issueDate,
            this.vehicleattendanceform.value.userLocationId
          );
        },
      });
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
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   width: 120,
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
    //   headerName: "Location Id",
    //   editable: false,
    //   field: "locationId",
    //   resizable: true,
    //   width: 120,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "CostCenter Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Contract V.No",
      editable: false,
      field: "contractVoucherNumber",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Present",
      editable: true,
      field: "isPresent",
      // resizable: true,
      // checkboxSelection: true,
      // width: 150,
    },
    {
      headerName: "Time In (00:00 AM/PM)",
      editable: true,
      field: "checkIn_Time",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      // valueFormatter: function (params) {
      //   const time = moment(params.value, ["HH:mm", moment.ISO_8601]);
      //   return time.isValid() ? time.format("hh:mm A") : params.value;
      // },
    },
    {
      headerName: "Time Out (00:00 AM/PM)",
      editable: true,
      field: "checkOut_Time",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
      // valueFormatter: function (params) {
      //   const time = moment(params.value, ["HH:mm", moment.ISO_8601]);
      //   return time.isValid() ? time.format("hh:mm A") : params.value;
      // },
    },
    {
      headerName: "Vehicle Reading In",
      editable: true,
      field: "vehicleReadingIn",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Reading Out",
      editable: true,
      field: "vehicleReadingOut",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      width: 200,
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
  }

  cellValueChanged(params) {}

  copyMachines(
    attendanceDate: string,
    userLocationId?: number,
    costCenterID?: number
  ) {
    debugger;
    this._rentalService
      .GetAvailableVehicles(
        attendanceDate,
        userLocationId,
        costCenterID,
        this.target
      )
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
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  getVoucherNumber(prefix: string, issueDate: string, userLocationId: number) {
    debugger;
    this._rentalService
      .getVoucherNumber(prefix, issueDate, userLocationId, this.target)
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
          this.vehicleattendanceform.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
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
  edit(id: number) {
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
  viewOnly(id: number) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.vehicleattendanceform.disable();
    this.MinDate = null;
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
