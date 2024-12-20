import { Component, OnInit, ViewChild, Injector } from "@angular/core";
import { CapitalizationPolicy } from "../Shared/DTOs/capitalization-policy";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";
import { RestrictionService } from "@app/main/budget/shared/services/restriction.service";
import { RestrictionDto } from "@app/main/budget/shared/Dtos/restriction-dto";
import { mapRestrictionDto } from "@shared/Utials/utils";
import { LoanManagementService } from "@app/main/hrm/shared/services/loan-management.service";

@Component({
  selector: "app-capitalization-policy",
  templateUrl: "./capitalization-policy.component.html",
})
export class CapitalizationPolicyComponent
  extends AppComponentBase
  implements OnInit
{
  restrictionDto: RestrictionDto = new RestrictionDto();
  permissions: PermissionsDto;
  capitalizationPolicy: CapitalizationPolicy = new CapitalizationPolicy();
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  today: Date = new Date();
  MinDate: Date = new Date();
  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  viewMode: boolean;
  saving: boolean;
  target = "CapitalizationPolicy";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  constructor(
    injector: Injector,
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,
    private _restrictionService: RestrictionService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getAll();
    this.permissions = new PermissionsDto("CapitalizationPolicy");
    this.VoucherRestriction("CP");
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
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._restrictionService
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
          var locationData = response.items[0];
          this.capitalizationPolicy.userLocationId = locationData.id;

          this.capitalizationPolicy.userLocationName = locationData.name;

          this.getVoucherNumber();
        },
      });
  }

  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * this.filterDto.maxCount;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  getAll() {
    this._basicTypeService
      .getAll(this.target, this.filterDto)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error?.error?.error?.message,
            life: 2000,
          });
          return throwError(error?.error?.error?.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.tableData = response.items;
          this.count = response.totalCount;
        },
      });
  }
  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    // this.salesInoviceForm.disable();
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
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  delete(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService
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
  ApproveDocument(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService
          .ApproveDocument(id, this.target)
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
                  detail: "Approve Successfully",
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
    this.rowData = [];
    if (id) {
      // this.editMode = true;
      this._basicTypeService
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

            this.capitalizationPolicy = response;
            this.capitalizationPolicy.issueDate = new Date(response.issueDate);
            this.capitalizationPolicy.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.rowData = response.capitalizationPolicyDetails;

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
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.editMode = false;
      this.viewMode = false;
      this.displayModal = true;
      this.capitalizationPolicy = new CapitalizationPolicy();
      this.capitalizationPolicy.issueDate = this.today;
      this.capitalizationPolicy.isActive = true;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
    }
  }

  save() {
    this.saving = true;
    if (!this.capitalizationPolicy.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "voucherNumber is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.capitalizationPolicy.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "issueDate is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.capitalizationPolicy.willEffectFromDate) {
      this.messageService.add({
        severity: "error",
        detail: "weFromDate is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        ItemCategoryId: node.data.itemCategoryId,
        itemCategoryName: node.data.itemCategoryName,
        itemBrandId: node.data.itemBrandId,
        itemBrandName: node.data.itemBrandName,
        minimumValue: node.data.minimumValue,
      };
      tempArr.push(tempObj);
    });
    this.capitalizationPolicy.capitalizationPolicyDetails = tempArr;
    this._basicTypeService
      .create(this.capitalizationPolicy, this.target)
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
            detail: "SavedSuccessfully",
            life: 2000,
          });
          this.getAll();
          this.saving = false;
          this.displayModal = false;
        },
      });
  }

  update() {
    this.saving = true;

    this._basicTypeService
      .update(this.capitalizationPolicy, this.target)
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
      headerName: "Item Category Id",
      editable: false,
      field: "itemCategoryId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addItemCategory",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Category Title",
      editable: false,
      field: "itemCategoryName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Brand Id",
      editable: false,
      field: "itemBrandId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addItemBrand",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Brand Title",
      editable: false,
      field: "itemBrandName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Min Value",
      editable: true,
      field: "minimumValue",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

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
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItemCategory":
        debugger;
        this.setParms = params;
        this.openSelectItem("FixedCategory");
        break;
      case "addItemBrand":
        debugger;
        this.setParms = params;
        this.openSelectItem("ItemBrand");
        break;
      default:
        break;
    }
  }

  // cellValueChanged(params) {
  //   debugger
  //   if (params.colDef.field == "qtyRequired" || params.colDef.field == "costRate") {
  //     if (params.data.qtyRequired && params.data.costRate) {
  //       params.data.totalAmount = params.data.qtyRequired * params.data.costRate
  //       this.gridApi.refreshCells()
  //     }
  //   }
  // }

  openSelectItem(target: "FixedCategory" | "ItemBrand") {
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
      if (target == "FixedCategory") {
        this.setParms.data.itemCategoryId = +result.id.split("/")[0];
        this.setParms.data.itemCategoryName = result.name;
      } else if (target == "ItemBrand") {
        this.setParms.data.itemBrandId = +result.id.split("/")[0];
        this.setParms.data.itemBrandName = result.name;
      }

      this.gridApi.refreshCells();
    });
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.capitalizationPolicy.userLocationId = +value.id;
        this.capitalizationPolicy.userLocationName = value.name;
        this.getVoucherNumber();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.capitalizationPolicy.issueDate = value;
    }
    if (
      this.capitalizationPolicy.userLocationId &&
      this.capitalizationPolicy.issueDate
    ) {
      this.getVoucherNumber();
    }
  }
  getVoucherNumber() {
    debugger;
    this._restrictionService
      .getVoucherNumber(
        this.target,
        "CP",
        this.capitalizationPolicy.issueDate,
        this.capitalizationPolicy.userLocationId
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
          this.capitalizationPolicy.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.DocOrVocNumber = inputValue;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
}
