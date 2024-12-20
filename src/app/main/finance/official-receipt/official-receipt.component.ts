import { Component, ViewChild } from "@angular/core";
import { OfficialReceipt } from "../Shared/Dtos/official-receipt";
import { FinanceModuleService } from "../Shared/Services/finance-module.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, finalize, throwError } from "rxjs";
import { GridApi, GridReadyEvent, ColDef } from "ag-grid-community";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { SuggestionLookupTableModalComponent } from "@shared/components/suggestion-lookup-table-modal/SuggestionLookupTableModalComponent";
import { Table } from "primeng/table";
import { RestrictionDto } from "../../budget/shared/Dtos/restriction-dto";
import { RestrictionService } from "../../budget/shared/services/restriction.service";
import { mapRestrictionDto } from "@shared/Utials/utils";

@Component({
  selector: "app-official-receipt",
  templateUrl: "./official-receipt.component.html",
})
export class OfficialReceiptComponent {
  restrictionDto: RestrictionDto = new RestrictionDto();
  tableData: any;
  count: number;
  displayModal: boolean;
  dataForEdit: any;
  editMode: boolean;
  viewMode: boolean;
  saving: boolean;
  loading: boolean;
  today: Date = new Date();
  MinDate: Date = new Date();
  currentPage = 1;
  dto = {
    skipCount: 0,
    maxCount: 5,
  };

  target = "OfficialReceipt";
  officialReceiptForm: FormGroup;
  protected gridApi: GridApi;
  protected setParms;
  rowSelection: string;
  rowCount: number;
  rowData: any;
  adjustmentData: any;
  displayAdjustment: boolean;
  displayRequisition: boolean;
  locationId: number;
  locationName: string;

  suggestionModalRef: BsModalRef;
  @ViewChild("SuggestionLookupTableModalComponent")
  SuggestionLookupTableModalComponent: SuggestionLookupTableModalComponent;

