import { ReturnNoteService } from "./../Shared/Services/return-note.service";
import { ReturnNote } from "./../Shared/DTOs/return-note";
import { Component, ViewChild } from "@angular/core";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { InternalpartRequisition } from "../Shared/DTOs/internalpart-requisition";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-store-return-note",
  templateUrl: "./store-return-note.component.html",
})
export class StoreReturnNoteComponent {
  storeReturnNote: ReturnNote = new ReturnNote();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  saving: boolean;
  // regionId: number;
  // regionName: string;
  today: Date = new Date();
  MinDate: Date = new Date();
  target = "PartReturnNote";
  requisitionData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  view: boolean;
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _returnNoteService: ReturnNoteService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SRN");
  }

  show(id?: number) {
    if (id) {
      // this.editMode = true;
      this._returnNoteService
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
            this.storeReturnNote = response;
            this.storeReturnNote.voucherNumber = response.voucherNumber;
            this.storeReturnNote.userLocationId = response.userLocationId;
            this.storeReturnNote.userLocationName = response.userLocationName;
            debugger;
            let data = response.partReturnNoteDetails.map((item) => ({
              id: item.id,
              itemId: item.itemId,
              itemName: item.itemName,
              batchNumber: item.batchNumber,
              mO_Number: item.mO_Number,
              iprVoucherNo: item.voucherNumber,
              requestedQty: item.requestedQty,
              issuedQty: item.issuedQty,
              warehouseStock: item.warehouseStock,
              employeeStock: item.employeeStock,
              returnedQty: item.returnedQty,
              unitId: item.unitId,
              unitName: item.unitName,
              PartIssuanceNoteDetailId: item.PartIssuanceNoteDetailId,
              remarks: item.remarks,
            }));

            this.rowData = data;
            this.storeReturnNote.issueDate = new Date(response.issueDate);
            // this.regionId = response.regionId;
            // this.regionName = response.regionName;
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
      this.storeReturnNote.userLocationId = null;
      this.storeReturnNote.userLocationName = null;
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.storeReturnNote = new ReturnNote();
      this.rowData = [];
      this.storeReturnNote.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  save() {
    debugger;
    this.saving = true;

    if (!this.storeReturnNote.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "DocumentDate is mandatory. It can't be empty or null.",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.storeReturnNote.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.storeReturnNote.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        PartIssuanceNoteDetailId: node.data.PartIssuanceNoteDetailId,
        stockInHandEmployee: node.data.stockInHandEmployee,
        stockInHandLocation: node.data.stockInHandLocation,
        issuedQty: node.data.issuedQty,
        returnedQty: node.data.returnedQty,
        remarks: node.data.remarks,
        batchNumber: node.data.batchNumber,
        mO_Number: node.data.mO_Number,
        iprVoucherNo: node.data.voucherNumber,
      };
      tempArr.push(tempObj);
    });
    this.storeReturnNote.id = 0;
    this.storeReturnNote.partReturnNoteDetails = tempArr;
    this._returnNoteService
      .create(this.storeReturnNote)
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
        returnedQty: node.data.returnedQty,
        issuedQty: node.data.pendingRequestedQty,
        partIssuanceNoteItemId: node.data.partIssuanceNoteItemId,
        stockInHandEmployee: node.data.stockInHandEmployee,
        stockInHandLocation: node.data.stockInHandLocation,
        partReturnNoteInfoId: 0,
      };
      tempArr.push(tempObj);
    });
    this.storeReturnNote.partReturnNoteDetails = tempArr;
    this._returnNoteService
      .update(this.storeReturnNote)
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

  getAll() {
    this._returnNoteService
      .getAll(this.filterDto)
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
        this._returnNoteService
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

  approve(id: number) {
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
        this._returnNoteService
          .approve(id)
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

  prepareGridData(items: any[]): any[] {
    debugger;
    return items.map((item, index) => ({
      serviceItemId: item.serviceItemId,
      batchNumber: item.batchNumber,
      mO_Number: item.mO_Number,
      requiredQty: item.requiredQty,
      returnedQty: item.returnedQty,
      remarks: item.remarks,
      partIssuanceNoteItemId: item.id,
    }));
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.storeReturnNote.issueDate = value;
    }
    if (this.storeReturnNote.userLocationId && this.storeReturnNote.issueDate) {
      this.storeReturnNote.voucherNumber =
        "SN" +
        "/" +
        (this.storeReturnNote.issueDate.getMonth() + 1) +
        "/" +
        this.storeReturnNote.issueDate.getFullYear() +
        "/" +
        this.storeReturnNote.userLocationId;
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.storeReturnNote.userLocationId = +value.id;
        this.storeReturnNote.userLocationName = value.name;
        this.MakeVoucher();
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
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },

    {
      headerName: "Item ID",
      editable: false,
      field: "itemId",
      resizable: true,
      width: 90,
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
      headerName: "Unit ID",
      editable: false,
      field: "unitId",
      resizable: true,
      width: 90,
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
      headerName: "Batch Number",
      editable: false,
      field: "batchNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "MO Number",
      editable: false,
      field: "mO_Number",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "IPR VoucherNo",
      editable: false,
      field: "iprVoucherNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Stock at Loc",
      editable: false,
      field: "warehouseStock",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Emp Stock",
      editable: false,
      field: "employeeStock",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Required Qty",
      editable: false,
      field: "requestedQty",
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Issuance Qty",
      editable: false,
      field: "issuedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Returned Qty",
      editable: true,
      field: "returnedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  // colDefsForEdit: ColDef[] = [
  //     {
  //         headerName: "id",
  //         editable: false,
  //         field: "id",
  //         sortable: true,
  //         width: 90,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Item ID",
  //         editable: false,
  //         field: "itemId",
  //         resizable: true,
  //         width: 90,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Item Title",
  //         editable: false,
  //         field: "itemName",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Batch Number",
  //         editable: false,
  //         field: "batchNumber",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "MO Number",
  //         editable: false,
  //         field: "mO_Number",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "IPR VoucherNo",
  //         editable: false,
  //         field: "iprVoucherNo",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Required Qty",
  //         editable: false,
  //         field: "requestedQty",
  //         resizable: false,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Pending Qty",
  //         editable: false,
  //         field: "pendingRequestedQty",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Returned Qty",
  //         editable: true,
  //         field: "returnedQty",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  //     {
  //         headerName: "Remarks",
  //         editable: false,
  //         field: "remarks",
  //         resizable: true,
  //         suppressSizeToFit: true,
  //     },
  // ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        debugger;
        this.setParms = params;
        this.openSelectItem();
        break;
      default:
        break;
    }
  }

  openSelectItem() {
    debugger;
    const initialState: any = {
      target: "ServiceItem",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.serviceserviceItemId = +result.id.split("/")[0];
      this.setParms.data.serviceItemName = result.name;
      this.gridApi.refreshCells();
    });
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  OpenFixedRequisition() {
    debugger;
    this.displayRequisition = true;
    this.GetRequisitions();
  }

  GetRequisitions() {
    this._returnNoteService
      .getAllIssuanceNote()
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
          this.requisitionData = response.items
            .filter(
              (item) =>
                item.userLocationId === this.storeReturnNote.userLocationId
            )
            .filter(
              (item) =>
                item.status == "APPROVED" &&
                item.partReturnNoteStatus == "PENDING"
            );
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._returnNoteService
      .getDataForEditIssuanceNote(id)
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
        this.storeReturnNote.projectId = response.projectId;
        this.storeReturnNote.projectName = response.projectName;
        this.storeReturnNote.costCenterId = response.costCenterId;
        this.storeReturnNote.costCenterName = response.costCenterName;
        this.storeReturnNote.employeeId = response.employeeErpId;
        this.storeReturnNote.employeeName = response.employeeName;
        this.storeReturnNote.ohJobId = response.ohJobId;
        this.storeReturnNote.ohJobName = response.ohJobName;
        // this.regionId = response.regionId;
        // this.regionName = response.regionName;
        this.storeReturnNote.id = id;
        this.rowData = this.prepareGridDataIssuanceNote(
          response.partIssuanceNoteDetails
        );
        this.displayRequisition = false;
      });
  }

  prepareGridDataIssuanceNote(partIssuanceNoteDetails: any[]): any[] {
    debugger;
    return partIssuanceNoteDetails.map((item, index) => ({
      itemId: item.itemId,
      itemName: item.itemName,
      mO_Number: item.mO_Number,
      batchNumber: item.batchNumber,
      requestedQty: item.requestedQty,
      iprVoucherNo: item.voucherNumber,
      issuedQty: item.issuedQty,
      returnedQty: item.returnedQty,
      remarks: item.remarks,
      unitId: item.unitId,
      unitName: item.unitName,
      warehouseStock: item.warehouseStock,
      employeeStock: item.employeeStock,
      PartIssuanceNoteDetailId: item.id,
    }));
  }

  OnCellValueChanged(params) {
    debugger;

    if (params.data.returnedQty < 0) {
      params.data.returnedQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Returned Quantity cannot be negative.",
        life: 2000,
      });
    }

    if (params.data.returnedQty > params.data.pendingRequestedQty) {
      params.data.returnedQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Returned Quantity cannot be greater than Requested Quantity.",
        life: 2000,
      });
    }

    this.gridApi.refreshCells();
  }

  CloseModel() {
    // this.view = true;
    this.displayModal = false;
  }

  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
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
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.DocOrVocNumber = inputValue;
    this._returnNoteService.getAll(this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * this.filterDto.maxCount;
    this._returnNoteService.getAll(this.filterDto).subscribe({
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
