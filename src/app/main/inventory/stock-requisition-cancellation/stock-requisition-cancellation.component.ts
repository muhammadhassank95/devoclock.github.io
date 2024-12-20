import { Component } from '@angular/core';
import { FinanceModuleService } from "@app/main/finance/Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { SetupsService } from '../Shared/Services/inventory-setup.service';

@Component({
  selector: 'app-stock-requisition-cancellation',
  templateUrl: './stock-requisition-cancellation.component.html',
})
export class StockRequisitionCancellationComponent {
  stockRequisitionCancellationForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  dataForEdit: any;
  displayStock: boolean;
  rowCount: number;
  rowData: any;
  currentPage = 1;
  today: Date = new Date();
  MinDate: Date = new Date();
  loading: boolean;
  dto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: ""

  };
  sqdto = {
    skipCount: 0,
    maxCount: 10,
    Status: "APPROVED"

  };
  viewMode: boolean;
  displayRequisition: boolean;
  target = "StockRequisitionCancellation";
  data: any;
  count: number;
  purchaseCount: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  EmpserialNumber: string;
  stockData: any;
  totalAmount: number;
  requesterLocationId: number;
  requesterLocationName: string;
  requesterProjectId: number;
  requesterProjectName: string;
  requesterCostCenterId: number;
  requesterCostCenterName: string;
  requesterRegionId: number;
  requesterRegionName: string;
  providerLocationId: number;
  providerLocationName: string;
  providerProjectId: number;
  providerProjectName: string;
  providerCostCenterId: number;
  providerCostCenterName: string;
  providerRegionId: number;
  providerRegionName: string;
  consumptionMonth: Date;


  constructor(
    private fb: FormBuilder,
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    this.stockRequisitionCancellationForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      employeeId: [""],
      employeeName: [""],
      remarks: [""],
      totalAmount: [""],
      stockRequisitionCancellationDetails: [[]],
    });
  }

  ngOnInit(): void {
    this.getAll();
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
      headerName: "Item Id",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
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
      headerName: "SQ Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "User Stock",
      editable: false,
      field: "requesterStock",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Stock In Hand From Loc",
      editable: false,
      field: "providerStock",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Quantity To Purchase",
      editable: false,
      field: "pendingStockRequisitionCancellationQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Cancelled Qty",
      editable: true,
      field: "cancellationQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },

    {
      headerName: "Last Purchase Rate",
      editable: false,
      field: "lastPurchaseRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Total Purchase Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
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
    this._basicTypeService.getAll(this.target, this.dto).subscribe({
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
      this.stockRequisitionCancellationForm.value.issueDate = value;
    }
    if (
      this.stockRequisitionCancellationForm.value.userLocationId &&
      this.stockRequisitionCancellationForm.value.issueDate
    ) {
      this.getVoucherNumber();
    }
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._basicTypeService
      .getDefaultLocation(target, filterId)
      .pipe(
        finalize(() => { }),
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
          this.stockRequisitionCancellationForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.stockRequisitionCancellationForm
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
    this._basicTypeService
      .getAll(this.target, this.dto)
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
          this.data = response.items;
          this.count = response.totalCount;
        },
      });
  }

  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this.dto.DocOrVocNumber = inputValue;
    this.getAll();
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
        let stockRequisitionCancellationDetails = [];
        this.gridApi.forEachNode((node) => {
          if (node.data && node.data.stockRequisitionDetailId) {
            let obj = {
              ...node.data,
              id: 0,
              stockRequisitionDetailId: node.data.stockRequisitionDetailId,
              cancellationQty: node.data.cancellationQty,
              voucherNumber: node.data.voucherNumber,
              requestedQty: node.data.requestedQty
            };
            stockRequisitionCancellationDetails.push(obj);
          }
        });

        if (stockRequisitionCancellationDetails.length < 1) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please add valid details.",
            life: 2000,
          });
          this.saving = false;
          return;
        }
        this.stockRequisitionCancellationForm.patchValue({
          stockRequisitionCancellationDetails,
        });
        delete this.stockRequisitionCancellationForm.value.totalAmount;
        this.stockRequisitionCancellationForm.value.employeeId = "22101",
          this._basicTypeService
            .create(this.stockRequisitionCancellationForm.value, this.target)
            .pipe(
              finalize(() => (this.saving = false)),
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
                  this.getAll();
                  this.messageService.add({
                    severity: "info",
                    summary: "Confirmed",
                    detail: "Created Successfully",
                    life: 2000,
                  });
                  this.dialogVisibility = false;
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
        this._basicTypeService
          .ApproveDocument(id, this.target)
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
    debugger;
    this.saving = true;
    let stockRequisitionCancellationDetails = [];

    this.gridApi.forEachNode((node) => {
      if (node.data) {
        let obj = {
          ...node.data,
          id: node.data.id,
          stockRequisitionDetailId: node.data.stockRequisitionDetailId,
          cancellationQty: node.data.cancellationQty,
          voucherNumber: node.data.voucherNumber,
          requestedQty: node.data.requestedQty
        };
        stockRequisitionCancellationDetails.push(obj);
      }
    });

    if (stockRequisitionCancellationDetails.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add valid details.",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.stockRequisitionCancellationForm.patchValue({
      stockRequisitionCancellationDetails,
    });

    const updateData = {
      ...this.stockRequisitionCancellationForm.value,
      id: this.dataForEdit?.id ?? null,
    };
    delete this.stockRequisitionCancellationForm.value.totalAmount;
    this._basicTypeService
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
            detail: "Updated Successfully",
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
    if (id) {
      this.MinDate = null;
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
            debugger;
            this.dataForEdit = response;
            this.stockRequisitionCancellationForm.patchValue({
              voucherNumber: this.dataForEdit.voucherNumber,
              issueDate: new Date(this.dataForEdit.issueDate),
              userLocationId: this.dataForEdit.userLocationId,
              userLocationName: this.dataForEdit.userLocationName,
              employeeId: this.dataForEdit.employeeId,
              remarks: this.dataForEdit.remarks || '',
            });

            this.requesterCostCenterId = this.dataForEdit.stockRequisition.costCenterId;
            this.requesterCostCenterName = this.dataForEdit.stockRequisition.costCenterName;
            this.requesterProjectId = this.dataForEdit.stockRequisition.projectId;
            this.requesterProjectName = this.dataForEdit.stockRequisition.projectName;
            this.requesterLocationId = this.dataForEdit.stockRequisition.userLocationId;
            this.requesterLocationName = this.dataForEdit.stockRequisition.userLocationName;
            this.requesterRegionId = this.dataForEdit.stockRequisition.regionId;
            this.requesterRegionName = this.dataForEdit.stockRequisition.regionName;
            // .................................
            this.providerCostCenterId = this.dataForEdit.stockRequisition.providerCostCenterId;
            this.providerCostCenterName = this.dataForEdit.stockRequisition.providerCostCenterName;
            this.providerProjectId = this.dataForEdit.stockRequisition.providerProjectId;
            this.providerProjectName = this.dataForEdit.stockRequisition.providerProjectName;
            this.providerLocationId = this.dataForEdit.stockRequisition.providerLocationId;
            this.providerLocationName = this.dataForEdit.stockRequisition.providerLocationName;
            this.providerRegionId = this.dataForEdit.stockRequisition.providerRegionId;
            this.providerRegionName = this.dataForEdit.stockRequisition.providerRegionName;
            const stockRequisitionDetails = response.stockRequisition.stockRequisitionDetails || [];
            const stockRequisitionCancellationDetails = response.stockRequisitionCancellationDetails || [];
            this.rowData = stockRequisitionCancellationDetails.map((cancellation) => {
              const matchingDetail = stockRequisitionDetails.find(
                (detail) => detail.id === cancellation.stockRequisitionDetailId
              );
              return {
                ...cancellation,
                ...matchingDetail,
                id: cancellation.id,
                totalAmount: cancellation.cancellationQty * matchingDetail.lastPurchaseRate,
              };
            });
            debugger
            this.calculateAmount();
            this.dialogVisibility = true;
          },
        });
    } else {
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.viewMode = false;
      this.rowData = [];
      this.EmpserialNumber = null;
      this.requesterCostCenterId = null;
      this.requesterCostCenterName = null;
      this.requesterProjectId = null;
      this.requesterProjectName = null;
      this.requesterLocationId = null;
      this.requesterLocationName = null;
      this.requesterRegionId = null;
      this.requesterRegionName = null;
      this.providerCostCenterId = null;
      this.providerCostCenterName = null;
      this.providerProjectId = null;
      this.providerProjectName = null;
      this.providerLocationId = null;
      this.providerLocationName = null;
      this.providerRegionId = null;
      this.providerRegionName = null;
      this.dialogVisibility = true;
      this.stockRequisitionCancellationForm.reset();
      this.stockRequisitionCancellationForm.enable();
      this.stockRequisitionCancellationForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.stockRequisitionCancellationForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber();
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getVoucherNumber() {
    debugger;
    this._basicTypeService
      .getVoucherNumber(
        "SQC",
        this.stockRequisitionCancellationForm.value.issueDate,
        this.stockRequisitionCancellationForm.value.userLocationId,
        this.target,
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
          this.stockRequisitionCancellationForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }

  OnCellValueChanged(params) {
    debugger;
    if (params.data.cancellationQty < 0) {
      params.data.cancellationQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be negative.",
      });
    }
    if (params.data.cancellationQty > params.data.pendingStockRequisitionCancellationQty) {
      params.data.cancellationQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be greater than Purchase Quantity.",
      });
    }
    params.data.totalAmount = params.data.lastPurchaseRate * params.data.cancellationQty;
    this.gridApi.refreshCells();
    this.calculateAmount();
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.stockRequisitionCancellationForm.disable();
    this.MinDate = null;
  }

  edit(id: any) {
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.stockRequisitionCancellationForm.enable();
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  GetRequisitions() {
    this._basicTypeService
      .getAll("StockRequisition", this.sqdto)
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
          this.stockData = response.items.filter(
            (item) =>
              item.status == "APPROVED" &&
              item.purchaseRequisitionStatus == "PENDING" &&
              item.stockTransferNoteStatus == "PENDING"
          );
          this.purchaseCount = response.totalCount
          this.displayStock = true;
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._basicTypeService
      .getDataForEdit(id, "StockRequisition")
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
      .subscribe((response) => {
        debugger;
        this.requesterCostCenterId = response.costCenterId;
        this.requesterCostCenterName = response.costCenterName;
        this.requesterProjectId = response.projectId;
        this.requesterProjectName = response.projectName;
        this.requesterLocationId = response.userLocationId;
        this.requesterLocationName = response.userLocationName;
        this.requesterRegionId = response.regionId;
        this.requesterRegionName = response.regionName;
        // -----------------------------------------------------
        this.providerLocationId = response.providerLocationId;
        this.providerLocationName = response.providerLocationName;
        this.providerCostCenterId = response.providerCostCenterId;
        this.providerCostCenterName = response.providerCostCenterName;
        this.providerProjectId = response.providerProjectId;
        this.providerProjectName = response.providerProjectName;
        this.providerRegionId = response.providerRegionId;
        this.providerRegionName = response.providerRegionName;
        this.rowData = response.stockRequisitionDetails.map((item) => ({
          ...item,
          stockRequisitionDetailId: item.id,
          cancellationQty: item.pendingStockRequisitionCancellationQty,
          totalAmount: item.lastPurchaseRate * item.pendingStockRequisitionCancellationQty,
        }));
        this.calculateAmount();
        this.displayStock = false;
      });
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  calculateAmount() {
    debugger
    let total = 0;
    this.rowData?.forEach((node) => {
      debugger;

      if (node.totalAmount) {
        total += +node.totalAmount;
      }
    });
    this.stockRequisitionCancellationForm.get("totalAmount").setValue(total);
  }

  onPageChangeStockReq(event: any) {
    debugger;
    this.sqdto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.sqdto.skipCount = (this.currentPage - 1) * this.sqdto.maxCount;
    this.GetRequisitions()
  }

}
