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
  selector: "app-cashpaymentreverse",
  templateUrl: "./cashpaymentreverse.component.html",
})
export class CashpaymentreverseComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  displaybankPayment: boolean;
  data!: any;
  bankPaymentData!: any;
  count: number = 0;
  currentPage: number = 1;
  skipCount: number = 0;
  rowCount: number;
  maxCount: number = 10;
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
  cashpaymentReversibleForm: FormGroup;
  target = "GeneralPaymentReversible";
  suggestionModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.cashpaymentReversibleForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      generalPaymentId: [""],
      totalChequeAmount: [""],
      totalTaxAmount: [""],
      // accountReconciliationDetails: [[]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.onClose();
    this.VoucherRestriction("BRR");
  }
  onClose() {
    debugger;
    this.displayModal = false;
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.cashpaymentReversibleForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "BRE",
          this.cashpaymentReversibleForm.value.issueDate,
          value?.id
        );
        break;
      default:
        alert(`${title} is not defined`);
    }
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
      headerName: "Account ID",
      editable: false,
      field: "chartOfAccountSerialNumber",
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
      headerName: "Supplier ID",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Title",
      editable: false,
      field: "supplierName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location ID",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Employee ID",
      editable: false,
      field: "employeeId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Employee Title",
      editable: false,
      field: "employeeName",
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
      headerName: "Narration",
      editable: true,
      field: "comments",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Budget Month",
      editable: true,
      field: "consumptionMonth",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "P.O.No.",
      editable: false,
      field: "purchaseOrderNumberId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "ad J V No.",
      editable: false,
      field: "adjestmentVoucherNumberid",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Total Amt",
      editable: true,
      field: "totalAmount",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Acc Title",
      editable: false,
      field: "taxAccTitle",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Acc ID",
      editable: false,
      field: "taxId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax %",
      editable: true,
      field: "taxPercentage",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Amt",
      editable: false,
      field: "taxAmount",
      cellEditor: "agNumberCellEditor",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "O. Tax Amt",
      editable: true,
      field: "otherTaxAmount",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: false,
      field: "amount",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Fine",
      editable: true,
      field: "fine",
      resizable: true,
      cellEditor: "agNumberCellEditor",
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
      this.cashpaymentReversibleForm.value.issueDate = value;
    }
    if (
      this.cashpaymentReversibleForm.value.userLocationId &&
      this.cashpaymentReversibleForm.value.issueDate
    ) {
      this.getVoucherNumber(
        "BRN",
        this.cashpaymentReversibleForm.value.issueDate,
        this.cashpaymentReversibleForm.value.userLocationId
      );
    }
  }
  isFieldInvalid(field: string): boolean {
    const control = this.cashpaymentReversibleForm.get(field);
    return control ? control.invalid && control.touched : false;
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
          this.cashpaymentReversibleForm
            .get("voucherNumber")
            .setValue(response);
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
          this.cashpaymentReversibleForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.cashpaymentReversibleForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "BRN",
            this.cashpaymentReversibleForm.value.issueDate,
            this.cashpaymentReversibleForm.value.userLocationId
          );
        },
      });
  }

  getAll() {
    debugger;
    this._financeModuleService
      .getAll(this.target, { linkedDocument: 1 })
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
        this.cashpaymentReversibleForm.patchValue({
          accountReconciliationDetails: this.rowData,
        });
        debugger;
        this._financeModuleService
          .create(this.cashpaymentReversibleForm.value, this.target)
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
    this.cashpaymentReversibleForm.patchValue({
      accountReconciliationDetails: this.rowData,
    });
    const updateData = {
      ...this.cashpaymentReversibleForm.value,
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
            this.rowData = response.generalPayment.generalPaymentDetails;
            this.cashpaymentReversibleForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.cashpaymentReversibleForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.cashpaymentReversibleForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.cashpaymentReversibleForm
              .get("totalChequeAmount")
              .setValue(this.dataForEdit.generalPayment.totalAmount);
            this.cashpaymentReversibleForm
              .get("totalTaxAmount")
              .setValue(this.dataForEdit.generalPayment.totalTaxAmount);
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
      this.cashpaymentReversibleForm.reset();
      this.cashpaymentReversibleForm.enable();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.cashpaymentReversibleForm.get("issueDate").setValue(this.today);
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
    this.cashpaymentReversibleForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  viewOnly(id: any) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.show(id);
    this.cashpaymentReversibleForm.disable();
    this.MinDate = null;
  }

  OpenBankPayment() {
    debugger;
    this.displaybankPayment = true;
    this.GetBankPayment();
  }

  GetBankPayment() {
    this._financeModuleService
      .getAll("GeneralPayment", { linkedDocument: 1 })
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
          this.bankPaymentData = response.items;
        },
      });
  }

  SelectBankPayment(id: number) {
    this._financeModuleService
      .getDataForEdit(id, "GeneralPayment")
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
          console.log(response);
          this.rowData = response.generalPaymentDetails;
          this.displaybankPayment = false;
          this.cashpaymentReversibleForm
            .get("generalPaymentId")
            .setValue(response.id);
          this.cashpaymentReversibleForm
            .get("totalTaxAmount")
            .setValue(response.totalTaxAmount);
          this.cashpaymentReversibleForm
            .get("totalChequeAmount")
            .setValue(response.totalAmount);
        },
      });
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
