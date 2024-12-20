import { ReturnNoteService } from "./../Shared/Services/return-note.service";
import { MaterialReturnNote } from "../Shared/DTOs/material-return-note";
import { Component, ViewChild } from "@angular/core";
import { MaterialReturnNoteService } from "../Shared/Services/material-return-note.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-material-return-note",
  templateUrl: "./material-return-note.component.html",
})
export class MaterialReturnNoteComponent {
  materialReturnNote: MaterialReturnNote = new MaterialReturnNote();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  displayModal: boolean;
  displayMaterialReturn: boolean;
  loading: boolean;
  editMode: boolean;
  saving: boolean;
  target = "MaterialReturnNote";
  requisitionData: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  currentPage: number = 1;
  filterDto = {
    maxCount: 5,
    skipCount: 0,
  };
  view: boolean;
  documentNumber: number;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _returnNoteService: ReturnNoteService,
    private _materialReturnNoteService: MaterialReturnNoteService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("MRN");
  }

  show(id?: number) {
    if (id) {
      // this.editMode = true;
      this._materialReturnNoteService
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
            //this.materialReturnNote = response;

            this.materialReturnNote.id = id;
            // this.materialReturnNote.voucherNumber = response.voucherNumber;
            // this.materialReturnNote.userLocationId = response.userLocationId;
            // this.materialReturnNote.userLocationName = response.userLocationName;
            debugger;
            // let data = response.items.map((item) => ({
            //     id: item.id,
            //     itemId: item.partIssuanceDetails.ipR_Details.itemId,
            //     itemName: item.partIssuanceDetails.ipR_Details.itemName,
            //     batchNumber: item.partIssuanceDetails.ipR_Details.batchNumber,
            //     mO_Number: item.partIssuanceDetails.ipR_Details.mO_Number,
            //     iprVoucherNo: item.partIssuanceDetails.ipR_Details.ipR_VoucherNumber,
            //     requestedQty: item.partIssuanceDetails.ipR_Details.requestedQty,
            //     pendingRequestedQty: item.issuedQty,
            //     stockInHandLocation: item.stockInHandLocation,
            //     stockInHandEmployee: item.stockInHandEmployee,
            //     returnedQty: item.returnedQty,
            //     partIssuanceNoteItemId: item.partIssuanceDetails.id,
            //     remarks: item.partIssuanceDetails.ipR_Details.remarks,
            // }));

            // this.rowData = data;
            // this.materialReturnNote.issueDate = new Date(response.issueDate);
            // this.displayModal = true;
            this.materialReturnNote.voucherNumber = response.voucherNumber;
            this.materialReturnNote.issueDate = new Date(response.issueDate);
            this.materialReturnNote.gatePassNumber = response.gatePassNumber;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationName",
            //   "locationId",
            //   response.userLocationId
            // );
            this.rowData = this.prepareGridDataIssuanceNote(
              response,
              response.details
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
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.materialReturnNote = new MaterialReturnNote();
      this.rowData = [];
      this.materialReturnNote.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  save() {
    debugger;
    this.saving = true;

    if (!this.materialReturnNote.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "DocumentDate is mandatory. It can't be empty or null.",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.materialReturnNote.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.materialReturnNote.voucherNumber) {
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
        id: 0,
        itemId: node.data.itemId,
        giN_VoucherNumber: node.data.giN_VoucherNumber,
        rejectedQty: node.data.rejectedQty,
        returnedQty: node.data.returnedQty,
        balanceQty: node.data.balanceQty,
        inspectedRefQty: node.data.inspectedRefQty,
        remarks: node.data.remarks,
        inspectionDetailId: node.data.inspectionDetailId,
        materialReturnNoteInfoId: 0,
      };
      tempArr.push(tempObj);
    });
    this.materialReturnNote.id = 0;
    this.materialReturnNote.details = tempArr;
    this._materialReturnNoteService
      .create(this.materialReturnNote, this.target)
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
      debugger;
      var tempObj = {
        id: node.data.id,
        itemId: node.data.itemId,
        giN_VoucherNumber: node.data.giN_VoucherNumber,
        rejectedQty: node.data.rejectedQty,
        returnedQty: node.data.returnedQty,
        balanceQty: node.data.balanceQty,
        inspectedRefQty: node.data.inspectedRefQty,
        remarks: node.data.remarks,
        materialReturnNoteInfoId: 0,
        inspectionDetailId: node.data.inspectionDetailId,
      };
      tempArr.push(tempObj);
    });
    this.materialReturnNote.details = tempArr;
    this._materialReturnNoteService
      .update(this.materialReturnNote, this.target)
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
    this._materialReturnNoteService
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
        this._materialReturnNoteService
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
        this._materialReturnNoteService
          .Approve(id, this.target)
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

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.materialReturnNote.userLocationId = +value.id;
        this.materialReturnNote.userLocationName = value.name;
        this.GetDocMaxCount("MaterialReturnNote", "MRN");
        break;
      case "Supplier":
        debugger;
        this.materialReturnNote.supplierId = +value.id;
        this.materialReturnNote.supplierName = value.name;
        // this.materialReturnNote.supplierSerialNumber = value.serialNumber
        break;

      default:
        alert(`${title} is not defined`);
    }
  }

  colDefs: ColDef[] = [
    {
      headerName: "Sr. No",
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
      headerName: "Item Name",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "UoM ID",
    //     editable: false,
    //     field: "uoMId",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "UoM Name",
    //     editable: false,
    //     field: "uoMName",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    {
      headerName: "Project Name",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center Name",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "GIN Voucher Number",
      editable: false,
      field: "giN_VoucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rejected Quantity",
      editable: false,
      field: "rejectedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Returned Quantity",
      editable: true,
      field: "returnedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Balance Quantity",
      editable: false,
      field: "balanceQty",
      resizable: false,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "Inspected Reference Quantity",
    //     editable: false,
    //     field: "inspectedRefQty",
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
    // {
    //     headerName: "Inspection Detail ID",
    //     editable: false,
    //     field: "inspectionDetailId",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "Inspection Items",
    //     editable: false,
    //     field: "inspectionItems",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "Gatepass Quantity In",
    //     editable: false,
    //     field: "gatepassQtyIn",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "Inspected Quantity",
    //     editable: false,
    //     field: "inspectedQty",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },

    // {
    //     headerName: "Acknowledge Quantity",
    //     editable: false,
    //     field: "acknowledgeQty",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
    // {
    //     headerName: "Rate",
    //     editable: false,
    //     field: "rate",
    //     resizable: true,
    //     suppressSizeToFit: true,
    // },
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

  OpenGetRequisitions() {
    debugger;
    this.displayMaterialReturn = true;
    this.GetRequisitions();
  }
  GetRequisitions() {
    this._materialReturnNoteService
      .getAllInspactions("InventoryInspectionNote")
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
          this.requisitionData = response.items;
          // .filter((item) => item.userLocationId === this.materialReturnNote.userLocationId)
          // .filter((item) => item.documentStatus == "APPROVED" && item.status == "PENDING");
        },
      });
  }

  SelectedInspactionNote(id: number) {
    this._materialReturnNoteService
      .getDataForEdit(id, "InventoryInspectionNote")
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
          // this.materialReturnNote = response
          // this.materialReturnNote.details = response.inspectionItems

          this.rowData = this.prepareGridDataIssuanceNote(
            response,
            response.inspectionItems
          );
          // .filter((item) => item.userLocationId === this.materialReturnNote.userLocationId)
          // .filter((item) => item.documentStatus == "APPROVED" && item.status == "PENDING");
          this.displayMaterialReturn = false;
        },
      });
  }

  prepareGridDataIssuanceNote(otherDetails, items: any[]): any[] {
    debugger;
    this.materialReturnNote.supplierId = otherDetails.supplierId;
    this.materialReturnNote.supplierName = otherDetails.supplierName;
    this.materialReturnNote.gatePassNumber = otherDetails.gatePassNumber;

    this.materialReturnNote.costCenterId = otherDetails.costCenterId;
    this.materialReturnNote.projectId = otherDetails.projectId;

    if (this.editMode) {
      debugger;
      return items.map((item, index) => ({
        id: item.id,
        itemId: item.itemId,
        itemName: item.itemName,
        uoMId: item.uoMId,
        uoMName: item.uoMName,
        projectName: otherDetails.projectName,
        costCenterName: otherDetails.costCenterName,
        giN_VoucherNumber: item.giN_VoucherNumber,
        rejectedQty: item.rejectedQty,
        returnedQty: item.returnedQty,
        balanceQty: item.balanceQty,
        inspectedRefQty: item.pendingQty,
        inspectionDetailId: item.inspectionDetailId,
        inspectionItems: item.inspectionItems,
        gatepassQtyIn: item.gatepassQtyIn,
        inspectedQty: item.inspectedQty,
        remarks: "remarks",
      }));
    } else {
      return items
        .filter((item) => item.rejectedQty !== 0)
        .map((item, index) => ({
          itemId: item.itemId,
          itemName: item.itemName,
          uoMId: item.uoMId,
          uoMName: item.uoMName,
          projectName: otherDetails.projectName,
          costCenterName: otherDetails.costCenterName,
          giN_VoucherNumber: item.inwardVoucherNumber
            ? item.inwardVoucherNumber
            : item.giN_VoucherNumber,
          rejectedQty: item.rejectedQty,
          returnedQty: item.rejectedQty,
          balanceQty: 0,
          inspectedRefQty: item.materialReturnNotePendingQty,
          inspectionDetailId: item.id,
          inspectionItems: item.inspectionItems,
          gatepassQtyIn: item.gatepassQtyIn,
          inspectedQty: item.inspectedQty,
          remarks: "remarks",
          acknowledgeQty: item.acknowledgeQty,
          rate: item.rate,
        }));
    }
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

    if (params.data.returnedQty > params.data.rejectedQty) {
      params.data.returnedQty = 0;
      this.messageService.add({
        severity: "error",
        detail:
          "Returned Quantity cannot be greater than RejectedQty Quantity.",
        life: 2000,
      });
    }
    params.data.balanceQty = +(
      params.data.rejectedQty - params.data.returnedQty
    );

    this.gridApi.refreshCells();
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.materialReturnNote.issueDate = value;
    }
    if (
      this.materialReturnNote.userLocationId &&
      this.materialReturnNote.issueDate
    ) {
      this.GetDocMaxCount("MaterialReturnNote", "MRN");
    }
  }
  MakeVoucher() {
    debugger;

    if (this.materialReturnNote.userLocationId && this.documentNumber) {
      this.materialReturnNote.voucherNumber =
        "SVR-HNL" +
        "-" +
        this.materialReturnNote.userLocationId +
        "-" +
        this.materialReturnNote.issueDate.getFullYear() +
        "-" +
        (this.materialReturnNote.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("MaterialReturnNote", "MRN");
    }
  }

  GetVoucherNumber() {
    debugger;

    if (this.materialReturnNote.userLocationId && this.documentNumber) {
      this.materialReturnNote.voucherNumber =
        "SVR-HNL" +
        "-" +
        this.materialReturnNote.userLocationId +
        "-" +
        this.materialReturnNote.issueDate.getFullYear() +
        "-" +
        (this.materialReturnNote.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("MaterialReturnNote", "MRN");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._materialReturnNoteService
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
          this.materialReturnNote.userLocationName = response.items[0].name;
          this.materialReturnNote.userLocationId = response.items[0].id;
          this.GetDocMaxCount("MaterialReturnNote", "MRN");
        },
      });
  }

  GetDocMaxCount(target: string, prefix: string) {
    const { issueDate, userLocationId } = this.materialReturnNote;

    debugger;
    if (target && prefix && issueDate && userLocationId) {
      var prams = {
        Target: target,
        Prefix: prefix,
        IssueDate: this.materialReturnNote.issueDate,
        UserLocationId: this.materialReturnNote.userLocationId,
      };

      this._materialReturnNoteService
        .GetVoucherNumber(prams)
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
          next: (response: string) => {
            debugger;
            this.materialReturnNote.voucherNumber = response;
          },
        });
    }
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
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._materialReturnNoteService
      .getAll(this.target, this.filterDto)
      .subscribe({
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
