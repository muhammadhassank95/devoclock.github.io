import { Component, Input } from "@angular/core";
import { FinanceModuleService } from "../../finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, finalize, throwError } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-depreciation-rate",
  templateUrl: "./depreciation-rate.component.html",
})
export class DepreciationRateComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  displayTracingModel: boolean = false;
  data!: any;
  count: number = 0;
  currentPage = 1;
  loading: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  dto = {
    skipCount: 0,
    maxCount: 5,
  };
  rowCount: number;
  isEditMode: boolean;
  isViewMode: boolean;
  dataForEdit: any;
  saving: boolean = false;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  @Input() rowData: any;
  depreciationRateForm: FormGroup;
  target = "DepreciationRate";
  suggestionModalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private _financeModuleService: FinanceModuleService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private suggestionService: BsModalService,
    private confirmationService?: ConfirmationService
  ) {
    this.depreciationRateForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      title: [""],
      depreciationRateDetails: [[]],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.onClose();
    this.VoucherRestriction("DRP");
  }

  onClose() {
    debugger;
    this.displayModal = false;
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

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.depreciationRateForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "DRP",
          this.depreciationRateForm.value.issueDate,
          value?.id
        );
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
      headerName: "",
      field: "addAccount1",
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
      headerName: "Account Dep Id",
      editable: false,
      field: "depreciationChartOfAccountSerialNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addAccount2",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Account Dep Title",
      editable: false,
      field: "depreciationChartOfAccountTitle",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Dep %",
      editable: true,
      field: "depreciationRatePercentage",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    switch (params.column["colId"]) {
      case "addAccount1":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount", 1);
        break;
      case "addAccount2":
        this.setParms = params;
        this.openSelectItem("ChartOfAccount", 2);
        break;
      default:
        break;
    }
  }

  openSelectItem(
    target: "ChartOfAccount" | "ChartOfAccount",
    opt,
    filterWiseChartOfAccTarget?: string
  ) {
    debugger;
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
      if (opt == 1) {
        this.setParms.data.chartOfAccountId = result.id.split("/")[0];
        this.setParms.data.chartOfAccountName = result.name;
        this.setParms.data.chartOfAccountSerialNumber = result.id.split("/")[1];
      }
      if (opt == 2) {
        this.setParms.data.depreciationChartOfAccountId =
          result.id.split("/")[0];
        this.setParms.data.depreciationChartOfAccountTitle = result.name;
        this.setParms.data.depreciationChartOfAccountSerialNumber =
          result.id.split("/")[1];
      }
      this.gridApi.refreshCells();
    });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.depreciationRateForm.value.issueDate = value;
    }
    if (
      this.depreciationRateForm.value.userLocationId &&
      this.depreciationRateForm.value.issueDate
    ) {
      this.getVoucherNumber(
        "DRP",
        this.depreciationRateForm.value.issueDate,
        this.depreciationRateForm.value.userLocationId
      );
    }
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
          this.depreciationRateForm.get("voucherNumber").setValue(response);
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
          this.depreciationRateForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.depreciationRateForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "DRP",
            this.depreciationRateForm.value.issueDate,
            this.depreciationRateForm.value.userLocationId
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
        this.depreciationRateForm.patchValue({
          depreciationRateDetails: this.rowData,
        });
        debugger;
        this._financeModuleService
          .create(this.depreciationRateForm.value, this.target)
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
    this.depreciationRateForm.patchValue({
      depreciationRateDetails: this.rowData,
    });
    const updateData = {
      ...this.depreciationRateForm.value,
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
      //   this.viewMode = false;
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
            this.rowData = response.depreciationRateDetails;
            this.depreciationRateForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.depreciationRateForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.depreciationRateForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            this.depreciationRateForm
              .get("title")
              .setValue(this.dataForEdit.title);
            this.getDefaultLocation(
              "Location",
              "locationName",
              "locationId",
              "this.dataForEdit.locationName"
            );
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
      this.depreciationRateForm.reset();
      this.depreciationRateForm.enable();
      this.depreciationRateForm.get("issueDate").setValue(this.today);
      this.MinDate = this.restrictionDto.creationRestrictionDate;
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

  // onAddRow() {
  //   const newItem: Record<string, any> = {};
  //   this.colDefs.forEach((colDef) => {
  //     if (colDef.field) {
  //       newItem[colDef.field] = null;
  //     }
  //   });
  //   // var array = [{
  //   //   coaId: '',
  //   //   coaName: ""
  //   // }]
  //   this.gridApi.applyTransaction({ add: [newItem] });
  //   this.rowCount = this.gridApi.getDisplayedRowCount();
  // }
  onAddRow() {
    debugger;
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

  isFieldInvalid(field: string): boolean {
    const control = this.depreciationRateForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  viewOnly(id: number) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.show(id);
    this.MinDate = null;
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
    this.isEditMode = true;
    this.isViewMode = false;
    this.show(id);
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
