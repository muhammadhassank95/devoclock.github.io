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
  selector: "app-journal-voucher",
  templateUrl: "./journal-voucher.component.html",
})
export class JournalVoucherComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  data!: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  count: number = 0;
  currentPage: number = 1;
  tableData: any[] = [];
  protected setParms;
  target: string = "JournalVoucher";
  isEditMode: boolean;
  isViewMode: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
  };
  saving: boolean = false;
  protected gridApi: GridApi;
  rowSelection: string;
  loading: boolean = false;
  jvFormGroup: FormGroup;
  @Input() rowData: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  rowCount: number;
  coaIdForSubledger: string;
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
    {
      headerName: "Account Title",
      editable: false,
      field: "chartOfAccountName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Supplier Id",
      editable: false,
      field: "supplierSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addSupplier",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
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
      headerName: "For Location Name",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addLocation",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },

    {
      headerName: "For Location",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region Name",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "",
    //   field: "addRegion",
    //   width: 20,
    //   editable: false,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   resizable: false,
    //   suppressSizeToFit: true,
    // },

    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Employee Id",
      editable: false,
      field: "employeeErpId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addEmployee",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
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
      headerName: "Cost Center Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addCostCenter",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center id",
      editable: false,
      field: "costCenterId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Id",
      editable: false,
      field: "projectId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addProject",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Name",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Line Narration",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Invoice No",
      editable: true,
      field: "invoiceNo",
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
          return moment(date).format("YYYY-MMM"); // Format date as yyyy-mm-dd
        }
        return "";
      },
    },
    {
      headerName: "Budget Month",
      editable: true,
      field: "consumptionMonth",
      resizable: true,
      cellEditor: "agDateCellEditor", // Date input
      suppressSizeToFit: true,
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          // return date.toISOString().split('T')[0];
          return moment(date).format("YYYY-MMM"); // Format date as yyyy-mm-dd
        }
        return "";
      },
    },
    {
      headerName: "",
      field: "addAdjestmentVNoId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Adj.Voucher No",
      editable: false,
      field: "adjustmentVoucherNo",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Debit",
      editable: true,
      field: "debit",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
    {
      headerName: "Credit",
      editable: true,
      field: "credit",
      resizable: true,
      cellEditor: "agNumberCellEditor",
      suppressSizeToFit: true,
    },
  ];

  journalVoucherDto: JournalVoucherDto = new JournalVoucherDto();

  constructor(
    private _financeModuleService: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private formBuilder: FormBuilder,
    private suggestionService: BsModalService,
    private confirmationService: ConfirmationService
  ) {
    this.jvFormGroup = formBuilder.group({
      totalDebit: 0,
      id: 0,
      totalCredit: 0,
      issueDate: ["", Validators.required],
      userLocationId: [null, Validators.required],
      remarks: "",
      isActive: false,
      voucherNumber: [null, Validators.required],
      userLocationName: [null, Validators.required],
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
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._financeModuleService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;
        this.tableData = response.items;
        this.count = response.totalCount;
        this.loading = false;
      },
    });
  }

  getAll() {
    this.loading = true;
    this._financeModuleService
      .getAll(this.target)
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
    if (this.jvFormGroup.disabled) return;
    switch (params.column["colId"]) {
      case "addAccount":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount");
        break;
      case "addSupplier":
        this.setParms = params;
        this.openSelectItem("Subledger", "Subledger");
        break;
      case "addLocation":
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      // case "addRegion":
      //   this.setParms = params;
      //   this.openSelectItem("Region");
      //   break;
      case "addEmployee":
        this.setParms = params;
        this.openSelectItem("Employee");
        break;
      case "addCostCenter":
        this.setParms = params;
        this.openSelectItem("CostCenter");
        break;
      case "addProject":
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      case "addTaxId":
        this.setParms = params;
        this.openSelectItem("Tax", "Tax");
        break;
      default:
        break;
    }
  }
  cellValueChanged(params) {
    let field = params.colDef.field;
    if (field == "debit") {
      let totalDebit = 0;
      this.gridApi.forEachNode((node, index) => {
        totalDebit += node.data.debit;
      });
      this.jvFormGroup.patchValue({ totalDebit });
    }
    if (field == "credit") {
      let totalCredit = 0;
      this.gridApi.forEachNode((node, index) => {
        totalCredit += node.data.credit;
      });
      this.jvFormGroup.patchValue({ totalCredit });
    }
  }
  openSelectItem(
    target:
      | "ChartOfAccount"
      | "Location"
      // | "Region"
      | "Employee"
      | "Subledger"
      | "CostCenter"
      | "Project"
      | "Tax",
    filterWiseChartOfAccTarget?: string
  ) {
    debugger;
    const initialState: any = {
      target: target,
      coaIdForSubledger: this.coaIdForSubledger,
    };
    if (filterWiseChartOfAccTarget === "Subledger") {
      initialState.chartOfAccountSubLedgerType =
        "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18";
    } else if (filterWiseChartOfAccTarget) {
      initialState.filterWiseChartOfAccTarget = filterWiseChartOfAccTarget;
    }
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );
    debugger;
    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      if (target == "ChartOfAccount") {
        this.setParms.data.chartOfAccountId = result?.id.split("/")[0];
        this.setParms.data.chartOfAccountName = result?.name;
        this.setParms.data.chartOfAccountSerialNumber =
          result?.id.split("/")[1];
        this.coaIdForSubledger = result.id.split("/")[0];
      } else if (target == "Location") {
        debugger;
        this.setParms.data.locationId = +result?.id;
        this.setParms.data.locationName = result?.name;
      } else if (target == "Subledger") {
        this.setParms.data.supplierId = result?.id;
        this.setParms.data.supplierName = result?.title;
        this.setParms.data.supplierSerialNumber = result.serialNumber;
        this.setParms.data.chartOfAccountSerialNumber =
          result.chartOfAccountSerialNumber;
        this.setParms.data.chartOfAccountId = result.chartOfAccountId;
        this.setParms.data.chartOfAccountName = result.chartOfAccountName;
      } else if (target == "Employee") {
        this.setParms.data.employeeErpId = result?.id;
        this.setParms.data.employeeId = result?.additional;
        this.setParms.data.employeeName = result?.name;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result?.id;
        this.setParms.data.costCenterName = result?.name;
        // } else if (target == "Region") {
        //   this.setParms.data.regionId = +result?.id;
        //   this.setParms.data.regionName = result?.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result?.id;
        this.setParms.data.projectName = result?.name;
      } else if (target == "Tax") {
        this.setParms.data.taxId = result?.id;
        this.setParms.data.taxAccTitle = result?.name;
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
    let defaultFormValues = {
      totalDebit: null,
      id: 0,
      totalCredit: null,
      issueDate: "",
      userLocationId: null,
      remarks: "",
      isActive: false,
      voucherNumber: null,
      userLocationName: null,
    };
    this.jvFormGroup.patchValue(defaultFormValues);
    this.jvFormGroup.enable();
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.jvFormGroup.get("issueDate").setValue(this.today);
    this.MinDate = this.restrictionDto.creationRestrictionDate;
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

    let journalVoucherDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let journalVoucherDetailObj: any = {};
      Object.keys(node.data).forEach((key) => {
        journalVoucherDetailObj[key] = node.data[key];
        // if (key === "debit" || key === "credit") {
        //   journalVoucherDetailObj[key] = 0;
        // }
      });
      journalVoucherDetailObj.journalVoucherInfoId = 0;
      journalVoucherDetails.push(journalVoucherDetailObj);
    });
    if (this.jvFormGroup.value.id > 0) {
      this.handleUpdate(journalVoucherDetails);
    } else {
      this.handleCreate(journalVoucherDetails);
    }
  }

  handleCreate(journalVoucherDetails) {
    this._financeModuleService
      .create({ ...this.jvFormGroup.value, journalVoucherDetails }, this.target)
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

  handleUpdate(journalVoucherDetails) {
    this._financeModuleService
      .update({ ...this.jvFormGroup.value, journalVoucherDetails }, this.target)
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
        this.jvFormGroup.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id || null,
        });
        if (this.jvFormGroup.value.issueDate) {
          this.MakeVoucher();
        }
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  MakeVoucher(value?: Date) {
    if (value) {
      this.jvFormGroup.value.issueDate = value;
    }
    if (
      this.jvFormGroup.value.issueDate &&
      this.jvFormGroup.value.userLocationId
    ) {
      this._financeModuleService
        .getVoucherNumber(
          "JournalVoucher",
          "JV",
          moment(this.jvFormGroup.value.issueDate).format("YYYY-MM-DD"),
          this.jvFormGroup.value.userLocationId
        )
        .subscribe((voucherNumber) => {
          this.jvFormGroup.patchValue({ voucherNumber });
        });
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    debugger;
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
          this.jvFormGroup
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.jvFormGroup.get("userLocationId").setValue(response.items[0].id);
          this.MakeVoucher();
        },
      });
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
            this.displayModal = true;
            debugger;
            this.jvFormGroup.patchValue({
              ...response,
              issueDate: new Date(response.issueDate),
            });
            this.rowData = response.journalVoucherDetails;
          },
        });
    } else {
      debugger;
      this.jvFormGroup.enable();
      this.displayModal = true;
      this.rowData = [];
    }
  }

  viewOnly(id: any) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.show(id);
    this.jvFormGroup.disable();
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
    this.jvFormGroup.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  approve(id: number) {
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
  update() {}

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
