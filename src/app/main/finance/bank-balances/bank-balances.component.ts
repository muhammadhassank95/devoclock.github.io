import { Component, ViewChild } from "@angular/core";
import { BankBalanceDto } from "../Shared/Dtos/bank-balance-dto";
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-bank-balances",
  templateUrl: "./bank-balances.component.html",
})
export class BankBalancesComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  bankBalanceForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  dataForEdit: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  rowSelection: string;
  rowCount: number;
  rowData: any;
  viewMode: boolean;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  constructor(
    private suggestionService: BsModalService,
    private fb: FormBuilder,
    private _restrictionService: RestrictionService,
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    this.bankBalanceForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      credit: [{ value: null, disabled: true }],
      debit: [{ value: null, disabled: true }],
      accountBalanceDetails: [[]],
    });
  }

  target = "AccountBalance";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;

  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("BB");
  }

  colDefs: ColDef[] = [
    {
      headerName: "Account ID",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "",
      editable: false,
      field: "addChartOfAccount",
      cellRenderer: this.addIconCellRendererFunc,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Account Title",
      editable: false,
      field: "chartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: true,
      field: "debit",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Credit",
      editable: true,
      field: "credit",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Voucher Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.data = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  getAll() {
    debugger;
    this._financeModuleService
      .getAll(this.target)
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
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        this.rowData = [];
        this.gridApi.forEachNode((node) => {
          this.rowData.push({
            chartOfAccountId: node.data.chartOfAccountId,
            chartOfAccountName: node.data.chartOfAccountName,
            debit: node.data.debit,
            credit: node.data.credit,
          });
        });
        this.bankBalanceForm.patchValue({
          accountBalanceDetails: this.rowData,
        });
        delete this.bankBalanceForm.value.debit;
        delete this.bankBalanceForm.value.credit;
        this._financeModuleService
          .create(this.bankBalanceForm.value, this.target)
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
              if (response) {
                debugger;
                this.getAll();
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "CreatedSuccessfully",
                  life: 2000,
                });
                this.saving = false;
                this.dialogVisibility = false;
              }
            },
          });
      },
    });
  }

  update() {
    debugger;
    this.saving = true;
    this.rowData = [];
    this.gridApi.forEachNode((node) => {
      this.rowData.push({
        chartOfAccountId: node.data.chartOfAccountId,
        chartOfAccountName: node.data.chartOfAccountName,
        debit: node.data.debit,
        credit: node.data.credit,
      });
    });
    this.bankBalanceForm.patchValue({
      accountBalanceDetails: this.rowData,
    });
    if (this.rowData.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add details",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    const updateData = {
      ...this.bankBalanceForm.value,
      id: this.dataForEdit.id,
    };
    this._financeModuleService
      .update(updateData, this.target)
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
            detail: "UpdatedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.dialogVisibility = false;
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
        this._financeModuleService
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
      this._financeModuleService
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
            this.dataForEdit = response;
            this.bankBalanceForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.bankBalanceForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.bankBalanceForm
              .get("userLocationId")
              .setValue(this.dataForEdit.userLocationId);
            this.bankBalanceForm
              .get("userLocationName")
              .setValue(this.dataForEdit.userLocationName);
            this.bankBalanceForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.rowData = this.dataForEdit.accountBalanceDetails;
            setTimeout(() => {
              this.gridApi.setRowData(this.rowData);
              this.calculateDebitAndCredit();
            }, 0);
            this.getDefaultLocation(
              "Location",
              "locationName",
              "locationId",
              "this.dataForEdit.locationName"
            );
            this.dialogVisibility = true;
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
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.dialogVisibility = true;
      this.bankBalanceForm.reset();
      this.bankBalanceForm.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.bankBalanceForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.bankBalanceForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "BB",
          this.bankBalanceForm.value.issueDate,
          value?.id
        );
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.bankBalanceForm.value.issueDate = value;
    }
    if (
      this.bankBalanceForm.value.userLocationId &&
      this.bankBalanceForm.value.issueDate
    ) {
      this.getVoucherNumber(
        "BB",
        this.bankBalanceForm.value.issueDate,
        this.bankBalanceForm.value.userLocationId
      );
    }
  }
  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._financeModuleService
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
          this.bankBalanceForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.bankBalanceForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "BB",
            this.bankBalanceForm.value.issueDate,
            this.bankBalanceForm.value.userLocationId
          );
        },
      });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
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
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      // Apply transaction to remove selected rows
      this.gridApi.applyTransaction({ remove: dataToRemove });
      debugger;
      // Update rowData after removing rows
      this.rowData = [];
      this.gridApi.forEachNode((node) => this.rowData.push(node.data));
      this.calculateDebitAndCredit();
    }
  }
  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addChartOfAccount":
        this.setParms = params;
        this.openSelectCOA();
        break;
      default:
        break;
    }
  }

  openSelectCOA() {
    debugger;
    let target = "ChartOfAccount";
    const initialState: any = {
      target: target,
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.chartOfAccountId = result.id?.split("/")[0] || "";
      this.setParms.data.chartOfAccountSerialNumber =
        result.id?.split("/")[1] || "";
      this.setParms.data.chartOfAccountName = result.name;
      this.gridApi.refreshCells();
    });
  }
  getVoucherNumber(prefix: string, issueDate: string, userLocationId: number) {
    debugger;
    this._financeModuleService
      .getVoucherNumber(this.target, prefix, issueDate, userLocationId)
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
          this.bankBalanceForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  calculateDebitAndCredit() {
    let totalCredit = 0;
    let totalDebit = 0;
    if (this.gridApi) {
      this.gridApi.forEachNode((node) => {
        if (node.data.credit) {
          totalCredit += Number(node.data.credit);
        }
        if (node.data.debit) {
          totalDebit += Number(node.data.debit);
        }
      });
      this.bankBalanceForm.get("credit").setValue(totalCredit);
      this.bankBalanceForm.get("debit").setValue(totalDebit);
    }
  }
  OnCellValueChanged(params) {
    this.calculateDebitAndCredit();
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
    this.viewMode = false;
    this.show(id);
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id: number) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
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
        this._financeModuleService
          .approve(id, this.target)
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
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
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
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.dto.DocOrVocNumber = inputValue;
    debugger;

    this._financeModuleService.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.data = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
