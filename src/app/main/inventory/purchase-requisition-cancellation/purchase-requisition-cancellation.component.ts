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
  selector: 'app-purchase-requisition-cancellation',
  templateUrl: './purchase-requisition-cancellation.component.html',
})
export class PurchaseRequisitionCancellationComponent {
  purchaseRequisitionCancellationForm: FormGroup;
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
  target = "PurchaseRequisitionCancellation";
  data: any;
  count: number;
  saving: boolean;
  editMode: boolean;
  dialogVisibility: boolean;
  EmpserialNumber: string;
  stockData: any;
  totalRate: number;
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
    this.purchaseRequisitionCancellationForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      userLocationId: [null, [Validators.required]],
      userLocationName: [""],
      costCenterId: [""],
      remarks: [""],
      totalRate: [""],
      purchaseRequisitionCancellationDetails: [[]],
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  // colDefs: ColDef[] = [
  //   {
  //     headerName: "SrNo",
  //     editable: false,
  //     field: "srNo",
  //     sortable: true,
  //     valueGetter: "node.rowIndex+1",
  //     suppressSizeToFit: true,
  //   },
  //   {
  //     headerName: "Item Id",
  //     editable: false,
  //     field: "itemId",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Item Title",
  //     editable: false,
  //     field: "itemName",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //   },
  //   {
  //     headerName: "Unit Title",
  //     editable: false,
  //     field: "unitName",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //   },
  //   {
  //     headerName: "SQ Number",
  //     editable: false,
  //     field: "voucherNumber",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //   },
  //   {
  //     headerName: "User Stock",
  //     editable: false,
  //     field: "requesterStock",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Stock In Hand From Loc",
  //     editable: false,
  //     field: "providerStock",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Quantity To Purchase",
  //     editable: false,
  //     field: "pendingPurchaseRequestQty",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Cancelled Qty",
  //     editable: true,
  //     field: "cancellationQty",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },

  //   {
  //     headerName: "Last Purchase Rate",
  //     editable: false,
  //     field: "costRate",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Total Purchase Amount",
  //     editable: false,
  //     field: "totalRate",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //     valueParser: function (params) {
  //       const newValue = parseFloat(params.newValue);
  //       return isNaN(newValue) ? null : newValue;
  //     },
  //   },
  //   {
  //     headerName: "Remarks",
  //     editable: true,
  //     field: "remarks",
  //     resizable: true,
  //     suppressSizeToFit: true,
  //   },
  // ];

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

