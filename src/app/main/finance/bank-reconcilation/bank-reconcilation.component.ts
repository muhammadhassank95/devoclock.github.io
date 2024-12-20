import { Component, ViewChild } from "@angular/core";
import { BankReconcilation } from "../Shared/Dtos/bank-reconcilation";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import * as moment from "moment";

@Component({
  selector: "app-bank-reconcilation",
  templateUrl: "./bank-reconcilation.component.html",
})
export class BankReconcilationComponent {
  bankReconcilationDto: BankReconcilation = new BankReconcilation();
  count: number;
  displayModal: boolean;
  saving: boolean;
  target = "GeneralPaymentReconciliation";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  locationId: number;
  locationName: string;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _bankPaymentReconcilation: FinanceModuleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}
  @ViewChild("agGrid") agGrid: any;
  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Reference Date",
      editable: false,
      field: "referenceDate",
      filter: "agDateColumnFilter", // Date filter
      resizable: true,
      suppressSizeToFit: true,
      valueFormatter: (params) => {
        const date = new Date(params.value); // Convert the value to a date
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return ""; // Return empty if the date is invalid
      },
    },
    {
      headerName: "Voucher Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
      filter: "agTextColumnFilter", // Date filter
    },

    {
      headerName: "Reconcilation",
      editable: false,
      field: "reconciled",
      resizable: true,
      suppressSizeToFit: true,
      filter: "agTextColumnFilter", // Date filter
    },
    {
      headerName: "Reconciliation Date",
      field: "reconciliationDate",
      editable: true,
      cellEditor: "agDateCellEditor", // Use the built-in date editor
      resizable: true,
      suppressSizeToFit: true,
      valueFormatter: (params) => {
        const date = new Date(params.value); // Convert the value to a date
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        }
        return ""; // Return empty if the date is invalid
      },
    },
    {
      headerName: "Narration",
      editable: false,
      field: "remarks",
      filter: "agTextColumnFilter", // Number filter
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: false,
      field: "debit",
      filter: "agNumberColumnFilter", // Number filter
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Credit",
      editable: false,
      field: "credit",
      filter: "agNumberColumnFilter", // Number filter
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Balance",
    //   editable: false,
    //   field: "balance", // Optional: You can leave this to be used for export or other purposes
    //   filter: "agNumberColumnFilter", // Number filter
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueGetter: (params) => {
    //     const debit = params.data.debit || 0; // Default to 0 if debit is undefined/null
    //     const credit = params.data.credit || 0; // Default to 0 if credit is undefined/null
    //     return debit - credit;
    //   },
    // },
  ];
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
    this.gridApi.setPinnedBottomRowData([]); // Initialize pinned bottom row
  }
  onRowDoubleClick(event: any) {
    const selectedRowData = event.data; // Access row data
    console.log("Double-clicked row data:", selectedRowData);

    if (!selectedRowData.reconciliationDate) {
      this.messageService.add({
        severity: "error",
        summary: "error",
        detail: "Reconceliaction Date is required",
        life: 2000,
      });
      return;
    }
    this.confirmationService.confirm({
      message: `Are you sure you want to update  ${moment(
        selectedRowData.reconciliationDate
      ).format("YYYY-MM-DD")} date ? \n of voucher Number ${
        selectedRowData.voucherNumber
      }`,
      header: "Update Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // If user clicks 'Yes', proceed with the update
        const obj = [
          {
            id: selectedRowData.id,
            reconciliationDate: moment(
              selectedRowData.reconciliationDate
            ).format("YYYY-MM-DD"),
          },
        ];
        debugger;
        this.updateWithReconsile(obj);
      },
      reject: () => {
        // If user clicks 'No', you can add optional logic here
      },
    });

    // You can use selectedRowData for further processing
  }
  customAggFunc(params: any): number {
    let sum = 0;
    debugger;
    params.values.forEach((value: number) => {
      if (value > 0) sum += value;
    });
    return sum;
  }
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  dateFormatter(params) {
    if (params.value) {
      const date = new Date(params.value);
      return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    }
    return "";
  }
  cellValueChanged(event) {
    if (event.colDef.field === "reconciliationDate") {
      // Handle reconciliation date changes
      console.log("New date:", event.newValue);
      this.gridApi.refreshCells();
    }
  }
  // Date formatter function
  dateParser(params) {
    const date = new Date(params.newValue);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0]; // Return the formatted date string (YYYY-MM-DD)
    }
    return null;
  }

  show() {
    this.displayModal = true;
    this.locationId = null;
    this.locationName = null;
    this.bankReconcilationDto = new BankReconcilation();
    this.rowData = [];
  }
  ClearAll() {
    this.displayModal = true;
    this.locationId = null;
    this.locationName = null;
    this.bankReconcilationDto = new BankReconcilation();
    this.rowData = [];

    this.agGrid.api.setRowData([]); // Clear row data using the grid API

    this.updateFooterTotals();
  }
  Clear() {
    this.rowData = [];

    this.agGrid.api.setRowData([]); // Clear row data using the grid API

    this.updateFooterTotals();
  }

  Unconcilation() {
    this.saving = true;
    var tempArr = [];
    var selectedRowms = this.gridApi.getSelectedNodes();
    selectedRowms.map((node) => {
      var tempObj = {
        id: node.data.id, // Assuming the grid data has an `id` field
        reconciliationDate: "", // Assuming the grid data has a `reconciliationDate` field
      };
      tempArr.push(tempObj);
    });
    debugger;
    this.updateWithReconsile(tempArr);
  }
  Update() {
    this.saving = true;

    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
      });
      this.saving = false;
      return;
    }

    var tempArr = [];
    this.gridApi.forEachNode((node) => {
      var tempObj = {
        id: node.data.id, // Assuming the grid data has an `id` field
        reconciliationDate: moment(node.data.reconciliationDate).format(
          "YYYY-MM-DD"
        ), // Assuming the grid data has a `reconciliationDate` field
      };
      tempArr.push(tempObj);
    });
    debugger;
    this.updateWithReconsile(tempArr);
  }

  updateWithReconsile(requestDto) {
    this._bankPaymentReconcilation
      .updateReconciliation(requestDto, this.target)
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
            detail: "Saved Successfully",
            life: 2000,
          });
          this.generate();
        },
      });
  }

  generate() {
    debugger;
    if (!this.bankReconcilationDto.chartOfAccountId) {
      this.messageService.add({
        severity: "error",
        detail: "ChartOfAccount is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._bankPaymentReconcilation
      .getAllBankReconcilation(
        this.target,
        this.bankReconcilationDto.chartOfAccountId,
        this.bankReconcilationDto.startDate,
        this.bankReconcilationDto.finishDate
      )
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
          if (response.totalCount == 0) {
            this.messageService.add({
              severity: "Warning",
              summary: "Reminder",
              detail: "There is no Data against this ChartOfAccount ",
            });
          } else {
            const data = [];
            response.items.forEach((item) => {
              data.push({
                ...item,
                reconciled: item.reconciliationDate ? "Yes" : "No",
                reconciliationDate: item.referenceDate,
              });
            });
            this.rowData = data;
            // this.rowData = response.items;
            this.bottonResults();
            setInterval(() => {
              this.updateFooterTotals(); // Calculate totals after setting rowData
            }, 500);
          }
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
      case "ChartOfAccount":
      case "Bank":
        // this.chartOfAccountName = value.name;
        // this.chartOfAccountId = +value.id;
        // this.showSerialNumber = value.serialNumber;        debugger;
        this.bankReconcilationDto.chartOfAccountId = value.id;
        this.bankReconcilationDto.chartOfAccountSerialNumber =
          value.serialNumber;
        this.bankReconcilationDto.chartOfAccountName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  MakeVoucher(value?: Date) {
    debugger;
    if (value) {
      this.bankReconcilationDto.documentDate = value;
    }
    if (this.locationId && this.bankReconcilationDto.documentDate) {
      this.bankReconcilationDto.voucherNumber =
        "SVR" +
        "/" +
        (this.bankReconcilationDto.documentDate.getMonth() + 1) +
        "/" +
        this.bankReconcilationDto.documentDate.getFullYear() +
        "/" +
        this.locationId;
    }
  }

  bottonResults() {
    // 1. Total Unreconciled Results
    let unreconciledEntries = 0;
    let unreconciledDebit = 0;
    let unreconciledCredit = 0;

    this.rowData.forEach((entry) => {
      if (entry.reconciled === "No") {
        unreconciledEntries++;
        unreconciledDebit += entry.debit;
        unreconciledCredit += entry.credit;
      }
    });
    this.bankReconcilationDto.unreconciledEntries = unreconciledEntries;
    this.bankReconcilationDto.unreconciledDebit = unreconciledDebit;
    this.bankReconcilationDto.unreconciledCredit = unreconciledCredit;

    // 2. Total Reconciled Results
    let reconciledEntries = 0;
    let reconciledDebit = 0;
    let reconciledCredit = 0;

    this.rowData.forEach((entry) => {
      if (entry.reconciled === "Yes") {
        reconciledEntries++;
        reconciledDebit += entry.debit;
        reconciledCredit += entry.credit;
      }
    });
    this.bankReconcilationDto.reconciledEntries = reconciledEntries;
    this.bankReconcilationDto.reconciledDebit = reconciledDebit;
    this.bankReconcilationDto.reconciledCredit = reconciledCredit;

    // 3. Total Generated Results
    this.bankReconcilationDto.totalEntries = this.rowData.length;
    const totalDebit = this.rowData.reduce(
      (sum, entry) => sum + entry.debit,
      0
    );
    const totalCredit = this.rowData.reduce(
      (sum, entry) => sum + entry.credit,
      0
    );
    this.bankReconcilationDto.totalDebit = totalDebit;
    this.bankReconcilationDto.totalCredit = totalCredit;
  }
  onFilterChanged() {
    this.updateFooterTotals();
  }
  pinnedBottomRowData: any[] = [
    {
      debit: 0,
      credit: 0,
      voucherNumber: "Total",
    },
  ];
  updateFooterTotals() {
    const displayedRows = this.gridApi.getDisplayedRowCount();
    let totalDebit = 0;
    let totalCredit = 0;

    this.gridApi.forEachNodeAfterFilter((node) => {
      totalDebit += node.data.debit || 0;
      totalCredit += node.data.credit || 0;
    });
    debugger;
    this.pinnedBottomRowData = [
      {
        debit: totalDebit,
        credit: totalCredit,
        voucherNumber: "Total",
      },
    ];
    this.gridApi.setPinnedBottomRowData(this.pinnedBottomRowData);
  }
}
