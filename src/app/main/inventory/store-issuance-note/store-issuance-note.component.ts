import { filter } from "rxjs/operators";
import { IssuanceNoteDto } from "./../Shared/DTOs/issuance-note-dto";
import { IssuanceNoteService } from "./../Shared/Services/issuance-note.service";
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
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";

@Component({
  selector: "app-store-issuance-note",
  templateUrl: "./store-issuance-note.component.html",
})
export class StoreIssuanceNoteComponent {
  storeIssuanceNote: IssuanceNoteDto = new IssuanceNoteDto();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  dateValue: Date;
  today: Date = new Date();
  calendar_disability = false;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  // regionId: number;
  // regionName: string;
  saving: boolean;
  target = "PartIssuanceNote";
  requisitionData: [] = [];
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  showMode: boolean;
  hasSelectedStockTransfer: boolean = false;
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
    private _issuanceNoteService: IssuanceNoteService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  show(id?: number) {
    debugger;
    if (id) {
      // this.editMode = true;
      this._issuanceNoteService
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
            this.calendar_disability = true;
            this.storeIssuanceNote = response;
            this.storeIssuanceNote.id = id;
            this.rowData = this.prepareGridData(
              response.partIssuanceNoteDetails
            );
            this.storeIssuanceNote.issueDate = new Date(response.issueDate);
            this.storeIssuanceNote.voucherNumber = response.voucherNumber;
            this.storeIssuanceNote.userLocationId = response.userLocationId;
            this.storeIssuanceNote.userLocationName = response.userLocationName;
            this.storeIssuanceNote.employeeId = response.employeeId;
            this.storeIssuanceNote.employeeName = response.employeeName;
            this.storeIssuanceNote.costCenterId = response.costCenterId;
            this.storeIssuanceNote.costCenterName = response.costCenterName;
            this.storeIssuanceNote.projectId = response.projectId;
            this.storeIssuanceNote.projectName = response.projectName;
            this.storeIssuanceNote.ohJobId = response.ohJobId;
            this.storeIssuanceNote.ohJobName = response.ohJobName;
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
      this.storeIssuanceNote.userLocationId = null;
      this.storeIssuanceNote.userLocationName = null;
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.storeIssuanceNote = new IssuanceNoteDto();
      this.rowData = [];
      this.storeIssuanceNote.issueDate = this.today;
    }
  }

