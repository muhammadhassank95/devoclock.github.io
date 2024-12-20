import { PurchaseInvoiceDto } from "./../Shared/DTOs/purchase-invoice-dto";
import { Component, ViewChild } from "@angular/core";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-purchase-invoice",
  templateUrl: "./purchase-invoice.component.html",
})
export class PurchaseInvoiceComponent {
  purchaseInvoiceDto: PurchaseInvoiceDto = new PurchaseInvoiceDto();
  restrictionDto: RestrictionDto = new RestrictionDto();

  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  dateValue: Date;
  calendar_disability = true;
  displayOrder: boolean;
  OrderData: any;
  serialNumber: number;
  EmpSerialNumber: number;
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  loading: boolean;
  view: boolean;
  saving: boolean;
  documentNumber: string;
  target = "PurchaseInvoice";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  gridApi: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  // regionId: number;
  // regionName: string;
  setParms: any;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  currentPage: number = 1;
  filterDto = {
    maxCount: 5,
    skipCount: 0,
  };
  userlocationId: number;
  locationName: string;
  suggestionModalRef: BsModalRef;
  STaxAmount: number;
  ExciseAmount: number;
  selectedIds: number[] = [];

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("PU");
  }

  getAll() {
    this._basicTypeService
      .getAll(this.target)
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
    debugger;
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
            // this.getDefaultLocation(
            //   "Location",
            //   "locationName",
            //   "userlocationId",
            //   response.costCenterId
            // );
            this.purchaseInvoiceDto = response;
            this.EmpSerialNumber = response.employeeErpId;
            this.purchaseInvoiceDto.issueDate = new Date(response.issueDate);
            this.purchaseInvoiceDto.invoiceDate = new Date(
              response.invoiceDate
            );
            this.serialNumber = response.supplierSerialNumber;
            this.purchaseInvoiceDto.voucherNumber = response.voucherNumber;
            this.rowData = this.InvoicePrepareGridData(
              response.purchaseInvoiceDetails
            );
            this.recalculateServiceOrder();
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
      this.getDefaultLocation("Location", "locationName", "userlocationId", "");
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.purchaseInvoiceDto = new PurchaseInvoiceDto();
      this.EmpSerialNumber = null;
      this.serialNumber = null;
      // this.userlocationId = null;
      // this.locationName = "";
      this.purchaseInvoiceDto.supplierId = null;
      this.purchaseInvoiceDto.supplierName = "";
      this.rowData = [];
      this.purchaseInvoiceDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.purchaseInvoiceDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Buy Month is Required",
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseInvoiceDto.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseInvoiceDto.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Supplier Id is Required",
      });
      this.saving = false;
      return;
    }

    if (!this.purchaseInvoiceDto.terms) {
      this.messageService.add({
        severity: "error",
        detail: "Terms is Required",
      });
      this.saving = false;
      return;
    }
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        goodsInspectionNoteDetailId: node.data.goodsInspectionNoteDetailId,
        acknowledgeQty: node.data.qtyAck,
        inspectedQty: node.data.gipQty,
        rejectedQty: node.data.rejQty,
        invoiceQty: node.data.qty,
        rate: node.data?.rate || 0,
        discount: node.data.discount,
        total: node.data.totalAmount,
        remarks: node.data.remarks,
        inspectionVoucherNumber:
          this.purchaseInvoiceDto.voucherNumber + "/" + (index + 1),
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    debugger;
    this.purchaseInvoiceDto.purchaseInvoiceDetails = tempArr;
    this._basicTypeService
      .create(this.purchaseInvoiceDto, this.target)
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
    debugger;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        goodsInspectionNoteDetailId: node.data.goodsInspectionNoteDetailId,
        acknowledgeQty: node.data.qtyAck,
        inspectedQty: node.data.gipQty,
        rejectedQty: node.data.rejQty,
        invoiceQty: node.data.qty,
        rate: node.data?.rate || 0,
        discount: node.data.discount,
        total: node.data.totalAmount,
        remarks: node.data.remarks,
        inspectionVoucherNumber:
          this.purchaseInvoiceDto.voucherNumber + "/" + (index + 1),
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    this.purchaseInvoiceDto.purchaseInvoiceDetails = tempArr;
    this._basicTypeService
      .update(this.purchaseInvoiceDto, this.target)
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
        this.userlocationId = +value.id;
        this.locationName = value.name;
        this.GetDocMaxCount("PurchaseInvoice");
        break;
      case "Supplier":
        debugger;
        this.purchaseInvoiceDto.supplierId = +value.id;
        this.purchaseInvoiceDto.supplierName = value.name;
        this.serialNumber = value.serialNumber;
        break;
      case "Employee":
        debugger;
        this.purchaseInvoiceDto.employeeId = +value.additional;
        this.EmpSerialNumber = value.id;
        this.purchaseInvoiceDto.employeeName = value.name;
        break;

      case "Project":
        debugger;
        this.purchaseInvoiceDto.projectId = +value.id;
        this.purchaseInvoiceDto.projectName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.purchaseInvoiceDto.costCenterId = +value.id;
        this.purchaseInvoiceDto.costCenterName = value.name;
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
      width: 80,
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
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
      width: 200,
    },
    {
      headerName: "GIN No.",
      editable: false,
      field: "ginNo",
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
      width: 150,
    },
    {
      headerName: "Rejected Qty",
      editable: false,
      field: "rejQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "QTY Ack.",
      editable: false,
      field: "qtyAck",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "QTY",
      editable: true,
      field: "qty",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Rate",
      editable: false,
      field: "rate",
      resizable: true,
      suppressSizeToFit: true,
      type: "number",
      width: 150,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Discount Amount",
      editable: true,
      field: "discount",
      type: "number",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
    },
    {
      headerName: "Total Amount Aft Disc.",
      editable: false,
      field: "totalAmountDis",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
      // valueGetter: function (params) {
      //   const totalAmount = parseFloat(params.data.totalAmount) || 0;
      //   const discount = parseFloat(params.data.discount) || 0;
      //   const totalAmountDis = totalAmount - discount;
      //   return isNaN(totalAmountDis) ? 0 : totalAmountDis;
      // },
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  OpenGoodsInpNote() {
    debugger;
    this.displayOrder = true;
    this.GetGoodsInpNote();
  }

  GetGoodsInpNote() {
    this._basicTypeService
      .getAll("GoodsInspectionNote")
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
          this.OrderData = response.items;
          // .filter((item) => !this.selectedIds.includes(item.id))
          // .filter(
          //   (item) =>
          //     item.documentStatus == "APPROVED" && item.status == "PENDING"
          // );
        },
      });
  }

  SelectGetGoodsInpNote(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "GoodsInspectionNote")
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
          this.purchaseInvoiceDto.supplierId = response.supplierId;
          this.purchaseInvoiceDto.supplierName = response.supplierName;
          this.serialNumber = response.supplierSerialNumber;
          this.purchaseInvoiceDto.employeeId = response.employeeId;
          this.EmpSerialNumber = response.employeeErpId;
          this.purchaseInvoiceDto.employeeName = response.employeeName;
          this.purchaseInvoiceDto.costCenterId = response.costCenterId;
          this.purchaseInvoiceDto.costCenterName = response.costCenterName;
          this.purchaseInvoiceDto.projectId = response.projectId;
          this.purchaseInvoiceDto.projectName = response.projectName;
          // this.purchaseInvoiceDto.regionId = response.regionId;
          // this.purchaseInvoiceDto.regionName = response.regionName;
          this.purchaseInvoiceDto.ginNumber = response.gatePassNumber;
          this.rowData = this.prepareGridData(
            response.goodsInspectionNoteDetails
          );
          this.displayOrder = false;
        },
      });
  }

  prepareGridData(data: any[]): any[] {
    console.log(data);
    debugger;
    return data.map((item, index) => ({
      goodsInspectionNoteDetailId: item.id,
      ginNo: item.voucherNumber,
      rate: item.rate,
      itemId: item.itemId,
      itemName: item.itemName,
      gipQty: item.inspectedQty,
      rejQty: item.rejectedQty,
      qtyAck: item.acknowledgeQty,
    }));
  }

  InvoicePrepareGridData(data: any[]): any[] {
    console.log(data);
    debugger;
    return data.map((item, index) => ({
      id: item.id,
      goodsInspectionNoteDetailId: item.goodsInspectionNoteDetailId,
      ginNo: item.inspectionVoucherNumber,
      rate: item.rate,
      gipQty: item.inspectedQty,
      rejQty: item.rejectedQty,
      qtyAck: item.acknowledgeQty,
      qty: item.invoiceQty,
      itemId: item.itemId,
      itemName: item.itemName,
      totalAmount: item.total,
      discount: item.discount,
      remarks: item.remarks,
      totalAmountDis: item.total - item.discount,
    }));
  }

  OnFreightChange(value) {
    this.purchaseInvoiceDto.freight = value;
    this.recalculateServiceOrder();
  }

  OnTaxChange(value, isServiceTax) {
    if (isServiceTax) {
      this.purchaseInvoiceDto.serviceTaxPct = value;
    } else {
      this.purchaseInvoiceDto.excisePct = value;
    }
    this.recalculateServiceOrder();
  }

  calculateNetAmount(event) {
    this.purchaseInvoiceDto.discount = event;
    this.recalculateServiceOrder();
  }

  //////Testing Code/////
  // OnCellValueChanged(params) {
  //   debugger;

  //   // Update Total Amount based on quantity and rate
  //   if (params.colDef.field === "qty" || params.colDef.field === "rate") {
  //     if (params.data.qty > params.data.qtyAck) {
  //       params.data.qty = 0;
  //       params.data.totalAmount = 0;
  //       this.gridApi.refreshCells();
  //       this.messageService.add({
  //         severity: "error",
  //         detail: "Invalid Quantity Purchase",
  //       });
  //       this.saving = false;
  //       return;
  //     }

  //     // Calculate total amount
  //     params.data.totalAmount = params.data.qty * params.data.rate;

  //     // Update discount if it's greater than the total amount
  //     if (params.data.discount > params.data.totalAmount) {
  //       params.data.discount = 0;
  //       this.messageService.add({
  //         severity: "error",
  //         detail: "Discount should be less than total amount",
  //         life: 2000,
  //       });
  //     }

  //     // Calculate total amount after discount
  //     params.data.totalAmountDis =
  //       params.data.totalAmount - params.data.discount;

  //     this.gridApi.refreshCells();
  //   }

  //   // Handle discount change specifically
  //   if (params.colDef.field === "discount") {
  //     if (params.data.discount > params.data.totalAmount) {
  //       params.data.discount = 0;
  //       this.messageService.add({
  //         severity: "error",
  //         detail: "Discount should be less than total amount",
  //         life: 2000,
  //       });
  //     }

  //     // Calculate total amount after discount
  //     params.data.totalAmountDis =
  //       params.data.totalAmount - params.data.discount;

  //     this.gridApi.refreshCells();
  //   }

  //   this.recalculateServiceOrder();
  // }

  ////////Update Code///////

  OnCellValueChanged(params) {
    debugger;
    if (params.colDef.field === "qty" || params.colDef.field === "rate") {
      params.data.qty = Number(params.data.qty) || 0;
      params.data.rate = Number(params.data.rate) || 0;
      if (params.data.qty > params.data.qtyAck) {
        params.data.qty = 0;
        params.data.totalAmount = 0;
        params.data.totalAmountDis = 0;
        this.gridApi.refreshCells();
        this.messageService.add({
          severity: "error",
          detail: "Invalid Quantity Purchase",
        });
        this.saving = false;
        return;
      }

      params.data.totalAmount = params.data.qty * params.data.rate;

      if (params.data.discount > params.data.totalAmount) {
        params.data.discount = 0;
        this.messageService.add({
          severity: "error",
          detail: "Discount should be less than total amount",
          life: 2000,
        });
      }

      params.data.totalAmountDis =
        params.data.totalAmount - (Number(params.data.discount) || 0);
      this.gridApi.refreshCells();
    }

    if (params.colDef.field === "discount") {
      params.data.discount = Number(params.data.discount) || 0;
      if (params.data.discount > params.data.totalAmount) {
        params.data.discount = 0;
        this.messageService.add({
          severity: "error",
          detail: "Discount should be less than total amount",
          life: 2000,
        });
      }

      params.data.totalAmountDis =
        params.data.totalAmount - params.data.discount;
      this.gridApi.refreshCells();
    }

    this.recalculateServiceOrder();
  }

  recalculateServiceOrder() {
    this.purchaseInvoiceDto.grossAmount = this.rowData.reduce(
      (sum, element) => {
        return sum + (element.totalAmount || 0);
      },
      0
    );

    var newDisCount = this.rowData.reduce((sum, element) => {
      return sum + (element.discount || 0);
    }, 0);
    debugger;
    this.purchaseInvoiceDto.discount = newDisCount;

    const grossAmount =
      parseFloat(this.purchaseInvoiceDto.grossAmount.toString()) || 0;
    // const discountBefore =
    //   parseFloat(this.purchaseInvoiceDto.discount?.toString() || "0") || 0;
    // const discountAfter =
    //   parseFloat(this.purchaseInvoiceDto.excisePct?.toString() || "0") || 0;
    // this.purchaseInvoiceDto. =
    //   grossAmount - discountBefore - discountAfter;
    this.purchaseInvoiceDto.netAmount = this.rowData.reduce((sum, element) => {
      return sum + (element.totalAmountDis || 0);
    }, 0);

    const serviceTaxPct =
      parseFloat(this.purchaseInvoiceDto.serviceTaxPct?.toString() || "0") || 0;
    const excisePct =
      parseFloat(this.purchaseInvoiceDto.excisePct?.toString() || "0") || 0;
    this.STaxAmount = (serviceTaxPct / 100) * this.purchaseInvoiceDto.netAmount;
    this.ExciseAmount = (excisePct / 100) * this.purchaseInvoiceDto.netAmount;
    this.purchaseInvoiceDto.totalAmount =
      this.purchaseInvoiceDto.netAmount + this.STaxAmount + this.ExciseAmount;
    const freight =
      parseFloat(this.purchaseInvoiceDto.freight?.toString() || "0") || 0;
    this.purchaseInvoiceDto.payable =
      this.purchaseInvoiceDto.totalAmount + freight;
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

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      // Apply transaction to remove selected rows
      this.gridApi.applyTransaction({ remove: dataToRemove });
      debugger;
      // Update rowData after removing rows
      this.rowData = [];
      this.gridApi.forEachNode((node) => this.rowData.push(node.data));
      this.recalculateServiceOrder();
    }
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.purchaseInvoiceDto.issueDate = value;
    }
    if (
      this.purchaseInvoiceDto.userLocationId &&
      this.purchaseInvoiceDto.issueDate
    ) {
      this.GetDocMaxCount("ServiceInvoice");
    }
  }

  MakeVoucher() {
    debugger;

    if (this.purchaseInvoiceDto.userLocationId && this.documentNumber) {
      this.purchaseInvoiceDto.voucherNumber =
        "PU-HNL" +
        "-" +
        this.purchaseInvoiceDto.userLocationId +
        "-" +
        this.purchaseInvoiceDto.issueDate.getFullYear() +
        "-" +
        (this.purchaseInvoiceDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("purchaseInvoiceDto");
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
          this.purchaseInvoiceDto.userLocationName = response.items[0].name;
          this.purchaseInvoiceDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("PurchaseInvoice");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.purchaseInvoiceDto.userLocationId &&
      this.purchaseInvoiceDto.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.purchaseInvoiceDto.userLocationId,
          this.purchaseInvoiceDto.issueDate
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

  downloadBPReport(id: number) {
    debugger;
    this._basicTypeService
      .downloadBPReport(id, "GeneratePurchaseInvoiceReport")
      .subscribe(
        (response: any) => {
          const pdfLink = response;
          const fullPdfLink = `${newBaseUrl}${pdfLink}`;
          window.open(fullPdfLink, "_blank");
        },
        (error) => {
          console.error("Error generating report:", error);
        }
      );
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
