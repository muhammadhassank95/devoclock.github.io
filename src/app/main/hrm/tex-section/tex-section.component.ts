import { Component, OnInit, Injector } from "@angular/core";
import { TaxService } from "../../hrm/shared/services/tax.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { catchError, finalize, throwError } from "rxjs";
import { TaxArrayDto, TaxDto } from "../shared/DTOs/tax-dto";
import {
  GridApi,
  GridReadyEvent,
  ColDef,
  CellEditingStoppedEvent,
} from "ag-grid-community";
import { PermissionsDto } from "@app/main/generics/models/permissionsDto.model";
import { AppComponentBase } from "@shared/app-component-base";
import { Table } from "primeng/table";

@Component({
  selector: "app-tex-section",
  templateUrl: "./tex-section.component.html",
})
export class TexSectionComponent extends AppComponentBase implements OnInit {
  displayModal: boolean = false;
  data!: any;
  count: number;
  currentPage: number = 1;
  skipCount: number = 0;
  maxCount: number = 10;
  isEditMode: boolean;
  isViewMode: boolean;
  createMode: boolean;
  saving: boolean = false;
  taxDto: TaxDto = new TaxDto();
  loading: boolean;
  protected gridApi: GridApi;
  rowSelection: string;
  rowCount: number;
  rowData: any[] = [];
  protected setParms;
  mydate = new Date();
  permissions: PermissionsDto;
  today: Date = new Date();
  constructor(
    injector: Injector,
    private _textService: TaxService,
    private messageService: MessageService,
    private confirmationService?: ConfirmationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.permissions = new PermissionsDto("IncomeTaxDeductionPolicy");
    this.getAll();
    this.onClose();
  }

