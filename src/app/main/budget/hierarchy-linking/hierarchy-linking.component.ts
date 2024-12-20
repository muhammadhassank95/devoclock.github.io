import { Component, Input, ViewChild } from "@angular/core";
import { JournalVoucherDto } from "../../finance/Shared/Dtos/journalVoucherDto";
import { FinanceModuleService } from "../../finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, map, Observable, throwError } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { SuggestionLookupTableModaLService } from "@shared/servicesAndDtos/Services/suggestion-lookup-table-moda-l.service";

@Component({
  selector: "app-hierarchy-linking",
  templateUrl: "./hierarchy-linking.component.html",
})
export class HierarchyLinkingComponent {
  locationDropdown: any[] = [];
  locationSelectedItem: any;
  costCenterDropdown: any[] = [];
  costCenterSelectedItem: any;
  projectDropdown: any[] = [];
  projectSelectedItem: any;
  restrictionDto: RestrictionDto = new RestrictionDto();
  displayModal: boolean = false;
  data!: any;
  today: Date = new Date();
  MinDate: Date = new Date();
  count: number = 0;
  currentPage: number = 1;
  tableData: any[] = [];
  protected setParms;
  target: string = "HierarchyLinking";
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
      headerName: "Location Id",
      editable: false,
      field: "locationId",
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
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "MBU Id",
    //   editable: false,
    //   field: "mbuId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "",
      field: "addMbu",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "MBU Title",
      editable: false,
      field: "mbuName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Cluster Id",
    //   editable: false,
    //   field: "clusterId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "",
      field: "addCluster",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },

    {
      headerName: "Cluster Title",
      editable: false,
      field: "clusterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region Id",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "",
      field: "addRegion",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },

    {
      headerName: "Region Title",
      editable: false,
      field: "regionName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Sub Region Id",
    //   editable: false,
    //   field: "subRegionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "",
      field: "addSubRegion",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "SubRegion Title",
      editable: false,
      field: "subRegionName",
      resizable: true,
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
    private confirmationService: ConfirmationService,
    private _suggestionLookUpService: SuggestionLookupTableModaLService
  ) {
    this.jvFormGroup = formBuilder.group({
      id: 0,
      projectId: ["", Validators.required],
      projectName: [""],
      issueDate: ["", Validators.required],
      costCenterId: ["", Validators.required],
      costCenterName: [""],
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
    this.fetchDropdownData('Location').subscribe((items) => (this.locationDropdown = items));
    this.fetchDropdownData('CostCenter').subscribe((items) => (this.costCenterDropdown = items));
    this.fetchDropdownData('Project').subscribe((items) => (this.projectDropdown = items));
  }

  fetchDropdownData(target: string, limit: number = 100, offset: number = 0): Observable<any[]> {
      return this._suggestionLookUpService.getAll(offset, limit, '', target, '').pipe(
        map((response: any) => {
          if (response && response.items) {
              return response.items.map((item: any) => ({
                id: item.id,
                name: item.name,
              }));
          } else {
            console.error(`Invalid response format for ${target}: `, response);
            return [];
          }
        })
      );
    }
  
    onDropdownChange(event: any, title: string){
      const value = event.value;
      if(value){
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
          case "Project":
            this.jvFormGroup.patchValue({
              projectName: value.name,
              projectId: +value.id || null,
            });
            break;
          case "CostCenter":
            this.jvFormGroup.patchValue({
              costCenterName: value.name,
              costCenterId: +value.id || null,
            });
            break;
          default:
            alert(`${title} is not defined`);
        }
      }
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
    // if (this.jvFormGroup.disabled) return;
    switch (params.column["colId"]) {
      case "addCluster":
        this.setParms = params;
        this.openSelectItem("Cluster");
        break;
      case "addLocation":
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "addRegion":
        this.setParms = params;
        this.openSelectItem("Region");
        break;
      case "addSubRegion":
        this.setParms = params;
        this.openSelectItem("SubRegion");
        break;
      case "addCostCenter":
        this.setParms = params;
        this.openSelectItem("CostCenter");
        break;
      case "addProject":
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      case "addMbu":
        this.setParms = params;
        this.openSelectItem("MBU");
        break;
      default:
        break;
    }
  }
  openSelectItem(
    target:
      | "Cluster"
      | "Location"
      | "Region"
      | "SubRegion"
      | "MBU"
      | "CostCenter"
      | "Project",
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
      if (target == "Cluster") {
        this.setParms.data.clusterId = +result?.id;
        this.setParms.data.clusterName = result?.name;
      } else if (target == "Location") {
        debugger;
        this.setParms.data.locationId = +result?.id;
        this.setParms.data.locationName = result?.name;
      } else if (target == "SubRegion") {
        this.setParms.data.subRegionId = +result?.id;
        this.setParms.data.subRegionName = result?.name;
      } else if (target == "MBU") {
        this.setParms.data.mbuId = +result?.id;
        this.setParms.data.mbuName = result?.name;
      } else if (target == "CostCenter") {
        this.setParms.data.costCenterId = +result?.id;
        this.setParms.data.costCenterName = result?.name;
      } else if (target == "Region") {
        this.setParms.data.regionId = +result?.id;
        this.setParms.data.regionName = result?.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result?.id;
        this.setParms.data.projectName = result?.name;
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
      id: 0,
      issueDate: "",
      userLocationId: null,
      costCenterId: null,
      costCenterName: "",
      projectId: null,
      projectName: "",
      remarks: "",
      isActive: false,
      voucherNumber: null,
      userLocationName: null,
    };
    this.jvFormGroup.patchValue(defaultFormValues);
    this.jvFormGroup.enable();
    this.isEditMode = false;
    this.isViewMode = false;
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

    let hierarchyLinkingDetails = [];
    this.gridApi.forEachNode((node, index) => {
      let journalVoucherDetailObj: any = {};
      Object.keys(node.data).forEach((key) => {
        journalVoucherDetailObj[key] = node.data[key];
        // if (key === "debit" || key === "credit") {
        //   journalVoucherDetailObj[key] = 0;
        // }
      });
      journalVoucherDetailObj.journalVoucherInfoId = 0;
      hierarchyLinkingDetails.push(journalVoucherDetailObj);
    });
    if (this.jvFormGroup.value.id > 0) {
      this.handleUpdate(hierarchyLinkingDetails);
    } else {
      this.handleCreate(hierarchyLinkingDetails);
    }
  }

  handleCreate(hierarchyLinkingDetails) {
    this._financeModuleService
      .create(
        { ...this.jvFormGroup.value, hierarchyLinkingDetails },
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

  handleUpdate(hierarchyLinkingDetails) {
    this._financeModuleService
      .update(
        {
          ...this.jvFormGroup.value,
          hierarchyLinkingDetails,
        },
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
        this.jvFormGroup.patchValue({
          userLocationName: value.name,
          userLocationId: +value.id || null,
        });
        if (this.jvFormGroup.value.issueDate) {
          this.MakeVoucher();
        }
        break;
      case "Project":
        this.jvFormGroup.patchValue({
          projectName: value.name,
          projectId: +value.id || null,
        });
        break;
      case "CostCenter":
        this.jvFormGroup.patchValue({
          costCenterName: value.name,
          costCenterId: +value.id || null,
        });
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
          "MBM",
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
            this.rowData = response.hierarchyLinkingDetails;
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
          this.MinDate = this.restrictionDto.editRestrictionDate;
          if (response.status === "APPROVED" && this.isEditMode) {
            this.jvFormGroup.disable();
          } else {
            this.jvFormGroup.enable();
          }
          this.jvFormGroup.patchValue({
            ...response,
            issueDate: new Date(response.issueDate),
          });
          this.rowData = response.hierarchyLinkingDetails;
          this.displayModal = true;
        },
      });
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
