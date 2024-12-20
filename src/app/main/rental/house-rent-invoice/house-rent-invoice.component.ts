import { Component } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RentalService } from "../../rental/shared/services/rental.service";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import * as moment from "moment";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../../budget/shared/services/restriction.service";

@Component({
  selector: "app-house-rent-invoice",
  templateUrl: "./house-rent-invoice.component.html",
  styleUrl: "./house-rent-invoice.component.css",
})
export class HouseRentInvoiceComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  editMode: boolean;
  viewMode: boolean;
  displayModal: boolean;
  target: string = "HouseInvoice";
  tableData: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 50;
  saving: boolean;
  loading: boolean;
  showSupplierDetails = false;
  dataForEdit: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  dto = {
    DocOrVocNumber: "",
  };
  employeeErpId: number;
  houseRentInvform: FormGroup;
  documentNumber: number;
  minDate: Date = new Date();
  rowSelection: string;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rentalContractTypeOption = [
    { label: "Monthly", value: 1 },
    { label: "Two Months", value: 2 },
    { label: "Quarterly", value: 3 },
    { label: "Four Months", value: 4 },
    { label: "Five Months", value: 5 },
    { label: "Six Months", value: 6 },
    { label: "Seven Months", value: 7 },
    { label: "Eight Months", value: 8 },
    { label: "Nine Months", value: 9 },
    { label: "Ten Months", value: 10 },
    { label: "Eleven Months", value: 11 },
    { label: "Annual", value: 12 },
    { label: "Biennial", value: 24 },
    { label: "Triennial", value: 36 },
    { label: "Five Years", value: 60 },
    { label: "Ten Years", value: 120 },
  ];
  rowData: any;
  constructor(
    private fb: FormBuilder,
    private _rentalService: RentalService,
    private _restrictionService: RestrictionService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.houseRentInvform = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      totalAmount: "",
      houseInvoiceDetails: [[]],
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("RHI");
  }

  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Location":
        debugger;
        this.houseRentInvform.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.employeeErpId = value.id;
        this.GetDocMaxCount("VehicleInvoice");
        break;
      case "CostCenter":
        this.houseRentInvform.patchValue({
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
            this.houseRentInvform
              .get("userLocationId")
              ?.setValue(this.dataForEdit.userLocationId);
            this.houseRentInvform
              .get("userLocationName")
              ?.setValue(this.dataForEdit.userLocationName);
            this.houseRentInvform
              .get("issueDate")
              ?.setValue(new Date(this.dataForEdit.issueDate));
            this.houseRentInvform
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.houseRentInvform
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.rowData = this.dataForEdit.houseInvoiceDetails;
            this.calculateTotalAmount();
          },
        });
      this.displayModal = true;
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
      this.houseRentInvform.reset();
      this.houseRentInvform.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.houseRentInvform.get("isActive")?.setValue(true);
      this.houseRentInvform.get("issueDate").setValue(this.today);
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.houseRentInvform.valid) {
      this.msgService.add({
        severity: "error",
        detail: "Please fill all Required fields",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.houseRentInvform.patchValue({
      houseInvoiceDetails: this.rowData,
    });
    this._rentalService
      .create(this.houseRentInvform.value, this.target)
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
    // this.houseRentInvform.patchValue({
    //   vehicleInvoiceDetails: this.rowData,
    // });
    const updateData = {
      ...this.houseRentInvform.value,
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
    const control = this.houseRentInvform.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.houseRentInvform.value.issueDate = value;
    }
    if (
      this.houseRentInvform.value.userLocationId &&
      this.houseRentInvform.value.issueDate
    ) {
      this.GetDocMaxCount("VehicleInvoice");
    }
  }

  MakeVoucher() {
    debugger;

    if (this.houseRentInvform.value.userLocationId && this.documentNumber) {
      const voucherNumber =
        "RHI-HNL" +
        "-" +
        this.houseRentInvform.value.userLocationId +
        "-" +
        this.houseRentInvform.value.issueDate.getFullYear() +
        "-" +
        (this.houseRentInvform.value.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
      this.houseRentInvform.get("voucherNumber").setValue(voucherNumber);
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
          this.houseRentInvform
            .get("userLocationName")
            .setValue(response.items[0].name);
          this.houseRentInvform
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.GetDocMaxCount("VehicleInvoice");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.houseRentInvform.value.userLocationId &&
      this.houseRentInvform.value.issueDate
    ) {
      this._rentalService
        .GetDocMaxCount(
          target,
          this.houseRentInvform.value.userLocationId,
          this.houseRentInvform.value.issueDate
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
      headerName: "Start Date",
      editable: false,
      field: "startDate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
      // valueFormatter: (params) => {
      //   return params.value ? new Date(params.value).toLocaleDateString() : "";
      // },
    },
    {
      headerName: "End Date",
      editable: false,
      field: "endDate",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
      // valueFormatter: (params) => {
      //   return params.value ? new Date(params.value).toLocaleDateString() : "";
      // },
    },
    {
      headerName: "House Id",
      editable: false,
      field: "houseId",
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
    },
    {
      headerName: "House Title",
      editable: false,
      field: "houseName",
      resizable: true,
      width: 180,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Supplier Id",
    //   editable: false,
    //   field: "supplierSerialNumber",
    //   resizable: true,
    //   width: 180,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      width: 250,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   width: 200,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   width: 200,
    // },
    {
      headerName: "Location Id",
      editable: false,
      field: "locationId",
      width: 200,
    },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      width: 200,
    },
    {
      headerName: "Rate",
      editable: false,
      field: "rate",
      width: 200,
    },
    {
      headerName: "Contract Type Title",
      editable: false,
      field: "rentalContractTypeTitle",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      width: 200,
      suppressSizeToFit: true,
    },
    {
      headerName: "Contract Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      width: 180,
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

  generatHouseDetails() {
    debugger;
    if (!this.houseRentInvform.value.issueDate) {
      this.msgService.add({
        severity: "error",
        summary: "Required",
        detail: "Please Select Date",
      });
    } else {
      this._rentalService
        .GetHouseRentDetails(this.houseRentInvform.value.issueDate, this.target)
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
            if (response.length === 0) {
              alert("There is no data in Database...");
              return;
            } else {
              this.rowData = response;
              this.calculateTotalAmount();
            }
          },
          error: (err) => {
            console.log("An error occurred", err);
          },
        });
    }
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
    this.houseRentInvform.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.houseRentInvform.disable();
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

      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    this.houseRentInvform.get("totalAmount").setValue(total);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
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
