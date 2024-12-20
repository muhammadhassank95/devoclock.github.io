import { Component, Input, ViewChild } from "@angular/core";
import { JournalVoucherDto } from "../../finance/Shared/Dtos/journalVoucherDto";
import { FinanceModuleService } from "../../finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-temp-journal-voucher",
  templateUrl: "./temp-journal-voucher.component.html",
})
export class TempJournalVoucherComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  data!: any;
  count: number;
  tableData: any[] = [];
  protected setParms;
  skipCount: number = 0;
  target: string = "InterimJournalVoucher";
  today: Date = new Date();
  MinDate: Date = new Date();
  currentPage = 1;
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  isEditMode: boolean;
  isViewMode: boolean;
  saving: boolean = false;
  protected gridApi: GridApi;
  rowSelection: string;
  tempjvFormGroup: FormGroup;
  @Input() rowData: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  rowCount: number;

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
      headerName: "Account Id",
      editable: false,
      field: "chartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addAccount",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Account Title",
    //   editable: false,
    //   field: "chartOfAccountName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Line Narration",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Invoice Date",
      editable: true,
      field: "invoiceDate",
      resizable: true,
      cellEditor: "agDateCellEditor", // Date input
      suppressSizeToFit: true,
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          // return date.toISOString().split('T')[0];
          return moment(date).format("YYYY-MM-DD"); // Format date as yyyy-mm-dd
        }
        return "";
      },
    },
    {
      headerName: "invoiceNumber",
      editable: true,
      field: "invoiceNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: true,
      field: "totalDebit",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Credit",
      editable: true,
      field: "totalCredit",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
  ];

  journalVoucherDto: JournalVoucherDto = new JournalVoucherDto();

  constructor(
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private _restrictionService: RestrictionService,
    private suggestionService: BsModalService,
    private confirmationService: ConfirmationService
  ) {
    this.tempjvFormGroup = formBuilder.group({
      id: 0,
      issueDate: ["", Validators.required],
      userLocationId: [null, Validators.required],
      totalCredit: null,
      totalDebit: null,
      remarks: "",
      // isActive: false,
      voucherNumber: [null, Validators.required],
      userLocationName: [""],
    });
  }

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  ngOnInit(): void {
    this.getAll();
    this.VoucherRestriction("JV");
  }

  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * this.dto.maxCount;
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
    this.loading = true;
    this._financeModuleService
      .getAll(this.target, this.dto)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(
            () =>
              new Error(
                error.error.error.message || "An unknown error occurred"
              )
          );
        })
      )
      .subscribe((response) => {
        this.tableData = response.items;
        this.count = response.totalCount;
      });
  }

  cellClicked(params) {
    if (this.tempjvFormGroup.disabled) return;
    switch (params.column["colId"]) {
      case "addAccount":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount");
        break;

      default:
        break;
    }
  }
  cellValueChanged(params) {
    this.calculateDebitAndCredit();
  }
  openSelectItem(
    target: "ChartOfAccount",

    filterWiseChartOfAccTarget?: string
  ) {
    const initialState: any = {
      target: target,
    };
    if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountId = result.id.split("/")[0];
        this.setParms.data.chartOfAccountName = result.name;
        this.setParms.data.chartOfAccountSerialNumber = result.id.split("/")[1];
      }

      this.gridApi.refreshCells();
    });
  }

  openCreateModal() {
    if (!this.restrictionDto.isCreationAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Creation Restricted",
      });
      return;
    }
    this.rowData = [];
    this.MinDate = this.restrictionDto.creationRestrictionDate;
    let defaultFormValues = {
      totalDebit: null,
      id: 0,
      totalCredit: null,
      remarks: "",
      isActive: false,
      voucherNumber: null,
    };
    this.tempjvFormGroup.patchValue(defaultFormValues);
    this.tempjvFormGroup.enable();
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.tempjvFormGroup.get("issueDate").setValue(this.today);
    this.isEditMode = false;
    this.isViewMode = false;
    this.displayModal = true;
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
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
    this.calculateDebitAndCredit();
  }

  save() {
    this.saving = true;
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
      });
      this.saving = false;
      return;
    }

    let interimJournalVoucherDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let journalVoucherDetailObj: any = {};
      Object.keys(node.data).forEach((key) => {
        journalVoucherDetailObj[key] = node.data[key];
        if (key === "totalDebit" || key === "totalCredit") {
          journalVoucherDetailObj[key] = 0;
        }
      });
      // journalVoucherDetailObj.journalVoucherInfoId = 0;
      interimJournalVoucherDetails.push(journalVoucherDetailObj);
    });
    if (this.tempjvFormGroup.value.id > 0) {
      this.handleUpdate(interimJournalVoucherDetails);
    } else {
      this.handleCreate(interimJournalVoucherDetails);
    }
  }

  handleCreate(interimJournalVoucherDetails) {
    debugger;
    this._financeModuleService
      .create(
        { ...this.tempjvFormGroup.value, interimJournalVoucherDetails },
        this.target
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Created Successfully",
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  handleUpdate(interimJournalVoucherDetails) {
    debugger;
    this._financeModuleService
      .update(
        { ...this.tempjvFormGroup.value, interimJournalVoucherDetails },
        this.target
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.error.message,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Updated Successfully",
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  delete(id: number) {
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
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: error.error.error.message,
              });
              return throwError(() => new Error(error.error.message));
            })
          )
          .subscribe({
            next: (response) => {
              if (response) {
                this.messageService.add({
                  severity: "info",
                  summary: "Confirmed",
                  detail: "Deleted Successfully",
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
      case "Location":
        this.tempjvFormGroup.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id || null,
        });
        if (this.tempjvFormGroup.value.issueDate) {
          this.MakeVoucher();
        }
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.tempjvFormGroup.value.issueDate = value;
    }
    if (
      this.tempjvFormGroup.value.issueDate &&
      this.tempjvFormGroup.value.userLocationId
    ) {
      this._financeModuleService
        .getVoucherNumber(
          "JournalVoucher",
          "JV",
          moment(this.tempjvFormGroup.value.issueDate).format("YYYY-MM-DD"),
          this.tempjvFormGroup.value.userLocationId
        )
        .subscribe((voucherNumber) => {
          this.tempjvFormGroup.patchValue({ voucherNumber });
        });
    }
  }

  show(id?: number, viewOnly?: boolean) {
    if (id) {
      this.loading = true;
      this._financeModuleService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
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
            debugger;
            this.displayModal = true;
            this.tempjvFormGroup.patchValue({
              ...response,
              issueDate: new Date(response.issueDate),
            });
            this.rowData = response.interimJournalVoucherDetails;
          },
        });
    } else {
      this.tempjvFormGroup.enable();
      this.displayModal = true;
      this.rowData = [];
    }
  }

  approve(id: number) {
    if (!this.restrictionDto.isApprovalAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Approve Restricted",
      });
      return;
    }
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.loading = true;
        this._financeModuleService
          .approve(id, this.target)
          .pipe(
            finalize(() => {
              this.loading = false;
            }),
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
              if (response) {
                this.messageService.add({
                  severity: "success",
                  summary: "Confirmed",
                  detail: "Approved Successfully",
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
  }
  calculateDebitAndCredit() {
    let totalCredit = 0;
    let totalDebit = 0;
    if (this.gridApi) {
      this.gridApi.forEachNode((node) => {
        if (node.data.totalCredit) {
          totalCredit += Number(node.data.totalCredit);
        }
        if (node.data.totalDebit) {
          totalDebit += Number(node.data.totalDebit);
        }
      });
      this.tempjvFormGroup.get("totalCredit").setValue(totalCredit);
      this.tempjvFormGroup.get("totalDebit").setValue(totalDebit);
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
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
          this.tempjvFormGroup
            .get("userLocationName")
            ?.setValue(response.items[0].shortName);
          this.tempjvFormGroup
            .get("userLocationId")
            ?.setValue(response.items[0].id);
          this.MakeVoucher();
        },
      });
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
  viewOnly(id: any) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.show(id);
    this.tempjvFormGroup.disable();
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
    this.isEditMode = true;
    this.isViewMode = false;
    this.show(id);
    this.tempjvFormGroup.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
}
