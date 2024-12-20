import { filter } from "rxjs/operators";
import { Component, ViewChild } from "@angular/core";
import { PurchaseRequisition } from "../Shared/DTOs/purchase-requisition";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";
import { AllTracingComponent } from "../all-tracing/all-tracing.component";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-purchase-requisition",
  templateUrl: "./purchase-requisition.component.html",
})
export class PurchaseRequisitionComponent {
  purchaseRequisition: PurchaseRequisition = new PurchaseRequisition();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  docCount: number;
  documentNumber: string;
  calendar_disability: boolean;
  displayModal: boolean;
  editMode: boolean;
  maxDate: Date;
  today: Date = new Date();
  // MinDate: Date = new Date();
  dateValue: any;
  reviseMode: boolean;
  saving: boolean;
  target = "PurchaseRequisition";
  rowData: any;
  // regionId: number;
  // regionName: string;
  rowSelection: string;
  rowCount: number;
  gridApi: any;
  setParms: any;
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  displayStock: boolean;
  stockData: any;
  view: boolean;
  selectedIds = [];

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("PQ");
  }

  getAll() {
    this._basicTypeService
      .getAll(this.target, this.dto)
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
          this.tableData = response.items;
          this.count = response.totalCount;
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
        this._basicTypeService
          .delete(id, this.target)
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

  show(id?: number) {
    if (id) {
      // this.editMode = true;
      this._basicTypeService
        .getDataForEdit(id, this.target)
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
            this.purchaseRequisition = response;
            this.purchaseRequisition.userLocationId = response.userLocationId;
            this.purchaseRequisition.userLocationName =
              response.userLocationName;
            this.purchaseRequisition.requesterLocationId =
              response.requesterLocationId;
            this.purchaseRequisition.requesterLocationName =
              response.requesterLocationName;
            this.purchaseRequisition.projectId = response.requesterProjectId;
            this.purchaseRequisition.projectName =
              response.requesterProjectName;
            this.purchaseRequisition.costCenterId =
              response.requesterCostCenterId;
            this.purchaseRequisition.costCenterName =
              response.requesterCostCenterName;
            // this.regionId = response.requesterRegionId;
            // this.regionName = response.requesterRegionName;
            this.purchaseRequisition.issueDate = new Date(response.issueDate);
            this.purchaseRequisition.budgetDate = new Date(
              response.consumptionMonth
            );
            this.rowData = this.prepareGridDataPurchaseReq(
              response.purchaseRequisitionDetails
            );
            this.displayModal = true;
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
      this.getDefaultLocation("Location", "locationId", "locationName", "");
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.purchaseRequisition = new PurchaseRequisition();
      this.purchaseRequisition.issueDate = this.today;
      // this.regionId = null;
      // this.regionName = null;
      this.rowData = [];
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.validationOfTransferNot()) {
      return;
    }

    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        stockRequisitionDetailId: node.data.stockRequisitionDetailId,
        requestedQty: node.data.requestedQty,
        purchaseRequestQty: node.data.purchaseRequestQty,
        remarks: node.data.remarks,
        costRate: node.data.costRate,
        totalRate: node.data.totalRate,
        requestDate: node.data.requestDate,
        voucherNumber: node.data.voucherNumber,
        purchaseRequestInfoId: node.data.purchaseRequestInfoId,
        // voucherNumber:
        //   this.purchaseRequisition.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.purchaseRequisition.purchaseRequisitionDetails = tempArr;
    this._basicTypeService
      .create(this.purchaseRequisition, this.target)
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
  }

  validationOfTransferNot(): boolean {
    debugger;
    if (!this.purchaseRequisition.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseRequisition.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseRequisition.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    return true;
  }

  update() {
    debugger;
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        stockRequisitionDetailId: node.data.stockRequisitionDetailId,
        requestedQty: node.data.requestedQty,
        purchaseRequestQty: node.data.purchaseRequestQty,
        remarks: node.data.remarks,
        costRate: node.data.costRate,
        totalRate: node.data.totalRate,
        requestDate: node.data.requestDate,
        voucherNumber: node.data.voucherNumber,
        purchaseRequestInfoId: node.data.purchaseRequestInfoId,
      };
      tempArr.push(tempObj);
    });
    this.purchaseRequisition.purchaseRequisitionDetails = tempArr;
    this._basicTypeService
      .update(this.purchaseRequisition, this.target)
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
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.purchaseRequisition.userLocationId = value.id;
        this.purchaseRequisition.userLocationName = value.name;
        this.GetDocMaxCount("PurchaseRequisition");
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

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
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Qty In Stock",
    //   editable: false,
    //   field: "qtyInStock",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Requested Quantity",
      editable: false,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Purchase Quantity",
      editable: true,
      field: "purchaseRequestQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Rate",
      editable: false,
      field: "costRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      field: "requestDate",
      headerName: "requestDate",
      editable: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        return params.value
          ? new Date(params.value).toLocaleDateString("en-CA")
          : "";
      },
      valueParser: (params) => new Date(params.newValue),
    },
    {
      headerName: "SQ Voucher Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  // HandleDateChange(value: Date) {
  //   this.purchaseRequisition.issueDate = value;
  //   debugger;
  //   const { issueDate, userLocationId } = this.purchaseRequisition;
  //   if (issueDate && userLocationId) {
  //     this.getNextCount();
  //   }
  // }

  // getNextCount() {
  //   const { issueDate, userLocationId } = this.purchaseRequisition;
  //   if (issueDate && userLocationId) {
  //     this._basicTypeService
  //       .GetDocMaxCount("PurchaseRequisition", userLocationId, issueDate)
  //       .subscribe((result) => {
  //         debugger;
  //         this.docCount = result;
  //         this.MakeVoucher();
  //       });
  //   }
  // }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.purchaseRequisition.issueDate = value;
    }
    if (
      this.purchaseRequisition.userLocationId &&
      this.purchaseRequisition.issueDate
    ) {
      this.GetDocMaxCount("PurchaseRequisition");
    }
  }

  MakeVoucher() {
    debugger;
    if (this.purchaseRequisition.userLocationId && this.documentNumber) {
      this.purchaseRequisition.voucherNumber =
        "PQ-HNL" +
        "-" +
        this.purchaseRequisition.userLocationId +
        "-" +
        this.purchaseRequisition.issueDate.getFullYear() +
        "-" +
        (this.purchaseRequisition.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("PurchaseRequisition");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._basicTypeService
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
          this.purchaseRequisition.userLocationName = response.items[0].name;
          this.purchaseRequisition.userLocationId = response.items[0].id;
          this.GetDocMaxCount("PurchaseRequisition");
        },
      });
  }
  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.purchaseRequisition.userLocationId &&
      this.purchaseRequisition.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.purchaseRequisition.userLocationId,
          this.purchaseRequisition.issueDate
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

  OpenStockRequisition() {
    debugger;

    if (this.purchaseRequisition.userLocationName === "HEAD OFFICE") {
      this.GetRequisitions();
      this.displayStock = true;
    } else {
      this.messageService.add({
        severity: "info",
        detail: "Please Select Main Location",
      });
    }
  }

  GetRequisitions() {
    this._basicTypeService
      .getAll("StockRequisition")
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
          this.stockData = response.items.filter(
            (item) =>
              item.status == "APPROVED" &&
              item.purchaseRequisitionStatus == "PENDING"
            // item.fromLocation == this.purchaseRequisition.userLocationId
          );
          // .filter((item) => !this.selectedIds.includes(item.id));
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._basicTypeService
      .getDataForEdit(id, "StockRequisition")
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
      .subscribe((response) => {
        debugger;
        this.purchaseRequisition.requesterLocationId = response.userLocationId;
        this.purchaseRequisition.requesterLocationName =
          response.userLocationName;
        this.purchaseRequisition.projectId = response.projectId;
        this.purchaseRequisition.projectName = response.projectName;
        this.purchaseRequisition.costCenterId = response.costCenterId;
        this.purchaseRequisition.costCenterName = response.costCenterName;
        // this.regionId = response.regionId;
        // this.regionName = response.regionName;
        // response.details = response.details.filter(
        //   (i) => i.pendingPurchaseRequisition !== 0
        // );
        this.purchaseRequisition.inventoryRequisitionId = response.id;
        this.selectedIds = [];
        this.selectedIds.push(response.id);
        this.dateValue = new Date(response.issueDate);
        this.maxDate = new Date();
        this.calendar_disability = false;
        this.purchaseRequisition.budgetDate = new Date(
          response.consumptionMonth
        );
        this.rowData = this.prepareGridData(response.stockRequisitionDetails);
        this.displayStock = false;
      });
  }

  prepareGridData(stockRequisitionDetails: any[]): any[] {
    debugger;
    return stockRequisitionDetails.map((item, index) => ({
      stockRequisitionDetailId: item.id,
      voucherNumber: item.voucherNumber,
      requestedQty: item.pendingPurchaseRequisitionQty,
      purchaseRequestQty: item.pendingPurchaseRequisitionQty,
      totalRate: item.pendingPurchaseRequisitionQty * item.lastPurchaseRate,
      id: item.id,
      costRate: item.lastPurchaseRate,
      requestDate: item.requestDate,
      itemId: item.itemId,
      itemName: item.itemName,
      // qtyInStock: item.qtyInStock,
    }));
  }

  prepareGridDataPurchaseReq(purchaseRequisitionDetails: any[]): any[] {
    debugger;
    return purchaseRequisitionDetails.map((item, index) => ({
      id: item.id,
      requisitionDetailId: item.id,
      stockRequisitionDetailId: item.stockRequisitionDetailId,
      voucherNumber: item.voucherNumber,
      requestedQty: item.requestedQty,
      totalRate: item.totalRate,
      costRate: item.costRate,
      requestDate: item.requestDate,
      remarks: item.remarks,
      purchaseRequestQty: item.purchaseRequestQty,
      itemId: item.itemId,
      itemName: item.itemName,
      // qtyInStock: item.qtyInStock,
    }));
  }

  OnCellValueChanged(params) {
    debugger;
    if (params.data.purchaseRequestQty < 0) {
      params.data.purchaseRequestQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be negative.",
      });
    }
    if (params.data.purchaseRequestQty > params.data.requestedQty) {
      params.data.purchaseRequestQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be greater than Required Quantity.",
      });
    }
    params.data.totalRate =
      params.data.purchaseRequestQty * params.data.costRate;
    this.gridApi.refreshCells();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  approve(id) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
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
        this._basicTypeService
          .ApproveDocument(id, this.target)
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

  CloseModel() {
    // this.view = true;
    this.displayModal = false;
  }

  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.show(id);
  }
  edit(id?: number) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.view = false;
    this.show(id);
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  openTracingModal(id: number, voucherNumber: string, target: string) {
    this.dialogService.open(AllTracingComponent, {
      header: "Tracing Documents",
      width: "70%",
      height: "80%",
      data: {
        target: target,
        id: id,
        voucherNumber: voucherNumber,
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