  getAll() {
    debugger;
    this._textService
      .getAll("IncomeTaxDeductionPolicy", this.skipCount, this.maxCount)
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
          this.data = response.items;
          this.count = response.totalCount;
          this.taxDto = new TaxDto();
        },
      });
  }

  onPageChange(event: any) {
    debugger;
    this.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.skipCount = (this.currentPage - 1) * this.maxCount;
    this._textService
      .getAll("IncomeTaxDeductionPolicy", this.skipCount, this.maxCount)
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }

  // openModal(id?: number) {
  //     debugger
  //     this.displayModal = true;
  //     if (id) {
  //         this.isViewMode = true;
  //         this._textService.getDataForEdit(id)
  //             .pipe(
  //                 finalize(() => { }),
  //                 catchError(error => {
  //                     debugger
  //                     this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error.message, life: 2000 });
  //                     return throwError(error.error.error.message);
  //                 })
  //             ).subscribe({
  //                 next: (response) => {
  //                     debugger
  //                     this.taxDto = response
  //                     this.taxDto.applicableFrom = new Date(response.applicableFrom)
  //                     this.rowData = response.details
  //                     this.taxDto.voucherNumber = response.voucherNumber

  //                     // this.taxDto.designationId = response.targetId
  //                     // this.taxDto.designationName = response.targetName
  //                     // this.taxDto.departmentId = response.targetId
  //                     // this.taxDto.departmentName = response.targetName
  //                     // this.taxDto.gradeId = response.targetId
  //                     // this.taxDto.gradeName = response.targetName
  //                     // this.taxDto.empTypeId = response.targetId
  //                     // this.taxDto.empTypeName = response.targetName
  //                 }
  //             });

  //     } else {
  //         this.isViewMode = false;
  //         this.rowData = []
  //         this.taxDto = new TaxDto();
  //     }
  // }

  openModal(id?: number) {
    debugger;
    this.displayModal = true;
    if (id) {
      this._textService
        .getDataForEdit(id)
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
            this.taxDto = response;
            this.taxDto.id = response.id;
            this.taxDto.isActive = response.isActive;
            this.taxDto.issueDate = new Date(response.issueDate);
            this.taxDto.willEffectFromDate = new Date(
              response.willEffectFromDate
            );
            this.taxDto.voucherNumber = response.voucherNumber;
            this.taxDto.incomeTaxDeductionPolicyDetails =
              response.incomeTaxDeductionPolicyDetails.map((detail) => {
                let taxArrayDto = new TaxArrayDto();
                taxArrayDto.fromAmount = detail.fromAmount;
                taxArrayDto.toAmount = detail.toAmount;
                taxArrayDto.percentage = detail.percentage;
                taxArrayDto.amount = detail.amount;
                return taxArrayDto;
              });
            debugger;
            this.rowData = this.taxDto.incomeTaxDeductionPolicyDetails;
          },
        });
    } else {
      this.rowData = [];
      this.taxDto = new TaxDto();
      this.taxDto.incomeTaxDeductionPolicyDetails = [];
    }
  }

  create() {
    debugger;
    this.saving = true;
    let tempArray = [];
    if (this.gridApi) {
      this.gridApi.forEachNode((node) => {
        tempArray.push(node.data);
      });
    }
    this.rowData = tempArray;
    this.taxDto.incomeTaxDeductionPolicyDetails = this.rowData;

    if (!this.createMode) {
      this._textService
        .Edit(this.taxDto)
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
              detail: "Updated Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
    } else {
      this._textService
        .create(this.taxDto)
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
              detail: "Saved Successfully",
              life: 2000,
            });
            this.getAll();
            this.saving = false;
            this.displayModal = false;
          },
        });
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
        this._textService
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

  openCreateModal() {
    this.displayModal = true;
    this.taxDto = new TaxDto();
    this.taxDto.issueDate = this.today;
    this.taxDto.incomeTaxDeductionPolicyDetails = [];
    this.rowData = [];
    this.getDefaultLocation("Location", "locationName", "locationId", "");
    this.createMode = true;
    this.isEditMode = true;
    this.isViewMode = false;
  }

  onClose() {
    debugger;
    this.displayModal = false;
  }

  colDefs: ColDef[] = [
    {
      headerName: "SrNo",
      editable: false,
      field: "srNo",
      sortable: true,
      valueGetter: "node.rowIndex+1",
      suppressSizeToFit: true,
      width: 80,
    },
    {
      headerName: "Amount From",
      editable: true,
      field: "fromAmount",
      resizable: true,
      suppressSizeToFit: true,
    },

    {
      headerName: "Amount To",
      editable: true,
      field: "toAmount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax Percentage",
      field: "percentage",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
    {
      headerName: "Tax Amount",
      field: "amount",
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
      editable: true,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowSelection = "multiple";
  }
  onAddRow() {
    const newItem: any = {};
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
    this.gridApi.applyTransaction({
      remove: selectedNodes.map((node) => node.data),
    });
    this.rowCount = this.gridApi.getDisplayedRowCount();
  }

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    const data = event.data;
    if (data.fromAmount && data.toAmount && data.percentage !== undefined) {
      const toAmount = parseFloat(data.toAmount);
      if (event.colDef.field === "percentage") {
        data.amount = (toAmount * data.percentage) / 100;
      } else if (event.colDef.field === "amount") {
        data.percentage = (data.amount / toAmount) * 100;
      }
      this.gridApi.refreshCells({ rowNodes: [event.node] });
    }
  }
  onDialogClose() {
    this.confirmationService.confirm({
      message: "Are you sure you want to close without saving?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.displayModal = false;
      },
      reject: () => {
        this.displayModal = true;
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
        this._textService
          .approveDocument(id, "IncomeTaxDeductionPolicy")
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
  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.taxDto.issueDate = value;
    }
    if (this.taxDto.userLocationId && this.taxDto.issueDate) {
      this.getVoucherNumber();
    }
  }
  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._textService
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
          this.taxDto.userLocationName = response.items[0].name;
          this.taxDto.userLocationId = response.items[0].id;
          this.getVoucherNumber();
        },
      });
  }
  getVoucherNumber() {
    debugger;
    this._textService
      .getVoucherNumber(
        "IncomeTaxDeductionPolicy",
        "ITDP",
        this.taxDto.issueDate,
        this.taxDto.userLocationId
      )
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          debugger;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Please Select Location Id to make correct voucher number",
            life: 2000,
          });
          return throwError(error.error.error.message);
        })
      )
      .subscribe({
        next: (response) => {
          debugger;
          this.taxDto.voucherNumber = response;
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }
  edit(id: number) {
    this.isEditMode = true;
    this.createMode = false;
    this.isViewMode = false;
    this.openModal(id);
  }
  viewOnly(id?: number) {
    this.isViewMode = true;
    this.isEditMode = false;
    this.openModal(id);
  }
  setPickerValue(value: any, title: string) {
    debugger;
    switch (title) {
      case "Location":
        this.taxDto.userLocationId = value.id;
        this.taxDto.userLocationName = value.name;
        this.getVoucherNumber();
        break;
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  onEnter(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.loading = true;
    this._textService
      .getAll(
        "IncomeTaxDeductionPolicy",
        this.skipCount,
        this.maxCount,
        inputValue
      )
      .subscribe({
        next: (response) => {
          debugger;

          this.data = response.items;
          this.count = response.totalCount;

          this.loading = false;
        },
      });
  }
}
