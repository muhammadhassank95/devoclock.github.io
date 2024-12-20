import { Item } from "./../Shared/DTOs/purchase-rate-policy";
import { filter } from "rxjs/operators";
import { colDef } from "./../../hrm/shared/DTOs/transmition-dto";
import { Component, ViewChild } from "@angular/core";
import { ServiceOrder } from "../Shared/DTOs/service-order";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { disconnect } from "process";
import { Table } from "primeng/table";
import { newBaseUrl } from "@shared/AppBaseURL/appBaseURL";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-service-order",
  templateUrl: "./service-order.component.html",
})
export class ServiceOrderComponent {
  serviceOrder: ServiceOrder = new ServiceOrder();
  restrictionDto: RestrictionDto = new RestrictionDto();

  dateValue: Date;
  calendar_disability = false;
  displayEmpSerialNumber: string;
  serialNumber: number;
  tableData: any;
  currentPage: number = 1;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  requisitionData: any;
  count: number;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  getCostRate: any;
  saving: boolean;
  target = "ServiceOrder";
  rowData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowSelection: string;
  loading: boolean;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  totalAmount: number;
  totalExpense: number;
  totalIncome: number;
  // regionId: number;
  // regionName: string;
  serviceRequistionId: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  locationId: number;
  locationName: string;
  employeeId: number;
  employeeName: string;
  projectId: number;
  projectName: string;
  documentNumber: string;
  costCenterId: number;
  costCenterName: string;
  STaxAmount: number = 0;
  ExciseAmount: number = 0;
  selectedIds: number[] = [];
  view: boolean;
  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SVO");
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
            // this.calendar_disability = true;
            this.serviceOrder = response;
            // this.getDefaultLocation(
            //   "Location",
            //   "userLocationName",
            //   "userLocationId",
            //   response.costCenterId
            // );
            this.serviceOrder.issueDate = new Date(response.issueDate);
            this.serviceOrder.budgetMonth = new Date(response.consumptionMonth);
            this.serialNumber = response.supplierSerialNumber;
            this.displayEmpSerialNumber = response.employeeErpId;
            // this.regionId = response.regionId;
            // this.regionName = response.regionName;
            debugger;
            this.rowData = this.prepareGridData(response.serviceOrderDetails);
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
      this.getDefaultLocation(
        "Location",
        "userLocationName",
        "userLocationId",
        ""
      );
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.serviceOrder = new ServiceOrder();
      this.selectedIds = [];
      this.projectId = undefined;
      this.projectName = undefined;
      this.costCenterId = undefined;
      this.costCenterName = undefined;
      this.employeeId = undefined;
      this.employeeName = undefined;
      this.rowData = [];
      this.serviceOrder.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      // this.stockTransferRequest.isActive = true;

