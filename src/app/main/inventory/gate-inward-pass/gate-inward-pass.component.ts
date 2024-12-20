import { Component, ViewChild } from "@angular/core";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, startWith, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { InwardGatePass } from "../Shared/DTOs/gate-pass-dtos";
import { PurchaseOrder } from "../Shared/DTOs/purchase-order";
import { Table } from "primeng/table";
import { UnitId } from "../Shared/DTOs/unit-id";
import { DialogService } from "primeng/dynamicdialog";
import { AllTracingComponent } from "../all-tracing/all-tracing.component";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-gate-inward-pass",
  templateUrl: "./gate-inward-pass.component.html",
})
export class GateInwardPassComponent {
  inwardGatePassDto: InwardGatePass = new InwardGatePass();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  displayModal: boolean;
  selectedPurchaseOrder: PurchaseOrder = new PurchaseOrder();
  displayRequisition: boolean;
  serialNumber: number;
  currentPage: number = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  copyVoucherNumberMenuItems;
  purchaseOrdersList: PurchaseOrder[] = [];
  passType: string = "";
  selectedVoucherNumberType: { name: string; code: string } = {
    name: "",
    code: "",
  };
  dropdownOptions = [
    { name: "Purchase Order", code: "po" },
    { name: "Gate Outward Pass", code: "gate-outward-pass" },
  ];

