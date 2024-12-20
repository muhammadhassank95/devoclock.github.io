import { Component, ViewChild } from "@angular/core";
import { CreditNoteDto } from "../Shared/Dtos/credit-note-dto";
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-debit-note",
  templateUrl: "./debit-note.component.html",
})
export class DebitNoteComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  debitnoteForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  dataForEdit: any;
  rowCount: number;
  rowData: any;
  adjustmentData: any;
  viewMode: boolean;
  displayAdjustment: boolean;
  displayRequisition: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.debitnoteForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      debitChartOfAccountId: [null, Validators.required],
      debitChartOfAccountName: [""],
      debitChartOfAccountSerialNumber: "",
      creditChartOfAccountId: [null, Validators.required],
      creditChartOfAccountName: [""],
      creditChartOfAccountSerialNumber: "",
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      // regionId: [""],
      // regionName: [""],
      remarks: [""],
      totalAmount: [{ value: "", disabled: true }],
      debitNoteDetails: [[]],
    });
  }

  target = "DebitNote";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;

  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("DN");
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
      headerName: "SubLedger ID",
      editable: false,
      field: "subLedgerId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "SubLedger Title",
      editable: false,
      field: "subLedgerTitle",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center ID",
      editable: false,
      field: "costCenterId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project ID",
      editable: false,
      field: "projectId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Adj Vo",
      editable: false,
      field: "adjustmentVoucherNumber",
      resizable: true,
      suppressSizeToFit: true,
      cellRenderer: this.addIconCellRendererFunc,
    },
    {
      headerName: "Amount",
      editable: true,
      field: "amount",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.debitnoteForm.value.issueDate = value;
    }
    if (
      this.debitnoteForm.value.userLocationId &&
      this.debitnoteForm.value.issueDate
    ) {
      this.getVoucherNumber();
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
          this.debitnoteForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.debitnoteForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber();
        },
      });
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
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
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.saving = true;
        this.debitnoteForm.patchValue({
          debitNoteDetails: this.rowData,
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
        delete this.debitnoteForm.value.totalAmount;
        this._financeModuleService
          .create(this.debitnoteForm.value, this.target)
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
  update() {
    this.saving = true;
    this.debitnoteForm.patchValue({
      debitNoteDetails: this.rowData,
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
      ...this.debitnoteForm.value,
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
            this.debitnoteForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.debitnoteForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.debitnoteForm
              .get("userLocationId")
              .setValue(this.dataForEdit.userLocationId);
            this.debitnoteForm
              .get("userLocationName")
              .setValue(this.dataForEdit.userLocationName);
            this.debitnoteForm
              .get("debitChartOfAccountId")
              .setValue(this.dataForEdit.debitChartOfAccountId);
            this.debitnoteForm
              .get("debitChartOfAccountName")
              .setValue(this.dataForEdit.debitChartOfAccountName);
            this.debitnoteForm
              .get("creditChartOfAccountId")
              .setValue(this.dataForEdit.creditChartOfAccountId);
            this.debitnoteForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.debitnoteForm
              .get("creditChartOfAccountName")
              .setValue(this.dataForEdit.creditChartOfAccountName);
            this.rowData = this.dataForEdit.debitNoteDetails;
            this.calculateTotalAmount();
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
      this.debitnoteForm.reset();
      this.debitnoteForm.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.debitnoteForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.debitnoteForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber();
        break;
      // case "Region":
      //   debugger;
      //   this.debitnoteForm.patchValue({
      //     regionId: value?.id,
      //     regionName: value.name,
      //   });
      //   break;
      case "ChartOfAccount":
        this.debitnoteForm.patchValue({
          creditChartOfAccountId: value.id.split("/")[0],
          creditChartOfAccountName: value.name,
          creditChartOfAccountSerialNumber: value.id.split("/")[1],
        });
        break;
      case "ChartOfAccountForDebit":
        this.debitnoteForm.patchValue({
          debitChartOfAccountId: value.id.split("/")[0],
          debitChartOfAccountName: value.name,
          debitChartOfAccountSerialNumber: value.id.split("/")[1],
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
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
      this.rowData = this.rowData.filter(
        (row) =>
          !dataToRemove.some(
            (removeItem) => removeItem.generalLedgerId === row.generalLedgerId
          )
      );
      this.gridApi.setRowData(this.rowData);
      this.calculateTotalAmount();
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.gridApi.refreshCells();
    }
  }
  getVoucherNumber() {
    debugger;
    this._financeModuleService
      .getVoucherNumber(
        this.target,
        "DN",
        this.debitnoteForm.value.issueDate,
        this.debitnoteForm.value.userLocationId
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
          this.debitnoteForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "adjustmentVoucherNumber":
        debugger;
        this.setParms = params;
        this.getAllGeneralLedger();
        break;
      default:
        break;
    }
  }
  OnCellValueChanged(params) {
    if (params.data.amount) {
      this.calculateTotalAmount();
    }
  }
  getAllGeneralLedger() {
    debugger;
    this._financeModuleService
      .getAllGeneralLedger(
        "GeneralLedger",
        this.debitnoteForm.value.creditChartOfAccountId,
        this.debitnoteForm.value.creditChartOfAccountId
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

          this.adjustmentData = response.items;
        },
      });
    this.displayAdjustment = true;
    return;
  }

  SelectAdjustment(id: number) {
    debugger;
    if (
      !this.rowData.find((item) => Number(item.generalLedgerId) === Number(id))
    ) {
      const selectedAdjustment = this.adjustmentData.find(
        (adjustment) => adjustment.id === id
      );

      if (selectedAdjustment && this.setParms) {
        console.log(this.setParms.node.data.generalLedgerId);
        debugger;

        console.log(this.setParms.node.data.generalLedgerId);
        debugger;

        if (!this.setParms.node.data.generalLedgerId) {
          selectedAdjustment;
          this.rowData.push(this.makeGridData(selectedAdjustment));
        } else {
          const index = this.rowData.findIndex(
            (item) =>
              Number(item.generalLedgerId) ===
              Number(this.setParms.node.data.generalLedgerId)
          );
          this.makeGridData(selectedAdjustment);
          debugger;
          if (index !== -1) {
            debugger;
            this.rowData[index] = this.makeGridData(selectedAdjustment);
          }
        }

        this.gridApi.setRowData(this.rowData);

        this.calculateTotalAmount();
        this.displayAdjustment = false;
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "No Data",
          detail: "Please select a valid adjustment",
          life: 2000,
        });
      }
    } else {
      this.displayAdjustment = false;
      this.messageService.add({
        severity: "warn",
        summary: "No Data",
        detail: "Already in the grid",
        life: 2000,
      });
    }
  }

  makeGridData(temData) {
    var currentRow = {
      generalLedgerId: temData.id,
      costCenterId: temData.costCenterId,
      costCenterName: temData.costCenterName,
      projectId: temData.projectId,
      projectName: temData.projectName,
      adjustmentVoucherNumber: temData.voucherNumber,
      amount: temData.balance,
    };

    return currentRow;
  }

  calculateTotalAmount() {
    let total = 0;
    this.rowData.forEach((node) => {
      debugger;

      if (node.amount) {
        total += +node.amount;
      }
    });
    this.debitnoteForm.get("totalAmount").setValue(total);
  }
  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.debitnoteForm.disable();
    this.MinDate = null;
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
    this.debitnoteForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
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
