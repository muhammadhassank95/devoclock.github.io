import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  input,
} from "@angular/core";
import { MonthlyBudgetDto } from "../shared/Dtos/monthly-budget-dto";
import { MonthlyReviseBudgetDto } from "../shared/Dtos/monthly-budget-dto";

import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { MonthlyBudgetService } from "../shared/services/monthly-budget.service";
import { AnnualBudgetService } from "../shared/services/annual-budget.service";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-add-or-revise-monthly-budget",
  templateUrl: "./add-or-revise-monthly-budget.component.html",
})
export class AddOrReviseMonthlyBudgetComponent {
  monthlyBudgetDto: MonthlyBudgetDto = new MonthlyBudgetDto();
  monthlyReviseBudgetDto: MonthlyReviseBudgetDto = new MonthlyReviseBudgetDto();
  @Output() closeDiloge: EventEmitter<any> = new EventEmitter<any>();
  saving: boolean;
  editMode: boolean;
  reviseMode: boolean;
  target: string;
  rowData: any;
  rowCount: number;
  data: any;
  rowSelection: string;
  gridApi: any;
  setParms: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;

  @Input() YearlyBudgetId?: number;
  @Input() MonthlyBudgetId?: number;
  @Input() isRevised: boolean = false;
  today = new Date();
  financialStartDate: Date;
  docYear: any;
  docMonth: any;
  docDay: any;
  mbedit: boolean = false;
  financialYearDropdown: any[] = [];
  financialYearSelectedItem: any;
  costCenterDropdown: any[] = [];
  costCenterSelectedItem: any;
  projectDropdown: any[] = [];
  projectSelectedItem: any;
  locationDropdown: any[] = [];
  locationSelectedItem: any;