      // this.dateValue = null;
    }
  }

  save() {
    if (!this.serviceOrder.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceOrder.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Supplier Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceOrder.budgetMonth) {
      this.messageService.add({
        severity: "error",
        detail: "Buy Month is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceOrder.paymentModeId) {
      this.messageService.add({
        severity: "error",
        detail: "PaymentMode Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceOrder.terms) {
      this.messageService.add({
        severity: "error",
        detail: "Terms is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceOrder.validityDays) {
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
        serviceRequisitionDetailId: node.data.id,
        qtyFulfilled: node.data.qtyFulfilledNew,
        remarks: node.data.remarks,
        rate: node.data.costRate,
        totalAmount: node.data.totalAmount,
        discount: node.data.discount,
        deliveryDate: node.data.deliveryDate,
        poVoucherNumber: this.serviceOrder.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.serviceOrder.serviceOrderDetails = tempArr;

    this._basicTypeService
      .create(this.serviceOrder, this.target)
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
          return throwError(error.error.message);
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
        prNo: node.data.prNo,
        qtyRequired: node.data.pendingQty,
        serviceItemId: node.data.serviceItemId,
        requestDate: node.data.requestDate,
        serviceRequisitionDetailId: node.data.serviceRequisitionDetailId,
        qtyFulfilled: node.data.qtyFulfilled,
        rate: node.data.costRate,
        pendingQty: node.data.pendingQty,
        discount: node.data.discount,
        remarks: node.data.orderremarks,
        totalAmount: node.data.totalAmount,
        poVoucherNumber: this.serviceOrder.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.serviceOrder.serviceOrderDetails = tempArr;
    this._basicTypeService
      .update(this.serviceOrder, this.target)
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
        this.serviceOrder.userLocationId = +value.id;
        this.serviceOrder.userLocationName = value.name;
        this.GetDocMaxCount("ServiceOrder");
        break;
      case "Supplier":
        debugger;
        this.serviceOrder.supplierId = +value.id;
        this.serviceOrder.supplierName = value.name;
        this.serialNumber = value.serialNumber;
        break;
      case "Employee":
        debugger;
        this.serviceOrder.employeeId = +value.additional;
        this.serviceOrder.employeeName = value.name;
        this.displayEmpSerialNumber = value.id;

        break;
      case "Project":
        debugger;
        this.serviceOrder.projectId = +value.id;
        this.serviceOrder.projectName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.serviceOrder.costCenterId = +value.id;
        this.serviceOrder.costCenterName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.regionId = +value.id;
      //   this.regionName = value.title;
      //   break;
      case "CurrentPaymentMode":
        debugger;
        this.serviceOrder.paymentModeId = +value.id;
        this.serviceOrder.paymentModeName = value.name;
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
      editable: true,
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
      headerName: "Qty Required",
      editable: false,
      field: "qtyRequired",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "Qty Ordered",
      editable: false,
      field: "qtyFulfilled",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Qty Pending",
      editable: false,
      field: "pendingQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
    },
    {
      headerName: "New Qty Order",
      editable: true,
      field: "qtyFulfilledNew",
      resizable: true,
      suppressSizeToFit: true,
      width: 150,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      valueSetter: function (params) {
        const newValue = params.newValue;
        if (newValue < 0) {
          params.node.setDataValue(params.colDef.field, params.oldValue);
          return false;
        }
        params.data[params.colDef.field] = newValue;
        return true;
      },
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        cellStartedEdit: function (params) {
          let input = params.eInput;
          input.addEventListener("keydown", function (event) {
            if (event.key === "-") {
              event.preventDefault();
            }
          });
        },
      },
    },
    {
      headerName: "Rate",
      editable: false,
      field: "costRate",
      resizable: true,
      suppressSizeToFit: true,
      type: "number",
      width: 100,
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

    {
      headerName: "Delivery Date",
      editable: false,
      field: "deliveryDate",
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split("T")[0];
        }
        return "";
      },
      width: 150,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  GetRequisitions() {
    this._basicTypeService
      .getAllRequisition(
        "ServiceRequisition",
        this.costCenterId,
        this.projectId,
        this.employeeId
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
          this.requisitionData = response.items
            .filter((item) => !this.selectedIds.includes(item.id))
            .filter(
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
      .getDataForEdit(id, "ServiceRequisition")
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
          // this.getPaymentMode(response.supplierId);
          (this.serviceOrder.paymentModeId = response.paymentModeId),
            (this.serviceOrder.paymentModeName = response.paymentModeName);
          // this.dateValue = new Date(response.issueDate);
          this.serviceOrder.budgetMonth = new Date(response.consumptionMonth);
          // this.calendar_disability = true;
          this.serviceOrder.projectId = response.projectId;
          this.serviceOrder.projectName = response.projectName;
          this.serviceOrder.costCenterId = response.costCenterId;
          this.selectedIds.push(response.id);
          this.serviceOrder.costCenterName = response.costCenterName;
          this.serviceOrder.supplierId = response.supplierId;
          this.serialNumber = response.supplierSerialNumber;
          this.serviceOrder.supplierName = response.supplierName;
          this.serviceOrder.employeeId = response.employeeId;
          this.displayEmpSerialNumber = response.employeeErpId;
          this.serviceOrder.employeeName = response.employeeName;
          // this.regionId = response.regionId;
          // this.regionName = response.regionName;
          this.rowData = [
            ...this.rowData,
            ...response.serviceRequisitionDetails,
          ];
          this.rowData = this.rowData.map((item) => ({
            ...item,
            qtyFulfilled: item.qtyRequired - item.pendingQty,
            qtyFulfilledNew: item.pendingQty,
            totalAmount: item.pendingQty * item.costRate,
            prNo: item.voucherNumber,
            deliveryDate: item.requestDate,
          }));

          this.rowData = this.rowData.filter((i) => i.pendingQty != 0);

          this.serviceOrder.grossAmount = 0;
          this.rowData.forEach((element) => {
            debugger;

            if (element.totalAmount)
              this.serviceOrder.grossAmount += element.totalAmount;
          });

          this.serviceOrder.totalAmount =
            this.serviceOrder.payable =
            this.serviceOrder.netAmount =
              this.serviceOrder.grossAmount;
          this.requisitionData = this.requisitionData.filter(
            (item) => item.id !== response.id
          );
          this.displayRequisition = false;
        },
      });
  }

  calculateNetAmount(event) {
    this.serviceOrder.discount = event;
    this.recalculateServiceOrder();
  }

  OnTaxChange(value, isServiceTax) {
    if (isServiceTax) {
      this.serviceOrder.serviceTaxPct = value;
    } else {
      this.serviceOrder.excisePct = value;
    }
    this.recalculateServiceOrder();
  }

  OnFreightChange(value) {
    this.serviceOrder.freight = value;
    this.recalculateServiceOrder();
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

  unapprove(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService
          .UnApprove(id, this.target)
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
                  detail: "Unapproved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
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
      costRate: item.rate,
      remarks: item.remarks,
      pendingQty: item.invoice_PendingQty,
      qtyFulfilledNew: item.invoice_PendingQty,
      serviceItemId: item.serviceItemId,
      serviceItemName: item.serviceItemName,
      deliveryDate: item.deliveryDate,
      serviceRequisitionDetailId: item.serviceRequisitionDetailId,
      discount: item.discount,
      // totalAmount: (item.requisitionDetail.pendingQty + item.qtyFulfilled) * item.rate,
      totalAmount: item.totalAmount,
    }));
  }

  OnCellValueChanged(params) {
    debugger;
    if (
      params.colDef.field == "qtyFulfilled" ||
      params.colDef.field == "qtyFulfilledNew"
    ) {
      let totalQtyFulfilled = 0;

      if (params.data.qtyRequired < params.data.qtyFulfilled) {
        debugger;
        totalQtyFulfilled = params.data.qtyFulfilled;
        this.onCellChangeFunction(params);
      } else if (params.data.qtyFulfilledNew > params.data.pendingQty) {
        totalQtyFulfilled = params.data.qtyFulfilled;
        this.onCellChangeFunction(params);
      }

      totalQtyFulfilled =
        params.data.qtyFulfilled + params.data.qtyFulfilledNew;
      params.data.qtyFulfilled = totalQtyFulfilled;
      params.data.totalAmount =
        params.data.qtyFulfilledNew * params.data.costRate;
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

      params.data.totalAmount =
        params.data.qtyFulfilledNew * params.data.costRate -
        params.data.discount;
      this.gridApi.refreshCells();
    }

    this.recalculateServiceOrder();
  }

  onCellChangeFunction(params: any) {
    debugger;
    if (params.data.qtyFulfilled == undefined) {
      params.data.qtyFulfilled = 0;
    }
    params.data.qtyFulfilledNew = 0;
    params.data.totalAmount = 0;
    //   totalQtyFulfilled = params.data.qtyFulfilled
    this.gridApi.refreshCells();
    this.messageService.add({
      severity: "error",
      detail: "Invalid Quantity ordered",
      life: 2000,
    });
    this.saving = false;
    return;
  }

  recalculateServiceOrder() {
    debugger;
    // Calculate grossAmount
    this.serviceOrder.grossAmount = this.rowData.reduce((sum, element) => {
      return sum + (element.totalAmount || 0);
    }, 0);
    // Calculate total discount from rowData
    var newDisCount = this.rowData.reduce((sum, element) => {
      return sum + (element.discount || 0);
    }, 0);
    debugger;
    this.serviceOrder.discount = newDisCount;

    // Calculate netAmount
    const grossAmount =
      parseFloat(this.serviceOrder.grossAmount.toString()) || 0;
    const discount =
      parseFloat(this.serviceOrder.discount?.toString() || "0") || 0;
    this.serviceOrder.netAmount = grossAmount - discount;

    // Calculate service tax amount and excise amount
    const serviceTaxPct =
      parseFloat(this.serviceOrder.serviceTaxPct?.toString() || "0") || 0;
    const excisePct =
      parseFloat(this.serviceOrder.excisePct?.toString() || "0") || 0;
    this.STaxAmount = (serviceTaxPct / 100) * this.serviceOrder.netAmount;
    this.ExciseAmount = (excisePct / 100) * this.serviceOrder.netAmount;

    // Calculate totalAmount
    this.serviceOrder.totalAmount =
      this.serviceOrder.netAmount + this.STaxAmount + this.ExciseAmount;

    // Calculate payable amount
    const freight =
      parseFloat(this.serviceOrder.freight?.toString() || "0") || 0;
    this.serviceOrder.payable = this.serviceOrder.totalAmount + freight;
  }

  updateRate(result: any) {
    debugger;
    this.getItemDetails("ServiceItem", result[0].id);
  }

  getItemDetails(AppService, serviceItemId: number) {
    if (serviceItemId) {
      this._basicTypeService
        .getItemDetails(AppService, serviceItemId)
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
            this.getCostRate = response;
            const CostRate = this.getCostRate.result[serviceItemId];
            this.updateRowCostRate(CostRate);
          },
        });
    }
  }

  updateRowCostRate(newCostRate: number) {
    this.rowData.forEach((row) => {
      row.costRate = newCostRate;
    });
    this.gridApi.updateGridOptions({ rowData: this.rowData });
    this.recalculateServiceOrder();
    this.gridApi.refreshCells();
  }

  getPaymentMode(id: number) {
    debugger;
    this._basicTypeService
      .getPaymentMode(id)
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
          this.serviceOrder.paymentModeId = response.CurrentPaymentModeId;
          this.serviceOrder.paymentModeName = response.CurrentPaymentModeName;
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
      this.serviceOrder.issueDate = value;
    }
    if (this.serviceOrder.userLocationId && this.serviceOrder.issueDate) {
      this.GetDocMaxCount("ServiceOrder");
    }
  }
  MakeVoucher() {
    debugger;

    if (this.serviceOrder.userLocationId && this.documentNumber) {
      this.serviceOrder.voucherNumber =
        "SVO-HNL" +
        "-" +
        this.serviceOrder.userLocationId +
        "-" +
        this.serviceOrder.issueDate.getFullYear() +
        "-" +
        (this.serviceOrder.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("ServiceOrder");
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
          this.serviceOrder.userLocationName = response.items[0].name;
          this.serviceOrder.userLocationId = response.items[0].id;
          this.GetDocMaxCount("ServiceOrder");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (this.serviceOrder.userLocationId && this.serviceOrder.issueDate) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.serviceOrder.userLocationId,
          this.serviceOrder.issueDate
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
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  downloadSOReport(id: number) {
    debugger;
    this._basicTypeService
      .downloadBPReport(id, "GenerateServiceOrderReport")
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
