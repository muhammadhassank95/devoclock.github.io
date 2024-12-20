import { Component, ViewChild } from "@angular/core";
import { StockReceiptNoteDto } from "../Shared/DTOs/stock-receipt-note-dto";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-stock-receipt-note",
  templateUrl: "./stock-receipt-note.component.html",
})
export class StockReceiptNoteComponent {
  stockRecieptRequest: StockReceiptNoteDto = new StockReceiptNoteDto();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  documentNumber: string;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  showMode: boolean;
  // regionId: number;
  // regionName: string;
  // requesterRegionId: number;
  // requesterRegionName: string;
  view: boolean;
  saving: boolean;
  target = "StockReceiptNote";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  gridApi: any;
  setParms: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  displayStock: boolean;
  stockData: any;
  hasSelectedStockTransfer: boolean = false;
  selectedIds = [];
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SRN");
  }

  getAll() {
    this._basicTypeService
      .getAll(this.target, this.filterDto)
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
            this.stockRecieptRequest = response;
            this.stockRecieptRequest.userLocationId = response.userLocationId;
            this.stockRecieptRequest.locationName = response.userLocationName;
            this.stockRecieptRequest.voucherNumber = response.voucherNumber;
            this.stockRecieptRequest.issueDate = new Date(response.issueDate);
            this.stockRecieptRequest.budgetDate = new Date(
              response.consumptionMonth
            );
            this.stockRecieptRequest.fromLocation = response.providerLocationId;
            this.stockRecieptRequest.fromLocationName =
              response.providerLocationName;
            this.stockRecieptRequest.fromCostCenterId =
              response.providerCostCenterId;
            this.stockRecieptRequest.fromCostCenterName =
              response.providerCostCenterName;
            this.stockRecieptRequest.fromProjectId = response.providerProjectId;
            this.stockRecieptRequest.fromProjectName =
              response.providerProjectName;
            // this.requesterRegionId = response.regionId;
            // this.requesterRegionName = response.regionName;
            // this.regionId = response.providerRegionId;
            // this.regionName = response.providerRegionName;
            this.stockRecieptRequest.toCostCenterId = response.costCenterId;
            this.stockRecieptRequest.toCostCenterName = response.costCenterName;
            this.stockRecieptRequest.toProjectId = response.projectId;
            this.stockRecieptRequest.toProjectName = response.projectName;
            this.rowData = this.prepareGridDataSrn(response);
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
      this.editMode = false;
      this.view = false;
      this.showMode = true;
      this.displayModal = true;
      this.stockRecieptRequest = new StockReceiptNoteDto();
      // this.regionId = null;
      // this.regionName = null;
      // this.requesterRegionId = null;
      // this.requesterRegionName = null;
      this.rowData = [];
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.hasSelectedStockTransfer) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select data from Copy Stock Transfer first.",
        life: 3000,
      });
      return;
    }
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        stockTransferNoteDetailId: node.data.stockTransferNoteDetailId,
        receivedQty: node.data.receivedQty,
        damagedQty: node.data.damageQty,
        missingQty: node.data.missingQty,
        transferredQty: node.data.QtyInTransit,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.stockRecieptRequest.stockReceiptNoteDetails = tempArr;
    this._basicTypeService
      .create(this.stockRecieptRequest, this.target)
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

  update() {
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        id: node.data.id,
        stockTransferNoteDetailId: node.data.stockTransferNoteDetailId,
        receivedQty: node.data.receivedQty,
        damagedQty: node.data.damageQty,
        missingQty: node.data.missingQty,
        transferredQty: node.data.QtyInTransit,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.stockRecieptRequest.stockReceiptNoteDetails = tempArr;
    this._basicTypeService
      .update(this.stockRecieptRequest, this.target)
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
      case "User Location":
        debugger;
        this.stockRecieptRequest.userLocationId = +value.id;
        this.stockRecieptRequest.locationName = value.name;
        this.MakeVoucher();
        break;
      case "ProjectTo":
        debugger;
        this.stockRecieptRequest.toProjectId = +value.id;
        this.stockRecieptRequest.toProjectName = value.name;
        break;
      case "CostCenterTo":
        debugger;
        this.stockRecieptRequest.toCostCenterId = +value.id;
        this.stockRecieptRequest.toCostCenterName = value.name;
        break;
      case "ProjectFrom":
        debugger;
        this.stockRecieptRequest.fromProjectId = +value.id;
        this.stockRecieptRequest.fromProjectName = value.name;
        break;
      case "CostCenterFrom":
        debugger;
        this.stockRecieptRequest.fromCostCenterId = +value.id;
        this.stockRecieptRequest.fromCostCenterName = value.name;
        break;
      case "LocationFrom":
        debugger;
        this.stockRecieptRequest.fromLocation = +value.id;
        this.stockRecieptRequest.fromLocationName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.regionId = +value.id;
      //   this.regionName = value.name;
      //   break;
      // case "FromRegion":
      //   debugger;
      //   this.requesterRegionId = +value.id;
      //   this.requesterRegionName = value.name;
      //   break;

      default:
        alert(`${title} is not defined`);
    }
  }

  getSerialNumber(id: any) {
    this._basicTypeService
      .GetCategoryCount(id)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
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
          console.log(response);
          // this.stockItemDto.categoryId = response;
          // this.stockItemDto.serialNumber = `${id}${this.stockItemDto.categoryId}`;
          debugger;
        },
      });
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
      headerName: "Job ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit Id",
      editable: false,
      field: "unitId",
      resizable: true,
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
      headerName: "S.Q NO.",
      editable: false,
      field: "sqNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "STN NO.",
      editable: false,
      field: "stnNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Qty in Transit",
      editable: false,
      field: "QtyInTransit",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Damage Quantity",
    //   editable: true,
    //   field: "damageQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Missing Quantity",
    //   editable: true,
    //   field: "missingQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Received Quantity",
      editable: true,
      field: "receivedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "To Location",
    //     editable: false,
    //     field: "tolocation",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To CostCenter",
    //     editable: false,
    //     field: "tocostCenter",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To Project",
    //     editable: false,
    //     field: "toproject",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
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

  MakeVoucher(value?: Date) {
    debugger;
    if (this.stockRecieptRequest.userLocationId && this.documentNumber) {
      this.stockRecieptRequest.voucherNumber =
        "SRN-HNL" +
        "-" +
        this.stockRecieptRequest.userLocationId +
        "-" +
        this.stockRecieptRequest.issueDate.getFullYear() +
        "-" +
        (this.stockRecieptRequest.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("StockReceiptNote");
    }
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.stockRecieptRequest.userLocationId &&
      this.stockRecieptRequest.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.stockRecieptRequest.userLocationId,
          this.stockRecieptRequest.issueDate
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

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.stockRecieptRequest.issueDate = value;
    }
    if (
      this.stockRecieptRequest.userLocationId &&
      this.stockRecieptRequest.issueDate
    ) {
      this.GetDocMaxCount("StockReceiptNote");
    }
  }

  OpenStockRequisition() {
    debugger;
    this.displayStock = true;
    this.GetRequisitions();
    this.hasSelectedStockTransfer = true;
  }

  GetRequisitions() {
    debugger;
    this._basicTypeService
      .getAll("StockTransferNote")
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
          this.stockData = response.items
            .filter((item) => item.status == "APPROVED")
            .filter((item) => !this.selectedIds.includes(item.id));
        },
      });
  }

  SelectRequisition(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "StockTransferNote")
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
          this.stockRecieptRequest.stnId = response.id;
          ////////// From Location //////////////
          this.stockRecieptRequest.fromCostCenterId = response.costCenterId;
          this.stockRecieptRequest.fromCostCenterName = response.costCenterName;
          this.stockRecieptRequest.fromProjectId = response.projectId;
          this.stockRecieptRequest.fromProjectName = response.projectName;
          this.stockRecieptRequest.fromLocation = response.userLocationId;
          this.stockRecieptRequest.fromLocationName = response.userLocationName;
          // this.regionId = response.regionId;
          // this.regionName = response.regionName;
          ///////// TO Location /////////////////
          this.stockRecieptRequest.userLocationId =
            response.requesterLocationId;
          this.stockRecieptRequest.locationName =
            response.requesterLocationName;
          this.stockRecieptRequest.toCostCenterId =
            response.requesterCostCenterId;
          this.stockRecieptRequest.toCostCenterName =
            response.requesterCostCenterName;
          this.stockRecieptRequest.toProjectId = response.requesterProjectId;
          this.stockRecieptRequest.toProjectName = response.requesterProjectId;
          // this.requesterRegionId = response.requesterRegionId;
          // this.requesterRegionName = response.requesterRegionName;
          this.stockRecieptRequest.budgetDate = new Date(
            response.consumptionMonth
          );
          this.selectedIds = [];
          this.selectedIds.push(response.id);
          this.rowData = this.prepareGridData(response);
          this.displayStock = false;
        },
      });
  }

  prepareGridData(response: any): any[] {
    console.log(response);
    debugger;
    var mapped_details = response.stockTransferNoteDetails.map(
      (item, index) => ({
        stockTransferNoteDetailId: item.id,
        itemId: item.itemId,
        itemName: item.itemName,
        unitId: item.unitId,
        unitName: item.unitName,
        sqNo: item.voucherNumber,
        stnNo: response.voucherNumber,
        QtyInTransit: item.givenQty,
        // tolocation: response.toLocationName,
        // tocostCenter: response.costCenterName,
        // toproject: response.projectName,
      })
    );

    return mapped_details;
  }

  prepareGridDataSrn(response: any): any[] {
    console.log(response);
    debugger;
    var mapped_details = response.stockReceiptNoteDetails.map(
      (item, index) => ({
        id: item.id,
        stockTransferNoteDetailId: item.stockTransferNoteDetailId,
        itemId: item.itemId,
        itemName: item.itemName,
        unitId: item.unitId,
        unitName: item.unitName,
        sqNo: item.voucherNumber,
        stnNo: item.voucherNumber,
        damageQty: item.damagedQty,
        missingQty: item.missingQty,
        QtyInTransit: item.transferredQty,
        receivedQty: item.receivedQty,
        remarks: item.remarks,
      })
    );

    return mapped_details;
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

  shouldDisablePicker(): boolean {
    return this.editMode || this.showMode;
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
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * this.filterDto.maxCount;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
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
    this.filterDto.DocOrVocNumber = inputValue;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  OnCellValueChanged(params) {
    const transitQty = params.data.QtyInTransit || 0;
    let damageQty = params.data.damageQty || 0;
    let missingQty = params.data.missingQty || 0;
    let receivedQty = params.data.receivedQty || 0;

    if (params.colDef.field === "damageQty" && damageQty < 0) {
      params.data.damageQty = 0;
      this.onCellChangeFunction(params, "Damage quantity cannot be negative");
      return;
    }

    if (params.colDef.field === "missingQty" && missingQty < 0) {
      params.data.missingQty = 0;
      this.onCellChangeFunction(params, "Missing quantity cannot be negative");
      return;
    }

    if (params.colDef.field === "receivedQty" && receivedQty < 0) {
      params.data.receivedQty = 0;
      this.onCellChangeFunction(params, "Received quantity cannot be negative");
      return;
    }

    const remainingQty = transitQty - damageQty - missingQty;

    if (params.colDef.field === "receivedQty" && receivedQty > remainingQty) {
      params.data.receivedQty = remainingQty;
      this.onCellChangeFunction(
        params,
        `Received quantity cannot exceed ${remainingQty}`
      );
      return;
    }

    if (
      params.colDef.field === "damageQty" ||
      params.colDef.field === "missingQty"
    ) {
      params.data.receivedQty = Math.max(remainingQty, 0);
    }

    this.gridApi.refreshCells();
  }

  onCellChangeFunction(params: any, message: string) {
    this.messageService.add({
      severity: "error",
      detail: message,
      life: 2000,
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
