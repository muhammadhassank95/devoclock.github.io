import { Table } from "primeng/table";
import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AnnualBudgetDto } from "@app/main/budget/shared/Dtos/annual-budget-dto";
import { AnnualBudgetService } from "@app/main/budget/shared/services/annual-budget.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { ChartOfAccountPickerComponent } from "@shared/components/chart-of-account-picker/chart-of-account-picker.component";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { RestrictionDto } from "../shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { RestrictionService } from "../shared/services/restriction.service";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";
import { MonthlyBudgetRestrictionDto } from "../shared/Dtos/monthly-budget-restriction-dto";
@Component({
  selector: "app-annual-budget",
  templateUrl: "./annual-budget.component.html",
})

export class AnnualBudgetComponent extends AppComponentBase implements OnInit {
  restrictionDto: RestrictionDto = new RestrictionDto();
  monthlyBudgetRestrictionDto: MonthlyBudgetRestrictionDto =
    new MonthlyBudgetRestrictionDto();
  today: Date = new Date();
  MinDate: Date = new Date();
  constructor(
    injector: Injector,
    private _annualBudgetService: AnnualBudgetService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    super(injector);
  }
  permissions: PermissionsDto;
  annualBudgetDto: AnnualBudgetDto = new AnnualBudgetDto();
  dialogVisibility: boolean;
  saving: boolean;
  editMode: boolean;
  reviseMode: boolean = false;
  target: string;
  suggestionModalRef: BsModalRef;
  // @ViewChild('SuggestionLookupTableModalComponent') SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @ViewChild("chartOfAccountPicker")
  chartOfAccountPicker: ChartOfAccountPickerComponent;
  rowData: any;
  rowCount: number;
  tableData: any;
  tableCount: any;
  rowSelection: string;
  loading: boolean;
  skipCount: number = 0;
  maxCount: number = 10;
  currentPage: number = 1;
  gridApi: any;
  setParms: any;
  selectedRowNode: any;
  financialStartDate: Date;
  restrictionDate: Date;
  docYear: any;
  docMonth: any;
  docDay: any;

  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  // restrictionDate: Date = new Date('2024-01-01'); // Example restriction date
  // today: Date = new Date();
  adjustedMinDate!: Date;
  adjustedMaxDate!: Date;

  monthlyModal: boolean;
  yearId: number;
  vehicleData: any[] = [];
  displayVehicles: boolean;
  financialYearDropdown: any[] = [];
  financialYearSelectedItem: any;
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  projectDropdown: any[] = [];
  projectSelectedItem: any;
  costCenterDropdown: any[] = [];
  costCenterSelectedItem: any;
  regionDropdown: any[] = [];
  regionSelectedItem: any;

  months = [
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
  ];
  selectedMonths = [];

