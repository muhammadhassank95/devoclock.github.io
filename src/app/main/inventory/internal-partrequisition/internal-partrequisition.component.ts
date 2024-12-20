import { InternalPartRecquService } from "./../Shared/Services/internal-part-recqu.service";
import { Component, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { InternalpartRequisition } from "../Shared/DTOs/internalpart-requisition";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-internal-partrequisition",
  templateUrl: "./internal-partrequisition.component.html",
})
export class InternalPartrequisitionComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  internalpartRequisition: InternalpartRequisition =
    new InternalpartRequisition();
  tableData: any;
  count: number;
  docCount: number;
  // regionId: number;
  // regionName: string;
  displayEmployeeSerialNumber: string;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "InternalPartRequisition";
  itemData: [];
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  displayItem: boolean;
  view: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _internalPartRecquService: InternalPartRecquService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private stockervice: SetupsService
  ) {}

  show(id?: number) {
    debugger;
    if (id) {
      // this.editMode = true;
      this._internalPartRecquService
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
            this.internalpartRequisition = response;
            debugger;
            this.rowData = response.internalPartRequisitionDetails;
            this.internalpartRequisition.issueDate = new Date(
              response.issueDate
            );
            this.internalpartRequisition.userLocationId =
              response.userLocationId;
            this.internalpartRequisition.locationName =
              response.userLocationName;
            this.internalpartRequisition.id = id;
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
      this.internalpartRequisition.userLocationId = null;
      this.internalpartRequisition.locationName = null;
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.internalpartRequisition = new InternalpartRequisition();
      this.rowData = [];
      this.internalpartRequisition.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.internalpartRequisition.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.internalpartRequisition.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.internalpartRequisition.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.internalpartRequisition.employeeId) {
      this.messageService.add({
        severity: "error",
        detail: "Employee Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.internalpartRequisition.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.internalpartRequisition.costCenterName == "O/H" &&
      !this.internalpartRequisition.ohJobName
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

    if (!this.internalpartRequisition.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project Id is Required",
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
    const initialVoucherNumber = this.internalpartRequisition.voucherNumber;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      // let gridItem = {};
      // Object.keys(node.data).forEach(item => {{
      //   gridItem[item] = node.data[item]
      // }})
      var tempObj = {
        id: node.data.id,
        itemId: node.data.itemId,
        itemName: node.data.itemName,
        unitId: node.data.unitId,
        unitName: node.data.unitName,
        batchNumber: node.data.batchNumber,
        mO_Number: node.data.mO_Number,
        employeeStock: node.data.employeeStock,
        warehouseStock: node.data.warehouseStock,
        requestedQty: node.data.requestedQty,
        ipR_VoucherNumber: initialVoucherNumber + "/" + index + 1,
        // pendingRequestedQty: node.data.pendingRequestedQty,
        remarks: node.data.remarks,
      };
      tempArr.push(tempObj);
    });
    this.internalpartRequisition.internalPartRequisitionDetails = tempArr;
    debugger;
    this._internalPartRecquService
      .create(this.internalpartRequisition)
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
        itemId: node.data.itemId,
        itemName: node.data.itemName,
        unitId: node.data.unitId,
        unitName: node.data.unitName,
        batchNumber: node.data.batchNumber,
        mO_Number: node.data.mO_Number,
        employeeStock: node.data.employeeStock,
        warehouseStock: node.data.warehouseStock,
        requestedQty: node.data.requestedQty,
        remarks: node.data.remarks,
        ipR_VoucherNumber:
          this.internalpartRequisition.voucherNumber + "/" + index + 1,
      };
      tempArr.push(tempObj);
    });
    this.internalpartRequisition.internalPartRequisitionDetails = tempArr;
    debugger;
    if (
      this.internalpartRequisition.costCenterName == "O/H" &&
      !this.internalpartRequisition.ohJobName
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

    this._internalPartRecquService
      .update(this.internalpartRequisition)
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

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("IPR");
  }

  getAll() {
    this._internalPartRecquService
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
        this._internalPartRecquService
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

  HandleDateChange(value?: Date) {
    this.internalpartRequisition.issueDate = value;

    const { issueDate, userLocationId } = this.internalpartRequisition;
    if (issueDate && userLocationId) {
      this.getNextCount();
    }
  }

  getNextCount() {
    const { issueDate, userLocationId } = this.internalpartRequisition;
    this._internalPartRecquService
      .getMaxCount(issueDate, userLocationId)
      .subscribe((result) => {
        this.docCount = result;
        this.MakeVoucher();
      });
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.internalpartRequisition.issueDate = value;
    }
    if (
      this.internalpartRequisition.userLocationId &&
      this.internalpartRequisition.issueDate
    ) {
      this.internalpartRequisition.voucherNumber =
        "GQ" +
        "/" +
        (this.internalpartRequisition.issueDate.getMonth() + 1) +
        "/" +
        this.internalpartRequisition.issueDate.getFullYear() +
        "/" +
        this.internalpartRequisition.userLocationId +
        "/" +
        this.docCount;
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.internalpartRequisition.userLocationId = +value.id;
        this.internalpartRequisition.locationName = value.name;
        this.getNextCount();
        // this.MakeVoucher();
        break;
      case "Project":
        debugger;
        this.internalpartRequisition.projectId = +value.id;
        this.internalpartRequisition.projectName = value.name;
        break;
      case "Employee":
        debugger;
        this.internalpartRequisition.employeeId = +value.additional;
        this.internalpartRequisition.employeeName = value.name;
        this.displayEmployeeSerialNumber = value.id;
        break;
      case "CostCenter":
        debugger;
        this.internalpartRequisition.costCenterId = +value.id;
        this.internalpartRequisition.costCenterName = value.name;
        if (
          this.internalpartRequisition.costCenterName == "O/H" &&
          !this.internalpartRequisition.ohJobName
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
        this.internalpartRequisition.ohJobId = +value.id;
        this.internalpartRequisition.ohJobName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.internalpartRequisition.regionId = +value.id;
      //   this.internalpartRequisition.regionName = value.name;
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
      headerName: "Unit ID",
      editable: false,
      field: "unitId",
      resizable: true,
      width: 90,
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
      headerName: "Batch Number",
      editable: true,
      field: "batchNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "MO Number",
      editable: true,
      field: "mO_Number",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Required Qty",
      editable: true,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Stock at Loc",
      editable: false,
      field: "warehouseStock",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Emp Stock",
      editable: false,
      field: "employeeStock",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //     headerName: "Pending Requested Qty",
    //     editable: true,
    //     field: "pendingRequestedQty",
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
  ];

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

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
      case "addUnit":
        debugger;
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
    employeeId: number,
    itemId: number,
    projectId: number,
    costCenterId: number,
    locationId: number
    // regionId: number
  ): Promise<any> {
    debugger;
    return this._internalPartRecquService
      .fetchStockRequestDetails(
        employeeId,
        itemId,
        projectId,
        costCenterId,
        locationId
        // regionId
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

    const { costCenterId, projectId, userLocationId } =
      this.internalpartRequisition;

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
        case !validateField(costCenterId, "Please Select Cost Center"):
        case !validateField(projectId, "Please Select Project"):
        case !validateField(userLocationId, "Please Select Location"):
          // case !validateField(regionId, "Please Select Region"):
          return false;
        default:
          return true;
      }
    };

    if (validateFields()) {
      // Your further code execution here
      this._internalPartRecquService
        .getLinkedItem(costCenterId, projectId, userLocationId)
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
            this.itemData = response;
          },
        });
      this.displayItem = true;
      return;
    }
  }

  async SelectItem(item: any) {
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
      let employeeId = this.internalpartRequisition.employeeId;
      let itemId = item.id;
      let projectId = this.internalpartRequisition.projectId;
      let costCenterId = this.internalpartRequisition.costCenterId;
      let locationId = this.internalpartRequisition.userLocationId;
      // let regionId = this.regionId;
      var details = await this.fetchStockRequestDetails(
        employeeId,
        itemId,
        projectId,
        costCenterId,
        locationId
        // regionId
      );
      debugger;
      console.log(details);
      this.setParms.data.itemId = item.id;
      this.setParms.data.itemName = item.name;
      this.setParms.data.warehouseStock = details.warehouseStock;
      this.setParms.data.employeeStock = details.employeeStock;
    } catch (error) {
      console.error("Error fetching stock details", error);
    }
    this.displayItem = false;
    this.rowData.push(this.setParms.data);
    this.gridApi.refreshCells();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.gridApi.refreshCells();
    this.rowCount = this.gridApi.getDisplayedRowCount();
    this.gridApi.setRowData([]);
  }

  onAddRow() {
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        newItem[colDef.field] = null;
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
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
        this._internalPartRecquService
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
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.DocOrVocNumber = inputValue;
    this._internalPartRecquService.getAll(this.filterDto).subscribe({
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
    this._internalPartRecquService.getAll(this.filterDto).subscribe({
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
