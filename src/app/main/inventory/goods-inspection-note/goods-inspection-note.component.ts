import { GoodsInspectionNoteService } from "./../Shared/Services/goods-inspection-note.service";
import { GoodsInspectionNoteDto } from "./../Shared/DTOs/goods-inspection-note-dto";
import { Component, ViewChild } from "@angular/core";
import { ServiceOrder } from "../Shared/DTOs/service-order";
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
  selector: "app-goods-inspection-note",
  templateUrl: "./goods-inspection-note.component.html",
})
export class GoodsInspectionNoteComponent {
  goodsInspectionNoteDto: GoodsInspectionNoteDto = new GoodsInspectionNoteDto();
  restrictionDto: RestrictionDto = new RestrictionDto();

  dateValue: Date;
  docCount: number;
  calendar_disability = false;
  tableData: any;
  requisitionData: any;
  documentNumber: string;
  today: Date = new Date();
  MinDate: Date = new Date();
  count: number;
  // regionId: number;
  // regionName: string;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  saving: boolean;
  serialNumber: number;
  target = "GoodsInspectionNote";
  rowData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowSelection: string;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  serviceRequistionId: number;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  currentPage: number = 1;
  loading: boolean;
  selectedIds: number[] = [];
  view: boolean;
  constructor(
    private _goodsInspectionNoteService: GoodsInspectionNoteService,
    private _basicTypeService: SetupsService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("GIN");
  }

  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
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

