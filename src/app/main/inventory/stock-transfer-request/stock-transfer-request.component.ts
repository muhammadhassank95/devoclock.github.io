import { Component, ViewChild } from "@angular/core";
import {
  StockTransferRequest,
  StockTransferRequestNew,
} from "../Shared/DTOs/stock-transfer-request";
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
  selector: "app-stock-transfer-request",
  templateUrl: "./stock-transfer-request.component.html",
})
export class StockTransferRequestComponent {
  stockTransferRequest: StockTransferRequest = new StockTransferRequest();
  restrictionDto: RestrictionDto = new RestrictionDto();
  stockTransferRequestNew: StockTransferRequestNew =
    new StockTransferRequestNew();
  dateValue: Date;
  maxDate: Date;
  documentNumber: string;
  calendar_disability = true;
  tableData: any;
  count: number;
  displayModal: boolean;
  displayBuilting: boolean;
  editMode: boolean;
  view: boolean;
  reviseMode: boolean;
  saving: boolean;
  target = "StockTransferNote";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  gridApi: any;
  setParms: any;
  copyCount: number;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  locationId: number;
  locationName: string;
  displayStock: boolean;
  stockData: any;
  selectedIds = [];
  selectedFile: File | null = null;
  currentPage = 1;
  currentPageReq = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 10,
    DocOrVocNumber: "",
  };
  copyFilterDto = {
    skipCount: 0,
    maxCount: 10,
    DocOrVocNumber: "",
    status: "APPROVED",
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
    this.VoucherRestriction("STN");
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
            this.stockTransferRequest = response;
            this.stockTransferRequest.issueDate = new Date(response.issueDate);
            this.stockTransferRequest.userLocationId = response.userLocationId;
            this.stockTransferRequest.userLocationName =
              response.userLocationName;
            this.stockTransferRequest.consumptionMonth = new Date(
              response.consumptionMonth
            );
            this.stockTransferRequest.voucherNumber = response.voucherNumber;
            this.stockTransferRequest.requesterprojectId =
              response.requesterProjectId;
            this.stockTransferRequest.requesterprojectName =
              response.requesterProjectName;
            this.stockTransferRequest.requestercostCenterId =
              response.requesterCostCenterId;
            this.stockTransferRequest.requestercostCenterName =
              response.requesterCostCenterName;
            this.stockTransferRequest.fromprojectId = response.projectId;
            this.stockTransferRequest.fromprojectName = response.projectName;
            this.stockTransferRequest.fromcostCenterId = response.costCenterId;
            this.stockTransferRequest.fromcostCenterName =
              response.costCenterName;
            this.stockTransferRequest.remarks = response.remarks;
            // this.stockTransferRequest.providerRegionId = response.regionId;
            // this.stockTransferRequest.providerRegionName = response.regionName;
            // this.stockTransferRequest.regionId = response.requesterRegionId;
            // this.stockTransferRequest.regionName = response.requesterRegionName;
            this.rowData = this.prepareGridData(
              response.stockTransferNoteDetails
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
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.stockTransferRequest = new StockTransferRequest();
      this.rowData = [];
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    debugger;
    if (!this.validationOfTransferNot()) {
      return;
    }

    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        StockRequisitionDetailId: node.data.id,
        givenQty: node.data.newTransfer,
        requestedQty: node.data.pendingQty,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.stockTransferRequest.stockTransferNoteDetails = tempArr;
    this.stockTransferRequest.id = 0;
    this._basicTypeService
      .create(this.stockTransferRequest, this.target)
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
    if (!this.stockTransferRequest.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockTransferRequest.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockTransferRequest.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    // if (!this.stockTransferRequest.remarks) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "remarks is Required",
    //     life: 2000,
    //   });
    //   this.saving = false;
    //   return;
    // }
    return true;
  }

  update() {
    debugger;
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        StockRequisitionDetailId: node.data.id,
        givenQty: node.data.newTransfer,
        requestedQty: node.data.pendingQty,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.stockTransferRequest.stockTransferNoteDetails = tempArr;
    this._basicTypeService
      .update(this.stockTransferRequest, this.target)
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
      case "UserLocation":
        debugger;
        this.stockTransferRequest.userLocationId = +value.id;
        this.stockTransferRequest.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      case "CostCenterFrom":
        debugger;
        this.stockTransferRequest.fromcostCenterId = +value.id;
        this.stockTransferRequest.fromcostCenterName = value.name;
        break;
      case "ProjectFrom":
        debugger;
        this.stockTransferRequest.fromprojectId = +value.id;
        this.stockTransferRequest.fromprojectName = value.name;
        break;
      case "CostCenterTo":
        debugger;
        this.stockTransferRequest.requestercostCenterId = +value.id;
        this.stockTransferRequest.requestercostCenterName = value.name;
        break;
      case "ProjectTo":
        debugger;
        this.stockTransferRequest.requesterprojectId = +value.id;
        this.stockTransferRequest.requesterprojectName = value.name;
        break;
      case "LocationTo":
        debugger;
        this.stockTransferRequest.requesterLocationId = +value.id;
        this.stockTransferRequest.requesterLocationName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.stockTransferRequest.regionId = +value.id;
      //   this.stockTransferRequest.regionName = value.name;
      //   break;
      // case "RegionTo":
      //   debugger;
      //   this.stockTransferRequest.providerRegionId = +value.id;
      //   this.stockTransferRequest.providerRegionName = value.name;
      //   break;

      default:
        alert(`${title} is not defined`);
    }
  }

  // getSerialNumber(id: any) {
  //     this._basicTypeService
  //         .GetCategoryCount(id)
  //         .pipe(
  //             finalize(() => { }),
  //             catchError((error) => {
  //                 this.messageService.add({
  //                     severity: "error",
  //                     summary: "Error",
  //                     detail: error.message,
  //                     life: 2000,
  //                 });
  //                 return throwError(error.message);
  //             })
  //         )
  //         .subscribe({
  //             next: (response) => {
  //                 console.log(response);
  //                 // this.stockItemDto.categoryId = response;
  //                 // this.stockItemDto.serialNumber = `${id}${this.stockItemDto.categoryId}`;
  //                 debugger
  //             },
  //         });
  // }

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
      headerName: "PO No.",
      editable: false,
      field: "poNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "SQ No.",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "User Stock",
      editable: false,
      field: "userStock",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Stock of To Location",
      editable: false,
      field: "stockOftoLocation",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "SQ QTY",
      editable: false,
      field: "pendingQty",
      resizable: false,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "PendingQty",
    //     editable: false,
    //     field: "pendingQty",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },

    // {
    //     headerName: "Already Transferred",
    //     editable: false,
    //     field: "transferQty",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    {
      headerName: "Transfer QTY",
      editable: true,
      field: "newTransfer",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "To Location Id",
    //     editable: false,
    //     field: "tolocation",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To Location Title",
    //     editable: false,
    //     field: "tolocationName",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To CostCenter Id",
    //     editable: false,
    //     field: "tocostCenter",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To CostCenter Title",
    //     editable: false,
    //     field: "tocostCenterName",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To Project Id",
    //     editable: false,
    //     field: "toProject",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "To Project Title",
    //     editable: false,
    //     field: "toProjectName",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    {
      headerName: "Remarks",
      editable: false,
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

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.stockTransferRequest.issueDate = value;
    }
    if (
      this.stockTransferRequest.userLocationId &&
      this.stockTransferRequest.issueDate
    ) {
      this.getVoucherNumber();
    }
  }

  OpenStockRequisition() {
    debugger;
    this.displayStock = true;
    this.GetRequisitions();
  }

  GetRequisitions() {
    this._basicTypeService
      .getAll("StockRequisition", this.copyFilterDto)
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
          this.copyCount = response.totalCount;
          this.stockData = response.items
            .filter(
              (item) =>
                item.providerLocationId ===
                this.stockTransferRequest.userLocationId
            )
            .filter((item) => item.status == "APPROVED")
            .filter((item) => item.stockTransferNoteStatus == "PENDING");
          // .filter((item) => this.selectedIds.includes(item.id));
        },
      });
  }

  onPageChangeCopyReq(event: any) {
    debugger;
    this.copyFilterDto.maxCount = event.rows;
    this.currentPageReq = event.page + 1;
    this.loading = true;
    this.copyFilterDto.skipCount =
      (this.currentPageReq - 1) * this.copyFilterDto.maxCount;
    this._basicTypeService
      .getAll("StockRequisition", this.copyFilterDto)
      .subscribe({
        next: (response) => {
          debugger;

          this.stockData = response.items;
          this.copyCount = response.totalCount;

          this.loading = false;
        },
      });
  }

  SelectRequisition(id: number) {
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
      .subscribe({
        next: (response) => {
          debugger;
          this.stockTransferRequest = response;
          this.dateValue = new Date(response.issueDate);
          this.maxDate = new Date();
          this.stockTransferRequest.consumptionMonth = new Date(
            response.consumptionMonth
          );
          this.calendar_disability = false;
          (this.stockTransferRequest.requesterLocationId =
            response.userLocationId),
            (this.stockTransferRequest.requesterLocationName =
              response.userLocationName),
            (this.stockTransferRequest.requestercostCenterId =
              response.costCenterId),
            (this.stockTransferRequest.requestercostCenterName =
              response.costCenterName),
            (this.stockTransferRequest.requesterprojectId = response.projectId),
            (this.stockTransferRequest.requesterprojectName =
              response.projectName),
            (this.stockTransferRequest.fromcostCenterId =
              response.providerCostCenterId),
            (this.stockTransferRequest.fromcostCenterName =
              response.providerCostCenterName),
            (this.stockTransferRequest.fromprojectId =
              response.providerProjectId),
            (this.stockTransferRequest.fromprojectName =
              response.providerProjectName),
            //   (this.stockTransferRequest.regionId = response.regionId);
            // this.stockTransferRequest.regionName = response.regionName;
            // this.stockTransferRequest.providerRegionId =
            //   response.providerRegionId;
            // this.stockTransferRequest.providerRegionName =
            //   response.providerRegionName;
            this.getVoucherNumber();
          this.selectedIds = [];
          var checkRow = response.stockRequisitionDetails.some((detail) =>
            this.rowData.some(
              (row) => row.voucherNumber === detail.voucherNumber
            )
          );
          if (checkRow) {
            this.messageService.add({
              severity: "error",
              detail: "This item has been already added",
              life: 2000,
            });
            this.displayStock = false;
            return;
          }
          this.stockTransferRequest.voucherNumber = null;
          this.selectedIds.push(response.id);
          this.rowData = [...this.rowData, ...response.stockRequisitionDetails];
          this.rowData = this.rowData
            .map((item) => ({
              ...item,
              pendingQty: item.pendingStockTransferNoteQty,
              stockrequisitionDetailId: item.id,
              userStock: item.providerStock,
              stockOftoLocation: item.requesterStock,
              voucherNumber: item.voucherNumber,
            }))
            .filter((item) => item.pendingQty !== 0);
          this.displayStock = false;
        },
      });
  }

  prepareGridData(details: any[]): any[] {
    debugger;
    return details.map((item, index) => ({
      id: item.stockRequisitionDetailId,
      sqNo: item.voucherNumber,
      remarks: item.remarks,
      issuedQty: item.issuedQty,
      itemName: item.itemName,
      itemId: item.itemId,
      unitId: item.unitId,
      unitName: item.unitName,
      voucherNumber: item.voucherNumber,
      newTransfer: item.givenQty,
      pendingQty: item.requestedQty,
      userStock: item.providerStock,
      stockOftoLocation: item.requesterStock,
    }));
  }

  OnCellValueChanged(params) {
    debugger;
    if (params.colDef.field == "newTransfer") {
      // Check if the transferred quantity is a negative value
      if (params.data.newTransfer < 0) {
        params.data.newTransfer = 0;
        this.onCellChangeFunction(
          params,
          "Transferred quantity cannot be negative"
        );
        this.gridApi.refreshCells();
        return;
      }
      // Check if transferredQty is greater than pendingQty
      if (params.data.newTransfer > params.data.pendingQty) {
        params.data.newTransfer = 0;
        // params.data.pendingQty = params.data.requestedQty - params.data.newTransfer;
        this.onCellChangeFunction(
          params,
          "Transferred quantity cannot be greater than SQ quantity"
        );
      }
      // Calculate pendingQty as requiredQty - transferredQty
      // params.data.pendingQty = params.data.pendingQty - params.data.newTransfer;
      (params.data.newTransfer = params.data.newTransfer),
        this.gridApi.refreshCells();
    }
  }

  onCellChangeFunction(params: any, message: string) {
    debugger;
    if (params.data.transferQty == undefined) {
      params.data.transferQty = 0;
    }
    this.gridApi.refreshCells();
    this.messageService.add({
      severity: "error",
      detail: message,
      life: 2000,
    });
    this.saving = false;
    return;
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

  validationOfBuilting(): boolean {
    debugger;
    if (!this.stockTransferRequestNew.builtyDate) {
      this.messageService.add({
        severity: "error",
        detail: "Builty Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockTransferRequestNew.builtyNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Builty Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockTransferRequestNew.natureOfTransport) {
      this.messageService.add({
        severity: "error",
        detail: "Nature of Transport is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockTransferRequestNew.attachmentScanCopyPath) {
      this.messageService.add({
        severity: "error",
        detail: "Scan Image is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    return true;
  }

  openBuilting(id: any) {
    this.stockTransferRequestNew.id = id;
    this.displayBuilting = true;
  }

  saveBuilting() {
    debugger;

    if (!this.validationOfBuilting()) {
      return;
    }

    this.saving = true;
    this._basicTypeService
      .createBuilty(this.stockTransferRequestNew, this.target)
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
          this.saving = false;
          this.displayBuilting = false;
          location.reload();
        },
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail: "No file selected",
        life: 2000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Convert file content to Base64 string
      const base64String = reader.result as string;
      const base64Data = JSON.stringify(base64String.split(",")[1]);

      this._basicTypeService
        .UploadImage(base64Data)
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
          next: (response: any) => {
            debugger;
            console.log(response);
            this.stockTransferRequestNew.attachmentScanCopyPath =
              response.result;
            this.messageService.add({
              severity: "success",
              summary: "Upload Successful",
              detail: "File uploaded successfully",
              life: 2000,
            });
          },
        });

      // .subscribe(response => {

      // });
    };

    reader.readAsDataURL(this.selectedFile);
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
    debugger;
    this.filterDto.DocOrVocNumber = inputValue;
    debugger;

    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onEnterCopyReq(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.copyFilterDto.DocOrVocNumber = inputValue;
    debugger;

    this._basicTypeService.getAll(this.target, this.copyFilterDto).subscribe({
      next: (response) => {
        debugger;

        this.stockData = response.items;
        this.copyCount = response.totalCount;

        this.loading = false;
      },
    });
  }
  getVoucherNumber() {
    debugger;
    this._restrictionService
      .getVoucherNumber(
        this.target,
        "STN",
        this.stockTransferRequest.issueDate,
        this.stockTransferRequest.userLocationId
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
          this.stockTransferRequest.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
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
