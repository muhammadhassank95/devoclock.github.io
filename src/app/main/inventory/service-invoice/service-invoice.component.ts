import { Component, ViewChild } from "@angular/core";
import { ServiceInvoice } from "../Shared/DTOs/service-invoice";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { ServiceOrder } from "../Shared/DTOs/service-order";
import { Table } from "primeng/table";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-service-invoice",
  templateUrl: "./service-invoice.component.html",
})
export class ServiceInvoiceComponent {
  serviceInvoice: ServiceInvoice = new ServiceInvoice();
  serviceOrder: ServiceOrder = new ServiceOrder();
  restrictionDto: RestrictionDto = new RestrictionDto();
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  serialNumber: number;
  EmpSerialNumber: string;
  dateValue: Date;
  calendar_disability = true;
  displayOrder: boolean;
  OrderData: any;
  tableData: any;
  count: number;
  // regionId: number;
  // regionName: string;
  displayModal: boolean;
  editMode: boolean;
  view: boolean = true;
  saving: boolean;
  documentNumber: string;
  target = "ServiceInvoice";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  gridApi: any;
  setParms: any;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  userlocationId: number;
  locationName: string;
  suggestionModalRef: BsModalRef;
  STaxAmount: number;
  ExciseAmount: number;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  currentPage: number = 1;
  loading: boolean;
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
    this.VoucherRestriction("SIV");
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
            this.calendar_disability = true;
            this.serviceInvoice = response;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationName",
            //   "userlocationId",
            //   response.costCenterId
            // );
            this.serviceInvoice.issueDate = new Date(response.issueDate);
            this.serviceInvoice.invoiceDate = new Date(response.invoiceDate);
            this.rowData = this.InvoicePrepareGridData(
              response.serviceInvoiceDetails
            );
            this.serialNumber = response.supplierSerialNumber;
            this.EmpSerialNumber = response.employeeErpId;
            (this.serviceInvoice.grnNumber = response.grnNumber),
              //   this.regionId = response.regionId;
              // this.regionName = response.regionName;
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
      this.calendar_disability = false;
      this.serviceInvoice = new ServiceInvoice();
      // this.userlocationId = null;
      // this.locationName = "";
      this.serviceInvoice.supplierId = null;
      this.serviceInvoice.supplierName = "";
      this.rowData = [];
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        serviceOrderDetailId: node.data.id,
        orderId: node.data.id,
        poQty: node.data.qtyRequired,
        received: node.data.qtyRequired,
        rejected: node.data.pendingQty,
        qty: node.data.invoiceQty,
        rate: node.data.costRate,
        total: node.data.totalAmount,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    debugger;
    this.serviceInvoice.serviceInvoiceDetails = tempArr;
    this._basicTypeService
      .create(this.serviceInvoice, this.target)
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
        id: node.data.id,
        serviceOrderDetailId: node.data.serviceOrderDetailId,
        prNo: node.data.prNo,
        qty: node.data.invoiceQty + node.data.invoiceDone,
        rate: node.data.costRate,
        qtyRequired: node.data.qtyRequired,
        serviceItemId: node.data.serviceItemId,
        total: node.data.totalAmount,
        qtyFulfilled: node.data.qtyFulfilled,
        remarks: node.data.remarks,
        // id: item.orderId,
        // prNo: item.prNo,
        // qtyFulfilled: item.orderDetails.qtyFulfilled,
        // qtyRequired: item.orderDetails.requisitionDetail.qtyRequired,
        // invoice_PendingQty: item.orderDetails.invoice_PendingQty,
        // invoiceDone: item.orderDetails.qtyFulfilled - item.orderDetails.invoice_PendingQty,
        // invoiceQty: item.orderDetails.invoice_PendingQty,
        // costRate: item.rate,
        // remarks: item.remarks,
        // pendingQty: item.rejected,
        // serviceItemId: item.serviceItemId,
        // serviceItemName: item.serviceItemName,
        // requestDate: item.requestDate,
        // requisitionId: item.requisitionId,
        // totalAmount: item.total,
      };
      tempArr.push(tempObj);
    });
    this.serviceInvoice.serviceInvoiceDetails = tempArr;
    this._basicTypeService
      .update(this.serviceInvoice, this.target)
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
        this.GetDocMaxCount("ServiceInvoice");
        break;
      case "Supplier":
        debugger;
        this.serviceInvoice.supplierId = +value.id;
        this.serviceInvoice.supplierName = value.name;
        this.serialNumber = value.serialNumber;
        break;
      case "Employee":
        debugger;
        this.serviceInvoice.employeeId = +value.additional;
        this.serviceInvoice.employeeName = value.name;
        this.EmpSerialNumber = value.id;
        break;
      case "Project":
        debugger;
        this.serviceInvoice.projectId = +value.id;
        this.serviceInvoice.projectName = value.name;
        break;
      case "CosCenter":
        debugger;
        this.serviceInvoice.costCenterId = +value.id;
        this.serviceInvoice.costCenterName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.regionId = +value.id;
      //   this.regionName = value.title;
      //   break;
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
      headerName: "Job ID",
      editable: false,
      field: "id",
      resizable: true,
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: "Job Title",
      editable: false,
      field: "serviceItemName",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Remarks",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
      width: 200,
    },
    {
      headerName: "Pur. Req No",
      editable: false,
      field: "prNo",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Qty Req",
      editable: false,
      field: "qtyRequired",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Qty Orderd",
      editable: false,
      field: "qtyFulfilled",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Invoice Done",
      editable: false,
      field: "invoiceDone",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Invoice Pending Qty",
      editable: false,
      field: "invoice_PendingQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Invoice Qty",
      editable: true,
      field: "invoiceQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
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
      type: "number",
      width: 150,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
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
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  GetServiceOrder() {
    this._basicTypeService
      .getAll("ServiceOrder")
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
          this.OrderData = response.items
            .filter((item) => !this.selectedIds.includes(item.id))
            .filter(
              (item) =>
                item.status == "APPROVED" && item.linkedStatus == "PENDING"
            );
        },
      });
  }

  OpenServiceOrder() {
    debugger;
    this.displayOrder = true;
    this.GetServiceOrder();
  }

  SelectServiceOrder(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "ServiceOrder")
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
          this.dateValue = new Date(response.issueDate);
          this.calendar_disability = false;
          this.serviceInvoice.supplierId = response.supplierId;
          this.serviceInvoice.supplierName = response.supplierName;
          (this.serialNumber = response.supplierSerialNumber),
            (this.serviceInvoice.employeeId = response.employeeId);
          this.EmpSerialNumber = response.employeeErpId;
          this.serviceInvoice.employeeName = response.employeeName;
          this.serviceInvoice.discountBeforePct = response.discount;
          // this.serviceInvoice.excisePrc = response.excisePrc;
          // this.serviceInvoice.serviceTaxPct = response.serviceTaxPct;
          this.serviceInvoice.projectId = response.projectId;
          this.serviceInvoice.projectName = response.projectName;
          this.serviceInvoice.costCenterId = response.costCenterId;
          this.serviceInvoice.costCenterName = response.costCenterName;
          // this.regionId = response.regionId;
          // this.regionName = response.regionName;
          debugger;
          var tempArray = [];
          if (this.rowData.length) {
            tempArray = this.rowData;
          }
          Array.prototype.push.apply(
            tempArray,
            this.prepareGridData(response.serviceOrderDetails)
          );
          this.rowData = tempArray;

          let uniqueArray = tempArray.filter(
            (value, index, self) =>
              index ===
              self.findIndex((t) => t.id === value.id && t.prNo === value.prNo)
          );
          this.rowData = uniqueArray;

          console.log(uniqueArray);

          this.serviceInvoice.grossAmount = 0;
          this.rowData.forEach((element) => {
            this.serviceInvoice.grossAmount += element.totalAmount;
          });
          this.serviceInvoice.totalAmount =
            this.serviceInvoice.netPayable =
            this.serviceInvoice.netAmount =
              this.serviceInvoice.grossAmount;
          this.displayOrder = false;
          // Use setRowData for better grid update
          if (this.gridApi) {
            this.gridApi.setRowData(this.rowData);
          } else {
            console.error("gridApi is not initialized");
          }
        },
      });
  }

  prepareGridData(data: any[]): any[] {
    console.log(data);
    debugger;
    return data.map((item, index) => ({
      id: item.id,
      prNo: item.voucherNumber,
      qtyRequired: item.requestedQty,
      qtyFulfilled: item.qtyFulfilled,
      remarks: item.remarks,
      costRate: item.rate,
      serviceItemId: item.serviceItemId,
      serviceItemName: item.serviceItemName,
      requestDate: item.requestDate,
      invoice_PendingQty: item.invoice_PendingQty,
      invoiceDone: item.qtyFulfilled - item.invoice_PendingQty,
      invoiceQty: item.invoice_PendingQty,
      discount: item.discount,
      totalAmount: item.invoice_PendingQty * item.rate,
    }));
  }

  InvoicePrepareGridData(data: any[]): any[] {
    console.log(data);
    debugger;
    return data.map((item, index) => ({
      id: item.id,
      serviceOrderDetailId: item.serviceOrderDetailId,
      serviceRequisitionDetailId: item.serviceRequisitionDetailId,
      prNo: item.voucherNumber,
      qtyFulfilled: item.qtyOrdered,
      qtyRequired: item.qtyRequested,
      invoice_PendingQty: item.qtyInvoice,
      invoiceDone: item.qtyOrdered - item.qtyInvoice,
      invoiceQty: item.qtyInvoice,
      costRate: item.rate,
      pendingQty: item.rejected,
      serviceItemId: item.serviceItemId,
      serviceItemName: item.serviceItemName,
      // requestDate: item.requestDa
      totalAmount: item.total,
      discount: item.discount,

      // orderId: node.data.id,
      // poQty: node.data.qtyRequired,
      // received: node.data.qtyRequired,
      // rejected: node.data.pendingQty,
      // qty: node.data.qtyFulfilled,
      // rate: node.data.costRate,
      // total: node.data.totalAmount
    }));
  }

  OnFreightChange(value) {
    this.serviceOrder.freight = value;
    this.recalculateServiceOrder();
  }

  OnTaxChange(value, isServiceTax) {
    if (isServiceTax) {
      this.serviceInvoice.serviceTaxPct = value;
    } else {
      this.serviceInvoice.excisePrc = value;
    }
    this.recalculateServiceOrder();
  }

  calculateNetAmount(event) {
    this.serviceInvoice.discountAfterPct = event;
    this.recalculateServiceOrder();
  }

  OnCellValueChanged(params) {
    debugger;
    if (params.colDef.field == "invoiceQty") {
      if (
        params.data.invoice_PendingQty < params.data.invoiceQty ||
        params.data.invoiceQty > params.data.invoice_PendingQty
      ) {
        params.data.invoiceQty = 0;
        params.data.totalAmount = 0;
        this.gridApi.refreshCells();
        this.messageService.add({
          severity: "error",
          detail: "Invalid Quantity ordered",
          life: 2000,
        });
        this.saving = false;
        return;
      }
      params.data.totalAmount = params.data.invoiceQty * params.data.costRate;
      this.gridApi.refreshCells();
    } else if (params.colDef.field == "discount") {
      if (params.data.discount > params.data.totalAmount) {
        params.data.discount = 0;
        this.messageService.add({
          severity: "error",
          detail: "Discount should be less than total amount",
          life: 2000,
        });
      }

      params.data.totalAmount -= params.data.discount;
      this.gridApi.refreshCells();
    }

    this.recalculateServiceOrder();
  }

  recalculateServiceOrder() {
    // Calculate grossAmount
    this.serviceInvoice.grossAmount = this.rowData.reduce((sum, element) => {
      return sum + (element.totalAmount || 0);
    }, 0);

    // Calculate total discount from rowData
    var newDisCount = this.rowData.reduce((sum, element) => {
      return sum + (element.discount || 0);
    }, 0);
    debugger;
    this.serviceInvoice.discountBeforePct = newDisCount;

    // Calculate netAmount
    const grossAmount =
      parseFloat(this.serviceInvoice.grossAmount.toString()) || 0;
    const discountBefore =
      parseFloat(this.serviceInvoice.discountBeforePct?.toString() || "0") || 0;
    const discountAfter =
      parseFloat(this.serviceInvoice.discountAfterPct?.toString() || "0") || 0;
    this.serviceInvoice.netAmount =
      grossAmount - discountBefore - discountAfter;

    // Calculate service tax amount and excise amount
    const serviceTaxPct =
      parseFloat(this.serviceInvoice.serviceTaxPct?.toString() || "0") || 0;
    const excisePct =
      parseFloat(this.serviceInvoice.excisePrc?.toString() || "0") || 0;
    this.STaxAmount = (serviceTaxPct / 100) * this.serviceInvoice.netAmount;
    this.ExciseAmount = (excisePct / 100) * this.serviceInvoice.netAmount;

    // Calculate totalAmount
    this.serviceInvoice.totalAmount =
      this.serviceInvoice.netAmount + this.STaxAmount + this.ExciseAmount;

    // Calculate payable amount
    const freight =
      parseFloat(this.serviceInvoice.freightPct?.toString() || "0") || 0;
    this.serviceInvoice.netPayable = this.serviceInvoice.totalAmount + freight;
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
      this.serviceInvoice.issueDate = value;
    }
    if (this.serviceInvoice.userLocationId && this.serviceInvoice.issueDate) {
      this.GetDocMaxCount("ServiceInvoice");
    }
  }

  MakeVoucher() {
    debugger;

    if (this.serviceInvoice.userLocationId && this.documentNumber) {
      this.serviceInvoice.voucherNumber =
        "SVI-HNL" +
        "-" +
        this.serviceInvoice.userLocationId +
        "-" +
        this.serviceInvoice.issueDate.getFullYear() +
        "-" +
        (this.serviceInvoice.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("ServiceInvoice");
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
          this.serviceInvoice.userLocationName = response.items[0].name;
          this.serviceInvoice.userLocationId = response.items[0].id;
          this.GetDocMaxCount("ServiceInvoice");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (this.serviceInvoice.userLocationId && this.serviceInvoice.issueDate) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.serviceInvoice.userLocationId,
          this.serviceInvoice.issueDate
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

  downloadBPReport(id: number) {
    debugger;
    this._basicTypeService
      .downloadBPReport(id, "GenerateServiceInvoiceReport")
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
