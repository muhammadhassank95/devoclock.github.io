import { Component, ViewChild } from '@angular/core';
import { FixedTransferRequest } from '../Shared/DTOs/fixed-transfer-request'
import { SetupsService } from '../Shared/Services/inventory-setup.service'
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, throwError } from 'rxjs';
import { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuggestionLookupTableModalComponent } from '@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent';

@Component({
  selector: 'app-fixed-transfer-request',
  templateUrl: './fixed-transfer-request.component.html',
})
export class FixedTransferRequestComponent {

  fixedTransferRequest: FixedTransferRequest = new FixedTransferRequest()

  tableData: any;
  count: number;
  displayModal: boolean;
  editMode: boolean;
  reviseMode: boolean;
  saving: boolean;
  target = "StockTranferNote";
  rowData: any;
  rowSelection: string;
  rowCount: number;
  gridApi: any
  setParms: any;
  totalIncome: number;
  totalExpense: number;
  totalAmount: number;
  saleAmount: number;
  suggestionModalRef: BsModalRef;
  @ViewChild('SuggestionLookupTableModalComponent') SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  locationId: number;
  locationName: string;
  displayFixed: boolean;
  stockData: any;
  selectedIds = [];


  constructor(
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService,

  ) {
  }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this._basicTypeService.getAll(this.target)
      .pipe(
        finalize(() => { }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.tableData = response.items.filter((i) => i.itemType == 'Fixed');
          this.count = response.totalCount;
        }
      });
  }


  delete(id: number) {
    debugger
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._basicTypeService.delete(id, this.target)
          .pipe(
            finalize(() => { }),
            catchError(error => {
              debugger
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
              return throwError(error.error.error.message);
            })
          )
          .subscribe({
            next: (response) => {
              debugger
              if (response) {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted Successfully', life: 2000 });
                this.getAll();
              }
            }
          });
      }
    });
  }

  show(id?: number) {
    if (id) {
      this.editMode = true
      this._basicTypeService.getDataForEdit(id, this.target)
        .pipe(
          finalize(() => { }),
          catchError(error => {
            debugger
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
            return throwError(error.error.error.message);
          })
        )
        .subscribe({
          next: (response) => {
            debugger
            this.fixedTransferRequest = response;
            this.fixedTransferRequest.Date = new Date(response.Date)
            this.displayModal = true;
          }
        });
    } else {
      this.editMode = false
      this.displayModal = true;
      this.fixedTransferRequest = new FixedTransferRequest();
      this.rowData = [];
      // this.fixedTransferRequest.isActive = true;
    }

  }

  save() {
    this.saving = true
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        requisitionDetailId: node.data.id,
        givenQty: node.data.givenQty,
      }
      tempArr.push(tempObj)
    });
    this.fixedTransferRequest.details = tempArr;
    this._basicTypeService.create(this.fixedTransferRequest, this.target)
      .pipe(
        finalize(() => { this.saving = false; }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'SavedSuccessfully', life: 2000 });
          this.getAll()
          this.saving = false;
          this.displayModal = false
        }
      });
  }


  update() {
    this.saving = true
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        requisitionDetailId: node.data.id,
        givenQty: node.data.givenQty,
      }
      tempArr.push(tempObj)
    });
    this.fixedTransferRequest.details = tempArr;
    this._basicTypeService.update(this.fixedTransferRequest, this.target)
      .pipe(
        finalize(() => { this.saving = false; }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 });
          return throwError(error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'UpdatedSuccessfully', life: 2000 });
          this.getAll()
          this.saving = false;
          this.displayModal = false
        }
      });
  }
  setPickerValue(value: any, title: string) {
    debugger
    switch (title) {
      case "Location":
        debugger
        this.locationId = +value.id
        this.locationName = value.name
        this.MakeVoucher()
        break;
      default:
        alert(`${title} is not defined`)
    }
  }
  getSerialNumber(id: any) {
    this._basicTypeService
      .GetCategoryCount(id)
      .pipe(
        finalize(() => { }),
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
          debugger
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
      headerName: "Job ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Requested Quantity",
      editable: false,
      field: "requestedQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Given Quantity",
      editable: true,
      field: "givenQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit Id",
      editable: false,
      field: "unitId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Unit Title",
      editable: false,
      field: "unitName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Remarks",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
  ]

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = []
  }

  MakeVoucher(value?: Date) {
    debugger
    if (value) {
      this.fixedTransferRequest.Date = value
    }
    if (this.locationId && this.fixedTransferRequest.Date) {
      this.fixedTransferRequest.voucherNumber = "FTR" + "/" + "HNL" + "/" + (this.fixedTransferRequest.Date.getMonth() + 1) + "/" + this.fixedTransferRequest.Date.getFullYear() + "/" + this.locationId
    }
  }

  OpenFixedRequisition() {
    debugger
    this.displayFixed = true;
    this.GetRequisitions();
  }

  GetRequisitions() {
    this._basicTypeService.getAll("InventoryRequisition")
      .pipe(
        finalize(() => { }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.stockData = response.items
            // .filter((item) => item.status == 'APPROVED')
            .filter((item) => !this.selectedIds.includes(item.id));
        }
      });
  }

  SelectRequisition(id: number) {
    this._basicTypeService.getDataForEdit(id, "InventoryRequisition")
      .pipe(
        finalize(() => { }),
        catchError(error => {
          debugger
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger
          this.fixedTransferRequest.requisitionId = response.id;
          this.selectedIds = []
          this.selectedIds.push(response.id);
          this.rowData = response.details;
          this.displayFixed = false
        }
      });
  }

}