  constructor(
    private fb: FormBuilder,
    private _officialReceipt: FinanceModuleService,
    private messageService: MessageService,
    private _restrictionService: RestrictionService,
    private confirmationService: ConfirmationService,
    private suggestionService: BsModalService
  ) {
    this.officialReceiptForm = this.fb.group({
      issueDate: ["", Validators.required],
      voucherNumber: [null, Validators.required],
      supplierId: [null, Validators.required],
      supplierName: [""],
      supplierSerialNumber: "",
      employeeId: [0],
      employeeName: [""],
      employeeErpId: "",
      paymentModeId: [null, Validators.required],
      paymentModeName: [""],
      userLocationId: [null, [Validators.required]],
      userLocationName: ["", [Validators.required]],
      remarks: [""],
      // referenceNumber: ["", Validators.required],
      referenceDate: ["", Validators.required],
      referenceDocumentNumber: "",
      bankReference: ["", Validators.required],
      chequeBankName: ["", Validators.required],
      paymentAmount: ["", Validators.required],
      advanceTaxAmount: ["", Validators.required],
      discountAmount: ["", Validators.required],
      beneficiaryName: ["", Validators.required],
      finalAmount: [""],
      officialReceiptDetails: [[]],
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
    // {
    //   headerName: "",
    //   editable: false,
    //   field: "adjustmentVoucherNumber",
    //   resizable: true,
    //   cellRenderer: this.addIconCellRendererFunc,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "V. Number",
      editable: false,
      field: "voucherNumber",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Amount",
      editable: false,
      field: "amount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location ID",
      editable: false,
      field: "locationId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Location Title",
      editable: false,
      field: "locationName",
      resizable: true,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: "Region ID",
    //   editable: false,
    //   field: "regionId",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    // {
    //   headerName: "Region Title",
    //   editable: false,
    //   field: "regionName",
    //   resizable: true,
    //   suppressSizeToFit: true,
    // },
    {
      headerName: "Cost Center ID",
      editable: false,
      field: "costCenterId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Cost Center Title",
      editable: false,
      field: "costCenterName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project ID",
      editable: false,
      field: "projectId",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Project Title",
      editable: false,
      field: "projectName",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Analysis Code",
      editable: false,
      field: "analysisCode",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Tax",
      editable: false,
      field: "withholdingTaxAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Ded Amount",
      editable: false,
      field: "dedAmount",
      resizable: true,
      suppressSizeToFit: true,
    },
    {
      headerName: "Service Quotation Id",
      editable: false,
      field: "serviceQuotationInvoiceId",
      resizable: true,
      suppressSizeToFit: true,
    },
  ];

  ngOnInit() {
    this.getAll();
    this.VoucherRestriction("RS");
  }

  getAll() {
    this._officialReceipt
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
        this._officialReceipt
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
      this._officialReceipt
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
            this.dataForEdit = response;
            this.officialReceiptForm
              .get("voucherNumber")
              .setValue(this.dataForEdit.voucherNumber);
            this.officialReceiptForm
              .get("issueDate")
              .setValue(new Date(this.dataForEdit.issueDate));
            this.officialReceiptForm
              .get("referenceDate")
              .setValue(new Date(this.dataForEdit.referenceDate));
            this.officialReceiptForm
              .get("userLocationId")
              .setValue(this.dataForEdit.userLocationId);
            this.officialReceiptForm
              .get("userLocationName")
              .setValue(this.dataForEdit.userLocationName);
            this.officialReceiptForm
              .get("referenceDocumentNumber")
              .setValue(this.dataForEdit.referenceDocumentNumber);
            this.officialReceiptForm
              .get("employeeId")
              .setValue(this.dataForEdit.employeeId);
            this.officialReceiptForm
              .get("employeeName")
              .setValue(this.dataForEdit.employeeName);
            this.officialReceiptForm
              .get("employeeErpId")
              .setValue(this.dataForEdit.employeeErpId);
            this.officialReceiptForm
              .get("supplierId")
              .setValue(this.dataForEdit.supplierId);
            this.officialReceiptForm
              .get("supplierSerialNumber")
              .setValue(this.dataForEdit.supplierSerialNumber);
            this.officialReceiptForm
              .get("supplierName")
              .setValue(this.dataForEdit.supplierName);
            this.officialReceiptForm
              .get("paymentModeId")
              .setValue(this.dataForEdit.paymentModeId);
            this.officialReceiptForm
              .get("paymentModeName")
              .setValue(this.dataForEdit.paymentModeName);
            this.officialReceiptForm
              .get("remarks")
              .setValue(this.dataForEdit.remarks);
            // this.officialReceiptForm
            //   .get("referenceNumber")
            //   .setValue(this.dataForEdit.referenceNumber);
            this.officialReceiptForm
              .get("bankReference")
              .setValue(this.dataForEdit.bankReference);
            this.officialReceiptForm
              .get("chequeBankName")
              .setValue(this.dataForEdit.chequeBankName);
            this.officialReceiptForm
              .get("advanceTaxAmount")
              .setValue(this.dataForEdit.advanceTaxAmount);
            this.officialReceiptForm
              .get("discountAmount")
              .setValue(this.dataForEdit.discountAmount);
            this.officialReceiptForm
              .get("paymentAmount")
              .setValue(this.dataForEdit.paymentAmount);
            this.officialReceiptForm
              .get("beneficiaryName")
              .setValue(this.dataForEdit.beneficiaryName);
            this.officialReceiptForm
              .get("finalAmount")
              .setValue(this.dataForEdit.finalAmount);
            this.rowData = this.dataForEdit.officialReceiptDetails;
            this.calculateTotalAmount();
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
      this.viewMode = false;
      this.displayModal = true;
      this.officialReceiptForm.reset();
      this.MinDate = this.restrictionDto.creationRestrictionDate;
      this.rowData = [];
      this.officialReceiptForm.get("issueDate").setValue(this.today);
    }
  }

  save() {
    debugger;
    this.saving = true;
    this.officialReceiptForm.patchValue({
      officialReceiptDetails: this.rowData,
    });
    const paymentAmount = +this.officialReceiptForm.value.paymentAmount;
    const advanceTaxAmount = +this.officialReceiptForm.value.advanceTaxAmount;
    const discountAmount = +this.officialReceiptForm.value.discountAmount;
    const finalAmount = +this.officialReceiptForm.value.finalAmount;
    const totalAmount = paymentAmount + advanceTaxAmount + discountAmount;
    if (totalAmount !== finalAmount) {
      this.messageService.add({
        severity: "error",
        summary: "Validation Error",
        detail:
          "The sum of Payment Amount, Advance Tax Amount, and Discount Amount must equal the Final Amount.",
        life: 3000,
      });
      this.saving = false;
      return;
    }
    if (this.gridApi.getDisplayedRowCount() <= 0) {
      this.messageService.add({
        severity: "error",
        detail: "Details are Required",
        life: 2000,
      });
      this.saving = false;
      return;
    }
    if (!this.officialReceiptForm.value.employeeId) {
      this.officialReceiptForm.get("employeeId").setValue(0);
    }
    this._officialReceipt
      .create(this.officialReceiptForm.value, this.target)
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
    const paymentAmount = +this.officialReceiptForm.value.paymentAmount;
    const advanceTaxAmount = +this.officialReceiptForm.value.advanceTaxAmount;
    const discountAmount = +this.officialReceiptForm.value.discountAmount;
    const finalAmount = +this.officialReceiptForm.value.finalAmount;
    const totalAmount = paymentAmount + advanceTaxAmount + discountAmount;
    if (totalAmount !== finalAmount) {
      this.messageService.add({
        severity: "error",
        summary: "Validation Error",
        detail:
          "The sum of Payment Amount, Advance Tax Amount, and Discount Amount must equal the Final Amount.",
        life: 3000,
      });
      this.saving = false;
      return;
    }
    this.officialReceiptForm.patchValue({
      officialReceiptDetails: this.rowData,
    });
    const updateData = {
      ...this.officialReceiptForm.value,
      id: this.dataForEdit.id,
    };
    this._officialReceipt
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
        this.officialReceiptForm.patchValue({
          userLocationId: value?.id,
          userLocationName: value.name,
        });
        this.getVoucherNumber(
          "RS",
          this.officialReceiptForm.value.issueDate,
          value?.id
        );
        break;
      case "Client":
        debugger;
        this.officialReceiptForm.patchValue({
          supplierId: value?.id,
          supplierName: value.title,
          supplierSerialNumber: value.serialNumber,
          paymentModeId: value.paymentModeId,
          paymentModeName: value.paymentModeName,
        });
        if (value?.id) {
          this.showAdjustmentData();
        }
        break;
      case "PaymentMode":
        debugger;
        this.officialReceiptForm.patchValue({
          paymentModeId: value?.id,
          paymentModeName: value.name,
        });
        break;
      case "Employee":
        debugger;
        this.officialReceiptForm.patchValue({
          employeeId: value?.additional,
          employeeName: value.name,
          employeeErpId: value.id,
        });

        break;
      case "RManager":
        debugger;
        this.officialReceiptForm.patchValue({
          rManagerId: value?.id,
          rManagerName: value.name,
        });
        break;
      default:
        alert(`${title} is not defined`);
    }
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

  // onRemoveSelected() {
  //   debugger;
  //   const selectedNodes = this.gridApi.getSelectedNodes();
  //   if (selectedNodes.length > 0) {
  //     const dataToRemove = selectedNodes.map((node) => node.data);
  //     this.rowData = this.rowData.filter(
  //       (row) =>
  //         !dataToRemove.some(
  //           (removeItem) => removeItem.generalLedgerId === row.generalLedgerId
  //         )
  //     );
  //     this.gridApi.setRowData(this.rowData);
  //     this.calculateTotalAmount();
  //     this.rowCount = this.gridApi.getDisplayedRowCount();
  //     this.gridApi.refreshCells();
  //   }
  // }

  onRemoveSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const dataToRemove = selectedNodes.map((node) => node.data);
      this.gridApi.applyTransaction({ remove: dataToRemove });
      this.rowData = this.rowData.filter((row) => !dataToRemove.includes(row));
      this.rowCount = this.gridApi.getDisplayedRowCount();
    }
    this.calculateTotalAmount();
  }

  // addIconCellRendererFunc() {
  //   debugger;
  //   return '<i class="fa fa-plus-circle fa-lg" style="color: green;margin-left: -9px;cursor: pointer;" ></i>';
  // }
  cellValueChanged(params) {
    debugger;
    if (params.data.amount) {
      this.calculateTotalAmount();
    }
  }

  showAdjustmentData() {
    debugger;
    this.displayAdjustment = true;
    this._officialReceipt
      .getAllGeneralLedgerGroupedData(
        "GeneralLedger",
        this.officialReceiptForm.value.supplierId
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
          var data = response.map(({ totalDebit, id, ...item }) => ({
            ...item,
            serviceQuotationInvoiceId: id,
            amount: totalDebit,
          }));
          debugger;
          this.rowData = data;
          this.calculateTotalAmount();
        },
      });
  }

  // makeGridData(temData) {
  //   var currentRow = {
  //     generalLedgerId: temData.id,
  //     locationId: temData.locationId,
  //     locationName: temData.locationName,
  //     costCenterId: temData.costCenterId,
  //     costCenterName: temData.costCenterName,
  //     projectId: temData.projectId,
  //     analysisCode: temData.analysisCode,
  //     withholdingTaxAmount: temData.withholdingTaxAmount,
  //     projectName: temData.projectName,
  //     adjustmentVoucherNumber: temData.voucherNumber,
  //     amount: temData.balance,
  //   };

  //   return currentRow;
  // }

  calculateTotalAmount() {
    let total = 0;
    this.rowData?.forEach((node) => {
      debugger;

      if (node.amount) {
        total += +node.amount;
      }
    });
    this.officialReceiptForm.get("finalAmount").setValue(total);
  }

  viewOnly(id: any) {
    this.viewMode = true;
    this.editMode = false;
    this.show(id);
    this.officialReceiptForm.disable();
    this.MinDate = null;
  }

  edit(id: any) {
    if (!this.restrictionDto.isEditAllowed) {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Edit Restricted",
      });
      return;
    }
    this.editMode = true;
    this.viewMode = false;
    this.show(id);
    this.officialReceiptForm.enable();
    this.MinDate = this.restrictionDto.editRestrictionDate;
  }

  getVoucherNumber(prefix: string, issueDate: string, userLocationId: number) {
    debugger;
    this._officialReceipt
      .getVoucherNumber(this.target, prefix, issueDate, userLocationId)
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
          this.officialReceiptForm.get("voucherNumber").setValue(response);
        },
        error: (err) => {
          console.log("An error occurred", err);
        },
      });
  }

  onDateChange(value?: any) {
    debugger;
    if (value) {
      this.officialReceiptForm.value.issueDate = value;
    }
    if (
      this.officialReceiptForm.value.userLocationId &&
      this.officialReceiptForm.value.issueDate
    ) {
      this.getVoucherNumber(
        "RS",
        this.officialReceiptForm.value.issueDate,
        this.officialReceiptForm.value.userLocationId
      );
    }
  }

  async getDefaultLocation(target: string, name: string, id: string, filterId) {
    this._officialReceipt
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
          this.officialReceiptForm
            .get("userLocationName")
            .setValue(response.items[0].shortName);
          this.officialReceiptForm
            .get("userLocationId")
            .setValue(response.items[0].id);
          this.getVoucherNumber(
            "RS",
            this.officialReceiptForm.value.issueDate,
            this.officialReceiptForm.value.userLocationId
          );
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
        this._officialReceipt
          .approve(id, this.target)
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

  onGlobalFilter(table: Table, event: Event) {
    const query = (event.target as HTMLInputElement).value;
    table.filterGlobal(query, "contains");
  }
  onPageChange(event: any) {
    debugger;
    this.dto.maxCount = event.rows;
    this.currentPage = event.page + 1;
    this.loading = true;
    this.dto.skipCount = (this.currentPage - 1) * 5;
    this._officialReceipt.getAll(this.target, this.dto).subscribe({
      next: (response) => {
        debugger;

        this.tableData = response.items;
        this.count = response.totalCount;

        this.loading = false;
      },
    });
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
