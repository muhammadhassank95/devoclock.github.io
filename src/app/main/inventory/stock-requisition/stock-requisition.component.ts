import { UnitId } from "./../Shared/DTOs/unit-id";
import { Component, ViewChild } from "@angular/core";
import { StockRequisition } from "../Shared/DTOs/stock-requisition";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError, map } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { AllTracingComponent } from "../all-tracing/all-tracing.component";
@Component({
  selector: "app-stock-requisition",
  templateUrl: "./stock-requisition.component.html",
})
export class StockRequisitionComponent {
  stockRequisitionDto: StockRequisition = new StockRequisition();
  restrictionDto: RestrictionDto = new RestrictionDto();
  // minDate: Date = new Date();
  maxDate: Date = new Date();
  requisitionData: any;
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  reviseMode: boolean;
  documentNumber: string;
  saving: boolean;
  itemFinancialIntegration: any;
  selectedItemType: any;
  target = "StockRequisition";
  rowData: any;
  TracingrowData: any;
  rowSelection: string;
  isTracing: boolean
  rowCount: number;
  displayItem: boolean;
  gridApi: any;
  protected tracingModalGridApi: GridApi;
  setParms: any;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  itemData: [];
  locationId: number;
  locationName: string;
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  addRow: boolean;
  view: boolean;
  suggestionModalRef: BsModalRef;
  voucherNumber: string;
  issueDate: Date;
  today: Date = new Date();
  MinDate: Date = new Date();
  displayTracingModel: boolean = false;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _basicTypeService: SetupsService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) { }

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SQ");
  }

  CloseModel() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.view = false;
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
      },
    });
  }

  openTracingComponent() {
    this.displayTracingModel = true;
    this.isTracing = true;
  }

  getAllData() { }

  viewOnly(id?: number) {
    debugger;
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
    debugger;
    this.editMode = true;
    this.view = false;
    this.show(id);
    this.MinDate = this.restrictionDto.editRestrictionDate;
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
            detail: error?.error?.error?.message,
            life: 2000,
          });
          return throwError(error?.error?.error?.message);
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

  show(id?: number) {
    debugger;
    // this.saving = false;
    if (id) {
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
            this.stockRequisitionDto = response;
            this.stockRequisitionDto.consumptionMonth = new Date(
              response.consumptionMonth
            );
            this.stockRequisitionDto.issueDate = new Date(response.issueDate);
            this.stockRequisitionDto.providerLocationId =
              response.providerLocationId;
            debugger;
            this.stockRequisitionDto.userLocationId = response.userLocationId;
            this.stockRequisitionDto.userLocationName =
              response.userLocationName;
            this.stockRequisitionDto.totalBudgetAmount =
              response.totalBudgetAmount;
            this.stockRequisitionDto.totalPurchaseAmount =
              response.totalPurchaseAmount;
            // this.stockRequisitionDto.totalSaleAmount = response.totalSaleAmount;
            this.rowData = [];
            this.rowData = [
              ...this.rowData,
              ...response.stockRequisitionDetails,
            ];
            this.rowData = this.rowData.map((item) => {
              try {
                return {
                  ...item,
                  monthlyBudgetAmount: item?.monthlyBudget ?? 0,
                  monthlyBudgetConsumed: item?.monthlyBudgetConsumed ?? 0,
                  monthlyBudgetAvailable: item?.monthlyBudgetAvailable ?? 0,
                  chartOfAccountId:
                    item?.itemFinancialIntegrations?.[0]?.chartOfAccountId ??
                    "",
                  chartOfAccountSerialNumber:
                    item?.itemFinancialIntegrations?.[0]
                      ?.chartOfAccountSerialNumber ?? "",
                  chartOfAccountName:
                    item?.itemFinancialIntegrations?.[0]?.chartOfAccountName ??
                    "",
                };
              } catch (error) {
                console.error("Error processing item:", item, error);
                return item; // or return a default object if you prefer
              }
            });
            this.AmountCalculations();
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
      this.addRow = false;
      this.displayModal = true;
      this.stockRequisitionDto = new StockRequisition();
      this.stockRequisitionDto.isActive = true;
      this.stockRequisitionDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.locationName = null;
      this.rowData = [];
    }
  }

  save() {
    debugger;
    if (!this.validationOfReq()) {
      return;
    }
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        itemId: node.data.itemId || 0,
        requestedQty: node.data.requestedQty || 0,
        unitId: node.data.unitId || 0,
        remarks: node.data.remarks || "string",
        lastPurchaseRate: node.data.lastPurchaseRate || 0,
        purchaseRate: node.data.purchaseRate || 0,
        requesterStock: node.data.requesterStock || 0,
        qtyToPurchase: node.data.qtyToPurchase || 0,
        qtyToUse: node.data.qtyToUse || 0,
        saleAmount: node.data.saleAmount || 0,
        saleRate: node.data.saleRate || 0,
        totalAmount: node.data.totalAmount || 0,
        chartOfAccountId: node.data.chartOfAccountId || 0,
        chartOfAccountName: node.data.chartOfAccountName || 0,
        providerStock: node.data.providerStock || 0,
        voucherNumber:
          this.stockRequisitionDto.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.stockRequisitionDto.stockRequisitionDetails = tempArr,
      this.stockRequisitionDto.providerRegionId = 1;
    this._basicTypeService
      .create(this.stockRequisitionDto, this.target)
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

  validationOfReq(): boolean {
    if (!this.stockRequisitionDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockRequisitionDto.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockRequisitionDto.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockRequisitionDto.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.stockRequisitionDto.consumptionMonth) {
      this.messageService.add({
        severity: "error",
        detail: "Budget Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.stockRequisitionDto.costCenterName == "O/H" &&
      !this.stockRequisitionDto.ohJobName
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
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    console.log(this.rowData.forEach((item) => item.totalAmount == 0));
    let hasItem = false;
    this.gridApi.forEachNode((node) => {
      if (!node.data.itemId) {
        hasItem = true;
      }
    });

    if (hasItem) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please choose an item before saving.",
        life: 2000,
      });
      return;
    }

    if (this.rowData.some((item) => item.totalAmount == 0)) {
      debugger;
      this.messageService.add({
        severity: "error",
        detail: "Please add some purchase rate amount",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.stockRequisitionDto.totalPurchaseAmount >
      this.stockRequisitionDto.totalBudgetAmount
    ) {
      this.stockRequisitionDto.totalPurchaseAmount = 0;
      this.stockRequisitionDto.totalBudgetAmount = 0;
      this.messageService.add({
        severity: "error",
        detail: "Your Current Month Budget is Less Than Total Purchase Amount.",
        life: 2000,
      });
    }
    return true;
  }

  update() {
    if (!this.validationOfReq()) {
      return;
    }
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        itemId: node.data.itemId,
        requestedQty: node.data.requestedQty,
        unitId: node.data.unitId,
        remarks: node.data.remarks,
        lastPurchaseRate: node.data.lastPurchaseRate,
        purchaseRate: node.data.purchaseRate,
        requesterStock: node.data.requesterStock,
        qtyToPurchase: node.data.qtyToPurchase,
        qtyToUse: node.data.qtyToUse,
        saleAmount: node.data.saleAmount,
        saleRate: node.data.saleRate,
        totalAmount: node.data.totalAmount,
        voucherNumber: this.stockRequisitionDto.voucherNumber,
      };
      tempArr.push(tempObj);
    });
    this.stockRequisitionDto.stockRequisitionDetails = tempArr;
    debugger;
    if (
      !(
        this.stockRequisitionDto.stockDemandTypeName === "Bulk Purchase" &&
        this.stockRequisitionDto.userLocationId === 1
      )
    ) {
      if (
        this.stockRequisitionDto.stockRequisitionDetails.some(
          (i) => i.totalAmount > i.monthlyBudgetAvailable
        )
      ) {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail:
            "Your Current Month Budget is Less Than Total Purchase Amount",
          life: 2000,
        });
        return;
      }
    }
    this._basicTypeService
      .update(this.stockRequisitionDto, this.target)
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

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "LocationTo":
        debugger;
        this.stockRequisitionDto.userLocationId = +value.id;
        this.stockRequisitionDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      case "DemandType":
        debugger;
        this.stockRequisitionDto.stockDemandTypeId = +value.id;
        this.stockRequisitionDto.stockDemandTypeName = value.name;
        break;
      case "Project":
        debugger;
        this.stockRequisitionDto.projectId = +value.id;
        this.stockRequisitionDto.projectName = value.name;
        break;
      case "ProjectFrom":
        debugger;
        this.stockRequisitionDto.providerProjectId = +value.id;
        this.stockRequisitionDto.providerProjectName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.stockRequisitionDto.regionId = +value.id;
      //   this.stockRequisitionDto.regionName = value.name;
      //   break;
      // case "RegionFrom":
      //   debugger;
      //   this.stockRequisitionDto.providerRegionId = +value.id;
      //   this.stockRequisitionDto.providerRegionName = value.name;
      //   break;
      case "CostCenter":
        debugger;
        this.stockRequisitionDto.costCenterId = +value.id;
        this.stockRequisitionDto.costCenterName = value.name;
        if (
          this.stockRequisitionDto.costCenterName == "O/H" &&
          !this.stockRequisitionDto.ohJobName
        ) {
          this.messageService.add({
            severity: "error",
            summary: "Note",
            detail: "Please add O/H Job",
            life: 2000,
          });
        }
        break;
      case "CostCenterFrom":
        debugger;
        this.stockRequisitionDto.providerCostCenterId = value.id;
        this.stockRequisitionDto.providerCostCenterName = value.name;
        break;
      case "LocationFrom":
        debugger;
        this.stockRequisitionDto.providerLocationId = +value.id;
        this.stockRequisitionDto.providerLocationName = value.name;
        break;
      case "OhJob":
        debugger;
        this.stockRequisitionDto.ohJobId = value.id;
        this.stockRequisitionDto.ohJobName = value.name;
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
    },
    {
      headerName: "Item Id",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "",
      field: "addItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "Unit Id",
    //     editable: false,
    //     field: "unitId",
    //     resizable: true,
    //     suppressSizeToFit: true,
    //     valueParser: function (params) {
    //         const newValue = parseFloat(params.newValue);
    //         return isNaN(newValue) ? null : newValue;
    //     },
    // },
    {
      headerName: "",
      field: "addUnit",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
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
      headerName: "User Stock",
      editable: false,
      field: "requesterStock",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Quantity Required",
      editable: true,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Stock In Hand From Loc",
      editable: false,
      field: "providerStock",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Quantity To Use",
      editable: true,
      field: "qtyToUse",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Quantity To Purchase",
      editable: false,
      field: "qtyToPurchase",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Last Purchase Rate",
      editable: false,
      field: "lastPurchaseRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Total Purchase Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },

    {
      headerName: "Monthly Budget ",
      editable: false,
      field: "monthlyBudgetAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Budget Consumed",
      editable: false,
      field: "monthlyBudgetConsumed",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Budget Available",
      editable: false,
      field: "monthlyBudgetAvailable",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "ChartOfAccountId",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "ChartOfAccountName",
      editable: false,
      field: "chartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "Sale Rate",
    //     editable: true,
    //     field: "saleRate",
    //     resizable: true,
    //     suppressSizeToFit: true,
    //     valueParser: function (params) {
    //         const newValue = parseFloat(params.newValue);
    //         return isNaN(newValue) ? null : newValue;
    //     },
    // },
    // {
    //     headerName: "Sale Amount",
    //     editable: true,
    //     field: "saleAmount",
    //     resizable: true,
    //     suppressSizeToFit: true,
    //     valueParser: function (params) {
    //         const newValue = parseFloat(params.newValue);
    //         return isNaN(newValue) ? null : newValue;
    //     },
    // },
  ];

  colDefsTracing: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Voucher Title",
      editable: false,
      field: "voucherTitle",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Voucher Date",
      editable: false,
      field: "voucherDate",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Ref.Voucher No.",
      editable: false,
      field: "refVoucherNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Prepared By",
      editable: false,
      field: "preparedBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "EntryDate",
      editable: false,
      field: "entryDate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Checked By",
      editable: false,
      field: "checkedBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Checked Date",
      editable: false,
      field: "checkedDate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cancelled By ",
      editable: false,
      field: "cancelledBy",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cancelled Date",
      editable: false,
      field: "cancelledDate",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }
  onTracingGridReady(params: GridReadyEvent) {
    this.tracingModalGridApi = params.api;
    this.TracingrowData = [];
  }

  onAddRow() {
    this.addRow = true;
    var newItem = {
      itemId: "",
      itemName: "",
      requestedQty: "",
      unitId: "",
      unitName: "",
      requesterStock: "",
      remarks: "",
    };
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      debugger;
      this.rowData = [];
      this.gridApi.forEachNode((node) => this.rowData.push(node.data));
      this.AmountCalculations();
    }
    this.addRow = this.gridApi.getDisplayedRowCount() === 0 ? false : true;
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        this.setParms = params;
        this.openSelectItem();
        break;
      case "addUnit":
        this.setParms = params;
        this.openSelectUnit();
        break;
      default:
        break;
    }
  }

  openSelectUnit() {
    debugger;
    const initialState: any = {
      target: "Unit",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.unitId = +result.id.split("/")[0];
      this.setParms.data.unitName = result.name;
      this.gridApi.refreshCells();
    });
  }

  async fetchStockRequestDetails(
    itemId: number,
    projectId: number,
    costCenterId: number,
    locationId: number,
    // regionId: number,
    consumptionMonth: Date,
    providerProjectId: number,
    providerCostCenterId: number,
    providerLocationId: number
    // providerRegionId: number
  ): Promise<any> {
    debugger;
    return this._basicTypeService
      .fetchStockRequestDetails(
        itemId,
        projectId,
        costCenterId,
        locationId,
        // regionId,
        consumptionMonth,
        providerProjectId,
        providerCostCenterId,
        providerLocationId
        // providerRegionId
      )
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(() => new Error(error.message));
        })
      )
      .toPromise();
  }

  openSelectItem() {
    debugger;

    const { costCenterId, projectId, userLocationId, consumptionMonth } =
      this.stockRequisitionDto;
    const { providerCostCenterId, providerProjectId, providerLocationId } =
      this.stockRequisitionDto;
    const validateField = (field, errorMessage) => {
      if (!field) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
          life: 2000,
        });
        return false;
      }
      return true;
    };

    const validateFields = () => {
      switch (true) {
        case !validateField(userLocationId, "Please Select User Location"):
        case !validateField(costCenterId, "Please Select User Cost Center"):
        case !validateField(projectId, "Please Select User Project"):
        case !validateField(consumptionMonth, "Please Select Budget Date"):
        case !validateField(
          providerCostCenterId,
          "Please Select From Cost Center"
        ):
        case !validateField(providerProjectId, "Please Select From Project"):
        case !validateField(providerLocationId, "Please Select From Location"):
          return false;
        default:
          return true;
      }
    };

    if (validateFields()) {
      // Your further code execution here
      this._basicTypeService
        .getLinkedItem(costCenterId, projectId, userLocationId)
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
            this.itemData = response;
          },
        });
      this.displayItem = true;
      return;
    }
  }

  async SelectItem(item: any) {
    debugger;
    const isItemAlreadyAdded = this.rowData.some(
      (row) => row.itemId === item.id
    );

    if (isItemAlreadyAdded) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "This item has already been added.",
        life: 2000,
      });
      return;
    }
    try {
      //////// Requester Information ////////
      let requesterProjectId = this.stockRequisitionDto.projectId;
      let requesterCostCenterId = this.stockRequisitionDto.costCenterId;
      // let requesterRegionId = this.stockRequisitionDto.regionId;
      let requesterlocationId = this.stockRequisitionDto.userLocationId;
      let requesterConsumptionMonth = this.stockRequisitionDto.consumptionMonth;
      //////// Provider Information ////////
      let providerProjectId = this.stockRequisitionDto.providerProjectId;
      let providerCostCenterId = this.stockRequisitionDto.providerCostCenterId;
      // let providerRegionId = this.stockRequisitionDto.providerRegionId;
      let providerlocationId = this.stockRequisitionDto.providerLocationId;

      var details = await this.fetchStockRequestDetails(
        item.id,
        requesterProjectId,
        requesterCostCenterId,
        requesterlocationId,
        // requesterRegionId,
        requesterConsumptionMonth,
        providerProjectId,
        providerCostCenterId,
        providerlocationId
        // providerRegionId
      );
      debugger;
      console.log(details);
      this.setParms.data.itemId = item.id;
      this.setParms.data.itemName = item.name;
      this.setParms.data.unitId = item.additional.split("/")[0];
      this.setParms.data.unitName = item.additional.split("/")[1];
      this.setParms.data.monthlyBudgetAvailable =
        details.monthlyBudgetAvailable;
      this.setParms.data.monthlyBudgetAmount = details.monthlyBudget;
      this.setParms.data.monthlyBudgetConsumed = details.monthlyBudgetConsumed;
      this.setParms.data.chartOfAccountId =
        details.itemFinancialIntegration[0].chartOfAccountId;
      this.setParms.data.chartOfAccountSerialNumber =
        details.itemFinancialIntegration[0].chartOfAccountSerialNumber;
      this.setParms.data.chartOfAccountName =
        details.itemFinancialIntegration[0].chartOfAccountName;
      this.setParms.data.providerStock = details.providerStock;
      this.setParms.data.lastPurchaseRate = details.lastPurchaseRate;
      this.setParms.data.requesterStock = details.requesterStock;
    } catch (error) {
      console.error("Error fetching stock details", error);
    }
    this.displayItem = false;
    this.rowData.push(this.setParms.data);
    this.gridApi.refreshCells();
  }

  OnCellValueChanged(params) {
    debugger;

    // Ensure requestedQty is not negative
    if (params.data.requestedQty < 0) {
      params.data.requestedQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Required Quantity cannot be negative.",
        life: 2000,
      });
    }

    // Ensure qtyToUse doesn't exceed qtyInStockFromLoc
    if (params.data.qtyToUse > params.data.providerStock) {
      params.data.qtyToUse = params.data.providerStock;
      this.messageService.add({
        severity: "error",
        detail: "Quantity to use cannot be greater than quantity in stock.",
        life: 2000,
      });
    }

    // Calculate qtyToPurchase
    if (params.data.providerStock === params.data.qtyToUse) {
      // If all stock is being used, purchase the entire requested quantity
      params.data.qtyToPurchase = params.data.requestedQty;
    } else if (
      params.data.providerStock - params.data.qtyToUse >=
      params.data.requestedQty
    ) {
      // If remaining stock after use is enough, no need to purchase
      params.data.qtyToPurchase = 0;
    } else {
      // Purchase the difference between requested and available after use
      params.data.qtyToPurchase =
        params.data.requestedQty -
        (params.data.providerStock -
          (params.data.qtyToUse === undefined ? 0 : params.data.qtyToUse));
    }

    // Ensure qtyToPurchase is not negative
    params.data.qtyToPurchase = Math.max(0, params.data.qtyToPurchase);

    // Calculate totalAmount
    params.data.totalAmount =
      params.data.requestedQty * params.data.lastPurchaseRate;

    // Refresh grid and recalculate amounts
    this.gridApi.refreshCells();
    this.AmountCalculations();
  }

  AmountCalculations() {
    console.log(this.rowData);
    let totalPurchaseAmount = 0;
    let totalBudgetAmount = 0;

    const filteredData = this.filterDuplicatesByChartOfAccountId(this.rowData);
    console.log(filteredData);

    filteredData.forEach((item) => {
      // totalPurchaseAmount += item.totalAmount;
      totalBudgetAmount += item.monthlyBudgetAvailable;
    });

    this.rowData.forEach((item) => {
      totalPurchaseAmount += item.totalAmount;
    });
    debugger;
    this.stockRequisitionDto.totalPurchaseAmount = totalPurchaseAmount;
    this.stockRequisitionDto.totalBudgetAmount = totalBudgetAmount;
  }

  filterDuplicatesByChartOfAccountId(data: any) {
    const uniqueMap = new Map();

    return data.filter((item) => {
      if (!uniqueMap.has(item.chartOfAccountId)) {
        uniqueMap.set(item.chartOfAccountId, true);
        return true;
      }
      return false;
    });
  }

  prepareGridData(items: any[]): any[] {
    debugger;
    return items.map((item, index) => ({
      pendingRequestedQty: item.ipR_Details.pendingRequestedQty,
      itemName: item.ipR_Details.itemName,
      itemId: item.ipR_Details.itemId,
      requestedQty: item.ipR_Details.requestedQty,
      batchNumber: item.ipR_Details.batchNumber,
      mO_Number: item.ipR_Details.mO_Number,
      iprVoucherNo: item.ipR_Details.ipR_VoucherNumber,
      remarks: item.ipR_Details.remarks,
      issuedQty: item.issuedQty,
      orderQty:
        item.ipR_Details.requestedQty - item.ipR_Details.pendingRequestedQty,
    }));
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

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.stockRequisitionDto.issueDate = value;
    }
    if (
      this.stockRequisitionDto.userLocationId &&
      this.stockRequisitionDto.issueDate
    ) {
      this.getVoucherNumber();
    }
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
          this.stockRequisitionDto.userLocationName =
            response.items[0].shortName;
          this.stockRequisitionDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
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
  getVoucherNumber() {
    debugger;
    this._restrictionService
      .getVoucherNumber(
        this.target,
        "SQ",
        this.stockRequisitionDto.issueDate,
        this.stockRequisitionDto.userLocationId
      )
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
          this.stockRequisitionDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }

  openTracingModal(id: string, voucherNumber: string, target: string) {
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
}
