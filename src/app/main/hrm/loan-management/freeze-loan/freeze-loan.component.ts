import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { FreezeLoanDto } from "../../shared/DTOs/loan-management-dto";
import { LoanManagementService } from "../../shared/services/loan-management.service";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";

@Component({
  selector: "app-freeze-loan",
  templateUrl: "./freeze-loan.component.html",
})
export class FreezeLoanComponent {
  rowData: any[] = [];
  paidDate: Date;
  setParms: any;
  tempDate: Date;
  upperLimitDate: Date;

  colDefs: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      editable: false,
      width: 80,
    },
    {
      headerName: "Installment Amount",
      field: "installmentAmount",
      editable: false,
    },
    {
      headerName: "Is Paid",
      field: "isPaid",
      editable: false,
      cellRenderer: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      headerName: "Is Pause",
      field: "isPause",
      editable: false,
      cellRenderer: (params) => {
        return params.value ? "Yes" : "No";
      },
    },
    {
      headerName: "Paid Date",
      editable: false,
      field: "paidDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      cellRenderer: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
      cellEditor: "primeDatePickerEditor",
    },
    {
      headerName: "Payment Date",
      editable: false,
      field: "repaymentDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      cellRenderer: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
      cellEditor: "primeDatePickerEditor",
    },
    {
      headerName: "Transferred Date",
      editable: false,
      field: "transferredToDate",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      cellRenderer: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : "";
      },
      cellEditor: "transferredToDate",
    },
  ];
  TransferredToDate: string;

  constructor(
    private msgService: MessageService,
    private loanManagementService: LoanManagementService
  ) {}

  freezeLoanDto: FreezeLoanDto = new FreezeLoanDto();
  @Input() loanid: string = "";
  @Output() close = new EventEmitter<void>();
  startDate: string | null = null;
  endDate: string | null = null;
  protected gridApi: GridApi;
  rowSelection: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loanid && changes.loanid.currentValue) {
      this.loadLoanRepayments(this.loanid);
    }
  }

  loadLoanRepayments(Id: any) {
    this.loanManagementService.getForEdit(Id).subscribe((response: any) => {
      debugger;
      this.rowData = response.loanRepayments.map((loan) => {
        return {
          ...loan,
          isEditable: !loan.isPaid,
          isEditablee: !loan.isPause,
        };
      });

      // Find the last record in the response.loanRepayments array
      const lastRepayment =
        response.loanRepayments[response.loanRepayments.length - 1];

      // Extract the repaymentDate and add one month
      const lastRepaymentDate = new Date(lastRepayment.repaymentDate);
      const upperLimitDate = new Date(
        lastRepaymentDate.setMonth(lastRepaymentDate.getMonth() + 1)
      );

      // Set the upper limit date
      this.upperLimitDate = upperLimitDate;
    });
  }

  onSubmit() {
    debugger;
    this.loanManagementService
      .createFreezeLoan(this.freezeLoanDto)
      .pipe(
        catchError((error) => {
          this.msgService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe(() => {
        this.msgService.add({
          severity: "success",
          summary: "Success",
          detail: "Loan Adjusted successfully",
          life: 2000,
        });
        this.onClose();
      });
  }

  onClose() {
    this.close.emit();
  }

  onGridReady(params: GridReadyEvent) {
    debugger;
    this.gridApi = params.api;
    this.rowSelection = "single";
  }

  cellClicked(params) {
    debugger;
    this.setParms = params;
    if (!params.data.isPaid) {
      this.freezeLoanDto.RepaymentId = params.data.id;
      this.freezeLoanDto.TransferredToDate = new Date(
        params.data.repaymentDate
      );
      this.tempDate = new Date(params.data.repaymentDate);
    }
  }
}