  editMode: boolean;
  saving: boolean;
  target = "InwardGatepass";
  requisitionData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  documentNumber: string;
  rowCount: number;
  rowData: any;
  // regionId: number;
  // regionName: string;
  today: Date = new Date();
  MinDate: Date = new Date();
  employeeErpId: number;
  shwoAddBtn: boolean = true;
  view: boolean;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _serviceRequestService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private dialogService: DialogService
  ) { }

  show(id?: number) {
    debugger;
    if (id) {
      // this.editMode = true;
      this._serviceRequestService
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
            let date = this.inwardGatePassDto.issueDate;
            this.inwardGatePassDto = response;
            this.serialNumber = response.supplierSerialNumber;
            this.employeeErpId = response.employeeErpId;
            this.inwardGatePassDto.id = id;
            this.selectedPurchaseOrder = { ...response };
            this.selectedPurchaseOrder.supplierId = response.supplierId;
            this.selectedPurchaseOrder.supplierName = response.supplierName;
            this.selectedPurchaseOrder.employeeId = response.employeeId;
            this.selectedPurchaseOrder.employeeName = response.employeeName;
            // this.regionId = response.regionId;
            // this.regionName = response.regionName;
            if (this.purchaseOrdersList?.length == 0) {
              this.getAllPos(id);
            }
            // this.getDefaultLocation(
            //   "Location",
            //   "locationName",
            //   "locationId",
            //   ""
            // );

            response.inwardGatepassDetails = response.inwardGatepassDetails.map(
              (item) => ({
                ...item, // Spread the existing properties of the item
                lastPurchaseRate: item.rate,
                uoMId: item.unitId,
                uoMName: item.unitName,
              })
            );

            // let res = { ...response.inwardDetails, lastPurchaseRate: response.inwardDetails.rate }
            //response.inwardDetails
            debugger;
            this.rowData = response.inwardGatepassDetails;
            this.inwardGatePassDto.issueDate = new Date(response.issueDate);
            this.inwardGatePassDto.userLocationId = response.userLocationId;
            this.inwardGatePassDto.deliveryChallanDate = new Date(
              response.deliveryChallanDate
            );
            this.inwardGatePassDto.deliveryChallanNumber =
              response.deliveryChallanNumber;
            this.inwardGatePassDto.timeIn = this.formatTime(response.timeIn);
            this.displayModal = true;
            console.log(this.selectedPurchaseOrder, "selectedPurchaseOrder");
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
      // this.inwardGatePassDto.destinationId = null;
      // this.inwardGatePassDto.destinationName = null;
      this.inwardGatePassDto.isReturnable = true;
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.inwardGatePassDto = new InwardGatePass();
      // this.selectedPurchaseOrder = new Purchase
      // this.inwardGatePassDto = new InwardGatePass();
      this.rowData = [];
      this.inwardGatePassDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  handleVoucherNumberSelection(value) {
    debugger;
    console.log({ value });
    debugger;
    this.passType = value.code;
    if (value.code == "po") {
      this.selectedVoucherNumberType = value;
      this.getAllPos();
    } else {
      this.getAllOutWordPass();
    }
  }

  handleSelectPurchaseOrder(value) {
    debugger;
    this.selectedPurchaseOrder = value;

    if (!this.inwardGatePassDto.issueDate) {
      this.inwardGatePassDto.issueDate;
      let date = new Date();
      this.inwardGatePassDto.issueDate = date;
    } else {
      let date = new Date(this.inwardGatePassDto.issueDate);
      this.inwardGatePassDto.issueDate = date;
    }

    Object.keys(this.selectedPurchaseOrder).forEach((key) => {
      if (key != "issueDate")
        this.inwardGatePassDto[key] = this.selectedPurchaseOrder[key];
    });

    // console.log(this.inwardGatePassDto, 'inwardGatePassDto');
    // console.log(value);

    if (this.passType === "po") {
      this.getResponceOfSelectedDropdown(
        this.inwardGatePassDto.id,
        "PurchaseOrder"
      );
    } else {
      this.getResponceOfSelectedDropdown(
        this.inwardGatePassDto.id,
        "OutwardGatepass"
      );
    }
  }

  getResponceOfSelectedDropdown(id, target) {
    debugger;
    this._serviceRequestService
      .getDataForEdit(id, target)
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
          // this.inwardGatePassDto = response;
          this.inwardGatePassDto.id = this.inwardGatePassDto.id;
          this.inwardGatePassDto.supplierId = response.supplierId;
          this.serialNumber = response.supplierSerialNumber;
          this.inwardGatePassDto.supplierName = response.supplierName;
          this.inwardGatePassDto.costCenterId = response.requesterCostCenterId;
          this.inwardGatePassDto.costCenterName =
            response.requesterCostCenterName;
          this.inwardGatePassDto.projectId = response.requesterProjectId;
          this.inwardGatePassDto.projectName = response.requesterProjectName;
          this.inwardGatePassDto.employeeId = response.employeeId;
          this.employeeErpId = response.employeeErpId;
          // this.regionId = response.requesterRegionId;
          // this.regionName = response.requesterRegionName;
          this.getDefaultLocation("Location", "locationName", "locationId", "");

          // let newData=  response.details.map(item => ({ ...item.purchaseRequestDetails.requisitionDetail, id: item.id, refQty: item.gateInwardPass_PendingQty }));

          if (this.passType === "po") {
            this.managetGridData(response.purchaseOrderDetails);
          } else {
            this.managetGridDataForOutPass(response.outwardDetails);
          }

          // this.inwardGatePassDto.issueDate = new Date(response.issueDate);
          // this.inwardGatePassDto.userLocationId = response.userLocationId;
          // this.inwardGatePassDto.dcDate = new Date(response.dcDate);
          // this.inwardGatePassDto.reference = response.reference;
          // this.inwardGatePassDto.timeIn = this.formatTime(response.timeIn);
          // this.displayModal = true;
        },
      });
  }

  managetGridData(response) {
    console.log(response);
    let newData = response.map((item) => ({
      ...item,
      id: item.id,
      itemId: item.itemId,
      itemName: item.itemName,
      remarks: item.remarks,
      lastPurchaseRate: item.rate,
      refQty: item.gateInwardPass_PendingQty,
      // purchaseOrderPendingQty:
      //   item.purchaseRequestDetails.purchaseOrderPendingQty,

      //   rate: item.costRate
    }));
    this.rowData = newData;
    // console.log(newData);
    // debugger;
    // var data = newData.filter((item) => {
    //   debugger;
    //   item.purchaseOrderPendingQty !== 0;
    // });
    // this.rowData = data;

    // this.shwoAddBtn = false;
    // if (!this.rowData.length) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "There is No Item Pending in this Document",
    //     life: 2000,
    //   });
    // }
  }

  managetGridDataForOutPass(response) {
    let newData = response
      .map((item) => ({
        ...item.purchaseRequestDetails.requisitionDetail,
        id: item.id,
        refQty: item.gateInwardPass_PendingQty,
        //   rate: item.costRate
      }))
      .filter((item) => item.refQty !== 0);
    debugger;
    console.log(newData);
    this.rowData = newData;

    this.shwoAddBtn = false;
    if (!this.rowData.length) {
      this.messageService.add({
        severity: "error",
        detail: "There is No Item Pending in this Document",
        life: 2000,
      });
    }
  }
  getAllPos(id?) {
    debugger;
    this._serviceRequestService
      .getAll("PurchaseOrder", true)
      .subscribe(({ items }) => {
        console.log(items);
        this.purchaseOrdersList = items.filter(
          (item) =>
            item.inwardGatepassStatus === "PENDING" &&
            item.status === "APPROVED"
        );
        debugger;

        if (this.purchaseOrdersList.length) {
          this.selectedPurchaseOrder = this.purchaseOrdersList.find(
            (item) => item.id == id
          );
          console.log(this.selectedPurchaseOrder);
        }
      });
  }

  getAllOutWordPass(id?) {
    debugger;
    this._serviceRequestService
      .getAll("OutwardGatepass", true)
      .subscribe(({ items }) => {
        console.log(items);
        this.purchaseOrdersList = items.filter(
          (item) =>
            item.inwardStatus === "PENDING" &&
            item.documentStatus === "APPROVED"
        );
        debugger;

        this.selectedPurchaseOrder = this.purchaseOrdersList.find(
          (item) => item.id == id
        );
      });
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  save() {
    debugger;
    this.saving = true;
    delete this.inwardGatePassDto.id;

    // if (!this.gatePassDtos.voucherNumber) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Voucher number is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.issueDate) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Date is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.employeeId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Employee Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.costCenterId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Cost Center Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.projectId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Project Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.ohJobId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Oh Job is Id Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "items are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      debugger;
      var tempObj = {
        ...this.rowData[index],
        itemId: node.data.itemId,
        remarks: node.data.remarks,
        weight: node.data.weight,
        qtyIn: node.data.qtyIn,
        refQty: node.data.refQty,
        uoMId: node.data.uoMId,
        rate: node.data.lastPurchaseRate,
        refVoucherNumber: node.data.voucherNumber + "/" + index,
      };
      if (!this.selectedPurchaseOrder.id) {
        tempObj["refDetailId"] = 0;
        tempObj["refQty"] = tempObj.qtyIn;
        tempObj["refVoucherNumber"] = "";
        this.inwardGatePassDto.employeeId = 0;
      } else {
        tempObj["refQty"] = tempObj.requestedQty;
        tempObj["refDetailId"] = tempObj.id;
        this.inwardGatePassDto.supplierId =
          this.selectedPurchaseOrder.supplierId;
        this.inwardGatePassDto.supplierName =
          this.selectedPurchaseOrder.supplierName;
        tempObj["refVoucherNumber"] = tempObj.voucherNumber;
      }
      tempObj["id"] = 0;
      // delete tempObj.id;
      tempArr.push(tempObj);
    });
    this.inwardGatePassDto.inwardGatepassDetails = tempArr;
    if (!this.selectedPurchaseOrder) {
    }
    // this.inwardGatePassDto.inwardGatepassDetails = tempArr;
    // this.gatePassDtos.isReturnable = this.gatePassDtos.isReturnable ? 'Returnable' : 'Non-Returnable'
    console.log(this.inwardGatePassDto);
    this.inwardGatePassDto.regionId = 1;
    this._serviceRequestService
      .create(this.inwardGatePassDto, this.target)
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
        itemId: node.data.itemId,
        remarks: node.data.remarks,
        weight: node.data.weight,
        qtyIn: node.data.qtyIn,
        uoMId: node.data.unitId,
        refQty: node.data.refQty,
        refDetailId: node.data.id,
        rate: node.data.lastPurchaseRate,
      };
      // tempObj['refDetailId'] = tempObj.id;
      // tempObj['refDetailId'] = tempObj.id;
      // tempObj['id'] = 0;
      // tempObj['refVoucherNumber'] = tempObj.voucherNumber;
      // tempObj['refQty'] = tempObj.refQty;
      tempArr.push(tempObj);
    });
    this.inwardGatePassDto.inwardGatepassDetails = tempArr;
    this.inwardGatePassDto.regionId = 1;
    this._serviceRequestService
      .update(this.inwardGatePassDto, this.target)
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
    this.VoucherRestriction("GIP");
  }

  getAll() {
    this._serviceRequestService
      .getAll(this.target)
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
          this.tableData = response.items; // .filter(i => i.gI_VoucherNumber?.startsWith("IR"));
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
        // this.gatePassDtos.items = this.gatePassDtos.items.map(({ qtyOut, ...rest }) => rest);
        this._serviceRequestService
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

  prepareGridData(items: any[]): any[] {
    debugger;
    return items.map((item, index) => ({
      serviceItemId: item.serviceItemId,
      batchNumber: item.batchNumber,
      mO_Number: item.mO_Number,
      requiredQty: item.requiredQty,
      shippedQty: item.shippedQty,
      returnedQty: item.returnedQty,
      remarks: item.remarks,
    }));
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.inwardGatePassDto.userLocationId = +value.id;
        this.inwardGatePassDto.userLocationName = value.name;
        this.GetDocMaxCount("InwardGatepass");
        break;
      case "Supplier":
        debugger;
        this.inwardGatePassDto.supplierId = +value.id;
        this.inwardGatePassDto.supplierName = value.name;
        this.serialNumber = value.serialNumber;
        // this.GetDocMaxCount("InwardGatepass");
        break;
      case "Employee":
        debugger;
        this.inwardGatePassDto.employeeId = +value.additional;
        this.inwardGatePassDto.employeeName = value.name;
        this.employeeErpId = value.id;
        break;
      case "Project":
        debugger;
        this.inwardGatePassDto.projectId = +value.id;
        this.inwardGatePassDto.projectName = value.name;
        break;
      case "ChartOfAccount":
        debugger;
        this.inwardGatePassDto.chartOfAccountId = +value.id.split("/")[0];
        this.inwardGatePassDto.chartOfAccountName = value.name;
        break;
      case "Department":
        debugger;
        this.inwardGatePassDto.departmentId = +value.id;
        this.inwardGatePassDto.departmentName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.inwardGatePassDto.costCenterId = +value.id;
        this.inwardGatePassDto.costCenterName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  log(value) {
    console.log(value);
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
      editable: false,
      field: "addItem",
      resizable: true,
      cellRenderer: this.addIconCellRendererFunc,
      width: 90,
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
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rate",
      editable: false,
      field: "lastPurchaseRate",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Weight",
      editable: true,
      field: "weight",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Ref QTY",
      editable: false,
      field: "refQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "QTY IN",
      editable: true,
      field: "qtyIn",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "UOM ID",
      editable: false,
      field: "uoMId",
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      editable: false,
      field: "addUom",
      resizable: true,
      cellRenderer: this.addIconCellRendererFunc,
      width: 90,
      suppressSizeToFit: true,
    },
    {
      headerName: "UOM Title",
      editable: false,
      field: "uoMName",
      resizable: true,
      suppressSizeToFit: true,
    },
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
      case "addUom":
        debugger;
        this.setParms = params;
        this.openSelectUOM();
        break;
      default:
        break;
    }
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
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

  openSelectItem() {
    debugger;
    const initialState: any = {
      target: "InventoryItem",
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

  openSelectUOM() {
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
      this.setParms.data.uoMId = +result.id;
      this.setParms.data.uoMName = result.name;
      this.gridApi.refreshCells();
    });
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  onCellValueChanged(params) {
    debugger;
    if (
      params.data.qtyIn &&
      (!params.data.refQty || isNaN(params.data.refQty))
    ) {
      params.data.refQty = params.data.qtyIn;
      this.gridApi.refreshCells();
      return;
    }
    if (params.data.qtyIn > params.data.refQty) {
      params.data.qtyIn = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        detail: "Qty In should be less than Ref Qty",
      });
      this.saving = false;
      return;
    }
    if (params.data.qtyIn < 0) {
      params.data.qtyIn = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        detail: "Qty In cannot be negative",
      });
      this.saving = false;
      return;
    }

    // params.data.totalAmount = params.data.orderedQty * params.data.rate;
    // this.gridApi.refreshCells();

    // this.recalculateServiceOrder();
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.inwardGatePassDto.issueDate = value;
    }
    if (
      this.inwardGatePassDto.userLocationId &&
      this.inwardGatePassDto.issueDate
    ) {
      this.GetDocMaxCount("InwardGatepass");
    }
  }
  getNextCount() {
    // const { issueDate, userLocationId } =
    this._serviceRequestService
      .GetDocMaxCountGI(
        this.inwardGatePassDto.userLocationId,
        this.inwardGatePassDto.issueDate
      )
      .subscribe((_) => console.log(_));
    // this._internalPartRecquService
    //     .getMaxCount(issueDate, userLocationId)
    //     .subscribe((result) => {
    //         this.docCount = result;
    //         this.MakeVoucher();
    //     });
  }
  MakeVoucher() {
    debugger;

    if (
      this.inwardGatePassDto.userLocationId &&
      this.inwardGatePassDto.issueDate
    ) {
      this.inwardGatePassDto.voucherNumber =
        "GI-HNL" +
        "-" +
        this.inwardGatePassDto.userLocationId +
        "-" +
        this.inwardGatePassDto.issueDate.getFullYear() +
        "-" +
        (this.inwardGatePassDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Select Document Date",
        life: 2000,
      });
      //this.GetDocMaxCount("InwardGatepass");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._serviceRequestService
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
          this.inwardGatePassDto.userLocationName =
            response.items[0]?.shortName;
          this.inwardGatePassDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("InwardGatepass");
        },
      });
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
        this._serviceRequestService
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

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.inwardGatePassDto.userLocationId &&
      this.inwardGatePassDto.issueDate
    ) {
      this._serviceRequestService
        .GetDocMaxCount(
          target,
          this.inwardGatePassDto.userLocationId,
          this.inwardGatePassDto.issueDate
        )
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
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._serviceRequestService.getAll(this.target, this.filterDto).subscribe({
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
