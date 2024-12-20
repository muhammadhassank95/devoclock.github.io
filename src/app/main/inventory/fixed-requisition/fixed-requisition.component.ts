import { Component, ViewChild } from "@angular/core";
import { FixedRequisition } from "../Shared/DTOs/fixed-requisition";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";

@Component({
  selector: "app-fixed-requisition",
  templateUrl: "./fixed-requisition.component.html",
})
export class FixedRequisitionComponent {
  fixedRequisitionDto: FixedRequisition = new FixedRequisition();

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  reviseMode: boolean;
  saving: boolean;
  target = "InventoryRequisition";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  gridApi: any;
  setParms: any;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;

  locationId: number | null;
  locationName: string | null;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  ngOnInit() {
    this.getAll();
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
            detail: error?.error?.error?.message,
            life: 2000,
          });
          return throwError(error?.error?.error?.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.tableData = response.items.filter(
            (item) => item.itemType == "Fixed"
          );
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
      this.editMode = true;
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
            this.fixedRequisitionDto = response;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.fixedRequisitionDto = new FixedRequisition();
      this.fixedRequisitionDto.isActive = true;
      this.locationId = null;
      this.locationName = null;
      this.rowData = [];
    }
  }

  save() {
    this.saving = true;
    var tempArr: any[] = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        itemId: node.data.itemId,
        requestedQty: node.data.requestedQty,
        unitId: node.data.unitId,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.fixedRequisitionDto.inventoryRequisitionDetails = tempArr;
    this._basicTypeService
      .create(this.fixedRequisitionDto, this.target)
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
    var tempArr: any[] = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        itemId: node.data.itemId,
        requestedQty: node.data.requestedQty,
        unitId: node.data.unitId,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.fixedRequisitionDto.inventoryRequisitionDetails = tempArr;
    this._basicTypeService
      .update(this.fixedRequisitionDto, this.target)
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
        this.locationId = +value.id;
        this.locationName = value.name;
        this.MakeVoucher();
        break;
      case "demandType":
        debugger;
        this.fixedRequisitionDto.demandTypeId = +value.id;
        this.fixedRequisitionDto.demandTypeName = value.name;
        break;
      case "Project":
        debugger;
        this.fixedRequisitionDto.projectId = +value.id;
        this.fixedRequisitionDto.projectName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.fixedRequisitionDto.costCenterId = +value.id;
        this.fixedRequisitionDto.costCenterName = value.name;
        break;
      case "LocationFrom":
        debugger;
        this.fixedRequisitionDto.fromLocation = +value.id;
        this.fixedRequisitionDto.fromLocationName = value.name;
        break;
      case "LocationTo":
        debugger;
        this.fixedRequisitionDto.toLocation = +value.id;
        this.fixedRequisitionDto.toLocationName = value.name;
        break;
      case "OHJob":
        debugger;
        this.fixedRequisitionDto.ohJobId = +value.id;
        this.fixedRequisitionDto.ohJobName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.fixedRequisitionDto.issueDate = value;
    }
    if (this.locationId && this.fixedRequisitionDto.issueDate) {
      this.fixedRequisitionDto.voucherNumber =
        "FRQ" +
        "/" +
        (this.fixedRequisitionDto.issueDate.getMonth() + 1) +
        "/" +
        this.fixedRequisitionDto.issueDate.getFullYear() +
        "/" +
        this.locationId;
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
      headerName: "Requested Quantity",
      editable: true,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit ID",
      editable: false,
      field: "unitId",
      resizable: true,
      suppressSizeToFit: true,
    },
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
      headerName: "Remarks",
      editable: true,
      field: "remarks",
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

  onAddRow() {
    var newItem = {
      itemId: 0,
      itemName: "",
      requestedQty: 0,
      unitId: 0,
      unitName: "",
      remarks: "",
    };
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
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

  openSelectItem() {
    debugger;
    const initialState: any = {
      target: "FixedAssetItem",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.itemId = +result.id;
      this.setParms.data.itemName = result.name;
      this.gridApi.refreshCells();
    });
  }

  openSelectUnit() {
    debugger;
    const initialState: any = {
      target: "StockUnit",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.unitId = +result.id;
      this.setParms.data.unitName = result.name;
      this.gridApi.refreshCells();
    });
  }
}