    // {
    //   headerName: "Requested Quantity",
    //   editable: false,
    //   field: "requestedQty",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueParser: function (params) {
    //     const newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? null : newValue;
    //   },
    // },
    {
      headerName: "Purchase Quantity",
      editable: true,
      field: "pendingPurchaseRequestQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Cancelled Quantity",
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
      headerName: "Rate",
      editable: false,
      field: "costRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Total Amount",
      editable: false,
      field: "totalRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      field: "requestDate",
      headerName: "requestDate",
      editable: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        return params.value
          ? new Date(params.value).toLocaleDateString("en-CA")
          : "";
      },
      valueParser: (params) => new Date(params.newValue),
    },
    {
      headerName: "SQ Voucher Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
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
      this.purchaseRequisitionCancellationForm.value.issueDate = value;
    }
    if (
      this.purchaseRequisitionCancellationForm.value.userLocationId &&
      this.purchaseRequisitionCancellationForm.value.issueDate
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
          this.purchaseRequisitionCancellationForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.purchaseRequisitionCancellationForm
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
        let purchaseRequisitionCancellationDetails = [];
        this.gridApi.forEachNode((node) => {
          if (node.data && node.data.purchaseRequisitionDetailId) {
            let obj = {
              ...node.data,
              id: 0,
              purchaseRequisitionDetailId: node.data.purchaseRequisitionDetailId,
              cancellationQty: node.data.cancellationQty,
              voucherNumber: node.data.voucherNumber,
              purchaseRequisitionQty: node.data.purchaseRequisitionQty
            };
            purchaseRequisitionCancellationDetails.push(obj);
          }
        });

        if (purchaseRequisitionCancellationDetails.length < 1) {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please add valid details.",
            life: 2000,
          });
          this.saving = false;
          return;
        }
        this.purchaseRequisitionCancellationForm.patchValue({
          purchaseRequisitionCancellationDetails,
        });
        // const updateData = {
        //   ...this.purchaseRequisitionCancellationForm.value,
        //   id: this.dataForEdit?.id ?? null,
        // };
        delete this.purchaseRequisitionCancellationForm.value.totalRate;
        this.purchaseRequisitionCancellationForm.value.costCenterId = "3",
          this._basicTypeService
            .create(this.purchaseRequisitionCancellationForm.value, this.target)
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
    let purchaseRequisitionCancellationDetails = [];

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
        purchaseRequisitionCancellationDetails.push(obj);
      }
    });

    if (purchaseRequisitionCancellationDetails.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please add valid details.",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this.purchaseRequisitionCancellationForm.patchValue({
      purchaseRequisitionCancellationDetails,
    });

    const updateData = {
      ...this.purchaseRequisitionCancellationForm.value,
      id: this.dataForEdit?.id ?? null,
    };
    debugger
    delete this.purchaseRequisitionCancellationForm.value.totalRate;
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
            this.purchaseRequisitionCancellationForm.patchValue({
              voucherNumber: this.dataForEdit.voucherNumber,
              issueDate: new Date(this.dataForEdit.issueDate),
              userLocationId: this.dataForEdit.userLocationId,
              userLocationName: this.dataForEdit.userLocationName,
              employeeId: this.dataForEdit.employeeId,
              remarks: this.dataForEdit.remarks || '',
            });

            this.requesterCostCenterId = this.dataForEdit.stockRequisition.requesterCostCenterId;
            this.requesterCostCenterName = this.dataForEdit.stockRequisition.requesterCostCenterName;
            this.requesterProjectId = this.dataForEdit.stockRequisition.requesterProjectId;
            this.requesterProjectName = this.dataForEdit.stockRequisition.requesterProjectName;
            this.requesterLocationId = this.dataForEdit.stockRequisition.requesterLocationId;
            this.requesterLocationName = this.dataForEdit.stockRequisition.requesterLocationName;
            this.requesterRegionId = this.dataForEdit.stockRequisition.requesterRegionId;
            this.requesterRegionName = this.dataForEdit.stockRequisition.requesterRegionName;
            // .................................
            this.providerCostCenterId = this.dataForEdit.stockRequisition.costCenterId;
            this.providerCostCenterName = this.dataForEdit.stockRequisition.CostCenterName;
            this.providerProjectId = this.dataForEdit.stockRequisition.ProjectId;
            this.providerProjectName = this.dataForEdit.stockRequisition.ProjectName;
            this.providerLocationId = this.dataForEdit.stockRequisition.userLocationId;
            this.providerLocationName = this.dataForEdit.stockRequisition.userLocationName;
            this.providerRegionId = this.dataForEdit.stockRequisition.regionId;
            this.providerRegionName = this.dataForEdit.stockRequisition.regionName;
            const PurchaseRequisitionDetails = response.stockRequisition.purchaseRequisitionDetails || [];
            const stockRequisitionCancellationDetails = response.stockRequisitionCancellationDetails || [];
            this.rowData = stockRequisitionCancellationDetails.map((cancellation) => {
              const matchingDetail = PurchaseRequisitionDetails.find(
                (detail) => detail.id === cancellation.purchaseRequisitionDetailId
              );
              return {
                ...cancellation,
                ...matchingDetail,
                id: cancellation.id,
                totalRate: cancellation.cancellationQty * matchingDetail.costRate,
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
      this.purchaseRequisitionCancellationForm.reset();
      this.purchaseRequisitionCancellationForm.enable();
      this.purchaseRequisitionCancellationForm.get("issueDate").setValue(this.today);
    }
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.purchaseRequisitionCancellationForm.patchValue({
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
        "PQC",
        this.purchaseRequisitionCancellationForm.value.issueDate,
        this.purchaseRequisitionCancellationForm.value.userLocationId,
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
          this.purchaseRequisitionCancellationForm.get("voucherNumber").setValue(response);
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
    if (params.data.cancellationQty > params.data.pendingPurchaseRequestQty) {
      params.data.cancellationQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Given Quantity cannot be greater than Purchase Quantity.",
      });
    }
    params.data.totalRate = params.data.costRate * params.data.cancellationQty;
    this.gridApi.refreshCells();
    this.calculateAmount();
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.purchaseRequisitionCancellationForm.disable();
    this.MinDate = null;
  }

  edit(id: any) {
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.purchaseRequisitionCancellationForm.enable();
  }

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }

  GetRequisitions() {
    this._basicTypeService
      .getAll("PurchaseRequisition")
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
              item.linkedStatus == "PENDING"
          );
          this.displayStock = true;
        },
      });
  }

  SelectRequisition(id: number) {
    debugger;
    this._basicTypeService
      .getDataForEdit(id, "PurchaseRequisition")
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
        this.requesterCostCenterId = response.requesterCostCenterId;
        this.requesterCostCenterName = response.requesterCostCenterName;
        this.requesterProjectId = response.requesterProjectId;
        this.requesterProjectName = response.requesterProjectName;
        this.requesterLocationId = response.requesterLocationId;
        this.requesterLocationName = response.requesterLocationName;;
        this.requesterRegionId = response.requesterRegionId;
        this.requesterRegionName = response.requesterRegionName;
        // .................................
        this.providerCostCenterId = response.costCenterId;
        this.providerCostCenterName = response.costCenterName;
        this.providerProjectId = response.projectId;
        this.providerProjectName = response.projectName;
        this.providerLocationId = response.userLocationId;
        this.providerLocationName = response.userLocationName;
        this.providerRegionId = response.regionId;
        this.providerRegionName = response.regionName;
        this.rowData = response.purchaseRequisitionDetails.map((item) => ({
          ...item,
          purchaseRequisitionDetailId: item.id,
          cancellationQty: item.pendingPurchaseRequestQty,
          totalRate: item.costRate * item.pendingPurchaseRequestQty,
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

      if (node.totalRate) {
        total += +node.totalRate;
      }
    });
    this.purchaseRequisitionCancellationForm.get("totalRate").setValue(total);
  }

}