  constructor(
    private _monthlyBudgetService: MonthlyBudgetService,
    private _annualBudgetService: AnnualBudgetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {}

  ngOnInit(): void {
    this.fetchDropdownData('FinancialYear').subscribe((items) => (this.financialYearDropdown = items));
    this.fetchDropdownData('CostCenter').subscribe((items) => (this.costCenterDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.projectDropdown = items));
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
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
  }

  ngOnChanges() {
    debugger;

    if (this.isRevised) {
      this.GetForEdit(this.MonthlyBudgetId, true, "Revise");
    } else {
      if (this.YearlyBudgetId) {
        this.mbedit = false;
        this.monthlyBudgetDto.documentDate = this.today;
        this.GetForEdit(this.YearlyBudgetId, false, "Create");
      } else if (this.MonthlyBudgetId) {
        this.mbedit = true;
        this.GetForEdit(this.MonthlyBudgetId, true, "Edit");
      }
    }
    let financialYearStart;
    if (this.today.getMonth() < 6) {
      financialYearStart = new Date(this.today.getFullYear() - 1, 6, 1);
    } else {
      financialYearStart = new Date(this.today.getFullYear(), 6, 1);
    }
    this.financialStartDate = financialYearStart;
  }

  onDropdownChange(event: any, type: string){
    const value = event.value;
    switch (type) {
      case "FinancialYear":
        this.monthlyBudgetDto.financialYearId = value.id;
        this.monthlyBudgetDto.financialYearName = value.name;
        break;
      case "CostCenter":
        this.monthlyBudgetDto.costCenterId = value.id;
        this.monthlyBudgetDto.costCenterName = value.name;
        break;
      case "Location":
        this.monthlyBudgetDto.locationId = value.id;
        // this.monthlyBudgetDto.locationName = value.name;
        this.monthlyBudgetDto.locationName = value.additional;
        break;
      case "Project":
        this.monthlyBudgetDto.projectId = value.id;
        this.monthlyBudgetDto.projectName = value.name;
        break;
      default:
        alert(`${type} is not defined`);
    }
  }

  colDefs: ColDef[] = [
    {
      headerName: "ID",
      editable: false,
      field: "chartOfAccountId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "COA Number",
      editable: false,
      field: "coaSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "chartOfAccountName",
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
      headerName: "Monthly Expense",
      editable: true,
      field: "monthlyExpense",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Monthly Income",
      editable: true,
      field: "monthlyIncome",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Id",
      editable: true,
      field: "vehicleId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Title",
      editable: true,
      field: "vehicleName",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  reviseColDefs: ColDef[] = [
    {
      headerName: "ID",
      editable: false,
      field: "chartOfAccountId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "COA Number",
      editable: false,
      field: "coaSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "chartOfAccountName",
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
    // {
    //   headerName: "Monthly Revised Expense",
    //   editable: true,
    //   field: "monthlyTotalRevisedExpense",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Monthly Revised Income",
    //   editable: true,
    //   field: "monthlyTotalRevisedIncome",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },

    {
      headerName: "Revised Expense",
      editable: true,
      field: "revisedExpenseAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Revised Income",
      editable: true,
      field: "revisedIncomeAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  GetForEdit(id: number, isMonthly: boolean, dataFor: string) {
    debugger;
    if (!id) {
      return;
    }
    if (isMonthly) {
      this.editMode = true;
      this._monthlyBudgetService
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
            this.monthlyBudgetDto = response;
            this.monthlyBudgetDto.budgetId = response.id;
            this.monthlyBudgetDto.id = response.id;
            this.monthlyBudgetDto.narration = response.title;
            this.monthlyBudgetDto.months = this.FormatMonths(
              response.yearlyBudgetMonths
            );
            this.monthlyBudgetDto.month = response.monthlyBudgetMonth;
            // var dateParts = response.documentNumber.split("-");

            // this.monthlyBudgetDto.documentDate = new Date(
            //   dateParts[5],
            //   dateParts[4] - 1,
            //   dateParts[3]
            // );

            if (dataFor === "Edit") {
              response.details.map((item) => {
                item.remainingIncomeAmount =
                  item.remainingIncomeAmount + item.monthlyIncome;
                item.remainingExpenseAmount =
                  item.remainingExpenseAmount + item.monthlyExpense;
              });
              this.rowData = response.details;
              this.gridApi.setRowData(this.rowData);
            } else {
              this.rowData = response.details;
              this.gridApi.setRowData(this.rowData);
            }

            if (this.isRevised) {
              debugger;
              this.monthlyReviseBudgetDto.id = response.id =
                this.gridApi.addEventListener("firstDataRendered", () => {
                  this.CalculationsForRevise();
                });
            } else {
              debugger;
              this.gridApi.addEventListener("firstDataRendered", () => {
                this.Calculations();
              });
            }
          },
        });
    } else {
      debugger;
      this.editMode = false;
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
            this.monthlyBudgetDto = response;
            this.monthlyBudgetDto.documentDate = this.today;
            this.monthlyBudgetDto.months = this.FormatMonths(response.months);
            this.rowData = response.budgetDetails;
            // this.monthlyBudgetDto.documentNumber = "";
            this.monthlyBudgetDto.yearlyBudgetId = response.id;
          },
        });
    }
  }

  FormatMonths(arr: string[]): { id: string; name: string }[] {
    const monthNames = {
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

    return arr.map((monthNumber) => ({
      id: monthNumber,
      name: monthNames[monthNumber] || "Unknown",
    }));
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "FinancialYear":
        this.monthlyBudgetDto.financialYearId = value.id;
        this.monthlyBudgetDto.financialYearName = value.name;
        break;
      case "CostCenter":
        this.monthlyBudgetDto.costCenterId = value.id;
        this.monthlyBudgetDto.costCenterName = value.name;
        break;
      // case "Region":
      //   this.monthlyBudgetDto.regionId = value.id;
      //   this.monthlyBudgetDto.regionName = value.name;
      //   break;
      case "Location":
        this.monthlyBudgetDto.locationId = value.id;
        // this.monthlyBudgetDto.locationName = value.name;
        this.monthlyBudgetDto.locationName = value.additional;
        break;
      case "Project":
        this.monthlyBudgetDto.projectId = value.id;
        this.monthlyBudgetDto.projectName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  onCellValueChanged(params) {
    this.setParms = params;

    if (this.isRevised) {
      this.CalculationsForRevise();
    } else {
      this.Calculations();
    }
  }

  Calculations() {
    var totalExpense = 0;
    var totalIncome = 0;
    debugger;
    this.gridApi.forEachNode((node) => {
      debugger;

      if (node.data.monthlyExpense > node.data.remainingExpenseAmount) {
        node.data.monthlyExpense = 0;
        this.messageService.add({
          severity: "error",
          detail: "Expense must be less than Remaining",
          life: 2000,
        });
        this.gridApi.refreshCells();
        return;
      }
      if (node.data.monthlyIncome > node.data.remainingIncomeAmount) {
        node.data.monthlyIncome = 0;
        this.messageService.add({
          severity: "error",
          detail: "Income must be less than Remaining",
          life: 2000,
        });
        this.gridApi.refreshCells();
        return;
      }

      totalExpense += parseFloat(node.data.monthlyExpense) | 0;
      totalIncome += parseFloat(node.data.monthlyIncome) | 0;
      this.totalExpense = totalExpense;
      this.totalIncome = totalIncome;
    });
    this.totalAmount = this.totalIncome - this.totalExpense;
  }

  CalculationsForRevise() {
    var totalExpense = 0;
    var totalIncome = 0;
    debugger;
    this.gridApi.forEachNode((node) => {
      debugger;

      if (node.data.revisedExpenseAmount > node.data.remainingExpenseAmount) {
        node.data.revisedExpenseAmount = 0;
        this.messageService.add({
          severity: "error",
          detail: "Expense must be less than Remaining",
          life: 2000,
        });
        this.gridApi.refreshCells();
        return;
      }
      if (node.data.revisedIncomeAmount > node.data.remainingIncomeAmount) {
        node.data.revisedIncomeAmount = 0;
        this.messageService.add({
          severity: "error",
          detail: "Income must be less than Remaining",
          life: 2000,
        });
        this.gridApi.refreshCells();
        return;
      }

      totalExpense += parseFloat(node.data.revisedExpenseAmount) | 0;
      totalIncome += parseFloat(node.data.revisedIncomeAmount) | 0;
      this.totalExpense = totalExpense;
      this.totalIncome = totalIncome;
    });
    this.totalAmount = this.totalIncome - this.totalExpense;
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.monthlyBudgetDto.month) {
      this.messageService.add({
        severity: "error",
        detail: "Select Budget Month",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.monthlyBudgetDto.documentDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.monthlyBudgetDto.narration) {
      this.messageService.add({
        severity: "error",
        detail: "Narration is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (this.isRevised) {
      this.ReviseMonthlyBudget();
    } else {
      this.CreateOrUpdateMonthlyBudget();
    }
  }

  CreateOrUpdateMonthlyBudget() {
    if (this.mbedit) {
      console.log(this.rowData);
      debugger;
      this.monthlyBudgetDto.budgetDetails = [];
      this.rowData.map((item) => {
        debugger;
        let UpdateDto = {
          monthlyExpense: item.monthlyExpense,
          monthlyIncome: item.monthlyIncome,
          yearlyBudgetDetailId: item.yearlyBudgetDetailId,
          id: item.id,
        };
        this.monthlyBudgetDto.budgetDetails.push(UpdateDto);
      });

      this.monthlyBudgetDto.id = this.MonthlyBudgetId;
    } else {
      console.log(this.rowData);
      debugger;
      this.monthlyBudgetDto.budgetDetails = [];
      this.rowData.map((item) => {
        debugger;
        let CreateDto = {
          monthlyExpense: item.monthlyExpense,
          monthlyIncome: item.monthlyIncome,
          yearlyBudgetDetailId: item.id,
          id: 0,
        };
        this.monthlyBudgetDto.budgetDetails.push(CreateDto);
        this.monthlyBudgetDto.id = 0;
      });
    }

    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._monthlyBudgetService
          .create(this.monthlyBudgetDto)
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

                this.saving = false;
                this.onClose();
                window.location.href =
                  window.location.origin + "/app/main/budget/monthly-budget";
              }
            },
          });
      },
      reject: () => (this.saving = false),
    });
  }

  ReviseMonthlyBudget() {
    debugger;
    if (this.isRevised) {
      console.log(this.rowData);
      debugger;
      this.monthlyReviseBudgetDto.reviseObject = [];
      this.rowData.map((item) => {
        debugger;
        let RevisedDto = {
          revisedExpenseAmount: item.revisedExpenseAmount,
          revisedIncomeAmount: item.revisedIncomeAmount,
          monthlyBudgetDetailId: item.id,
        };
        this.monthlyReviseBudgetDto.reviseObject.push(RevisedDto);
      });

      this.monthlyReviseBudgetDto.id = this.MonthlyBudgetId;
    }

    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._monthlyBudgetService
          .ReviseMonthlyBudget(this.monthlyReviseBudgetDto)
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

                this.saving = false;
                this.onClose();
              }
            },
          });
      },
      reject: () => (this.saving = false),
    });
  }

  onClose(): void {
    debugger;
    this.saving = false;
    this.closeDiloge.emit({ name: "Qurban" });
  }

  DocumentDateChange(value) {
    debugger;
    this.monthlyBudgetDto.documentDate = value;
    this.docYear = value.getFullYear();
    this.docMonth = value.getMonth() + 1;
    this.docDay = value.getDate();
    this.getMaxBudgetId();
    this.createOrUpdateDocNumber();
  }
  getMaxBudgetId() {
    debugger;
    this._monthlyBudgetService
      .getMaxId(this.YearlyBudgetId)
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
        this.monthlyBudgetDto.budgetId = result;
        this.createOrUpdateDocNumber();
      });
  }

  createOrUpdateDocNumber() {
    debugger;
    this.monthlyBudgetDto.documentNumber = (
      "M-" +
      "HNL-" +
      (this.monthlyBudgetDto.locationId ?? "") +
      "-" +
      (this.docDay ?? "") +
      "-" +
      (this.docMonth ?? "") +
      "-" +
      (this.docYear ?? "") +
      "-" +
      (this.monthlyBudgetDto.budgetId ?? "")
    ).toString();
  }
}