  getAll() {
    this._goodsInspectionNoteService
      .getAll()
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
        this._goodsInspectionNoteService
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

  show(id?: number) {
    if (id) {
      // this.editMode = true;
      this._goodsInspectionNoteService
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
            this.goodsInspectionNoteDto = response;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationId",
            //   "locationName",
            //   response.userLocationName
            // );
            this.goodsInspectionNoteDto.issueDate = new Date(
              response.issueDate
            );
            this.goodsInspectionNoteDto.deliveryChallanDate = new Date(
              response.deliveryChallanDate
            );
            this.goodsInspectionNoteDto.invoiceDate = new Date(
              response.invoiceDate
            );
            this.serialNumber = response.supplierSerialNumber;
            this.rowData = this.prepareGridDataGin(
              response.goodsInspectionNoteDetails
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
      this.goodsInspectionNoteDto = new GoodsInspectionNoteDto();
      this.selectedIds = [];
      this.goodsInspectionNoteDto.costCenterId = undefined;
      this.goodsInspectionNoteDto.costCenterName = undefined;
      this.goodsInspectionNoteDto.projectId = undefined;
      this.goodsInspectionNoteDto.projectName = undefined;
      this.rowData = [];
      this.goodsInspectionNoteDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.goodsInspectionNoteDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Buy Month is Required",
      });
      this.saving = false;
      return;
    }
    if (!this.goodsInspectionNoteDto.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
      });
      this.saving = false;
      return;
    }
    if (!this.goodsInspectionNoteDto.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Supplier Id is Required",
      });
      this.saving = false;
      return;
    }

    // if (!this.goodsInspectionNoteDto.remarks) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "Terms is Required",
    //   });
    //   this.saving = false;
    //   return;
    // }

    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        inwardGatepassDetailId: node.data.inwardGatepassDetailId,
        acknowledgeQty: node.data.qtyAck,
        inspectedQty: node.data.gipIns,
        rejectedQty: node.data.rejQty,
        gatepassQtyIn: node.data.gipQty,
        rate: node.data?.rate || 0,
        totalAmount: node.data.totalAmount,
        remarks: node.data.remarks,
        // inwardVoucherNumber:
        //   this.goodsInspectionNoteDto.voucherNumber + "/" + (index + 1),
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    this.goodsInspectionNoteDto.goodsInspectionNoteDetails = tempArr;

    this._goodsInspectionNoteService
      .create(this.goodsInspectionNoteDto)
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
        inwardGatepassDetailId: node.data.id,
        acknowledgeQty: node.data.qtyAck,
        inspectedQty: node.data.gipIns,
        rejectedQty: node.data.rejQty,
        gatepassQtyIn: node.data.gipQty,
        rate: node.data?.rate || 0,
        totalAmount: node.data.totalAmount,
        remarks: node.data.remarks,
        // inwardVoucherNumber:
        //   this.goodsInspectionNoteDto.voucherNumber + "/" + (index + 1),
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    this.goodsInspectionNoteDto.goodsInspectionNoteDetails = tempArr;
    this._goodsInspectionNoteService
      .update(this.goodsInspectionNoteDto)
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
        this.goodsInspectionNoteDto.userLocationId = +value.id;
        this.goodsInspectionNoteDto.userLocationName = value.name;
        this.GetDocMaxCount("GoodsInspectionNote");
        break;
      case "Supplier":
        debugger;
        this.goodsInspectionNoteDto.supplierId = +value.id;
        this.goodsInspectionNoteDto.supplierName = value.name;
        this.serialNumber = value.serialNumber;
        break;
      case "Project":
        debugger;
        this.goodsInspectionNoteDto.projectId = +value.id;
        this.goodsInspectionNoteDto.projectName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.goodsInspectionNoteDto.costCenterId = +value.id;
        this.goodsInspectionNoteDto.costCenterName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  // HandleDateChange(value: Date) {
  //   this.goodsInspectionNoteDto.issueDate = value;
  //   debugger;
  //   const { issueDate, userLocationId } = this.goodsInspectionNoteDto;
  //   if (issueDate && userLocationId) {
  //     // this.getNextCount();
  //   }
  // }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.goodsInspectionNoteDto.issueDate = value;
    }
    if (
      this.goodsInspectionNoteDto.userLocationId &&
      this.goodsInspectionNoteDto.issueDate
    ) {
      this.GetDocMaxCount("GoodsInspectionNote");
    }
  }

  // getNextCount() {
  //   const { issueDate, userLocationId } = this.goodsInspectionNoteDto;
  //   if (issueDate && userLocationId) {
  //     this._goodsInspectionNoteService
  //       .getMaxCount(new Date(issueDate), userLocationId)
  //       .subscribe((result) => {
  //         this.docCount = result;
  //         this.MakeVoucher();
  //       });
  //   }
  // }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.goodsInspectionNoteDto.userLocationId &&
      this.goodsInspectionNoteDto.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.goodsInspectionNoteDto.userLocationId,
          this.goodsInspectionNoteDto.issueDate
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

  MakeVoucher() {
    debugger;
    if (this.goodsInspectionNoteDto.userLocationId && this.documentNumber) {
      this.goodsInspectionNoteDto.voucherNumber =
        "GIN-HNL" +
        "-" +
        this.goodsInspectionNoteDto.userLocationId +
        "-" +
        this.goodsInspectionNoteDto.issueDate.getFullYear() +
        "-" +
        (this.goodsInspectionNoteDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("GoodsInspectionNote");
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
          this.goodsInspectionNoteDto.userLocationName = response.items[0].name;
          this.goodsInspectionNoteDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("GoodsInspectionNote");
        },
      });
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  OpenServiceRequisition() {
    debugger;
    this.displayRequisition = true;
    this.GetRequisitions();
  }

  GetRequisitions() {
    this._basicTypeService
      .getAllRequisition("InwardGatepass")
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
          this.requisitionData = response.items.filter(
            (item) =>
              item.status == "APPROVED" &&
              item.goodsInspectionNoteStatus == "PENDING"
          );
        },
      });
  }

  SelectRequisition(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "InwardGatepass")
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
          response.inwardGatepassDetails =
            response.inwardGatepassDetails.filter(
              (i) => i.pendingInspectionQty !== 0
            );
          this.goodsInspectionNoteDto.costCenterId = response.costCenterId;
          this.goodsInspectionNoteDto.costCenterName = response.costCenterName;
          this.goodsInspectionNoteDto.projectId = response.projectId;
          this.goodsInspectionNoteDto.projectName = response.projectName;
          this.goodsInspectionNoteDto.supplierId = response.supplierId;
          this.goodsInspectionNoteDto.supplierName = response.supplierName;
          this.serialNumber = response.supplierSerialNumber;
          this.goodsInspectionNoteDto.employeeId = response.employeeId;
          this.goodsInspectionNoteDto.employeeName = response.employeeName;
          this.goodsInspectionNoteDto.PaymentModeId = response.PaymentModeId;
          this.goodsInspectionNoteDto.PaymentModeId = response.PaymentModeName;
          // this.goodsInspectionNoteDto.regionId = response.regionId;
          // this.goodsInspectionNoteDto.regionName = response.regionName;
          this.goodsInspectionNoteDto.deliveryChallanDate = new Date(
            response.deliveryChallanDate
          );
          this.goodsInspectionNoteDto.deliveryChallanNumber =
            response.deliveryChallanNumber;
          this.goodsInspectionNoteDto.gatepassNumber = response.gatePassNumber;
          //   this.goodsInspectionNoteDto.invoiceNumber = response.supplierName;
          this.selectedIds.push(response.id);
          this.rowData = this.prepareGridData(response);
          this.displayRequisition = false;
        },
      });
  }

  prepareGridData(response: any): any[] {
    debugger;
    var mapped_details = response.inwardGatepassDetails.map((item, index) => ({
      inwardGatepassDetailId: item.id,
      rate: item.rate,
      gipNo: response.voucherNumber,
      gipQty: item.pendingGoodsInspectionNoteQty,
      gipIns: item.pendingGoodsInspectionNoteQty,
      itemId: item.itemId,
      itemName: item.itemName,
    }));
    return mapped_details;
  }

  prepareGridDataGin(goodsInspectionNoteDetails: any[]): any[] {
    debugger;
    var mapped_details = goodsInspectionNoteDetails.map((item, index) => ({
      id: item.inwardGatepassDetailId,
      rate: item.rate,
      gipNo: item.voucherNumber,
      gipQty: item.gatepassQtyIn,
      gipIns: item.inspectedQty,
      rejQty: item.rejectedQty,
      qtyAck: item.acknowledgeQty,
      remarks: item.remarks,
      itemId: item.itemId,
      itemName: item.itemName,
      totalAmount: item.totalAmount,
    }));
    return mapped_details;
  }

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      width: 80,
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "GIP.NO",
      editable: false,
      field: "gipNo",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "GIP QTY",
      editable: false,
      field: "gipQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "GIP INS",
      editable: false,
      field: "gipIns",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Rejected Qty",
      editable: true,
      field: "rejQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },

    {
      headerName: "QTY Ack.",
      editable: false,
      field: "qtyAck",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "PO Rate",
      editable: false,
      field: "rate",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
      valueParser: (params) => {
        let newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor",
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  OnCellValueChanged(params) {
    debugger;

    if (params.data.rejQty > params.data.gipIns) {
      params.data.rejQty = 0;
      params.data.totalAmount = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        detail: "REJ QTY exceeds GIP INS QTY",
      });
      this.saving = false;
      return;
    }
    params.data.qtyAck = params.data.gipQty - params.data.rejQty;
    params.data.totalAmount = params.data.rate * params.data.qtyAck;
    this.gridApi.refreshCells();
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

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
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
