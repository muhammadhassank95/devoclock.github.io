import { Component, ViewChild } from "@angular/core";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { GridReadyEvent } from "ag-grid-community";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { ColDef } from "ag-grid-community";
import { Table } from "primeng/table";
import * as moment from "moment";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-petty-purchase-invoice",
  templateUrl: "./petty-purchase-invoice.component.html",
})
export class PettyPurchaseInvoiceComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  protected gridApi: GridApi;
  protected setParms;
  tableData: any[] = [];
  rowData: any[] = [];
  tableLoading: boolean = false;
  isManageVehicleFRModalVisible: boolean = false;
  selectedIds: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  displayVehicle: boolean;
  rowCount: number;
  vehicleData: any;
  serviceItemSerialNumber: string;
  documentStatus: string = "PENDING";
  target: string = "PettyPurchaseInvoice";
  displayFuelRequisition: boolean;
  loading: boolean = false;
  fuelRequisitionData: any;
  currentPage = 1;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };

  chooseInvoiceTypeOptions = [
    { label: "Mannual Entry", value: true },
    { label: "Copy Requisition", value: false },
  ];

  count: number;
  isInvoiceManual: boolean = null;
  pettyPurchaseForm: FormGroup;
  serialNumber: number;
  isDisabled: boolean;
  EmpSerialNumber: number;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Item ID",
      editable: (params) => !params.data.isDisabled,
      field: "serialNumberItem",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Title",
      editable: (params) => !params.data.isDisabled,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job ID",
      editable: false,
      field: "serviceItemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addServiceItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job Name",
      editable: false,
      field: "serviceItemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region ID",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "",
    //   field: "addRegion",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Name",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Project ID",
      editable: false,
      field: "projectId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addProject",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "CostCenter ID",
      editable: false,
      field: "costCenterId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addCostCenter",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "CostCenter Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Budget Month",
      editable: true,
      field: "consumptionMonth",
      resizable: true,
      suppressSizeToFit: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          // return date.toISOString().split('T')[0];
          return moment(date).format("YYYY-MMM");
        }
        return "";
      },
      valueParser: (params) => {
        return new Date(params.newValue);
      },
    },
    {
      headerName: "Vehicle ID",
      editable: false,
      field: "vehicleId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Requisition No",
      editable: false,
      field: "requisitionVoucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Mileage",
      editable: false,
      field: "mileage",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Slip Number",
      editable: (params) => !params.data.isDisabled,
      field: "slipNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Qty",
      editable: (params) => !params.data.isDisabled,
      cellEditor: "agNumberCellEditor",
      field: "invoiceQuantity",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Req Qty",
    //   editable: false,
    //   cellEditor: "agNumberCellEditor",
    //   field: "requestedQuantity",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Unit Id",
      editable: false,
      field: "unitId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addUnit",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit Title",
      editable: false,
      field: "unitName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rate",
      editable: (params) => !params.data.isDisabled,
      field: "rate",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total",
      editable: false,
      field: "total",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "OhJob ID",
      editable: true,
      field: "ohJobId",
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addOhJob",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "OhJob Name",
      editable: false,
      field: "ohJobName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Vehicle Type Name",
    //   editable: false,
    //   field: "vehicleTypeName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Supplier Name",
    //   editable: false,
    //   field: "supplierName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Fuel Type Name",
    //   editable: false,
    //   field: "fuelTypeName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Available Budget",
    //   editable: true,
    //   field: "availableBudget",
    //   resizable: true,
    //   cellEditor: "agNumberCellEditor",
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Budget Consumed Amount",
    //   editable: true,
    //   field: "budgetConsumedAmount",
    //   resizable: true,
    //   cellEditor: "agNumberCellEditor",
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Current Reading",
    //   editable: true,
    //   field: "currentReading",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Previous Reading",
    //   editable: true,
    //   field: "previousReading",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Fuel Issued Qty",
    //   editable: true,
    //   cellEditor: "agNumberCellEditor",
    //   field: "fuelIssuedQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Last Drawn Fuel Qty",
    //   editable: true,
    //   field: "lastDrawnFuelQty",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Total Budget Amt",
    //   editable: true,
    //   field: "totalBudgetAmount",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Per KM Cost",
    //   editable: true,
    //   field: "perKmCost",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Total Mileage",
    //   editable: true,
    //   field: "totalMileage",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
  ];

  constructor(
    private _financeService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private fb: FormBuilder
  ) {
    this.pettyPurchaseForm = this.fb.group({
      id: [0, Validators.required],
      employeeId: [null, Validators.required],
      employeeName: [null, Validators.required],
      supplierId: [null, Validators.required],
      supplierName: [null, Validators.required],
      issueDate: [null, Validators.required],
      userLocationId: [null, Validators.required],
      userLocationName: [null, Validators.required],
      remarks: [null],
      grossAmount: [null, ""],
      voucherNumber: [null, Validators.required],
      isInvoiceManual: [null, Validators.required],
      pettyPurchaseInvoiceDetails: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadData();
    this.VoucherRestriction("PPI");
  }

  onChangeInvoiceType() {
    this.isInvoiceManual = this.pettyPurchaseForm.get("isInvoiceManual")?.value;
    debugger;
  }

  addIconCellRendererFunc(params) {
    const isDisabled = params.data.isDisabled;

    let iconHtml;

    if (isDisabled) {
      iconHtml =
        '<i class="fa fa-lock fa-lg" style="color: gray; margin-left: -9px; cursor: not-allowed;" title="Item is disabled"></i>';
    } else {
      iconHtml =
        '<i class="fa fa-plus-circle fa-lg" style="color: green; margin-left: -9px; cursor: pointer;" title="Add Item" onclick="addItem(' +
        params.data.detailId +
        ')"></i>';
    }

    return iconHtml;
  }

  cellValueChanged(params) {
    debugger;
    let field = params.colDef.field;
    if (field == "invoiceQuantity" || field == "rate") {
      if (params.data.invoiceQuantity && params.data.rate) {
        params.data.total = params.data.invoiceQuantity * params.data.rate;
      }
    }

    this.gridApi.refreshCells();
    this.recalculatePettyInv();
  }

  recalculatePettyInv() {
    debugger;
    var calculatedGrossAmount = 0;
    this.gridApi.forEachNode((node) => {
      if (node.data && node.data.total) {
        calculatedGrossAmount += node.data.total;
      }
    });
    this.pettyPurchaseForm.get("grossAmount")?.setValue(calculatedGrossAmount);
  }

  onRemoveSelected() {
    if (this.rowData.length === 1) {
      this.messageService.add({
        severity: "error",
        detail: "Can't remove the last row!.",
      });
      return;
    }

    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onAddRow() {
    debugger;
    if (!this.isInvoiceManual) {
      this.messageService.add({
        severity: "error",
        detail: "Rows already Added. Copied from VehiceFuelRequisition.",
      });
      return;
    }
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        newItem[colDef.field] = null;
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  save() {
    debugger;
    // if (this.pettyPurchaseForm.invalid) return;
    this.loading = true;
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
      });
      this.loading = false;
      return;
    }

    let pettyPurchaseInvoiceDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let obj = {};
      Object.keys(node.data).forEach((key) => {
        obj[key] = node.data[key];
        obj["id"] = 0;
      });
      obj["vehicleFuelRequisitionDetailId"] = node.data.detailId;
      if (node.data.itemId) {
        obj["serviceItemId"] = 0;
      } else if (node.data.serviceItemId) {
        obj["itemId"] = 0;
      }
      if (!node.data.mileage) {
        obj["mileage"] = 0;
      }
      if (!node.data.ohJobId) {
        obj["ohJobId"] = 0;
      }
      if (!node.data.vehicleId) {
        obj["vehicleId"] = 0;
      }
      pettyPurchaseInvoiceDetails.push(obj);
    });

    this.pettyPurchaseForm.patchValue({ pettyPurchaseInvoiceDetails });
    this._financeService
      .create(this.pettyPurchaseForm.value, this.target)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
          });
          this.loadData();
          this.loading = false;
          this.isManageVehicleFRModalVisible = false;
        },
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
  }

  // show(id?: number, viewOnly?: boolean) {
  //   debugger
  //   if (id) {
  //     if (viewOnly) {
  //       this.pettyPurchaseForm.disable();
  //     }
  //     this.tableLoading = true;
  //     this._financeService
  //       .getDataForEdit(id, this.target)
  //       .pipe(
  //         finalize(() => {
  //           this.tableLoading = false;
  //         }),
  //         catchError((error) => {
  //           this.messageService.add({
  //             severity: "error",
  //             summary: "Error",
  //             detail: error.error.error.message,
  //           });
  //           return throwError(error.error.error.message);
  //         })
  //       )
  //       .subscribe({
  //         next: (response) => {
  //           debugger

  //           this.pettyPurchaseForm.patchValue({
  //             ...response,
  //             issueDate: new Date(response.issueDate),
  //             // referenceDate: new Date(response.referenceDate),
  //           });
  //           this.isInvoiceManual = response.isInvoiceManual;
  //           this.serialNumber = response.supplierSerialNumber;
  //           this.EmpSerialNumber = response.employeeErpId;
  //           console.log(this.pettyPurchaseForm.value);
  //           this.documentStatus = response.status;
  //           this.rowData = response.pettyPurchaseInvoiceDetails;
  //           this.isManageVehicleFRModalVisible = true;
  //         },
  //       });
  //   } else {
  //     this.pettyPurchaseForm.enable();
  //     this.pettyPurchaseForm.reset();
  //     this.serialNumber = null;
  //     this.EmpSerialNumber = null;
  //     this.pettyPurchaseForm.patchValue({ id: 0, voucherNumber: null });
  //     this.isManageVehicleFRModalVisible = true;
  //     this.rowData = [];
  //   }
  // }

  show(id?: number, viewOnly?: boolean) {
    if (id) {
      if (viewOnly) {
        this.pettyPurchaseForm.disable();
        // this.MinDate = null;
      }
      if (!this.restrictionDto.isEditAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Edit Restricted",
        });
        return;
      }
      this.tableLoading = true;
      // this.MinDate = this.restrictionDto.editRestrictionDate;

      this._financeService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {
            this.tableLoading = false;
          }),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
            });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            this.pettyPurchaseForm.patchValue({
              ...response,
              issueDate: new Date(response.issueDate),
            });

            this.isInvoiceManual = response.isInvoiceManual;
            this.serialNumber = response.supplierSerialNumber;
            this.EmpSerialNumber = response.employeeErpId;
            this.documentStatus = response.status;

            // Set `isDisabled` based on `isInvoiceManual`
            this.rowData = response.pettyPurchaseInvoiceDetails.map((item) => ({
              ...item,
              isDisabled: !this.isInvoiceManual,
            }));

            this.isManageVehicleFRModalVisible = true;
          },
        });
    } else {
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      this.pettyPurchaseForm.enable();
      this.pettyPurchaseForm.reset();
      this.pettyPurchaseForm.get("issueDate").setValue(this.today);
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.serialNumber = null;
      this.EmpSerialNumber = null;
      this.pettyPurchaseForm.patchValue({ id: 0, voucherNumber: null });
      this.isManageVehicleFRModalVisible = true;

      // In manual mode, allow all items to be editable
      this.rowData = this.rowData.map((item) => ({
        ...item,
        isDisabled: false,
      }));
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tableLoading = true;
        this._financeService
          .delete(id, this.target)
          .pipe(
            finalize(() => {
              this.tableLoading = false;
            }),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                });
                this.loadData();
              }
            },
          });
      },
    });
  }

  approve(id: number) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tableLoading = true;
        this._financeService
          .approve(id, this.target)
          .pipe(
            finalize(() => {
              this.tableLoading = false;
            }),
            catchError((error) => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                });
                this.loadData();
              }
            },
          });
      },
    });
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        this.pettyPurchaseForm.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id,
        });
        if (this.pettyPurchaseForm.value.issueDate) {
          this.MakeVoucher();
        }
        // this.MakeVoucher();
        break;
      case "Subledger":
        debugger;

        if (this.isInvoiceManual) {
          this.pettyPurchaseForm.patchValue({
            supplierId: value.id,
            supplierName: value.title,
          });
          this.serialNumber = value.serialNumber;
        } else {
          this.pettyPurchaseForm.patchValue({
            supplierId: value.id,
            supplierName: value.title,
          });
          (this.serialNumber = value.serialNumber),
            this.getFuelRequisitions(value.id);
        }
        break;
      case "Employee":
        this.pettyPurchaseForm.patchValue({
          employeeId: +value.additional,
          employeeName: value.name,
        });
        this.EmpSerialNumber = value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  update() {
    this.loading = true;
    let pettyPurchaseInvoiceDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let obj = {};
      Object.keys(node.data).forEach((key) => {
        obj[key] = node.data[key];
        obj["id"] = 0;
      });
      obj["vehicleFuelRequisitionDetailId"] =
        node.data.vehicleFuelRequisitionDetailId;
      pettyPurchaseInvoiceDetails.push(obj);
    });

    this.pettyPurchaseForm.patchValue({ pettyPurchaseInvoiceDetails });
    this._financeService
      .update(this.pettyPurchaseForm.value, this.target)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
          });
          this.loadData();
          this.loading = false;
          this.isManageVehicleFRModalVisible = false;
        },
      });
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.pettyPurchaseForm.value.issueDate = value;
    }
    let { issueDate, userLocationId } = this.pettyPurchaseForm.value;
    if (userLocationId && this.pettyPurchaseForm.value.issueDate) {
      this._financeService
        .getVoucherNumber(this.target, "TI", issueDate, userLocationId)
        .subscribe((voucherNumber) => {
          console.log(voucherNumber);
          this.pettyPurchaseForm.patchValue({ voucherNumber });
        });
    }
  }

  cellClicked(params) {
    const isDisabled = params.data.isDisabled;
    const columnId = params.column.colId;

    // Define all columns that require the isDisabled check
    const columnsWithCheck = [
      "addItem",
      "addServiceItem",
      "addUnit",
      "addOhJob",
      "addProject",
      "addCostCenter",
    ];

    if (columnsWithCheck.includes(columnId) && isDisabled) {
      this.messageService.add({
        severity: "info",
        summary: "Information",
        detail: "You copied the fuel requisition; you cannot Add .",
        life: 2000,
      });
      return;
    }

    switch (columnId) {
      case "addItem":
        this.setParms = params;
        if (params.data.serviceItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              "You cannot select a Item because an item has already been Job.",
          });
          return;
        }
        this.openSelectItem("InventoryItem");
        break;
      case "addServiceItem":
        debugger;
        this.setParms = params;
        if (params.data.itemId) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              "You cannot select a job because an item has already been selected.",
          });
          return;
        }
        this.openSelectItem("ServiceItem");
        break;
      case "addUnit":
        this.setParms = params;
        this.openSelectItem("Unit");
        break;
      case "addOhJob":
        this.setParms = params;
        this.openSelectItem("OhJob");
        break;
      case "addRegion":
        this.setParms = params;
        this.openSelectItem("Region");
        break;
      case "addProject":
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      case "addCostCenter":
        this.setParms = params;
        this.openSelectItem("CostCenter");
        break;
      default:
        break;
    }
  }

  openSelectItem(
    target:
      | "ServiceItem"
      | "OhJob"
      | "Region"
      | "CostCenter"
      | "Project"
      | "InventoryItem"
      | "Unit",
    filterWiseChartOfAccTarget?: string
  ) {
    const initialState: any = {
      target: target,
      isPetty: true,
    };
    if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );
    debugger;
    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      if (target === "ServiceItem") {
        debugger;
        this.setParms.data.serviceItemId = +result.id;
        this.setParms.data.serialNumberJob = +result.serialNumber;
        this.setParms.data.serviceItemName = result.name;
      } else if (target === "InventoryItem") {
        debugger;
        this.setParms.data.itemId = +result.id;
        this.setParms.data.serialNumberItem = +result.serialNumber;
        this.setParms.data.itemName = result.name;
      } else if (target == "OhJob") {
        this.setParms.data.ohJobId = +result.id;
        this.setParms.data.ohJobName = result.name;
        // } else if (target == "Region") {
        //   this.setParms.data.regionId = +result.id;
        //   this.setParms.data.regionName = result.name;
      } else if (target == "Unit") {
        this.setParms.data.unitId = +result.id;
        this.setParms.data.unitName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id;
        this.setParms.data.projectName = result.name;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result.id;
        this.setParms.data.costCenterName = result.name;
      }

      this.gridApi.refreshCells();
    });
  }

  getFuelRequisitions(id: number) {
    debugger;
    this._financeService
      .getAllFuelReq("VehicleFuelRequisition", id)
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
          this.rowData = response.items.flatMap((item) =>
            item.vehicleFuelRequisitionDetails.map((detail) => ({
              projectId: item.projectId,
              projectName: item.projectName,
              costCenterId: item.costCenterId,
              costCenterName: item.costCenterName,
              detailId: detail.id,
              vehicleId: detail.vehicleId,
              vehicleName: detail.vehicleName,
              serviceItemId: detail.serviceItemId,
              serviceItemSerialNumber: detail.serviceItemSerialNumber,
              serviceItemName: detail.serviceItemName,
              mileage: detail.mileage,
              unitId: detail.unitId,
              unitName: detail.unitName,
              rate: detail.rate,
              budgetConsumedAmount: detail.budgetConsumedAmount,
              slipNumber: detail.slipNumber,
              invoiceQuantity: detail.pendingPurchaseQty,
              requisitionVoucherNumber: detail.voucherNumber,
              total: detail.pendingPurchaseQty * detail.rate,
              isDisabled: !!detail.id,
            }))
          );
          console.log(this.rowData);
          setTimeout(() => {
            this.gridApi.setRowData(this.rowData);
            this.recalculatePettyInv();
          }, 0);
        },
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this._financeService.getAll(this.target, this.dto).subscribe({
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
          this.messageService.add({
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
