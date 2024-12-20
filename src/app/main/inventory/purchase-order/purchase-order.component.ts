import { Component, ViewChild } from "@angular/core";
import { PurchaseOrder } from "../Shared/DTOs/purchase-order";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { LicenseDetail } from "@app/main/hrm/shared/DTOs/employee-dto";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { DialogService } from "primeng/dynamicdialog";
import { AllTracingComponent } from "../all-tracing/all-tracing.component";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-purchase-order",
  templateUrl: "./purchase-order.component.html",
})
export class PurchaseOrderComponent {
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  restrictionDto: RestrictionDto = new RestrictionDto();

  supplierTypes = [
    { label: "NON GST", value: "12" },
    { label: "GST", value: "13" },
    { label: "IMPORT", value: "14" },
  ];
  tableData: any;
  requisitionData: any;
  count: number;
  dateValue: any;
  maxDate: Date;
  calendar_disability = true;
  docCount: number;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  loading: boolean;
  view: boolean;
  saving: boolean;
  // regionId: number;
  // regionName: string;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  currentPage: number = 1;
  disability: boolean;
  target = "PurchaseOrder";
  rowData: any[];
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowSelection: string;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  totalAmount: number;
  totalExpense: number;
  serialNumber: number;
  EmpSerialNumber: string;
  totalIncome: number;
  serviceRequistionId: number;
  STaxAmount: number;
  ExciseAmount: number;
  selectedIds = [];
  documentNumber;
  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("PO");
  }

  onSupplierTypeChange(event: any) {
    debugger;
    this.purchaseOrder.purchaseOrderType = event.value.toString();
  }

  getAll() {
    this._basicTypeService
      .getAll(this.target, this.filterDto)
      .pipe(
        finalize(() => { }),
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
            finalize(() => { }),
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

  show(id?: number) {
    if (id) {
      // this.editMode = true;
      this._basicTypeService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => { }),
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
            this.purchaseOrder = response;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationId",
            //   "locationName",
            //   response.userLocationName
            // );
            this.purchaseOrder.issueDate = new Date(response.issueDate);
            this.purchaseOrder.budgetDate = new Date(response.consumptionMonth);
            this.purchaseOrder.employeeId = response.employeeId;
            this.EmpSerialNumber = response.employeeErpId;
            this.purchaseOrder.employeeName = response.employeeName;
            this.serialNumber = response.supplierSerialNumber;
            this.purchaseOrder.costCenterId = response.requesterCostCenterId;
            this.purchaseOrder.costCenterName =
              response.requesterCostCenterName;
            this.purchaseOrder.projectId = response.requesterProjectId;
            this.purchaseOrder.purchaseOrderType = response.purchaseOrderType;
            this.purchaseOrder.projectName = response.requesterProjectName;
            this.purchaseOrder.userLocationId = response.userLocationName;
            this.purchaseOrder.userLocationName = response.userLocationName;
            this.purchaseOrder.paymentModeId = response.paymentModeId;
            // (this.regionId = response.regionId),
            //   (this.regionName = response.regionName),
            this.rowData = this.prepareGridDataPo(
              response.purchaseOrderDetails
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
      this.getDefaultLocation("Location", "locationId", "locationName", "");
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.purchaseOrder = new PurchaseOrder();
      this.selectedIds = [];
      this.purchaseOrder.employeeId = undefined;
      this.purchaseOrder.employeeName = undefined;
      this.purchaseOrder.costCenterId = undefined;
      this.serialNumber = null;
      this.purchaseOrder.costCenterName = undefined;
      this.purchaseOrder.projectId = undefined;
      this.purchaseOrder.projectName = undefined;
      this.rowData = [];
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.purchaseOrder.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseOrder.purchaseOrderType) {
      this.messageService.add({
        severity: "error",
        detail: "Please Select Supplier Type",
        life: 2000,
      });
    }
    if (!this.purchaseOrder.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Supplier Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseOrder.budgetDate) {
      this.messageService.add({
        severity: "error",
        detail: "Buy Month is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseOrder.terms) {
      this.messageService.add({
        severity: "error",
        detail: "Terms is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.purchaseOrder.validityDays) {
      this.messageService.add({
        severity: "error",
        detail: "Validity Days are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        purchaseRequisitionDetailId: node.data.purchaseRequisitionDetailId,
        orderedQty: node.data.orderedQty,
        rate: node.data.rate,
        requisitionQty: node.data.purchaseOrderPendingQty,
        totalAmount: node.data.totalAmount,
        remarks: node.data.remarks,
        deliveryDate: node.data.requestDate,
        purchaseRequestVoucherNumber:
          this.purchaseOrder.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.purchaseOrder.purchaseOrderDetails = tempArr;

    this._basicTypeService
      .create(this.purchaseOrder, this.target)
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
        purchaseRequisitionDetailId: node.data.purchaseRequisitionDetailId,
        orderedQty: node.data.orderedQty,
        discount: node.data.discount,
        rate: node.data.rate,
        requisitionQty: node.data.purchaseOrderPendingQty,
        totalAmount: node.data.totalAmount,
        remarks: node.data.remarks,
        deliveryDate: node.data.requestDate,
        purchaseRequestVoucherNumber:
          this.purchaseOrder.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.purchaseOrder.purchaseOrderDetails = tempArr;
    this._basicTypeService
      .update(this.purchaseOrder, this.target)
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
        this.purchaseOrder.userLocationId = +value.id;
        this.purchaseOrder.userLocationName = value.name;
        this.getVoucherNumber(
          "PO",
          this.purchaseOrder.issueDate.toDateString(),
          value?.id
        );
        break;
      case "Subledger":
        debugger;
        this.purchaseOrder.supplierId = value.id;
        this.purchaseOrder.supplierName = value.title;
        this.serialNumber = value.serialNumber;
        this.GetPaymentMode(this.purchaseOrder.supplierId);
        break;
      case "CurrentPaymentMode":
        debugger;
        this.purchaseOrder.paymentModeId = +value.id;
        this.purchaseOrder.paymentModeName = value.name;
        this.SupplierCheck();
        break;
      case "Employee":
        debugger;
        this.purchaseOrder.employeeId = +value.additional;
        this.purchaseOrder.employeeName = value.name;
        this.EmpSerialNumber = value.id;
        this.SupplierCheck();
        break;
      case "Project":
        debugger;
        this.purchaseOrder.projectId = +value.id;
        this.purchaseOrder.projectName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.purchaseOrder.costCenterId = +value.id;
        this.purchaseOrder.costCenterName = value.name;
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
      resizable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      // width: 80,
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
      headerName: "Pur.Req.No",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
      // width: 200,
    },
    {
      headerName: "SQ QTY",
      editable: false,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
      // width: 200,
    },
    {
      headerName: "PQ QTY",
      editable: false,
      field: "purchaseOrderPendingQty",
      resizable: true,
      suppressSizeToFit: true,
      // width: 200,
    },
    {
      headerName: "Ordered Qty",
      editable: true,
      field: "orderedQty",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
    },
    // {
    //     headerName: "Unit",
    //     editable: false,
    //     field: "unit",
    //     resizable: true,
    //     suppressSizeToFit: true,
    //     // width: 150
    // },
    {
      headerName: "Rate",
      editable: false,
      field: "rate",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
    },

    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
      valueParser: (params) => {
        let newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor",
    },
    {
      headerName: "Discount",
      editable: true,
      field: "discount",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
      valueParser: (params) => {
        let newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor",
    },
    {
      field: "requestDate",
      headerName: "Requisition Date",
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
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
      // width: 200,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  GetRequisitions() {
    this._basicTypeService
      .getAllRequisition("PurchaseRequisition")
      .pipe(
        finalize(() => { }),
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
              item.status == "APPROVED" && item.linkedStatus == "PENDING"
          );
        },
      });
  }

  OpenServiceRequisition() {
    debugger;
    this.displayRequisition = true;
    this.GetRequisitions();
  }

  SelectRequisition(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "PurchaseRequisition")
      .pipe(
        finalize(() => { }),
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
          response.purchaseRequisitionDetails =
            response.purchaseRequisitionDetails.filter(
              (i) => i.pendingPurchaseRequestQty !== 0
            );
          this.selectedIds.push(response.id);
          this.dateValue = new Date(response.issueDate);
          this.maxDate = new Date();
          this.calendar_disability = false;
          this.purchaseOrder.budgetDate = new Date(response.consumptionMonth);
          this.purchaseOrder.costCenterId = response.requesterCostCenterId;
          this.purchaseOrder.costCenterName = response.requesterCostCenterName;
          this.purchaseOrder.employeeId = response.employeeId;
          this.EmpSerialNumber = response.employeeErpId;
          this.purchaseOrder.employeeName = response.employeeName;
          this.purchaseOrder.projectId = response.requesterProjectId;
          this.purchaseOrder.projectName = response.requesterProjectName;
          // (this.regionId = response.requesterRegionId),
          //   (this.regionName = response.requesterRegionName),
          this.purchaseOrder.grossAmount = 0;

          if (!this.rowData.length) {
            this.rowData = this.prepareGridData(
              response.purchaseRequisitionDetails
            );
          } else {
            let newData = this.prepareGridData(
              response.purchaseRequisitionDetails
            );
            debugger;
            newData.forEach((item: any) => {
              this.rowData.push(item);
            });
            this.rowData = [...this.rowData];
            this.gridApi.redrawRows();
          }
          this.displayRequisition = false;
          const uniqueRowData = this.rowData.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          this.rowData = uniqueRowData;
          console.log(this.rowData);
          this.gridApi.redrawRows();
        },
      });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.purchaseOrder.issueDate = value;
    }
    if (this.purchaseOrder.userLocationId && this.purchaseOrder.issueDate) {
      this.getVoucherNumber(
        "PO",
        (this.purchaseOrder.issueDate = value),
        this.purchaseOrder.userLocationId
      );
    }
  }

  getVoucherNumber(prefix: string, issueDate: string, userLocationId: number) {
    debugger;
    const date = new Date(issueDate);
    this._basicTypeService
      .getVoucherNumber(prefix, date, userLocationId, this.target)
      .pipe(
        finalize(() => { }),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
            life: 2000,
          });
          return throwError(() => error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.purchaseOrder.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._basicTypeService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => { }),
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
          this.purchaseOrder.userLocationName = response.items[0].name;
          this.purchaseOrder.userLocationId = response.items[0].id;
          this.getVoucherNumber(
            "PO",
            this.purchaseOrder.issueDate.toDateString(),
            this.purchaseOrder.userLocationId
          );
        },
      });
  }

  recalculateServiceOrder() {
    debugger;
    // Calculate grossAmount
    this.purchaseOrder.grossAmount = this.rowData.reduce((sum, element) => {
      return sum + (element.totalAmount || 0);
    }, 0);
    // Calculate total discount from rowData
    var newDisCount = this.rowData.reduce((sum, element) => {
      debugger;
      return sum + (element.discount || 0);
    }, 0);
    debugger;
    this.purchaseOrder.discount = newDisCount;

    // Calculate netAmount
    const grossAmount =
      parseFloat(this.purchaseOrder.grossAmount.toString()) || 0;
    debugger;

    const discount = parseFloat(this.purchaseOrder.discount.toString()) || 0;
    this.purchaseOrder.netAmount = grossAmount - discount;
    debugger;

    // Calculate service tax amount and excise amount
    const serviceTaxPct =
      parseFloat(this.purchaseOrder.serviceTaxPct?.toString() || "0") || 0;
    const excisePct =
      parseFloat(this.purchaseOrder.excisePct?.toString() || "0") || 0;
    this.STaxAmount = (serviceTaxPct / 100) * this.purchaseOrder.netAmount;
    this.ExciseAmount = (excisePct / 100) * this.purchaseOrder.netAmount;

    // Calculate totalAmount
    this.purchaseOrder.totalAmount =
      this.purchaseOrder.netAmount + this.STaxAmount + this.ExciseAmount;

    // Calculate payable amount
    const freight =
      parseFloat(this.purchaseOrder.freight?.toString() || "0") || 0;
    this.purchaseOrder.payable = this.purchaseOrder.totalAmount + freight;
  }

  prepareGridData(details: any[]): any[] {
    debugger;
    return details.map((item, index) => ({
      purchaseRequisitionDetailId: item.id,
      id: item.id,
      rate: item.costRate,
      purchaseQty: item.pendingPurchaseRequestQty,
      purchaseOrderPendingQty: item.pendingPurchaseRequestQty,
      itemId: item.itemId,
      itemName: item.itemName,
      voucherNumber: item.voucherNumber,
      requestedQty: item.requestedQty,
    }));
  }

  prepareGridDataPo(details: any[]): any[] {
    return details.map((item, index) => {
      debugger;
      return {
        id: item.id,
        purchaseRequisitionDetailId: item.purchaseRequisitionDetailId,
        purchaseQty: item.purchaseQty,
        totalAmount: item.totalAmount,
        voucherNumber: item.voucherNumber,
        purchaseOrderPendingQty: item.purchaseRequestedQty,
        requestDate: item.deliveryDate,
        orderedQty: item.orderedQty,
        rate: item.rate,
        remarks: item.remarks,
        itemId: item.itemId,
        itemName: item.itemName,
        requestedQty: item.stockRequestedQty,
        discount: item.discount,
      };
    });
  }

  OnCellValueChanged(params) {
    debugger;

    if (params.data.purchaseOrderPendingQty < params.data.orderedQty) {
      params.data.orderedQty = 0;
      params.data.totalAmount = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        detail: "Ordered Quantity is greater then PQ",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    params.data.totalAmount = params.data.orderedQty * params.data.rate;
    this.gridApi.refreshCells();

    this.recalculateServiceOrder();
  }

  calculateNetAmount(event) {
    this.purchaseOrder.discount = event;
    this.recalculateServiceOrder();
  }

  OnTaxChange(value, isServiceTax) {
    if (isServiceTax) {
      this.purchaseOrder.serviceTaxPct = value;
    } else {
      this.purchaseOrder.excisePct = value;
    }
    this.recalculateServiceOrder();
  }

  OnFreightChange(value) {
    this.purchaseOrder.freight = value;
    this.recalculateServiceOrder();
  }

  updateRates() {
    debugger;
    const ids = this.rowData.map((item: any) => item.itemId);

    if (ids.length > 0) {
      if (!this.purchaseOrder.supplierId) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Please Select Supplie",
          life: 2000,
        });
        return;
      }
      this._basicTypeService
        .getUpdateRate(this.purchaseOrder.supplierId, ids)
        .pipe(
          finalize(() => { }),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: error.error.error.message,
              life: 2000,
            });
            return throwError(() => error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            this.rowData = this.rowData.map((row) => ({
              ...row,
              rate: response[row.itemId],
              totalAmount: response[row.itemId] * row.orderedQty,
            }));

            this.gridApi.forEachNode((node) => {
              const updatedRow = this.rowData.find(
                (row) => row.itemId === node.data.itemId
              );

              if (updatedRow) {
                node.setData(updatedRow);
              }
              debugger;
            });

            this.gridApi.refreshCells();
            this.recalculateServiceOrder();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Rate Updated Successfully",
              life: 2000,
            });
          },
        });
    }
  }

  GetPaymentMode(id?: number) {
    if (!id) {
      return;
    }
    this._basicTypeService
      .getPaymentMode(id)
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
      .subscribe((response) => {
        debugger;
        this.purchaseOrder.paymentModeId = response.paymentModeId;
        this.purchaseOrder.paymentModeName = response.paymentModeName;
      });
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
            finalize(() => { }),
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

  SupplierCheck() {
    if (
      this.purchaseOrder.paymentModeName.includes("ADVANCES AGAINST EXPENSES")
    ) {
      this.disability = false;
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  downloadPOReport(id: number) {
    debugger;
    this._basicTypeService
      .downloadBPReport(id, "GeneratePurchaseOrderReport")
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
        finalize(() => { }),
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
