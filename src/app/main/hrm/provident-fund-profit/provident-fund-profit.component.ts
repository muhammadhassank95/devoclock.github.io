import { Component, ViewChild, Injector, OnInit } from "@angular/core";
import { ProvidentFundProfit } from "../shared/DTOs/provident-fund-profit";
import { ProvidentFundProfitService } from "../shared/services/provident-fund-profit.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-provident-fund-profit",
  templateUrl: "./provident-fund-profit.component.html",
})
export class ProvidentFundProfitComponent
  extends AppComponentBase
  implements OnInit
{
  constructor(
    injector: Injector,
    private _providentFundProfitService: ProvidentFundProfitService,
    private messageService: MessageService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  providentFundProfitDto: ProvidentFundProfit = new ProvidentFundProfit();
  permissions: PermissionsDto;

  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  view: boolean;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  createMode: boolean;
  totalAmount: number;
  // totalProfDis: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  loading: boolean;
  today: Date = new Date();
  ngOnInit(): void {
    this.permissions = new PermissionsDto("ProvidentFundProfitContribution");
    this.getAll();
  }

  getAll() {
    debugger;
    this._providentFundProfitService
      .getAll("ProvidentFundProfitContribution", this.skipCount, this.maxCount)
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
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  create() {
    debugger;
    this.saving = true;
    let tempArray = [];

    if (this.gridApi) {
      this.gridApi.forEachNode((node) => {
        const tempObj = {
          employeeId: node.data.employeeId,
          profitAmount: node.data.profitAmount,
        };
        tempArray.push(tempObj);
      });
    }

    this.providentFundProfitDto.providentFundProfitContributionDetails =
      tempArray;

    if (!this.createMode) {
      this._providentFundProfitService
        .Edit(this.providentFundProfitDto)
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
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            debugger;
            this.messageService.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Updated Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
          },
        });
    } else {
      this._providentFundProfitService
        .create(this.providentFundProfitDto)
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
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            debugger;
            this.messageService.add({
              severity: "success",
              summary: "Confirmed",
              detail: "Created Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.dialogVisibility = false;
            this.providentFundProfitDto = new ProvidentFundProfit();
          },
        });
    }
  }

  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._providentFundProfitService
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
  setPickerValue(value: any, title: string) {
    switch (title) {
      case "Credit":
        this.providentFundProfitDto.creditToCOAId = +value.id.split("/")[0];
        this.providentFundProfitDto.creditToCOAName = value.name;
        this.providentFundProfitDto.creditToCOASerialNumber =
          value.id.split("/")[1];
        break;
      case "Debit":
        this.providentFundProfitDto.debitToCOAId = +value.id.split("/")[0];
        this.providentFundProfitDto.debitToCOAName = value.name;
        this.providentFundProfitDto.debitToCOASerialNumber =
          value.id.split("/")[1];

        break;
      case "Location":
        this.providentFundProfitDto.userLocationId = value.id;
        this.providentFundProfitDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
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
      headerName: "Emp ID",
      editable: false,
      field: "employeeErpId",
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addEmp",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Employee Name",
      editable: false,
      field: "employeeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Balance",
      editable: true,
      field: "balance",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Profit Amount",
      editable: true,
      field: "profitAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

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

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
    this.calculateTotalAmount();
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addEmp":
        debugger;
        this.setParms = params;
        this.openSelectEmp();
        break;
      default:
        break;
    }
  }

  cellValueChanged(params) {
    this.calculateTotalAmount();
    debugger;
  }

  openSelectEmp() {
    debugger;
    const initialState: any = {
      target: "Employee",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.employeeId = result.additional;
      this.setParms.data.employeeName = result.name;
      this.setParms.data.employeeErpId = +result.id;
      this.getEmployeeBalance(result.additional);
      debugger;
      this.gridApi.refreshCells();
    });
  }

  getEmployeeBalance(id: number) {
    if (
      !this.providentFundProfitDto.startPeriod ||
      !this.providentFundProfitDto.endPeriod ||
      !id
    ) {
      return;
    }
    this._providentFundProfitService
      .getBalance(
        this.providentFundProfitDto.startPeriod,
        this.providentFundProfitDto.endPeriod,
        id
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
          this.setParms.data.balance = response;
        },
      });
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.dialogVisibility = false;
      },
      reject: () => {
        this.dialogVisibility = true;
      },
    });
  }
  openModal(id?: number) {
    debugger;
    this.dialogVisibility = true;
    if (id) {
      this._providentFundProfitService
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
            this.providentFundProfitDto = response;
            this.providentFundProfitDto.debitToCOASerialNumber =
              response.debitToCOASerialNumber;
            this.providentFundProfitDto.creditToCOASerialNumber =
              response.creditToCOASerialNumber;
            this.providentFundProfitDto.issueDate = new Date(
              response.issueDate
            );
            this.providentFundProfitDto.startPeriod = new Date(
              response.startPeriod
            );
            this.providentFundProfitDto.endPeriod = new Date(
              response.endPeriod
            );
            this.rowData = response.providentFundProfitContributionDetails;
            this.providentFundProfitDto.voucherNumber = response.voucherNumber;
          },
        });
    } else {
      this.rowData = [];
      this.providentFundProfitDto = new ProvidentFundProfit();
      this.providentFundProfitDto.issueDate = this.today;

      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.createMode = true;
      this.editMode = false;
      this.view = false;
    }
  }
  edit(id: number) {
    this.editMode = true;
    this.createMode = false;
    this.view = false;
    this.openModal(id);
  }
  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.openModal(id);
  }
  approve(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._providentFundProfitService
          .approveDocument(id, "ProvidentFundProfitContribution")
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
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.providentFundProfitDto.issueDate = value;
    }
    if (
      this.providentFundProfitDto.userLocationId &&
      this.providentFundProfitDto.issueDate
    ) {
      this.getVoucherNumber();
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._providentFundProfitService
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
          this.providentFundProfitDto.userLocationName = response.items[0].name;
          this.providentFundProfitDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._providentFundProfitService
      .getVoucherNumber(
        "ProvidentFundProfitContribution",
        "TFPD",
        this.providentFundProfitDto.issueDate,
        this.providentFundProfitDto.userLocationId
      )
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please Select Location Id to make correct voucher number",
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.providentFundProfitDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  calculateTotalAmount() {
    debugger;
    let total = 0;
    this.gridApi.forEachNode((node) => {
      if (node.data.profitAmount) {
        total += +node.data.profitAmount;
      }
    });
    this.providentFundProfitDto.totalAmount = +total;
  }
  onGlobalFilter(table: Table, event: Event) {
    console.log(event.target);
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._providentFundProfitService
      .getAll("ProvidentFundProfitContribution", this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;

    this._providentFundProfitService
      .getAll(
        "ProvidentFundProfitContribution",
        this.skipCount,
        this.maxCount,
        inputValue
      )
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
}
