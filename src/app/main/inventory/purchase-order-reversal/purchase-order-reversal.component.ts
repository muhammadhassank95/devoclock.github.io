import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Table } from "primeng/table";
import { SetupsService } from '../Shared/Services/inventory-setup.service';

@Component({
  selector: 'app-purchase-order-reversal',
  templateUrl: './purchase-order-reversal.component.html',
})
export class PurchaseOrderReversalComponent {

  purchaseOrderReversalForm: FormGroup;
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
  viewMode: boolean;
  displayRequisition: boolean;
  target = "PurchaseOrderCancellation";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  EmpserialNumber: string;
  SupplierSerialNumber: string;
  stockData: any;
  totalRate: number;
  copyData: any


  constructor(
    private fb: FormBuilder,
    private _basicTypeService: SetupsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    this.purchaseOrderReversalForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      employeeId: [null, [Validators.required]],
      employeeName: [""],
      supplierId: [null, [Validators.required]],
      supplierName: [""],
      remarks: [""],
      totalAmount: [""],
      purchaseOrderCancellationDetails: [[]],
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
      resizable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      // width: 80,
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Pur.Req.No",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
      // width: 200,
    },
    {
      headerName: "Ordered Qty",
      editable: false,
      field: "purchaseOrderQty",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
    },
    {
      headerName: "Cancelled QTY",
      editable: true,
      field: "cancellationQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Rate",
      editable: false,
      field: "rate",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
    },

