import { Component, ViewChild } from "@angular/core";
import { ServiceQuotation } from "../Shared/Dtos/service-quotation-dto";
import { SetupsService } from "../../inventory/Shared/Services/inventory-setup.service";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-service-quotation",
  templateUrl: "./service-quotation.component.html",
})
export class ServiceQuotationComponent {
  serviceQuotationDto: ServiceQuotation = new ServiceQuotation();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  editMode: boolean;
  target = "ServiceQuotation";
  setParms: any;
  locationName: string;
  saving: boolean;
  count: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  indentNumber: string;
  invoiceSubmissionDate: Date;
  itemData: [];
  displayItem: boolean;
  currentPage = 1;
  loading: boolean;
  filterDto = {
    skipCount: 0,
    maxCount: 5,
    DocOrVocNumber: "",
  };
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  addRow: boolean;
  rowSelection: string;
  documentNumber: string;
  showErpId: number;
  rowData: any;
  rowCount: number;
  gridApi: any;
  title2: any;
  maxDate: Date = new Date();
  displayModal: boolean;
  view: boolean;
  constructor(
    private _basicTypeService: SetupsService,
    // private dialogService: DialogService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}
  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("OF");
  }

  addIconCellRendererFunc() {
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
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
      field: "serialNumber",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "",
      field: "ServiceItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Job Title",
      editable: false,
      field: "serviceItemName",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "inventoryItemId",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "",
      field: "InventoryItem",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },

