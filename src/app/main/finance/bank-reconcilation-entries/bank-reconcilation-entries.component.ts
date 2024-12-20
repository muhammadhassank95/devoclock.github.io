import { Component, Input } from "@angular/core";
import { FinanceModuleService } from "../../finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, finalize, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "../../../../shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-bank-reconcilation-entries",
  templateUrl: "./bank-reconcilation-entries.component.html",
})
export class BankReconcilationEntriesComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  data!: any;
  count: number = 0;
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  rowCount: number;
  isEditMode: boolean;
  isViewMode: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  dataForEdit: any;
  saving: boolean = false;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  @Input() rowData: any;
  bankReconciliationForm: FormGroup;
  target = "AccountReconciliation";
  suggestionModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.bankReconciliationForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      chartOfAccountId: [null, Validators.required],
      chartOfAccountName: [""],
      chartOfAccountSerialNumber: [""],
      transactionType: [""],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      accountReconciliationDetails: [[]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.onClose();
    this.VoucherRestriction("RS");
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  transactionTypes = [
    { value: "1", label: "Debited by Bank/Party Not Credited by Us" },
    { value: "2", label: "Credited by" },
  ];

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.bankReconciliationForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "AR",
          this.bankReconciliationForm.value.issueDate,
          value?.id
        );
        break;
      case "ChartOfAccount":
        this.bankReconciliationForm.patchValue({
          chartOfAccountId: value.id?.split("/")[0] || "",
          chartOfAccountName: value.name,
          chartOfAccountSerialNumber: value.id?.split("/")[1] || "",
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

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

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

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
      headerName: "Account Ledger Date",
      editable: true,
      field: "accountLedgerDate",
      sortable: true,
      suppressSizeToFit: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split("T")[0];
        }
        return "";
      },
      valueParser: (params) => {
        return new Date(params.newValue);
      },
    },

    {
      headerName: "Account Reference",
      editable: true,
      field: "accountReference",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client Id",
      editable: false,
      field: "supplierId",
      resizable: true,
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
      headerName: "Client Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Chart Of Account Id",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addChartOfAccount",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Chart Of Account Title",
      editable: false,
      field: "chartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Bill No",
      editable: true,
      field: "billNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: true,
      field: "debit",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Credit",
      editable: true,
      field: "credit",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Voucher No",
      editable: true,
      field: "voucherNO",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        debugger;
        this.setParms = params;
        this.openSelectItem("Supplier");
        break;
      case "addChartOfAccount":
        debugger;
        this.setParms = params;
        this.openSelectItem("ChartOfAccount");
        break;
      default:
        break;
    }
  }

  openSelectItem(target: "Supplier" | "ChartOfAccount") {
    debugger;
    const initialState: any = {
      target: target,
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      if (target == "Supplier") {
        this.setParms.data.supplierId = +result.id.split("/")[0];
        this.setParms.data.supplierName = result.name;
      } else if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountId = +result.id.split("/")[0];
        this.setParms.data.chartOfAccountSerialNumber = result.id.split("/")[1];
        this.setParms.data.chartOfAccountName = result.name;
      }
      this.gridApi.refreshCells();
    });
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
    debugger;
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.setRowData(this.rowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.gridApi.refreshCells();
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.bankReconciliationForm.value.issueDate = value;
    }
    if (
      this.bankReconciliationForm.value.userLocationId &&
      this.bankReconciliationForm.value.issueDate
    ) {
      this.getVoucherNumber(
        "AR",
        this.bankReconciliationForm.value.issueDate,
        this.bankReconciliationForm.value.userLocationId
      );
    }
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
          this.bankReconciliationForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
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
          this.bankReconciliationForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.bankReconciliationForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "AR",
            this.bankReconciliationForm.value.issueDate,
            this.bankReconciliationForm.value.userLocationId
          );
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

  save() {
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        (this.rowData = []),
          this.gridApi.forEachNode((node) => {
            this.rowData.push(node.data);
          });
        this.bankReconciliationForm.patchValue({
          accountReconciliationDetails: this.rowData,
        });
        this._financeModuleService
          .create(this.bankReconciliationForm.value, this.target)
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
                this.displayModal = false;
              }
            },
          });
      },
    });
  }

  update() {
    this.saving = true;
    (this.rowData = []),
      this.gridApi.forEachNode((node) => {
        this.rowData.push(node.data);
      });
    this.bankReconciliationForm.patchValue({
      accountReconciliationDetails: this.rowData,
    });
    const updateData = {
      ...this.bankReconciliationForm.value,
      id: this.dataForEdit.id,
    };
    debugger;
    console.log(updateData);
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
          this.displayModal = false;
        },
      });
  }

  // update() {
  //     this.confirmationService.confirm({
  //         message: "Are you sure?",
  //         header: "Confirmation",
  //         icon: "pi pi-exclamation-triangle",
  //         rejectButtonStyleClass: "p-button-text",
  //         accept: () => {
  //             this.saving = true;
  //             this.gridApi.forEachNode((node) => {
  //                 this.rowData.push(node.data);
  //             });
  //             this.bankReconciliationForm.patchValue({
  //                 accountReconciliationDetails: this.rowData,
  //             });
  //             const updateData = {
  //                 ...this.bankReconciliationForm.value,
  //                 id: this.dataForEdit.id,
  //             };
  //             this._financeModuleService
  //                 .update(updateData, this.target)
  //                 .pipe(
  //                     finalize(() => {
  //                         this.saving = false;
  //                     }),
  //                     catchError((error) => {
  //                         debugger;
  //                         this.messageService.add({
  //                             severity: "error",
  //                             summary: "Error",
  //                             detail: error.error.error.message,
  //                             life: 2000,
  //                         });
  //                         return throwError(error.error.error.message);
  //                     })
  //                 )
  //                 .subscribe({
  //                     next: (response) => {
  //                         debugger;
  //                         this.messageService.add({
  //                             severity: "success",
  //                             summary: "Confirmed",
  //                             detail: "Updated Successfully",
  //                             life: 2000,
  //                         });
  //                         this.getAll();
  //                         this.saving = false;
  //                         this.displayModal = false;
  //                     },
  //                     error: (err) => {
  //                         this.saving = false;
  //                     }
  //                 });
  //         },
  //     });
  // }

  show(id?: number) {
    debugger;
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
            this.bankReconciliationForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.bankReconciliationForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.bankReconciliationForm
              .get("chartOfAccountId")
              .setValue(this.dataForEdit.chartOfAccountId);
            this.bankReconciliationForm
              .get("chartOfAccountSerialNumber")
              .setValue(this.dataForEdit.chartOfAccountSerialNumber);
            this.bankReconciliationForm
              .get("chartOfAccountName")
              .setValue(this.dataForEdit.chartOfAccountName);
            this.bankReconciliationForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.bankReconciliationForm
              .get("transactionType")
              .setValue(this.dataForEdit.transactionType);
            this.rowData = this.dataForEdit.accountReconciliationDetails;
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
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.isEditMode = false;
      this.isViewMode = false;
      this.rowData = [];
      this.displayModal = true;
      this.bankReconciliationForm.reset();
      this.bankReconciliationForm.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.bankReconciliationForm.get("issueDate").setValue(this.today);
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

  edit(id: any) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.isEditMode = true;
    this.isViewMode = false;
    this.show(id);
    this.bankReconciliationForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  viewOnly(id: any) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.show(id);
    this.bankReconciliationForm.disable();
    this.MinDate = null;
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
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
