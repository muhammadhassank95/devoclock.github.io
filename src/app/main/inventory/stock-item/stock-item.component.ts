import { InventoryitemService } from "./../Shared/Services/inventoryitem.service";
import { CategoryId } from "./../Shared/DTOs/category-id";
import { Component, Input, SimpleChanges, ViewChild } from "@angular/core";
import { InventoryItem } from "../Shared/DTOs/stock-item";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError, forkJoin, of } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { SubCategoryId } from "../Shared/DTOs/sub-category-id";
import { ItemType } from "../Shared/DTOs/item-type";
import { Table } from "primeng/table";

@Component({
  selector: "app-stock-item-id",
  templateUrl: "./stock-item.component.html",
})
export class StockItemComponent {
  stockItemDto: InventoryItem = new InventoryItem();
  rowData: any;

  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowSelection: string;
  loading: boolean;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  totalAmount: number;
  tableData: any;
  serialNumber: string;
  filterBySerialNumber: string;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  serialNumber1: string;
  serialNumber2: string;
  serialNumber3: string;
  serialNumber4: string;
  serialNumber5: string;
  saving: boolean;
  target = "InventoryItem";
  // itemType: "StockItem";
  @Input() type;
  maxcount = 10;
  skipcount = 0;

  // itemTypes = [{ name: "FixedItem" }, { name: "StockItem" }]