  monthMapping = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 100,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },

    {
      headerName: "ID",
      editable: false,
      field: "chartOfAccountId",
      resizable: true,
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: "COA Id",
      editable: false,
      field: "coaSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addChartAccount",
      width: 50,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "chartOfAccountName",
      width: 400,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Type",
      editable: false,
      field: "accountTypeShortName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Income",
      editable: true,
      field: "incomeAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Expense",
      editable: true,
      field: "expenseAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rental Id",
      field: "vehicleId",
      editable: false,
    },
    {
      headerName: "",
      field: "addVehicle",
      width: 50,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  colDefsForEdit: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 100,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },

    {
      headerName: "ID",
      editable: false,
      field: "chartOfAccountId",
      width: 100,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addChartAccount",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "chartOfAccountName",
      width: 400,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Type",
      editable: false,
      field: "accountTypeShortName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Income",
      editable: false,
      field: "income",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Expense",
      editable: false,
      field: "expense",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Annual Budget (Inc)",
      editable: false,
      type: "numericColumn",
      field: "incomeAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Annual Budget (Exp)",
      editable: false,
      type: "numericColumn",
      field: "expenseAmount",
      suppressSizeToFit: true,
    },
    {
      headerName: "Income Taken For Monthly",
      editable: false,
      type: "numericColumn",
      field: "incomeTakenFor",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Expenses Taken For Monthly",
      editable: false,
      type: "numericColumn",
      field: "expenseTakenFor",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remaining Income",
      editable: false,
      type: "numericColumn",
      field: "remainingIncomeAmount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remaining Expenses",
      editable: false,
      type: "numericColumn",
      field: "remainingExpenseAmount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Revised Expense",
      editable: true,
      type: "numericColumn",
      field: "revisedExpenseAmount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Revised Expenses Budget",
      editable: false,
      type: "numericColumn",
      field: "totalRevisedExpense",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Revised Income",
      editable: true,
      type: "numericColumn",
      field: "revisedIncomeAmount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Revised Income Budget",
      editable: false,
      type: "numericColumn",
      field: "totalRevisedIncome",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rental Id",
      field: "vehicleId",
      editable: false,
    },
    {
      headerName: "Title",
      editable: false,
      field: "vehicleName",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  ngOnInit() {
    this.permissions = new PermissionsDto("YearlyBudget");
    this.getAll();
    this.VoucherRestriction("ANB");
    this.fetchDropdownData('FinancialYear').subscribe((items) => (this.financialYearDropdown = items));
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.projectDropdown = items));
    this.fetchDropdownData('CostCenter').subscribe((items) => (this.costCenterDropdown = items));
    this.fetchDropdownData('Region').subscribe((items) => (this.regionDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
    return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
      map((response: any) => {
        if (response && response.items) {
          return response.items.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        } else {
          console.error(`Invalid response format for ${target}: `, response);
          return [];
        }
      })
    );
    this.VoucherRestrictionForMonthlyBudget("MB");
  }

  // VoucherRestriction() {
  //   debugger;
  //   this._annualBudgetService
  //     .VoucherRestriction({ VoucherPrefix: "ANB" })
  //     .pipe(
  //       finalize(() => {}),
  //       catchError((error) => {
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
  //         if (response.totalCount) {
  //           debugger;
  //           if (response.items[response.totalCount - 1].isActive) {
  //             this.restrictionDate = new Date(
  //               response.items[response.totalCount - 1].restrictionDate
  //             );
  //           } else {
  //             this.restrictionDate = null;
  //           }
  //           this.updateDateRestrictions();
  //         }
  //       },
  //     });
  // }
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
  VoucherRestrictionForMonthlyBudget(prefix: string) {
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
          this.monthlyBudgetRestrictionDto = mapRestrictionDto(
            response.items[0]
          );
          console.log(this.restrictionDto);
        },
      });
  }
  getMonthNames(monthNumbers: string[]): string[] {
    return monthNumbers.map((month) => this.monthMapping[month]);
  }

  openModal(id?: number, revise?: boolean) {
    if (id && revise) {
      debugger;
      if (!this.restrictionDto.isRevisionAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Revision Restricted",
        });
        return;
      }
      this.reviseMode = true;
      this.editMode = false;
      this.MinDate = null;
      this.GetForEdit(id);
    } else if (id) {
      debugger;
      if (!this.restrictionDto.isEditAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Edit Restricted",
        });
        return;
      }
      this.reviseMode = false;
      this.editMode = true;
      this.MinDate = this.restrictionDto.editRestrictionDate;
      this.GetForEdit(id);
    } else {
      debugger;
      if (!this.restrictionDto.isCreationAllowed) {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Creation Restricted",
        });
        return;
      }
      this.annualBudgetDto = new AnnualBudgetDto();
      this.annualBudgetDto.documentDate = this.today;
      this.docYear = this.today.getFullYear();
      this.docMonth = this.today.getMonth() + 1;
      this.docDay = this.today.getDate();
      this.getMaxBudgetId();
      this.rowData = [];
      this.rowCount = 0;
      this.totalAmount = null;
      this.totalExpense = null;
      this.totalIncome = null;
      this.selectedMonths = [];
      this.dialogVisibility = true;
      this.reviseMode = false;
      this.editMode = false;
      let financialYearStart;
      // this.updateDateRestrictions();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      if (this.today.getMonth() < 6) {
        financialYearStart = new Date(this.today.getFullYear() - 1, 6, 1);
      } else {
        financialYearStart = new Date(this.today.getFullYear(), 6, 1);
      }
      debugger;
      this.financialStartDate = financialYearStart;
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "FinancialYear":
        this.annualBudgetDto.financialYearId = value.id;
        this.annualBudgetDto.financialYearName = value.name;
        this.createOrUpdateDocNumber();
        break;
      case "CostCenter":
        this.annualBudgetDto.costCenterId = value.id;
        this.annualBudgetDto.costCenterName = value.name;
        break;
      case "Location":
        debugger;
        this.annualBudgetDto.locationId = value.id;
        // this.annualBudgetDto.locationName = value.name;
        this.annualBudgetDto.locationName = value.additional;
        this.createOrUpdateDocNumber();
        break;
      case "Project":
        this.annualBudgetDto.projectId = value.id;
        this.annualBudgetDto.projectName = value.name;
        break;
      // case "Region":
      //   this.annualBudgetDto.regionId = value.id;
      //   this.annualBudgetDto.regionName = value.name;
      //   break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  onAddRow() {
    if (!this.annualBudgetDto.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center Id is Required",
        life: 2000,
      });
      return;
    }
    if (!this.annualBudgetDto.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project Id is Required",
        life: 2000,
      });
      return;
    }
    if (!this.annualBudgetDto.locationId) {
      this.messageService.add({
        severity: "error",
        detail: "Location Id is Required",
        life: 2000,
      });
      return;
    }
    var newItem = {
      chartOfAccountId: 0,
      chartOfAccountName: "",
      incomeAmount: 0,
      expenseAmount: 0,
      income: 0,
      expense: 0,
      incomeTakenFor: 0,
      expenseTakenFor: 0,
      remainingIncomeAmount: 0,
      remainingExpenseAmount: 0,
      revisedExpenseAmount: 0,
      totalRevisedExpense: 0,
      totalRevisedExpense2: 0,
      revisedIncomeAmount: 0,
      totalRevisedIncome: 0,
      totalRevisedIncome2: 0,
    };
    // this.colDefs.forEach(colDef => {
    //     newItem[colDef.field] = "";
    // });
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
    switch (params.column["colId"]) {
      case "addChartAccount":
        this.setParms = params;
        this.openSelectChartAcount();
        break;
      case "addVehicle":
        this.setParms = params;
        const chartOfAccountTitle = params.data.chartOfAccountName || "";
        if (chartOfAccountTitle.toLowerCase().includes("vehicle")) {
          this.getAvailableVehicles();
          this.selectedRowNode = params.node;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "You cannot choose a vehicle for this chart of account.",
            life: 2000,
          });
        }
        break;
      default:
        // debugger;
        this.updateColumnDefinition(params.data.accountTypeShortName);
        break;
    }
  }

  openSelectChartAcount() {
    debugger;
    this.target = "ChartOfAccount";
    const initialState: any = {
      title: this.target,
    };

    // this._chartOfAccountPickerComponent.openPicker();
    // return
    // this.suggestionModalRef = this.suggestionService.show(SuggestionLookupTableModalComponent, { initialState });
    this.suggestionModalRef = this.suggestionService.show(
      ChartOfAccountPickerComponent,
      { initialState }
    );

    this.suggestionModalRef.content.getEmitter.subscribe((result) => {
      debugger;
      this.setParms.data.chartOfAccountId = +result.id;
      this.setParms.data.chartOfAccountName = result.name;
      this.setParms.data.accountTypeShortName = result.accountTypeShortName;
      this.setParms.data.coaSerialNumber = result.serialNumber;
      if (!result.name.toLowerCase().includes("vehicle")) {
        this.setParms.data.vehicleId = null;
        this.setParms.data.vehicleName = null;
      }
      this.updateColumnDefinition(result.accountTypeShortName);
      // this.setParms.colDef.editable =
      this.gridApi.refreshCells();
      this.suggestionModalRef.hide();
    });
    // this.chartOfAccountPicker.title = "ChartOfAccount";
  }

  onCellValueChanged(params) {
    debugger;
    this.setParms = params;
    const { incomeAmount, expenseAmount, accountTypeShortName } = params.data;

    if (incomeAmount < 0) {
      params.data.incomeAmount = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Income Value cannot be negative.",
        life: 2000,
      });
      return;
    }

    if (expenseAmount < 0) {
      params.data.expenseAmount = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Expense Value cannot be negative.",
        life: 2000,
      });
      return;
    }
    if (accountTypeShortName === "IN") {
    }

    this.gridApi.refreshCells();
    this.Calculations();
  }

  Calculations() {
    debugger;
    if (this.reviseMode) {
      var totalExpense = 0;
      var totalIncome = 0;

      this.gridApi.forEachNode((node) => {
        debugger;
        if (node.data.accountTypeShortName === "IN") {
          node.data.totalRevisedIncome =
            +node.data.revisedIncomeAmount + +node.data.totalRevisedIncome2;
          totalIncome += +node.data.totalRevisedIncome;
          node.setDataValue("revisedExpenseAmount", 0);
        } else {
          node.data.totalRevisedExpense =
            +node.data.revisedExpenseAmount + +node.data.totalRevisedExpense2;
          totalExpense += +node.data.totalRevisedExpense;
          node.setDataValue("revisedIncomeAmount", 0);
        }
      });
      this.gridApi.refreshCells();
      this.totalExpense = totalExpense;
      this.totalIncome = totalIncome;
      this.totalAmount = this.totalIncome - this.totalExpense;
    } else {
      var totalExpense = 0;
      var totalIncome = 0;

      this.gridApi.forEachNode((node) => {
        debugger;
        if (node.data.accountTypeShortName === "IN") {
          // i want to set  node.data.expenseAmount = 0 in the grid view how can i set it either user enter any value
          node.setDataValue("expenseAmount", 0);
          totalIncome += +node.data.incomeAmount;
        } else {
          node.setDataValue("incomeAmount", 0);
          totalExpense += +node.data.expenseAmount;
        }
        //totalExpense += +node.data.expenseAmount;
      });
      this.totalExpense = totalExpense;
      this.totalIncome = totalIncome;
      this.totalAmount = this.totalIncome - this.totalExpense;
    }
  }

  EditCalculations() {
    debugger;
    var totalExpense = 0;
    var totalIncome = 0;

    this.rowData.forEach((node) => {
      debugger;
      totalExpense += +node.expense;
      totalIncome += +node.income;
    });
    this.totalExpense = totalExpense;
    this.totalIncome = totalIncome;
    this.totalAmount = this.totalIncome - this.totalExpense;
  }

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: #019999;margin-left: -9px;cursor: pointer;" ></i>';
  }

  getAll() {
    debugger;
    this._annualBudgetService
      .getAll(this.skipCount, this.maxCount)
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
          this.tableCount = response.totalCount;
        },
      });
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.annualBudgetDto.financialYearId) {
      this.messageService.add({
        severity: "error",
        detail: "Financial Year is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.annualBudgetDto.documentDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.annualBudgetDto.title) {
      this.messageService.add({
        severity: "error",
        detail: "Narration is Required",
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
    if (!this.selectedMonths.length) {
      this.messageService.add({
        severity: "error",
        detail: "Select Budget Months",
        life: 2000,
      });
      this.saving = false;
      return;
    } else {
      this.annualBudgetDto.months = this.selectedMonths;
    }

    var lineHaveIssue = 0;
    this.gridApi.forEachNode((node) => {
      debugger;
      if (
        node.data.chartOfAccountId == null ||
        node.data.chartOfAccountId == ""
      ) {
        this.messageService.add({
          severity: "error",
          detail: "Account Id missing in row " + Number(node.rowIndex + 1),
          life: 2000,
        });
        lineHaveIssue++;
        this.saving = false;
        return;
      } else if (
        node.data.expenseAmount == "" &&
        node.data.incomeAmount == "" &&
        this.reviseMode == false
      ) {
        this.messageService.add({
          severity: "error",
          detail: "Amount not found at row " + Number(node.rowIndex + 1),
          life: 2000,
        });
        lineHaveIssue++;
        this.saving = false;
        return;
      }
    });

    if (!this.reviseMode) {
      var tempArr = [];
      this.gridApi.forEachNode((node) => {
        var tempObj = {
          chartOfAccountId: node.data.chartOfAccountId,
          expenseAmount: node.data.expenseAmount,
          incomeAmount: node.data.incomeAmount,
        };
        tempArr.push(tempObj);
      });
      this.annualBudgetDto.budgetDetails = tempArr;
    } else {
      console.log(this.rowData);
      var prevArr = [];
      var newArr = [];
      this.gridApi.forEachNode((node) => {
        debugger;
        if (node.data.id) {
          var tempObj = {
            budgetDetailId: node.data.id,
            reviseExpenseAmount: node.data.revisedExpenseAmount,
            reviseIncomeAmount: node.data.revisedIncomeAmount,
          };
          prevArr.push(tempObj);
        } else {
          var tempObj2 = {
            chartOfAccountId: node.data.chartOfAccountId,
            // expenseAmount: node.data.,
            // incomeAmount: node.data.,
            reviseIncomeAmount: node.data.revisedIncomeAmount,
            reviseExpenseAmount: node.data.revisedExpenseAmount,
          };
          newArr.push(tempObj2);
        }
      });
    }

    if (!lineHaveIssue) {
      var beforeSavingMessage =
        this.totalAmount < 0
          ? '"Loss Showing in Budget", Please Review'
          : "Are you sure?";
      if (this.editMode) {
        this.confirmationService.confirm({
          message: beforeSavingMessage,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this._annualBudgetService
              .update(this.annualBudgetDto)
              .pipe(
                finalize(() => {
                  this.saving = false;
                }),
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
                  if (response) {
                    this.messageService.add({
                      severity: "info",
                      summary: "Confirmed",
                      detail: "Updated Successfully",
                      life: 2000,
                    });
                    this.getAll();
                    this.dialogVisibility = false;
                    this.saving = false;
                  }
                },
              });
          },
          reject: () => (this.saving = false),
        });
      } else if (this.reviseMode) {
        console.log(this.annualBudgetDto, newArr, prevArr);
        this.confirmationService.confirm({
          message: beforeSavingMessage,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this._annualBudgetService
              .revise(this.annualBudgetDto, newArr, prevArr)
              .pipe(
                finalize(() => {
                  this.saving = false;
                }),
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
                  if (response) {
                    this.messageService.add({
                      severity: "info",
                      summary: "Confirmed",
                      detail: "Revised Successfully",
                      life: 2000,
                    });
                    this.getAll();
                    this.dialogVisibility = false;
                    this.saving = false;
                  }
                },
              });
          },
          reject: () => (this.saving = false),
        });
      } else {
        this.confirmationService.confirm({
          message: beforeSavingMessage,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          rejectButtonStyleClass: "p-button-text",
          accept: () => {
            this._annualBudgetService
              .create(this.annualBudgetDto)
              .pipe(
                finalize(() => {
                  this.saving = false;
                }),
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
                  if (response) {
                    this.messageService.add({
                      severity: "info",
                      summary: "Confirmed",
                      detail: "Created Successfully",
                      life: 2000,
                    });
                    this.getAll();
                    this.dialogVisibility = false;
                    this.saving = false;
                  }
                },
              });
          },
          reject: () => (this.saving = false),
        });
      }
    } else {
    }
  }

  DocumentDateChange(value) {
    debugger;
    this.annualBudgetDto.documentDate = value;
    this.docYear = value.getFullYear();
    this.docMonth = value.getMonth() + 1;
    this.docDay = value.getDate();
    this.getMaxBudgetId();
  }

  getMaxBudgetId() {
    debugger;
    this._annualBudgetService
      .getMaxId(this.docYear)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe((result) => {
        debugger;
        this.annualBudgetDto.budgetId = result;
        this.createOrUpdateDocNumber();
      });
  }
  createOrUpdateDocNumber() {
    debugger;
    this.annualBudgetDto.documentNumber = (
      "ANB-" +
      "HNL-" +
      (this.annualBudgetDto.locationId ?? "") +
      "-" +
      (this.docDay ?? "") +
      "-" +
      (this.docMonth ?? "") +
      "-" +
      (this.docYear ?? "") +
      "-" +
      (this.annualBudgetDto.budgetId ?? "")
    ).toString();
  }
  Approve(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._annualBudgetService
          .approve(id)
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
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Posted Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }
  // updateDateRestrictions() {
  //   debugger;
  //   if (this.reviseMode) {
  //     this.adjustedMinDate = null;
  //     this.adjustedMaxDate = null;
  //   } else if (this.editMode && !this.reviseMode) {
  //     this.adjustedMinDate = this.restrictionDate; // No restriction on the past
  //     this.adjustedMaxDate = this.today; // Restrict to today's date
  //   } else {
  //     // Restrict to restrictionDate up to today
  //     this.adjustedMinDate = this.restrictionDate;
  //     this.adjustedMaxDate = this.today;
  //   }
  // }
  GetForEdit(id: number) {
    debugger;
    this._annualBudgetService
      .getDataForEdit(id)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
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
          console.log(response);
          debugger;
          this.annualBudgetDto = response;
          // var dateParts = response.documentNumber.split("-");
          this.annualBudgetDto.documentDate = new Date(response.documentDate);

          // dateParts[4],
          // dateParts[3] - 1,
          // dateParts[2]
          this.annualBudgetDto.budgetId = response.id;
          this.selectedMonths = response.months;
          this.dialogVisibility = true;
          this.rowData = response.budgetDetails;
          if (this.reviseMode) {
            var tempArr = [];
            response.budgetDetails.map((item) => {
              debugger;
              var tempObj = {
                id: item.id,
                chartOfAccountId: item.chartOfAccountId,
                chartOfAccountName: item.chartOfAccountName,
                accountTypeShortName: item.accountTypeShortName,
                incomeAmount: item.incomeAmount,
                expenseAmount: item.expenseAmount,
                income: item.income,
                expense: item.expense,
                incomeTakenFor: item.incomeTakenFor,
                expenseTakenFor: item.expenseTakenFor,
                remainingIncomeAmount: item.remainingIncomeAmount,
                remainingExpenseAmount: item.remainingExpenseAmount,
                revisedExpenseAmount: 0,
                totalRevisedExpense: item.totalRevisedExpense,
                revisedIncomeAmount: 0,
                totalRevisedIncome: item.totalRevisedIncome,
                totalRevisedExpense2: item.totalRevisedExpense,
                totalRevisedIncome2: item.totalRevisedIncome,
              };
              tempArr.push(tempObj);
            });
            this.rowData = tempArr;
          }
          this.EditCalculations();
        },
      });
  }

  OpenMonthly(id: number) {
    if (!this.monthlyBudgetRestrictionDto.isCreationAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Creation Restricted",
      });
      return;
    }
    this.monthlyModal = true;
    this.yearId = id;
  }
  closeDiloge(): void {
    debugger;
    this.monthlyModal = false;
  }
  updateColumnDefinition(accountType: string) {
    // Find the row that was changed
    const rowIndex = this.setParms.node.rowIndex;

    // Update the column definitions to disable the 'Income' column for this row
    this.colDefs = this.colDefs.map((colDef) => {
      if (accountType === "IN") {
        if (colDef.field === "expenseAmount") {
          colDef.editable = false;
        } else if (colDef.field === "incomeAmount") {
          colDef.editable = true;
        }
      } else {
        if (colDef.field === "expenseAmount") {
          colDef.editable = true;
        } else if (colDef.field === "incomeAmount") {
          colDef.editable = false;
        }
      }
      return colDef;
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    debugger;
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  getAvailableVehicles() {
    debugger;
    if (!this.annualBudgetDto.financialYearId) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select financial year id",
        life: 2000,
      });
      return;
    }
    this.displayVehicles = true;
    this._annualBudgetService
      .getAllAvailableVehicles(
        "RentalContract",
        this.annualBudgetDto.financialYearId,
        this.annualBudgetDto.locationId
      )
      .subscribe((response) => {
        this.vehicleData = response.items;
      });
  }
  selectVehicle(id: number) {
    const selectedVehicle = this.vehicleData.find(
      (vehicle) => vehicle.contractReferenceId === id
    );
    if (selectedVehicle && this.selectedRowNode) {
      this.selectedRowNode.data.vehicleId = selectedVehicle.contractReferenceId;
      this.selectedRowNode.data.vehicleName =
        selectedVehicle.contractReferenceName;
      this.selectedRowNode.data.expenseAmount = selectedVehicle.rate;
      this.gridApi.refreshCells({
        rowNodes: [this.selectedRowNode],
        columns: ["vehicleId", "vehicleName", "expenseAmount"],
      });
      this.displayVehicles = false;
      this.selectedRowNode = null;
    } else {
      console.log("Vehicle not found for ID:", id);
    }
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._annualBudgetService.getAll(this.skipCount, this.maxCount).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.tableCount = response.totalCount;

        this.loading = false;
      },
    });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._annualBudgetService
      .getAll(this.skipCount, this.maxCount, inputValue)
      .subscribe({
        next: (response) => {
          debugger;

          this.tableData = response.items;
          this.tableCount = response.totalCount;

          this.loading = false;
        },
      });
  }
}
