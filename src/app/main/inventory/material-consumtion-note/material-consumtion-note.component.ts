import { MaterialConsumptionNoteService } from "./../Shared/Services/material-consumption-note.service";
import { MaterialConsumtionNoteDto } from "./../Shared/DTOs/material-consumtion-note-dto";
import { Component, ViewChild } from "@angular/core";
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
  selector: "app-material-consumtion-note",
  templateUrl: "./material-consumtion-note.component.html",
})
export class MaterialConsumtionNoteComponent {
  materialConsumtionNoteDto: MaterialConsumtionNoteDto =
    new MaterialConsumtionNoteDto();
  restrictionDto: RestrictionDto = new RestrictionDto();
  docCount: number;
  calendar_disability: boolean;
  tableData: any;
  requisitionData: any;
  count: number;
  displayModal: boolean;
  displayRequisition: boolean;
  documentNumber: string;
  editMode: boolean;
  view: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  saving: boolean;
  target = "MaterialConsumptionNote";
  rowData: any;
  protected gridApi: GridApi;
  protected setParms;
  rowCount: number;
  rowSelection: string;
  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;
  serviceRequistionId: number;
  selectedIds: number[] = [];
  constructor(
    private _materialConsumptionNoteService: MaterialConsumptionNoteService,
    private _basicTypeService: SetupsService,
    private _restrictionService: RestrictionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {}

  getAll() {
    this._materialConsumptionNoteService
      .getAll()
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
        this._materialConsumptionNoteService
          .delete(id)
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
            this.materialConsumtionNoteDto = response;
            // this.getDefaultLocation(
            //   "Location",
            //   "locationId",
            //   "locationName",
            //   response.userLocationName
            // );
            this.materialConsumtionNoteDto.issueDate = new Date(
              response.issueDate
            );
            this.materialConsumtionNoteDto.userLocationId =
              response.userLocationId;
            this.materialConsumtionNoteDto.userLocationName =
              response.userLocationName;
            this.materialConsumtionNoteDto.employeeId = response.employeeErpId;
            this.materialConsumtionNoteDto.employeeName = response.employeeName;
            this.rowData = this.prepareGridDataForMaterial(
              response.materialConsumptionNoteDetails
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
      this.getDefaultLocation("Location", "locationId", "locationName", "");
      this.editMode = false;
      this.view = false;
      this.displayModal = true;
      this.materialConsumtionNoteDto = new MaterialConsumtionNoteDto();
      this.selectedIds = [];
      this.rowData = [];
      this.materialConsumtionNoteDto.issueDate = this.today;
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      // this.stockTransferRequest.isActive = true;
    }
  }

  save() {
    if (!this.materialConsumtionNoteDto.issueDate) {
      this.messageService.add({
        severity: "error",
        detail: "Buy Month is Required",
      });
      this.saving = false;
      return;
    }
    if (!this.materialConsumtionNoteDto.voucherNumber) {
      this.messageService.add({
        severity: "error",
        detail: "Voucher is Required",
      });
      this.saving = false;
      return;
    }

    // if (!this.materialConsumtionNoteDto.remarks) {
    //   this.messageService.add({
    //     severity: "error",
    //     detail: "Narration is Required",
    //   });
    //   this.saving = false;
    //   return;
    // }

    this.saving = true;
    var tempArr = [];
    this.gridApi.forEachNode((node, index) => {
      var tempObj = {
        partIssuanceNoteDetailId: node.data.partIssuanceNoteDetailId,
        consumptionQty: node.data.consumptionQty,
        issuedQty: node.data.issuedQty,
        remarks: node.data.remarks,
        id: node.data.id,
        // acknowledgeQty: node.data.qtyAck,
        // inspectedQty: node.data.gipIns,
        // rejectedQty: node.data.rejQty,
        // gatepassQtyIn: node.data.gipQty,
        // rate: node.data?.rate || 0,
        // totalAmount: node.data.totalAmount,
        // inwardVoucherNumber:this.materialConsumtionNoteDto.voucherNumber + "/" + (index + 1),
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    this.materialConsumtionNoteDto.materialConsumptionNoteDetails = tempArr;

    this._materialConsumptionNoteService
      .create(this.materialConsumtionNoteDto)
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
        partIssuanceNoteDetailId: node.data.partIssuanceNoteDetailId,
        consumptionQty: node.data.consumptionQty,
        issuedQty: node.data.issuedQty,
        remarks: node.data.remarks,
        id: node.data.id,
        itemId: node.data.itemId,
        itemName: node.data.itemName,
      };
      tempArr.push(tempObj);
    });
    this.materialConsumtionNoteDto.materialConsumptionNoteDetails = tempArr;
    this._materialConsumptionNoteService
      .update(this.materialConsumtionNoteDto)
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
      case "Location":
        debugger;
        this.materialConsumtionNoteDto.userLocationId = +value.id;
        this.materialConsumtionNoteDto.userLocationName = value.name;
        this.GetDocMaxCount("MaterialConsumptionNote");
        break;
      case "Employee":
        debugger;
        this.materialConsumtionNoteDto.employeeId = +value.id;
        this.materialConsumtionNoteDto.employeeName = value.name;
        break;
      default:
        alert(`${title} is not defined`);
    }
  }

  HandleDateChange(value: Date) {
    this.materialConsumtionNoteDto.issueDate = value;
    debugger;
    const { issueDate, userLocationId } = this.materialConsumtionNoteDto;
    if (issueDate && userLocationId) {
      // this.getNextCount();
    }
  }