  stockNames = [
    {
      name: "R/P Stock A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "W.I.P A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Consumption A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "F.G Stock A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Cost of Sale A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Sale A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
  ];
  fixedNames = [
    {
      name: "Capitalization A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Acc Dep A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Deprecation A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Non-Capitalization A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Other 1 A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
    {
      name: "Other 2 A/c",
      chartOfAccountId: 0,
      chartOfAccountName: "",
    },
  ];

  pickerID1: number;
  pickerName1: string;

  constructor(
    private _basicTypeService: SetupsService,
    private _inventoryitemService: InventoryitemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    debugger;
    this.loading = true;
    this._inventoryitemService
      .getAll(
        this.target,
        this.type,
        this.maxcount,
        this.skipcount,
        this.filterBySerialNumber
      )
      .pipe(
        finalize(() => { }),
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

  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (changes.type) {
      this.stockItemDto.itemType = this.type;
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
        this._basicTypeService
          .delete(id, this.target)
          .pipe(
            finalize(() => { }),
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
    debugger;
    if (id) {
      this.editMode = true;
      this._basicTypeService
        .getDataForEdit(id, this.target)
        .pipe(
          finalize(() => { }),
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
            this.stockItemDto = response;
            if (response.itemType == "StockItem") {
              debugger;
              this.stockNames = response.itemFinancialIntegrations;
            } else {
              debugger;
              this.fixedNames = response.itemFinancialIntegrations;
            }
            this.displayModal = true;
          },
        });
    } else {
      this.stockNames[0].chartOfAccountId = null;
      this.stockNames[0].chartOfAccountName = "";
      this.stockNames[1].chartOfAccountId = null;
      this.stockNames[1].chartOfAccountName = "";
      this.stockNames[2].chartOfAccountId = null;
      this.stockNames[2].chartOfAccountName = "";
      this.stockNames[3].chartOfAccountId = null;
      this.stockNames[3].chartOfAccountName = "";
      this.stockNames[4].chartOfAccountId = null;
      this.stockNames[4].chartOfAccountName = "";
      this.stockNames[5].chartOfAccountId = null;
      this.stockNames[5].chartOfAccountName = "";
      this.fixedNames[0].chartOfAccountId = null;
      this.fixedNames[0].chartOfAccountName = "";
      this.fixedNames[1].chartOfAccountId = null;
      this.fixedNames[1].chartOfAccountName = "";
      this.fixedNames[2].chartOfAccountId = null;
      this.fixedNames[2].chartOfAccountName = "";
      this.fixedNames[3].chartOfAccountId = null;
      this.fixedNames[3].chartOfAccountName = "";
      this.fixedNames[4].chartOfAccountId = null;
      this.fixedNames[4].chartOfAccountName = "";
      this.fixedNames[5].chartOfAccountId = null;
      this.fixedNames[5].chartOfAccountName = "";
      this.editMode = false;
      this.displayModal = true;
      this.stockItemDto = new InventoryItem();
      this.stockItemDto.isActive = true;
    }
  }

  save() {
    debugger;
    this.saving = true;
    if (!this.validateStockItemDto()) {
      this.saving = false;
      return;
    }
    this.stockItemDto.itemType = this.type;
    if (this.stockItemDto.itemType == "StockItem") {
      if (!this.validateStockItemDto()) {
        this.saving = false;
        return;
      }
      this.stockItemDto.itemFinancialIntegrations = this.stockNames;
    } else {
      if (!this.validateStockItemDto()) {
        this.saving = false;
        return;
      }
      this.stockItemDto.itemFinancialIntegrations = this.fixedNames;
    }
    this._basicTypeService
      .create(this.stockItemDto, this.target)
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
    if (this.stockItemDto.itemType == "StockItem") {
      this.stockItemDto.itemFinancialIntegrations = this.stockNames;
    } else {
      this.stockItemDto.itemFinancialIntegrations = this.fixedNames;
    }
    this._basicTypeService
      .update(this.stockItemDto, this.target)
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
        catchError((error) => {
          debugger;
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
      case "StockCategory":
        debugger;
        this.stockItemDto.itemcategoryId = value.id;
        this.stockItemDto.itemcategoryName = value.name;
        this.idChecker(
          this.stockItemDto.itemcategoryId,
          this.stockItemDto.itemsubCategoryId
        );
        break;
      case "StockSubCategory":
        debugger;
        this.stockItemDto.itemsubCategoryId = value.id;
        this.stockItemDto.itemsubCategoryName = value.name;
        this.idChecker(
          this.stockItemDto.itemcategoryId,
          this.stockItemDto.itemsubCategoryId
        );
        break;
      case "PurchaseUnit":
        debugger;
        this.stockItemDto.purchaseUnitId = value.id;
        this.stockItemDto.purchaseUnitName = value.name;
        break;
      case "AppUnit":
        debugger;
        this.stockItemDto.appUnitId = value.id;
        this.stockItemDto.appUnitName = value.name;
        break;
      case "MaterialType":
        debugger;
        this.stockItemDto.materialTypeId = value.id;
        this.stockItemDto.materialTypeName = value.name;
        break;
      case "BasicType":
        debugger;
        this.stockItemDto.basicTypeId = value.id;
        this.stockItemDto.basicTypeName = value.name;
        break;
      // case "ItemSize":
      //     debugger
      //     this.stockItemDto.itemSizeId = +value.id;
      //     this.stockItemDto.itemSizeName = value.name;
      //     break;
      // case "Supplier":
      //   debugger;
      //   this.stockItemDto.supplierId = value.id;
      //   this.stockItemDto.supplierName = value.name;
      //   break;
      // case "Location":
      //   debugger;
      //   this.stockItemDto.locationId = value.id;
      //   this.stockItemDto.locationName = value.name;
      //   break;
      case "InventoryItem":
        debugger;
        this.stockItemDto.inventoryId = value.id;
        this.stockItemDto.name = value.name;
        this.displayName(value.name);
        this.splitAndAssign(value.name);
        break;
      // case "Project":
      //   debugger;
      //   this.stockItemDto.projectId = value.id;
      //   this.stockItemDto.projectName = value.name;
      //   break;
      case "one":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(0, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
          this.serialNumber1 = "";
        } else {
          debugger;
          this.stockNames[0].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }
        break;
      case "two":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(1, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
        } else {
          this.stockNames[1].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }
        break;
      case "three":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(2, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
        } else {
          this.stockNames[2].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }
        break;
      case "four":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(3, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
        } else {
          this.stockNames[3].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }
        break;
      case "five":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(4, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
        } else {
          this.stockNames[4].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }
        break;
      case "six":
        debugger;
        if (!value.id && !value.name) {
          this.stockNames.splice(5, 1, {
            ...this.stockNames[0],
            chartOfAccountId: null,
            chartOfAccountName: "",
          });
        } else {
          this.stockNames[5].chartOfAccountId = value.id
            ? value.id.split("/")[0]
            : null;
        }

        break;
      case "seven":
        debugger;
        this.fixedNames[0].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      case "eight":
        debugger;
        this.fixedNames[1].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      case "nine":
        debugger;
        this.fixedNames[2].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      case "ten":
        debugger;
        this.fixedNames[3].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      case "eleven":
        debugger;
        this.fixedNames[4].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      case "twelve":
        debugger;
        this.fixedNames[5].chartOfAccountId = value.id
          ? value.id.split("/")[0]
          : null;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  onvalueChnage(value: any) {
    debugger;
    this.stockItemDto.name = value;
    this.stockItemDto.title = value;
    this.displayName(value);
  }

  displayName(names: string) {
    debugger;
    const { name, specs, itemBrand } = this.stockItemDto;
    debugger;
    this.stockItemDto.title = `${name ? name + "_" : ""}${specs ? specs + "_" : ""
      }${itemBrand || ""}`.trim();
  }

  splitAndAssign(inventoryName: string) {
    const parts = inventoryName.split("_");
    if (parts.length === 3) {
      this.stockItemDto.name = parts[0]; // "AIR FILTER"
      this.stockItemDto.itemBrand = parts[1]; // "XYZ"
      this.stockItemDto.specs = parts[2]; // "3X3"
      this.stockItemDto.title = inventoryName; // "AIR FILTER_XYZ_3X3"
    }
  }

  getCategoryCount(categoryId: number, SubCategoryId: number) {
    debugger;
    this._basicTypeService
      .getItemNextSerialNumb(categoryId, SubCategoryId)
      .pipe(
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
          debugger;
          this.stockItemDto.serialNumber = `${this.stockItemDto.itemcategoryId}${this.stockItemDto.itemsubCategoryId}${response}`;
        },
      });
  }

  idChecker(categoryId: number, subCategoryId: number) {
    debugger;
    if (categoryId !== undefined && subCategoryId !== undefined) {
      this.getCategoryCount(categoryId, subCategoryId);
    }
  }
  async onPageChange(event: any) {
    debugger;
    this.loading = true;
    this.maxcount = event.rows;
    this.skipcount = event.page + 1;
    this.skipcount = (this.skipcount - 1) * this.maxcount;

    this.getAll();

    // this.loading = true;
    //  this.http_dynamic.getAll(
    //         (this.skipcount - 1) * 10,
    //         this.maxcount,
  }

  validateStockItemDto(): boolean {
    if (!this.stockItemDto.itemcategoryId) {
      this.messageService.add({
        severity: "error",
        detail: "Category Id is Required",
        life: 2000,
      });
      return false;
    }
    if (!this.stockItemDto.itemsubCategoryId) {
      this.messageService.add({
        severity: "error",
        detail: "subCategoryId is Required",
        life: 2000,
      });
      return false;
    }
    if (!this.stockItemDto.itemBrand) {
      this.messageService.add({
        severity: "error",
        detail: "itemBrand is Required",
        life: 2000,
      });
      return false;
    }
    // if (!this.stockItemDto.partNumber) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "partNumber is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }
    if (!this.stockItemDto.specs) {
      this.messageService.add({
        severity: "error",
        detail: "specs is Required",
        life: 2000,
      });
      return false;
    }
    // if (!this.stockItemDto.itemSize) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "itemSize is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }
    if (!this.stockItemDto.purchaseUnitId) {
      this.messageService.add({
        severity: "error",
        detail: "purchaseUnitId is Required",
        life: 2000,
      });
      return false;
    }
    // if (!this.stockItemDto.supplierId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "supplierId is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }
    if (!this.stockItemDto.basicTypeId) {
      this.messageService.add({
        severity: "error",
        detail: "basicTypeId is Required",
        life: 2000,
      });
      return false;
    }
    if (!this.stockItemDto.appUnitId) {
      this.messageService.add({
        severity: "error",
        detail: "appUnitId is Required",
        life: 2000,
      });
      return false;
    }
    // if (!this.stockItemDto.projectId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "projectId is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }
    if (!this.stockItemDto.materialTypeId) {
      this.messageService.add({
        severity: "error",
        detail: "materialTypeId is Required",
        life: 2000,
      });
      return false;
    }
    // if (!this.stockItemDto.locationId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "locationId is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }
    if (
      this.stockItemDto.itemType == "StockItem" &&
      !this.stockNames[0].chartOfAccountId
    ) {
      this.messageService.add({
        severity: "error",
        detail: "R/P Stock is Required",
        life: 2000,
      });
      return false;
    }
    // if (
    //   this.stockItemDto.itemType == "StockItem" &&
    //   !this.fixedNames[0].chartOfAccountId
    // ) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "R/P Stock is Required",
    //     life: 2000,
    //   });
    //   return false;
    // }

    return true;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    // this.skipcount = 0;
    // this.maxcount = 10;
    this.filterBySerialNumber = inputValue;
    this.getAll();
  }
}
