import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { MonthlyBudgetDto } from "../shared/Dtos/monthly-budget-dto";
import { AddOrReviseMonthlyBudgetComponent } from "./add-or-revise-monthly-budget.component";
import { BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import { MonthlyBudgetService } from "../shared/services/monthly-budget.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { Table } from "primeng/table";
@Component({
  selector: "app-monthly-budget",
  templateUrl: "./monthly-budget.component.html",
})
export class MonthlyBudgetComponent {
  monthlyBudgetDto: MonthlyBudgetDto = new MonthlyBudgetDto();
  @ViewChild("addOrReviseMonthlyBudgetComponent", { static: true })
  addOrReviseMonthlyBudgetComponent: AddOrReviseMonthlyBudgetComponent;

  dialogVisibility: boolean = false;
  saving: boolean;
  editMode: boolean;
  reviseMode: boolean;
  target: string;
  tableData: any;
  tableCount: any;
  skipCount: number = 0;
  maxCount: number = 10;
  currentPage: number = 1;
  loading: boolean;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;

  monthlyBudgetId: number;
  isRevised: boolean;

  constructor(
    private _monthlyBudgetService: MonthlyBudgetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

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

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    debugger;
    this._monthlyBudgetService
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
  MonthyBudgetPost(id: number) {
    debugger;
    this._monthlyBudgetService
      .Approve(id)
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
          this.getAll();
        },
      });
  }

  closeDiloge(value: any): void {
    debugger;
    console.log(value);
    this.dialogVisibility = false;
  }

  getMonthNames(monthNumbers: string[]): string[] {
    return monthNumbers.map((month) => this.monthMapping[month]);
  }

  show(id: number) {
    if (id) {
      this.dialogVisibility = true;
      this.editMode = true;
      this.isRevised = false;
      this.monthlyBudgetId = id;
    }
  }
  ReviseMonthlyBudget(id: number) {
    debugger;
    if (id) {
      this.dialogVisibility = true;
      this.monthlyBudgetId = id;
      this.isRevised = true;
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    debugger;
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._monthlyBudgetService.getAll(this.skipCount, this.maxCount).subscribe({
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
    this._monthlyBudgetService
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
