import { Component, Input } from "@angular/core";
import { PurchaseRatePolicy } from "../Shared/DTOs/purchase-rate-policy";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { SuggestionLookupTableModalComponent } from "../../../../shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-purchase-rate-policy",
  templateUrl: "./purchase-rate-policy.component.html",
})
export class PurchaseRatePolicyComponent {
  purchaseRatePolicy: PurchaseRatePolicy = new PurchaseRatePolicy();
  restrictionDto: RestrictionDto = new RestrictionDto();

  selectedItemType: string;
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  protected setParms;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  currentPage: number = 1;
  view: boolean;
  loading: boolean;
  documentNumber: string;
  today: Date = new Date();
  MinDate: Date = new Date();
  serialNumber: number;
  @Input() rowData: any;
  suggestionModalRef: BsModalRef;

  itemTypes: any[] = [
    { label: "Service Item", value: "ServiceItem" },
    { label: "Fixed Item", value: "FixedAssetItem" },
    { label: "Stock Item", value: "StockItem" },
  ];

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  haveData: boolean = false;
  saving: boolean;
  userLocationId: number;
  locationName: string;
  target = "PurchaseRatePolicy";

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("PRP");
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
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
    {
      headerName: "Rate",
      editable: true,
      field: "rate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Discount %",
      editable: true,
      field: "discountPercentage",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Discount Amount",
      editable: false,
      field: "discountAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Final Rate",
      editable: false,
      field: "finalRate",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }

  onAddRow() {
    if (this.selectedItemType) {
      const newItem: Record<string, any> = {};
      this.colDefs.forEach((colDef) => {
        if (colDef.field) {
          // Ensure field is defined
          newItem[colDef.field] = null;
        }
      });
      this.gridApi.applyTransaction({ add: [newItem] });
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.disableSelectItemType(this.rowCount);
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Selete Item Type",
        life: 2000,
      });
    }
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
    this.disableSelectItemType(this.rowCount);
  }
  disableSelectItemType(rowCount) {
    if (rowCount) {
      this.haveData = true;
    } else {
      this.haveData = false;
    }
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
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
      // target: "ServiceItem"

      target: this.selectedItemType,
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.itemId = +result.id.split("/")[0];
      this.setParms.data.itemName = result.name;
      this.gridApi.refreshCells();
    });
  }

  cellValueChanged(params) {
    debugger;
    if (
      params.colDef.field == "rate" ||
      params.colDef.field == "discountAmount" ||
      params.colDef.field == "discountPercentage"
    ) {
      if (params.data.rate) {
        if (
          params.colDef.field == "discountPercentage" &&
          params.data.discountPercentage !== undefined
        ) {
          params.data.discountAmount =
            (params.data.rate * params.data.discountPercentage) / 100;
        }
        if (
          params.colDef.field == "discountAmount" &&
          params.data.discountAmount !== undefined
        ) {
          params.data.discountPercentage =
            (params.data.discountAmount / params.data.rate) * 100;
        }
        if (params.data.discountAmount !== undefined) {
          params.data.finalRate = params.data.rate - params.data.discountAmount;
        }
      }

      this.gridApi.refreshCells();
    }
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
            this.purchaseRatePolicy = response;
            // this.getDefeauLocation(
            //   "Location",
            //   "locationName",
            //   "userLocationId",
            //   response.costCenterId
            // );
            this.selectedItemType = response.categoryType;
            this.purchaseRatePolicy.issueDate = new Date(response.issueDate);
            this.purchaseRatePolicy.voucherNumber = response.voucherNumber;
            this.rowData = response.items;
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
      this.getDefeauLocation("Location", "locationName", "userLocationId", "");
      this.selectedItemType = "";
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.purchaseRatePolicy = new PurchaseRatePolicy();
      this.rowData = [];
      this.purchaseRatePolicy.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  save() {
    debugger;
    this.saving = true;
    this.purchaseRatePolicy.categoryType = this.selectedItemType;
    var tempArr = [];
    this.gridApi.forEachNode((node) => {
      var tempObj = {
        itemId: node.data.itemId,
        rate: node.data.rate,
        discountAmount: node.data.discountAmount,
        finalRate: node.data.finalRate,
        discountPercentage: node.data.discountPercentage,
      };
      tempArr.push(tempObj);
    });
    this.purchaseRatePolicy.purchaseRatePolicyDetails = tempArr;
    console.log(this.purchaseRatePolicy, this.target);

    this._basicTypeService
      .create(this.purchaseRatePolicy, this.target)
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
    this.gridApi.forEachNode((node) => {
      var tempObj = {
        itemId: node.data.itemId,
        rate: node.data.rate,
        discountAmount: node.data.discountAmount,
        finalRate: node.data.finalRate,
        discountPercentage: node.data.discountPercentage,
      };
      tempArr.push(tempObj);
    });
    this.purchaseRatePolicy.purchaseRatePolicyDetails = tempArr;
    this._basicTypeService
      .update(this.purchaseRatePolicy, this.target)
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
        this.purchaseRatePolicy.userLocationId = +value.id;
        this.purchaseRatePolicy.userLocationName = value.name;
        this.GetDocMaxCount("PurchaseRatePolicy");
        break;
      case "Supplier":
        debugger;
        this.purchaseRatePolicy.supplierId = +value.id;
        this.purchaseRatePolicy.supplierName = value.title;
        this.serialNumber = value.serialNumber;
        break;
      case "CurrentPaymentMode":
        debugger;
        this.purchaseRatePolicy.paymentModeId = +value.id;
        this.purchaseRatePolicy.paymentModeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  MakeVoucher() {
    debugger;
    if (this.purchaseRatePolicy.userLocationId && this.documentNumber) {
      this.purchaseRatePolicy.voucherNumber =
        "PRP-HNL" +
        "-" +
        this.purchaseRatePolicy.userLocationId +
        "-" +
        this.purchaseRatePolicy.issueDate.getFullYear() +
        "-" +
        (this.purchaseRatePolicy.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("PurchaseRatePolicy");
    }
  }

  approve(id) {
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
                detail: error?.error?.error?.message,
                life: 2000,
              });
              return throwError(error?.error?.error?.message);
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
                  detail: "UnApproved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  getDefeauLocation(target: string, name: string, id: string, filterId) {
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
          this.purchaseRatePolicy.userLocationName = response.items[0].name;
          this.purchaseRatePolicy.userLocationId = response.items[0].id;
          this.GetDocMaxCount("PurchaseRatePolicy");
        },
      });
  }
  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.purchaseRatePolicy.userLocationId &&
      this.purchaseRatePolicy.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.purchaseRatePolicy.userLocationId,
          this.purchaseRatePolicy.issueDate
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
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.purchaseRatePolicy.issueDate = value;
    }
    if (
      this.purchaseRatePolicy.userLocationId &&
      this.purchaseRatePolicy.issueDate
    ) {
      this.GetDocMaxCount("PurchaseRatePolicy");
    }
  }

  CloseModel() {
    this.displayModal = false;
  }
  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
  }
  edit(id: number) {
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
