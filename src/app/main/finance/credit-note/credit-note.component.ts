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
  selector: "app-credit-note",
  templateUrl: "./credit-note.component.html",
})
export class CreditNoteComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  creditnoteForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  dataForEdit: any;
  rowCount: number;
  rowData: any;
  currentPage = 1;
  today: Date = new Date();
  MinDate: Date = new Date();
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  adjustmentData: any;
  viewMode: boolean;
  displayAdjustment: boolean;
  displayRequisition: boolean;

  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.creditnoteForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      chartOfAccountSubLedgerId: [null, Validators.required],
      chartOfAccountSubLedgerName: [""],
      chartOfAccountSubLedgerSerialNumber: [""],
      debitChartOfAccountId: [null, Validators.required],
      debitChartOfAccountName: [""],
      debitChartOfAccountSerialNumber: "",
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      // regionId: [""],
      // regionName: [""],
      remarks: [""],
      totalAmount: [{ value: "", disabled: true }],
      creditNoteDetails: [[]],
    });
  }

  target = "CreditNote";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  creditNoteDto: CreditNoteDto = new CreditNoteDto();

  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("CN");
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
    // {
    //   headerName: "SubLedger ID",
    //   editable: false,
    //   field: "generalLedgerId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "SubLedger Title",
    //   editable: false,
    //   field: "generalLedgerName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
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
      headerName: "voucherNumber",
      editable: true,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: true,
      field: "totalAmount",
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

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.creditnoteForm.value.issueDate = value;
    }
    if (
      this.creditnoteForm.value.userLocationId &&
      this.creditnoteForm.value.issueDate
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
          this.creditnoteForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.creditnoteForm
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
        this.creditnoteForm.patchValue({
          creditNoteDetails: this.rowData,
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
        delete this.creditnoteForm.value.totalAmount;
        this._financeModuleService
          .create(this.creditnoteForm.value, this.target)
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
    this.creditnoteForm.patchValue({
      creditNoteDetails: this.rowData,
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
      ...this.creditnoteForm.value,
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
            this.creditnoteForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.creditnoteForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.creditnoteForm
              .get("userLocationId")
              .setValue(this.dataForEdit.userLocationId);
            this.creditnoteForm
              .get("userLocationName")
              .setValue(this.dataForEdit.userLocationName);
            this.creditnoteForm
              .get("chartOfAccountSubledgerSerialNumber")
              ?.setValue(this.dataForEdit.chartOfAccountSubledgerSerialNumber);
            this.creditnoteForm
              .get("chartOfAccountSubledgerId")
              ?.setValue(this.dataForEdit.chartOfAccountSubledgerId);
            this.creditnoteForm
              .get("chartOfAccountSubledgerName")
              ?.setValue(this.dataForEdit.chartOfAccountSubledgerName);
            this.creditnoteForm
              .get("debitChartOfAccountSerialNumber")
              .setValue(this.dataForEdit.debitChartOfAccountSerialNumber);
            this.creditnoteForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.creditnoteForm
              .get("debitChartOfAccountName")
              .setValue(this.dataForEdit.debitChartOfAccountName);
            this.creditnoteForm
              .get("debitChartOfAccountId")
              .setValue(this.dataForEdit.debitChartOfAccountId);
            this.rowData = this.dataForEdit.creditNoteDetails;
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
      this.creditnoteForm.reset();
      this.creditnoteForm.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.creditnoteForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.creditnoteForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber();
        break;
      // case "Region":
      //   debugger;
      //   this.creditnoteForm.patchValue({
      //     regionId: value?.id,
      //     regionName: value.name,
      //   });
      //   break;
      case "Subledger":
        this.creditnoteForm.patchValue({
          chartOfAccountSubLedgerId: value.id,
          chartOfAccountSubLedgerName: value.title,
          chartOfAccountSubledgerSerialNumber: value.serialNumber,
        });
        break;

      case "ChartOfAccountForDebit":
        this.creditnoteForm.patchValue({
          // chartOfAccountSubLedgerId: value.id?.split("/")[0],
          // chartOfAccountSubLedgerName: value.name,
          // chartOfAccountSubledgerSerialNumber: value.id?.split("/")[1],

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

  // onRemoveSelected() {
  //   debugger;
  //   const selectedNodes = this.gridApi.getSelectedNodes();
  //   if (selectedNodes.length > 0) {
  //     const dataToRemove = selectedNodes.map((node) => node.data);
  //     this.rowData = this.rowData.filter(
  //       (row) =>
  //         !dataToRemove.some(
  //           (removeItem) => removeItem.generalLedgerId === row.generalLedgerId
  //         )
  //     );
  //     this.gridApi.setRowData(this.rowData);
  //     this.calculateTotalAmount();
  //     this.rowCount = this.gridApi.getDisplayedRowCount();
  //     this.gridApi.refreshCells();
  //   }
  // }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      this.rowData = this.rowData.filter((row) => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
    this.calculateTotalAmount();
  }

  getVoucherNumber() {
    debugger;
    this._financeModuleService
      .getVoucherNumber(
        this.target,
        "CN",
        this.creditnoteForm.value.issueDate,
        this.creditnoteForm.value.userLocationId
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
          this.creditnoteForm.get("voucherNumber").setValue(response);
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
        this.GetAllGroupedVouchers();
        break;
      case "totalCredit":
        debugger;
        this.setParms = params;
        //this.GetAllGroupedVouchers();
        break;
      default:
        break;
    }
  }

  OnCellValueChanged(params) {
    debugger;
    if (params.data.totalAmount) {
      this.calculateTotalAmount();
    }
  }

  GetAllGroupedVouchers() {
    debugger;
    this._financeModuleService
      .GetAllGroupedVouchers("GeneralLedger")
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

          this.adjustmentData = response;
        },
      });
    this.displayAdjustment = true;
    return;
  }

  // SelectAdjustment(id: number) {
  //   debugger;
  //   if (
  //     !this.rowData.find((item) => Number(item.generalLedgerId) === Number(id))
  //   ) {
  //     const selectedAdjustment = this.adjustmentData.find(
  //       (adjustment) => adjustment.id === id
  //     );

  //     if (selectedAdjustment && this.setParms) {
  //       console.log(this.setParms.node.data.generalLedgerId);
  //       debugger;

  //       console.log(this.setParms.node.data.generalLedgerId);
  //       debugger;

  //       if (!this.setParms.node.data.generalLedgerId) {
  //         selectedAdjustment;
  //         this.rowData.push(this.makeGridData(selectedAdjustment));
  //       } else {
  //         const index = this.rowData.findIndex(
  //           (item) =>
  //             Number(item.generalLedgerId) ===
  //             Number(this.setParms.node.data.generalLedgerId)
  //         );
  //         this.makeGridData(selectedAdjustment);
  //         debugger;
  //         if (index !== -1) {
  //           debugger;
  //           this.rowData[index] = this.makeGridData(selectedAdjustment);
  //         }
  //       }

  //       this.gridApi.setRowData(this.rowData);

  //       this.calculateTotalAmount();
  //       this.displayAdjustment = false;
  //     } else {
  //       this.messageService.add({
  //         severity: "warn",
  //         summary: "No Data",
  //         detail: "Please select a valid adjustment",
  //         life: 2000,
  //       });
  //     }
  //   } else {
  //     this.displayAdjustment = false;
  //     this.messageService.add({
  //       severity: "warn",
  //       summary: "No Data",
  //       detail: "Already in the grid",
  //       life: 2000,
  //     });
  //   }
  // }

  SelectAdjustment(voucherNumber: string) {
    debugger;
    if (!this.rowData.find((item) => item.voucherNumber === voucherNumber)) {
      const selectedAdjustment = this.adjustmentData.find(
        (adjustment) => adjustment.voucherNumber === voucherNumber
      );

      if (selectedAdjustment && this.setParms) {
        const currentGeneralLedgerId = this.setParms.node.data.generalLedgerId;
        if (!currentGeneralLedgerId) {
          this.rowData.push(this.makeGridData(selectedAdjustment));
        } else {
          const index = this.rowData.findIndex(
            (item) =>
              Number(item.generalLedgerId) === Number(currentGeneralLedgerId)
          );

          if (index !== -1) {
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
      // generalLedgerId: temData.id,
      costCenterId: temData.costCenterId,
      costCenterName: temData.costCenterName,
      projectId: temData.projectId,
      projectName: temData.projectName,
      voucherNumber: temData.voucherNumber,
      totalAmount: temData.totalCredit,
    };

    return currentRow;
  }

  calculateTotalAmount() {
    let total = 0;
    this.rowData.forEach((node) => {
      debugger;

      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    this.creditnoteForm.get("totalAmount").setValue(total);
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.creditnoteForm.disable();
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
    this.creditnoteForm.enable();
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