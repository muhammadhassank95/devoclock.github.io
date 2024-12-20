import { Component, ViewChild, Injector, OnInit } from "@angular/core";
import { ItemLinking } from "../Shared/DTOs/item-linking";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";

@Component({
  selector: "app-item-linking",
  templateUrl: "./item-linking.component.html",
})
export class ItemLinkingComponent extends AppComponentBase implements OnInit {
  itemLinkingDto: ItemLinking = new ItemLinking();
  permissions: PermissionsDto;

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  target = "InventoryItemLinking";
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  rowData: any[] = [];
  serialNumber: string;
  protected setParms;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  currentPage: number = 1;
  filterDto = {
    skipCount: 0,
    maxCount: 10,
    id: "",
  };
  loading: boolean = false;

  constructor(
    injector: Injector,
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.permissions = new PermissionsDto("InventoryItemLinking");
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this._basicTypeService
      .getAll(this.target, this.filterDto)
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
          this.tableData = response.items;
          this.count = response.totalCount;
          this.loading = false;
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

  show(id?: number) {
    if (id) {
      this.editMode = true;
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
            this.itemLinkingDto = response;
            this.rowData = response.inventoryItemLinkingDetails;
            this.displayModal = true;
          },
        });
    } else {
      this.editMode = false;
      this.displayModal = true;
      this.itemLinkingDto = new ItemLinking();
      this.rowData = [];
      this.itemLinkingDto.isActive = true;
    }
  }

  save() {
    this.saving = true;
    if (!this.itemLinkingDto.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "costCenterId is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.itemLinkingDto.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "projectId is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    // if (!this.itemLinkingDto.locationId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "locationId is Required",
    //     life: 2000,
    //   });
    //   this.saving = false;
    //   return;
    // }
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.itemLinkingDto.items = [];
    this.gridApi.forEachNode((node, index) => {
      this.itemLinkingDto.items.push(+node.data.id);
    });
    this._basicTypeService
      .create(this.itemLinkingDto, this.target)
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
          return throwError(error.message);
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
    this.itemLinkingDto.items = [];
    this.gridApi.forEachNode((node, index) => {
      this.itemLinkingDto.items.push(+node.data.id);
    });
    this._basicTypeService
      .update(this.itemLinkingDto, this.target)
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
          return throwError(error.message);
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
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "CostCenter":
        debugger;
        this.itemLinkingDto.costCenterId = value.id;
        this.itemLinkingDto.costCenterName = value.name;
        break;
      case "Project":
        debugger;
        this.itemLinkingDto.projectId = value.id;
        this.itemLinkingDto.projectName = value.name;
        break;
      // case "Location":
      //   debugger
      //   this.itemLinkingDto.locationId = value.id
      //   this.itemLinkingDto.locationName = value.name
      //   break;
      default:
        alert(`${title} is not defined`);
    }
    // this.updateNameField()
  }

  // updateNameField() {
  //   this.itemLinkingDto.name = `${this.itemLinkingDto.costCenterName || ''} ${this.itemLinkingDto.projectName || ''}`.trim();
  // }
  getSerialNumber(id: any) {
    this._basicTypeService
      .GetCategoryCount(id)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.message,
            life: 2000,
          });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          // this.stockItemDto.categoryId = response;
          // this.stockItemDto.serialNumber = `${id}${this.stockItemDto.categoryId}`;
          debugger;
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
      headerName: "ID",
      editable: false,
      field: "id",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Serial Number",
      editable: false,
      field: "additional",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addStockItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Title",
      editable: false,
      field: "name",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }

  onAddRow() {
    const newItem: Record<string, any> = {};
    this.colDefs.forEach((colDef) => {
      if (colDef.field) {
        // Ensure field is defined
        newItem[colDef.field] = "";
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
      case "addStockItem":
        this.setParms = params;
        this.openSelectLicenseType();
        break;
      default:
        break;
    }
  }

  openSelectLicenseType() {
    debugger;
    const initialState: any = {
      target: "InventoryItem",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      // let isDuplicate = false;
      // this.gridApi.forEachNode((node) => {
      //   if (node.data.id === result.id) {
      //     isDuplicate = true;
      //   }
      // });
      // if (isDuplicate) {
      //   this.messageService.add({
      //     severity: "error",
      //     summary: "Duplicate Item",
      //     detail: "This item is already added.",
      //     life: 2000,
      //   });
      //   return;
      // }
      this.setParms.data.id = +result.id;
      this.setParms.data.additional = result.serialNumber;
      this.setParms.data.name = result.name;
      this.gridApi.refreshCells();
    });
  }
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * this.filterDto.maxCount;
    this.getAll();
  }
  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.filterDto.id = inputValue;
    this.getAll();
  }
}
