import { Component, Input, ViewChild } from "@angular/core";
import { SetupsService } from "../Shared/Services/inventory-setup.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { catchError, finalize, throwError } from "rxjs";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { GateOutward } from "../Shared/DTOs/gate-outward";
import { InwardGatePass } from "../Shared/DTOs/gate-pass-dtos";
import { MaterialReturnNote } from "../Shared/DTOs/material-return-note";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-gate-outward-pass",
  templateUrl: "./gate-outward-pass.component.html",
})
export class GateOutwardPassComponent {
  gateOutwardDto: GateOutward = new GateOutward();
  inwardGatePassDto: InwardGatePass = new InwardGatePass();
  materialReturnNote: MaterialReturnNote = new MaterialReturnNote();
  restrictionDto: RestrictionDto = new RestrictionDto();
  isCopyMaterialReturnNoteModalVisible: boolean = false;

  tableData: any;
  count: number;
  displayModal: boolean;
  displayRequisition: boolean;
  editMode: boolean;
  employeeId: number;
  employeeName: string;
  chartOfAccountId: number;
  chartOfAccountName: string;
  costCenterId: number;
  costCenterName: string;
  isReturnable: false;
  departmentId: number;
  projectId: number;
  projectName: string;
  departmentName: string;
  reference: string;
  referenceDate: Date;
  today: Date = new Date();
  MinDate: Date = new Date();
  destination: string;
  driver: string;
  vehicleRegistrationNumber: number;
  saving: boolean;
  target = "OutwardGatepass";
  loading: boolean = false;
  requisitionData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  documentNumber: string;
  currentModalType: string;
  rowCount: number;
  rowData: any;
  view: boolean;
  @Input() disabled: boolean = false;

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

