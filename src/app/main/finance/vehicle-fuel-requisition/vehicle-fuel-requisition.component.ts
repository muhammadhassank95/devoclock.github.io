import { Component, ViewChild } from "@angular/core";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GridApi } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { GridReadyEvent } from "ag-grid-community";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { ColDef } from "ag-grid-community";
import { Table } from "primeng/table";
import * as moment from "moment";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-vehicle-fuel-requisition",
  templateUrl: "./vehicle-fuel-requisition.component.html",
  styleUrl: "./vehicle-fuel-requisition.component.css",
})
export class VehicleFuelRequisitionComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  today: Date = new Date();
  MinDate: Date = new Date();
  protected gridApi: GridApi;
  protected setParms;
  tableData: any[] = [];
  rowData: any[] = [];
  tableLoading: boolean = false;
  isManageVehicleFRModalVisible: boolean = false;
  displayVehicle: boolean;
  rowCount: number;
  editMode: boolean;
  viewMode: boolean;
  currentPage = 1;
  dto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  count: number;
  vehicleData: any;
  documentStatus: string = "PENDING";
  target: string = "VehicleFuelRequisition";
  loading: boolean = false;
  vehicleFuelRequisitionFG: FormGroup;
  EmpSerialNumber: string;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

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
      headerName: "Vehicle ID",
      editable: false,
      field: "vehicleId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addVehicle",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Name",
      editable: false,
      field: "vehicleName",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Vehicle Type ID",
      editable: false,
      field: "vehicleTypeId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addVehicleTypeId",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Vehicle Type Name",
      editable: false,
      field: "vehicleTypeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Previous Reading",
      editable: false,
      field: "previousReading",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Current Reading",
      editable: true,
      field: "currentReading",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "KM",
      editable: false,
      field: "distanceInKm",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Previous Mileage",
      editable: false,
      field: "previousMileage",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Current Mileage",
      editable: false,
      field: "currentMileage",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Last Drawn Fuel Qty",
      editable: false,
      field: "lastDrawnFuelQty",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Fuel Issued Qty",
      editable: true,
      cellEditor: "agNumberCellEditor",
      field: "fuelIssuedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Fuel Type ID",
    //   editable: false,
    //   field: "fuelTypeId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Fuel Type Name",
      editable: false,
      field: "fuelTypeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Unit ID",
    //   editable: false,
    //   field: "unitId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "",
      field: "addUnitId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit Name",
      editable: false,
      field: "unitName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rate",
      editable: true,
      field: "rate",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: false,
      field: "amount",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier ID",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addSupplierId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Name",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "",
    //   field: "addFuelTypeId",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Available Budget",
      editable: false,
      field: "availableBudget",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Budget Consumed Amount",
      editable: false,
      field: "budgetConsumedAmount",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Mileage",
    //   editable: true,
    //   field: "mileage",
    //   cellEditor: "agNumberCellEditor",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Total Budget Amt",
      editable: false,
      field: "totalBudgetAmount",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Total Mileage",
    //   editable: false,
    //   field: "totalMileage",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Per KM Cost",
      editable: false,
      field: "perKmCost",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Slip Number",
      editable: true,
      field: "slipNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  constructor(
    private _financeService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private fb: FormBuilder
  ) {
    this.vehicleFuelRequisitionFG = this.fb.group({
      id: [0, Validators.required],
      employeeId: [null, Validators.required],
      employeeName: [null, Validators.required],
      projectId: [null, Validators.required],
      projectName: [null, Validators.required],
      costCenterId: [null, Validators.required],
      costCenterName: [null, Validators.required],
      vehicleVisitTypeId: [null, Validators.required],
      vehicleVisitTypeName: [null, Validators.required],
      // regionId: [null, Validators.required],
      // regionName: [null],
      issueDate: [null, Validators.required],
      userLocationId: [null, Validators.required],
      userLocationName: [null, Validators.required],
      remarks: [null, Validators.required],
      voucherNumber: [null, Validators.required],
      vehicleFuelRequisitionDetails: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadData();
    this.VoucherRestriction("VFQ");
  }

  // loadData() {
  //   this.tableLoading = true;
  //   this._financeService
  //     .getAll(this.target)
  //     .pipe(
  //       finalize(() => {
  //         this.tableLoading = false;
  //       }),
  //       catchError((error) => {
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error.error.message,
  //         });
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         this.tableData = response.items;
  //       },
  //     });
  // }

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellValueChanged(params) {
    debugger;
    let field = params.colDef.field;
    let { currentReading, previousReading, fuelIssuedQty, rate } = params.data;

    // Calculation for MileageKM
    if (field === "currentReading" || field === "previousReading") {
      if (!currentReading || currentReading <= 0) {
        this.messageService.add({
          severity: "error",
          detail: "Please enter a non-zero value for current readings",
        });
        return;
      }
      if (previousReading > currentReading) {
        this.messageService.add({
          severity: "error",
          detail: "Previous reading cannot be greater than current reading",
        });
        return;
      }
      if (previousReading !== undefined && currentReading !== undefined) {
        params.data.distanceInKm = currentReading - previousReading;
        params.data.currentMileage =
          params.data.distanceInKm + params.data.previousMileage;
      }
    }

    // Calculation for Amount
    if (field === "fuelIssuedQty" || field === "rate") {
      if (fuelIssuedQty && rate) {
        params.data.amount = fuelIssuedQty * rate;

        if (params.data.amount > params.data.availableBudget) {
          params.data.amount = 0;
          params.data.fuelIssuedQty = 0;
          params.data.rate = 0;

          this.messageService.add({
            severity: "error",
            detail: "The total amount must not exceed the available budget.",
          });
          return;
        }
      }
    }

    // Calculation for Per KM Cost after both mileage and amount are updated
    if (params.data.distanceInKm && params.data.amount) {
      params.data.perKmCost = params.data.amount / params.data.distanceInKm;
    }

    this.gridApi.refreshCells();
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onAddRow() {
    const locationSelected = this.vehicleFuelRequisitionFG.value.userLocationId;
    const projectSelected = this.vehicleFuelRequisitionFG.value.projectId;
    const costCenterSelected = this.vehicleFuelRequisitionFG.value.costCenterId;
    const BudgetDate = this.vehicleFuelRequisitionFG.value.issueDate;

    if (
      !locationSelected ||
      !projectSelected ||
      !costCenterSelected ||
      !BudgetDate
    ) {
      this.messageService.add({
        severity: "error",
        detail:
          "Please select Location, BudgetMonth, Project, and Cost Center before adding a row.",
      });
      return;
    }
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        newItem[colDef.field] = null;
      }
    });
    this.gridApi.applyTransaction({ add: [newItem] });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  save() {
    // if (this.vehicleFuelRequisitionFG.invalid) return;
    this.loading = true;
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
      });
      this.loading = false;
      return;
    }

    let vehicleFuelRequisitionDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let obj = {};
      Object.keys(node.data).forEach((key) => {
        obj[key] = node.data[key];
        obj["id"] = 0;
      });
      vehicleFuelRequisitionDetails.push(obj);
    });
    this.vehicleFuelRequisitionFG.patchValue({ vehicleFuelRequisitionDetails });
    this._financeService
      .create(this.vehicleFuelRequisitionFG.value, this.target)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(() => new Error(error.message));
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "SavedSuccessfully",
          });
          this.loadData();
          this.loading = false;
          this.isManageVehicleFRModalVisible = false;
        },
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
  }

  show(id?: number) {
    if (id) {
      this.tableLoading = true;
      this._financeService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {
            this.tableLoading = false;
          }),
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
            debugger;
            this.vehicleFuelRequisitionFG.patchValue({
              ...response,
              issueDate: new Date(response.issueDate),
              referenceDate: new Date(response.referenceDate),
            });
            console.log(this.vehicleFuelRequisitionFG.value);
            // this.documentStatus = response.status;
            this.EmpSerialNumber = response.employeeErpId;
            this.rowData = response.vehicleFuelRequisitionDetails;
            this.isManageVehicleFRModalVisible = true;
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
      debugger;
      this.vehicleFuelRequisitionFG.reset();
      this.vehicleFuelRequisitionFG.enable();
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.vehicleFuelRequisitionFG.patchValue({ id: 0, voucherNumber: null });
      this.isManageVehicleFRModalVisible = true;
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.vehicleFuelRequisitionFG.get("issueDate").setValue(this.today);
    }
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tableLoading = true;
        this._financeService
          .delete(id, this.target)
          .pipe(
            finalize(() => {
              this.tableLoading = false;
            }),
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
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
                });
                this.loadData();
              }
            },
          });
      },
    });
  }

  approve(id: number) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tableLoading = true;
        this._financeService
          .approve(id, this.target)
          .pipe(
            finalize(() => {
              this.tableLoading = false;
            }),
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
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                });
                this.loadData();
              }
            },
          });
      },
    });
  }

  setPickerValue(value: any, title: string, title2: string = "") {
    switch (title) {
      case "Location":
        this.vehicleFuelRequisitionFG.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id,
        });
        if (this.vehicleFuelRequisitionFG.value.issueDate) {
          this.MakeVoucher();
        }
        // this.MakeVoucher();
        break;
      case "VehicleVisitType":
        this.vehicleFuelRequisitionFG.patchValue({
          vehicleVisitTypeName: value.name,
          vehicleVisitTypeId: value.id,
        });
        break;
      // case "Region":
      //   this.vehicleFuelRequisitionFG.patchValue({
      //     regionId: value.id,
      //     regionName: value.name,
      //   });
      //   break;
      case "CostCenter":
        this.vehicleFuelRequisitionFG.patchValue({
          costCenterName: value.name,
          costCenterId: value.id,
        });
        break;
      case "Project":
        this.vehicleFuelRequisitionFG.patchValue({
          projectName: value.name,
          projectId: value.id,
        });
        break;
      case "Employee":
        this.vehicleFuelRequisitionFG.patchValue({
          employeeId: +value.additional,
          employeeName: value.name,
        });
        this.EmpSerialNumber = value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  update() {
    this.loading = true;
    let vehicleFuelRequisitionDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let obj = {};
      Object.keys(node.data).forEach((key) => {
        obj[key] = node.data[key];
        obj["id"] = 0;
      });
      vehicleFuelRequisitionDetails.push(obj);
    });
    this.vehicleFuelRequisitionFG.patchValue({ vehicleFuelRequisitionDetails });
    this._financeService
      .update(this.vehicleFuelRequisitionFG.value, this.target)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "UpdatedSuccessfully",
          });
          this.loadData();
          this.loading = false;
          this.isManageVehicleFRModalVisible = false;
        },
      });
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.vehicleFuelRequisitionFG.value.issueDate = value;
    }
    let { issueDate, userLocationId } = this.vehicleFuelRequisitionFG.value;
    if (userLocationId && this.vehicleFuelRequisitionFG.value.issueDate) {
      this._financeService
        .getVoucherNumber(this.target, "VFQ", issueDate, userLocationId)
        .subscribe((voucherNumber) => {
          console.log(voucherNumber);
          this.vehicleFuelRequisitionFG.patchValue({ voucherNumber });
        });
    }
  }

  cellClicked(params) {
    switch (params.column["colId"]) {
      case "addAccount":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount");
        break;
      case "addLocation":
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "addEmployee":
        this.setParms = params;
        this.openSelectItem("Employee");
        break;
      case "addCostCenter":
        this.setParms = params;
        this.openSelectItem("CostCenter");
        break;
      case "addProject":
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      case "addVehicle":
        this.setParms = params;
        // this.getVehicle();
        this.openSelectItem("ActiveVehicle");
        break;
      case "addSupplierId":
        this.setParms = params;
        this.openSelectItem("Subledger");
        break;
      case "addFuelTypeId":
        this.setParms = params;
        this.openSelectItem("FuelType");
        break;
      case "addVehicleTypeId":
        this.setParms = params;
        this.openSelectItem("VehicleType");
        break;
      case "addUnitId":
        this.setParms = params;
        this.openSelectItem("Unit");
        break;
      default:
        break;
    }
  }

  openSelectItem(
    target:
      | "ChartOfAccount"
      | "Location"
      | "Employee"
      | "CostCenter"
      | "Project"
      | "VehicleType"
      | "Unit"
      | "Subledger"
      | "FuelType"
      | "ActiveVehicle",
    filterWiseChartOfAccTarget?: string
  ) {
    var initialState: any = {
      target: target,
      locationId: this.vehicleFuelRequisitionFG.value.userLocationId,
    };
    if (target === "Subledger") {
      initialState.chartOfAccountSubLedgerType = "6,11,17";
    }
    if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountId = +result.id.split("/")[0];
        this.setParms.data.chartOfAccountName = result.name;
      } else if (target == "Location") {
        this.setParms.data.locationId = +result.id.split("/")[0];
        this.setParms.data.locationName = result.name;
      } else if (target == "Employee") {
        this.setParms.data.employeeId = +result.additional;
        this.setParms.data.employeeName = result.name;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result.id.split("/")[0];
        this.setParms.data.costCenterName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id.split("/")[0];
        this.setParms.data.projectName = result.name;
      } else if (target == "ActiveVehicle") {
        debugger;
        this.setParms.data.vehicleId = +result.id;
        this.setParms.data.vehicleName = result.name;
        this._financeService
          .getRequetDetails(
            this.target,
            +result.id,
            this.vehicleFuelRequisitionFG.value.projectId,
            this.vehicleFuelRequisitionFG.value.costCenterId,
            this.vehicleFuelRequisitionFG.value.regionId,
            this.vehicleFuelRequisitionFG.value.userLocationId,
            this.vehicleFuelRequisitionFG.value.issueDate
          )
          .subscribe((response) => {
            debugger;
            this.setParms.data.previousReading = response.previousReading;
            this.setParms.data.lastDrawnFuelQty =
              response.previousFuelIssuedQty;
            this.setParms.data.availableBudget = response.availableBudget;
            this.setParms.data.totalBudgetAmount = response.totalBudgetAmount;
            this.setParms.data.budgetConsumedAmount =
              response.budgetConsumedAmount;
            this.setParms.data.totalMileage = response.totalMileage;
            this.setParms.data.fuelTypeName = response.fuelTypeName;
            this.setParms.data.fuelTypeId = response.fuelTypeId;
            this.setParms.data.vehicleTypeName = response.vehicleTypeName;
            this.setParms.data.vehicleTypeId = response.vehicleTypeId;
            this.setParms.data.previousMileage = response.previousMileage;
          });

        // this.setParms.data.taxAccTitle = result.name;
      } else if (target == "VehicleType") {
        this.setParms.data.vehicleTypeId = result.id;
        this.setParms.data.vehicleTypeName = result.name;
        // this.setParms.data.taxAccTitle = result.name;
      } else if (target == "Subledger") {
        debugger;
        this.setParms.data.supplierId = result.id;
        this.setParms.data.supplierName = result.title;
        this.setParms.data.supplierSerialNumber = result.serialNumber;

        // this.setParms.data.taxAccTitle = result.name;
      } else if (target == "Unit") {
        this.setParms.data.unitId = result.id;
        this.setParms.data.unitName = result.name;
        // this.setParms.data.taxAccTitle = result.name;
      } else if (target == "FuelType") {
        this.setParms.data.fuelTypeId = result.id;
        this.setParms.data.fuelTypeName = result.name;
        // this.setParms.data.taxAccTitle = result.name;
      }

      this.gridApi.refreshCells();
    });
  }
  // getVehicle() {
  //   debugger;
  //   this._financeService
  //     .getAllGeneralLedger(
  //       "VehicleFuelRequisition",
  //       this.vehicleFuelRequisitionFG.value.costCenterId,
  //       this.vehicleFuelRequisitionFG.value.projectId
  //     )
  //     .pipe(
  //       finalize(() => { }),
  //       catchError((error) => {
  //         debugger;
  //         this.messageService.add({
  //           severity: "error",
  //           summary: "Error",
  //           detail: error.error.error.message,
  //           life: 2000,
  //         });
  //         return throwError(error.error.error.message);
  //       })
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         debugger;

  //         this.vehicleData = response.items;
  //       },
  //     });
  //   this.displayVehicle = true;
  //   return;
  // }

  selectVehicle() {
    debugger;
    this._financeService
      .getAllGeneralLedger(
        "VehicleFuelRequisition",
        this.vehicleFuelRequisitionFG.value.costCenterId,
        this.vehicleFuelRequisitionFG.value.projectId
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

          this.vehicleData = response.items;
        },
      });
    this.displayVehicle = true;
    return;
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this._financeService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      },
    });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;

    this._financeService.getAll(this.target, this.dto).subscribe({
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
  edit(id: any) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.vehicleFuelRequisitionFG.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.vehicleFuelRequisitionFG.disable();
    this.MinDate = null;
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._financeService
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
          this.vehicleFuelRequisitionFG
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.vehicleFuelRequisitionFG
            .get("userLocationId")
            .setValue(response.items[0].id);
          if (this.vehicleFuelRequisitionFG.value.issueDate) {
            this.MakeVoucher();
          }
        },
      });
  }
}