    {
      headerName: "Item Name",
      editable: false,
      field: "inventoryItemName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Site ID",
      editable: false,
      field: "siteId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "siteId",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Site Title",
      editable: false,
      field: "siteName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Ref VoucherNo",
    //   editable: true,
    //   field: "referenceVoucherNumber",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Client Item Code",
      editable: true,
      field: "clientItemCode",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Client Item Title",
      editable: true,
      field: "clientItemTitle",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Offer Qty",
      editable: true,
      field: "offerQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    {
      headerName: "acknowledgedClientQty",
      editable: true,
      field: "acknowledgedClientQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    {
      headerName: "Final Qty",
      editable: true,
      field: "finalQty",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) || newValue < 0 ? 0 : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    {
      headerName: "Gross Rate",
      editable: true,
      field: "grossRate",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },

      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    {
      headerName: "Total",
      editable: false,
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? "" : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    {
      headerName: "GST %",
      editable: true,
      field: "gstPercentage",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    // {
    //   headerName: "GST Amount",
    //   editable: false,
    //   field: "gstAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueParser: function (params) {
    //     const newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? 0 : newValue;
    //   },
    //   cellEditor: "agNumberCellEditor", // Forces number input in editor
    // },
    {
      headerName: "GST Amount",
      editable: false,
      field: "gstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      valueFormatter: function (params) {
        const value = parseFloat(params.value);
        return isNaN(value) ? "0" : value.toString(); // Ensures the output is a string
      },
      cellEditor: "agNumberCellEditor",
    },

    {
      headerName: "PST %",
      editable: true,
      field: "pstPercentage",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
      cellEditor: "agNumberCellEditor", // Forces number input in editor
    },
    // {
    //   headerName: "PST Amount",
    //   editable: false,
    //   field: "pstAmount",
    //   resizable: true,
    //   suppressSizeToFit: true,
    //   valueParser: function (params) {
    //     const newValue = parseFloat(params.newValue);
    //     return isNaN(newValue) ? "" : newValue;
    //   },
    //   cellEditor: "agNumberCellEditor", // Forces number input in editor
    // },
    {
      headerName: "PST Amount",
      editable: false,
      field: "pstAmount",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? 0 : newValue;
      },
      valueFormatter: function (params) {
        const value = parseFloat(params.value);
        return isNaN(value) ? "0" : value.toString(); // Ensures the output is a string
      },
      cellEditor: "agNumberCellEditor",
    },

    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Other for location",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "Location",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
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
      headerName: "Engine Ac Make",
      editable: true,
      field: "engineMakeYear",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Engine Rating",
      editable: true,
      field: "engineRating",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Visit Type Title",
      editable: false,
      field: "vehicleVisitTypeName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "VehicleVisitType",
      width: 20,
      editable: false,
      cellRenderer: this.addIconCellRendererFunc,
      resizable: false,
      suppressSizeToFit: true,
    },
    {
      headerName: "Vehicle Visit Type Id",
      editable: false,
      field: "vehicleVisitTypeId",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Genset Hours",
      editable: true,
      field: "gensetHours",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "CI VoucherNo",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  show(id?: number) {
    this.saving = false;
    if (id) {
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
            this.serviceQuotationDto = response;
            this.serviceQuotationDto.invoiceSubmissionDate = new Date(
              response.invoiceSubmissionDate
            );
            this.serviceQuotationDto.budgetDate = new Date(response.budgetDate);
            this.serviceQuotationDto.issueDate = new Date(response.issueDate);
            this.serviceQuotationDto.employeeId = response.employeeId;
            this.serviceQuotationDto.employeeName = response.employeeName;
            this.serviceQuotationDto.fromLocation = response.fromLocation;
            this.serviceQuotationDto.toLocation = response.toLocation;
            this.serviceQuotationDto.toLocationName = response.toLocationName;
            debugger;
            this.serviceQuotationDto.userLocationId = response.userLocationId;
            this.serviceQuotationDto.businessMonth = new Date(
              response.businessMonth
            );
            this.serviceQuotationDto.userLocationName =
              response.userLocationName;
            this.serviceQuotationDto.totalBudgetAmount =
              response.totalBudgetAmount;
            this.serviceQuotationDto.totalPurchaseAmount =
              response.totalPurchaseAmount;
            this.serviceQuotationDto.totalSaleAmount = response.totalSaleAmount;
            this.rowData = [];
            this.rowData = [
              ...this.rowData,
              ...response.serviceQuotationDetails,
            ];
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
      debugger;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.getDefaultLocation("Location", "locationName", "locationId", "");
      this.editMode = false;
      this.view = false;
      this.addRow = false;
      this.displayModal = true;
      this.serviceQuotationDto = new ServiceQuotation();
      this.serviceQuotationDto.issueDate = this.today;
      this.serviceQuotationDto.isActive = true;
      this.locationName = null;
      this.rowData = [];
    }
  }
  edit(id?: number) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.view = false;
    this.show(id);
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }
  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
  }

  CloseModel() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.view = false;
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
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

  validationOfReq(): boolean {
    if (!this.serviceQuotationDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.userLocationId) {
      this.messageService.add({
        severity: "error",
        detail: "User Location is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project ID is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Client is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.invoiceSubmissionDate) {
      this.messageService.add({
        severity: "error",
        detail: "Submission Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.indentNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Indent Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.attentionPerson) {
      this.messageService.add({
        severity: "error",
        detail: "Attention Person is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.designation) {
      this.messageService.add({
        severity: "error",
        detail: "Designation Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceQuotationDto.referenceNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Reference Number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    // if (!this.serviceQuotationDto.employeeId) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "Employee Name is Required",
    //     life: 2000,
    //   });
    //   this.saving = false;
    //   return;
    // }
    if (!this.serviceQuotationDto.businessMonth) {
      this.messageService.add({
        severity: "error",
        detail: "Business Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    console.log(this.rowData.forEach((item) => item.totalAmount == 0));

    if (this.rowData.some((item) => item.totalAmount == 0)) {
      debugger;
      this.messageService.add({
        severity: "error",
        detail: "Please add some purchase rate amount",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.serviceQuotationDto.totalPurchaseAmount >
      this.serviceQuotationDto.totalBudgetAmount
    ) {
      this.serviceQuotationDto.totalPurchaseAmount = 0;
      this.serviceQuotationDto.totalBudgetAmount = 0;
      this.messageService.add({
        severity: "error",
        detail: "Your Current Month Budget is Less Than Total Purchase Amount.",
        life: 2000,
      });
    }
    return true;
  }

  update() {
    this.saving = true;
    debugger;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        serviceItemId: node.data.serviceItemId,
        inventoryItemId: node.data.inventoryItemId,
        siteId: node.data.siteId,
        referenceVoucherNumber: node.data.referenceVoucherNumber,
        clientItemCode: node.data.clientItemCode,
        clientItemTitle: node.data.clientItemTitle,
        offerQty: node.data.offerQty,
        acknowledgedClientQty: node.data.acknowledgedClientQty,
        finalQty: node.data.finalQty,
        grossRate: node.data.grossRate,
        gstPercentage: node.data.gstPercentage,
        gstAmount: node.data.gstAmount,
        pstAmount: node.data.pstAmount,
        pstPercentage: node.data.pstPercentage,
        locationId: node.data.locationId,
        engineMakeYear: node.data.engineMakeYear,
        engineRating: node.data.engineRating,
        vehicleVisitTypeId: node.data.vehicleVisitTypeId,
        gensetHours: node.data.gensetHours,
        remarks: node.data.remarks,
        totalAmount: node.data.totalAmount,
        voucherNumber: this.serviceQuotationDto.voucherNumber,
      };
      tempArr.push(tempObj);
    });
    this.serviceQuotationDto.serviceQuotationDetails = tempArr;
    debugger;
    this._basicTypeService
      .update(this.serviceQuotationDto, this.target)
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

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.serviceQuotationDto.issueDate = value;
    }
    if (
      this.serviceQuotationDto.userLocationId &&
      this.serviceQuotationDto.issueDate
    ) {
      this.GetDocMaxCount("ServiceQuotation");
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  save() {
    debugger;
    if (!this.validationOfReq()) {
      return;
    }
    this.indentNumber = this.serviceQuotationDto.indentNumber;
    this.invoiceSubmissionDate = new Date(
      this.serviceQuotationDto.invoiceSubmissionDate
    );
    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        vehicleVisitTypeId: node.data.vehicleVisitTypeId || 0,
        locationId: node.data.locationId || 0,
        serviceItemId: node.data.serviceItemId || 0,
        inventoryItemId: node.data.inventoryItemId || 0,
        referenceVoucherNumber: node.data.referenceVoucherNumber || "",
        clientItemCode: node.data.clientItemCode || "",
        clientItemTitle: node.data.clientItemTitle || "",
        engineMakeYear: node.data.engineMakeYear || "",
        engineRating: node.data.engineRating || "",
        gensetHours: node.data.gensetHours || "",
        remarks: node.data.remarks || "",
        offerQty: node.data.offerQty || 0,
        acknowledgedClientQty: node.data.acknowledgedClientQty || 0,
        finalQty: node.data.finalQty || 0,
        grossRate: node.data.grossRate || 0,
        totalAmount: node.data.totalAmount || 0,
        gstPercentage: node.data.gstPercentage || 0,
        gstAmount: node.data.gstAmount || 0,
        pstAmount: node.data.gstAmount || 0,
        pstPercentage: node.data.pstPercentage || 0,
        chartOfAccountId: node.data.chartOfAccountId || 0,
        chartOfAccountName: node.data.chartOfAccountName || 0,
        qtyInStockFromLoc: node.data.qtyInStockFromLoc || 0,
        voucherNumber:
          this.serviceQuotationDto.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.serviceQuotationDto.serviceQuotationDetails = tempArr;
    let isValid = true;
    this.gridApi.forEachNode((node) => {
      const { serviceItemId, inventoryItemId } = node.data;

      if (!serviceItemId && !inventoryItemId) {
        this.messageService.add({
          severity: "error",
          summary: "Required",
          detail: "Please select either an Item or Job in the grid.",
        });
        isValid = false;
        return;
      }

      if (serviceItemId && inventoryItemId) {
        this.messageService.add({
          severity: "error",
          summary: "Required",
          detail: "Please select only one: either an Item or Job in the grid.",
        });
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      this.saving = false;
      return;
    }

    this._basicTypeService
      .create(this.serviceQuotationDto, this.target)
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

  getAll() {
    debugger;
    this._basicTypeService
      .getAllRequisition(this.target)
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
          console.log(response.items);
          this.tableData = response.items;
          this.count = response.totalCount;
        },
      });
  }

  onAddRow() {
    if (this.validationOfReq()) {
      this.addRow = true;
      var newItem = {
        itemId: "",
        itemName: "",
        requestedQty: "",
        unitId: "",
        unitName: "",
        qtyInStock: "",
        remarks: "",
      };
      this.gridApi.applyTransaction({ add: [newItem] });
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
  }

  cellClicked(params) {
    this.setParms = params;
    switch (params.column["colId"]) {
      case "ServiceItem":
        if (params.data.inventoryItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail:
              "You can only choose either a Service Item or an Inventory Item, not both.",
          });
          return;
        }
        if (params.data.serviceItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "Service Item is already selected.",
          });
          return;
        }
        this.openSelectItem("ServiceItem");
        break;

      case "InventoryItem":
        if (params.data.serviceItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail:
              "You can only choose either a Service Item or an Inventory Item, not both.",
          });
          return;
        }
        if (params.data.inventoryItemId) {
          this.messageService.add({
            severity: "error",
            summary: "Selection Error",
            detail: "Inventory Item is already selected.",
          });
          return;
        }
        this.openSelectItem("InventoryItem");
        break;
      case "Location":
        debugger;
        this.setParms = params;
        this.openSelectItem("Location");
        break;
      case "VehicleVisitType":
        debugger;
        this.setParms = params;
        this.openSelectItem("VehicleVisitType");
        break;
      case "addProject":
        debugger;
        this.setParms = params;
        this.openSelectItem("Project");
        break;
      default:
        break;
    }
  }

  openSelectItem(
    target:
      | "ServiceItem"
      | "InventoryItem"
      | "Location"
      | "VehicleVisitType"
      | "Project"
  ) {
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
      if (target == "ServiceItem") {
        this.setParms.data.serviceItemId = result.id;
        this.setParms.data.serviceItemName = result.name;
        this.setParms.data.serialNumber = result.serialNumber;
      } else if (target == "InventoryItem") {
        this.setParms.data.inventoryItemId = result.id;
        this.setParms.data.inventoryItemName = result.name;
      } else if (target == "Location") {
        this.setParms.data.locationId = +result.id;
        this.setParms.data.locationName = result.name;
      } else if (target == "VehicleVisitType") {
        this.setParms.data.vehicleVisitTypeId = +result.id || 0;
        this.setParms.data.vehicleVisitTypeName = result.name;
      } else if (target == "Project") {
        this.setParms.data.projectId = +result.id;
        this.setParms.data.projectName = result.name;
      }

      this.gridApi.refreshCells();
    });
  }

  openSelectUnit() {
    debugger;
    const initialState: any = {
      target: "Unit",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      this.setParms.data.unitId = +result.id.split("/")[0];
      this.setParms.data.unitName = result.name;
      this.gridApi.refreshCells();
    });
  }

  AmountCalculations() {
    debugger;
    console.log(this.rowData);

    let totalPurchaseAmount: number = 0;
    let totalGstAmount: number = 0;
    let totalPstAmount: number = 0;

    // Loop through the grid rows to calculate the total amounts
    this.gridApi.forEachNode((node) => {
      // Use Number() and handle undefined/null values with fallback to 0
      const totalAmount = Number(node.data.totalAmount) || 0;
      const gstAmount = Number(node.data.gstAmount) || 0;
      const pstAmount = Number(node.data.pstAmount) || 0;

      totalPurchaseAmount += totalAmount;
      totalGstAmount += gstAmount;
      totalPstAmount += pstAmount;
    });

    debugger;

    // Safely convert the totals and update serviceQuotationDto
    this.serviceQuotationDto.grossAmount = totalPurchaseAmount;
    this.serviceQuotationDto.gstAmount = totalGstAmount;
    this.serviceQuotationDto.pstAmount = totalPstAmount;

    // Calculate net total amount (purchase amount excluding GST and PST)
    this.serviceQuotationDto.totalAmount =
      totalPurchaseAmount + (totalGstAmount + totalPstAmount);
  }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      debugger;
      this.rowData = [];
      this.gridApi.forEachNode((node) => this.rowData.push(node.data));
      this.AmountCalculations();
    }
    this.addRow = this.gridApi.getDisplayedRowCount() === 0 ? false : true;
  }

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "LocationTo":
        debugger;
        this.serviceQuotationDto.toLocation = +value.id;
        this.serviceQuotationDto.userLocationId = +value.id;
        this.serviceQuotationDto.userLocationName = value.name;
        this.GetDocMaxCount("ServiceQuotation");
        break;
      case "Supplier":
        debugger;
        // this.serviceQuotationDto.toLocation = +value.id;
        this.serviceQuotationDto.supplierId = +value.id;
        this.serviceQuotationDto.supplierName = value.title;
        this.serviceQuotationDto.supplierSerialNumber = value.serialNumber;
        break;
      case "CostCenter":
        debugger;
        this.serviceQuotationDto.costCenterId = +value.id;
        this.serviceQuotationDto.costCenterName = value.name;
        break;
      // case "Region":
      //   debugger;
      //   this.serviceQuotationDto.regionId = value.id;
      //   this.serviceQuotationDto.regionName = value.name;
      //   break;
      case "Project":
        debugger;
        this.serviceQuotationDto.projectId = +value.id;
        this.serviceQuotationDto.projectName = value.name;
        break;
      case "Site":
        debugger;
        this.serviceQuotationDto.siteId = value.id;
        this.serviceQuotationDto.siteName = value.name;
        break;
      case "VoucherStatus":
        debugger;
        this.serviceQuotationDto.voucherStatusId = +value.id;
        this.serviceQuotationDto.voucherStatusName = value.name;
        break;
      case "Employee":
        debugger;
        this.serviceQuotationDto.employeeId = value.additional;
        this.serviceQuotationDto.employeeErpId = value.id;
        this.serviceQuotationDto.employeeName = value.name;
        break;

      default:
        alert(`${title} is not defined`);
    }
  }

  async getStockDetails(
    itemId,
    locationId,
    costCenterId,
    projectId
  ): Promise<any> {
    debugger;
    return this._basicTypeService
      .getStockDetails(itemId, locationId, costCenterId, projectId)
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
      .toPromise();
  }

  async getItemBudget(
    budgetDate: any,
    costCenterId: number,
    toLocation: number,
    itemId: number,
    projectId: number
  ): Promise<any> {
    debugger;
    return this._basicTypeService
      .getItemBudget(budgetDate, costCenterId, toLocation, itemId, projectId)
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
      .toPromise();
  }

  async SelectItem(item: any) {
    debugger;
    const isItemAlreadyAdded = this.rowData.some(
      (row) => row.itemId === item.id
    );

    if (isItemAlreadyAdded) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "This item has already been added.",
        life: 2000,
      });
      return;
    }
    try {
      const { fromLocation, costCenterId, projectId, budgetDate, toLocation } =
        this.serviceQuotationDto;
      var fromStockDetails = await this.getStockDetails(
        item.id,
        this.serviceQuotationDto.fromLocation,
        this.serviceQuotationDto.fromCostCenterId,
        this.serviceQuotationDto.fromProjectId
      );
      var toStockDetails = await this.getStockDetails(
        item.id,
        this.serviceQuotationDto.toLocation,
        this.serviceQuotationDto.costCenterId,
        this.serviceQuotationDto.projectId
      );
      debugger;
      var budget = await this.getItemBudget(
        budgetDate,
        costCenterId,
        toLocation,
        item.id,
        projectId
      );

      debugger;
      console.log(fromStockDetails);
      console.log(toStockDetails);
      this.setParms.data.itemId = item.id;
      this.setParms.data.itemName = item.name;
      this.setParms.data.unitId = item.additional.split("/")[0];
      this.setParms.data.unitName = item.additional.split("/")[1];
      this.setParms.data.monthlyBudgetAvailable = budget.availableBudget;
      this.setParms.data.monthlyBudgetAmount = budget.monthlyBudget;
      this.setParms.data.monthlyBudgetConsumed = budget.budgetConsumed;
      this.setParms.data.chartOfAccountId =
        budget.itemFinancialIntegration[0].chartOfAccountId;
      this.setParms.data.chartOfAccountName =
        budget.itemFinancialIntegration[0].name;
      this.setParms.data.qtyInStockFromLoc = fromStockDetails.qtyInStock;
      this.setParms.data.lastPurchaseRate = fromStockDetails.lastPurchaseRate;
      this.setParms.data.qtyInStock = toStockDetails.qtyInStock;
      this.setParms.data.lastPurchaseRate = toStockDetails.lastPurchaseRate;
    } catch (error) {
      console.error("Error fetching stock details", error);
    }
    this.displayItem = false;
    this.rowData.push(this.setParms.data);
    this.gridApi.refreshCells();
  }

  // OnCellValueChanged(params) {
  //   debugger;
  //   if (!params.data.finalQty && params.data.acknowledgedClientQty) {
  //     params.data.finalQty = params.data.acknowledgedClientQty;
  //   }
  //   if (params.data.finalQty < 0) {
  //     params.data.finalQty = 0;
  //     this.messageService.add({
  //       severity: "error",
  //       detail: "Final Quantity cannot be negative.",
  //       life: 2000,
  //     });
  //   }
  //   if (params.data.finalQty > params.data.offerQty) {
  //     params.data.finalQty = 0;
  //     this.messageService.add({
  //       severity: "error",
  //       detail: "Final Quantity cannot be greater than Offer Quantity.",

  //       life: 2000,
  //     });
  //   }
  //   if (params.data.finalQty && params.data.grossRate) {
  //     params.data.totalAmount = Number(
  //       params.data.finalQty * params.data.grossRate
  //     );
  //   }

  //   params.data.gstAmount = Number(
  //     (params.data.totalAmount * params.data.gstPercentage) / 100
  //   );
  //   params.data.pstAmount = Number(
  //     (params.data.totalAmount * params.data.pstPercentage) / 100
  //   );
  //   // this.serviceQuotationDto.grossAmount = Number(params.data.totalAmount);
  //   // this.serviceQuotationDto.pstAmount = Number(params.data.pstAmount);
  //   // this.serviceQuotationDto.gstAmount = Number(params.data.gstAmount);

  //   // this.serviceQuotationDto.totalAmount =
  //   //   params.data.totalAmount + (params.data.pstAmount + params.data.gstAmount);

  //   // Refresh grid and recalculate amounts
  //   this.gridApi.refreshCells();
  //   this.AmountCalculations();
  // }

  OnCellValueChanged(params) {
    debugger;
    if (params.data.acknowledgedClientQty > params.data.offerQty) {
      params.data.acknowledgedClientQty = params.data.offerQty;
      this.messageService.add({
        severity: "error",
        detail:
          "Acknowledged Client Quantity cannot be greater than Offer Quantity.",
        life: 2000,
      });
    }
    if (params.data.finalQty > params.data.acknowledgedClientQty) {
      params.data.finalQty = params.data.acknowledgedClientQty;
      this.messageService.add({
        severity: "error",
        detail:
          "Final Quantity cannot be greater than Acknowledged Client Quantity.",
        life: 2000,
      });
    }
    if (!params.data.finalQty && params.data.acknowledgedQty) {
      params.data.finalQty = params.data.acknowledgedQty;
    }
    if (params.data.finalQty < 0) {
      params.data.finalQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Final Quantity cannot be negative.",
        life: 2000,
      });
    }
    if (params.data.finalQty > params.data.offerQty) {
      params.data.finalQty = 0;
      this.messageService.add({
        severity: "error",
        detail: "Final Quantity cannot be greater than Offer Quantity.",
        life: 2000,
      });
    }
    if (params.data.finalQty && params.data.grossRate) {
      params.data.totalAmount = Number(
        params.data.finalQty * params.data.grossRate
      );
    }
    params.data.gstAmount = Number(
      (params.data.totalAmount * params.data.gstPercentage) / 100
    );
    params.data.pstAmount = Number(
      (params.data.totalAmount * params.data.pstPercentage) / 100
    );
    this.gridApi.refreshCells();
    this.AmountCalculations();
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.serviceQuotationDto.userLocationId &&
      this.serviceQuotationDto.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.serviceQuotationDto.userLocationId,
          this.serviceQuotationDto.issueDate
        )
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
            this.documentNumber = response;
            this.MakeVoucher();
          },
        });
    }
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._basicTypeService
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
          this.serviceQuotationDto.userLocationName =
            response.items[0].shortName;
          this.serviceQuotationDto.userLocationId = response.items[0].id;
          this.serviceQuotationDto.toLocationName = response.items[0].shortName;
          this.serviceQuotationDto.toLocation = response.items[0].id;
          this.GetDocMaxCount("ServiceQuotation");
        },
      });
  }

  MakeVoucher() {
    debugger;

    if (this.serviceQuotationDto.userLocationId && this.documentNumber) {
      this.serviceQuotationDto.voucherNumber =
        "OF-HNL" +
        "-" +
        this.serviceQuotationDto.userLocationId +
        "-" +
        this.serviceQuotationDto.issueDate.getFullYear() +
        "-" +
        (this.serviceQuotationDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("ServiceQuotation");
    }
  }
  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    debugger;
    this.filterDto.DocOrVocNumber = inputValue;
    debugger;

    this._basicTypeService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
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