  show(id?: number) {
    debugger;
    if (id) {
      //   this.editMode = true;
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
            debugger;
            this.gateOutwardDto = response;
            this.gateOutwardDto.id = response.id;
            this.rowData = this.prepareGridData(response.outwardDetails);
            // this.getDefaultLocation(
            //   "Location",
            //   "gO_UserLocationName",
            //   "gO_UserLocationId",
            //   response.costCenterId
            // );
            this.gateOutwardDto.issueDate = new Date(response.issueDate);
            this.gateOutwardDto.timeOut = this.formatTime(response.timeOut);
            this.gateOutwardDto.dcDate = new Date(response.dcDate);
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
      this.getDefaultLocation(
        "Location",
        "gO_UserLocationName",
        "gO_UserLocationId",
        ""
      );
      this.editMode = false;
      this.view = false;
      // this.gatePassDtos.destinationId = null;
      // this.gatePassDtos.destinationName = null;
      this.gateOutwardDto.voucherNumber = null;
      this.gateOutwardDto.issueDate = null;
      this.departmentId = null;
      this.departmentName = null;
      this.employeeId = null;
      this.employeeName = null;
      this.chartOfAccountId = null;
      this.chartOfAccountName = null;
      this.reference = null;
      this.referenceDate = null;
      this.displayModal = true;
      this.gateOutwardDto = new GateOutward();
      this.rowData = [];
      this.gateOutwardDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
    }
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  save() {
    debugger;
    this.saving = true;

    // if (!this.gateOutwardDto.voucherNumber) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Voucher number is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    if (!this.gateOutwardDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Date is Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    // if (!this.gatePassDtos.employeeId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Employee Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.chartOfAccountId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Cost Center Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.p) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Project Id is Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    // if (!this.gatePassDtos.ohJobId) {
    //     this.messageService.add({
    //         severity: "error",
    //         detail: 'Oh Job is Id Required',
    //         life: 2000,
    //     });
    //     this.saving = false
    //     return;
    // }

    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "items are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }

    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        refDetailId: node.data.refDetailId,
        itemId: node.data.itemId,
        uoMId: node.data.uoMId,
        remarks: node.data.remarks,
        weight: node.data.weight,
        refVoucherNumber: this.gateOutwardDto.voucherNumber + "/" + (index + 1),
        refQty: node.data.refQty,
        qtyOut: node.data.qtyOut,
        rate: node.data.rate,
      };
      tempArr.push(tempObj);
    });

    this.gateOutwardDto.outwardDetails = tempArr;

    // this.gatePassDtos.isReturnable = this.gatePassDtos.isReturnable ? 'Returnable' : 'Non-Returnable'
    console.log(this.gateOutwardDto);
    this._serviceRequestService
      .create(this.gateOutwardDto, this.target)
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
        refDetailId: node.data.refDetailId,
        itemId: node.data.itemId,
        uoMId: node.data.uoMId,
        remarks: node.data.remarks,
        weight: node.data.weight,
        refVoucherNumber: this.gateOutwardDto.voucherNumber,
        refQty: node.data.refQty,
        qtyOut: node.data.qtyOut,
        rate: node.data.rate,
      };
      tempArr.push(tempObj);
    });
    this.gateOutwardDto.outwardDetails = tempArr;
    this._serviceRequestService
      .update(this.gateOutwardDto, this.target)
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

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("GOP");
  }

  getAll() {
    this._serviceRequestService
      .getAll(this.target)
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
        // this.gatePassDtos.items = this.gatePassDtos.items.map(({ qtyOut, ...rest }) => rest);
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

  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        debugger;
        this.gateOutwardDto.userLocationId = +value.id;
        this.gateOutwardDto.userLocationName = value.name;
        this.GetDocMaxCount("OutwardGatepass");
        break;
      case "Employee":
        debugger;
        this.gateOutwardDto.employeeId = +value.additional;
        this.gateOutwardDto.employeeName = value.name;
        break;
      case "ChartOfAccount":
        debugger;
        this.chartOfAccountId = +value.id;
        this.chartOfAccountName = value.name;
        break;
      case "Department":
        debugger;
        this.departmentId = +value.id;
        this.gateOutwardDto.departmentId = +value.id;
        this.gateOutwardDto.departmentName = value.name;
        break;
      case "Project":
        debugger;
        this.projectId = +value.id;
        this.gateOutwardDto.projectId = +value.id;
        this.gateOutwardDto.projectName = value.name;
        break;
      case "Supplier":
        debugger;
        this.gateOutwardDto.supplierId = +value.id;
        this.gateOutwardDto.supplierName = value.name;
        break;
      case "CostCenter":
        debugger;
        this.gateOutwardDto.costCenterId = +value.id;
        this.gateOutwardDto.costCenterName = value.name;
        this.gateOutwardDto.costCenterId = +value.id;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

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
      headerName: "Remarks",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Weight",
      editable: false,
      field: "weight",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "UOM ID",
      editable: false,
      field: "uoMId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "UOM Title",
      editable: false,
      field: "uoMName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Ref Qty",
      editable: false,
      field: "refQty",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Qty OUT",
      editable: true,
      field: "qtyOut",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = [];
    this.rowSelection = "multiple";
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

  openSelectItem() {
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
      this.setParms.data.itemId = +result.id.split("/")[0];
      this.setParms.data.itemName = result.name;
      this.gridApi.refreshCells();
    });
  }

  // OpenFixedRequisition() {
  //     debugger
  //     this.displayRequisition = true
  //     this.GetRequisitions();
  // }

  // HandleCopyMaterialReturnNote() {
  //     this.isCopyMaterialReturnNoteModalVisible = true;
  //     this.loading = true
  //     this._serviceRequestService.getAll("MaterialReturnNote")
  //         .pipe(
  //             finalize(() => { this.loading = false; }),
  //             catchError(error => {
  //                 debugger
  //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
  //                 return throwError(error.error.error.message);
  //             })
  //         )
  //         .subscribe({
  //             next: (response) => {
  //                 this.loading = false
  //                 debugger
  //                 this.requisitionData = response.items
  //                 // .filter((item) => item.status == 'APPROVED' && item.outwardStatus == 'PENDING')
  //             }
  //         });
  // }

  // GetRequisitions() {
  //     this.loading = true
  //     this._serviceRequestService.getAll("InwardGatepass")
  //         .pipe(
  //             finalize(() => { this.loading = false; }),
  //             catchError(error => {
  //                 debugger
  //                 this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
  //                 return throwError(error.error.error.message);
  //             })
  //         )
  //         .subscribe({
  //             next: (response) => {
  //                 this.loading = false
  //                 debugger
  //                 this.requisitionData = response.items
  //                 // .filter((item) => item.status == 'APPROVED' && item.outwardStatus == 'PENDING')
  //             }
  //         });
  // }

  // getDataForEdit(id: number, target: string, obj, modalOpener: boolean) {
  //     this._serviceRequestService.getDataForEdit(id, target)
  //         .pipe(
  //             finalize(() => { }),
  //             catchError(error => {
  //                 debugger
  //                 this.messageService.add({ severity: 'error', summary: 'Err  or', detail: error.error.error.message });
  //                 return throwError(() => new Error(error.error.error.message))
  //             })
  //         )
  //         .subscribe({
  //             next: (response) => {
  //                 console.log(response);
  //                 obj = response
  //                 modalOpener = false
  //                 // debugger
  //                 // this.chartOfAccountId = response.chartOfAccountId;
  //                 // this.chartOfAccountName = response.chartOfAccountName;
  //                 // this.gateOutwardDto.employeeId = response.employeeId;
  //                 // this.gateOutwardDto.employeeName = response.employeeName;
  //                 // this.gateOutwardDto.departmentId = response.departmentId;
  //                 // this.gateOutwardDto.departmentName = response.departmentName;
  //                 // this.gateOutwardDto.dcNumber = response.dcNumber;
  //                 // this.gateOutwardDto.dcDate = new Date(response.dcDate);
  //                 // this.gateOutwardDto.destination = response.destination;
  //                 // this.gateOutwardDto.costCenterId = response.costCenterId;
  //                 // this.gateOutwardDto.costCenterName = response.costCenterName;
  //                 // this.gateOutwardDto.projectId = response.projectId;
  //                 // this.gateOutwardDto.projectName = response.projectName;
  //                 // this.isReturnable = response.isReturnable
  //                 // this.gateOutwardDto.driver = response.driver;
  //                 // this.gateOutwardDto.vehicleRegistrationNumber = response.vehicleRegistrationNumber;
  //                 // this.rowData = response.inwardDetails;
  //                 // this.rowData = response.inwardDetails.map(item => ({
  //                 //     refDetailId: item.id,
  //                 //     ...item
  //                 // }));
  //                 // this.displayRequisition = false
  //             }
  //         });
  // }

  // SelectRequisition(id: number) {
  //     debugger
  //     this._serviceRequestService.getDataForEdit(id, "InwardGatepass")
  //         .pipe(
  //             finalize(() => { }),
  //             catchError(error => {
  //                 debugger
  //                 this.messageService.add({ severity: 'error', summary: 'Err  or', detail: error.error.error.message, life: 2000 });
  //                 return throwError(error.error.error.message);
  //             })
  //         )
  //         .subscribe({
  //             next: (response) => {
  //                 debugger
  //                 this.chartOfAccountId = response.chartOfAccountId;
  //                 this.chartOfAccountName = response.chartOfAccountName;
  //                 this.gateOutwardDto.employeeId = response.employeeId;
  //                 this.gateOutwardDto.employeeName = response.employeeName;
  //                 this.gateOutwardDto.departmentId = response.departmentId;
  //                 this.gateOutwardDto.departmentName = response.departmentName;
  //                 this.gateOutwardDto.dcNumber = response.dcNumber;
  //                 this.gateOutwardDto.dcDate = new Date(response.dcDate);
  //                 this.gateOutwardDto.destination = response.destination;
  //                 this.gateOutwardDto.costCenterId = response.costCenterId;
  //                 this.gateOutwardDto.costCenterName = response.costCenterName;
  //                 this.gateOutwardDto.projectId = response.projectId;
  //                 this.gateOutwardDto.projectName = response.projectName;
  //                 this.isReturnable = response.isReturnable
  //                 this.gateOutwardDto.driver = response.driver;
  //                 this.gateOutwardDto.vehicleRegistrationNumber = response.vehicleRegistrationNumber;
  //                 this.rowData = response.inwardDetails;
  //                 this.rowData = response.inwardDetails.map(item => ({
  //                     refDetailId: item.id,
  //                     ...item
  //                 }));
  //                 this.displayRequisition = false
  //             }
  //         });
  // }

  openModal(modalType: "gateInward" | "materialReturn") {
    this.loading = true;
    const endpoint =
      modalType === "gateInward" ? "InwardGatepass" : "MaterialReturnNote";
    this.displayRequisition = true;

    this._serviceRequestService
      .getAll(endpoint)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
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
          this.requisitionData = response.items;
          this.currentModalType = modalType;
        },
      });
  }

  selectItem(id: number) {
    const endpoint =
      this.currentModalType === "gateInward"
        ? "InwardGatepass"
        : "MaterialReturnNote";
    this._serviceRequestService
      .getDataForEdit(id, endpoint)
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
          if (this.currentModalType === "gateInward") {
            this.handleGateInwardSelection(response);
          } else {
            this.handleMaterialReturnSelection(response);
          }
          this.displayRequisition = false;
        },
      });
  }

  handleGateInwardSelection(response: any) {
    this.chartOfAccountId = response.chartOfAccountId;
    this.chartOfAccountName = response.chartOfAccountName;
    this.gateOutwardDto.employeeId = response.employeeId;
    this.gateOutwardDto.employeeName = response.employeeName;
    this.gateOutwardDto.departmentId = response.departmentId;
    this.gateOutwardDto.departmentName = response.departmentName;
    this.gateOutwardDto.dcNumber = response.dcNumber;
    this.gateOutwardDto.dcDate = new Date(response.dcDate);
    this.gateOutwardDto.destination = response.destination;
    this.gateOutwardDto.costCenterId = response.costCenterId;
    this.gateOutwardDto.costCenterName = response.costCenterName;
    this.gateOutwardDto.projectId = response.projectId;
    this.gateOutwardDto.projectName = response.projectName;
    this.isReturnable = response.isReturnable;
    this.gateOutwardDto.driver = response.driver;
    this.gateOutwardDto.vehicleRegistrationNumber =
      response.vehicleRegistrationNumber;
    this.rowData = response.inwardDetails;
    this.rowData = response.inwardDetails.map((item) => ({
      refDetailId: item.id,
      ...item,
    }));
  }
  handleMaterialReturnSelection(response: any) {
    this.chartOfAccountId = response.chartOfAccountId;
    this.chartOfAccountName = response.chartOfAccountName;
    this.gateOutwardDto.employeeId = response.employeeId;
    this.gateOutwardDto.employeeName = response.employeeName;
    this.gateOutwardDto.departmentId = response.departmentId;
    this.gateOutwardDto.departmentName = response.departmentName;
    this.gateOutwardDto.dcNumber = response.dcNumber;
    this.gateOutwardDto.dcDate = new Date(response.dcDate);
    this.gateOutwardDto.destination = response.destination;
    this.gateOutwardDto.costCenterId = response.costCenterId;
    this.gateOutwardDto.costCenterName = response.costCenterName;
    this.gateOutwardDto.projectId = response.projectId;
    this.gateOutwardDto.projectName = response.projectName;
    this.isReturnable = response.isReturnable;
    this.gateOutwardDto.driver = response.driver;
    this.gateOutwardDto.vehicleRegistrationNumber =
      response.vehicleRegistrationNumber;
    this.rowData = response.details;
    this.rowData = response.details.map((item) => ({
      refDetailId: item.id,
      ...item,
    }));
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.gateOutwardDto.issueDate = value;
    }
    if (this.gateOutwardDto.userLocationId && this.gateOutwardDto.issueDate) {
      this.GetDocMaxCount("OutwardGatepass");
    }
  }

  MakeVoucher() {
    debugger;
    if (this.gateOutwardDto.userLocationId && this.documentNumber) {
      this.gateOutwardDto.voucherNumber =
        "GO-HNL" +
        "-" +
        this.gateOutwardDto.userLocationId +
        "-" +
        this.gateOutwardDto.issueDate.getFullYear() +
        "-" +
        (this.gateOutwardDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.GetDocMaxCount("OutwardGatepass");
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
          this.gateOutwardDto.userLocationName = response.items[0].name;
          this.gateOutwardDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("OutwardGatepass");
        },
      });
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (this.gateOutwardDto.userLocationId && this.gateOutwardDto.issueDate) {
      this._serviceRequestService
        .GetDocMaxCount(
          target,
          this.gateOutwardDto.userLocationId,
          this.gateOutwardDto.issueDate
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

  cellValueChanged(params) {
    debugger;
    if (params.colDef.field == "qtyIn" || params.colDef.field == "qtyOut") {
      if (params.data.qtyOut > params.data.qtyIn) {
        params.data.qtyOut = 0;
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Qty Out is greater then Qty In",
        });
        this.gridApi.refreshCells();
      }
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
          .Approve(id, this.target)
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

  prepareGridData(data: any[]): any[] {
    console.log(data);
    debugger;
    return data.map((item, index) => ({
      id: item.id,
      qtyOut: item.qtyOut,
      itemId: item.itemId,
      itemName: item.itemName,
      remarks: item.remarks,
      refQty: item.refQty,
      uoMId: item.uoMId,
      uoMName: item.uoMName,
      weight: item.weight,
      rate: item.rate,
      // requisitionId: item.requisitionId,
    }));
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
  currentState: "default" | "gateInward" | "materialReturn" = "default";

  isFieldDisabled(fieldName: string): boolean {
    if (this.currentState === "gateInward") {
      return true;
    } else if (this.currentState === "materialReturn") {
      return fieldName === "project" || fieldName === "costCenter";
    }
    return false;
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
