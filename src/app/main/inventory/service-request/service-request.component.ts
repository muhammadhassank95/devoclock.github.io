import { Component, ViewChild } from "@angular/core";
import { ServiceRequest } from "../Shared/DTOs/service-request";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";
@Component({
  selector: "app-service-request",
  templateUrl: "./service-request.component.html",
})
export class ServiceRequestComponent {
  serviceRequest: ServiceRequest = new ServiceRequest();
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  today: Date = new Date();
  MinDate: Date = new Date();
  currentPage: number = 1;
  filterDto = {
    skipCount: 0,
    maxCount: 10,
  };
  getCostRate: any;
  displayModal: boolean;
  editMode: boolean;
  saving: boolean;
  loading: boolean;
  view: boolean = true;
  target = "ServiceRequisition";
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  documentNumber: string;
  // totalAmount: any;
  locationId: number;
  locationName: string;
  displayEmployeeId: number;
  supplierSerialNumber: string;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private _serviceRequestService: SetupsService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      width: 90,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
    },
    {
      headerName: "Job ID",
      editable: false,
      field: "serviceItemSerialNumber",
      resizable: true,
      width: 90,
      suppressSizeToFit: true,
    },
    {
      headerName: "",
      field: "addItem",
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
    },
    {
      headerName: "Remarks",
      editable: true,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Qty Required",
      editable: true,
      field: "qtyRequired",
      resizable: true,
      suppressSizeToFit: true,
      valueParser: function (params) {
        const newValue = parseFloat(params.newValue);
        return isNaN(newValue) ? null : newValue;
      },
    },
    {
      headerName: "Cost Rate",
      editable: true,
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
      field: "totalAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      field: "requestDate",
      headerName: "Requistion Date",
      editable: true,
      cellEditor: "agDateCellEditor",
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split("T")[0];
        }
        return "";
      },
      valueParser: (params) => {
        return new Date(params.newValue);
      },
    },
  ];

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("PQS");
  }

  getAll() {
    this._serviceRequestService
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
        this._serviceRequestService
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
      // this.editMode = true;
      this._serviceRequestService
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
            this.serviceRequest = response;
            this.supplierSerialNumber = response.supplierSerialNumber;
            this.displayEmployeeId = response.employeeErpId;
            this.rowData = response.serviceRequisitionDetails;
            debugger;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationName",
            //   "locationId",
            //   response.costCenterId
            // );
            this.serviceRequest.issueDate = new Date(response.issueDate);
            this.serviceRequest.consumptionMonth = new Date(
              response.consumptionMonth
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
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.serviceRequest = new ServiceRequest();
      this.rowData = [];
      this.serviceRequest.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  save() {
    this.saving = true;

    if (!this.serviceRequest.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher number is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.serviceRequest.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.serviceRequest.employeeId) {
      this.messageService.add({
        severity: "error",
        detail: "Employee Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    if (!this.serviceRequest.costCenterId) {
      this.messageService.add({
        severity: "error",
        detail: "Cost Center Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (
      this.serviceRequest.costCenterName == "O/H" &&
      !this.serviceRequest.ohJobName
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Note",
        detail: "Please add O/H Job",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceRequest.projectId) {
      this.messageService.add({
        severity: "error",
        detail: "Project Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.serviceRequest.supplierId) {
      this.messageService.add({
        severity: "error",
        detail: "Supplier Id is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    // if (!this.serviceRequest.comments) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: 'Narration is Required',
    //     life: 2000,
    //   });
    //   this.saving = false
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

    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        serviceItemId: node.data.serviceItemId,
        remarks: node.data.remarks,
        qtyRequired: node.data.qtyRequired,
        costRate: node.data.costRate,
        totalAmount: node.data.totalAmount,
        requestDate: node.data.requestDate,
        prNo: this.serviceRequest.voucherNumber + "/" + (index + 1),
      };
      tempArr.push(tempObj);
    });
    this.serviceRequest.serviceRequisitionDetails = tempArr;
    console.log(this.serviceRequest);
    this._serviceRequestService
      .create(this.serviceRequest, this.target)
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
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        id: node.data.id,
        serviceItemId: node.data.serviceItemId,
        remarks: node.data.remarks,
        prNo: this.serviceRequest.voucherNumber + "/" + (index + 1),
        qtyRequired: node.data.qtyRequired,
        costRate: node.data.costRate,
        totalAmount: node.data.totalAmount,
        requestDate: node.data.requestDate,
      };
      tempArr.push(tempObj);
    });
    this.serviceRequest.serviceRequisitionDetails = tempArr;
    if (
      this.serviceRequest.costCenterName == "O/H" &&
      !this.serviceRequest.ohJobName
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Note",
        detail: "Please add O/H Job",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    this._serviceRequestService
      .update(this.serviceRequest, this.target)
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
      case "Location":
        debugger;
        this.serviceRequest.userLocationId = +value.id;
        this.serviceRequest.userLocationName = value.name;
        this.GetDocMaxCount("ServiceRequisition");

        break;
      case "Project":
        debugger;
        this.serviceRequest.projectId = +value.id;
        this.serviceRequest.projectName = value.name;
        break;
      case "Employee":
        debugger;
        this.serviceRequest.employeeId = +value.additional;
        this.displayEmployeeId = value.id;
        this.serviceRequest.employeeName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.serviceRequest.costCenterId = +value.id;
        this.serviceRequest.costCenterName = value.name;
        if (
          this.serviceRequest.costCenterName == "O/H" &&
          !this.serviceRequest.ohJobName
        ) {
          this.messageService.add({
            severity: "error",
            summary: "Note",
            detail: "Please add O/H Job",
            life: 2000,
          });
        }
        break;
      case "Supplier":
        debugger;
        this.serviceRequest.supplierId = +value.id;
        this.serviceRequest.supplierName = value.title;
        this.supplierSerialNumber = value.serialNumber;
        break;
      // case "Region":
      //   debugger;
      //   this.serviceRequest.regionId = +value.id;
      //   this.serviceRequest.regionName = value.title;
      //   break;
      case "Job":
        debugger;
        this.serviceRequest.ohJobId = +value.id;
        this.serviceRequest.ohJobName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  getSerialNumber(id: any) {
    this._serviceRequestService
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
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);

      this.gridApi.applyTransaction({ remove: dataToRemove });
      const updatedRowData = [];
      this.gridApi.forEachNode((node) => updatedRowData.push(node.data));
      this.gridApi.setRowData(updatedRowData);
      this.rowCount = this.gridApi.getDisplayedRowCount();
      this.calculateTotalAmount();
    }
  }

  addIconCellRendererFunc() {
    debugger;
    return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  }

  cellClicked(params) {
    debugger;
    switch (params.column["colId"]) {
      case "addItem":
        debugger;
        this.setParms = params;
        this.openSelectItem();
        break;
      default:
        break;
    }
  }

  cellValueChanged(params) {
    debugger;
    if (
      params.colDef.field == "qtyRequired" ||
      params.colDef.field == "costRate"
    ) {
      if (params.data.qtyRequired && params.data.costRate) {
        params.data.totalAmount =
          params.data.qtyRequired * params.data.costRate;
        this.gridApi.refreshCells();
        this.calculateTotalAmount();
      }
    }
  }

  calculateTotalAmount() {
    debugger;
    let total = 0;
    this.gridApi.forEachNode((node) => {
      if (node.data.totalAmount) {
        total += node.data.totalAmount;
      }
    });
    this.serviceRequest.totalAmount = total;
  }

  openSelectItem() {
    debugger;
    const initialState: any = {
      target: "ServiceItem",
    };
    this.suggestionModalRef = this.suggestionService.show(
      SuggestionLookupTableModalComponent,
      { initialState }
    );

    this.suggestionModalRef.content.saveSuggestion.subscribe((result) => {
      debugger;
      if (!this.isIdInArray(+result.id)) {
        this.setParms.data.serviceItemId = +result.id;
        this.setParms.data.serviceItemName = result.name;
        this.setParms.data.serviceItemSerialNumber = result.serialNumber;
        this.getItemDetails("ServiceItem", result.id);
      }
      this.gridApi.refreshCells();
    });
  }

  isIdInArray(id: number): boolean {
    let found = false;
    this.gridApi.forEachNode((node: any) => {
      debugger;
      if (node.data.serviceItemId === id) {
        found = true;
      }
    });
    return found;
  }

  getItemDetails(AppService, serviceItemId: number) {
    if (serviceItemId) {
      this._serviceRequestService
        .getItemDetails(AppService, serviceItemId)
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
            this.getCostRate = response;
            this.setParms.data.costRate =
              this.getCostRate.result[serviceItemId];
            this.gridApi.refreshCells();
          },
        });
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
        this._serviceRequestService
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

  unapprove(id) {
    debugger;
    this.confirmationService.confirm({
      message: "Are you sure?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._serviceRequestService
          .UnApprove(id, this.target)
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
                  detail: "Unapproved Successfully",
                  life: 2000,
                });
                this.getAll();
              }
            },
          });
      },
    });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.serviceRequest.issueDate = value;
    }
    if (this.serviceRequest.userLocationId && this.serviceRequest.issueDate) {
      this.GetDocMaxCount("ServiceRequisition");
    }
  }

  onPageChange(event: any) {
    debugger;
    this.filterDto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.filterDto.skipCount = (this.currentPage - 1) * 5;
    this._serviceRequestService.getAll(this.target, this.filterDto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
  }

  MakeVoucher() {
    debugger;

    if (this.serviceRequest.userLocationId && this.documentNumber) {
      this.serviceRequest.voucherNumber =
        "PQS-HNL" +
        "-" +
        this.serviceRequest.userLocationId +
        "-" +
        this.serviceRequest.issueDate.getFullYear() +
        "-" +
        (this.serviceRequest.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("ServiceRequisition");
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._serviceRequestService
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
          this.serviceRequest.userLocationName = response.items[0].name;
          this.serviceRequest.userLocationId = response.items[0].id;
          this.GetDocMaxCount("ServiceRequisition");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (this.serviceRequest.userLocationId && this.serviceRequest.issueDate) {
      this._serviceRequestService
        .GetDocMaxCount(
          target,
          this.serviceRequest.userLocationId,
          this.serviceRequest.issueDate
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
  CloseModel() {
    // this.view = true;
    this.displayModal = false;
  }
  viewOnly(id?: number) {
    this.view = true;
    this.editMode = false;
    this.show(id);
    this.MinDate = null;
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