  getNextCount() {
    debugger;
    const { issueDate, userLocationId } = this.materialConsumtionNoteDto;
    if (issueDate && userLocationId) {
      this._materialConsumptionNoteService
        .getMaxCount(new Date(issueDate), userLocationId)
        .subscribe((result) => {
          this.docCount = result;
          this.MakeVoucher();
        });
    }
  }

  MakeVoucher() {
    debugger;
    if (
      this.materialConsumtionNoteDto.userLocationId &&
      this.materialConsumtionNoteDto.issueDate
    ) {
      this.materialConsumtionNoteDto.voucherNumber =
        "MCN-HNL" +
        "-" +
        this.materialConsumtionNoteDto.userLocationId +
        "-" +
        this.materialConsumtionNoteDto.issueDate.getFullYear() +
        "-" +
        (this.materialConsumtionNoteDto.issueDate.getMonth() + 1) +
        "-" +
        this.documentNumber;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Select Document Date",
        life: 2000,
      });
      //this.GetDocMaxCount("InwardGatepass");
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
          this.materialConsumtionNoteDto.userLocationName =
            response.items[0]?.shortName;
          this.materialConsumtionNoteDto.userLocationId = response.items[0].id;
          this.GetDocMaxCount("MaterialConsumptionNote");
        },
      });
  }
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.materialConsumtionNoteDto.issueDate = value;
    }
    if (
      this.materialConsumtionNoteDto.userLocationId &&
      this.materialConsumtionNoteDto.issueDate
    ) {
      this.GetDocMaxCount("MaterialConsumptionNote");
    }
  }

  GetDocMaxCount(target: string) {
    debugger;
    if (
      this.materialConsumtionNoteDto.userLocationId &&
      this.materialConsumtionNoteDto.issueDate
    ) {
      this._basicTypeService
        .GetDocMaxCount(
          target,
          this.materialConsumtionNoteDto.userLocationId,
          this.materialConsumtionNoteDto.issueDate
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
  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  OpenServiceRequisition() {
    debugger;
    this.displayRequisition = true;
    this.GetRequisitions();
  }

  GetRequisitions() {
    this._basicTypeService
      .getAllRequisition("PartIssuanceNote")
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
          this.requisitionData = response.items;
          // .filter((item) =>item.status == "APPROVED" && item.inspectionStatus == "PENDING"
          // );
        },
      });
  }

  SelectRequisition(id: number) {
    this._basicTypeService
      .getDataForEdit(id, "PartIssuanceNote")
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
          // if (response.partIssuanceNoteDetails.filter((i) => i.pendingConsumptionQty < 0)) {
          //   this.messageService.add({
          //     severity: "error",
          //     summary: "Error",
          //     detail: "Issued Qty is Less then 0",
          //   });
          //   return;
          // }
          this.materialConsumtionNoteDto.employeeId = response.employeeErpId;
          this.materialConsumtionNoteDto.employeeName = response.employeeName;
          this.selectedIds.push(response.id);
          this.rowData = this.prepareGridData(response);
          this.displayRequisition = false;
        },
      });
  }

  prepareGridData(response: any): any[] {
    debugger;

    var mapped_details = response.partIssuanceNoteDetails.map(
      (item, index) => ({
        partIssuanceNoteDetailId: item.id,
        issuedQty: item.pendingConsumptionQty,
        consumptionQty: item.pendingConsumptionQty,
        voucherNumber: item.voucherNumber,
        itemId: item.itemId,
        itemName: item.itemName,
        remarks: item.remarks,
      })
    );
    return mapped_details;
  }

  prepareGridDataForMaterial(materialConsumptionNoteDetails: any): any[] {
    debugger;
    var details = materialConsumptionNoteDetails.map((item, index) => ({
      partIssuanceNoteDetailId: item.partIssuanceNoteDetailId,
      id: item.id,
      issuedQty: item.issuedQty,
      consumptionQty: item.consumptionQty,
      voucherNumber: item.partIssuanceNoteVoucherNumber,
      itemId: item.itemId,
      itemName: item.itemName,
      remarks: item.remarks,
    }));
    return details;
  }

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      width: 100,
    },
    {
      headerName: "Item ID",
      editable: false,
      field: "itemId",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "Item Title",
      editable: false,
      field: "itemName",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "Store Issuance.NO",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "QTY Issued",
      editable: false,
      field: "issuedQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "QTY",
      editable: true,
      field: "consumptionQty",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
    {
      headerName: "Remarks",
      editable: false,
      field: "remarks",
      resizable: true,
      suppressSizeToFit: true,
      width: 300,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
    this.rowData = [];
  }

  OnCellValueChanged(params) {
    debugger;

    if (params.data.rejQty > params.data.gipIns) {
      params.data.rejQty = 0;
      params.data.totalAmount = 0;
      this.gridApi.refreshCells();
      this.messageService.add({
        severity: "error",
        detail: "REJ QTY exceeds GIP INS QTY",
      });
      this.saving = false;
      return;
    }
    params.data.qtyAck = params.data.gipQty - params.data.rejQty;
    params.data.totalAmount = params.data.rate * params.data.qtyAck;
    this.gridApi.refreshCells();
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

  CloseModel() {
    this.displayModal = false;
  }

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("SCN");
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