    {
      headerName: "Total Amount",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      // width: 150,
      valueParser: (params) => {
        let newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor",
    },
    // {
    //   headerName: "Discount",
    //   editable: false,
    //   field: "discount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   // width: 150,
    //   valueParser: (params) => {
    //     let newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? 0 : newValue;
    //   },
    //   cellEditor: "agNumberCellEditor",
    // },
    // {
    //   field: "requestDate",
    //   headerName: "Requisition Date",
    //   editable: true,
    //   cellEditor: "agDateCellEditor",
    //   valueFormatter: (params) => {
    //     return params.value
    //       ? new Date(params.value).toLocaleDateString("en-CA")
    //       : "";
    //   },
    //   valueParser: (params) => new Date(params.newValue),
    // },
    // {
    //   headerName: "Remarks",
    //   editable: true,
    //   field: "remarks",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   // width: 200,
    // },
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
      this.purchaseOrderReversalForm.value.issueDate = value;
    }
    if (
      this.purchaseOrderReversalForm.value.userLocationId &&
      this.purchaseOrderReversalForm.value.issueDate
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
          this.purchaseOrderReversalForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.purchaseOrderReversalForm
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
        let purchaseOrderCancellationDetails = [];
        this.gridApi.forEachNode((node) => {
          if (node.data && node.data.purchaseOrderDetailId) {
            let obj = {
              ...node.data,
              id: 0,
              purchaseOrderDetailId: node.data.purchaseOrderDetailId,
              cancellationQty: node.data.cancellationQty,
              voucherNumber: node.data.voucherNumber,
              purchaseOrderQty: node.data.purchaseOrderQty
            };
            purchaseOrderCancellationDetails.push(obj);
          }
        });

        if (purchaseOrderCancellationDetails.length < 1) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please add valid details.",
            life: 2000,
          });
          this.saving = false;
          return;
        }
        this.purchaseOrderReversalForm.patchValue({
          purchaseOrderCancellationDetails,
        });
        delete this.purchaseOrderReversalForm.value.totalAmount;
        this.purchaseOrderReversalForm.value.costCenterId = "3",
          this._basicTypeService
            .create(this.purchaseOrderReversalForm.value, this.target)
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
    let purchaseOrderCancellationDetails = [];

    this.gridApi.forEachNode((node) => {
      if (node.data) {
        let obj = {
          ...node.data,
          id: node.data.id,
          purchaseRequisitionDetailId: node.data.purchaseRequisitionDetailId,
          cancellationQty: node.data.cancellationQty,
          voucherNumber: node.data.voucherNumber,
          requestedQty: node.data.requestedQty
        };
        purchaseOrderCancellationDetails.push(obj);
      }
    });

    if (purchaseOrderCancellationDetails.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add valid details.",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.purchaseOrderReversalForm.patchValue({
      purchaseOrderCancellationDetails,
    });

    const updateData = {
      ...this.purchaseOrderReversalForm.value,
      id: this.dataForEdit?.id ?? null,
    };
    delete this.purchaseOrderReversalForm.value.totalRate;
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
            console.log(this.dataForEdit);
            this.purchaseOrderReversalForm.patchValue({
              voucherNumber: this.dataForEdit.voucherNumber,
              issueDate: new Date(this.dataForEdit.issueDate),
              userLocationId: this.dataForEdit.userLocationId,
              userLocationName: this.dataForEdit.userLocationName,
              employeeId: this.dataForEdit.purchaseOrder.employeeId,
              employeeName: this.dataForEdit.purchaseOrder.employeeName,
              supplierId: this.dataForEdit.purchaseOrder.supplierId,
              supplierName: this.dataForEdit.purchaseOrder.supplierName,
              remarks: this.dataForEdit.remarks || '',
            });
            this.EmpserialNumber = response.purchaseOrder.employeeErpId;
            this.SupplierSerialNumber = response.purchaseOrder.supplierSerialNumber;
            const purchaseOrderDetails = response.purchaseOrder.purchaseOrderDetails || [];
            const purchaseOrderCancellationDetails = response.purchaseOrderCancellationDetails || [];
            this.rowData = purchaseOrderCancellationDetails.map((cancellation) => {
              const matchingDetail = purchaseOrderDetails.find(
                (detail) => detail.id === cancellation.purchaseOrderDetailId
              );
              return {
                ...cancellation,
                ...matchingDetail,
                id: cancellation.id,
                rate: matchingDetail?.rate,
                totalAmount: cancellation.cancellationQty * matchingDetail?.rate,
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
      this.dialogVisibility = true;
      this.purchaseOrderReversalForm.reset();
      this.purchaseOrderReversalForm.enable();
      this.purchaseOrderReversalForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.purchaseOrderReversalForm.patchValue({
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
        "POC",
        this.purchaseOrderReversalForm.value.issueDate,
        this.purchaseOrderReversalForm.value.userLocationId,
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
          this.purchaseOrderReversalForm.get("voucherNumber").setValue(response);
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
    if (params.data.cancellationQty > params.data.purchaseOrderQty) {
      params.data.cancellationQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be greater than Purchase Quantity.",
      });
    }
    params.data.totalAmount = params.data.rate * params.data.cancellationQty;
    this.gridApi.refreshCells();
    this.calculateAmount();
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.purchaseOrderReversalForm.disable();
    this.MinDate = null;
  }

  edit(id: any) {
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.purchaseOrderReversalForm.enable();
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  GetRequisitions() {
    this._basicTypeService
      .getAll("PurchaseOrder")
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
              item.inwardGatepassStatus == "PENDING"
          );
          this.displayStock = true;
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._basicTypeService
      .getDataForEdit(id, "PurchaseOrder")
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
        this.copyData = response;
        this.purchaseOrderReversalForm.patchValue({
          employeeId: this.copyData.employeeId,
          employeeName: this.copyData.employeeName,
          supplierId: this.copyData.supplierId,
          supplierName: this.copyData.supplierName,
        });
        this.EmpserialNumber = response.employeeErpId;
        this.SupplierSerialNumber = response.supplierSerialNumber;
        this.rowData = response.purchaseOrderDetails.map((item) => ({
          ...item,
          purchaseOrderDetailId: item.id,
          cancellationQty: item.pendingPurchaseOrderCancellationQty,
          purchaseOrderQty: item.pendingPurchaseOrderCancellationQty,
          totalAmount: item.rate * item.pendingPurchaseOrderCancellationQty,
        }));
        console.log(this.rowData);
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
    this.purchaseOrderReversalForm.get("totalAmount").setValue(total);
  }


}