  save() {
    debugger;
    if (!this.validation()) {
      return;
    }
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        internalPartRequisitionDetailId:
          node.data.internalPartRequisitionDetailId,
        serviceItemId: node.data.serviceItemId,
        batchNumber: node.data.batchNumber,
        mO_Number: node.data.mO_Number,
        requestedQty: node.data.pendingRequestedQty,
        stockInHandLocation: node.data.stockInHandLocation,
        stockInHandEmployee: node.data.stockInHandEmployee,
        issuedQty: node.data.issuedQty,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });

    this.storeIssuanceNote.partIssuanceNoteDetails = tempArr;
    this.storeIssuanceNote.id = 0;
    this._issuanceNoteService
      .create(this.storeIssuanceNote)
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
        internalPartRequisitionDetailId:
          node.data.internalPartRequisitionDetailId,
        batchNumber: node.data.batchNumber,
        mO_Number: node.data.mO_Number,
        itemId: node.data.itemId,
        itemName: node.data.itemName,
        requestedQty: node.data.pendingRequestedQty,
        stockInHandLocation: node.data.stockInHandLocation,
        stockInHandEmployee: node.data.stockInHandEmployee,
        issuedQty: node.data.issuedQty,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.storeIssuanceNote.partIssuanceNoteDetails = tempArr;
    if (
      this.storeIssuanceNote.costCenterName == "O/H" &&
      !this.storeIssuanceNote.ohJobName
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Note",
        detail: "Please add O/H Job",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    // Rest of your update method remains the same
    this._issuanceNoteService
      .update(this.storeIssuanceNote)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
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

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("EIN");
  }

  getAll() {
    this._issuanceNoteService
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

          // this.tableData = response.items.filter(i => i.piN_VoucherNumber?.startsWith("SE"));
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
        this._issuanceNoteService
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

  prepareGridData(partIssuanceNoteDetails: any[]): any[] {
    debugger;
    return partIssuanceNoteDetails.map((item, index) => ({
      pendingRequestedQty: item.requestedQty,
      itemName: item.itemName,
      itemId: item.itemId,
      batchNumber: item.batchNumber,
      mO_Number: item.mO_Number,
      iprVoucherNo: item.voucherNumber,
      remarks: item.remarks,
      issuedQty: item.issuedQty,
      stockInHandLocation: item.warehouseStock,
      stockInHandEmployee: item.employeeStock,
      internalPartRequisitionItemId: item.internalPartRequisitionItemId,
      id: item.id,
    }));
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.storeIssuanceNote.issueDate = value;
    }
    if (
      this.storeIssuanceNote.userLocationId &&
      this.storeIssuanceNote.issueDate
    ) {
      this.storeIssuanceNote.voucherNumber =
        "SE" +
        "/" +
        (this.storeIssuanceNote.issueDate.getMonth() + 1) +
        "/" +
        this.storeIssuanceNote.issueDate.getFullYear() +
        "/" +
        this.storeIssuanceNote.userLocationId;
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "UserLocation":
        debugger;
        this.storeIssuanceNote.userLocationId = +value.id;
        this.storeIssuanceNote.userLocationName = value.name;
        this.MakeVoucher();
        break;
      case "Project":
        debugger;
        this.storeIssuanceNote.projectId = +value.id;
        this.storeIssuanceNote.projectName = value.name;
        break;
      case "Employee":
        debugger;
        this.storeIssuanceNote.employeeId = +value.additional;
        this.storeIssuanceNote.employeeName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.storeIssuanceNote.costCenterId = +value.id;
        this.storeIssuanceNote.costCenterName = value.name;
        if (
          this.storeIssuanceNote.costCenterName == "O/H" &&
          !this.storeIssuanceNote.ohJobName
        ) {
          this.messageService.add({
            severity: "error",
            summary: "Note",
            detail: "Please add O/H Job",
            life: 2000,
          });
        }
        break;
      case "Job":
        debugger;
        this.storeIssuanceNote.ohJobId = +value.id;
        this.storeIssuanceNote.ohJobName = value.name;
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
    // {
    //   headerName: "Requested Qty",
    //   editable: false,
    //   field: "requestedQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Orderd Qty",
    //   editable: false,
    //   field: "orderQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Stock at Loc",
      editable: false,
      field: "stockInHandLocation",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Emp Stock",
      editable: false,
      field: "stockInHandEmployee",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Requested Qty",
      editable: false,
      field: "pendingRequestedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Issue Qty",
      editable: true,
      field: "issuedQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
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

  OnCellValueChanged(params) {
    debugger;

    if (params.data.issuedQty < 0) {
      params.data.issuedQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Issued Quantity cannot be negative.",
        life: 2000,
      });
    }

    if (params.data.issuedQty > params.data.pendingRequestedQty) {
      params.data.issuedQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Issued Quantity cannot be greater than Requested Quantity.",
        life: 2000,
      });
    }

    this.gridApi.refreshCells();
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
    this._issuanceNoteService
      .getAllInternalReq()
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
                item.userLocationId === this.storeIssuanceNote.userLocationId
            )
            .filter(
              (item) =>
                item.status == "APPROVED" && item.linkedStatus == "PENDING"
            );
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._issuanceNoteService
      .getDataForEditReq(id)
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
          // this.storeIssuanceNote = response;
          this.storeIssuanceNote.projectId = response.projectId;
          this.dateValue = new Date(response.documentDate);
          this.calendar_disability = true;
          this.storeIssuanceNote.projectName = response.projectName;
          this.storeIssuanceNote.costCenterId = response.costCenterId;
          this.storeIssuanceNote.costCenterName = response.costCenterName;
          this.storeIssuanceNote.employeeId = response.employeeId;
          this.storeIssuanceNote.employeeName = response.employeeName;
          this.storeIssuanceNote.ohJobId = response.ohJobId;
          this.storeIssuanceNote.ohJobName = response.ohJobName;
          // this.regionId = response.regionId;
          // this.regionName = response.regionName;
          this.rowData = response.internalPartRequisitionDetails;
          this.rowData = this.rowData
            .map((item, index) => ({
              ...item,
              // id: item.id,
              internalPartRequisitionDetailId: response.id,
              orderQty: item.requestedQty - item.pendingRequestedQty,
              iprVoucherNo: item.voucherNumber,
              stockInHandLocation: item.warehouseStock,
              stockInHandEmployee: item.employeeStock,
            }))
            .filter((item) => item.pendingRequestedQty !== 0);
          this.displayRequisition = false;
        },
      });
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
        this._issuanceNoteService
          .ApproveDocument(id)
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

  validation(): boolean {
    if (!this.storeIssuanceNote.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.storeIssuanceNote.costCenterName == "O/H" &&
      !this.storeIssuanceNote.ohJobName
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Note",
        detail: "Please add O/H Job",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.storeIssuanceNote.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
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

    return true;
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
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._issuanceNoteService.getAll(this.filterDto).subscribe({
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
    this._issuanceNoteService.getAll(this.filterDto).subscribe({
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
